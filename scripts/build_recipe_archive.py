"""Açık lisanslı Türk tarif veri setlerinden (104bit MIT, mmkocak Apache-2.0)
uygulamaya uygun, kiler ile %100 eşleşen, temizlenmiş Türk tarifi arşivi üretir.
Çıktı: public/data/recipes-tr.json (kompakt)"""
import html
import json
import os
import re
import sys
import unicodedata
from collections import Counter

DS = r"C:\Users\Taha\.gemini\antigravity\brain\e9820afa-d56d-4ebf-907d-50845aafbd13\scratch\ds"
ROOT = r"c:\Users\Taha\Desktop\nepisirsem"
OUT = os.path.join(ROOT, "public", "data", "recipes-tr.json")
EXISTING_TITLES = os.path.join(DS, "existing_titles.json")
MAX_RECIPES = int(sys.argv[1]) if len(sys.argv) > 1 else 12000

table = json.load(open(os.path.join(DS, "ingredients_table.json"), encoding="utf-8"))


def lower_tr(s: str) -> str:
    s = html.unescape(str(s or ""))
    s = unicodedata.normalize("NFC", s)
    return s.replace("I", "ı").replace("İ", "i").lower().replace("\u0307", "")


# ---------- Malzeme sözlüğü ----------
PHRASES: dict[str, str] = {}
for it in table["items"]:
    PHRASES[lower_tr(it["name"])] = it["name"]
    for a in it["aliases"]:
        PHRASES.setdefault(lower_tr(a), it["name"])

