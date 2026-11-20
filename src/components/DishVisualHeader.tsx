import React, { useState, useEffect } from 'react';
import type { RecipeCategory } from '../types/recipe';

interface DishVisualHeaderProps {
  title: string;
  category: Exclude<RecipeCategory, 'tumu'>;
  emoji?: string;
  image?: string;
  height?: number;
  className?: string;
  children?: React.ReactNode;
}

export interface VisualTheme {
  gradient: string;
  accentColor: string;
  iconEmoji: string;
  patternLabel: string;
  cookwareHint: string;
  heatHint: string;
}

const FILLER_PHRASES = [
  'lokum gibi',
  'tam kıvamında',
  'tam ölçülü',
  'anne eli değmiş',
  'anne usulü',
  'ev usulü',
  'ev yapımı',
  'sünger gibi şerbet çeken',
  'sünger gibi',
  'şerbet çeken',
  'ekmek banmalık',
  'yağ çekmeyen',
  'puf puf kabaran',
  'pamuk gibi',
  'dağılmayan',
  'altın günü usulü',
  'altın günü',
  'lokanta usulü',
  'restoran usulü',
  'pastane usulü',
  'kalem gibi',
  'tane tane',
  'kesilmeyen',
  'ipek gibi',
  'nar gibi',
  'köz tadında',
  'bol soslu',
  'yumuşacık',
  'doyurucu',
  'kütür kütür',
  'tel tel ayrılan',
  'tel tel çıtır',
  'geleneksel bolluk ve bereket',
  'geleneksel',
  'osmanlı saray mutfağı',
  'saray mutfağı',
  'orijinal',
  'nefis',
  'pratik',
  'kolay',
  'hafif',
  'klasik',
  'modern',
  '10 dakikada',
  '15 dakikada',
  '5 dakikada',
  '3 malzemeli',
  '2 malzemeli',
  'mayasız',
];

