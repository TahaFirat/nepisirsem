export type IngredientCategoryId =
  | 'temel'
  | 'sebze'
  | 'et_tavuk'
  | 'bakliyat'
  | 'sut_kahvalti'
  | 'baharat_sos'
  | 'meyve_kuruyemis';

export interface IngredientItem {
  id: string;
  name: string;
  emoji: string;
  category: IngredientCategoryId;
  defaultUnit: string;
  isStaple?: boolean; // Evde her zaman bulunan temel malzemeler (Su, Tuz, Sıvı Yağ vb.)
  aliases?: string[];
}

export type MeasurementUnit =
  | 'adet'
  | 'gram'
  | 'su bardağı'
  | 'çay bardağı'
  | 'yemek kaşığı'
  | 'tatlı kaşığı'
  | 'çay kaşığı'
  | 'diş'
  | 'demet'
  | 'paket'
  | 'ml'
  | 'tutam'
  | 'yaprak'
  | 'dilim'
  | 'kase';

export interface RecipeIngredient {
  name: string; // Malzeme eşleştirme adı (küçük harf)
  displayName?: string; // Özel gösterim adı (örn: "Orta boy kuru soğan")
  amount: number; // BaseServings (örn. 4 kişilik) için net sayısal miktar
  unit: MeasurementUnit;
  note?: string; // Örn: "küp doğranmış", "oda sıcaklığında", "haşlanmış"
  isOptional?: boolean;
}

export interface RecipeStep {
  title: string;
  instruction: string;
  timerMinutes?: number; // Adımda sayaç başlatmak için dakika
}

export type RecipeCategory =
  | 'tumu'
  | 'corba'
  | 'et_tavuk'
  | 'sebze_zeytinyagli'
  | 'bakliyat_pilav'
  | 'hamur_borek'
  | 'kahvalti'
  | 'salata_meze'
  | 'tatli'
  | 'dunya_mutfagi';

export type CuisineOrigin = 'all' | 'turkish' | 'world';

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<RecipeCategory, 'tumu'>;
  cuisineOrigin?: 'turkish' | 'world';
  countryLabel?: string; // Örn: "🇹🇷 Türk Mutfağı", "🇮🇹 İtalyan", "🇲🇽 Meksika"
  emoji: string;
  image: string;
  prepTime: number; // dakika
  cookTime: number; // dakika
  difficulty: 'Kolay' | 'Orta' | 'Özenli';
  caloriesPerServing: number;
  baseServings: number; // Tarifin orijinal porsiyon sayısı (genelde 4)
  scalingTip?: string; // Porsiyon değiştiğinde tencere/tepsi/pişirme süresi tavsiyesi
  chefTip: string; // Ev hanımları için altın değerinde püf noktası
  servingSuggestion: string; // "Yanına ne yakışır?" önerisi
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tags?: string[];
}

export interface MatchedRecipe {
  recipe: Recipe;
  usedIngredients: RecipeIngredient[];
  missingIngredients: RecipeIngredient[];
  stapleIngredients: RecipeIngredient[];
  matchPercentage: number;
  canCookImmediately: boolean;
}