EXTRA = {
    "sıvıyağ": "sıvı yağ", "sıvı yağı": "sıvı yağ", "ayçiçek yağı": "sıvı yağ", "ayçiçeği yağı": "sıvı yağ",
    "mısırözü yağı": "sıvı yağ", "mısır özü yağı": "sıvı yağ", "kızartma yağı": "sıvı yağ", "yağ": "sıvı yağ",
    "zeytin yağı": "zeytinyağı", "sızma zeytinyağı": "zeytinyağı",
    "tere yağı": "tereyağı", "tereyağ": "tereyağı", "tereayağı": "tereyağı", "tereçağı": "tereyağı", "tereçağ": "tereyağı",
    "teremyağ": "tereyağı", "teremyağı": "tereyağı",
    "esmer şeker": "şeker", "tozşeker": "şeker", "şeker": "şeker", "pulbiber": "pul biber", "kırmızı pulbiber": "pul biber",
    "toz kırmızı biber": "pul biber", "kırmızı pul biber": "pul biber", "pul biberi": "pul biber",
    "kırmızı biber salçası": "salça", "acı biber salçası": "salça", "tatlı biber salçası": "salça",
    "çiğ krema": "krema", "sıvı krema": "krema", "sıvı krem": "krema", "süt kreması": "krema", "yemeklik krema": "krema",
    "yumurta beyazı": "yumurta", "yumurtanın sarısı": "yumurta", "yumurtanın beyazı": "yumurta", "yumurt sarısı": "yumurta", "yumurta": "yumurta",
    "ceviz içi": "ceviz", "fındık içi": "fındık", "iç fındık": "fındık", "iç ceviz": "ceviz", "toz ceviz": "ceviz",
    "parmesan": "kaşar peyniri", "kaşar": "kaşar peyniri", "rendelenmiş kaşar": "kaşar peyniri", "çedar": "kaşar peyniri",
    "cheddar": "kaşar peyniri", "dil peyniri": "künefe peyniri", "tost peyniri": "kaşar peyniri", "ezine peyniri": "beyaz peynir",
    "feta": "beyaz peynir", "lor": "lor peyniri", "krem peynir": "labne", "labne peyniri": "labne",
    "dana kuşbaşı": "kuşbaşı et", "kemikli et": "kuşbaşı et", "dana et": "kuşbaşı et", "kırmızı et": "kuşbaşı et",
    "et": "kuşbaşı et", "kavurma": "kavurma", "hindi": "hindi eti", "hindi göğüs": "hindi eti",
    "kuzu eti": "kuzu kuşbaşı", "kuzu kuşbaşı": "kuzu kuşbaşı", "kuzu incik": "kuzu kol",
    "kıyma": "kıyma", "yağlı kıyma": "kıyma", "az yağlı kıyma": "kıyma", "dana kıyması": "kıyma",
    "tavuk göğüs": "tavuk göğsü", "tavuk eti": "tavuk göğsü", "tavuk fileto": "tavuk göğsü", "piliç": "tavuk göğsü",
    "tavuk kanadı": "tavuk but", "tavuk kanat": "tavuk but", "tavuk budu": "tavuk but", "tavuk bonfile": "tavuk göğsü",
    "baget": "tavuk but", "kanat": "tavuk but",
    "domates püresi": "domates", "konserve domates": "domates", "çeri domates": "domates", "domates suyu": "domates",
    "kapya": "kırmızı biber", "kapyabiber": "kırmızı biber", "kapya biberi": "kırmızı biber", "köz biber": "kırmızı biber",
    "közlenmiş biber": "kırmızı biber", "kırmızıbiber": "kırmızı biber",
    "çarliston": "yeşil biber", "dolmalık": "yeşil biber", "sivri": "yeşil biber", "yeşilbiber": "yeşil biber",
    "sıcak su": "su", "ılık su": "su", "soğuk su": "su", "kaynar su": "su", "kaynamış su": "su", "su": "su",
    "et suyu": "su", "tavuk suyu": "su", "ılık süt": "süt", "soğuk süt": "süt", "süt": "süt",
    "buğday unu": "un", "beyaz un": "un", "kepekli un": "un", "tam buğday unu": "un", "mısır nişastası": "nişasta",
    "buğday nişastası": "nişasta", "vanilin": "vanilya", "şekerli vanilin": "vanilya", "vanilya özütü": "vanilya",
    "kuru maya": "maya", "yaş maya": "maya", "instant maya": "maya", "kabartma": "kabartma tozu",
    "limon suyu": "limon", "limon kabuğu": "limon", "limon rendesi": "limon", "limon tuzu": "limon",
    "portakal kabuğu": "portakal", "portakal suyu": "portakal", "domates salçası": "salça", "biber salçası": "salça",
    "bitter çikolata": "çikolata", "sütlü çikolata": "çikolata", "damla çikolata": "çikolata", "kuvertür": "çikolata",
    "beyaz çikolata": "çikolata", "kakao": "kakao", "bisküvi": "petibör bisküvi", "petibör": "petibör bisküvi",
    "kedi dili": "kedi dili bisküvi", "nutella": "fındık kreması", "sarelle": "fındık kreması", "çikolata kreması": "fındık kreması",
    "reçel": "reçel", "marmelat": "reçel", "türk kahvesi": "kahve", "granül kahve": "kahve", "nescafe": "kahve",
    "demli çay": "çay", "siyah çay": "çay", "yulaf": "yulaf ezmesi", "kırmızı mercimek": "kırmızı mercimek",
    "mercimek": "kırmızı mercimek", "şehriye": "arpa şehriye", "tel şehriye": "arpa şehriye", "yufka": "hazır yufka",
    "milföy": "milföy hamuru", "kuru üzüm": "üzüm", "siyah üzüm": "üzüm", "kayısı": "kuru kayısı", "incir": "kuru incir",
    "siyah zeytin": "zeytin", "yeşil zeytin": "zeytin", "kültür mantarı": "mantar", "istiridye mantarı": "mantar",
    "taze fasulye": "taze fasulye", "çalı fasulye": "taze fasulye", "dolmalık biber": "yeşil biber",
    "ton balığı": "ton balığı konservesi", "haşhaş": "haşhaş ezmesi", "elma sirkesi": "sirke", "üzüm sirkesi": "sirke",
    "soda": "maden suyu", "sade soda": "maden suyu", "çörekotu": "çörek otu", "kara lahana": "kara lahana",
    "kırmızı lahana": "kırmızı lahana", "mor lahana": "kırmızı lahana", "turp": "turp",
    "frenk soğanı": "taze soğan", "yeşil soğan": "taze soğan", "mor soğan": "soğan", "arpacık": "soğan",
    "kuru nane": "nane", "taze nane": "taze nane", "fesleğen": "reyhan", "roka": "roka", "dereotu": "dereotu", "dere otu": "dereotu",
    "maydanoz": "maydanoz", "kişniş": "kişniş", "biberiye": "biberiye", "muskat": "muskat", "rezene": "rezene", "anason": "rezene",
    "kakule": "kakule", "çemen": "çemen", "çemen otu": "çemen", "acı sos": "acı sos",
    "karbonat": "karbonat", "pudra şekeri": "pudra şekeri", "krem şanti": "krem şanti", "kremşanti": "krem şanti",
    "krem santi": "krem şanti", "şanti": "krem şanti", "süzmeyoğurt": "yoğurt",
    "hindistan cevizi": "hindistan cevizi", "irmik": "irmik", "galeta unu": "galeta unu", "nişasta": "nişasta",
    "mısır unu": "mısır unu", "pirinç unu": "pirinç unu", "bulgur": "pilavlık bulgur", "pilavlık bulgur": "pilavlık bulgur",
    "köftelik bulgur": "köftelik bulgur", "ince bulgur": "köftelik bulgur", "kuskus": "kuskus", "kinoa": "kinoa",
    "chia": "chia tohumu", "chia tohumu": "chia tohumu", "keten tohumu": "keten tohumu",
    "basmati pirinç": "pirinç", "baldo pirinç": "pirinç", "osmancık pirinç": "pirinç", "pirinç": "pirinç",
    "patates": "patates", "tatlı patates": "patates", "karabiber": "karabiber", "kimyon": "kimyon",
    "kekik": "kekik", "tarçın": "tarçın", "sumak": "sumak", "zerdeçal": "zerdeçal", "köri": "köri",
    "zencefil": "zencefil", "tuz": "tuz", "kaya tuzu": "tuz", "deniz tuzu": "tuz", "isot": "pul biber",
    "yenibahar": "yenibahar", "karanfil": "karanfil", "mahlep": "mahlep", "susam": "susam",
    "damla sakızı": "damla sakızı", "sakız": "damla sakızı", "safran": "safran", "nar ekşisi": "nar ekşisi",
    "pekmez": "pekmez", "üzüm pekmezi": "pekmez", "keçiboynuzu pekmezi": "pekmez", "bal": "bal", "tahin": "tahin",
    "mayonez": "mayonez", "ketçap": "ketçap", "hardal": "hardal", "soya sosu": "soya sosu", "soya sos": "soya sosu",
    "gül suyu": "gül suyu", "turşu": "salatalık turşusu", "kornişon": "salatalık turşusu",
    "sucuk": "sucuk", "pastırma": "pastırma", "sosis": "sosis", "salam": "sosis", "jambon": "sosis",
    "hamsi": "hamsi", "somon": "somon", "levrek": "levrek", "çipura": "çupra", "karides": "karides",
    "kalamar": "kalamar", "midye": "karides", "ciğer": "kuzu ciğeri", "işkembe": "işkembe",
    "süzme yoğurt": "yoğurt", "yoğurt": "yoğurt", "kaymak": "kaymak", "tereyağı": "tereyağı", "margarin": "tereyağı", "labne": "labne",
    "ekmek": "bayat ekmek içi", "bayat ekmek": "bayat ekmek içi", "ekmek içi": "bayat ekmek içi",
    "lavaş": "lavaş ekmeği", "pide": "pide ekmeği", "tortilla": "lavaş ekmeği", "kadayıf": "tel kadayıf",
    "güllaç": "güllaç yaprağı", "baklavalık yufka": "baklavalık yufka", "erişte": "erişte", "eriste": "erişte",
    "makarna": "makarna", "mantı": "makarna", "nohut": "nohut", "kuru fasulye": "kuru fasulye",
    "barbunya": "barbunya", "börülce": "börülce", "bakla": "bakla", "bezelye": "bezelye",
    "mısır": "mısır konservesi", "konservemısır": "mısır konservesi", "havuç": "havuç", "kabak": "kabak",
    "patlıcan": "patlıcan", "ıspanak": "ıspanak", "pırasa": "pırasa", "lahana": "beyaz lahana",
    "karnabahar": "karnabahar", "brokoli": "brokoli", "kereviz": "kereviz", "enginar": "enginar", "bamya": "bamya",
    "semizotu": "semizotu", "pazı": "pazı", "marul": "marul", "göbek marul": "marul", "salatalık": "salatalık",
    "pancar": "pancar", "kırmızı pancar": "pancar", "avokado": "avokado", "balkabağı": "balkabağı", "bal kabağı": "balkabağı",
    "asma yaprağı": "asma yaprağı", "yaprak": "asma yaprağı", "elma": "elma", "armut": "armut", "ayva": "ayva",
    "şeftali": "şeftali", "nektarin": "şeftali", "kivi": "kivi", "ananas": "ananas", "kavun": "kavun", "karpuz": "kavun",
    "hurma": "hurma", "kestane": "kestane", "frambuaz": "frambuaz", "ahududu": "frambuaz", "böğürtlen": "frambuaz", "yaban mersini": "frambuaz",
    "muz": "muz", "çilek": "çilek", "vişne": "vişne", "kiraz": "vişne", "nar": "nar", "portakal": "portakal",
    "mandalina": "portakal", "limon": "limon", "erik": "erik", "üzüm": "üzüm", "kuş üzümü": "kuş üzümü",
    "antep fıstığı": "antep fıstığı", "fıstık": "antep fıstığı", "yer fıstığı": "yer fıstığı", "çam fıstığı": "çam fıstığı",
    "badem": "badem", "fındık": "fındık", "ceviz": "ceviz", "ay çekirdeği": "ay çekirdeği", "kabak çekirdeği": "ay çekirdeği",
    "kuru kayısı": "kuru kayısı", "kuru incir": "kuru incir", "zeytin": "zeytin",
    "sarımsak": "sarımsak", "sarimsak": "sarımsak", "sarmısak": "sarımsak",
    "soğan": "soğan", "domates": "domates", "salça": "salça",
}
for k, v in EXTRA.items():
    PHRASES[lower_tr(k)] = v

