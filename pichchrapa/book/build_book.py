#!/usr/bin/env python3
"""
योगेश चैतन्य की किताबों का mobile flipbook (pichchrapa.com/book/) बनाने वाला script.

क्या करता है (books.json में लिखी हर किताब के लिए):
  1. PDF के हर पन्ने से bleed (3 mm) काटकर दो WebP बनाता है:
       pages/  पलटने के लिए (हल्की)      zoom/  ज़ूम करके पढ़ने के लिए (HD)
  2. हर पन्ने की हर लाइन की जगह (box) निकालता है, ताकि टैप करने पर वही लाइन बड़ी होकर दिखे
  3. Hard-cover PDF से आगे और पीछे का कवर काटता है (खंड वाली किताब पर सुनहरा "खंड" फीता)
  4. अंदर के मोटे कागज़ (endpaper) जोड़ता है, ताकि असली hardcover जैसा लगे
  5. PDF के bookmarks से विषय-सूची, और WhatsApp preview के लिए og.jpg बनाता है
  6. ../public/book/<slug>/index.html (reader) और ../public/book/index.html (अलमारी) लिखता है

चलाना:
  pip install pymupdf pillow fonttools brotli
  python3 build_book.py              # सारी किताबें
  python3 build_book.py khand-1      # सिर्फ़ एक (slug)
फिर: node pichchrapa/scripts/build.mjs   (public/ को dist/ में कॉपी करता है), commit और push.

नई PDF आए तो: pdf/ में उसी नाम से रख दीजिए और यही script दोबारा चलाइए।
"""
import json, sys, shutil, html, hashlib
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = Path(__file__).resolve().parent
CFG = json.loads((HERE / "books.json").read_text(encoding="utf-8"))
OUT = (HERE / CFG.get("outDir", "../public/book")).resolve()
FLIP_W = CFG.get("flipWidth", 900)
ZOOM_W = CFG.get("zoomWidth", 1700)
SITE = CFG.get("siteUrl", "https://pichchrapa.com")
MM = 72 / 25.4


# ---------- पन्ने ----------
def render(page, width, clip):
    z = width / clip.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(z, z), clip=clip, alpha=False)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def trimmed(page, bleed_mm):
    r, b = page.rect, bleed_mm * MM
    return pymupdf.Rect(r.x0 + b, r.y0 + b, r.x1 - b, r.y1 - b)


def page_lines(page, clip):
    """पन्ने की लाइनों के box (0..1 में, कटे हुए पन्ने के हिसाब से), पढ़ने के क्रम में।"""
    W, H = clip.width, clip.height
    raw = []
    for b in page.get_text("dict", clip=clip)["blocks"]:
        if b.get("type") != 0:
            continue
        for ln in b["lines"]:
            if not "".join(s["text"] for s in ln["spans"]).strip():
                continue
            x0, y0, x1, y1 = ln["bbox"]
            if (y1 - y0) < 3 or (x1 - x0) < 2:
                continue
            raw.append([x0 - clip.x0, y0 - clip.y0, x1 - clip.x0, y1 - clip.y0])
    raw.sort(key=lambda r: (r[1], r[0]))
    merged = []
    for r in raw:   # एक ही पंक्ति के टुकड़े जोड़ो
        for m in merged:
            ov = min(m[3], r[3]) - max(m[1], r[1])
            hmin = min(m[3] - m[1], r[3] - r[1])
            gap = max(r[0] - m[2], m[0] - r[2])
            if hmin > 0 and ov / hmin > 0.55 and gap < W * 0.05:
                m[:] = [min(m[0], r[0]), min(m[1], r[1]), max(m[2], r[2]), max(m[3], r[3])]
                break
        else:
            merged.append(list(r))
    merged.sort(key=lambda r: (r[1], r[0]))
    # शब्दों के बीच की जगहें: बड़ी पट्टी में लंबी लाइन को शब्द पर ही तोड़कर 2-3 पंक्तियों में दिखाने के लिए
    words = [(w[0] - clip.x0, w[1] - clip.y0, w[2] - clip.x0, w[3] - clip.y0) for w in page.get_text("words", clip=clip)]
    out = []
    for x0, y0, x1, y1 in merged:
        ws = sorted(w for w in words if y0 - 1 <= (w[1] + w[3]) / 2 <= y1 + 1 and w[0] >= x0 - 1 and w[2] <= x1 + 1)
        gaps = [round((ws[i][2] + ws[i + 1][0]) / 2 / W, 3) for i in range(len(ws) - 1) if ws[i + 1][0] - ws[i][2] > 0.8]
        ph, pw = (y1 - y0) * 0.15, W * 0.008
        out.append([round(max(0, x0 - pw) / W, 4), round(max(0, y0 - ph) / H, 4),
                    round(min(W, x1 + pw) / W, 4), round(min(H, y1 + ph) / H, 4), gaps])
    return out