const EXACT_DISH_PHOTO_QUERIES: Array<[RegExp, string]> = [
  [/yağlama/i, 'kayseri yağlaması şebit kıymalı yoğurtlu'],
  [/develi cıvıklı/i, 'develi cıvıklısı kayseri pide'],
  [/kayseri pehli/i, 'kayseri pehli kuzu etli'],
  [/imam bayıldı/i, 'imam bayıldı zeytinyağlı patlıcan yemeği'],
  [/karnıyarık/i, 'karnıyarık kıymalı patlıcan yemeği'],
  [/hünkar beğendi/i, 'hünkar beğendi patlıcan beğendili et'],
  [/kadınbudu/i, 'kadınbudu köfte kızarmış'],
  [/hasanpaşa/i, 'hasanpaşa köfte patates püreli'],
  [/hanım göbeği/i, 'hanım göbeği şerbetli tatlı'],
  [/dilber dudağı/i, 'dilber dudağı baklava tatlısı'],
  [/vezir parmağı/i, 'vezir parmağı şerbetli tatlı'],
  [/gelin pastası/i, 'gelin pastası sütlü tatlı'],
  [/gelin çantası/i, 'gelin çantası pankek tatlısı'],
  [/ağlayan (kek|pasta)/i, 'ağlayan pasta çikolatalı kek'],
  [/kıbrıs tatlısı/i, 'kıbrıs tatlısı cevizli muhallebili'],
  [/magnolia/i, 'çilekli magnolia tatlısı kupta'],
  [/trileçe/i, 'karamelli trileçe tatlısı'],
  [/kazandibi/i, 'kazandibi tatlısı yanık sütlü'],
  [/tavuk göğsü/i, 'tavuk göğsü tatlısı tarçınlı'],
  [/keşkül/i, 'keşkül fıstıklı tatlı'],
  [/güllaç/i, 'güllaç tatlısı narlı cevizli'],
  [/aşure/i, 'aşure kasede narlı cevizli'],
  [/şöbiyet/i, 'antep fıstıklı şöbiyet baklava'],
  [/soğuk baklava/i, 'sütlü soğuk baklava çikolatalı'],
  [/kalburabastı/i, 'kalburabastı şerbetli cevizli'],
  [/şekerpare/i, 'fındıklı şekerpare tatlısı'],
  [/kemalpaşa/i, 'kemalpaşa tatlısı kaymaklı'],
  [/laz böreği/i, 'laz böreği muhallebili tatlı'],
  [/künefe/i, 'hatay künefe antep fıstıklı'],
  [/höşmerim/i, 'höşmerim peynir tatlısı'],
  [/nevzine/i, 'nevzine tatlısı tahinli cevizli'],
  [/incir uyutması/i, 'incir uyutması sütlü tatlısı'],
  [/(paşa lokumu|saray sarması|sultan lokumu)/i, 'saray sarması hindistan cevizli'],
  [/krem karamel/i, 'creme caramel dessert'],
  [/profiterol/i, 'profiterol çikolata soslu'],
  [/supangle/i, 'supangle çikolatalı tatlı'],
  [/mozaik pasta/i, 'bisküvili mozaik pasta dilim'],
  [/panna cotta/i, 'strawberry panna cotta dessert'],
  [/tiramisu/i, 'classic italian tiramisu'],
  [/san sebastian/i, 'san sebastian burnt cheesecake'],
  [/analı kızlı/i, 'analı kızlı çorbası içli köfteli'],
  [/dul avrat/i, 'dul avrat çorbası mercimekli'],
  [/yuvalama/i, 'gaziantep yuvalama çorbası'],
  [/beyran/i, 'gaziantep beyran çorbası'],
  [/lebeniye/i, 'lebeniye çorbası yoğurtlu'],
  [/arabaşı/i, 'arabaşı çorbası hamuruyla'],
  [/kurşun aşı/i, 'kurşun aşı çorbası kayseri'],
  [/pöç kebabı/i, 'pöç kebabı kayseri güveç'],
  [/şiveydiz/i, 'şiveydiz gaziantep yemeği'],
  [/şıhıl mahşi/i, 'şıhıl mahşi hatay kabak dolması'],
  [/eli böğründe/i, 'eli böğründe kahramanmaraş kebap'],
  [/çökertme/i, 'çökertme kebabı patatesli yoğurtlu'],
  [/ali nazik/i, 'ali nazik kebabı köz patlıcanlı'],
  [/abant kebabı/i, 'abant kebabı patlıcanlı'],
  [/belen tava/i, 'belen tava hatay et yemeği'],
  [/islim|kürdan kebabı/i, 'islim kürdan kebabı patlıcanlı'],
  [/tas kebabı/i, 'tas kebabı sulu et yemeği'],
  [/orman kebabı/i, 'orman kebabı bezelyeli et'],
  [/fellah köfte/i, 'fellah köftesi domates soslu'],
  [/harput köfte/i, 'harput köftesi sulu'],
  [/oruk|ikbebet|içli köfte/i, 'kızarmış içli köfte tabak'],
  [/mercimek köfte/i, 'mercimek köftesi marullu'],
  [/kısır/i, 'kısır salatası nar ekşili'],
  [/çiğ köfte/i, 'etsiz çiğ köfte marul limon'],
  [/batırık/i, 'batırık mersin tahinli'],
  [/öllüğün körüsü/i, 'öllüğün körüsü kıymalı erişte'],
  [/sırın|silor|siron/i, 'siron yoğurtlu yufka yemeği'],
  [/hengel|hıngel/i, 'hıngel mantı yoğurtlu'],
  [/murtuğa/i, 'murtuğa van kahvaltılık'],
  [/kavut/i, 'kavut van helvası'],
  [/kuymak|mıhlama/i, 'karadeniz kuymak mıhlama'],
  [/çılbır/i, 'çılbır yoğurtlu poşe yumurta'],
  [/menemen/i, 'menemen sahanda domatesli yumurta'],
  [/boyoz/i, 'izmir boyoz börek'],
  [/kumru/i, 'izmir kumru sandviç'],
  [/piyaz/i, 'antalya tahinli fasulye piyazı'],
  [/haydari/i, 'haydari yoğurtlu meze'],
  [/atom meze/i, 'atom meze yoğurtlu acı biber'],
  [/fava/i, 'zeytinyağlı fava mezesi'],
  [/muhammara/i, 'muhammara cevizli biber mezesi'],
  [/babagannuş/i, 'babagannuş köz patlıcan mezesi'],
  [/mütebbel/i, 'mütebbel tahinli patlıcan'],
  [/hibeş/i, 'hibeş antalya tahinli meze'],
  [/şakşuka/i, 'şakşuka patlıcan biber mezesi'],
  [/topik/i, 'topik mezesi'],
  [/lakerda/i, 'lakerda dilimleri meze'],
  [/tadka dal/i, 'tadka dal indian lentil curry'],
  [/butter chicken/i, 'indian butter chicken curry'],
  [/yachaejeon/i, 'korean vegetable pancake yachaejeon'],
  [/churros/i, 'spanish churros chocolate sauce'],
  [/ratatouille/i, 'french ratatouille baked vegetables'],
  [/dauphinois/i, 'gratin dauphinois potato'],
  [/beef stroganoff/i, 'beef stroganoff creamy mushroom'],
  [/minestrone/i, 'italian minestrone soup'],
  [/gnocchi/i, 'potato gnocchi tomato sauce'],
  [/mac\s*&\s*cheese/i, 'baked mac and cheese'],
  [/moussaka/i, 'greek moussaka baked eggplant'],
  [/fajita/i, 'sizzling chicken fajitas'],
  [/taco|quesadilla/i, 'mexican beef tacos quesadilla'],
  [/enchilada/i, 'baked chicken enchiladas'],
  [/nachos/i, 'loaded beef nachos cheese'],
  [/paella/i, 'spanish seafood chicken paella'],
  [/tortilla/i, 'spanish potato tortilla omelette'],
  [/risotto/i, 'creamy mushroom risotto'],
  [/lazanya/i, 'baked beef lasagna'],
  [/bolonez|bolognese/i, 'spaghetti bolognese plate'],
  [/alfredo/i, 'chicken fettuccine alfredo'],
  [/arrabbiata/i, 'penne arrabbiata pasta'],
  [/pesto/i, 'basil pesto pasta cherry tomatoes'],
  [/falafel/i, 'crispy falafel tahini'],
  [/teriyaki.*somon/i, 'teriyaki glazed salmon sesame'],
  [/thai tavuk/i, 'thai chicken curry bowl'],
  [/iskender/i, 'bursa iskender kebap tereyağlı'],
  [/lahmacun/i, 'çıtır lahmacun maydanoz limon'],
  [/sigara böreği/i, 'çıtır peynirli sigara böreği'],
  [/su böreği/i, 'tepside dilimlenmiş su böreği'],
  [/mantı/i, 'kayseri mantısı yoğurtlu soslu'],
];

