"""Kiler malzemeleri için Wikimedia Commons'tan (CC lisanslı) benzersiz minik ikon üretir.
Çıktı: public/ingredient-icons/<id>.jpg (96x96) + src/data/ingredientIconCredits.json
"""
import io
import json
import os
import sys
import time
import urllib.parse
import urllib.request

from PIL import Image

ROOT = r"c:\Users\Taha\Desktop\nepisirsem"
OUT_DIR = os.path.join(ROOT, "public", "ingredient-icons")
CREDITS = os.path.join(ROOT, "src", "data", "ingredientIconCredits.json")
UA = {"User-Agent": "NePisirsemApp/1.2 (tahafirat3365@gmail.com) icon-builder"}

# id -> aday kaynaklar (sırayla denenir). en:/tr: Wikipedia sayfa görseli, search: Commons dosya araması
MAP = {
    "su": ["en:Bottled water", "search:glass of water"], "maden-suyu": ["en:Carbonated water"],
    "tuz": ["en:Salt", "search:table salt"], "sivi-yag": ["en:Sunflower oil"], "zeytinyagi": ["en:Olive oil"],
    "tereyagi": ["en:Butter"], "salca": ["en:Tomato paste"], "un": ["en:Flour"], "seker": ["en:Sugar", "search:white sugar"],
    "pudra-sekeri": ["en:Powdered sugar"], "karabiber": ["en:Black pepper"], "pul-biber": ["en:Aleppo pepper", "search:pul biber"],
    "nane": ["search:dried mint leaves", "en:Spearmint"], "kekik": ["en:Thyme"], "kimyon": ["en:Cumin"],
    "sogan": ["en:Onion"], "sarimsak": ["en:Garlic"], "domates": ["en:Tomato"], "patates": ["en:Potato"],
    "yesil-biber": ["search:sivri biber", "search:green chili peppers"], "kirmizi-biber": ["en:Bell pepper"],
    "kuru-biber": ["search:dried red peppers string"], "kuru-patlican": ["search:dried eggplant turkey"],
    "salatalik": ["en:Cucumber"], "havuc": ["en:Carrot"], "patlican": ["en:Eggplant"], "kabak": ["en:Zucchini"],
    "ispanak": ["en:Spinach"], "mantar": ["en:Agaricus bisporus"], "taze-fasulye": ["en:Green bean"], "bezelye": ["en:Pea"],
    "bakla": ["en:Vicia faba"], "pirasa": ["en:Leek"], "karnabahar": ["en:Cauliflower"], "brokoli": ["en:Broccoli"],
    "lahana": ["en:Cabbage"], "kara-lahana": ["en:Collard (plant)"], "enginar": ["en:Artichoke"], "kereviz": ["en:Celeriac"],
    "yer-elmasi": ["en:Jerusalem artichoke"], "semizotu": ["en:Portulaca oleracea"], "pazi": ["en:Chard"], "bamya": ["en:Okra"],
    "maydanoz": ["en:Parsley"], "dereotu": ["en:Dill"], "taze-nane": ["en:Mentha"], "reyhan": ["en:Basil"],
    "roka": ["en:Eruca vesicaria"], "taze-sogan": ["en:Scallion"], "marul": ["en:Lettuce"], "asma-yapragi": ["search:grape leaves brine"],
    "misir": ["en:Sweet corn"], "balkabagi": ["en:Pumpkin"], "pancar": ["en:Beetroot"], "avokado": ["en:Avocado"],
    "kiyma": ["en:Ground meat"], "kusbasi-et": ["search:diced beef cubes"], "kuzu-kusbasi": ["en:Lamb and mutton"],
    "kuzu-kol": ["en:Lamb shank", "search:lamb shank"], "bonfile": ["en:Beef tenderloin"], "kuyruk-yagi": ["search:sheep tail fat"],
    "tavuk-gogsu": ["search:raw chicken breast"], "tavuk-but": ["search:chicken drumsticks raw"], "sucuk": ["en:Sucuk"],
    "pastirma": ["en:Pastirma"], "sosis": ["en:Sausage"], "hamsi": ["en:European anchovy"], "palamut": ["en:Atlantic bonito"],
    "somon": ["en:Salmon as food"], "levrek": ["en:European seabass"], "cupra": ["en:Gilt-head bream"],
    "karides": ["en:Shrimp and prawn as food", "search:shrimp food"], "kalamar": ["en:Squid as food"],
    "ton-baligi": ["search:canned tuna"], "ciger": ["en:Liver (food)"], "sakatat": ["en:Tripe"], "yumurta": ["en:Egg as food"],
    "sut": ["en:Milk"], "yogurt": ["en:Yogurt"], "beyaz-peynir": ["en:Beyaz peynir"], "kasar-peyniri": ["en:Kashkaval"],
    "mozzarella": ["en:Mozzarella"], "lor-peyniri": ["search:lor peyniri", "en:Ricotta"], "tulum-peyniri": ["en:Tulum cheese"],
    "hellim-peyniri": ["en:Halloumi"], "kunefe-peyniri": ["search:künefe cheese", "en:Hatay cheese"], "kaymak": ["en:Kaymak"],
    "krema": ["en:Cream"], "labne": ["search:labneh"], "krem-santi": ["en:Whipped cream"], "zeytin": ["en:Olive"],
    "pirinc": ["en:Rice"], "pilavlik-bulgur": ["en:Bulgur"], "koftelik-bulgur": ["search:fine bulgur", "search:bulgur wheat"],
    "firik-bulguru": ["en:Freekeh"], "kirmizi-mercimek": ["search:red lentils"], "yesil-mercimek": ["search:green lentils"],
    "nohut": ["en:Chickpea"], "kuru-fasulye": ["en:Navy bean"], "barbunya": ["en:Borlotti bean"], "borulce": ["en:Black-eyed pea"],
    "makarna": ["en:Pasta"], "arpa-sehriye": ["en:Orzo"], "eriste": ["search:erişte noodles", "en:Erişte"],
    "hazir-yufka": ["en:Yufka"], "baklavalik-yufka": ["en:Filo"], "tel-kadayif": ["en:Kataifi"], "gullac-yapragi": ["en:Güllaç"],
    "milfoy": ["en:Puff pastry"], "lavas": ["en:Lavash"], "pide-ekmegi": ["search:ramazan pidesi", "en:Pide"],
    "bayat-ekmek": ["en:Bread"], "galeta-unu": ["en:Bread crumbs"], "irmik": ["en:Semolina"], "nisasta": ["en:Corn starch"],
    "pirinc-unu": ["en:Rice flour"], "misir-unu": ["en:Cornmeal"], "toz-tarhana": ["en:Tarhana"], "kabartma-tozu": ["en:Baking powder"],
    "karbonat": ["en:Sodium bicarbonate"], "vanilya": ["en:Vanilla"], "maya": ["search:dry yeast granules", "en:Baker's yeast"],
    "kakao": ["en:Cocoa solids", "search:cocoa powder"], "petibor-biskuvi": ["en:Petit-Beurre"], "kedi-dili": ["en:Ladyfinger (biscuit)"],
    "bugday": ["en:Wheat"], "yulaf-ezmesi": ["en:Rolled oats"], "limon": ["en:Lemon"], "nar-eksisi": ["search:pomegranate molasses", "en:Pomegranate molasses"],
    "sirke": ["en:Vinegar"], "sumak": ["search:sumac spice", "en:Sumac"], "tarcin": ["en:Cinnamon"], "yenibahar": ["en:Allspice"],
    "karanfil": ["en:Clove"], "mahlep": ["en:Mahleb"], "zerdecal": ["en:Turmeric"], "zencefil": ["en:Ginger"],
    "kori": ["en:Curry powder"], "defne-yapragi": ["en:Bay leaf"], "susam": ["en:Sesame"], "corek-otu": ["en:Nigella sativa"],
    "hashas-ezmesi": ["en:Poppy seed"], "tahin": ["en:Tahini"], "pekmez": ["en:Pekmez"], "bal": ["en:Honey"],
    "mayonez": ["en:Mayonnaise"], "ketcap": ["en:Ketchup"], "hardal": ["en:Mustard (condiment)"], "soya-sosu": ["en:Soy sauce"],
    "gul-suyu": ["en:Rose water"], "salatalik-tursusu": ["en:Pickled cucumber"], "ceviz": ["en:Walnut"], "findik": ["en:Hazelnut"],
    "badem": ["en:Almond"], "antep-fistigi": ["en:Pistachio"], "yer-fistigi": ["en:Peanut"], "cam-fistigi": ["en:Pine nut"],
    "kus-uzumu": ["en:Zante currant"], "uzum": ["en:Grape"], "kuru-kayisi": ["en:Dried apricot"], "kuru-incir": ["search:dried figs"],
    "erik": ["en:Plum"], "visne": ["en:Prunus cerasus"], "hindistan-cevizi": ["en:Coconut"], "elma": ["en:Apple"],
    "ayva": ["en:Quince"], "portakal": ["en:Orange (fruit)"], "nar": ["en:Pomegranate"], "muz": ["en:Banana"],
    "cilek": ["en:Strawberry"], "cikolata": ["en:Chocolate"],
    "kahve": ["en:Turkish coffee", "en:Coffee bean"], "cay": ["en:Turkish tea", "en:Black tea"],
    "kirmizi-lahana": ["en:Red cabbage"], "turp": ["en:Radish"],
    "kisnis": ["en:Coriander"], "kavurma": ["en:Kavurma", "search:kavurma meat turkish"],
    "hindi": ["en:Turkey as food", "search:raw turkey breast"],
    "findik-kremasi": ["search:chocolate hazelnut spread jar", "en:Gianduja"],
    "recel": ["en:Fruit preserves", "search:strawberry jam jar"],
    "kuskus": ["en:Couscous"], "kinoa": ["en:Quinoa"],
    "chia-tohumu": ["en:Chia seed", "search:chia seeds bowl"],
    "keten-tohumu": ["search:flax seeds bowl", "en:Flax"],
    "muskat": ["en:Nutmeg"], "kakule": ["en:Cardamom"],
    "cemen": ["search:fenugreek spice seeds", "en:Fenugreek", "tr:Çemen"],
    "damla-sakizi": ["search:mastic resin chios", "en:Mastic (plant resin)"],
    "safran": ["en:Saffron"], "biberiye": ["en:Rosemary"],
    "rezene": ["en:Fennel"], "aci-sos": ["en:Hot sauce", "search:red chili sauce bowl"],
    "armut": ["en:Pear"], "seftali": ["en:Peach"],
    "frambuaz": ["en:Raspberry"], "kivi": ["en:Kiwifruit"],
    "ananas": ["en:Pineapple"], "kavun": ["en:Cantaloupe", "en:Muskmelon"],
    "hurma": ["search:dried dates fruit", "en:Date palm"],
    "kestane": ["en:Chestnut"], "ay-cekirdegi": ["en:Sunflower seed"],
}

