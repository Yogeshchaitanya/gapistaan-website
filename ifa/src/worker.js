// Indian Films Academy worker.
// 1) Any other host (www.indianfilmsacademy.com ...) gets a 301 to https://indianfilmsacademy.com.
// 2) Pages get the same security headers that public/_headers gives to directly served files.
// 3) /api/*: online admission and support payments through Razorpay.
//    - POST /api/order              create a Razorpay order (amount decided here, never by the browser)
//    - POST /api/verify             check the payment signature, give a registration number
//    - POST /api/razorpay-webhook   same as verify, in case the student closed the page early
//    - GET  /api/admin?key=...      list of registrations (ADMIN_KEY), add &csv=1 for a spreadsheet
//    - GET  /api/admin/test?key=... send a test message to every notification channel
//    Registration numbers (IFA-2026-0001 ...) come from one SQLite Durable Object, so they never repeat.
//
// Secrets (Cloudflare dashboard > Workers > ifa-website > Settings > Variables and Secrets):
//   RZP_KEY_ID, RZP_KEY_SECRET, RZP_WEBHOOK_SECRET   Razorpay live keys and webhook secret
//   ADMIN_KEY                                        any long password, for /api/admin
//   NOTIFY_TO                                        email(s) that get every registration, comma separated
//   SMTP_USER, SMTP_PASS (SMTP_HOST optional)        a mailbox to send from, e.g. info@ on Hostinger
//   WA_PHONE, WA_APIKEY                              WhatsApp alert to the owner via CallMeBot
//   WA_CLOUD_TOKEN, WA_CLOUD_PHONE_ID                WhatsApp "payment received" message to the payer
//                                                    (Meta WhatsApp Cloud API, official number)
//   WA_TEMPLATE (default payment_received), WA_TEMPLATE_LANG (default hi), WA_GRAPH_VERSION (default v23.0)
//     Template body must have 4 variables: {{1}} name, {{2}} amount, {{3}} purpose, {{4}} reference number
//   TG_TOKEN, TG_CHAT                                optional Telegram alert
// Without the Razorpay secrets /api/order answers 503 and the site falls back to WhatsApp.
// RZP_API, SMTP_PORT, SMTP_PLAIN and WA_API exist only for local testing against mock servers.
import { DurableObject } from 'cloudflare:workers';
import { connect } from 'cloudflare:sockets';

const CANONICAL = 'indianfilmsacademy.com';
const SECURITY = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Strict-Transport-Security': 'max-age=31536000',
};
const REG_FEE = 500; // rupees; must match content/site.json upi.registrationFee
const COURSES = {
  actor: ['Cinematic Acting', 'सिनेमैटिक एक्टिंग'],
  director: ['Film Direction', 'फ़िल्म डायरेक्शन'],
  editor: ['Film Editing', 'फ़िल्म एडिटिंग'],
};