KNOWN = {it["name"] for it in table["items"]}
assert all(v in KNOWN for v in EXTRA.values()), [v for v in EXTRA.values() if v not in KNOWN]
PHRASE_LIST = sorted(PHRASES.keys(), key=len, reverse=True)
PHRASE_RE = [(p, re.compile(r"(?<![a-zçğıöşü])" + re.escape(p) + r"(?:[a-zçğıöşü]{0,4})(?![a-zçğıöşü])")) for p in PHRASE_LIST]

UNITS = [
    (r"su bardağı|su bardak|bardak|sb", "su bardağı", 1), (r"çay bardağı|çay bardak", "çay bardağı", 1),
    (r"yemek kaşığı|yemek kaşık|yk|kaşık", "yemek kaşığı", 1), (r"tatlı kaşığı|tatlı kaşık|tk", "tatlı kaşığı", 1),
    (r"çay kaşığı|çay kaşık|çk", "çay kaşığı", 1), (r"kilogram|kilo|kg", "gram", 1000), (r"gram|gr|g", "gram", 1),
    (r"litre|lt", "ml", 1000), (r"mililitre|ml", "ml", 1), (r"adet|tane", "adet", 1), (r"diş", "diş", 1),
    (r"demet|bağ", "demet", 1), (r"paket|kutu|poşet|kavanoz", "paket", 1), (r"dilim", "dilim", 1),
    (r"tutam|avuç|fiske", "tutam", 1), (r"kase|kepçe", "kase", 1), (r"yaprak", "yaprak", 1),
]
UNIT_RE = re.compile(r"^(" + "|".join(u[0] for u in UNITS) + r")(?![a-zçğıöşü])")
WORD_NUM = {"yarım": 0.5, "çeyrek": 0.25, "bir": 1, "iki": 2, "üç": 3, "dört": 4, "beş": 5, "altı": 6, "yedi": 7, "sekiz": 8, "on": 10}
VAGUE = re.compile(r"(yeteri kadar|yeterince|bir miktar|biraz|göz kararı|isteğe (göre|bağlı)|arzuya göre|az miktar|bolca|ölçüsüz)")
HEADER = re.compile(r"(için|sosu|şerbeti|hamuru|harcı|üzeri|arası|süslemek)\s*:?\s*$|:$")


