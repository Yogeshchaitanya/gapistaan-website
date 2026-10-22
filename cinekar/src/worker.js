// Cinekar worker. Runs only for the paths listed in cinekar/wrangler.jsonc (run_worker_first).
// 1) Any other host (www.cinekar.com, the workers.dev address ...) gets a 301 to https://cinekar.com.
// 2) Pages get the same security headers that public/_headers gives to directly served files.
const CANONICAL = 'cinekar.com';
const SECURITY = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Strict-Transport-Security': 'max-age=31536000',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname !== CANONICAL && !url.hostname.endsWith('.workers.dev') && url.hostname !== 'localhost') {
      url.hostname = CANONICAL;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    if (url.hostname.startsWith('www.')) {
      url.hostname = CANONICAL;
      return Response.redirect(url.toString(), 301);
    }
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    for (const [k, v] of Object.entries(SECURITY)) out.headers.set(k, v);
    return out;
  },
};
