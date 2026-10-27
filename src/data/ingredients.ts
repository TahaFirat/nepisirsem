import type { IngredientCategoryId, IngredientItem, MeasurementUnit } from '../types/recipe';
import { ALL_RECIPES } from './recipes';
import { REGIONAL_ANATOLIAN_CATALOG } from './regionalTurkishCatalog';
import { COMPACT_TURKISH_ARCHIVE, WORLD_CUISINE_RAW } from './generatedArchive';

export const INGREDIENT_CATEGORIES: {
  id: IngredientCategoryId | 'tumu';
  label: string;
  emoji: string;
  color: string;
}[] = [
  { id: 'tumu', label: 'Tümü', emoji: '✨', color: '#E11D48' },
  { id: 'temel', label: 'Her Evde Var', emoji: '🏠', color: '#D97706' },
  { id: 'sebze', label: 'Sebze & Yeşillik', emoji: '🍅', color: '#16A34A' },
  { id: 'et_tavuk', label: 'Et, Tavuk & Balık', emoji: '🥩', color: '#DC2626' },
  { id: 'sut_kahvalti', label: 'Süt & Kahvaltılık', emoji: '🧀', color: '#2563EB' },
  { id: 'bakliyat', label: 'Bakliyat & Unlu', emoji: '🌾', color: '#CA8A04' },
  { id: 'baharat_sos', label: 'Yağ, Salça & Baharat', emoji: '🌶️', color: '#9333EA' },
  { id: 'meyve_kuruyemis', label: 'Meyve & Kuruyemiş', emoji: '🍋', color: '#EA580C' },
];