const FILLER_REGEX = new RegExp(
  `(?:^|\\s)(?:${FILLER_PHRASES.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?=\\s|$)`,
  'gi'
);

function stripDishMarketingNoise(title: string): string {
  let clean = title
    .replace(/\(([^)]+)\)/g, ' ')
    .replace(/[&/•–—-]+/g, ' ');

  // Arka arkaya gelebilecek sıfat öbeklerini temizle
  clean = clean.replace(FILLER_REGEX, ' ').replace(FILLER_REGEX, ' ');

  return clean.replace(/\s+/g, ' ').trim() || title;
}

/**
 * Yemek adına özel gerçek ve orijinal yemek fotoğrafı URL'si üretir (Play Store & App Store ortak görsel motoru)
 */
export function getOriginalDishPhotoUrl(
  title: string,
  category?: Exclude<RecipeCategory, 'tumu'>
): string {
  const baseName = stripDishMarketingNoise(title);
  const lower = baseName.toLocaleLowerCase('tr-TR');
  const wordCount = lower.split(/\s+/).filter(Boolean).length;

  // Hazır kalıp sorgular sadece yemeğin kendisi için (ör. "Mantı"), varyasyonlar için değil
  // (ör. "Mantı Çorbası" kendi adıyla aranır; başka yemeğin fotoğrafı gelmez)
  if (wordCount <= 3) {
    for (const [pattern, exactQuery] of EXACT_DISH_PHOTO_QUERIES) {
      if (category && category !== 'tatli' && exactQuery.includes('tatlı')) continue;
      if (pattern.test(lower) && exactQuery.split(' ').length >= wordCount) {
        const keyWords = exactQuery.toLocaleLowerCase('tr-TR').split(/\s+/);
        const coreWords = lower.split(/\s+/).filter((w) => w.length >= 2);
        if (
          coreWords.every((w) => {
            const stem = w.length <= 3 ? w : w.slice(0, w.length - 2);
            return keyWords.some((kw) => kw.startsWith(stem));
          })
        ) {
          return `https://tse2.mm.bing.net/th?q=${encodeURIComponent(exactQuery)}&w=640&h=420&c=7&rs=1&p=0`;
        }
      }
    }
  }

  let suffix = 'tarifi';
  if (category === 'tatli' && !/(tatlı|baklava|pasta|kek|helva|sütlaç|muhallebi|künefe|kurabiye|kadayıf|komposto|şerbet|lokum|revani|reçel)/.test(lower)) {
    suffix = 'tatlısı tarifi';
  } else if (category === 'corba' && !/çorba/.test(lower)) {
    suffix = 'çorbası tarifi';
  }

  // Yemeğin TAM adıyla arama (kısaltma yok) → her tarif kendi fotoğrafını alır
  const query = `${baseName} ${suffix}`;
  return `https://tse2.mm.bing.net/th?q=${encodeURIComponent(query)}&w=640&h=420&c=7&rs=1&p=0`;
}