OVERRIDES = {}
if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
    OVERRIDES = json.load(open(sys.argv[1], encoding="utf-8"))


def get_json(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def wiki_page_image(lang, title):
    q = urllib.parse.urlencode({
        "action": "query", "format": "json", "redirects": 1, "titles": title,
        "prop": "pageimages", "piprop": "name|original", "pilicense": "free",
    })
    data = get_json(f"https://{lang}.wikipedia.org/w/api.php?{q}")
    for page in data.get("query", {}).get("pages", {}).values():
        name = page.get("pageimage")
        if name:
            return name
    return None


def commons_search(query):
    q = urllib.parse.urlencode({
        "action": "query", "format": "json", "list": "search", "srnamespace": 6,
        "srsearch": f"{query} filetype:bitmap", "srlimit": 5,
    })
    data = get_json(f"https://commons.wikimedia.org/w/api.php?{q}")
    for hit in data.get("query", {}).get("search", []):
        t = hit["title"]
        if t.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
            return t.replace("File:", "", 1)
    return None


def commons_info(filename):
    q = urllib.parse.urlencode({
        "action": "query", "format": "json", "titles": f"File:{filename}",
        "prop": "imageinfo", "iiprop": "url|extmetadata", "iiurlwidth": 256,
    })
    data = get_json(f"https://commons.wikimedia.org/w/api.php?{q}")
    for page in data.get("query", {}).get("pages", {}).values():
        info = (page.get("imageinfo") or [None])[0]
        if not info:
            return None
        meta = info.get("extmetadata", {})
        strip = lambda v: __import__("re").sub(r"<[^>]+>", "", (v or {}).get("value", "")).strip()
        return {
            "thumb": info.get("thumburl") or info.get("url"),
            "page": info.get("descriptionurl"),
            "artist": strip(meta.get("Artist"))[:120],
            "license": strip(meta.get("LicenseShortName")) or "Wikimedia Commons",
        }
    return None


def make_icon(url, dest):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as r:
        img = Image.open(io.BytesIO(r.read())).convert("RGB")
    w, h = img.size
    s = min(w, h)
    img = img.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s)).resize((96, 96), Image.LANCZOS)
    img.save(dest, "JPEG", quality=82, optimize=True)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    credits = json.load(open(CREDITS, encoding="utf-8")) if os.path.exists(CREDITS) else {}
    only = set(OVERRIDES.keys()) if OVERRIDES else None
    used_files = {v["file"]: k for k, v in credits.items() if only is None or k not in only}
    failed = []
    for ing_id, sources in MAP.items():
        if only is not None and ing_id not in only:
            continue
        if only is None and ing_id in credits and os.path.exists(os.path.join(OUT_DIR, f"{ing_id}.jpg")):
            continue
        cands = OVERRIDES.get(ing_id, sources)
        done = False
        for src in cands:
            try:
                kind, val = src.split(":", 1)
                if kind == "file":
                    fname = val
                elif kind == "search":
                    fname = commons_search(val)
                else:
                    fname = wiki_page_image(kind, val)
                if not fname or fname in used_files:
                    continue
                info = commons_info(fname)
                if not info or not info["thumb"]:
                    continue
                make_icon(info["thumb"], os.path.join(OUT_DIR, f"{ing_id}.jpg"))
                credits[ing_id] = {"file": fname, "page": info["page"], "artist": info["artist"], "license": info["license"]}
                used_files[fname] = ing_id
                done = True
                break
            except Exception as e:  # noqa
                print("ERR", ing_id, src, e)
            finally:
                time.sleep(0.15)
        if not done:
            failed.append(ing_id)
    json.dump(credits, open(CREDITS, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("OK", len(credits), "FAILED", failed)


if __name__ == "__main__":
    main()
