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
  // Temel / Her Evde Bulunanlar
  { id: 'su', name: 'su', emoji: '💧', category: 'temel', defaultUnit: 'su bardağı', isStaple: true },
  { id: 'tuz', name: 'tuz', emoji: '🧂', category: 'temel', defaultUnit: 'tatlı kaşığı', isStaple: true },
  { id: 'kaya-tuzu', name: 'kaya tuzu', emoji: '🧂', category: 'temel', defaultUnit: 'yemek kaşığı' },
  { id: 'sivi-yag', name: 'sıvı yağ', emoji: '🌻', category: 'temel', defaultUnit: 'yemek kaşığı', isStaple: true, aliases: ['ayçiçek yağı', 'mısırözü yağı'] },
  { id: 'zeytinyagi', name: 'zeytinyağı', emoji: '🫒', category: 'temel', defaultUnit: 'yemek kaşığı', isStaple: true },
  { id: 'tereyagi', name: 'tereyağı', emoji: '🧈', category: 'temel', defaultUnit: 'yemek kaşığı', isStaple: true },
  { id: 'salca', name: 'salça', emoji: '🥫', category: 'temel', defaultUnit: 'yemek kaşığı', isStaple: true, aliases: ['domates salçası'] },
  { id: 'biber-salcasi', name: 'biber salçası', emoji: '🌶️', category: 'temel', defaultUnit: 'yemek kaşığı' },
  { id: 'un', name: 'un', emoji: '🌾', category: 'temel', defaultUnit: 'su bardağı', isStaple: true },
  { id: 'seker', name: 'şeker', emoji: '🍬', category: 'temel', defaultUnit: 'su bardağı', isStaple: true, aliases: ['toz şeker'] },
  { id: 'pudra-sekeri', name: 'pudra şekeri', emoji: '🍬', category: 'temel', defaultUnit: 'su bardağı' },
  { id: 'karabiber', name: 'karabiber', emoji: '⚫', category: 'temel', defaultUnit: 'çay kaşığı', isStaple: true },
  { id: 'pul-biber', name: 'pul biber', emoji: '🌶️', category: 'temel', defaultUnit: 'tatlı kaşığı', isStaple: true },
  { id: 'toz-biber', name: 'toz biber', emoji: '🌶️', category: 'temel', defaultUnit: 'tatlı kaşığı', aliases: ['kırmızı toz biber'] },
  { id: 'isot', name: 'isot', emoji: '🌶️', category: 'temel', defaultUnit: 'tatlı kaşığı' },
  { id: 'nane', name: 'nane', emoji: '🌿', category: 'temel', defaultUnit: 'tatlı kaşığı', isStaple: true, aliases: ['kuru nane'] },
  { id: 'kekik', name: 'kekik', emoji: '🌱', category: 'temel', defaultUnit: 'tatlı kaşığı', isStaple: true },
  { id: 'kimyon', name: 'kimyon', emoji: '🍂', category: 'temel', defaultUnit: 'çay kaşığı', isStaple: true },

  // Sebze & Yeşillik
  { id: 'sogan', name: 'soğan', emoji: '🧅', category: 'sebze', defaultUnit: 'adet', isStaple: true, aliases: ['kuru soğan'] },
  { id: 'arpacik-sogan', name: 'arpacık soğan', emoji: '🧅', category: 'sebze', defaultUnit: 'gram' },
  { id: 'sarimsak', name: 'sarımsak', emoji: '🧄', category: 'sebze', defaultUnit: 'diş', isStaple: true },
  { id: 'taze-sarimsak', name: 'taze sarımsak', emoji: '🧄', category: 'sebze', defaultUnit: 'demet' },
  { id: 'domates', name: 'domates', emoji: '🍅', category: 'sebze', defaultUnit: 'adet' },
  { id: 'patates', name: 'patates', emoji: '🥔', category: 'sebze', defaultUnit: 'adet' },
  { id: 'yesil-biber', name: 'yeşil biber', emoji: '🫑', category: 'sebze', defaultUnit: 'adet', aliases: ['sivri biber', 'çarliston biber', 'biber'] },
  { id: 'kirmizi-biber', name: 'kırmızı biber', emoji: '🌶️', category: 'sebze', defaultUnit: 'adet', aliases: ['kapya biber'] },
  { id: 'dolmalik-biber', name: 'dolmalık biber', emoji: '🫑', category: 'sebze', defaultUnit: 'adet' },
  { id: 'kuru-biber', name: 'kuru biber', emoji: '🌶️', category: 'sebze', defaultUnit: 'adet' },
  { id: 'kuru-patlican', name: 'kuru patlıcan', emoji: '🍆', category: 'sebze', defaultUnit: 'adet' },
  { id: 'salatalik', name: 'salatalık', emoji: '🥒', category: 'sebze', defaultUnit: 'adet' },
  { id: 'havuc', name: 'havuç', emoji: '🥕', category: 'sebze', defaultUnit: 'adet' },
  { id: 'patlican', name: 'patlıcan', emoji: '🍆', category: 'sebze', defaultUnit: 'adet' },
  { id: 'kabak', name: 'kabak', emoji: '🥒', category: 'sebze', defaultUnit: 'adet' },
  { id: 'ispanak', name: 'ıspanak', emoji: '🥬', category: 'sebze', defaultUnit: 'gram' },
  { id: 'mantar', name: 'mantar', emoji: '🍄', category: 'sebze', defaultUnit: 'gram' },
  { id: 'taze-fasulye', name: 'taze fasulye', emoji: '🫛', category: 'sebze', defaultUnit: 'gram' },
  { id: 'bezelye', name: 'bezelye', emoji: '🫛', category: 'sebze', defaultUnit: 'su bardağı' },
  { id: 'bakla', name: 'bakla', emoji: '🫛', category: 'sebze', defaultUnit: 'gram', aliases: ['taze bakla', 'kuru bakla'] },
  { id: 'pirasa', name: 'pırasa', emoji: '🥬', category: 'sebze', defaultUnit: 'adet' },
  { id: 'karnabahar', name: 'karnabahar', emoji: '🥦', category: 'sebze', defaultUnit: 'adet' },
  { id: 'brokoli', name: 'brokoli', emoji: '🥦', category: 'sebze', defaultUnit: 'adet' },
  { id: 'lahana', name: 'beyaz lahana', emoji: '🥬', category: 'sebze', defaultUnit: 'adet', aliases: ['lahana'] },
  { id: 'kara-lahana', name: 'kara lahana', emoji: '🥬', category: 'sebze', defaultUnit: 'demet' },
  { id: 'enginar', name: 'enginar', emoji: '💚', category: 'sebze', defaultUnit: 'adet' },
  { id: 'kereviz', name: 'kereviz', emoji: '🥬', category: 'sebze', defaultUnit: 'adet' },
  { id: 'semizotu', name: 'semizotu', emoji: '🌿', category: 'sebze', defaultUnit: 'demet' },
  { id: 'pazi', name: 'pazı', emoji: '🥬', category: 'sebze', defaultUnit: 'demet' },
  { id: 'bamya', name: 'bamya', emoji: '🫛', category: 'sebze', defaultUnit: 'gram' },
  { id: 'maydanoz', name: 'maydanoz', emoji: '🌿', category: 'sebze', defaultUnit: 'demet' },
  { id: 'dereotu', name: 'dereotu', emoji: '🌱', category: 'sebze', defaultUnit: 'demet' },
  { id: 'taze-nane', name: 'taze nane', emoji: '🌿', category: 'sebze', defaultUnit: 'demet' },
  { id: 'reyhan', name: 'reyhan', emoji: '🌿', category: 'sebze', defaultUnit: 'demet', aliases: ['fesleğen'] },
  { id: 'roka', name: 'roka', emoji: '🥬', category: 'sebze', defaultUnit: 'demet' },
  { id: 'tarhun-otu', name: 'tarhun otu', emoji: '🌿', category: 'sebze', defaultUnit: 'tutam' },
  { id: 'taze-sogan', name: 'taze soğan', emoji: '🧅', category: 'sebze', defaultUnit: 'demet' },
  { id: 'marul', name: 'marul', emoji: '🥬', category: 'sebze', defaultUnit: 'adet' },
  { id: 'asma-yapragi', name: 'asma yaprağı', emoji: '🍃', category: 'sebze', defaultUnit: 'gram' },
  { id: 'misir', name: 'mısır konservesi', emoji: '🌽', category: 'sebze', defaultUnit: 'su bardağı', aliases: ['mısır'] },
  { id: 'balkabagi', name: 'balkabağı', emoji: '🎃', category: 'sebze', defaultUnit: 'gram' },
  { id: 'pancar', name: 'pancar', emoji: '🟣', category: 'sebze', defaultUnit: 'adet' },
  { id: 'avokado', name: 'avokado', emoji: '🥑', category: 'sebze', defaultUnit: 'adet' },

  // Et, Tavuk & Balık
  { id: 'kiyma', name: 'kıyma', emoji: '🥩', category: 'et_tavuk', defaultUnit: 'gram', aliases: ['dana kıyma', 'kuzu kıyma'] },
  { id: 'kusbasi-et', name: 'kuşbaşı et', emoji: '🥩', category: 'et_tavuk', defaultUnit: 'gram', aliases: ['dana kuşbaşı', 'kuşbaşı'] },
  { id: 'kuzu-kusbasi', name: 'kuzu kuşbaşı', emoji: '🥩', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'kuzu-kol', name: 'kuzu kol', emoji: '🍖', category: 'et_tavuk', defaultUnit: 'gram', aliases: ['kuzu incik', 'kuzu kaburga'] },
  { id: 'kuzu-gerdan', name: 'kuzu gerdan', emoji: '🍖', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'bonfile', name: 'dana bonfile', emoji: '🥩', category: 'et_tavuk', defaultUnit: 'gram', aliases: ['biftek', 'antrikot', 'bonfile'] },
  { id: 'kuyruk-yagi', name: 'kuyruk yağı', emoji: '🥩', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'tavuk-gogsu', name: 'tavuk göğsü', emoji: '🍗', category: 'et_tavuk', defaultUnit: 'gram', aliases: ['tavuk'] },
  { id: 'tavuk-but', name: 'tavuk but', emoji: '🍗', category: 'et_tavuk', defaultUnit: 'adet', aliases: ['tavuk baget', 'tavuk pirzola'] },
  { id: 'sucuk', name: 'sucuk', emoji: '🌭', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'pastirma', name: 'pastırma', emoji: '🥓', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'sosis', name: 'sosis', emoji: '🌭', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'hamsi', name: 'hamsi', emoji: '🐟', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'palamut', name: 'palamut', emoji: '🐟', category: 'et_tavuk', defaultUnit: 'adet' },
  { id: 'somon', name: 'somon', emoji: '🍣', category: 'et_tavuk', defaultUnit: 'adet' },
  { id: 'levrek', name: 'levrek', emoji: '🐟', category: 'et_tavuk', defaultUnit: 'adet' },
  { id: 'cupra', name: 'çupra', emoji: '🐟', category: 'et_tavuk', defaultUnit: 'adet' },
  { id: 'karides', name: 'karides', emoji: '🍤', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'kalamar', name: 'kalamar', emoji: '🦑', category: 'et_tavuk', defaultUnit: 'gram' },
  { id: 'ton-baligi', name: 'ton balığı konservesi', emoji: '🥫', category: 'et_tavuk', defaultUnit: 'paket', aliases: ['ton balığı'] },
  { id: 'ciger', name: 'kuzu ciğeri', emoji: '🥩', category: 'et_tavuk', defaultUnit: 'gram', aliases: ['dana ciğeri', 'ciğer'] },

  // Süt & Kahvaltılık
  { id: 'yumurta', name: 'yumurta', emoji: '🥚', category: 'sut_kahvalti', defaultUnit: 'adet' },
  { id: 'sut', name: 'süt', emoji: '🥛', category: 'sut_kahvalti', defaultUnit: 'su bardağı' },
  { id: 'yogurt', name: 'yoğurt', emoji: '🥣', category: 'sut_kahvalti', defaultUnit: 'su bardağı' },
  { id: 'suzme-yogurt', name: 'süzme yoğurt', emoji: '🥣', category: 'sut_kahvalti', defaultUnit: 'su bardağı' },
  { id: 'beyaz-peynir', name: 'beyaz peynir', emoji: '🧀', category: 'sut_kahvalti', defaultUnit: 'gram' },
  { id: 'kasar-peyniri', name: 'kaşar peyniri', emoji: '🧀', category: 'sut_kahvalti', defaultUnit: 'gram' },
  { id: 'mozzarella', name: 'mozzarella', emoji: '🧀', category: 'sut_kahvalti', defaultUnit: 'gram' },
  { id: 'lor-peyniri', name: 'lor peyniri', emoji: '🧀', category: 'sut_kahvalti', defaultUnit: 'gram' },
  { id: 'cokelek', name: 'çökelek', emoji: '🧀', category: 'sut_kahvalti', defaultUnit: 'gram' },
  { id: 'tulum-peyniri', name: 'tulum peyniri', emoji: '🧀', category: 'sut_kahvalti', defaultUnit: 'gram' },
  { id: 'hellim-peyniri', name: 'hellim peyniri', emoji: '🧀', category: 'sut_kahvalti', defaultUnit: 'gram' },
  { id: 'kunefe-peyniri', name: 'künefe peyniri', emoji: '🧀', category: 'sut_kahvalti', defaultUnit: 'gram', aliases: ['dil peyniri'] },
  { id: 'kaymak', name: 'kaymak', emoji: '🥛', category: 'sut_kahvalti', defaultUnit: 'gram' },
  { id: 'krema', name: 'krema', emoji: '🥛', category: 'sut_kahvalti', defaultUnit: 'paket' },
  { id: 'labne', name: 'labne', emoji: '🧀', category: 'sut_kahvalti', defaultUnit: 'paket' },
  { id: 'krem-santi', name: 'krem şanti', emoji: '🍦', category: 'sut_kahvalti', defaultUnit: 'paket' },
  { id: 'zeytin', name: 'zeytin', emoji: '🫒', category: 'sut_kahvalti', defaultUnit: 'su bardağı' },

  // Bakliyat & Unlu
  { id: 'pirinc', name: 'pirinç', emoji: '🍚', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'pilavlik-bulgur', name: 'pilavlık bulgur', emoji: '🌾', category: 'bakliyat', defaultUnit: 'su bardağı', aliases: ['bulgur'] },
  { id: 'koftelik-bulgur', name: 'köftelik bulgur', emoji: '🌾', category: 'bakliyat', defaultUnit: 'su bardağı', aliases: ['ince bulgur'] },
  { id: 'firik-bulguru', name: 'firik bulguru', emoji: '🌾', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'kirmizi-mercimek', name: 'kırmızı mercimek', emoji: '🟠', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'yesil-mercimek', name: 'yeşil mercimek', emoji: '🟢', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'nohut', name: 'nohut', emoji: '🟡', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'kuru-fasulye', name: 'kuru fasulye', emoji: '🫘', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'barbunya', name: 'barbunya', emoji: '🫘', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'borulce', name: 'börülce', emoji: '🫘', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'makarna', name: 'makarna', emoji: '🍝', category: 'bakliyat', defaultUnit: 'paket', aliases: ['spagetti', 'penne'] },
  { id: 'arpa-sehriye', name: 'arpa şehriye', emoji: '🌾', category: 'bakliyat', defaultUnit: 'çay bardağı' },
  { id: 'tel-sehriye', name: 'tel şehriye', emoji: '🌾', category: 'bakliyat', defaultUnit: 'çay bardağı' },
  { id: 'eriste', name: 'erişte', emoji: '🍜', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'hazir-yufka', name: 'hazır yufka', emoji: '🫓', category: 'bakliyat', defaultUnit: 'adet', aliases: ['yufka'] },
  { id: 'baklavalik-yufka', name: 'baklavalık yufka', emoji: '🫓', category: 'bakliyat', defaultUnit: 'paket' },
  { id: 'tel-kadayif', name: 'tel kadayıf', emoji: '🌾', category: 'bakliyat', defaultUnit: 'gram', aliases: ['kadayıf'] },
  { id: 'gullac-yapragi', name: 'güllaç yaprağı', emoji: '🫓', category: 'bakliyat', defaultUnit: 'adet' },
  { id: 'milfoy', name: 'milföy hamuru', emoji: '🥐', category: 'bakliyat', defaultUnit: 'paket' },
  { id: 'lavas', name: 'lavaş ekmeği', emoji: '🫓', category: 'bakliyat', defaultUnit: 'adet', aliases: ['tortilla', 'lavaş'] },
  { id: 'pide-ekmegi', name: 'pide ekmeği', emoji: '🫓', category: 'bakliyat', defaultUnit: 'adet', aliases: ['tırnak pide'] },
  { id: 'bayat-ekmek', name: 'bayat ekmek içi', emoji: '🍞', category: 'bakliyat', defaultUnit: 'dilim', aliases: ['ekmek', 'tost ekmeği'] },
  { id: 'galeta-unu', name: 'galeta unu', emoji: '🥖', category: 'bakliyat', defaultUnit: 'yemek kaşığı' },
  { id: 'irmik', name: 'irmik', emoji: '🌾', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'nisasta', name: 'nişasta', emoji: '⚪', category: 'bakliyat', defaultUnit: 'yemek kaşığı', aliases: ['mısır nişastası', 'buğday nişastası'] },
  { id: 'pirinc-unu', name: 'pirinç unu', emoji: '⚪', category: 'bakliyat', defaultUnit: 'yemek kaşığı' },
  { id: 'misir-unu', name: 'mısır unu', emoji: '🌽', category: 'bakliyat', defaultUnit: 'su bardağı' },
  { id: 'toz-tarhana', name: 'toz tarhana', emoji: '🍲', category: 'bakliyat', defaultUnit: 'yemek kaşığı', aliases: ['tarhana'] },
  { id: 'kabartma-tozu', name: 'kabartma tozu', emoji: '🧁', category: 'bakliyat', defaultUnit: 'paket' },
  { id: 'karbonat', name: 'karbonat', emoji: '🥄', category: 'bakliyat', defaultUnit: 'çay kaşığı' },
  { id: 'vanilya', name: 'vanilya', emoji: '🌼', category: 'bakliyat', defaultUnit: 'paket' },
  { id: 'maya', name: 'maya', emoji: '🍞', category: 'bakliyat', defaultUnit: 'paket', aliases: ['instant maya', 'yaş maya'] },
  { id: 'kakao', name: 'kakao', emoji: '🍫', category: 'bakliyat', defaultUnit: 'yemek kaşığı' },
  { id: 'petibor-biskuvi', name: 'petibör bisküvi', emoji: '🍪', category: 'bakliyat', defaultUnit: 'paket' },
  { id: 'kedi-dili', name: 'kedi dili bisküvi', emoji: '🍪', category: 'bakliyat', defaultUnit: 'paket' },
  { id: 'bugday', name: 'buğday', emoji: '🌾', category: 'bakliyat', defaultUnit: 'su bardağı', aliases: ['aşurelik buğday', 'yarma'] },
  { id: 'yulaf-ezmesi', name: 'yulaf ezmesi', emoji: '🌾', category: 'bakliyat', defaultUnit: 'su bardağı' },

  // Baharat, Sos & Diğer
  { id: 'limon', name: 'limon', emoji: '🍋', category: 'baharat_sos', defaultUnit: 'adet', aliases: ['limon suyu'] },
  { id: 'nar-eksisi', name: 'nar ekşisi', emoji: '🍷', category: 'baharat_sos', defaultUnit: 'yemek kaşığı' },
  { id: 'koruk-eksisi', name: 'koruk ekşisi', emoji: '🍇', category: 'baharat_sos', defaultUnit: 'yemek kaşığı' },
  { id: 'sirke', name: 'sirke', emoji: '🍾', category: 'baharat_sos', defaultUnit: 'yemek kaşığı', aliases: ['üzüm sirkesi', 'elma sirkesi'] },
  { id: 'sumak', name: 'sumak', emoji: '🌺', category: 'baharat_sos', defaultUnit: 'tatlı kaşığı' },
  { id: 'tarcin', name: 'tarçın', emoji: '🪵', category: 'baharat_sos', defaultUnit: 'çay kaşığı' },
  { id: 'yenibahar', name: 'yenibahar', emoji: '🌰', category: 'baharat_sos', defaultUnit: 'çay kaşığı' },
  { id: 'karanfil', name: 'karanfil', emoji: '🌸', category: 'baharat_sos', defaultUnit: 'adet' },
  { id: 'mahlep', name: 'mahlep', emoji: '🌾', category: 'baharat_sos', defaultUnit: 'çay kaşığı' },
  { id: 'zerdecal', name: 'zerdeçal', emoji: '🟡', category: 'baharat_sos', defaultUnit: 'çay kaşığı' },
  { id: 'zencefil', name: 'zencefil', emoji: '🫚', category: 'baharat_sos', defaultUnit: 'çay kaşığı' },
  { id: 'kori', name: 'köri', emoji: '🍛', category: 'baharat_sos', defaultUnit: 'tatlı kaşığı' },
  { id: 'defne-yapragi', name: 'defne yaprağı', emoji: '🍃', category: 'baharat_sos', defaultUnit: 'adet' },
  { id: 'susam', name: 'susam', emoji: '🌾', category: 'baharat_sos', defaultUnit: 'yemek kaşığı' },
  { id: 'corek-otu', name: 'çörek otu', emoji: '⚫', category: 'baharat_sos', defaultUnit: 'tatlı kaşığı' },
  { id: 'hashas-ezmesi', name: 'haşhaş ezmesi', emoji: '🌾', category: 'baharat_sos', defaultUnit: 'yemek kaşığı' },
  { id: 'tahin', name: 'tahin', emoji: '🍯', category: 'baharat_sos', defaultUnit: 'su bardağı' },
  { id: 'pekmez', name: 'pekmez', emoji: '🍯', category: 'baharat_sos', defaultUnit: 'su bardağı' },
  { id: 'bal', name: 'bal', emoji: '🍯', category: 'baharat_sos', defaultUnit: 'yemek kaşığı' },
  { id: 'mayonez', name: 'mayonez', emoji: '🥫', category: 'baharat_sos', defaultUnit: 'yemek kaşığı' },
  { id: 'hardal', name: 'hardal', emoji: '🥫', category: 'baharat_sos', defaultUnit: 'tatlı kaşığı' },
  { id: 'soya-sosu', name: 'soya sosu', emoji: '🍶', category: 'baharat_sos', defaultUnit: 'yemek kaşığı' },
  { id: 'gul-suyu', name: 'gül suyu', emoji: '🌹', category: 'baharat_sos', defaultUnit: 'yemek kaşığı' },
  { id: 'salatalik-tursusu', name: 'salatalık turşusu', emoji: '🥒', category: 'baharat_sos', defaultUnit: 'adet' },
  { id: 'tavuk-suyu', name: 'tavuk suyu', emoji: '🍲', category: 'baharat_sos', defaultUnit: 'su bardağı' },
  { id: 'et-suyu', name: 'et suyu', emoji: '🍲', category: 'baharat_sos', defaultUnit: 'su bardağı' },

  // Meyve & Kuruyemiş
  { id: 'ceviz', name: 'ceviz', emoji: '🌰', category: 'meyve_kuruyemis', defaultUnit: 'su bardağı' },
  { id: 'findik', name: 'fındık', emoji: '🌰', category: 'meyve_kuruyemis', defaultUnit: 'su bardağı' },
  { id: 'badem', name: 'badem', emoji: '🌰', category: 'meyve_kuruyemis', defaultUnit: 'su bardağı' },
  { id: 'antep-fistigi', name: 'antep fıstığı', emoji: '🟢', category: 'meyve_kuruyemis', defaultUnit: 'su bardağı' },
  { id: 'cam-fistigi', name: 'çam fıstığı', emoji: '🌲', category: 'meyve_kuruyemis', defaultUnit: 'yemek kaşığı' },
  { id: 'kus-uzumu', name: 'kuş üzümü', emoji: '🍇', category: 'meyve_kuruyemis', defaultUnit: 'yemek kaşığı' },
  { id: 'uzum', name: 'üzüm', emoji: '🍇', category: 'meyve_kuruyemis', defaultUnit: 'su bardağı', aliases: ['kuru üzüm'] },
  { id: 'kuru-kayisi', name: 'kuru kayısı', emoji: '🍑', category: 'meyve_kuruyemis', defaultUnit: 'gram' },
  { id: 'kuru-incir', name: 'kuru incir', emoji: ' figs', category: 'meyve_kuruyemis', defaultUnit: 'adet' },
  { id: 'erik', name: 'erik', emoji: '🍑', category: 'meyve_kuruyemis', defaultUnit: 'gram', aliases: ['kuru erik'] },
  { id: 'hindistan-cevizi', name: 'hindistan cevizi', emoji: '🥥', category: 'meyve_kuruyemis', defaultUnit: 'yemek kaşığı' },
  { id: 'elma', name: 'elma', emoji: '🍎', category: 'meyve_kuruyemis', defaultUnit: 'adet' },
  { id: 'ayva', name: 'ayva', emoji: '🍐', category: 'meyve_kuruyemis', defaultUnit: 'adet' },
  { id: 'portakal', name: 'portakal', emoji: '🍊', category: 'meyve_kuruyemis', defaultUnit: 'adet' },
  { id: 'portakal-suyu', name: 'portakal suyu', emoji: '🍊', category: 'meyve_kuruyemis', defaultUnit: 'su bardağı' },
  { id: 'nar', name: 'nar', emoji: '🔴', category: 'meyve_kuruyemis', defaultUnit: 'adet' },
  { id: 'muz', name: 'muz', emoji: '🍌', category: 'meyve_kuruyemis', defaultUnit: 'adet' },
  { id: 'cilek', name: 'çilek', emoji: '🍓', category: 'meyve_kuruyemis', defaultUnit: 'gram' },
  { id: 'cikolata', name: 'çikolata', emoji: '🍫', category: 'meyve_kuruyemis', defaultUnit: 'gram', aliases: ['bitter çikolata', 'damla çikolata'] },
];

