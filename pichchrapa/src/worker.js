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
//   NOTIFY_TO                    email(s) that get every payment, comma separated
//   SMTP_USER, SMTP_PASS         mailbox that sends the emails (SMTP_HOST default smtp.hostinger.com, port 465;
//                                for Gmail: SMTP_HOST=smtp.gmail.com and an App Password)
// After every payment: full details to NOTIFY_TO, and a thank-you email to the payer if Razorpay has their email.
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
import { connect } from 'cloudflare:sockets';
import { EmailMessage } from 'cloudflare:email';
const BRAND = 'PICHCHRAPA';
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

const b64 = (s) => { const bytes = enc.encode(s); let bin = ''; for (const x of bytes) bin += String.fromCharCode(x); return btoa(bin); };
const rupees = (paise) => '₹' + (Number(paise) / 100).toLocaleString('en-IN');
// Owner alert through Cloudflare Email Routing (binding MAILER, no password needed).
// MAIL_FROM must be an address on a domain with Email Routing on; NOTIFY_TO must be a verified destination.
function rawMail(from, to, subject, text) {
  const body = b64(text).replace(/.{1,76}/g, '$&\r\n');
  return [
    `From: =?UTF-8?B?${b64(BRAND)}?= <${from}>`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${b64(subject)}?=`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${from.split('@')[1]}>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    body,
  ].join('\r\n');
}
async function ownerMail(env, subject, text) {
  const to = String(env.NOTIFY_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (env.MAILER && env.MAIL_FROM && to.length) {
    for (const t of to) await env.MAILER.send(new EmailMessage(env.MAIL_FROM, t, rawMail(env.MAIL_FROM, t, subject, text)));
    return 'sent';
  }
  return smtpSend(env, to, subject, text);
}

async function smtpSend(env, to, subject, text) {
  if (!env.SMTP_USER || !env.SMTP_PASS || !to.length) return 'skipped';
  const sock = connect({ hostname: env.SMTP_HOST || 'smtp.hostinger.com', port: Number(env.SMTP_PORT || 465) }, { secureTransport: env.SMTP_PLAIN === '1' ? 'off' : 'on' });
  const w = sock.writable.getWriter();
  const r = sock.readable.getReader();
  const dec = new TextDecoder();
  let buf = '';
  const reply = async () => {
    for (;;) {
      const lines = buf.split('\r\n');
      for (let i = 0; i < lines.length - 1; i++) if (/^\d{3} /.test(lines[i])) { buf = lines.slice(i + 1).join('\r\n'); return +lines[i].slice(0, 3); }
      const { value, done } = await r.read();
      if (done) throw new Error('SMTP connection closed');
      buf += dec.decode(value, { stream: true });
    }
  };
  const cmd = async (line, ok) => {
    if (line !== null) await w.write(enc.encode(line + '\r\n'));
    const code = await reply();
    if (!ok.includes(code)) throw new Error(`SMTP ${line ? line.split(' ')[0] : 'greeting'} -> ${code}`);
  };
  try {
    await cmd(null, [220]);
    await cmd('EHLO ' + CANONICAL, [250]);
    await cmd('AUTH LOGIN', [334]);
    await cmd(btoa(env.SMTP_USER), [334]);
    await cmd(btoa(env.SMTP_PASS), [235]);
    await cmd(`MAIL FROM:<${env.SMTP_USER}>`, [250]);
    for (const t of to) await cmd(`RCPT TO:<${t}>`, [250, 251]);
    await cmd('DATA', [354]);
    const body = b64(text).replace(/.{1,76}/g, '$&\r\n');
    const msg = [
      `From: =?UTF-8?B?${b64(BRAND)}?= <${env.SMTP_USER}>`,
      `To: ${to.join(', ')}`,
      `Subject: =?UTF-8?B?${b64(subject)}?=`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${crypto.randomUUID()}@${CANONICAL}>`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      body,
    ].join('\r\n');
    await cmd(msg + '\r\n.', [250]);
    await w.write(enc.encode('QUIT\r\n'));
    return 'sent';
  } finally {
    try { await sock.close(); } catch {}
  }
}

async function notify(env, pay) {
  const order = await razorpay(env, 'GET', `/orders/${encodeURIComponent(pay.order_id)}`).catch(() => ({}));
  const n = { ...(order.notes || {}) };
  const email = pay.email && pay.email !== 'void@razorpay.com' ? pay.email : '';
  const when = new Date((pay.created_at || Date.now() / 1000) * 1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const owner = [`${BRAND}: नया पेमेंट ${rupees(pay.amount)}`, `नाम: ${n.from || '-'}`, `फ़ोन: ${pay.contact || '-'}`, `ईमेल: ${email || '-'}`,
    n.to ? `किसके लिए: ${n.to}` : '', `संदेश: ${n.message || '-'}`, `पेज: ${n.page || '-'}`, `तरीका: ${pay.method || '-'}`,
    `पेमेंट आईडी: ${pay.id}`, `समय: ${when}`].filter(Boolean).join('\n');
  const to = String(env.NOTIFY_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  const out = [];
  try { out.push('owner: ' + await ownerMail(env, `${BRAND}: नया पेमेंट ${rupees(pay.amount)} ${n.from || ''}`.trim(), owner)); } catch (e) { out.push('owner: ' + e.message); }
  if (email) {
    const text = `नमस्ते ${n.from || ''},\n\n${BRAND} को आपका ${rupees(pay.amount)} का सहयोग मिल गया है। आपकी तालियाँ सीधे कलाकारों तक पहुँचेंगी। दिल से धन्यवाद!\n\nपेमेंट आईडी: ${pay.id}\nसमय: ${when}\n\n${BRAND}\nhttps://${CANONICAL}`;
    try { out.push('payer: ' + await smtpSend(env, [email], `आपका सहयोग मिल गया: ${rupees(pay.amount)} | ${BRAND}`, text)); } catch (e) { out.push('payer: ' + e.message); }
  }
  console.log('notify', pay.id, out.join(' | '));
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

async function api(request, env, ctx, url) {
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
    ctx.waitUntil(notify(env, pay).catch((e) => console.error('notify', e.message)));
    return json({ ok: true });
  }

  return json({ error: 'not-found' }, 404);
}

export default {
  async fetch(request, env, ctx) {
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
        return await api(request, env, ctx, url);
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