// ---------- small helpers ----------
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const clean = (v, n = 120) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);
const enc = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, enc.encode(msg)));
}
function same(a, b) {
  a = String(a || ''); b = String(b || '');
  if (a.length !== b.length || !a.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
const b64 = (s) => { const bytes = enc.encode(s); let bin = ''; for (const x of bytes) bin += String.fromCharCode(x); return btoa(bin); };
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const rupees = (paise) => '₹' + (Number(paise) / 100).toLocaleString('en-IN');

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

// ---------- the registry: one SQLite database, one writer ----------
export class Registry extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS entries (
      order_id TEXT PRIMARY KEY, kind TEXT, amount INTEGER, data TEXT, created TEXT,
      reg TEXT, payment_id TEXT, paid TEXT)`);
    this.sql.exec('CREATE TABLE IF NOT EXISTS counters (k TEXT PRIMARY KEY, v INTEGER)');
  }
  pending(orderId, kind, amount, data) {
    this.sql.exec('INSERT OR IGNORE INTO entries (order_id, kind, amount, data, created) VALUES (?, ?, ?, ?, ?)', orderId, kind, amount, JSON.stringify(data), new Date().toISOString());
  }
  // Marks an order paid once. Returns the entry and whether this call was the first.
  complete(orderId, paymentId) {
    const row = this.sql.exec('SELECT * FROM entries WHERE order_id = ?', orderId).toArray()[0];
    if (!row) return null;
    if (row.paid) return { ...row, data: JSON.parse(row.data), fresh: false };
    let reg = null;
    if (row.kind === 'registration') {
      const year = new Date().getFullYear();
      const k = 'reg-' + year;
      const cur = this.sql.exec('SELECT v FROM counters WHERE k = ?', k).toArray()[0];
      const n = (cur ? cur.v : 0) + 1;
      this.sql.exec('INSERT INTO counters (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v', k, n);
      reg = `IFA-${year}-${String(n).padStart(4, '0')}`;
    }
    const paid = new Date().toISOString();
    this.sql.exec('UPDATE entries SET reg = ?, payment_id = ?, paid = ? WHERE order_id = ?', reg, paymentId, paid, orderId);
    return { ...row, reg, payment_id: paymentId, paid, data: JSON.parse(row.data), fresh: true };
  }
  list(limit = 500) {
    return this.sql.exec('SELECT * FROM entries WHERE paid IS NOT NULL ORDER BY paid DESC LIMIT ?', limit).toArray().map((r) => ({ ...r, data: JSON.parse(r.data) }));
  }
}
const registry = (env) => env.REGISTRY.get(env.REGISTRY.idFromName('ifa'));

// ---------- notifications ----------
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
      `From: =?UTF-8?B?${b64('Indian Films Academy')}?= <${env.SMTP_USER}>`,
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
async function whatsapp(env, text) {
  if (!env.WA_PHONE || !env.WA_APIKEY) return 'skipped';
  const u = `${env.WA_API || 'https://api.callmebot.com/whatsapp.php'}?phone=${encodeURIComponent(env.WA_PHONE)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(env.WA_APIKEY)}`;
  const res = await fetch(u);
  return res.ok ? 'sent' : 'http ' + res.status;
}
// Indian mobile -> 91XXXXXXXXXX, anything unusable -> ''
function waNumber(v) {
  let n = String(v || '').replace(/\D/g, '');
  if (n.length === 11 && n[0] === '0') n = n.slice(1);
  if (n.length === 10) n = '91' + n;
  return n.length >= 11 && n.length <= 15 ? n : '';
}
async function whatsappCloud(env, phone, params) {
  if (!env.WA_CLOUD_TOKEN || !env.WA_CLOUD_PHONE_ID) return 'skipped';
  const to = waNumber(phone);
  if (!to) return 'no-number';
  const res = await fetch(`https://graph.facebook.com/${env.WA_GRAPH_VERSION || 'v23.0'}/${env.WA_CLOUD_PHONE_ID}/messages`, {
    method: 'POST',
    headers: { authorization: 'Bearer ' + env.WA_CLOUD_TOKEN, 'content-type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: env.WA_TEMPLATE || 'payment_received',
        language: { code: env.WA_TEMPLATE_LANG || 'hi' },
        components: [{ type: 'body', parameters: params.map((t) => ({ type: 'text', text: String(t || '-').slice(0, 200) })) }],
      },
    }),
  });
  if (res.ok) return 'sent';
  const err = await res.json().catch(() => ({}));
  return 'http ' + res.status + ' ' + (err.error?.message || '').slice(0, 120);
}
async function telegram(env, text) {
  if (!env.TG_TOKEN || !env.TG_CHAT) return 'skipped';
  const res = await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: env.TG_CHAT, text }) });
  return res.ok ? 'sent' : 'http ' + res.status;
}
const ownerList = (env) => String(env.NOTIFY_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
const settle = async (label, p) => { try { return `${label}: ${await p}`; } catch (e) { return `${label}: ${e.message}`; } };

async function announce(env, e, pay = {}) {
  // Form details first; if the payer left something out, use what Razorpay Checkout collected.
  const payEmail = pay.email && pay.email !== 'void@razorpay.com' ? pay.email : '';
  const d = { ...e.data, email: e.data.email || payEmail, phone: e.data.phone || pay.contact || '' };
  const course = COURSES[d.course] ? COURSES[d.course][0] : d.course || '';
  const when = new Date(e.paid).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const owner = e.kind === 'registration'
    ? `नया रजिस्ट्रेशन ${e.reg}\nनाम: ${d.name}\nफ़ोन: ${d.phone}\nईमेल: ${d.email || '-'}\nकोर्स: ${course}\nउम्र: ${d.age || '-'} · शहर: ${d.city || '-'}\nसंदेश: ${d.note || '-'}\nराशि: ${rupees(e.amount)} · ${e.payment_id}\n${when}`
    : `नया सहयोग ${rupees(e.amount)}\n${d.name || ''} ${d.phone || ''} ${d.email || ''}\n${e.payment_id} · ${when}`;
  const jobs = [settle('whatsapp', whatsapp(env, owner)), settle('telegram', telegram(env, owner)), settle('owner-email', smtpSend(env, ownerList(env), e.kind === 'registration' ? `नया रजिस्ट्रेशन ${e.reg}: ${d.name}` : `नया सहयोग ${rupees(e.amount)}`, owner))];
  if (e.kind === 'registration' && d.email) {
    const hi = d.lang !== 'en';
    const text = hi
      ? `नमस्ते ${d.name},\n\nIndian Films Academy, लखनऊ में आपका रजिस्ट्रेशन हो गया है और आपकी सीट बुक है।\n\nरजिस्ट्रेशन नंबर: ${e.reg}\nकोर्स: ${COURSES[d.course] ? COURSES[d.course][1] : course} (90 दिन)\nरजिस्ट्रेशन शुल्क: ${rupees(e.amount)} (पेमेंट आईडी ${e.payment_id})\n\nचयन ऑडिशन का दिन और समय हम 24 घंटे के भीतर फ़ोन या WhatsApp पर बताएँगे। कोई सवाल हो तो इसी ईमेल का जवाब दें या +91 77540 00121 पर बात करें।\n\nIndian Films Academy\nC1/192, वरदान खंड, सेक्टर 1, गोमती नगर, लखनऊ\nhttps://${CANONICAL}`
      : `Hello ${d.name},\n\nYour registration at Indian Films Academy, Lucknow is confirmed and your seat is booked.\n\nRegistration number: ${e.reg}\nCourse: ${course} (90 days)\nRegistration fee: ${rupees(e.amount)} (payment ID ${e.payment_id})\n\nWe will tell you the day and time of your selection audition by phone or WhatsApp within 24 hours. For any question, reply to this email or call +91 77540 00121.\n\nIndian Films Academy\nC1/192, Vardan Khand, Sector 1, Gomti Nagar, Lucknow\nhttps://${CANONICAL}`;
    jobs.push(settle('student-email', smtpSend(env, [d.email], hi ? `आपकी सीट बुक है: ${e.reg} | Indian Films Academy` : `Your seat is booked: ${e.reg} | Indian Films Academy`, text)));
  }
  if (e.kind !== 'registration' && d.email) {
    const text = `नमस्ते ${d.name || ''},\n\nIndian Films Academy को आपका ${rupees(e.amount)} का सहयोग मिल गया है। यह किसी ज़रूरतमंद छात्र की पढ़ाई में लगेगा। दिल से धन्यवाद!\n\nपेमेंट आईडी: ${e.payment_id}\nसमय: ${when}\n\nIndian Films Academy, लखनऊ\n+91 77540 00121 · https://${CANONICAL}`;
    jobs.push(settle('supporter-email', smtpSend(env, [d.email], `आपका सहयोग मिल गया: ${rupees(e.amount)} | Indian Films Academy`, text)));
  }
  const purpose = e.kind === 'registration' ? `${COURSES[d.course] ? COURSES[d.course][1] : course} कोर्स का रजिस्ट्रेशन शुल्क, सीट बुक` : 'छात्रों की पढ़ाई के लिए सहयोग';
  jobs.push(settle('payer-whatsapp', whatsappCloud(env, d.phone, [d.name || 'जी', rupees(e.amount), purpose, e.reg || e.payment_id])));
  const results = await Promise.all(jobs);
  console.log('notify', e.order_id, results.join(' | '));
  return results;
}

// ---------- API ----------
async function finish(env, ctx, orderId, paymentId, pay) {
  const e = await registry(env).complete(orderId, paymentId);
  if (e && e.fresh) ctx.waitUntil(announce(env, e, pay));
  return e;
}

async function api(request, env, ctx, url) {
  const p = url.pathname;
  const ready = env.RZP_KEY_ID && env.RZP_KEY_SECRET;

  if (p === '/api/order' && request.method === 'POST') {
    if (!ready) return json({ error: 'payments-not-configured' }, 503);
    const b = await request.json().catch(() => ({}));
    const kind = b.kind === 'support' ? 'support' : 'registration';
    const data = { name: clean(b.name, 80), phone: clean(b.phone, 20).replace(/[^\d+]/g, ''), email: clean(b.email, 120), course: clean(b.course, 20), age: clean(b.age, 10), city: clean(b.city, 60), note: clean(b.note, 400), lang: b.lang === 'en' ? 'en' : 'hi' };
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) data.email = '';
    let rupee = REG_FEE;
    if (kind === 'registration') {
      if (!data.name || data.phone.replace(/\D/g, '').length < 10 || !COURSES[data.course]) return json({ error: 'missing-details' }, 400);
    } else {
      rupee = Math.round(Number(b.amount));
      if (!(rupee >= 10 && rupee <= 200000)) return json({ error: 'bad-amount' }, 400);
    }
    const amount = rupee * 100;
    const order = await razorpay(env, 'POST', '/orders', {
      amount,
      currency: 'INR',
      receipt: `ifa_${kind[0]}_${Date.now()}`,
      notes: { kind, course: data.course, name: data.name, phone: data.phone, email: data.email },
    });
    await registry(env).pending(order.id, kind, amount, data);
    return json({ key: env.RZP_KEY_ID, order_id: order.id, amount, currency: 'INR' });
  }

  if (p === '/api/verify' && request.method === 'POST') {
    if (!ready) return json({ error: 'payments-not-configured' }, 503);
    const b = await request.json().catch(() => ({}));
    const orderId = clean(b.razorpay_order_id, 60), paymentId = clean(b.razorpay_payment_id, 60);
    const expected = await hmac(env.RZP_KEY_SECRET, `${orderId}|${paymentId}`);
    if (!same(expected, b.razorpay_signature)) return json({ error: 'bad-signature' }, 400);
    // Make sure the money is captured (accounts set to manual capture would otherwise refund it after a few days).
    const pay = await razorpay(env, 'GET', `/payments/${paymentId}`);
    if (pay.order_id !== orderId) return json({ error: 'order-mismatch' }, 400);
    if (pay.status === 'authorized') await razorpay(env, 'POST', `/payments/${paymentId}/capture`, { amount: pay.amount, currency: pay.currency });
    else if (pay.status !== 'captured') return json({ error: 'payment-' + pay.status }, 409);
    const e = await finish(env, ctx, orderId, paymentId, pay);
    if (!e) return json({ error: 'unknown-order' }, 404);
    return json({ ok: true, kind: e.kind, reg: e.reg, amount: e.amount });
  }

  if (p === '/api/razorpay-webhook' && request.method === 'POST') {
    const raw = await request.text();
    if (!env.RZP_WEBHOOK_SECRET || !same(await hmac(env.RZP_WEBHOOK_SECRET, raw), request.headers.get('x-razorpay-signature'))) return json({ error: 'bad-signature' }, 400);
    const ev = JSON.parse(raw);
    const pay = ev.payload?.payment?.entity;
    if ((ev.event === 'payment.captured' || ev.event === 'order.paid') && pay?.order_id && ready) {
      // Ask Razorpay itself before trusting the event (a leaked webhook secret alone can't fake a payment).
      const real = await razorpay(env, 'GET', `/payments/${encodeURIComponent(pay.id)}`);
      if (real.order_id === pay.order_id && real.status === 'captured') await finish(env, ctx, pay.order_id, pay.id, real);
    }
    return json({ ok: true });
  }

  if (p.startsWith('/api/admin') && request.method === 'GET') {
    if (!env.ADMIN_KEY || !same(url.searchParams.get('key'), env.ADMIN_KEY)) return new Response('Not found', { status: 404 });
    if (p === '/api/admin/test') {
      const results = await announce(env, { kind: 'registration', reg: 'IFA-TEST-0000', amount: 50000, payment_id: 'pay_TEST', paid: new Date().toISOString(), order_id: 'test', data: { name: 'टेस्ट छात्र', phone: url.searchParams.get('phone') || '', email: url.searchParams.get('to') || '', course: 'actor', lang: 'hi' } });
      return json({ results });
    }
    const rows = await registry(env).list();
    if (url.searchParams.get('csv')) {
      const head = ['reg', 'paid', 'kind', 'amount', 'name', 'phone', 'email', 'course', 'age', 'city', 'note', 'payment_id', 'order_id'];
      const q = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
      const csv = [head.join(','), ...rows.map((r) => [r.reg, r.paid, r.kind, r.amount / 100, r.data.name, r.data.phone, r.data.email, r.data.course, r.data.age, r.data.city, r.data.note, r.payment_id, r.order_id].map(q).join(','))].join('\n');
      return new Response('﻿' + csv, { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': 'attachment; filename="ifa-registrations.csv"', 'cache-control': 'no-store' } });
    }
    const tr = rows.map((r) => `<tr><td>${esc(r.reg || 'सहयोग')}</td><td>${esc(new Date(r.paid).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))}</td><td>${esc(rupees(r.amount))}</td><td>${esc(r.data.name)}</td><td><a href="tel:${esc(r.data.phone)}">${esc(r.data.phone)}</a></td><td>${esc(r.data.email)}</td><td>${esc(COURSES[r.data.course]?.[1] || '')}</td><td>${esc(r.data.age)}</td><td>${esc(r.data.city)}</td><td>${esc(r.data.note)}</td></tr>`).join('');
    return new Response(`<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>IFA रजिस्ट्रेशन</title><style>body{font:15px/1.5 system-ui,sans-serif;margin:16px;color:#14211F}table{border-collapse:collapse;width:100%}td,th{border:1px solid #D6DFDC;padding:6px 8px;text-align:left;vertical-align:top}th{background:#023E41;color:#fff}a{color:#156A6C}</style><h1>रजिस्ट्रेशन और सहयोग (${rows.length})</h1><p><a href="?key=${encodeURIComponent(url.searchParams.get('key'))}&csv=1">Excel/CSV डाउनलोड</a></p><div style="overflow-x:auto"><table><tr><th>रजिस्ट्रेशन</th><th>समय</th><th>राशि</th><th>नाम</th><th>फ़ोन</th><th>ईमेल</th><th>कोर्स</th><th>उम्र</th><th>शहर</th><th>संदेश</th></tr>${tr}</table></div>`, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } });
  }
  return json({ error: 'not-found' }, 404);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;
    const keep = host === CANONICAL || host.endsWith('.workers.dev') || host === 'localhost' || host === '127.0.0.1';
    if (url.pathname.startsWith('/api/')) {
      try {
        return await api(request, env, ctx, url);
      } catch (e) {
        console.error('api error', e.message);
        return json({ error: 'server', detail: e.message.slice(0, 200) }, 502);
      }
    }
    if (!keep) {
      url.protocol = 'https:';
      url.hostname = CANONICAL;
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    for (const [k, v] of Object.entries(SECURITY)) out.headers.set(k, v);
    return out;
  },
};