const BASE_INGREDIENTS_DATA: IngredientItem[] = [
  // ================= 1. TEMEL / HER EVDE BULUNANLAR =================
  {
    id: 'su',
    name: 'su',
    emoji: '💧',
    category: 'temel',
    defaultUnit: 'su bardağı',
    isStaple: true,
    aliases: ['sıcak su', 'et suyu', 'tavuk suyu'],
  },
  {
    id: 'maden-suyu',
    name: 'maden suyu',
    emoji: '🫧',
    category: 'temel',
    defaultUnit: 'su bardağı',
  },
  {
    id: 'tuz',
    name: 'tuz',
    emoji: '🧂',
    category: 'temel',
    defaultUnit: 'tatlı kaşığı',
    isStaple: true,
    aliases: ['kaya tuzu'],
  },
  {
    id: 'sivi-yag',
    name: 'sıvı yağ',
    emoji: '🌻',
    category: 'temel',
    defaultUnit: 'yemek kaşığı',
    isStaple: true,
    aliases: ['ayçiçek yağı', 'mısırözü yağı'],
  },
  {
    id: 'zeytinyagi',
    name: 'zeytinyağı',
    emoji: '🫒',
    category: 'temel',
    defaultUnit: 'yemek kaşığı',
    isStaple: true,
  },
  {
    id: 'tereyagi',
    name: 'tereyağı',
    emoji: '🧈',
    category: 'temel',
    defaultUnit: 'yemek kaşığı',
    isStaple: true,
    aliases: ['margarin'],
  },
  {
    id: 'salca',
    name: 'salça',
    emoji: '🥫',
    category: 'temel',
    defaultUnit: 'yemek kaşığı',
    isStaple: true,
    aliases: ['domates salçası', 'biber salçası'],
  },
  {
    id: 'un',
    name: 'un',
    emoji: '🌾',
    category: 'temel',
    defaultUnit: 'su bardağı',
    isStaple: true,
    aliases: ['buğday unu'],
  },
  {
    id: 'seker',
    name: 'şeker',
    emoji: '🍬',
    category: 'temel',
    defaultUnit: 'su bardağı',
    isStaple: true,
    aliases: ['toz şeker', 'kızamık şekeri'],
  },
  {
    id: 'pudra-sekeri',
    name: 'pudra şekeri',
    emoji: '🍬',
    category: 'temel',
    defaultUnit: 'su bardağı',
  },
  {
    id: 'karabiber',
    name: 'karabiber',
    emoji: '⚫',
    category: 'temel',
    defaultUnit: 'çay kaşığı',
    isStaple: true,
    aliases: ['tane karabiber'],
  },
  {
    id: 'pul-biber',
    name: 'pul biber',
    emoji: '🌶️',
    category: 'temel',
    defaultUnit: 'tatlı kaşığı',
    isStaple: true,
    aliases: ['toz biber', 'kırmızı toz biber', 'isot'],
  },
  {
    id: 'nane',
    name: 'nane',
    emoji: '🌿',
    category: 'temel',
    defaultUnit: 'tatlı kaşığı',
    isStaple: true,
    aliases: ['kuru nane'],
  },
  {
    id: 'kekik',
    name: 'kekik',
    emoji: '🌱',
    category: 'temel',
    defaultUnit: 'tatlı kaşığı',
    isStaple: true,
  },
  {
    id: 'kimyon',
    name: 'kimyon',
    emoji: '🍂',
    category: 'temel',
    defaultUnit: 'çay kaşığı',
    isStaple: true,
  },

  // ================= 2. SEBZE & YEŞİLLİK =================
  {
    id: 'sogan',
    name: 'soğan',
    emoji: '🧅',
    category: 'sebze',
    defaultUnit: 'adet',
    isStaple: true,
    aliases: ['kuru soğan', 'kırmızı soğan', 'arpacık soğan', 'soğan suyu'],
  },
  {
    id: 'sarimsak',
    name: 'sarımsak',
    emoji: '🧄',
    category: 'sebze',
    defaultUnit: 'diş',
    isStaple: true,
    aliases: ['taze sarımsak'],
  },
  {
    id: 'domates',
    name: 'domates',
    emoji: '🍅',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['kiraz domates', 'yeşil domates', 'domates sosu'],
  },
  { id: 'patates', name: 'patates', emoji: '🥔', category: 'sebze', defaultUnit: 'adet' },
  {
    id: 'yesil-biber',
    name: 'yeşil biber',
    emoji: '🫑',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['sivri biber', 'çarliston biber', 'biber', 'dolmalık biber', 'acı biber', 'cin biber'],
  },
  {
    id: 'kirmizi-biber',
    name: 'kırmızı biber',
    emoji: '🌶️',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['kapya biber', 'közlenmiş kırmızı biber'],
  },
  {
    id: 'kuru-biber',
    name: 'kuru biber',
    emoji: '🌶️',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['kuru arnavut biberi'],
  },
  {
    id: 'kuru-patlican',
    name: 'kuru patlıcan',
    emoji: '🍆',
    category: 'sebze',
    defaultUnit: 'adet',
  },
  {
    id: 'salatalik',
    name: 'salatalık',
    emoji: '🥒',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['acur', 'kelek'],
  },
  {
    id: 'havuc',
    name: 'havuç',
    emoji: '🥕',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['siyah havuç'],
  },
  {
    id: 'patlican',
    name: 'patlıcan',
    emoji: '🍆',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['küçük patlıcan'],
  },
  { id: 'kabak', name: 'kabak', emoji: '🥒', category: 'sebze', defaultUnit: 'adet' },
  { id: 'ispanak', name: 'ıspanak', emoji: '🥬', category: 'sebze', defaultUnit: 'gram' },
  { id: 'mantar', name: 'mantar', emoji: '🍄', category: 'sebze', defaultUnit: 'gram' },
  {
    id: 'taze-fasulye',
    name: 'taze fasulye',
    emoji: '🫛',
    category: 'sebze',
    defaultUnit: 'gram',
    aliases: ['yeşil fasulye'],
  },
  { id: 'bezelye', name: 'bezelye', emoji: '🫛', category: 'sebze', defaultUnit: 'su bardağı' },
  {
    id: 'bakla',
    name: 'bakla',
    emoji: '🫛',
    category: 'sebze',
    defaultUnit: 'gram',
    aliases: ['taze bakla', 'kuru bakla'],
  },
  { id: 'pirasa', name: 'pırasa', emoji: '🥬', category: 'sebze', defaultUnit: 'adet' },
  { id: 'karnabahar', name: 'karnabahar', emoji: '🥦', category: 'sebze', defaultUnit: 'adet' },
  { id: 'brokoli', name: 'brokoli', emoji: '🥦', category: 'sebze', defaultUnit: 'adet' },
  {
    id: 'lahana',
    name: 'beyaz lahana',
    emoji: '🥬',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['lahana', 'kırmızı lahana'],
  },
  { id: 'kara-lahana', name: 'kara lahana', emoji: '🥬', category: 'sebze', defaultUnit: 'demet' },
  {
    id: 'enginar',
    name: 'enginar',
    emoji: '💚',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['enginar kalbi'],
  },
  {
    id: 'kereviz',
    name: 'kereviz',
    emoji: '🥬',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['kereviz yaprağı'],
  },
  {
    id: 'yer-elmasi',
    name: 'yer elması',
    emoji: '🥔',
    category: 'sebze',
    defaultUnit: 'gram',
  },
  {
    id: 'semizotu',
    name: 'semizotu',
    emoji: '🌿',
    category: 'sebze',
    defaultUnit: 'demet',
    aliases: ['deniz börülcesi', 'turp otu', 'ısırgan otu', 'hardal otu'],
  },
  { id: 'pazi', name: 'pazı', emoji: '🥬', category: 'sebze', defaultUnit: 'demet' },
  { id: 'bamya', name: 'bamya', emoji: '🫛', category: 'sebze', defaultUnit: 'gram' },
  {
    id: 'maydanoz',
    name: 'maydanoz',
    emoji: '🌿',
    category: 'sebze',
    defaultUnit: 'demet',
    aliases: ['kişniş'],
  },
  { id: 'dereotu', name: 'dereotu', emoji: '🌱', category: 'sebze', defaultUnit: 'demet' },
  { id: 'taze-nane', name: 'taze nane', emoji: '🌿', category: 'sebze', defaultUnit: 'demet' },
  {
    id: 'reyhan',
    name: 'reyhan',
    emoji: '🌿',
    category: 'sebze',
    defaultUnit: 'demet',
    aliases: ['fesleğen', 'tarhun otu'],
  },
  { id: 'roka', name: 'roka', emoji: '🥬', category: 'sebze', defaultUnit: 'demet' },
  { id: 'taze-sogan', name: 'taze soğan', emoji: '🧅', category: 'sebze', defaultUnit: 'demet' },
  { id: 'marul', name: 'marul', emoji: '🥬', category: 'sebze', defaultUnit: 'adet' },
  { id: 'asma-yapragi', name: 'asma yaprağı', emoji: '🍃', category: 'sebze', defaultUnit: 'gram' },
  {
    id: 'misir',
    name: 'mısır konservesi',
    emoji: '🌽',
    category: 'sebze',
    defaultUnit: 'su bardağı',
    aliases: ['mısır'],
  },
  {
    id: 'balkabagi',
    name: 'balkabağı',
    emoji: '🎃',
    category: 'sebze',
    defaultUnit: 'gram',
    aliases: ['bal kabağı'],
  },
  {
    id: 'pancar',
    name: 'pancar',
    emoji: '🟣',
    category: 'sebze',
    defaultUnit: 'adet',
    aliases: ['şalgam turpu'],
  },
  { id: 'avokado', name: 'avokado', emoji: '🥑', category: 'sebze', defaultUnit: 'adet' },

  // ================= 3. ET, TAVUK & BALIK =================
  {
    id: 'kiyma',
    name: 'kıyma',
    emoji: '🥩',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['dana kıyma', 'kuzu kıyma'],
  },
  {
    id: 'kusbasi-et',
    name: 'kuşbaşı et',
    emoji: '🥩',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['dana kuşbaşı', 'kuşbaşı', 'dana eti', 'döner et'],
  },
  {
    id: 'kuzu-kusbasi',
    name: 'kuzu kuşbaşı',
    emoji: '🥩',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['kuzu eti'],
  },
  {
    id: 'kuzu-kol',
    name: 'kuzu kol',
    emoji: '🍖',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['kuzu incik', 'kuzu kaburga', 'kuzu gerdan'],
  },
  {
    id: 'bonfile',
    name: 'dana bonfile',
    emoji: '🥩',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['biftek', 'antrikot', 'bonfile'],
  },
  {
    id: 'kuyruk-yagi',
    name: 'kuyruk yağı',
    emoji: '🥩',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['kuzu gömlek yağı'],
  },
  {
    id: 'tavuk-gogsu',
    name: 'tavuk göğsü',
    emoji: '🍗',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['tavuk', 'bütün tavuk'],
  },
  {
    id: 'tavuk-but',
    name: 'tavuk but',
    emoji: '🍗',
    category: 'et_tavuk',
    defaultUnit: 'adet',
    aliases: ['tavuk baget', 'tavuk pirzola', 'tavuk kanat'],
  },
  { id: 'sucuk', name: 'sucuk', emoji: '🌭', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'pastirma', name: 'pastırma', emoji: '🥓', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'sosis', name: 'sosis', emoji: '🌭', category: 'et_tavuk', defaultUnit: 'gram' },
  {
    id: 'hamsi',
    name: 'hamsi',
    emoji: '🐟',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['istavrit'],
  },
  {
    id: 'palamut',
    name: 'palamut',
    emoji: '🐟',
    category: 'et_tavuk',
    defaultUnit: 'adet',
    aliases: ['uskumru', 'torik'],
  },
  { id: 'somon', name: 'somon', emoji: '🍣', category: 'et_tavuk', defaultUnit: 'adet' },
  {
    id: 'levrek',
    name: 'levrek',
    emoji: '🐟',
    category: 'et_tavuk',
    defaultUnit: 'adet',
    aliases: ['levrek fileto'],
  },
  {
    id: 'cupra',
    name: 'çupra',
    emoji: '🐟',
    category: 'et_tavuk',
    defaultUnit: 'adet',
    aliases: ['çipura'],
  },
  {
    id: 'karides',
    name: 'karides',
    emoji: '🍤',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['midye'],
  },
  { id: 'kalamar', name: 'kalamar', emoji: '🦑', category: 'et_tavuk', defaultUnit: 'gram' },
  {
    id: 'ton-baligi',
    name: 'ton balığı konservesi',
    emoji: '🥫',
    category: 'et_tavuk',
    defaultUnit: 'paket',
    aliases: ['ton balığı'],
  },
  {
    id: 'ciger',
    name: 'kuzu ciğeri',
    emoji: '🥩',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['dana ciğeri', 'ciğer'],
  },
  {
    id: 'sakatat',
    name: 'işkembe',
    emoji: '🍖',
    category: 'et_tavuk',
    defaultUnit: 'gram',
    aliases: ['kelle', 'paça', 'kuzu bumbar', 'kuzu şırdan'],
  },

  // ================= 4. SÜT & KAHVALTILIK =================
  {
    id: 'yumurta',
    name: 'yumurta',
    emoji: '🥚',
    category: 'sut_kahvalti',
    defaultUnit: 'adet',
    aliases: ['yumurta sarısı', 'yumurta akı'],
  },
  {
    id: 'sut',
    name: 'süt',
    emoji: '🥛',
    category: 'sut_kahvalti',
    defaultUnit: 'su bardağı',
    aliases: ['şekerli yoğunlaştırılmış süt'],
  },
  {
    id: 'yogurt',
    name: 'yoğurt',
    emoji: '🥣',
    category: 'sut_kahvalti',
    defaultUnit: 'su bardağı',
    aliases: ['süzme yoğurt'],
  },
  {
    id: 'beyaz-peynir',
    name: 'beyaz peynir',
    emoji: '🧀',
    category: 'sut_kahvalti',
    defaultUnit: 'gram',
    aliases: ['peynir', 'taze peynir', 'tuzsuz peynir'],
  },
  {
    id: 'kasar-peyniri',
    name: 'kaşar peyniri',
    emoji: '🧀',
    category: 'sut_kahvalti',
    defaultUnit: 'gram',
    aliases: ['çeçil peyniri', 'telli peynir', 'parmesan peyniri', 'cheddar peyniri', 'cheddar'],
  },
  {
    id: 'mozzarella',
    name: 'mozzarella',
    emoji: '🧀',
    category: 'sut_kahvalti',
    defaultUnit: 'gram',
  },
  {
    id: 'lor-peyniri',
    name: 'lor peyniri',
    emoji: '🧀',
    category: 'sut_kahvalti',
    defaultUnit: 'gram',
    aliases: ['çökelek'],
  },
  {
    id: 'tulum-peyniri',
    name: 'tulum peyniri',
    emoji: '🧀',
    category: 'sut_kahvalti',
    defaultUnit: 'gram',
  },
  {
    id: 'hellim-peyniri',
    name: 'hellim peyniri',
    emoji: '🧀',
    category: 'sut_kahvalti',
    defaultUnit: 'gram',
  },
  {
    id: 'kunefe-peyniri',
    name: 'künefe peyniri',
    emoji: '🧀',
    category: 'sut_kahvalti',
    defaultUnit: 'gram',
    aliases: ['dil peyniri'],
  },
  { id: 'kaymak', name: 'kaymak', emoji: '🥛', category: 'sut_kahvalti', defaultUnit: 'gram' },
  { id: 'krema', name: 'krema', emoji: '🥛', category: 'sut_kahvalti', defaultUnit: 'paket' },
  { id: 'labne', name: 'labne', emoji: '🧀', category: 'sut_kahvalti', defaultUnit: 'paket' },
  {
    id: 'krem-santi',
    name: 'krem şanti',
    emoji: '🍦',
    category: 'sut_kahvalti',
    defaultUnit: 'paket',
  },
  {
    id: 'zeytin',
    name: 'zeytin',
    emoji: '🫒',
    category: 'sut_kahvalti',
    defaultUnit: 'su bardağı',
    aliases: ['siyah zeytin', 'yeşil zeytin', 'siyah zeytin ezmesi'],
  },

  // ================= 5. BAKLİYAT & UNLU =================
  { id: 'pirinc', name: 'pirinç', emoji: '🍚', category: 'bakliyat', defaultUnit: 'su bardağı' },
  {
    id: 'pilavlik-bulgur',
    name: 'pilavlık bulgur',
    emoji: '🌾',
    category: 'bakliyat',
    defaultUnit: 'su bardağı',
    aliases: ['bulgur'],
  },
  {
    id: 'koftelik-bulgur',
    name: 'köftelik bulgur',
    emoji: '🌾',
    category: 'bakliyat',
    defaultUnit: 'su bardağı',
    aliases: ['ince bulgur'],
  },
  {
    id: 'firik-bulguru',
    name: 'firik bulguru',
    emoji: '🌾',
    category: 'bakliyat',
    defaultUnit: 'su bardağı',
  },
  {
    id: 'kirmizi-mercimek',
    name: 'kırmızı mercimek',
    emoji: '🟠',
    category: 'bakliyat',
    defaultUnit: 'su bardağı',
  },
  {
    id: 'yesil-mercimek',
    name: 'yeşil mercimek',
    emoji: '🟢',
    category: 'bakliyat',
    defaultUnit: 'su bardağı',
  },
  { id: 'nohut', name: 'nohut', emoji: '🟡', category: 'bakliyat', defaultUnit: 'su bardağı' },
  {
    id: 'kuru-fasulye',
    name: 'kuru fasulye',
    emoji: '🫘',
    category: 'bakliyat',
    defaultUnit: 'su bardağı',
    aliases: ['maş fasulyesi'],
  },
  {
    id: 'barbunya',
    name: 'barbunya',
    emoji: '🫘',
    category: 'bakliyat',
    defaultUnit: 'su bardağı',
  },
  { id: 'borulce', name: 'börülce', emoji: '🫘', category: 'bakliyat', defaultUnit: 'su bardağı' },
  {
    id: 'makarna',
    name: 'makarna',
    emoji: '🍝',
    category: 'bakliyat',
    defaultUnit: 'paket',
    aliases: ['spagetti', 'penne', 'fırın makarna'],
  },
  {
    id: 'arpa-sehriye',
    name: 'arpa şehriye',
    emoji: '🌾',
    category: 'bakliyat',
    defaultUnit: 'çay bardağı',
    aliases: ['tel şehriye'],
  },
  { id: 'eriste', name: 'erişte', emoji: '🍜', category: 'bakliyat', defaultUnit: 'su bardağı' },
  {
    id: 'hazir-yufka',
    name: 'hazır yufka',
    emoji: '🫓',
    category: 'bakliyat',
    defaultUnit: 'adet',
    aliases: ['yufka'],
  },
  {
    id: 'baklavalik-yufka',
    name: 'baklavalık yufka',
    emoji: '🫓',
    category: 'bakliyat',
    defaultUnit: 'paket',
  },
  {
    id: 'tel-kadayif',
    name: 'tel kadayıf',
    emoji: '🌾',
    category: 'bakliyat',
    defaultUnit: 'gram',
    aliases: ['kadayıf'],
  },
  {
    id: 'gullac-yapragi',
    name: 'güllaç yaprağı',
    emoji: '🫓',
    category: 'bakliyat',
    defaultUnit: 'adet',
  },
  {
    id: 'milfoy',
    name: 'milföy hamuru',
    emoji: '🥐',
    category: 'bakliyat',
    defaultUnit: 'paket',
  },
  {
    id: 'lavas',
    name: 'lavaş ekmeği',
    emoji: '🫓',
    category: 'bakliyat',
    defaultUnit: 'adet',
    aliases: ['tortilla', 'lavaş'],
  },
  {
    id: 'pide-ekmegi',
    name: 'pide ekmeği',
    emoji: '🫓',
    category: 'bakliyat',
    defaultUnit: 'adet',
    aliases: ['tırnak pide', 'bayat pide ekmeği'],
  },
  {
    id: 'bayat-ekmek',
    name: 'bayat ekmek içi',
    emoji: '🍞',
    category: 'bakliyat',
    defaultUnit: 'dilim',
    aliases: ['ekmek', 'tost ekmeği', 'bayat ekmek', 'ekmek içi'],
  },
  {
    id: 'galeta-unu',
    name: 'galeta unu',
    emoji: '🥖',
    category: 'bakliyat',
    defaultUnit: 'yemek kaşığı',
  },
  { id: 'irmik', name: 'irmik', emoji: '🌾', category: 'bakliyat', defaultUnit: 'su bardağı' },
  {
    id: 'nisasta',
    name: 'nişasta',
    emoji: '⚪',
    category: 'bakliyat',
    defaultUnit: 'yemek kaşığı',
    aliases: ['mısır nişastası', 'buğday nişastası'],
  },
  {
    id: 'pirinc-unu',
    name: 'pirinç unu',
    emoji: '⚪',
    category: 'bakliyat',
    defaultUnit: 'yemek kaşığı',
  },
  {
    id: 'misir-unu',
    name: 'mısır unu',
    emoji: '🌽',
    category: 'bakliyat',
    defaultUnit: 'su bardağı',
  },
  {
    id: 'toz-tarhana',
    name: 'toz tarhana',
    emoji: '🍲',
    category: 'bakliyat',
    defaultUnit: 'yemek kaşığı',
    aliases: ['tarhana'],
  },
  {
    id: 'kabartma-tozu',
    name: 'kabartma tozu',
    emoji: '🧁',
    category: 'bakliyat',
    defaultUnit: 'paket',
  },
  {
    id: 'karbonat',
    name: 'karbonat',
    emoji: '🥄',
    category: 'bakliyat',
    defaultUnit: 'çay kaşığı',
  },
  { id: 'vanilya', name: 'vanilya', emoji: '🌼', category: 'bakliyat', defaultUnit: 'paket' },
  {
    id: 'maya',
    name: 'maya',
    emoji: '🍞',
    category: 'bakliyat',
    defaultUnit: 'paket',
    aliases: ['instant maya', 'yaş maya'],
  },
  {
    id: 'kakao',
    name: 'kakao',
    emoji: '🍫',
    category: 'bakliyat',
    defaultUnit: 'yemek kaşığı',
  },
  {
    id: 'petibor-biskuvi',
    name: 'petibör bisküvi',
    emoji: '🍪',
    category: 'bakliyat',
    defaultUnit: 'paket',
    aliases: ['bebe bisküvisi', 'kek parçası', 'hazır kemalpaşa tatlısı'],
  },
  {
    id: 'kedi-dili',
    name: 'kedi dili bisküvi',
    emoji: '🍪',
    category: 'bakliyat',
    defaultUnit: 'paket',
  },
  {
    id: 'bugday',
    name: 'buğday',
    emoji: '🌾',
    category: 'bakliyat',
    defaultUnit: 'su bardağı',
    aliases: ['aşurelik buğday', 'yarma'],
  },
  {
    id: 'yulaf-ezmesi',
    name: 'yulaf ezmesi',
    emoji: '🌾',
    category: 'bakliyat',
    defaultUnit: 'su bardağı',
  },

  // ================= 6. BAHARAT, SOS & DİĞER =================
  {
    id: 'limon',
    name: 'limon',
    emoji: '🍋',
    category: 'baharat_sos',
    defaultUnit: 'adet',
    aliases: ['limon suyu', 'limon kabuğu rendesi', 'limon tuzu'],
  },
  {
    id: 'nar-eksisi',
    name: 'nar ekşisi',
    emoji: '🍷',
    category: 'baharat_sos',
    defaultUnit: 'yemek kaşığı',
    aliases: ['koruk ekşisi', 'demirhindi'],
  },
  {
    id: 'sirke',
    name: 'sirke',
    emoji: '🍾',
    category: 'baharat_sos',
    defaultUnit: 'yemek kaşığı',
    aliases: ['üzüm sirkesi', 'elma sirkesi'],
  },
  {
    id: 'sumak',
    name: 'sumak',
    emoji: '🌺',
    category: 'baharat_sos',
    defaultUnit: 'tatlı kaşığı',
  },
  {
    id: 'tarcin',
    name: 'tarçın',
    emoji: '🪵',
    category: 'baharat_sos',
    defaultUnit: 'çay kaşığı',
  },
  {
    id: 'yenibahar',
    name: 'yenibahar',
    emoji: '🌰',
    category: 'baharat_sos',
    defaultUnit: 'çay kaşığı',
    aliases: ['muskat'],
  },
  {
    id: 'karanfil',
    name: 'karanfil',
    emoji: '🌸',
    category: 'baharat_sos',
    defaultUnit: 'adet',
  },
  {
    id: 'mahlep',
    name: 'mahlep',
    emoji: '🌾',
    category: 'baharat_sos',
    defaultUnit: 'çay kaşığı',
    aliases: ['damla sakızı', 'çöven otu kökü'],
  },
  {
    id: 'zerdecal',
    name: 'zerdeçal',
    emoji: '🟡',
    category: 'baharat_sos',
    defaultUnit: 'çay kaşığı',
    aliases: ['safran'],
  },
  {
    id: 'zencefil',
    name: 'zencefil',
    emoji: '🫚',
    category: 'baharat_sos',
    defaultUnit: 'çay kaşığı',
  },
  {
    id: 'kori',
    name: 'köri',
    emoji: '🍛',
    category: 'baharat_sos',
    defaultUnit: 'tatlı kaşığı',
  },
  {
    id: 'defne-yapragi',
    name: 'defne yaprağı',
    emoji: '🍃',
    category: 'baharat_sos',
    defaultUnit: 'adet',
    aliases: ['biberiye'],
  },
  {
    id: 'susam',
    name: 'susam',
    emoji: '🌾',
    category: 'baharat_sos',
    defaultUnit: 'yemek kaşığı',
    aliases: ['susam yağı'],
  },
  {
    id: 'corek-otu',
    name: 'çörek otu',
    emoji: '⚫',
    category: 'baharat_sos',
    defaultUnit: 'tatlı kaşığı',
  },
  {
    id: 'hashas-ezmesi',
    name: 'haşhaş ezmesi',
    emoji: '🌾',
    category: 'baharat_sos',
    defaultUnit: 'yemek kaşığı',
    aliases: ['haşhaş tohumu', 'haşhaş'],
  },
  {
    id: 'tahin',
    name: 'tahin',
    emoji: '🍯',
    category: 'baharat_sos',
    defaultUnit: 'su bardağı',
  },
  {
    id: 'pekmez',
    name: 'pekmez',
    emoji: '🍯',
    category: 'baharat_sos',
    defaultUnit: 'su bardağı',
    aliases: ['karamel sos'],
  },
  {
    id: 'bal',
    name: 'bal',
    emoji: '🍯',
    category: 'baharat_sos',
    defaultUnit: 'yemek kaşığı',
  },
  {
    id: 'mayonez',
    name: 'mayonez',
    emoji: '🥫',
    category: 'baharat_sos',
    defaultUnit: 'yemek kaşığı',
  },
  {
    id: 'ketcap',
    name: 'ketçap',
    emoji: '🍅',
    category: 'baharat_sos',
    defaultUnit: 'yemek kaşığı',
  },
  {
    id: 'hardal',
    name: 'hardal',
    emoji: '🥫',
    category: 'baharat_sos',
    defaultUnit: 'tatlı kaşığı',
  },
  {
    id: 'soya-sosu',
    name: 'soya sosu',
    emoji: '🍶',
    category: 'baharat_sos',
    defaultUnit: 'yemek kaşığı',
  },
  {
    id: 'gul-suyu',
    name: 'gül suyu',
    emoji: '🌹',
    category: 'baharat_sos',
    defaultUnit: 'yemek kaşığı',
    aliases: ['gül yaprağı', 'kokulu gül yaprağı'],
  },
  {
    id: 'salatalik-tursusu',
    name: 'salatalık turşusu',
    emoji: '🥒',
    category: 'baharat_sos',
    defaultUnit: 'adet',
    aliases: ['kornişon salatalık', 'fasulye turşusu', 'sütlü biber turşusu'],
  },

  // ================= 7. MEYVE & KURUYEMİŞ =================
  {
    id: 'ceviz',
    name: 'ceviz',
    emoji: '🌰',
    category: 'meyve_kuruyemis',
    defaultUnit: 'su bardağı',
  },
  {
    id: 'findik',
    name: 'fındık',
    emoji: '🌰',
    category: 'meyve_kuruyemis',
    defaultUnit: 'su bardağı',
  },
  {
    id: 'badem',
    name: 'badem',
    emoji: '🌰',
    category: 'meyve_kuruyemis',
    defaultUnit: 'su bardağı',
    aliases: ['badem unu'],
  },
  {
    id: 'antep-fistigi',
    name: 'antep fıstığı',
    emoji: '🟢',
    category: 'meyve_kuruyemis',
    defaultUnit: 'su bardağı',
  },
  {
    id: 'yer-fistigi',
    name: 'yer fıstığı',
    emoji: '🥜',
    category: 'meyve_kuruyemis',
    defaultUnit: 'su bardağı',
    aliases: ['leblebi'],
  },
  {
    id: 'cam-fistigi',
    name: 'çam fıstığı',
    emoji: '🌲',
    category: 'meyve_kuruyemis',
    defaultUnit: 'yemek kaşığı',
  },
  {
    id: 'kus-uzumu',
    name: 'kuş üzümü',
    emoji: '🍇',
    category: 'meyve_kuruyemis',
    defaultUnit: 'yemek kaşığı',
  },
  {
    id: 'uzum',
    name: 'üzüm',
    emoji: '🍇',
    category: 'meyve_kuruyemis',
    defaultUnit: 'su bardağı',
    aliases: ['kuru üzüm', 'koruk üzümü'],
  },
  {
    id: 'kuru-kayisi',
    name: 'kuru kayısı',
    emoji: '🍑',
    category: 'meyve_kuruyemis',
    defaultUnit: 'gram',
    aliases: ['kayısı', 'taze kayısı', 'şeftali'],
  },
  {
    id: 'kuru-incir',
    name: 'kuru incir',
    emoji: '🍐',
    category: 'meyve_kuruyemis',
    defaultUnit: 'adet',
    aliases: ['taze incir'],
  },
  {
    id: 'erik',
    name: 'erik',
    emoji: '🍑',
    category: 'meyve_kuruyemis',
    defaultUnit: 'gram',
    aliases: ['kuru erik', 'kırmızı erik', 'taze erik'],
  },
  {
    id: 'visne',
    name: 'vişne',
    emoji: '🍒',
    category: 'meyve_kuruyemis',
    defaultUnit: 'su bardağı',
    aliases: ['kızılcık', 'kuşburnu', 'dut'],
  },
  {
    id: 'hindistan-cevizi',
    name: 'hindistan cevizi',
    emoji: '🥥',
    category: 'meyve_kuruyemis',
    defaultUnit: 'yemek kaşığı',
  },
  { id: 'elma', name: 'elma', emoji: '🍎', category: 'meyve_kuruyemis', defaultUnit: 'adet' },
  {
    id: 'ayva',
    name: 'ayva',
    emoji: '🍐',
    category: 'meyve_kuruyemis',
    defaultUnit: 'adet',
    aliases: ['armut'],
  },
  {
    id: 'portakal',
    name: 'portakal',
    emoji: '🍊',
    category: 'meyve_kuruyemis',
    defaultUnit: 'adet',
    aliases: ['portakal suyu', 'portakal kabuğu rendesi', 'turunç kabuğu'],
  },
  { id: 'nar', name: 'nar', emoji: '🔴', category: 'meyve_kuruyemis', defaultUnit: 'adet' },
  { id: 'muz', name: 'muz', emoji: '🍌', category: 'meyve_kuruyemis', defaultUnit: 'adet' },
  { id: 'cilek', name: 'çilek', emoji: '🍓', category: 'meyve_kuruyemis', defaultUnit: 'gram' },
  {
    id: 'cikolata',
    name: 'çikolata',
    emoji: '🍫',
    category: 'meyve_kuruyemis',
    defaultUnit: 'gram',
    aliases: ['bitter çikolata', 'damla çikolata', 'çikolata sosu'],
  },
];