export function getFallbackDishPhotoUrl(
  title: string,
  category?: Exclude<RecipeCategory, 'tumu'>
): string {
  const cleanTitle = stripDishMarketingNoise(title);
  const catWord = category === 'tatli' ? 'tatlısı' : category === 'corba' ? 'çorbası' : 'yemeği';
  return `https://tse3.mm.bing.net/th?q=${encodeURIComponent(`"${cleanTitle}" ${catWord}`)}&w=640&h=420&c=7&rs=1&p=0`;
}

/**
 * Yemek başlığına göre en uygun mutfak emojisini seçer (çevrimdışı yedek)
 */
export function resolveDishSpecificEmoji(
  title: string,
  category: Exclude<RecipeCategory, 'tumu'>,
  fallbackEmoji?: string
): string {
  const t = title.toLowerCase();
  if (t.includes('balık') || t.includes('hamsi') || t.includes('somon') || t.includes('levrek') || t.includes('çupra') || t.includes('palamut')) return '🐟';
  if (t.includes('karides') || t.includes('kalamar')) return '🍤';
  if (t.includes('kebap') || t.includes('şiş') || t.includes('adana') || t.includes('beyti') || t.includes('cağ')) return '🍢';
  if (t.includes('köfte') || t.includes('içli köfte') || t.includes('fellah')) return '🧆';
  if (t.includes('tavuk') || t.includes('piliç') || t.includes('kanat') || t.includes('baget')) return '🍗';
  if (t.includes('mantı') || t.includes('ravioli') || t.includes('hingel')) return '🥟';
  if (t.includes('makarna') || t.includes('spagetti') || t.includes('fettuccine') || t.includes('penne') || t.includes('erişte') || t.includes('noodle')) return '🍝';
  if (t.includes('pizza') || t.includes('lahmacun') || t.includes('pide')) return '🍕';
  if (t.includes('burger') || t.includes('hamburger')) return '🍔';
  if (t.includes('taco') || t.includes('burrito') || t.includes('fajita') || t.includes('quesadilla') || t.includes('dürüm') || t.includes('tantuni')) return '🌯';
  if (t.includes('sushi') || t.includes('suşi')) return '🍣';
  if (t.includes('börek') || t.includes('poğaça') || t.includes('açma') || t.includes('kruvasan') || t.includes('simit') || t.includes('katmer') || t.includes('gözleme')) return '🥐';
  if (t.includes('ekmek') || t.includes('bazlama') || t.includes('lavaş') || t.includes('focaccia')) return '🥖';
  if (t.includes('pilav') || t.includes('risotto') || t.includes('paella') || t.includes('bulgur')) return '🍚';
  if (t.includes('salata') || t.includes('piyaz') || t.includes('kısır') || t.includes('cacık') || t.includes('meze') || t.includes('humus') || t.includes('ezme')) return '🥗';
  if (t.includes('menemen') || t.includes('omlet') || t.includes('yumurta') || t.includes('çılbır') || t.includes('kuymak') || t.includes('mıhlama')) return '🍳';
  if (t.includes('pankek') || t.includes('krep') || t.includes('waffle')) return '🥞';
  if (t.includes('kek') || t.includes('pasta') || t.includes('tiramisu') || t.includes('cheesecake') || t.includes('brownie') || t.includes('trileçe')) return '🍰';
  if (t.includes('kurabiye') || t.includes('un kurabiyesi') || t.includes('kavala')) return '🍪';
  if (t.includes('dondurma') || t.includes('parfe') || t.includes('maraş')) return '🍨';
  if (t.includes('sütlaç') || t.includes('muhallebi') || t.includes('keşkül') || t.includes('kazandibi') || t.includes('güllaç') || t.includes('aşure') || t.includes('puding') || t.includes('supangle')) return '🍮';
  if (t.includes('baklava') || t.includes('künefe') || t.includes('kadayıf') || t.includes('revani') || t.includes('şekerpare') || t.includes('tulumba') || t.includes('lokma') || t.includes('helva')) return '🍯';
  if (t.includes('dolma') || t.includes('sarma') || t.includes('karnıyarık') || t.includes('imambayıldı') || t.includes('güveç') || t.includes('türlü') || t.includes('musakka')) return '🥘';
  if (t.includes('çorba') || category === 'corba') return '🥣';

  return fallbackEmoji || '';
}