def parse_amount(s):
    s = s.strip()
    m = re.match(r"^(\d+(?:[.,]\d+)?)\s*(?:-|–)\s*(\d+(?:[.,]\d+)?)\s*", s)
    if m:
        a = (float(m.group(1).replace(",", ".")) + float(m.group(2).replace(",", "."))) / 2
        return a, s[m.end():]
    m = re.match(r"^(\d+)\s+(\d+)\s*/\s*(\d+)\s*", s)
    if m:
        return int(m.group(1)) + int(m.group(2)) / int(m.group(3)), s[m.end():]
    m = re.match(r"^(\d+)\s*/\s*(\d+)\s*", s)
    if m and int(m.group(2)):
        return int(m.group(1)) / int(m.group(2)), s[m.end():]
    m = re.match(r"^(\d+(?:[.,]\d+)?)\s*", s)
    if m:
        return float(m.group(1).replace(",", ".")), s[m.end():]
    w = s.split(" ", 1)[0]
    if w in WORD_NUM:
        return WORD_NUM[w], s[len(w):].strip()
    return None, s


def match_names(text):
    """Metindeki tüm bilinen malzemeleri (en uzun öncelikli) bulur."""
    found = []
    t = " " + text + " "
    for p, rx in PHRASE_RE:
        if rx.search(t):
            name = PHRASES[p]
            t = rx.sub(" # ", t)
            if name not in found:
                found.append(name)
    return found, t


