# Indian Films Academy वेबसाइट (indianfilmsacademy.com)

यह फ़ोल्डर IFA की नई साइट है। यह gapistaan.com की तरह ही बनती और चलती है, बस Cloudflare पर अलग Worker (`ifa-website`) से, जिसका Root directory `ifa` है।

- साइट का सारा टेक्स्ट, कोर्स, फ़ीस, FAQ, संपर्क: `content/site.json`
- YouTube वीडियो: हर घंटे `scripts/fetch-videos.mjs` से `data/videos.json` (चैनल @indianfilmsacademyy)। किसी वीडियो को साइट से छिपाना हो तो उसकी ID `hiddenVideos` में डालें।
- Instagram: `content/site.json` में `instagramFeed` (Behold.so का JSON feed URL) डालते ही हर घंटे `data/instagram.json` बनेगा।
- ऑनलाइन कोर्स का Graphy लिंक: `graphyUrl`। Facebook/Instagram प्रोफ़ाइल: `facebookUrl`, `instagramUrl`।
- पुरानी WordPress साइट के लिंक नए पेजों पर: `public/_redirects`
- फ़ोटो: `public/img/` (गैलरी `public/img/g/`, नाम `L-` = दिग्गजों के साथ, `V-` = एकेडमी में आए मेहमान)

लोकल पर बनाना: `node ifa/scripts/build.mjs`

## Online admission and payments (Razorpay)

- `/admission/` → the browser asks `/api/order` for a Razorpay order (the ₹500 registration fee is fixed in
  `src/worker.js`, not taken from the browser), opens Razorpay Checkout (UPI, Google Pay, PhonePe, cards,
  netbanking), then `/api/verify` checks the signature, captures the payment and returns a registration
  number like `IFA-2026-0001`. The Razorpay webhook (`/api/razorpay-webhook`, events `payment.captured`,
  `order.paid`) does the same if the student closes the page early. Numbers come from one SQLite Durable
  Object (`Registry`), so they never repeat.
- Support box on the classes pages uses the same flow with `kind: "support"` (any amount from ₹10).
- Notifications on every payment: WhatsApp to the owner (CallMeBot), email to the owner and a confirmation
  email to the student (SMTP from the info@ mailbox on Hostinger), optional Telegram.
- Registrations list: `https://indianfilmsacademy.com/api/admin?key=ADMIN_KEY` (add `&csv=1` for Excel).
  Test all notifications: `/api/admin/test?key=ADMIN_KEY&to=you@example.com`.
- Until the Razorpay secrets are set, `/api/order` returns 503 and the form falls back to WhatsApp.

Worker secrets (Cloudflare > Workers & Pages > ifa-website > Settings > Variables and Secrets, type Secret):
`RZP_KEY_ID`, `RZP_KEY_SECRET`, `RZP_WEBHOOK_SECRET`, `ADMIN_KEY`, `NOTIFY_TO` (comma separated emails),
`SMTP_USER`, `SMTP_PASS` (optional `SMTP_HOST`, default smtp.hostinger.com:465), `WA_PHONE`, `WA_APIKEY`,
optional `TG_TOKEN`, `TG_CHAT`. Never put these in the repository or in chat.
