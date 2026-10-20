# PICHCHRAPA वेबसाइट (pichchrapa.com)

अभिनेताओं के परिवार के स्टूडियो PICHCHRAPA की साइट। यह gapistaan.com की तरह ही बनती और चलती है, बस Cloudflare पर अलग Worker (`pichchrapa-website`) से, जिसका Root directory `pichchrapa` है।

- साइट का टेक्स्ट (हीरो, परिवार, कंपनी, संपर्क, सीरीज़ के परिचय, केस-फ़ाइलें): `content/site.json`
- दो भाषाएँ: हिंदी `/` पर, English `/en/` पर। English टेक्स्ट `content/site.en.json` में है (वही ढाँचा; जो कुंजी वहाँ नहीं है, वह हिंदी से आती है)। पन्नों के बाक़ी छोटे शब्द `scripts/build.mjs` में `T('हिंदी', 'English')` से हैं। हर पन्ने पर हिंदी↔English बटन, hreflang और दोनों भाषाओं वाला sitemap अपने-आप बनता है। वीडियो के शीर्षक और विवरण YouTube जैसे हैं, उन्हें अनुवाद नहीं किया जाता।
- गैपिस्तान के कलाकार: `content/site.json` के `artists` में (फ़ोटो `public/img/cast/`)। हर कार्ड गैपिस्तान की प्रोफ़ाइल से जुड़ा है।
- होम की ऊपर की रील: ऊपर की पट्टी में राजा का बाजा के सारे एपिसोड, नीचे की पट्टी में फ़िल्मी अदालत और बाक़ी वीडियो (`reelStrips()` in `scripts/build.mjs`)।
- ऊपर की पट्टी के ऊपर "दौड़ की लेन": 3D कार्टून राजा और मंत्री सात कॉमेडी सीनों में दौड़ते हैं (तलवार वाला पीछा, गाड़ी, टैक्स की रसीद वाला पीछा, तीर-कमान, स्कूटर की व्हीली, रिक्शा + जलेबी, गुलाटी)। कैरेक्टर तस्वीरों से नहीं, कोड से बने हैं (three.js, `src3d/`), पर पोशाक एपिसोड वाली है: राजा का ऊँचा सुनहरा मुकुट (काली प्लेट, नीला नग), लाल अंगरखा, काला दुपट्टा, मोतियों की माला, केसरिया धोती; मंत्री का केसरिया साफ़ा, गुलाबी लंबा अंगरखा, सफ़ेद माला। दोनों जवान और बिना मूँछ के (`src3d/chars.js`)। लेन तभी लोड होती है जब वह स्क्रीन के पास आए (`public/js/stunt3d.js`, लोडर `src/app.js`), स्क्रीन से बाहर या टैब छिपा होने पर रुक जाती है; Reduce motion, Save-Data या WebGL न हो तो छिपी रहती है। `src3d/` बदलने पर `scripts/bundle-3d.sh` चलाकर बंडल दोबारा बनाइए (npm से three@0.170.0 और esbuild एक बार खींचता है)।
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

## सम्मान दीजिए (पेमेंट, Razorpay)

- बॉक्स और पेज का टेक्स्ट: `content/gift.json` (हिंदी और English, राशियाँ, न्यूनतम ₹20 और अधिकतम ₹50,000, और terms/refund/shipping/pricing पेजों का टेक्स्ट)। बंद करना हो तो `"enabled": false`।
- सर्वर: `src/worker.js` (`/api/order`, `/api/verify`, `/api/status`)। Cloudflare में Workers > `pichchrapa-website` > Settings > Variables and Secrets में दो **Secret** चाहिए: `RZP_KEY_ID` और `RZP_KEY_SECRET` (वही Razorpay live keys जो IFA और गैपिस्तान में हैं)। इन्हें चैट या रेपो में कभी न डालें।
- जब तक दोनों Secret नहीं हैं, `https://pichchrapa.com/api/status` `{"payments":"off"}` देता है और बॉक्स, मेन्यू का लिंक और /support/ का फ़ॉर्म साइट पर दिखते ही नहीं। Secret डालते ही (`"payments":"on"`) अपने-आप दिखने लगते हैं, दोबारा deploy की ज़रूरत नहीं।
- देने वाले का नाम और संदेश Razorpay Dashboard > Payments > भुगतान > Notes में दिखता है।
- Razorpay को वेबसाइट दिखाते समय ये पेज चाहिए: /terms/, /refund-policy/, /shipping-policy/, /pricing/, /contact/, /privacy/ (सब फ़ुटर में जुड़े हैं)।
