// Runs only for page requests listed in wrangler.jsonc (run_worker_first).
// 1) Any other host (www.gapistaan.com, gapistaan.in, gapistan.in ...) gets a 301 to https://gapistaan.com.
// 2) Pages get the same security headers that public/_headers gives to directly served files.
const CANONICAL = 'gapistaan.com';
const SECURITY = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Strict-Transport-Security': 'max-age=31536000',
};

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
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    for (const [k, v] of Object.entries(SECURITY)) out.headers.set(k, v);
    return out;
  },
};
