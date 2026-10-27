import type { MatchedRecipe, Recipe, RecipeIngredient } from '../types/recipe';
import { INGREDIENTS_DATA, canonicalizeIngredientName } from '../data/ingredients';

// Önceden hesaplanmış malzeme eş anlamlılar (alias) tablosu
const PRECOMPUTED_ALIAS_GROUPS: Array<{ mainName: string; aliases: string[] }> =
  INGREDIENTS_DATA.map((item) => ({
    mainName: item.name.toLowerCase().trim(),
    aliases: (item.aliases || []).map((a) => a.toLowerCase().trim()),
  }));

/**
 * Kullanıcının Kilerim'de seçtiği malzemeleri (ve birebir isim eş anlamlılarını)
 * O(1) arama kümesine dönüştürür.
 * Kilerde seçili OLMAYAN hiçbir malzeme bu kümeye eklenmez.
 */
export function expandPantrySet(pantryItems: string[]): Set<string> {
  const normalizedPantry = new Set<string>();
  for (let i = 0; i < pantryItems.length; i++) {
    const raw = pantryItems[i].toLowerCase().trim();
    if (!raw) continue;
    normalizedPantry.add(raw);
    normalizedPantry.add(canonicalizeIngredientName(raw));
  }

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

  return normalizedPantry;
}

/**
 * Bir malzemenin kullanıcının kilerinde gerçekten seçili olup olmadığını kontrol eder.
 */
export function isIngredientAvailableInPantry(
  ingName: string,
  expandedPantry: Set<string>
): boolean {
  const clean = ingName.toLowerCase().trim();
  const canonical = canonicalizeIngredientName(clean);
  return expandedPantry.has(clean) || expandedPantry.has(canonical);
}

interface CachedIngredientMeta {
  ing: RecipeIngredient;
  ingName: string;
  canonicalName: string;
}

const RECIPE_META_CACHE = new WeakMap<Recipe, CachedIngredientMeta[]>();

function getRecipeIngredientMeta(recipe: Recipe): CachedIngredientMeta[] {
  let cached = RECIPE_META_CACHE.get(recipe);
  if (!cached) {
    cached = recipe.ingredients.map((ing) => {
      const ingName = ing.name.toLowerCase().trim();
      return {
        ing,
        ingName,
        canonicalName: canonicalizeIngredientName(ingName),
      };
    });
    RECIPE_META_CACHE.set(recipe, cached);
  }
  return cached;
}

/**
 * Kullanıcının seçtiği malzemelerle (pantry) tarifleri birebir (%100 kesin) karşılaştırır.
 * Kilerde seçili olmayan HİÇBİR malzeme "var" sayılmaz; tamamı eksik listesine eklenir.
 */
export function matchRecipesWithPantry(
  recipes: Recipe[],
  pantryItems: string[]
): MatchedRecipe[] {
  const expandedPantry = expandPantrySet(pantryItems);
  const matchedList: MatchedRecipe[] = new Array(recipes.length);

  for (let r = 0; r < recipes.length; r++) {
    const recipe = recipes[r];
    const metas = getRecipeIngredientMeta(recipe);
    const usedIngredients: RecipeIngredient[] = [];
    const missingIngredients: RecipeIngredient[] = [];
    const stapleIngredients: RecipeIngredient[] = [];

    for (let i = 0; i < metas.length; i++) {
      const meta = metas[i];
      if (
        expandedPantry.has(meta.ingName) ||
        expandedPantry.has(meta.canonicalName)
      ) {
        usedIngredients.push(meta.ing);
      } else {
        missingIngredients.push(meta.ing);
      }
    }

    const totalRequiredCount = Math.max(
      1,
      usedIngredients.length + missingIngredients.length
    );

    let matchPercentage = Math.round(
      (usedIngredients.length / totalRequiredCount) * 100
    );
    if (missingIngredients.length > 0 && matchPercentage >= 100) {
      matchPercentage = 95;
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
