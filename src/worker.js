// Sends every other address (www.gapistaan.com, gapistaan.in, gapistan.in and their www) to
// https://gapistaan.com with a permanent redirect, so Google sees one site. Only page requests
// reach this code (see run_worker_first in wrangler.jsonc); fonts and images are served directly.
const CANONICAL = 'gapistaan.com';

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
    return env.ASSETS.fetch(request);
  },
};
