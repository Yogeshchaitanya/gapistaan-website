# Indian Films Academy वेबसाइट (indianfilmsacademy.com)

यह फ़ोल्डर IFA की नई साइट है। यह gapistaan.com की तरह ही बनती और चलती है, बस Cloudflare पर अलग Worker (`ifa-website`) से, जिसका Root directory `ifa` है।

- साइट का सारा टेक्स्ट, कोर्स, फ़ीस, FAQ, संपर्क: `content/site.json`
- YouTube वीडियो: हर घंटे `scripts/fetch-videos.mjs` से `data/videos.json` (चैनल @indianfilmsacademyy)। किसी वीडियो को साइट से छिपाना हो तो उसकी ID `hiddenVideos` में डालें।
- Instagram: `content/site.json` में `instagramFeed` (Behold.so का JSON feed URL) डालते ही हर घंटे `data/instagram.json` बनेगा।
- ऑनलाइन कोर्स का Graphy लिंक: `graphyUrl`। Facebook/Instagram प्रोफ़ाइल: `facebookUrl`, `instagramUrl`।
- पुरानी WordPress साइट के लिंक नए पेजों पर: `public/_redirects`
- फ़ोटो: `public/img/` (गैलरी `public/img/g/`, नाम `L-` = दिग्गजों के साथ, `V-` = एकेडमी में आए मेहमान)

लोकल पर बनाना: `node ifa/scripts/build.mjs`