/**
 * Tariflerde geçen herhangi bir malzeme adı temel listede yoksa,
 * otomatik olarak doğru kategori, emoji ve ölçü birimiyle Kiler listesine ekler.
 * Böylece HİÇBİR tarifte kilerde seçilemeyen eksik malzeme kalmaz (%100 Kapsama Garantisi).
 */
function inferMissingIngredientItem(rawName: string, index: number): IngredientItem {
  const n = rawName.toLowerCase().trim();
  let category: IngredientCategoryId = 'sebze';
  let emoji = '🥗';
  let defaultUnit: MeasurementUnit = 'adet';

  if (
    n.includes('et') ||
    n.includes('kuzu') ||
    n.includes('dana') ||
    n.includes('kıyma') ||
    n.includes('tavuk') ||
    n.includes('hindi') ||
    n.includes('ciğer') ||
    n.includes('sucuk') ||
    n.includes('pastırma') ||
    n.includes('sosis') ||
    n.includes('balık') ||
    n.includes('hamsi') ||
    n.includes('levrek') ||
    n.includes('somon') ||
    n.includes('palamut') ||
    n.includes('karides') ||
    n.includes('kalamar') ||
    n.includes('işkembe') ||
    n.includes('paça')
  ) {
    category = 'et_tavuk';
    emoji = n.includes('balık') || n.includes('hamsi') || n.includes('levrek') || n.includes('somon') ? '🐟' : '🥩';
    defaultUnit = 'gram';
  } else if (
    n.includes('peynir') ||
    n.includes('yoğurt') ||
    n.includes('süt') ||
    n.includes('kaymak') ||
    n.includes('krema') ||
    n.includes('labne') ||
    n.includes('yumurta') ||
    n.includes('çökelek') ||
    n.includes('zeytin')
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
    n.includes('barbunya') ||
    n.includes('börülce') ||
    n.includes('buğday') ||
    n.includes('makarna') ||
    n.includes('erişte') ||
    n.includes('şehriye') ||
    n.includes('yufka') ||
    n.includes('ekmek') ||
    n.includes('pide') ||
    n.includes('lavaş') ||
    n.includes('kadayıf') ||
    n.includes('irmik') ||
    n.includes('nişasta') ||
    n.includes('bisküvi') ||
    n.includes('tarhana') ||
    n.includes('maya') ||
    n.includes('kabartma') ||
    n.includes('vanilya') ||
    n.includes('kakao')
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
    n.includes('portakal') ||
    n.includes('vişne') ||
    n.includes('çilek') ||
    n.includes('muz') ||
    n.includes('nar') ||
    n.includes('çikolata') ||
    n.includes('hindistan')
  ) {
    category = 'meyve_kuruyemis';
    emoji = '🌰';
    defaultUnit = 'su bardağı';
  } else if (
    n.includes('biber') && (n.includes('pul') || n.includes('toz') || n.includes('kara')) ||
    n.includes('yağ') ||
    n.includes('salça') ||
    n.includes('sos') ||
    n.includes('sirke') ||
    n.includes('ekşi') ||
    n.includes('tuz') ||
    n.includes('şeker') ||
    n.includes('baharat') ||
    n.includes('kimyon') ||
    n.includes('kekik') ||
    n.includes('nane') ||
    n.includes('sumak') ||
    n.includes('tarçın') ||
    n.includes('karanfil') ||
    n.includes('yenibahar') ||
    n.includes('zerdeçal') ||
    n.includes('zencefil') ||
    n.includes('mahlep') ||
    n.includes('susam') ||
    n.includes('çörek') ||
    n.includes('tahin') ||
    n.includes('pekmez') ||
    n.includes('bal') ||
    n.includes('suyu') ||
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
      'biber salçası',
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
      'toz biber',
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
      'süzme yoğurt',
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
      'tel şehriye',
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
    description: 'Kıyma, kuşbaşı et, tavuk, sucuk, et/tavuk suyu',
    items: [
      'kıyma',
      'kuşbaşı et',
      'kuzu kuşbaşı',
      'tavuk göğsü',
      'tavuk but',
      'sucuk',
      'et suyu',
      'tavuk suyu',
    ],
  },
];