def parse_ingredient(raw):
    """Dönüş: liste [(name, amount, unit, note)] ya da None (bilinmeyen malzeme)."""
    s = lower_tr(raw)
    s = re.sub(r"\([^)]*\)", " ", s)
    s = s.replace("’", "'").replace("½", "1/2").replace("¼", "1/4").strip(" -•*.")
    if not s or HEADER.search(s) and not re.search(r"\d", s):
        return []
    vague = bool(VAGUE.search(s))
    amount, rest = parse_amount(s)
    unit, mult = "adet", 1
    rest = rest.strip()
    um = UNIT_RE.match(rest)
    if um:
        tok = um.group(1)
        for pat, u, mu in UNITS:
            if re.fullmatch(pat, tok):
                unit, mult = u, mu
                break
        rest = rest[um.end():].strip()
    rest = re.sub(r"\b(lık|lik|luk|lük)\b", " ", rest)
    names, leftover = match_names(rest)
    if not names:
        return None
    leftover_words = [w for w in re.findall(r"[a-zçğıöşü]{3,}", leftover)]
    filler = {
        "büyük", "boy", "orta", "küçük", "adet", "ince", "iri", "doğranmış", "rendelenmiş", "haşlanmış", "taze", "kuru",
        "dolusu", "silme", "tepeleme", "ölçüsü", "kadar", "yeteri", "miktar", "isteğe", "göre", "bağlı", "için", "ayrıca",
        "oda", "sıcaklığında", "eritilmiş", "kıyılmış", "toz", "çekilmiş", "dövülmüş", "kavrulmuş", "çiğ", "pişmiş",
        "soyulmuş", "çekirdeksiz", "yarım", "biraz", "bir", "iki", "olarak", "ezilmiş", "doğranacak", "küp", "halka",
        "julyen", "şeklinde", "üzeri", "üzerine", "arası", "bütün", "parça", "dilimlenmiş", "yumuşamış", "erimiş",
        "veya", "yada", "ile", "ilave", "süslemek", "serpmek", "kızartmak", "tavası", "kalıbı", "yağlamak", "suyu", "suyunu",
        "sıkılmış", "kalın", "dolu", "litrelik", "gramlık", "paketlik", "kutuluk", "tatlı", "acı", "sade", "mor", "sarı",
        "kırmızı", "yeşil", "beyaz", "siyah", "sıcak", "soğuk", "ılık", "kaynar", "rende", "kabuğu", "kabukları", "içi",
        "çay", "yemek", "kaşığı", "bardağı", "fincanı", "kahve", "kaşık", "bardak", "paket", "kutu", "gram", "kilo", "dal",
        "dalı", "yaprağı", "yaprakları", "baş", "başı", "diş", "demet", "tutam", "çimdik", "avuç", "fiske", "kase", "kepçe",
        "lik", "luk", "lık", "lük", "hazır", "ev", "yapımı", "evde", "markete", "market", "tercihen", "mümkünse", "değil",
        "olmayan", "olan", "ayrı", "ayrılmış", "sarısı", "beyazı", "akı", "çırpılmış", "karışımı", "karışık", "çeşit",
    }
    unknown = [w for w in leftover_words if w not in filler]
    if len(unknown) > 2:
        return None
    a = amount if amount is not None else 1
    a = round(a * mult, 2)
    if unit == "gram" and a <= 0:
        a = 100
    note = "Göz kararı" if (amount is None or vague) else None
    out = []
    for i, n in enumerate(names):
        out.append([n, a if i == 0 else 1, unit if i == 0 else "adet", note if i == 0 else "Göz kararı"])
    return out


# ---------- Türk mutfağı filtresi ----------
FOREIGN = re.compile(
    r"(pizza|burger|sushi|suşi|tiramisu|cheesecake|cheese cake|brownie|browni|waffle|pankek|pancake|muffin|cupcake|"
    r"lazanya|spagetti|spaghetti|risotto|taco|tortilla|noodle|smoothie|milkshake|latte|frappe|kokteyl|mojito|sufle|"
    r"cookie|donut|magnolia|makaron|macaron|fajita|nachos|kruvasan|croissant|quesadilla|burrito|ramen|paella|"
    r"fettuccine|fettucine|penne|carbonara|alfredo|bolonez|pesto|gnocchi|ravioli|tagliatelle|chili|teriyaki|"
    r"sezar|caesar|hot dog|sandviç|club|enchilada|mac and|cheddar|panna cotta|crumble|cupcake|eclair|ekler|"
    r"churros|creme|crème|brulee|tart|mousse|muss|parfe|cheesecake|pudding|puding|bagel|scone|cinnabon|"
    r"tavuk kanat sos|barbekü|bbq|wrap|keto|vegan|protein|glutensiz|diyet|fit |light|\+\s*\d+\s*ay\b|\b\d+\s*aylık\b)"
)
JUNK = re.compile(r"(http|www\.|\.com|instagram|youtube|abone|videomuz|videolu|kanal|link|tıklay|nefis yemek|sitemiz|tarifimizi beğen|yorum)")
CLICKBAIT_TITLE = re.compile(
    r"(dillere destan|denemeyen kalmasın|bildiklerinizi unutun|bir dilim asla|yemelere doy|şifa deposu|tam bir şifa|"
    r"rekor kıran|olay tarif|favoriniz olacak|kapış kapış|parmak yedirten|müptelası|bayılacaksınız|"
    r"^\s*[bcçdfgğhjklmnprsştvyz]\s+|^[a-zçğıöşü]{1,2}\s+kolay\b)"
)

