import type { MatchedRecipe, Recipe, RecipeIngredient } from '../types/recipe';
import { INGREDIENTS_DATA } from '../data/ingredients';

// Her evde varsayılan olarak bulunan temel malzemeler (Su, Tuz, Yağ, Salça, Un, Şeker, Temel Baharatlar)
const STAPLE_NAMES = new Set(
  INGREDIENTS_DATA.filter((i) => i.isStaple).map((i) => i.name.toLowerCase().trim())
);

// Önceden hesaplanmış malzeme eş anlamlılar (alias) tablosu — her tıklamada tekrar dizi oluşturulmasını önler
const PRECOMPUTED_ALIAS_GROUPS: Array<{ mainName: string; aliases: string[] }> =
  INGREDIENTS_DATA.map((item) => ({
    mainName: item.name.toLowerCase().trim(),
    aliases: (item.aliases || []).map((a) => a.toLowerCase().trim()),
  }));

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

interface CachedIngredientMeta {
  ing: RecipeIngredient;
  ingName: string;
  optionalForDish: boolean;
  isStaple: boolean;
  isWaterOrSalt: boolean;
}

// Tarif başına malzeme analizini önbelleğe alır (605 tarif x ~8 malzeme = ~5000 string işlemini sıfıra indirir)
const RECIPE_META_CACHE = new WeakMap<Recipe, CachedIngredientMeta[]>();

function getRecipeIngredientMeta(recipe: Recipe): CachedIngredientMeta[] {
  let cached = RECIPE_META_CACHE.get(recipe);
  if (!cached) {
    cached = recipe.ingredients.map((ing) => {
      const ingName = ing.name.toLowerCase().trim();
      return {
        ing,
        ingName,
        optionalForDish: isIngredientEffectivelyOptional(ing, recipe.title),
        isStaple: STAPLE_NAMES.has(ingName),
        isWaterOrSalt: ingName === 'su' || ingName === 'tuz',
      };
    });
    RECIPE_META_CACHE.set(recipe, cached);
  }
  return cached;
}

/**
 * Kullanıcının seçtiği malzemelerle (pantry) tarifleri karşılaştırır,
 * eksikleri, eşleşme yüzdesini ve hemen pişirilebilirlik durumunu %100 doğru ve anlık hesaplar.
 */
export function matchRecipesWithPantry(
  recipes: Recipe[],
  pantryItems: string[],
  assumeBasicStaples: boolean = false
): MatchedRecipe[] {
  const normalizedPantry = new Set<string>();
  for (let i = 0; i < pantryItems.length; i++) {
    normalizedPantry.add(pantryItems[i].toLowerCase().trim());
  }

  // Eş anlamlıları da kilere dahil et (Örn: 'bulgur' <-> 'pilavlık bulgur', 'salça' <-> 'biber salçası')
  for (let i = 0; i < PRECOMPUTED_ALIAS_GROUPS.length; i++) {
    const group = PRECOMPUTED_ALIAS_GROUPS[i];
    if (normalizedPantry.has(group.mainName)) {
      for (let j = 0; j < group.aliases.length; j++) {
        normalizedPantry.add(group.aliases[j]);
      }
    } else {
      let hasAlias = false;
      for (let j = 0; j < group.aliases.length; j++) {
        if (normalizedPantry.has(group.aliases[j])) {
          hasAlias = true;
          break;
        }
      }
      if (hasAlias) {
        normalizedPantry.add(group.mainName);
        for (let j = 0; j < group.aliases.length; j++) {
          normalizedPantry.add(group.aliases[j]);
        }
      }
    }
  }

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

  const matchedList: MatchedRecipe[] = new Array(recipes.length);

  for (let r = 0; r < recipes.length; r++) {
    const recipe = recipes[r];
    const metas = getRecipeIngredientMeta(recipe);
    const usedIngredients: RecipeIngredient[] = [];
    const missingIngredients: RecipeIngredient[] = [];
    const stapleIngredients: RecipeIngredient[] = [];

    for (let i = 0; i < metas.length; i++) {
      const meta = metas[i];
      if (meta.isWaterOrSalt || normalizedPantry.has(meta.ingName)) {
        usedIngredients.push(meta.ing);
      } else if (meta.optionalForDish) {
        stapleIngredients.push(meta.ing);
      } else if (assumeBasicStaples && meta.isStaple) {
        stapleIngredients.push(meta.ing);
      } else {
        missingIngredients.push(meta.ing);
      }
    }

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

    matchedList[r] = {
      recipe,
      usedIngredients,
      missingIngredients,
      stapleIngredients,
      matchPercentage,
      canCookImmediately,
    };
  }

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
