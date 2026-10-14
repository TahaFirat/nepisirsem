import type { RecipeIngredient } from '../types/recipe';

export interface ScaledIngredientResult extends RecipeIngredient {
  scaledAmount: number;
  formattedMeasure: string; // Ev hanımı ölçüsü: Örn: "1,5 su bardağı" veya "2 yemek kaşığı"
  metricEquivalent?: string; // Örn: "(~300 gr)" veya "(~300 ml)"
}

/**
 * Sayıyı ev hanımlarının rahat okuyabileceği Türkçe kesir/buçuk formatına çevirir.
 */
export function formatTurkishFraction(value: number, unit: string): string {
  if (value <= 0) return '1 tutam';

  // Gram ve ml için tam sayıya veya 5'in katlarına yuvarla
  if (unit === 'gram' || unit === 'ml') {
    if (value < 15) {
      return `${Math.max(1, Math.round(value))} ${unit}`;
    }
    if (value < 100) {
      return `${Math.round(value / 5) * 5} ${unit}`;
    }
    const rounded = Math.round(value / 10) * 10;
    if (unit === 'gram' && rounded >= 1000) {
      const kg = rounded / 1000;
      return `${kg.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} kg (${rounded} gr)`;
    }
    if (unit === 'ml' && rounded >= 1000) {
      const lt = rounded / 1000;
      return `${lt.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} litre (${rounded} ml)`;
    }
    return `${rounded} ${unit === 'gram' ? 'gr' : 'ml'}`;
  }

  // Adet, diş, yaprak, paket, demet, su bardağı, çay bardağı, kaşık vb. için akıllı kesir hesabı
  const whole = Math.floor(value);
  const fraction = value - whole;

  // Özel küçük miktar dönüşümleri (Örn: 0.25 yemek kaşığı -> 1 tatlı kaşığı veya çay kaşığı)
  if (unit === 'yemek kaşığı' && value < 0.45) {
    const tsp = Math.max(0.5, Math.round(value * 3 * 2) / 2); // 1 yemek kaşığı ≈ 3 çay/tatlı kaşığı
    return `${tsp === 0.5 ? 'Yarım' : tsp.toLocaleString('tr-TR')} tatlı kaşığı`;
  }

  if (unit === 'su bardağı' && value < 0.2) {
    const tbsp = Math.max(1, Math.round(value * 16)); // 1 su bardağı ≈ 16 yemek kaşığı
    return `${tbsp} yemek kaşığı`;
  }

  // Kesir aralıkları: 0, 1/4 (0.25), 1/3 (0.33), 1/2 (0.5), 2/3 (0.66), 3/4 (0.75), 1
  if (fraction < 0.12) {
    const finalWhole = Math.max(1, whole);
    return `${finalWhole} ${unit}`;
  }

  if (fraction >= 0.88) {
    return `${whole + 1} ${unit}`;
  }

  // Tam sayı 0 ise (Sadece kesir varsa: Yarım, Çeyrek vb.)
  if (whole === 0) {
    if (fraction < 0.30) {
      if (unit === 'adet' || unit === 'su bardağı' || unit === 'çay bardağı' || unit === 'demet' || unit === 'paket') {
        return `Çeyrek (1/4) ${unit}`;
      }
      return `Çeyrek ${unit}`;
    }
    if (fraction < 0.42) {
      return `1/3 ${unit}`;
    }
    if (fraction < 0.62) {
      return `Yarım ${unit}`;
    }
    if (fraction < 0.70) {
      return `2/3 ${unit}`;
    }
    return `3/4 (Üç çeyrek) ${unit}`;
  }

  // Tam sayı >= 1 ise (Örn: 1,5 su bardağı, 2,5 adet)
  if (fraction >= 0.38 && fraction <= 0.65) {
    return `${whole},5 (${whole} buçuk) ${unit}`;
  }

  if (fraction < 0.38) {
    return `${whole} + çeyrek ${unit}`;
  }

  return `${(whole + 0.75).toLocaleString('tr-TR')} ${unit}`;
}

/**
 * Bardak veya kaşık ölçülerini parantez içinde yaklaşık gram/ml karşılığı ile zenginleştirir.
 */
export function getMetricHint(scaledAmount: number, unit: string, ingredientName: string): string | undefined {
  const lower = ingredientName.toLowerCase();

  if (unit === 'su bardağı') {
    let gramsPerCup = 200; // su/süt/sıvı standart 200ml
    let isLiquid = false;

    if (lower.includes('su') || lower.includes('süt') || lower.includes('yağ') || lower.includes('et suyu') || lower.includes('tavuk suyu') || lower.includes('ayran')) {
      isLiquid = true;
      gramsPerCup = 200;
    } else if (lower.includes('un') || lower.includes('nişasta') || lower.includes('pudra şekeri')) {
      gramsPerCup = 120;
    } else if (lower.includes('şeker')) {
      gramsPerCup = 180;
    } else if (lower.includes('pirinç') || lower.includes('mercimek') || lower.includes('bulgur') || lower.includes('irmik')) {
      gramsPerCup = 180;
    } else if (lower.includes('yoğurt')) {
      gramsPerCup = 220;
    } else {
      return undefined;
    }

    const total = Math.round((scaledAmount * gramsPerCup) / 5) * 5;
    if (total <= 0) return undefined;
    return `~${total} ${isLiquid ? 'ml' : 'gr'}`;
  }

  if (unit === 'çay bardağı') {
    const isLiquid = lower.includes('su') || lower.includes('süt') || lower.includes('yağ') || lower.includes('limon');
    const total = Math.round((scaledAmount * (isLiquid ? 100 : 85)) / 5) * 5;
    if (total <= 0) return undefined;
    return `~${total} ${isLiquid ? 'ml' : 'gr'}`;
  }

  if (unit === 'gram' && scaledAmount >= 100) {
    // Gram verilen malzemeyi su bardağı veya adet cinsinden ipucu ver
    if (lower.includes('kıyma') || lower.includes('kuşbaşı') || lower.includes('tavuk') || lower.includes('et')) {
      return undefined; // Et zaten gram ile ölçülür
    }
  }

  return undefined;
}