CAT_RULES = [
    ("corba", r"çorba"),
    ("tatli", r"tatlı|kek|pasta|kurabiye|helva|sütlaç|muhallebi|baklava|revani|şekerpare|lokma|tulumba|kadayıf|künefe|aşure|"
              r"güllaç|keşkül|puding|pelte|hoşaf|komposto|reçel|marmelat|lokum|sütlü|şerbet|çikolat|dondurma|irmik helva|"
              r"kazandibi|profiterol|supangle|trileçe|tavuk göğsü tatlı|ayva|kabak tatlı|cevizli sucuk|pestil|krem karamel"),
    ("kahvalti", r"kahvaltı|menemen|omlet|yumurta|kuymak|mıhlama|çılbır|krep|pişi|gözleme|tost|ezme kahvalt|sucuklu yumurta"),
    ("hamur_borek", r"börek|poğaça|açma|simit|pide|lahmacun|ekmek|çörek|katmer|mantı|bazlama|hamur|kurabiye tuzlu|tuzlu kurabiye|"
                    r"gözleme|bükme|sıkma|çibörek|pişi|boyoz|tuzlu kek|tuzlu"),
    ("salata_meze", r"salata|meze|ezme|piyaz|kısır|cacık|haydari|humus|turşu|tarator|kanepe|atom|babagannuş|muhammara|"
                    r"mercimek köfte|çiğ köfte|fava|şakşuka|közleme"),
    ("bakliyat_pilav", r"pilav|makarna|erişte|bulgur|kuru fasulye|nohut|mercimek|barbunya|börülce|bakliyat|şehriye|keşkek"),
    ("et_tavuk", r"tavuk|piliç|kebap|kebab|köfte|et |etli|kıyma|kuzu|dana|ciğer|balık|hamsi|levrek|çipura|somon|palamut|"
                 r"karides|kalamar|midye|sucuk|kavurma|tandır|güveç|sote|şiş|kanat|baget|bonfile|pirzola|biftek|rosto|"
                 r"tas kebab|hünkar|ali nazik|beyti|iskender|döner|tantuni|kokoreç|işkembe|kelle|paça"),
    ("sebze_zeytinyagli", r"zeytinyağlı|dolma|sarma|imam|türlü|sebze|ıspanak|pırasa|kabak|patlıcan|fasulye|bezelye|enginar|"
                          r"kereviz|karnabahar|brokoli|lahana|bamya|semizotu|pazı|mücver|musakka|karnıyarık|patates"),
]
DS_CAT = {
    "çorba": "corba", "tatlı": "tatli", "salata": "salata_meze", "kahvaltı": "kahvalti", "turşu": "salata_meze",
}


def pick_category(title, ds_cat, ing_names):
    t = lower_tr(title)
    dc = lower_tr(ds_cat or "")
    if "çorba" in dc or "çorba" in t:
        return "corba"
    for cat, rx in CAT_RULES:
        if re.search(rx, t):
            if cat == "sebze_zeytinyagli" and any(n in ing_names for n in ("kıyma", "kuşbaşı et", "tavuk göğsü", "kuzu kuşbaşı")):
                return "et_tavuk"
            return cat
    for key, cat in (("tatlı", "tatli"), ("kek", "tatli"), ("pasta", "tatli"), ("kurabiye", "tatli"), ("börek", "hamur_borek"),
                     ("poğaça", "hamur_borek"), ("ekmek", "hamur_borek"), ("hamur", "hamur_borek"), ("salata", "salata_meze"),
                     ("meze", "salata_meze"), ("kahvalt", "kahvalti"), ("pilav", "bakliyat_pilav"), ("makarna", "bakliyat_pilav"),
                     ("bakliyat", "bakliyat_pilav"), ("tavuk", "et_tavuk"), ("et ", "et_tavuk"), ("köfte", "et_tavuk"),
                     ("kebap", "et_tavuk"), ("balık", "et_tavuk"), ("sebze", "sebze_zeytinyagli"), ("zeytinyağlı", "sebze_zeytinyagli"),
                     ("dolma", "sebze_zeytinyagli")):
        if key in dc:
            return cat
    if dc in DS_CAT:
        return DS_CAT[dc]
    if any(n in ing_names for n in ("kıyma", "kuşbaşı et", "tavuk göğsü", "tavuk but", "kuzu kuşbaşı", "hamsi", "somon")):
        return "et_tavuk"
    if "şeker" in ing_names and ("un" in ing_names or "süt" in ing_names):
        return "tatli"
    return None


TITLE_NOISE = {
    "tarif", "tarifi", "tarifim", "tarifleri", "nefis", "pratik", "kolay", "enfes", "harika", "muhtesem", "muhteşem",
    "efsane", "leziz", "lezzet", "lezzeti", "lezzetli", "bol", "tam", "kıvamında", "kivaminda", "ev", "yapımı", "yapimi",
    "nasıl", "yapılır", "yapilir", "evde", "anne", "lokanta", "pastane", "videolu", "şahane", "sahane", "mükemmel",
    "en", "güzel", "guzel", "kesin", "garanti", "garantili", "yumuşacık", "yumusacik", "pamuk", "çıtır", "citir",
    "dakika", "dakikada", "dk", "usulü", "usulu", "tadında", "tadinda", "gibi", "ölçülü", "olculu", "orjinal", "orijinal",
    "hakiki", "gerçek", "gercek", "müthiş", "muthis", "özel", "ozel", "klasik", "geleneksel", "meşhur", "meshur", "ünlü",
    "süper", "hızlı", "kıyır", "puf", "tane", "yemek", "yemeği", "yemegi", "tatlı", "tatlısı", "tatlisi", "tatlım",
    "ve", "ile", "için", "icin", "bir", "fırın", "fırında", "kesilmeyen", "ipek", "nar", "dağılmayan", "dayanılmaz",
    "altın", "günü", "altin", "gunu", "süzme", "kızarmış", "brownie", "sade", "evdeki", "hali", "hal", "hazır", "hazir",
    "lavaştan", "lavaşla", "ekmek", "banmalık", "sünger", "şerbet", "çeken", "kabaran", "çekmeyen", "bolca", "mis", "tadı",
    "yapım", "balon", "puff", "pofuduk", "dev", "tavada", "harikası", "vazgeçilmez", "bayatlamayan", "şipşak", "zahmetsiz",
    "dillere", "destan", "denemeyen", "kalmasın", "misali", "yalancı", "masterchef", "orijinali", "ağızda", "dağılan",
    "yeni", "farklı", "değişik", "çok", "bildiklerinizi", "unutun", "püf", "noktaları", "noktalarıyla", "malzemeli",
    "yapılabilen", "beğendiği", "favori", "şeklinde", "annemin", "babaannemin", "ustasından", "sırrı", "efsanesi",
    "tadıyla", "görünümüyle", "sunumuyla", "efsanevi", "bayılacaksınız",
}


