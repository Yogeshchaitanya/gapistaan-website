# Cinekar | cinekar.com

Yogesh Chaitanya के daily-vlog चैनल [@cinekarvlogs](https://www.youtube.com/@cinekarvlogs) की साइट। gapistaan.com की तरह ही बनती और चलती है, Cloudflare पर अलग Worker (`cinekar-website`) से, जिसका Root directory `cinekar` है।

- हर घंटे `.github/workflows/sync-youtube.yml` चैनल के पब्लिक वीडियो `cinekar/data/videos.json` में लाता है, `cinekar/scripts/build.mjs` साइट बनाता है (`cinekar/dist`) और बदलाव हों तो commit करता है।
- हर वीडियो का अपना पेज `/video/<videoId>/` (description, chapters, VideoObject schema, sitemap-video)। `/vlogs/`, `/shorts/`, `/about/` (Yogesh Chaitanya), `/contact/`, `/privacy/`, `/feed.xml`, `/sitemap.xml`।
- टेक्स्ट, ब्रांड कार्ड, लिंक: `content/site.json`। डिज़ाइन: `src/styles.css`। लोकल बिल्ड: `node cinekar/scripts/build.mjs`।

## Cloudflare

Workers & Pages > Create > Import a repository > gapistaan-website, Project name `cinekar-website`, Root directory `/cinekar`, Build command खाली, Deploy command `npx wrangler deploy`। फिर Settings > Domains & Routes में `cinekar.com` और `www.cinekar.com` जोड़ें (GoDaddy में DNS Cloudflare के बताए अनुसार)। `src/worker.js` www और बाक़ी पतों को 301 से cinekar.com पर भेजता है।