// Birleşik yazılmış tarif malzemelerini temel Kilerim malzemelerine ayıran tablo
export const COMPOSITE_INGREDIENT_EXPANSIONS: Record<string, string[]> = {
  'krep hamuru (un, yumurta, süt)': ['un', 'yumurta', 'süt'],
  'beşamel sos': ['un', 'tereyağı', 'süt'],
  'tarator sos': ['ceviz', 'sarımsak', 'yoğurt'],
};

function inferMissingIngredientItem(rawName: string, index: number): IngredientItem {
  const n = rawName.toLowerCase().trim();
  let category: IngredientCategoryId = 'sebze';
  let emoji = '🥬';
  let defaultUnit: MeasurementUnit = 'adet';

  if (
    n.includes('balık') ||
    n.includes('hamsi') ||
    n.includes('levrek') ||
    n.includes('somon') ||
    n.includes('palamut') ||
    n.includes('uskumru') ||
    n.includes('istavrit') ||
    n.includes('torik')
  ) {
    category = 'et_tavuk';
    emoji = '🐟';
    defaultUnit = 'adet';
  } else if (n.includes('karides') || n.includes('kalamar') || n.includes('midye')) {
    category = 'et_tavuk';
    emoji = '🍤';
    defaultUnit = 'gram';
  } else if (n.includes('tavuk') || n.includes('piliç') || n.includes('kanat')) {
    category = 'et_tavuk';
    emoji = '🍗';
    defaultUnit = 'gram';
  } else if (
    n.includes('kıyma') ||
    n.includes('kuşbaşı') ||
    n.includes('kuzu') ||
    n.includes('dana') ||
    n.includes('ciğer') ||
    n.includes('sucuk') ||
    n.includes('pastırma') ||
    n.includes('sosis') ||
    n.includes('işkembe') ||
    n.includes('kelle') ||
    n.includes('paça')
  ) {
    category = 'et_tavuk';
    emoji = '🥩';
    defaultUnit = 'gram';
  } else if (
    n.includes('peynir') ||
    n.includes('yoğurt') ||
    n.includes('süt') ||
    n.includes('kaymak') ||
    n.includes('krema') ||
    n.includes('labne') ||
    n.includes('yumurta')
  ) {
    category = 'sut_kahvalti';
    emoji = '🧀';
    defaultUnit = 'gram';
  } else if (
    n.includes('un') ||
    n.includes('bulgur') ||
    n.includes('pirinç') ||
    n.includes('mercimek') ||
    n.includes('nohut') ||
    n.includes('fasulye') ||
    n.includes('makarna') ||
    n.includes('erişte') ||
    n.includes('yufka') ||
    n.includes('ekmek') ||
    n.includes('pide') ||
    n.includes('lavaş') ||
    n.includes('kadayıf') ||
    n.includes('irmik') ||
    n.includes('nişasta') ||
    n.includes('bisküvi')
  ) {
    category = 'bakliyat';
    emoji = '🌾';
    defaultUnit = 'su bardağı';
  } else if (
    n.includes('ceviz') ||
    n.includes('fındık') ||
    n.includes('badem') ||
    n.includes('fıstık') ||
    n.includes('üzüm') ||
    n.includes('kayısı') ||
    n.includes('incir') ||
    n.includes('erik') ||
    n.includes('elma') ||
    n.includes('ayva') ||
    n.includes('armut') ||
    n.includes('şeftali') ||
    n.includes('portakal') ||
    n.includes('vişne') ||
    n.includes('çilek') ||
    n.includes('muz') ||
    n.includes('çikolata')
  ) {
    category = 'meyve_kuruyemis';
    emoji = '🍑';
    defaultUnit = 'adet';
  } else if (
    n.includes('yağ') ||
    n.includes('salça') ||
    n.includes('sos') ||
    n.includes('sirke') ||
    n.includes('ekşi') ||
    n.includes('tuz') ||
    n.includes('şeker') ||
    n.includes('baharat') ||
    n.includes('turşu')
  ) {
    category = 'baharat_sos';
    emoji = '🌶️';
    defaultUnit = 'yemek kaşığı';
  }

  return {
    id: `auto-ing-${index}`,
    name: n,
    emoji,
    category,
    defaultUnit,
  };
}

