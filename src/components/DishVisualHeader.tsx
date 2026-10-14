import React, { useState } from 'react';
import type { RecipeCategory } from '../types/recipe';

interface DishVisualHeaderProps {
  title: string;
  category: Exclude<RecipeCategory, 'tumu'>;
  emoji?: string;
  height?: number;
  className?: string;
  showVideoQuickBtn?: boolean;
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
 * Yemek adına özel gerçek ve orijinal yemek fotoğrafı URL'si üretir
 */
export function getOriginalDishPhotoUrl(title: string, category?: string): string {
  // Parantez içindeki uzun açıklamaları sadeleştirip yemeğin asıl adını çıkar
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

export function resolveDishVisualTheme(
  title: string,
  category: Exclude<RecipeCategory, 'tumu'>
): VisualTheme {
  const t = title.toLowerCase();

  if (category === 'corba' || t.includes('çorba')) {
    return {
      gradient: 'linear-gradient(135deg, #b45309 0%, #ea580c 100%)',
      accentColor: '#ea580c',
      iconEmoji: '🥣',
      patternLabel: 'Çorba',
      cookwareHint: 'Çorba Tenceresi',
      heatHint: 'Orta-Kısık Ateş',
    };
  }

  if (category === 'et_tavuk') {
    return {
      gradient: 'linear-gradient(135deg, #881337 0%, #e11d48 100%)',
      accentColor: '#be123c',
      iconEmoji: '🍖',
      patternLabel: 'Et & Tavuk',
      cookwareHint: 'Tencere / Fırın',
      heatHint: 'Orta Ateş',
    };
  }

  if (category === 'hamur_borek') {
    return {
      gradient: 'linear-gradient(135deg, #92400e 0%, #d97706 100%)',
      accentColor: '#b45309',
      iconEmoji: '🥐',
      patternLabel: 'Hamur İşi & Börek',
      cookwareHint: 'Fırın Tepsisi / Tava',
      heatHint: '190°C Fırın',
    };
  }

  if (category === 'tatli') {
    return {
      gradient: 'linear-gradient(135deg, #831843 0%, #db2777 100%)',
      accentColor: '#db2777',
      iconEmoji: '🍮',
      patternLabel: 'Tatlı',
      cookwareHint: 'Tencere / Fırın Kabı',
      heatHint: 'Kıvamında Pişirme',
    };
  }

  if (category === 'kahvalti') {
    return {
      gradient: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)',
      accentColor: '#d97706',
      iconEmoji: '🍳',
      patternLabel: 'Kahvaltılık',
      cookwareHint: 'Sahan / Tava',
      heatHint: 'Orta Ateş',
    };
  }

  if (category === 'salata_meze') {
    return {
      gradient: 'linear-gradient(135deg, #166534 0%, #16a34a 100%)',
      accentColor: '#16a34a',
      iconEmoji: '🥗',
      patternLabel: 'Salata & Meze',
      cookwareHint: 'Servis Kasesi',
      heatHint: 'Soğuk Servis',
    };
  }

  if (category === 'bakliyat_pilav') {
    return {
      gradient: 'linear-gradient(135deg, #9a3412 0%, #d97706 100%)',
      accentColor: '#c2410c',
      iconEmoji: '🍚',
      patternLabel: 'Bakliyat & Pilav',
      cookwareHint: 'Pilav / Bakliyat Tenceresi',
      heatHint: 'Kısık Ateşte Demleme',
    };
  }

  return {
    gradient: 'linear-gradient(135deg, #14532d 0%, #16a34a 100%)',
    accentColor: '#16a34a',
    iconEmoji: '🍲',
    patternLabel: 'Zeytinyağlı & Sebze',
    cookwareHint: 'Yayvan Tencere',
    heatHint: 'Kısık Ateş',
  };
}

export function getYoutubeRecipeSearchUrl(title: string): string {
  const clean = title.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${clean} tarifi nasıl yapılır`
  )}`;
}

export function getNefisYemekSearchUrl(title: string): string {
  const clean = title.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  return `https://www.google.com/search?q=${encodeURIComponent(
    `site:nefisyemektarifleri.com ${clean} tarifi`
  )}`;
}

export function getGoogleRecipeImagesUrl(title: string): string {
  const clean = title.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
    `${clean} yemeği`
  )}`;
}

export const DishVisualHeader: React.FC<DishVisualHeaderProps> = ({
  title,
  category,
  emoji,
  height = 165,
  className = '',
  children,
}) => {
  const [imgError, setImgError] = useState(false);
  const theme = resolveDishVisualTheme(title, category);
  const photoUrl = getOriginalDishPhotoUrl(title, category);

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
            onError={() => setImgError(true)}
          />
          <div className="dish-visual-gradient-overlay" />
        </>
      ) : (
        <div className="dish-illustrated-pattern" aria-hidden="true">
          <span className="emblem-emoji">{emoji || theme.iconEmoji}</span>
        </div>
      )}
      {children}
    </div>
  );
};
