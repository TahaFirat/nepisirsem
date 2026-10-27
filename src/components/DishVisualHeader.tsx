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

/**
 * Yemek adına özel gerçek ve orijinal yemek fotoğrafı URL'si üretir (Play Store & App Store ortak görsel motoru)
 */
export function getOriginalDishPhotoUrl(
  title: string,
  category?: Exclude<RecipeCategory, 'tumu'>
): string {
  const baseName = title
    .replace(/\(([^)]+)\)/g, ' $1 ')
    .replace(/\s+/g, ' ')
    .trim();

  const suffix =
    category === 'tatli'
      ? 'tatlısı tabak'
      : category === 'corba'
      ? 'çorbası kase'
      : 'yemeği tabak';

  const query = `${baseName} ${suffix}`;
  return `https://tse2.mm.bing.net/th?q=${encodeURIComponent(query)}&w=640&h=420&c=7&rs=1&p=0`;
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
    const [imgError, setImgError] = useState(false);
    const theme = resolveDishVisualTheme(title, category);
    const displayEmoji = resolveDishSpecificEmoji(title, category, emoji || theme.iconEmoji);
    const photoUrl = getOriginalDishPhotoUrl(title, category);

    useEffect(() => {
      setImgError(false);
    }, [title, category]);

    return (
      <div
        className={`dish-visual-header ${className}`}
        style={{
          height: `${height}px`,
          background: theme.gradient,
        }}
      >
        {!imgError ? (
          <>
            <img
              src={photoUrl}
              alt={title}
              className="dish-visual-img"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
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
