# PICHCHRAPA वेबसाइट (pichchrapa.com)

अभिनेताओं के परिवार के स्टूडियो PICHCHRAPA की साइट। यह gapistaan.com की तरह ही बनती और चलती है, बस Cloudflare पर अलग Worker (`pichchrapa-website`) से, जिसका Root directory `pichchrapa` है।

- साइट का टेक्स्ट (हीरो, परिवार, कंपनी, संपर्क, सीरीज़ के परिचय, केस-फ़ाइलें): `content/site.json`
- दो भाषाएँ: हिंदी `/` पर, English `/en/` पर। English टेक्स्ट `content/site.en.json` में है (वही ढाँचा; जो कुंजी वहाँ नहीं है, वह हिंदी से आती है)। पन्नों के बाक़ी छोटे शब्द `scripts/build.mjs` में `T('हिंदी', 'English')` से हैं। हर पन्ने पर हिंदी↔English बटन, hreflang और दोनों भाषाओं वाला sitemap अपने-आप बनता है। वीडियो के शीर्षक और विवरण YouTube जैसे हैं, उन्हें अनुवाद नहीं किया जाता।
- गैपिस्तान के कलाकार: `content/site.json` के `artists` में (फ़ोटो `public/img/cast/`)। हर कार्ड गैपिस्तान की प्रोफ़ाइल से जुड़ा है।
- होम की ऊपर की रील: ऊपर की पट्टी में राजा का बाजा के सारे एपिसोड, नीचे की पट्टी में फ़िल्मी अदालत और बाक़ी वीडियो (`reelStrips()` in `scripts/build.mjs`)।
- लोगो और एनिमेशन: हेडर का क्लैपर `clapMark()` से बनता है (बंद हालत में सीधा; लोड पर और होवर पर एक बार क्लैप)। फ़िल्मी अदालत में हथौड़ा और केस-नंबर की मुहर, राजा का बाजा में साउंड-बार और बीट। सब `src/styles.css` में; `prefers-reduced-motion` में बंद।
- कंपनी का GST नंबर, विधिक नाम और पूरा पता: `content/site.json` में `business.gstin`, `business.legalName`, `business.address`। भरते ही फ़ुटर, About, Contact और Google के JSON-LD में दिखने लगते हैं।
- YouTube वीडियो: हर घंटे `scripts/fetch-videos.mjs` से `data/videos.json`। स्रोत चैनल `content/site.json` के `sources` में हैं:
  - PICHCHRAPA (@pichchrapa), मुख्य चैनल (सब वीडियो और शॉर्ट्स)
  - Filmy Adaalat (@filmyadaalat) और Indian Films Academy (@indianfilmsacademyy): सिर्फ़ वे वीडियो जिनके शीर्षक में `filter` मिलता है
- कौन सा वीडियो किस सीरीज़ में जाता है (अपने-आप):
  - शीर्षक में अदालत, Jinn, Pakhi, Jija Sale, Pati Patni जैसे शब्द: **फ़िल्मी अदालत**, और उसके केस (`series.adalat.cases`) के हिसाब से
  - मुख्य चैनल पर 8 जून 2026 के बाद का बाक़ी सब: **राजा का बाजा** (शॉर्ट्स समेत)
  - उससे पहले का बाक़ी: "और शॉर्ट फ़िल्में"
- नई कहानी (केस) जोड़ना हो तो `series.adalat.cases` में एक पंक्ति जोड़ें (`match` = शीर्षक का शब्द)। जो किसी केस से न मिले, वह "थीम सॉन्ग और पर्दे के पीछे" में जाता है।
- हिट शॉर्ट्स: राजा का बाजा के सबसे ज़्यादा व्यू वाले 12 शॉर्ट्स (व्यू दिन में एक बार ताज़ा होते हैं)।
- हीरो का इंट्रो वीडियो: `public/media/intro.mp4` (poster: `intro-poster.jpg`)।

लोकल पर बनाना: `node pichchrapa/scripts/build.mjs`

## Cloudflare

Workers & Pages > Create > Import a repository > gapistaan-website, Project name `pichchrapa-website`, Root directory `/pichchrapa`, Build command खाली, Deploy command `npx wrangler deploy`। फिर Settings > Domains & Routes में `pichchrapa.com` जोड़ें। `src/worker.js` बाक़ी पतों (www आदि) को 301 से pichchrapa.com पर भेजता है।