export function resolveDishVisualTheme(
  title: string,
  category: Exclude<RecipeCategory, 'tumu'>
): VisualTheme {
  const t = title.toLowerCase();

  if (category === 'corba' || t.includes('çorba')) {
    return {
      gradient: 'linear-gradient(135deg, #9a3412 0%, #ea580c 55%, #f59e0b 100%)',
      accentColor: '#ea580c',
      iconEmoji: '🥣',
      patternLabel: 'Sıcak Başlangıç Çorbası',
      cookwareHint: 'Derin Çorba Tenceresi',
      heatHint: 'Orta-Kısık Ateş',
    };
  }

  if (category === 'et_tavuk') {
    return {
      gradient: 'linear-gradient(135deg, #881337 0%, #be123c 55%, #e11d48 100%)',
      accentColor: '#be123c',
      iconEmoji: '🍖',
      patternLabel: 'Et & Tavuk Ana Yemeği',
      cookwareHint: 'Döküm Tava / Tencere / Fırın',
      heatHint: 'Orta-Yüksek Ateş',
    };
  }

  if (category === 'hamur_borek') {
    return {
      gradient: 'linear-gradient(135deg, #78350f 0%, #b45309 55%, #d97706 100%)',
      accentColor: '#b45309',
      iconEmoji: '🥐',
      patternLabel: 'Fırın & Hamur İşi',
      cookwareHint: 'Fırın Tepsisi / Sac Tava',
      heatHint: '180°C - 190°C Fırın',
    };
  }

  if (category === 'tatli') {
    return {
      gradient: 'linear-gradient(135deg, #701a75 0%, #be185d 55%, #ec4899 100%)',
      accentColor: '#db2777',
      iconEmoji: '🍮',
      patternLabel: 'Geleneksel & Modern Tatlı',
      cookwareHint: 'Tencere / Fırın Kabı',
      heatHint: 'Kıvamında Pişirme',
    };
  }

  if (category === 'kahvalti') {
    return {
      gradient: 'linear-gradient(135deg, #92400e 0%, #d97706 55%, #f59e0b 100%)',
      accentColor: '#d97706',
      iconEmoji: '🍳',
      patternLabel: 'Kahvaltı & Sahur Lezzeti',
      cookwareHint: 'Bakır Sahan / Geniş Tava',
      heatHint: 'Orta Ateş',
    };
  }

  if (category === 'salata_meze') {
    return {
      gradient: 'linear-gradient(135deg, #14532d 0%, #15803d 55%, #22c55e 100%)',
      accentColor: '#16a34a',
      iconEmoji: '🥗',
      patternLabel: 'Taze Salata & Meze',
      cookwareHint: 'Geniş Servis Kasesi',
      heatHint: 'Soğuk / Oda Sıcaklığı',
    };
  }

  if (category === 'bakliyat_pilav') {
    return {
      gradient: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 55%, #ea580c 100%)',
      accentColor: '#c2410c',
      iconEmoji: '🍚',
      patternLabel: 'Pilav & Bakliyat Klasikleri',
      cookwareHint: 'Pilav / Bakliyat Tenceresi',
      heatHint: 'Kısık Ateşte Demleme',
    };
  }

  if (category === 'dunya_mutfagi') {
    return {
      gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #6366f1 100%)',
      accentColor: '#4f46e5',
      iconEmoji: '🌍',
      patternLabel: 'Dünya Mutfağı Seçkisi',
      cookwareHint: 'Şef Tavası / Wok / Fırın',
      heatHint: 'Tarife Özel Isı',
    };
  }

  return {
    gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 55%, #10b981 100%)',
    accentColor: '#059669',
    iconEmoji: '🍲',
    patternLabel: 'Zeytinyağlı & Sebze Yemeği',
    cookwareHint: 'Yayvan Tencere',
    heatHint: 'Kısık Ateş',
  };
}