# ---------- कवर ----------
FONT = HERE / "build-fonts"


def text_runs(draw, xy, text, size, fill, weight=600):
    """देवनागरी और अंक/लैटिन को अलग font से, एक के बाद एक लिखो। चौड़ाई लौटाओ।"""
    dev = ImageFont.truetype(str(FONT / f"hind-devanagari-{weight}-normal.ttf"), size, layout_engine=ImageFont.Layout.RAQM)
    lat = ImageFont.truetype(str(FONT / f"hind-latin-{weight}-normal.ttf"), size, layout_engine=ImageFont.Layout.RAQM)
    runs, cur, kind = [], "", None
    for ch in text:
        k = "d" if "ऀ" <= ch <= "ॿ" else ("s" if ch == " " else "l")
        if k == "s":
            k = kind or "l"
        if kind and k != kind:
            runs.append((kind, cur)); cur = ""
        kind = k; cur += ch
    if cur:
        runs.append((kind, cur))
    x, y = xy
    for k, t in runs:
        f = dev if k == "d" else lat
        if draw is not None:
            draw.text((x, y), t, font=f, fill=fill)
        x += draw.textlength(t, font=f) if draw is not None else f.getlength(t)
    return x - xy[0]


def cover_images(book, aspect):
    c = book["cover"]
    doc = pymupdf.open(HERE / c["pdf"])
    pg = doc[0]
    res = {}
    for side in ("front", "back"):
        x0, y0, x1, y1 = c[side]
        rect = pymupdf.Rect(x0 * MM, y0 * MM, x1 * MM, y1 * MM)
        # किताब के पन्ने के अनुपात में ऊँचाई ठीक करो (ऊपर से 65%, नीचे से 35% काटो)
        want_h = rect.width * aspect
        extra = rect.height - want_h
        if extra > 0:
            rect = pymupdf.Rect(rect.x0, rect.y0 + extra * 0.65, rect.x1, rect.y1 - extra * 0.35)
        else:
            rect = pymupdf.Rect(rect.x0, rect.y0 + extra / 2, rect.x1, rect.y1 - extra / 2)
        res[side] = (render(pg, ZOOM_W, rect))
    doc.close()
    badge = book.get("badge")
    if badge:
        im = res["front"]; W, H = im.size
        d = ImageDraw.Draw(im, "RGBA")
        size = int(W * 0.045)
        tw = text_runs(None, (0, 0), badge, size, None)
        pad_x, pad_y = int(size * 0.9), int(size * 0.35)
        bw, bh = int(tw + pad_x * 2), int(size * 1.55)
        by = int(H * book.get("badgeY", 0.385))
        bx = int(W * 0.94 - bw) if book.get("badgeAlign") == "right" else (W - bw) // 2   # चेहरे पर कुछ नहीं
        # सुनहरा फीता, हल्की छाया के साथ
        sh = Image.new("RGBA", im.size, (0, 0, 0, 0))
        ImageDraw.Draw(sh).rounded_rectangle([bx + 4, by + 6, bx + bw + 4, by + bh + 6], radius=bh // 2, fill=(0, 0, 0, 150))
        im.paste(sh.filter(ImageFilter.GaussianBlur(8)), (0, 0), sh.filter(ImageFilter.GaussianBlur(8)))
        d = ImageDraw.Draw(im, "RGBA")
        d.rounded_rectangle([bx, by, bx + bw, by + bh], radius=bh // 2, fill=(208, 168, 92, 245), outline=(255, 228, 170, 255), width=2)
        text_runs(d, (bx + pad_x, by + pad_y - int(size * 0.08)), badge, size, (28, 20, 10))
    return res


def save_page(img, dest, idx):
    name = f"p{idx:04d}.webp"
    z = img if img.width <= ZOOM_W else img.resize((ZOOM_W, round(img.height * ZOOM_W / img.width)), Image.LANCZOS)
    z.save(dest / "zoom" / name, "WEBP", quality=62, method=4)
    f = img.resize((FLIP_W, round(img.height * FLIP_W / img.width)), Image.LANCZOS)
    f.save(dest / "pages" / name, "WEBP", quality=74, method=4)


# ---------- किताब ----------
def build(book):
    slug = book["slug"]
    dest = OUT / slug
    if dest.exists():
        shutil.rmtree(dest)
    (dest / "pages").mkdir(parents=True)
    (dest / "zoom").mkdir()

    doc = pymupdf.open(HERE / book["pdf"])
    bleed = book.get("bleedMm", 0)
    first = trimmed(doc[0], bleed)
    aspect = first.height / first.width

    kinds, lines, folio = [], [], []   # kinds: c=आगे का कवर, e=endpaper, p=पन्ना, w=ख़ाली, b=पीछे का कवर
    covers = cover_images(book, aspect) if book.get("cover") else None

    def add(kind, img=None, ln=None, num=None):
        kinds.append(kind); lines.append(ln or []); folio.append(num)
        if img is not None:
            save_page(img, dest, len(kinds))

    if covers:
        add("c", covers["front"]); add("e")
    for i, page in enumerate(doc):
        clip = trimmed(page, bleed)
        img = render(page, ZOOM_W, clip)
        add("p", img, page_lines(page, clip), i + 1)
        if (i + 1) % 40 == 0:
            print(f"  {slug}: {i + 1}/{len(doc)}", flush=True)
    offset = 2 if covers else 0
    if covers:
        if (len(kinds) + 2) % 2:   # showCover में कुल पन्ने सम चाहिए
            add("w")
        add("e"); add("b", covers["back"])

    toc = [{"l": l, "t": t.strip(), "p": p - 1 + offset}
           for l, t, p, *_ in doc.get_toc() if l <= book.get("tocLevels", 2) and p >= 1]
    doc.close()

    # cover: अलमारी और WhatsApp preview
    cover = Image.open(dest / "pages" / "p0001.webp").convert("RGB")
    c = cover.copy(); c.thumbnail((520, 800)); c.save(dest / "cover.webp", "WEBP", quality=82)
    og = Image.new("RGB", (1200, 630), (14, 12, 10))
    bg = cover.copy().resize((1200, round(1200 * cover.height / cover.width))).crop((0, 200, 1200, 830))
    og.paste(bg.filter(ImageFilter.GaussianBlur(28)).point(lambda v: int(v * 0.45)), (0, 0))
    cv = cover.copy(); cv.thumbnail((400, 570))
    og.paste(cv, ((1200 - cv.width) // 2, (630 - cv.height) // 2))
    og.save(dest / "og.jpg", "JPEG", quality=84)

    ver = hashlib.sha1(f"{len(kinds)}-{(HERE / book['pdf']).stat().st_mtime}-{FLIP_W}-{ZOOM_W}".encode()).hexdigest()[:8]
    data = {"slug": slug, "title": book["title"], "subtitle": book.get("subtitle", ""),
            "author": book.get("author", ""), "lang": book.get("lang", "hi"),
            "aspect": round(aspect, 5), "ver": ver, "kinds": "".join(kinds), "folio": folio,
            "toc": toc, "lines": lines}
    (dest / "book.json").write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    write_reader(book, data)
    n_img = len(list((dest / "pages").iterdir()))
    size = sum(f.stat().st_size for f in dest.rglob("*") if f.is_file()) / 1e6
    print(f"✔ {slug}: {len(kinds)} पन्ने ({n_img} तस्वीरें), विषय {len(toc)}, लाइनें {sum(map(len, lines))}, {size:.0f} MB", flush=True)


def write_reader(book, data):
    slug, ver, dest = book["slug"], data["ver"], OUT / book["slug"]
    e = lambda s: html.escape(s or "", quote=True)
    (dest / "index.html").write_text(fill(
        "reader.html", AV=assets_ver(), LANG=e(data["lang"]), TITLE=e(book["title"]), SUBTITLE=e(book.get("subtitle", "")),
        AUTHOR=e(book.get("author", "")), SLUG=e(slug), VER=ver, ASPECT=str(data["aspect"]), SITE=SITE,
        DESC=e(book.get("description", book.get("subtitle", ""))), UI=book.get("ui", "hi"),
    ), encoding="utf-8")


def assets_ver():
    h = hashlib.sha1()
    for f in sorted((HERE / "assets").iterdir()):
        h.update(f.read_bytes())
    return h.hexdigest()[:8]


def fill(tpl, **kv):
    s = (HERE / "template" / tpl).read_text(encoding="utf-8")
    for k, v in kv.items():
        s = s.replace("{{" + k + "}}", v)
    return s


def library():
    e = lambda s: html.escape(s or "", quote=True)
    cards = "\n".join(
        f'<a class="shelf-book" href="./{e(b["slug"])}/" lang="{e(b.get("lang","hi"))}">'
        f'<span class="b3d"><img src="./{e(b["slug"])}/cover.webp?v={e(str(b.get("v","1")))}" alt="{e(b["title"])}" loading="lazy" width="520" height="738">'
        f'<i class="edge"></i></span><b>{e(b.get("shelfLabel", b["title"]))}</b><small>{e(b.get("shelfNote", ""))}</small></a>'
        for b in CFG["books"])
    lib = CFG.get("library", {})
    (OUT / "index.html").write_text(fill(
        "library.html", AV=assets_ver(), CARDS=cards, SITE=SITE, OG=e(CFG["books"][0]["slug"]),
        LIBTITLE=e(lib.get("title", "")), LIBSUB=e(lib.get("subtitle", "")), LIBNOTE=e(lib.get("note", "")),
    ), encoding="utf-8")


def copy_assets():
    a = OUT / "assets"
    a.mkdir(parents=True, exist_ok=True)
    for f in (HERE / "assets").iterdir():
        shutil.copy2(f, a / f.name)


if __name__ == "__main__":
    args = sys.argv[1:]
    OUT.mkdir(parents=True, exist_ok=True)
    copy_assets()
    if "--html" in args:   # सिर्फ़ पेज (HTML/CSS/JS) दोबारा, तस्वीरें वही
        for b in CFG["books"]:
            write_reader(b, json.loads((OUT / b["slug"] / "book.json").read_text(encoding="utf-8")))
        library(); print("HTML ताज़ा"); sys.exit()
    if "--lines" in args:   # सिर्फ़ लाइनें और विषय-सूची दोबारा (तस्वीरें वही)
        for b in CFG["books"]:
            if len(args) > 1 and b["slug"] not in args: continue
            p = OUT / b["slug"] / "book.json"; data = json.loads(p.read_text(encoding="utf-8"))
            doc = pymupdf.open(HERE / b["pdf"]); off = data["kinds"].index("p")
            for i, page in enumerate(doc):
                data["lines"][off + i] = page_lines(page, trimmed(page, b.get("bleedMm", 0)))
            data["toc"] = [{"l": l, "t": t.strip(), "p": pg - 1 + off} for l, t, pg, *_ in doc.get_toc() if l <= b.get("tocLevels", 2) and pg >= 1]
            p.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"); print("lines", b["slug"])
        sys.exit()
    only = set(args)
    for b in CFG["books"]:
        if not only or b["slug"] in only:
            build(b)
    library()
    print("पूरा:", OUT)
