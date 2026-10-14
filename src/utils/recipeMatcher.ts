import type { MatchedRecipe, Recipe, RecipeIngredient } from '../types/recipe';
import { INGREDIENTS_DATA } from '../data/ingredients';

// Her evde varsayılan olarak bulunan temel malzemeler (Su, Tuz, Yağ, Salça, Un, Şeker, Temel Baharatlar)
const STAPLE_NAMES = new Set(
  INGREDIENTS_DATA.filter((i) => i.isStaple).map((i) => i.name.toLowerCase())
);

// Yemeğin ana adında geçmiyorsa süsleme/lezzet verici olarak kabul edilen,
// evde olmasa bile yemeğin pişirilmesine engel olmayan yardımcı malzemeler
const GARNISH_OR_SUBSTITUTABLE = new Set([
  'et suyu',
  'tavuk suyu',
  'susam',
  'çörek otu',
  'defne yaprağı',
  'çam fıstığı',
  'kuş üzümü',
  'hindistan cevizi',
  'kaymak',
  'maydanoz',
  'dereotu',
  'taze nane',
  'taze soğan',
  'limon',
  'limon suyu',
  'sirke',
  'nar ekşisi',
  'koruk ekşisi',
  'sumak',
  'tarçın',
  'karanfil',
  'yenibahar',
  'mahlep',
  'zerdeçal',
  'zencefil',
  'isot',
  'toz biber',
  'pul biber',
  'karabiber',
  'kimyon',
  'kekik',
  'nane',
  'kaya tuzu',
  'pudra şekeri',
  'vanilya',
]);

/**
 * Bir malzemenin o tarif için zorunlu ana malzeme mi yoksa opsiyonel/yardımcı mı olduğunu belirler
 */
export function isIngredientEffectivelyOptional(
  ing: RecipeIngredient,
  recipeTitle: string
): boolean {
  if (ing.isOptional) return true;
  const ingName = ing.name.toLowerCase().trim();
  const titleLower = recipeTitle.toLowerCase();

  // Eğer malzeme yemeğin bizzat adında geçiyorsa (Örn: "Dereotlu Poğaça", "Susamlı Simit") zorunludur
  const rootWord = ingName.split(' ')[0];
  if (rootWord.length >= 4 && titleLower.includes(rootWord)) {
    return false;
  }

  if (GARNISH_OR_SUBSTITUTABLE.has(ingName)) {
    return true;
  }

  // Ceviz, fındık, badem, antep fıstığı yemeğin adında geçmiyorsa süslemedir (opsiyoneldir)
  if (
    (ingName === 'ceviz' ||
      ingName === 'fındık' ||
      ingName === 'badem' ||
      ingName === 'antep fıstığı') &&
    !titleLower.includes('ceviz') &&
    !titleLower.includes('fındık') &&
    !titleLower.includes('badem') &&
    !titleLower.includes('fıstık')
  ) {
    return true;
  }

  return false;
}

/**
 * Kullanıcının seçtiği malzemelerle (pantry) tarifleri karşılaştırır,
 * eksikleri, eşleşme yüzdesini ve hemen pişirilebilirlik durumunu %100 doğru hesaplar.
 */
export function matchRecipesWithPantry(
  recipes: Recipe[],
  pantryItems: string[],
  assumeBasicStaples: boolean = false
): MatchedRecipe[] {
  const normalizedPantry = new Set(pantryItems.map((i) => i.toLowerCase().trim()));

  // Eş anlamlıları da kilere dahil et (Örn: 'bulgur' <-> 'pilavlık bulgur', 'salça' <-> 'biber salçası')
  INGREDIENTS_DATA.forEach((item) => {
    const mainName = item.name.toLowerCase();
    const aliases = (item.aliases || []).map((a) => a.toLowerCase());
    if (normalizedPantry.has(mainName)) {
      aliases.forEach((a) => normalizedPantry.add(a));
    } else if (aliases.some((a) => normalizedPantry.has(a))) {
      normalizedPantry.add(mainName);
      aliases.forEach((a) => normalizedPantry.add(a));
    }
  });

  // Pratik Türk mutfağı ikameleri (Örn: sıvı yağ veya zeytinyağı veya tereyağı varsa yağ ihtiyacı karşılanır)
  if (
    normalizedPantry.has('sıvı yağ') ||
    normalizedPantry.has('zeytinyağı') ||
    normalizedPantry.has('tereyağı')
  ) {
    normalizedPantry.add('sıvı yağ');
  }
  if (normalizedPantry.has('salça') || normalizedPantry.has('biber salçası')) {
    normalizedPantry.add('salça');
    normalizedPantry.add('biber salçası');
  }
  if (normalizedPantry.has('yoğurt') || normalizedPantry.has('süzme yoğurt')) {
    normalizedPantry.add('yoğurt');
    normalizedPantry.add('süzme yoğurt');
  }
  if (normalizedPantry.has('pilavlık bulgur') || normalizedPantry.has('bulgur')) {
    normalizedPantry.add('pilavlık bulgur');
    normalizedPantry.add('bulgur');
  }

  const matchedList: MatchedRecipe[] = recipes.map((recipe) => {
    const usedIngredients: RecipeIngredient[] = [];
    const missingIngredients: RecipeIngredient[] = [];
    const stapleIngredients: RecipeIngredient[] = [];

    recipe.ingredients.forEach((ing) => {
      const ingName = ing.name.toLowerCase().trim();
      const optionalForDish = isIngredientEffectivelyOptional(ing, recipe.title);

      if (normalizedPantry.has(ingName) || ingName === 'su' || ingName === 'tuz') {
        usedIngredients.push(ing);
      } else if (optionalForDish) {
        stapleIngredients.push(ing);
      } else if (assumeBasicStaples && STAPLE_NAMES.has(ingName)) {
        stapleIngredients.push(ing);
      } else {
        missingIngredients.push(ing);
      }
    });

    const coreRequiredCount = Math.max(
      1,
      usedIngredients.length + missingIngredients.length
    );

    let matchPercentage = Math.round(
      (usedIngredients.length / coreRequiredCount) * 100
    );
    if (missingIngredients.length > 0 && matchPercentage >= 100) {
      matchPercentage = 92;
    }
    if (missingIngredients.length === 0) {
      matchPercentage = 100;
    }

    const canCookImmediately = missingIngredients.length === 0;

    return {
      recipe,
      usedIngredients,
      missingIngredients,
      stapleIngredients,
      matchPercentage,
      canCookImmediately,
    };
  });

  // Sıralama:
  // 1. Önce hemen pişirilebilir olanlar (Eksiksizler)
  // 2. Eksik malzemesi en az olanlar
  // 3. Eşleşme yüzdesi yüksek olanlar
  return matchedList.sort((a, b) => {
    if (a.canCookImmediately !== b.canCookImmediately) {
      return a.canCookImmediately ? -1 : 1;
    }
    if (a.missingIngredients.length !== b.missingIngredients.length) {
      return a.missingIngredients.length - b.missingIngredients.length;
    }
    return b.matchPercentage - a.matchPercentage;
  });
}