export const DishVisualHeader: React.FC<DishVisualHeaderProps> = React.memo(
  ({ title, category, emoji, height = 172, className = '', children }) => {
    const [retryStage, setRetryStage] = useState<0 | 1 | 2>(0);
    const theme = resolveDishVisualTheme(title, category);
    const displayEmoji = resolveDishSpecificEmoji(title, category, emoji || theme.iconEmoji);
    const photoUrl =
      retryStage === 0
        ? getOriginalDishPhotoUrl(title, category)
        : getFallbackDishPhotoUrl(title, category);

    useEffect(() => {
      setRetryStage(0);
    }, [title, category]);

    return (
      <div
        className={`dish-visual-header ${className}`}
        style={{
          height: `${height}px`,
          background: theme.gradient,
        }}
      >
        {retryStage < 2 ? (
          <>
            <img
              src={photoUrl}
              alt={title}
              className="dish-visual-img"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() =>
                setRetryStage((prev) => (prev === 0 ? 1 : 2))
              }
            />
            <div className="dish-visual-gradient-overlay" />
          </>
        ) : (
          <div className="dish-illustrated-pattern" aria-hidden="true">
            <span className="dish-pattern-circle c1" />
            <span className="dish-pattern-circle c2" />

            <div className="dish-center-emblem">
              <div className="emblem-plate-ring">
                <span className="emblem-emoji">{displayEmoji}</span>
              </div>
              {height >= 140 && (
                <>
                  <span className="emblem-cat-tag">{theme.patternLabel}</span>
                  <span className="emblem-cookware-sub">
                    {theme.cookwareHint} • {theme.heatHint}
                  </span>
                </>
              )}
            </div>
            <div className="dish-visual-gradient-overlay" />
          </div>
        )}
        {children}
      </div>
    );
  }
);