def stem_tr(w: str) -> str:
    for suf in ("ları", "leri", "ması", "mesi", "yemeği", "tatlısı", "çorbası", "salatası", "böreği", "mezesi", "mesinin", "masının"):
        if len(w) > len(suf) + 2 and w.endswith(suf):
            w = w[:-len(suf)]
            break
    for suf in ("sı", "si", "su", "sü", "nın", "nin", "dan", "den", "ım", "im", "um", "üm", "ı", "i", "u", "ü", "m"):
        if len(w) > len(suf) + 3 and w.endswith(suf):
            w = w[:-len(suf)]
            break
    if len(w) > 3 and w.endswith("ğ"):
        w = w[:-1] + "k"
    if len(w) > 3 and w.endswith("b"):
        w = w[:-1] + "p"
    if len(w) > 3 and w.endswith("d"):
        w = w[:-1] + "t"
    if len(w) > 3 and w.endswith("c"):
        w = w[:-1] + "ç"
    return w


def title_key(title):
    lt = lower_tr(title)
    lt = re.sub(r"\([^)]*\)", " ", lt)
    lt = re.sub(r"[^a-zçğıöşü0-9 ]", " ", lt)
    lt = re.sub(r"(?:^|\s)yağ\s+çekmeyen(?=\s|$)", " ", lt)
    if re.search(r"(?:^|\s)(yağlama|yağlaması|yağlamasının|yağlısı|şebit)(?=\s|$)", lt) and not re.search(r"(?:^|\s)(patlıcan|biber|krep|mısır|kabak)(?=\s|$)", lt):
        return "kayseri yağlama"
    ws = []
    for w in lt.split():
        if w in TITLE_NOISE or len(w) <= 1 or w.isdigit():
            continue
        st = stem_tr(w)
        if st and st not in TITLE_NOISE and len(st) > 1 and not st.isdigit():
            ws.append(st)
    return " ".join(sorted(set(ws)))


def clean_title(title):
    t = html.unescape(unicodedata.normalize("NFC", str(title or "")))
    t = re.sub(r"\([^)]*\)", " ", t)
    t = re.sub(r"\s+", " ", t).strip(" .-!?")
    t = re.sub(r"(?i)\s*(nasıl yapılır\??|tarifi(\s*nasıl\s*yapılır)?)\s*$", "", t).strip(" .-!?")
    t = re.sub(r"(?i)^(nefis|enfes|harika|muhteşem|efsane|pratik|kolay|yalancı|masterchef|gerçek|orjinal|orijinal|tam ölçülü)\s+", "", t)
    if t.isupper() or t.islower():
        t = " ".join(w[:1].upper() + w[1:] for w in lower_tr(t).split())
    return t[:62].strip()


def clean_steps(steps):
    out = []
    for s in steps:
        s = re.sub(r"\s+", " ", str(s)).strip()
        if not s or JUNK.search(lower_tr(s)):
            continue
        s = re.sub(r"^\d+[\.\)-]\s*", "", s)
        if len(s) < 8:
            continue
        out.append(s[:420])
    return out


def iso_minutes(v):
    if not v:
        return None
    if isinstance(v, (int, float)):
        return int(v)
    m = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?", str(v))
    if not m:
        return None
    return int(m.group(1) or 0) * 60 + int(m.group(2) or 0)


existing = set(json.load(open(EXISTING_TITLES, encoding="utf-8"))) if os.path.exists(EXISTING_TITLES) else set()
best: dict[str, dict] = {}
stats = Counter()