/**
 * Bir tarifin malzemelerini hedef kişi sayısına (targetServings) göre
 * %100 doğru ve mutfak kurallarına uygun şekilde ölçeklendirir.
 */
export function scaleRecipeIngredients(
  ingredients: RecipeIngredient[],
  baseServings: number,
  targetServings: number
): ScaledIngredientResult[] {
  const ratio = targetServings / baseServings;

  return ingredients.map((ing) => {
    let rawScaled = ing.amount * ratio;

    // Baharat ve tuzda çok yüksek kişi sayılarında doğrusal artış yerine %90 sönümleme
    // (12 kişilik yemekte 3 kat tuz yemeği aşırı tuzlu yapabilir, ancak ev hanımı ölçüsünde dengeli artış şarttır)
    const isSpiceOrSalt =
      ing.unit === 'çay kaşığı' ||
      ing.unit === 'tutam' ||
      ['tuz', 'karabiber', 'pul biber', 'kimyon', 'kekik', 'nane', 'isot', 'sumak', 'tarçın', 'yenibahar'].includes(
        ing.name.toLowerCase()
      );

    if (isSpiceOrSalt && ratio > 2.2) {
      // Çok kalabalık sofralarda baharat acılığını/tuzunu dengeli artır
      rawScaled = ing.amount * (ratio * 0.9);
    }

    // Yumurta gibi adetli malzemelerde 1-2 kişilikte en az 1 adet (veya yarım) koruma
    if (ing.name.toLowerCase() === 'yumurta' && ing.unit === 'adet') {
      if (rawScaled < 0.75) {
        rawScaled = 1; // 1 yumurtadan az kırmak zordur, 1 küçük yumurta önerilir
      } else {
        rawScaled = Math.round(rawScaled);
      }
    }

    const formattedMeasure = formatTurkishFraction(rawScaled, ing.unit);
    const metricEquivalent = getMetricHint(rawScaled, ing.unit, ing.name);

    return {
      ...ing,
      scaledAmount: rawScaled,
      formattedMeasure,
      metricEquivalent,
    };
  });
}

/**
 * Kişi sayısına göre tencere/fırın tepsisi ve pişirme tavsiyesi üretir.
 */
export function getPortionCookingAdvice(baseServings: number, targetServings: number, category: string): string {
  if (targetServings === baseServings) {
    return `Standart ${baseServings} kişilik aile ölçüsüdür. Tarif adımlarındaki süreleri birebir uygulayabilirsiniz.`;
  }

  if (targetServings <= 2) {
    if (category === 'corba' || category === 'bakliyat_pilav' || category === 'sebze_zeytinyagli') {
      return `${targetServings} kişilik hazırlık için küçük boy (16-18 cm) tencere tercih edin. Su buharlaşması daha hızlı olacağından pişirme süresini 3-5 dakika daha erken kontrol edin.`;
    }
    if (category === 'hamur_borek' || category === 'tatli') {
      return `${targetServings} kişilik ölçü için küçük boy kare borcam veya 18-20 cm'lik kalıp kullanın. Fırın pişirme süresini 5 dakika erkene çekin.`;
    }
    return `${targetServings} kişilik porsiyon için orta/küçük boy tava kullanmanız lezzetlerin suyunu kaybetmeden pişmesini sağlar.`;
  }

  if (targetServings >= 7) {
    if (category === 'corba' || category === 'bakliyat_pilav') {
      return `Kalabalık misafir sofrası (${targetServings} kişilik)! Geniş ve derin bir tencere (en az 26-28 cm) kullanın. Kaynama süresi 5-8 dakika uzayacaktır.`;
    }
    if (category === 'hamur_borek' || category === 'tatli') {
      return `${targetServings} kişilik misafir ölçüsü için büyük boy fırın tepsisi (veya 2 orta boy borcam) kullanmanız önerilir.`;
    }
    return `${targetServings} kişilik kalabalık sofra için malzemeleri tencereye üst üste sıkıştırmadan, geniş tabanlı bir tencerede pişirin.`;
  }

  return `${targetServings} kişilik ölçüye göre tüm malzemeler (bardak, kaşık ve gramaj olarak) otomatik ayarlandı.`;
}