function buildCompleteIngredientsCatalog(): IngredientItem[] {
  const catalog = [...BASE_INGREDIENTS_DATA];
  const knownNames = new Set<string>();

  catalog.forEach((item) => {
    knownNames.add(item.name.toLowerCase().trim());
    item.aliases?.forEach((a) => knownNames.add(a.toLowerCase().trim()));
  });

  Object.keys(COMPOSITE_INGREDIENT_EXPANSIONS).forEach((compKey) => {
    knownNames.add(compKey.toLowerCase().trim());
  });

  const allRecipeIngredientNames = new Set<string>();

  ALL_RECIPES.forEach((r) =>
    r.ingredients.forEach((i) => allRecipeIngredientNames.add(i.name.toLowerCase().trim()))
  );
  REGIONAL_ANATOLIAN_CATALOG.forEach((r) =>
    r.ings.forEach((i) => allRecipeIngredientNames.add(i.toLowerCase().trim()))
  );
  COMPACT_TURKISH_ARCHIVE.forEach((r) =>
    r.ings.forEach((i) => allRecipeIngredientNames.add(i.toLowerCase().trim()))
  );
  WORLD_CUISINE_RAW.forEach((r) =>
    r.ings.forEach(([name]) => allRecipeIngredientNames.add(String(name).toLowerCase().trim()))
  );

  let autoIdx = 1;
  allRecipeIngredientNames.forEach((ingName) => {
    if (!ingName) return;
    if (!knownNames.has(ingName)) {
      knownNames.add(ingName);
      catalog.push(inferMissingIngredientItem(ingName, autoIdx++));
    }
  });

  return catalog;
}

