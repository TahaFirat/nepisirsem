import { INGREDIENTS_DATA, canonicalizeIngredientName } from '../data/ingredients';
import iconCredits from '../data/ingredientIconCredits.json';

const NAME_TO_ID = new Map<string, string>();
for (const item of INGREDIENTS_DATA) {
  NAME_TO_ID.set(item.name.toLocaleLowerCase('tr-TR'), item.id);
}

const AVAILABLE = new Set(Object.keys(iconCredits as Record<string, unknown>));

/** Malzeme kimliği veya adından paketteki minik ikon yolunu döndürür. */
export function getIngredientIconUrl(idOrName: string): string | null {
  let id = idOrName;
  if (!AVAILABLE.has(id)) {
    const canonical = canonicalizeIngredientName(idOrName);
    id = NAME_TO_ID.get(canonical) || '';
  }
  if (!id || !AVAILABLE.has(id)) return null;
  return `${import.meta.env.BASE_URL}ingredient-icons/${id}.jpg`;
}

export interface IconCredit {
  id: string;
  file: string;
  page: string;
  artist: string;
  license: string;
}

export function getIngredientIconCredits(): IconCredit[] {
  const raw = iconCredits as Record<string, Omit<IconCredit, 'id'>>;
  return Object.entries(raw).map(([id, v]) => ({ id, ...v }));
}
