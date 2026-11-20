import type { RecipeIngredient } from '../types/recipe';
import { canonicalizeIngredientName } from '../data/ingredients';

type Unit = RecipeIngredient['unit'];

const END_TOK = '(?=\\s|$|[.,;:])';

const UNIT_PATTERNS: Array<[RegExp, Unit]> = [
  [new RegExp(`^(su\\s*bardağı|su\\s*bardak|bardak|sb)${END_TOK}`, 'i'), 'su bardağı'],
  [new RegExp(`^(çay\\s*bardağı|çay\\s*bardak)${END_TOK}`, 'i'), 'çay bardağı'],
  [new RegExp(`^(yemek\\s*kaşığı|yemek\\s*kaşık|çorba\\s*kaşığı|yk|y\\.k\\.?)${END_TOK}`, 'i'), 'yemek kaşığı'],
  [new RegExp(`^(tatlı\\s*kaşığı|tatlı\\s*kaşık|tk)${END_TOK}`, 'i'), 'tatlı kaşığı'],
  [new RegExp(`^(çay\\s*kaşığı|çay\\s*kaşık|çk)${END_TOK}`, 'i'), 'çay kaşığı'],
  [new RegExp(`^(kilogram|kilo|kg)${END_TOK}`, 'i'), 'gram'],
  [new RegExp(`^(gram|gr|g)${END_TOK}`, 'i'), 'gram'],
  [new RegExp(`^(litre|lt|l)${END_TOK}`, 'i'), 'ml'],
  [new RegExp(`^(mililitre|ml)${END_TOK}`, 'i'), 'ml'],
  [new RegExp(`^(adet|tane|baş)${END_TOK}`, 'i'), 'adet'],
  [new RegExp(`^(diş)${END_TOK}`, 'i'), 'diş'],
  [new RegExp(`^(demet|bağ)${END_TOK}`, 'i'), 'demet'],
  [new RegExp(`^(paket|poşet)${END_TOK}`, 'i'), 'paket'],
  [new RegExp(`^(dilim)${END_TOK}`, 'i'), 'dilim'],
  [new RegExp(`^(tutam|çimdik)${END_TOK}`, 'i'), 'tutam'],
];

const WORD_NUMBERS: Record<string, number> = {
  yarım: 0.5,
  çeyrek: 0.25,
  bir: 1,
  iki: 2,
  üç: 3,
  dört: 4,
  beş: 5,
  altı: 6,
  yedi: 7,
  sekiz: 8,
  dokuz: 9,
  on: 10,
};

/**
 * "2 su bardağı pirinç", "200 gr kıyma", "yarım demet maydanoz",
 * "1,5 yemek kaşığı salça" gibi serbest metinleri ölçülü malzemeye çevirir.
 */
export function parseIngredientLine(rawLine: string): RecipeIngredient | null {
  let line = rawLine.replace(/^[-•*\d]+[.)]\s+/, '').trim();
  if (!line) return null;

  const isFreeMeasure = /(?:göz\s*kararı|yeteri\s*kadar|aldığı\s*kadar)/i.test(line);
  if (isFreeMeasure) {
    line = line.replace(/(?:göz\s*kararı|yeteri\s*kadar|aldığı\s*kadar)/gi, ' ').trim();
  }

  let amount = 1;
  let unit: Unit = 'adet';
  let hasExplicitUnit = false;
  let hasExplicitNumber = false;

  const numMatch = line.match(/^(\d+(?:[.,]\d+)?)(?:\s*\/\s*(\d+))?\s*/);
  if (numMatch) {
    const whole = parseFloat(numMatch[1].replace(',', '.'));
    amount = numMatch[2] ? whole / parseFloat(numMatch[2]) : whole;
    hasExplicitNumber = true;
    line = line.slice(numMatch[0].length);
  } else {
    const firstWord = line.split(/\s+/)[0]?.toLocaleLowerCase('tr-TR');
    if (firstWord && WORD_NUMBERS[firstWord] !== undefined) {
      amount = WORD_NUMBERS[firstWord];
      hasExplicitNumber = true;
      line = line.slice(firstWord.length).trim();
    }
  }

  // "1 buçuk su bardağı" gibi ifadeleri destekle
  if (hasExplicitNumber && /^buçuk(?=\s|$)/i.test(line)) {
    amount += 0.5;
    line = line.replace(/^buçuk\s*/i, '').trim();
  }

  for (const [re, u] of UNIT_PATTERNS) {
    const m = line.match(re);
    if (m) {
      const token = m[1].toLocaleLowerCase('tr-TR');
      unit = u;
      hasExplicitUnit = true;
      if (/^(kilogram|kilo|kg)$/.test(token)) amount *= 1000;
      if (/^(litre|lt|l)$/.test(token)) amount *= 1000;
      line = line.slice(m[0].length).trim();
      break;
    }
  }

  const name = canonicalizeIngredientName(line.replace(/^[,:\s-]+/, '').trim());
  if (!name) return null;

  if (isFreeMeasure || (!hasExplicitUnit && !hasExplicitNumber)) {
    // Ölçü yazılmamışsa malzemeyi "göz kararı" olarak işaretle
    return { name, amount: 1, unit: 'adet', note: 'Göz kararı' };
  }

  return { name, amount: Math.max(0.1, amount), unit };
}

export function parseIngredientText(text: string): RecipeIngredient[] {
  const seen = new Set<string>();
  const result: RecipeIngredient[] = [];
  // Ondalık virgülleri (örn. 1,5) bölmeden satır sonu, noktalı virgül veya ayırıcı virgüle göre ayır
  const normalized = text.replace(/(\d),(\d)/g, '$1.$2');
  for (const piece of normalized.split(/[\n,;]+/)) {
    const parsed = parseIngredientLine(piece);
    if (parsed && !seen.has(parsed.name)) {
      seen.add(parsed.name);
      result.push(parsed);
    }
  }
  return result;
}