export const INGREDIENTS_DATA: IngredientItem[] = buildCompleteIngredientsCatalog();

const ALIAS_TO_CANONICAL_MAP = new Map<string, string>();
INGREDIENTS_DATA.forEach((item) => {
  const canonical = item.name.toLowerCase().trim();
  ALIAS_TO_CANONICAL_MAP.set(canonical, canonical);
  item.aliases?.forEach((alias) => {
    ALIAS_TO_CANONICAL_MAP.set(alias.toLowerCase().trim(), canonical);
  });
});

/**
 * Herhangi bir malzeme adını (veya eş anlamlısını) Kilerim'deki birebir ana malzeme adına dönüştürür
 */
export function canonicalizeIngredientName(rawName: string): string {
  const clean = rawName.toLowerCase().trim();
  return ALIAS_TO_CANONICAL_MAP.get(clean) || clean;
}

// Hızlı kiler başlangıç paketleri (Ev hanımları tek tıkla kilerini doldurabilsin)
export const QUICK_PANTRY_PRESETS = [
  {
    id: 'temel_mutfak',
    title: '🏠 Temel Ev Kileri',
    description: 'Yağ, salça, un, soğan, patates, yumurta, pirinç, mercimek, baharatlar',
    items: [
      'su',
      'tuz',
      'sıvı yağ',
      'zeytinyağı',
      'tereyağı',
      'salça',
      'un',
      'şeker',
      'soğan',
      'sarımsak',
      'patates',
      'domates',
      'yeşil biber',
      'yumurta',
      'yoğurt',
      'süt',
      'pirinç',
      'pilavlık bulgur',
      'köftelik bulgur',
      'kırmızı mercimek',
      'makarna',
      'karabiber',
      'pul biber',
      'nane',
      'kekik',
      'kimyon',
      'limon',
      'sirke',
    ],
  },
  {
    id: 'gunluk_sebze',
    title: '🍅 Sebze & Kahvaltılık',
    description: 'Domates, patates, biber, yumurta, süt, yoğurt, peynir',
    items: [
      'domates',
      'patates',
      'yeşil biber',
      'kırmızı biber',
      'patlıcan',
      'kabak',
      'salatalık',
      'havuç',
      'maydanoz',
      'dereotu',
      'taze soğan',
      'yumurta',
      'süt',
      'yoğurt',
      'beyaz peynir',
      'kaşar peyniri',
    ],
  },
  {
    id: 'bakliyat_dolabi',
    title: '🌾 Bakliyat & Hamur',
    description: 'Pirinç, bulgur, mercimek, nohut, fasulye, makarna, yufka',
    items: [
      'pirinç',
      'pilavlık bulgur',
      'köftelik bulgur',
      'kırmızı mercimek',
      'yeşil mercimek',
      'nohut',
      'kuru fasulye',
      'makarna',
      'erişte',
      'arpa şehriye',
      'hazır yufka',
      'irmik',
      'nişasta',
      'kabartma tozu',
      'vanilya',
      'maya',
    ],
  },
  {
    id: 'et_tavuk_paket',
    title: '🥩 Et, Tavuk & Şarküteri',
    description: 'Kıyma, kuşbaşı et, tavuk, sucuk',
    items: [
      'kıyma',
      'kuşbaşı et',
      'kuzu kuşbaşı',
      'tavuk göğsü',
      'tavuk but',
      'sucuk',
    ],
  },
];
