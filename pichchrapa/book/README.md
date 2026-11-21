# किताबें: mobile flipbook (pichchrapa.com/book/)

योगेश सिनेएक्ट की हिंदी (खंड 1, खंड 2) और English किताब, फ़ोन/टैबलेट पर असली किताब की तरह पन्ने पलटकर पढ़ने के लिए।

- **पता:** https://pichchrapa.com/book/ (अलमारी), सीधे: `/book/khand-1/`, `/book/khand-2/`, `/book/english/`। किसी पन्ने का link: `/book/khand-1/#p=45`
- **Google पर नहीं दिखती** (noindex)। पर link जिसके पास है, वो पढ़ सकता है।

## नई PDF आए तो
1. PDF को `book/pdf/` में उसी नाम से रखिए: `hi-khand-1.pdf`, `hi-khand-2.pdf`, `en.pdf` (cover: `cover-hi.pdf`, `cover-en.pdf`)। PDF repo में नहीं जातीं (.gitignore)।
2. `python3 book/build_book.py` (या सिर्फ़ एक: `python3 book/build_book.py khand-1`)
3. `node pichchrapa/scripts/build.mjs`, फिर commit और push। Cloudflare 1–2 मिनट में live कर देता है।

सिर्फ़ डिज़ाइन/JS बदला हो: `python3 book/build_book.py --html`. सिर्फ़ लाइनें/विषय-सूची: `--lines`.

## फ़ाइलें
- `build_book.py`: Python. PDF → पन्नों की WebP (`pages/` पलटने के लिए, `zoom/` HD), हर लाइन की जगह, विषय-सूची, कवर (खंड वाला सुनहरा फीता), og.jpg
- `books.json`: कौन-सी किताब, नाम, कवर कहाँ से कटे
- `template/`: reader और अलमारी के HTML
- `assets/book.js`, `book.css`: पन्ना पलटना (StPageFlip, MIT), आवाज़, ज़ूम, लाइन-रीडर, विषय-सूची
- `make_sounds.py`: पन्ना पलटने की आवाज़ (खुद बनाई, कोई copyright नहीं)