def consider(title, ds_cat, ing_lines, steps, servings, prep, cook, src_rank):
    stats["seen"] += 1
    if not title or len(title) < 3:
        return
    lt = lower_tr(title)
    if FOREIGN.search(lt) or JUNK.search(lt) or CLICKBAIT_TITLE.search(lt):
        stats["foreign_or_junk"] += 1
        return
    ct = clean_title(title)
    if len(ct) < 4:
        return
    key = title_key(ct)
    if not key or key in existing:
        stats["dup_existing"] += 1
        return
    steps = clean_steps(steps or [])
    if len(steps) < 2 or sum(len(s) for s in steps) < 110:
        stats["few_steps"] += 1
        return
    ings, seen = [], set()
    for line in ing_lines or []:
        line_clean = html.unescape(unicodedata.normalize("NFC", line)) if isinstance(line, str) else line
        parts = re.split(r",| ve |\s/\s", line_clean) if (isinstance(line_clean, str) and len(line_clean) < 60 and not re.search(r"\d", line_clean)) else [line_clean]
        for part in parts:
            r = parse_ingredient(part) if isinstance(part, str) else part
            if r is None:
                stats["unknown_ing"] += 1
                return
            for n, a, u, note in r:
                if n in seen:
                    continue
                seen.add(n)
                ings.append([n, a, u] + ([note] if note else []))
    if len(ings) < 3 or len(ings) > 24:
        stats["ing_count"] += 1
        return
    names = [i[0] for i in ings]
    cat = pick_category(title, ds_cat, names)
    if not cat:
        stats["no_cat"] += 1
        return
    # Temiz, kısa ve otantik isimlere öncelik ver
    spam_penalty = 5 if ("?" in title or "!" in title or "(" in title or len(title) > 55) else 0
    score = src_rank * 12 + min(len(steps), 10) + min(len(ings), 12) * 0.5 - spam_penalty - len(ct) * 0.05
    try:
        sv = int(re.findall(r"\d+", str(servings))[0]) if servings else 4
    except Exception:
        sv = 4
    rec = {
        "t": ct, "c": cat, "s": max(1, min(12, sv)),
        "p": max(5, min(240, prep or 15)), "k": max(0, min(480, cook if cook is not None else 25)),
        "i": ings, "st": steps, "_score": score,
    }
    if key not in best or best[key]["_score"] < score:
        best[key] = rec
    stats["accepted_raw"] += 1


# 1) 104bit (yapılandırılmış, MIT)
for r in json.load(open(os.path.join(DS, "104bit.json"), encoding="utf-8")):
    if r.get("kategori") == "içecek":
        continue
    lines = []
    ok = True
    for m in r.get("malzemeler") or []:
        nm = m.get("isim") or ""
        mk = m.get("miktar")
        br = m.get("birim") or ""
        lines.append(f"{mk if mk is not None else ''} {br} {nm}".strip())
    consider(r.get("tarif_adi"), r.get("kategori"), lines, r.get("yapilis_adimlari"), r.get("porsiyon"),
             r.get("hazirlik_suresi_dk"), r.get("pisirme_suresi_dk"), 2)

# 2) mmkocak (Apache-2.0)
for fn in ("mm_val.jsonl", "mm_test.jsonl", "mm_train.jsonl"):
    p = os.path.join(DS, fn)
    if not os.path.exists(p):
        continue
    with open(p, encoding="utf-8") as f:
        for line in f:
            try:
                r = json.loads(line)
            except Exception:
                continue
            consider(r.get("title"), r.get("category"), r.get("ingredients"), r.get("instructions"), r.get("servings"),
                     iso_minutes(r.get("prep_time")), iso_minutes(r.get("cook_time")), 1)

QUOTAS = {
    "tatli": 6100, "et_tavuk": 6000, "hamur_borek": 4400, "salata_meze": 3200, "sebze_zeytinyagli": 3200,
    "kahvalti": 2600, "bakliyat_pilav": 2400, "corba": 2200,
}
by_cat: dict[str, list] = {}
for r in sorted(best.values(), key=lambda x: -x["_score"]):
    lst = by_cat.setdefault(r["c"], [])
    if len(lst) < QUOTAS.get(r["c"], 0):
        r["st"] = [s[:320] for s in r["st"][:12]]
        lst.append(r)

out_dir = os.path.join(ROOT, "public", "data")
os.makedirs(out_dir, exist_ok=True)
for old in os.listdir(out_dir):
    if old.startswith("recipes-tr"):
        os.remove(os.path.join(out_dir, old))
manifest, n, total_bytes = [], 0, 0
for cat in ("corba", "et_tavuk", "sebze_zeytinyagli", "bakliyat_pilav", "kahvalti", "salata_meze", "hamur_borek", "tatli"):
    recs = by_cat.get(cat, [])
    for r in recs:
        n += 1
        r.pop("_score", None)
        r["id"] = f"tr{n}"
    fn = f"recipes-tr-{cat}.json"
    path = os.path.join(out_dir, fn)
    json.dump(recs, open(path, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    total_bytes += os.path.getsize(path)
    manifest.append({"file": fn, "count": len(recs)})
json.dump(manifest, open(os.path.join(out_dir, "recipes-tr-manifest.json"), "w", encoding="utf-8"))
print(dict(stats))
print("UNIQUE", len(best), "WRITTEN", n, "BYTES", total_bytes)
print(manifest)
