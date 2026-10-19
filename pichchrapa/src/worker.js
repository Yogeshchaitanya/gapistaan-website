// PICHCHRAPA worker. Runs only for the paths listed in wrangler.jsonc (run_worker_first).
// 1) Any other host (www.pichchrapa.com, ...) gets a 301 to https://pichchrapa.com.
// 2) Pages get the same security headers that public/_headers gives to directly served files.
// 3) /api/*: the "Honour the artists" box (pay what you want), paid through Razorpay.
//    - POST /api/order    create a Razorpay order (the amount is checked here against the limits)
//    - POST /api/verify   check the payment signature, and capture the payment if it is only authorised
//    - GET  /api/status   {"payments":"on"|"off"}: shows whether the secrets below are set (reveals nothing else)
//
// Secrets (Cloudflare dashboard > Workers > pichchrapa-website > Settings > Variables and Secrets, type Secret):
//   RZP_KEY_ID, RZP_KEY_SECRET   the same Razorpay live keys the IFA and Gapistaan websites use
// Without them /api/order answers 503 and the box stays hidden. The name and message a viewer
// types are stored by Razorpay as the order's notes: Razorpay Dashboard > Payments > the payment > Notes.
// RZP_API exists only for local testing against a mock server.
const CANONICAL = 'pichchrapa.com';
const SECURITY = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Strict-Transport-Security': 'max-age=31536000',
};
const GIFT = { min: 20, max: 50000 }; // rupees; keep in step with content/gift.json

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...SECURITY } });
const clean = (v, n = 120) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);
const enc = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, enc.encode(msg)));
}
function same(a, b) {
  a = String(a || '');
  b = String(b || '');
  if (a.length !== b.length || !a.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

async function razorpay(env, method, path, body) {
  const res = await fetch((env.RZP_API || 'https://api.razorpay.com/v1') + path, {
    method,
    headers: { authorization: 'Basic ' + btoa(`${env.RZP_KEY_ID}:${env.RZP_KEY_SECRET}`), 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Razorpay ${path} ${res.status}: ${JSON.stringify(data).slice(0, 300)}`);
  return data;
}

const sameSite = (request, url) => {
  const o = request.headers.get('origin');
  if (!o) return true; // non-browser callers (curl) carry no Origin; they can only create harmless unpaid orders
  try {
    const h = new URL(o).hostname;
    return h === url.hostname || h === CANONICAL;
  } catch {
    return false;
  }
};

async function api(request, env, url) {
  const p = url.pathname;
  const ready = Boolean(env.RZP_KEY_ID && env.RZP_KEY_SECRET);

  if (p === '/api/status' && request.method === 'GET') return json({ payments: ready ? 'on' : 'off' });

  if (p === '/api/order' && request.method === 'POST') {
    if (!sameSite(request, url)) return json({ error: 'origin' }, 403);
    if (!ready) return json({ error: 'payments-not-configured' }, 503);
    const b = await request.json().catch(() => ({}));
    const rupee = Math.round(Number(b.amount));
    if (!(rupee >= GIFT.min && rupee <= GIFT.max)) return json({ error: 'bad-amount' }, 400);
    const order = await razorpay(env, 'POST', '/orders', {
      amount: rupee * 100,
      currency: 'INR',
      receipt: `pic_${Date.now()}`,
      notes: {
        kind: 'pichchrapa-honour',
        from: clean(b.name, 60),
        message: clean(b.message, 200),
        page: clean(b.page, 60),
        lang: b.lang === 'en' ? 'en' : 'hi',
      },
    });
    return json({ key: env.RZP_KEY_ID, order_id: order.id, amount: order.amount, currency: order.currency });
  }

  if (p === '/api/verify' && request.method === 'POST') {
    if (!sameSite(request, url)) return json({ error: 'origin' }, 403);
    if (!ready) return json({ error: 'payments-not-configured' }, 503);
    const b = await request.json().catch(() => ({}));
    const orderId = clean(b.razorpay_order_id, 60);
    const paymentId = clean(b.razorpay_payment_id, 60);
    const expected = await hmac(env.RZP_KEY_SECRET, `${orderId}|${paymentId}`);
    if (!same(expected, b.razorpay_signature)) return json({ error: 'bad-signature' }, 400);
    // Make sure the money is captured (an account set to manual capture would otherwise refund it after a few days).
    const pay = await razorpay(env, 'GET', `/payments/${encodeURIComponent(paymentId)}`);
    if (pay.order_id !== orderId) return json({ error: 'order-mismatch' }, 400);
    if (pay.status === 'authorized') await razorpay(env, 'POST', `/payments/${encodeURIComponent(paymentId)}/capture`, { amount: pay.amount, currency: pay.currency });
    else if (pay.status !== 'captured') return json({ error: 'payment-' + pay.status }, 409);
    return json({ ok: true });
  }

  return json({ error: 'not-found' }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;
    const keep = host === CANONICAL || host.endsWith('.workers.dev') || host === 'localhost' || host === '127.0.0.1';
    if (!keep) {
      url.protocol = 'https:';
      url.hostname = CANONICAL;
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname.startsWith('/api/')) {
      try {
        return await api(request, env, url);
      } catch (e) {
        console.error('api error', e.message);
        return json({ error: 'server' }, 502);
      }
    }
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    for (const [k, v] of Object.entries(SECURITY)) out.headers.set(k, v);
    return out;
  },
};
