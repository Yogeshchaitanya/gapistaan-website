# Gapistaan | गैपिस्तान वेबसाइट

YouTube चैनल [@gapistaan](https://www.youtube.com/@gapistaan) की ऑफ़िशियल साइट।

## यह कैसे चलती है

1. हर घंटे `.github/workflows/sync-youtube.yml` चलता है और YouTube Data API से चैनल के सारे पब्लिक वीडियो लाता है (`data/videos.json`)।
2. `scripts/build.mjs` हर एपिसोड का अलग पेज बनाता है (`dist/video/<videoId>/`), साथ में होम पेज, sitemap और Google के लिए VideoObject जानकारी।
3. कुछ बदला हो तो robot commit करता है, और Cloudflare Workers नई साइट 1–2 मिनट में live कर देता है।

## ज़रूरी सेटिंग

- GitHub repo की **Settings > Secrets and variables > Actions** में `YT_API_KEY` (YouTube Data API v3 की key)।
- मुख्य पता `https://gapistaan.com` है (`content/site.json` में `siteUrl`)। `src/worker.js` बाकी पतों (www, gapistaan.in, gapistan.in) को 301 से gapistaan.com पर भेजता है; ये सिर्फ़ पेजों पर चलता है, fonts और images पर नहीं।

## बदलाव कहाँ करें

- साइट का टेक्स्ट, कलाकार, ब्रांड और लिंक: `content/site.json`
- किसी एपिसोड पर अपना लिखा टेक्स्ट: `content/episodes/<videoId>.md` (सादे पैराग्राफ़, बीच में खाली लाइन)
- डिज़ाइन: `src/styles.css`
- कैश और सुरक्षा headers: `public/_headers` (fonts/images के लिए) और `src/worker.js` (पेजों के लिए)
- लोगो, चाचा की तस्वीर, Gen Gap लोगो और शेयर इमेज: `public/img/`

लोकल पर बनाना हो तो: `node scripts/build.mjs` (Node 18+ चाहिए, कोई और पैकेज नहीं)।

Fonts: Mukta और Anton, SIL Open Font License के तहत (`public/fonts/` में लाइसेंस)।
