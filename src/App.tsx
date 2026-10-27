import React, { useState, useMemo, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  ChefHat,
  Search,
  ShoppingBasket,
  Sparkles,
  Heart,
  Users,
  Check,
  Trash2,
  Plus,
  Minus,
  Clock,
  Flame,
  CheckCircle2,
  AlertCircle,
  Dices,
  Share2,
  UtensilsCrossed,
  ChevronRight,
  Info,
  X,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import {
  INGREDIENTS_DATA,
  INGREDIENT_CATEGORIES,
  QUICK_PANTRY_PRESETS,
  canonicalizeIngredientName,
} from './data/ingredients';
import { RECIPE_CATEGORIES } from './data/recipes';
import { getFullRecipeArchive } from './data/legacyRecipesBridge';
import type {
  CuisineOrigin,
  IngredientCategoryId,
  MatchedRecipe,
  Recipe,
  RecipeCategory,
} from './types/recipe';
import { matchRecipesWithPantry, expandPantrySet } from './utils/recipeMatcher';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { DishVisualHeader } from './components/DishVisualHeader';
import { triggerNativeHaptic } from './utils/nativeBridge';
import './App.css';

interface ShoppingItem {
  id: string;
  name: string;
  measure: string;
  recipeTitle: string;
  checked: boolean;
}

type ActiveTab = 'kiler' | 'tarifler' | 'menu' | 'favoriler' | 'alisveris';

const PANTRY_STORAGE_KEY = 'nepisirsem_pantry_v5_strict';

const DEFAULT_PANTRY = ['su', 'tuz', 'sıvı yağ'];

// Birebir İl Filtreleri (Gaziantep seçilince SADECE Gaziantep çıkar)
const CITY_FILTERS = [
  { id: 'tumu', label: 'Tüm İller' },
  { id: 'Gaziantep', label: 'Gaziantep' },
  { id: 'Hatay', label: 'Hatay' },
  { id: 'Adana', label: 'Adana' },
  { id: 'Elazığ', label: 'Elazığ' },
  { id: 'Şanlıurfa', label: 'Şanlıurfa' },
  { id: 'Mardin', label: 'Mardin' },
  { id: 'Diyarbakır', label: 'Diyarbakır' },
  { id: 'Kahramanmaraş', label: 'Kahramanmaraş' },
  { id: 'Ankara', label: 'Ankara' },
  { id: 'Konya', label: 'Konya' },
  { id: 'Kayseri', label: 'Kayseri' },
  { id: 'Sivas', label: 'Sivas' },
  { id: 'Trabzon', label: 'Trabzon & Rize' },
  { id: 'Bursa', label: 'Bursa' },
  { id: 'İzmir', label: 'İzmir & Ege' },
  { id: 'Erzurum', label: 'Erzurum & Van' },
];

const CITY_KEYWORDS = [
  'antep',
  'gaziantep',
  'hatay',
  'adana',
  'mersin',
  'elazığ',
  'urfa',
  'şanlıurfa',
  'mardin',
  'diyarbakır',
  'maraş',
  'kahramanmaraş',
  'adıyaman',
  'kilis',
  'ankara',
  'konya',
  'kayseri',
  'nevşehir',
  'sivas',
  'trabzon',
  'rize',
  'samsun',
  'sinop',
  'kastamonu',
  'bolu',
  'izmir',
  'muğla',
  'aydın',
  'antalya',
  'bursa',
  'edirne',
  'tekirdağ',
  'balıkesir',
  'erzurum',
  'kars',
  'van',
  'malatya',
  'tokat',
  'amasya',
  'çorum',
  'eskişehir',
  'afyon',
  'kütahya',
  'uşak',
  'manisa',
  'denizli',
  'ısparta',
  'burdur',
  'siirt',
  'ordu',
  'artvin',
];

interface IngredientChipProps {
  name: string;
  emoji: string;
  isSelected: boolean;
  onToggle: (name: string) => void;
}

const IngredientChip = React.memo<IngredientChipProps>(
  ({ name, emoji, isSelected, onToggle }) => {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <button
        type="button"
        className={`ingredient-chip-btn ${isSelected ? 'selected' : ''}`}
        onClick={() => onToggle(name)}
      >
        <span className="ing-emoji">{emoji}</span>
        <span className="ing-label">{formattedName}</span>
        <span className="ing-check">
          {isSelected ? <Check size={14} strokeWidth={2.6} /> : <Plus size={14} strokeWidth={2.4} />}
        </span>
      </button>
    );
  }
);

interface RecipeCardItemProps {
  matched: MatchedRecipe;
  isFav: boolean;
  globalServings: number;
  onSelect: (matched: MatchedRecipe) => void;
  onToggleFav: (id: string) => void;
}

const RecipeCardItem = React.memo<RecipeCardItemProps>(
  ({ matched, isFav, globalServings, onSelect, onToggleFav }) => {
    const { recipe, missingIngredients, canCookImmediately } = matched;

    return (
      <article
        className={`recipe-card ${canCookImmediately ? 'ready-card' : ''}`}
        onClick={() => onSelect(matched)}
      >
        <DishVisualHeader
          title={recipe.title}
          category={recipe.category}
          emoji={recipe.emoji}
          image={recipe.image}
          height={176}
          className="recipe-card-media"
        >
          <div className="recipe-card-badges">
            {canCookImmediately ? (
              <span className="status-pill ready">
                <CheckCircle2 size={13} /> Hemen Pişir
              </span>
            ) : (
              <span className="status-pill missing">
                <AlertCircle size={13} /> {missingIngredients.length} Eksik
              </span>
            )}
          </div>

          {recipe.countryLabel && (
            <span className="country-origin-badge">{recipe.countryLabel}</span>
          )}

          <button
            type="button"
            className={`card-fav-btn ${isFav ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav(recipe.id);
            }}
            aria-label="Favorilere ekle"
          >
            <Heart size={16} fill={isFav ? '#E11D48' : 'none'} />
          </button>
        </DishVisualHeader>

        <div className="recipe-card-content">
          <h3 className="recipe-card-title">{recipe.title}</h3>

          <div className="recipe-meta-row">
            <span>
              <Clock size={13} /> {recipe.prepTime + recipe.cookTime} dk
            </span>
            <span>
              <Flame size={13} /> {recipe.caloriesPerServing} kcal
            </span>
            <span className="portion-tag">{globalServings} Kişilik</span>
          </div>

          {canCookImmediately ? (
            <div className="ready-status-line">
              <Check size={14} /> Tüm malzemeler evinizde hazır
            </div>
          ) : (
            <div className="missing-preview-line">
              <span>Eksik: </span>
              <strong>
                {missingIngredients
                  .slice(0, 3)
                  .map((m) => m.name)
                  .join(', ')}
                {missingIngredients.length > 3 && ` +${missingIngredients.length - 3}`}
              </strong>
            </div>
          )}
        </div>
      </article>
    );
  }
);

export function App() {
  const [pantry, setPantry] = useState<string[]>(() => {
    const saved = localStorage.getItem(PANTRY_STORAGE_KEY);
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return Array.from(
            new Set(parsed.map((item) => canonicalizeIngredientName(String(item))))
          );
        }
      } catch {
        // ignore
      }
    }
    return DEFAULT_PANTRY;
  });

  const [globalServings, setGlobalServings] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<ActiveTab>('tarifler');
  const [selectedIngredientCat, setSelectedIngredientCat] =
    useState<IngredientCategoryId | 'tumu'>('tumu');
  const [ingredientSearch, setIngredientSearch] = useState<string>('');
  const [recipeSearch, setRecipeSearch] = useState<string>('');
  const [selectedRecipeCat, setSelectedRecipeCat] = useState<RecipeCategory>('tumu');
  const [cuisineFilter, setCuisineFilter] = useState<CuisineOrigin>('all');
  const [selectedCity, setSelectedCity] = useState<string>('tumu');
  const [onlyReadyToCook, setOnlyReadyToCook] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('nepisirsem_favs');
    return saved
      ? JSON.parse(saved)
      : ['mercimek-corbasi', 'karniyarik', 'firin-sutlac', 'yoresel-1', 'world-1'];
  });

  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('nepisirsem_shopping');
    return saved ? JSON.parse(saved) : [];
  });
  const [customShoppingInput, setCustomShoppingInput] = useState<string>('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [menuSeed, setMenuSeed] = useState<number>(0);
  const [shoppingCopiedToast, setShoppingCopiedToast] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState<boolean>(false);
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('nepisirsem_custom_recipes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [newRecipeTitle, setNewRecipeTitle] = useState<string>('');
  const [newRecipeCategory, setNewRecipeCategory] =
    useState<Exclude<RecipeCategory, 'tumu'>>('et_tavuk');
  const [newRecipePrep, setNewRecipePrep] = useState<string>('15');
  const [newRecipeCook, setNewRecipeCook] = useState<string>('25');
  const [newRecipeIngredientsText, setNewRecipeIngredientsText] = useState<string>('');
  const [newRecipeStepsText, setNewRecipeStepsText] = useState<string>('');

  useEffect(() => {
    setVisibleCount(24);
  }, [selectedRecipeCat, cuisineFilter, selectedCity, onlyReadyToCook, recipeSearch]);

  // O(1) hızlı erişim kümeleri (%100 Kilerim ile birebir senkron)
  const pantrySet = useMemo(() => expandPantrySet(pantry), [pantry]);

  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  const toggleIngredient = useCallback((name: string) => {
    triggerNativeHaptic('light');
    const canonical = canonicalizeIngredientName(name);
    setPantry((prev) => {
      const normalizedPrev = prev.map((item) => canonicalizeIngredientName(item));
      const next = normalizedPrev.includes(canonical)
        ? normalizedPrev.filter((item) => item !== canonical)
        : [...normalizedPrev, canonical];
      const uniqueNext = Array.from(new Set(next));
      localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(uniqueNext));
      return uniqueNext;
    });
  }, []);

  const applyPreset = useCallback((items: string[]) => {
    triggerNativeHaptic('medium');
    const canonicalItems = items.map((i) => canonicalizeIngredientName(i));
    setPantry((prev) => {
      const normalizedPrev = prev.map((item) => canonicalizeIngredientName(item));
      const prevSet = new Set(normalizedPrev);
      const isAllIncluded = canonicalItems.every((it) => prevSet.has(it));
      const removeSet = new Set(canonicalItems);
      const updated = isAllIncluded
        ? normalizedPrev.filter((item) => !removeSet.has(item))
        : Array.from(new Set([...normalizedPrev, ...canonicalItems]));
      localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const filteredIngredients = useMemo(() => {
    return INGREDIENTS_DATA.filter((item) => {
      if (selectedIngredientCat !== 'tumu') {
        if (selectedIngredientCat === 'temel') {
          if (item.category !== 'temel' && !item.isStaple) return false;
        } else if (item.category !== selectedIngredientCat) {
          return false;
        }
      }
      if (ingredientSearch.trim()) {
        const q = ingredientSearch.toLowerCase();
        const inMain = item.name.toLowerCase().includes(q);
        const inAlias = item.aliases?.some((a) => a.toLowerCase().includes(q));
        return inMain || inAlias;
      }
      return true;
    });
  }, [selectedIngredientCat, ingredientSearch]);

  const selectAllVisibleIngredients = useCallback(() => {
    const visibleNames = filteredIngredients.map((i) => canonicalizeIngredientName(i.name));
    setPantry((prev) => {
      const merged = Array.from(
        new Set([...prev.map((p) => canonicalizeIngredientName(p)), ...visibleNames])
      );
      localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(merged));
      return merged;
    });
  }, [filteredIngredients]);

  const clearPantry = useCallback(() => {
    triggerNativeHaptic('medium');
    const empty: string[] = [];
    setPantry(empty);
    localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(empty));
  }, []);

  const toggleFavorite = useCallback((recipeId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];
      localStorage.setItem('nepisirsem_favs', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleSelectRecipe = useCallback((matched: MatchedRecipe) => {
    setSelectedRecipeId(matched.recipe.id);
  }, []);

  const addMissingToShoppingList = useCallback(
    (items: { name: string; measure: string; recipeTitle: string }[]) => {
      const newEntries: ShoppingItem[] = items.map((item) => ({
        id: `${Date.now()}-${Math.random()}`,
        name: item.name,
        measure: item.measure,
        recipeTitle: item.recipeTitle,
        checked: false,
      }));
      setShoppingList((prev) => {
        const updated = [...prev, ...newEntries];
        localStorage.setItem('nepisirsem_shopping', JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const addCustomShoppingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customShoppingInput.trim()) return;
    const newItem: ShoppingItem = {
      id: `${Date.now()}`,
      name: customShoppingInput.trim(),
      measure: `${globalServings} Kişilik`,
      recipeTitle: 'Manuel Eklendi',
      checked: false,
    };
    const updated = [newItem, ...shoppingList];
    setShoppingList(updated);
    localStorage.setItem('nepisirsem_shopping', JSON.stringify(updated));
    setCustomShoppingInput('');
  };

  const toggleShoppingItem = (id: string) => {
    const updated = shoppingList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setShoppingList(updated);
    localStorage.setItem('nepisirsem_shopping', JSON.stringify(updated));
  };

  const clearShoppingList = () => {
    setShoppingList([]);
    localStorage.setItem('nepisirsem_shopping', JSON.stringify([]));
  };

  const baseArchiveRecipes = useMemo(() => getFullRecipeArchive(), []);
  const allArchiveRecipes = useMemo(
    () => [...customRecipes, ...baseArchiveRecipes],
    [customRecipes, baseArchiveRecipes]
  );

  const handleCreateCustomRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipeTitle.trim() || !newRecipeIngredientsText.trim()) return;
    triggerNativeHaptic('success');

    const parsedIngredients = newRecipeIngredientsText
      .split(/[\n,]+/)
      .map((s) => canonicalizeIngredientName(s))
      .filter(Boolean)
      .map((name) => ({
        name,
        amount: 1,
        unit: 'adet' as const,
      }));

    const parsedSteps = (newRecipeStepsText.trim() || 'Malzemeleri hazırlayıp pişirin.')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((instruction, i) => ({
        title: `${i + 1}. Adım`,
        instruction,
        timerMinutes: i === 0 ? Math.max(5, Number(newRecipeCook) || 20) : undefined,
      }));

    const created: Recipe = {
      id: `custom-${Date.now()}`,
      title: newRecipeTitle.trim(),
      subtitle: 'Kişisel Tarif Defterim (Özel Aile Tarifi)',
      category: newRecipeCategory,
      cuisineOrigin: 'turkish',
      countryLabel: '👩‍🍳 Kendi Tarifim',
      emoji: '🍲',
      image: '',
      prepTime: Math.max(5, Number(newRecipePrep) || 15),
      cookTime: Math.max(5, Number(newRecipeCook) || 25),
      difficulty: 'Kolay',
      caloriesPerServing: 260,
      baseServings: 4,
      chefTip: 'Bu tarif kişisel tarif defterinize kaydedilmiştir ve porsiyon hesaplayıcı ile tam uyumludur.',
      servingSuggestion: 'Sıcak olarak sevdiklerinizle servis edebilirsiniz.',
      ingredients: parsedIngredients,
      steps: parsedSteps,
    };

    const updated = [created, ...customRecipes];
    setCustomRecipes(updated);
    localStorage.setItem('nepisirsem_custom_recipes', JSON.stringify(updated));
    setNewRecipeTitle('');
    setNewRecipeIngredientsText('');
    setNewRecipeStepsText('');
    setIsAddRecipeModalOpen(false);
    setActiveTab('tarifler');
  };

  const matchedRecipes = useMemo(() => {
    return matchRecipesWithPantry(allArchiveRecipes, pantry);
  }, [allArchiveRecipes, pantry]);

  const selectedMatchedRecipe = useMemo(
    () =>
      selectedRecipeId
        ? matchedRecipes.find((m) => m.recipe.id === selectedRecipeId) || null
        : null,
    [matchedRecipes, selectedRecipeId]
  );

  const readyToCookCount = useMemo(
    () => matchedRecipes.filter((m) => m.canCookImmediately).length,
    [matchedRecipes]
  );

  const turkishCount = useMemo(
    () => matchedRecipes.filter((m) => m.recipe.cuisineOrigin !== 'world').length,
    [matchedRecipes]
  );

  const worldCount = useMemo(
    () => matchedRecipes.filter((m) => m.recipe.cuisineOrigin === 'world').length,
    [matchedRecipes]
  );

  // Birebir İl Eşleştirici (Gaziantep seçildiğinde SADECE Gaziantep gelir)
  const matchesStrictCity = (
    countryLabel: string | undefined,
    title: string,
    cityId: string
  ): boolean => {
    if (cityId === 'tumu') return true;
    const label = (countryLabel || '').toLowerCase();
    const t = title.toLowerCase();

    if (cityId === 'Trabzon') {
      return label.includes('trabzon') || label.includes('rize') || label.includes('karadeniz');
    }
    if (cityId === 'İzmir') {
      return label.includes('izmir') || label.includes('aydın') || label.includes('muğla');
    }
    if (cityId === 'Erzurum') {
      return label.includes('erzurum') || label.includes('van') || label.includes('kars');
    }

    const target = cityId.toLowerCase();
    return label.includes(target) || t.includes(`(${target}`);
  };

  // Filtrelenmiş tarifler
  const filteredRecipes = useMemo(() => {
    return matchedRecipes.filter((m) => {
      if (cuisineFilter === 'turkish' && m.recipe.cuisineOrigin === 'world') {
        return false;
      }
      if (cuisineFilter === 'world' && m.recipe.cuisineOrigin !== 'world') {
        return false;
      }
      if (cuisineFilter !== 'world' && selectedCity !== 'tumu') {
        if (!matchesStrictCity(m.recipe.countryLabel, m.recipe.title, selectedCity)) {
          return false;
        }
      }
      if (selectedRecipeCat !== 'tumu' && m.recipe.category !== selectedRecipeCat) {
        return false;
      }
      if (onlyReadyToCook && !m.canCookImmediately) {
        return false;
      }
      if (recipeSearch.trim()) {
        const q = recipeSearch.toLowerCase().trim();
        const inTitle = m.recipe.title.toLowerCase().includes(q);
        const inCountry = (m.recipe.countryLabel || '').toLowerCase().includes(q);

        const isCityQuery = CITY_KEYWORDS.some((ck) => q === ck || q.includes(ck));
        if (isCityQuery) {
          return inTitle || inCountry;
        }

        const inIng = m.recipe.ingredients.some((i) => i.name.toLowerCase().includes(q));
        return inTitle || inCountry || inIng;
      }
      return true;
    });
  }, [
    matchedRecipes,
    cuisineFilter,
    selectedCity,
    selectedRecipeCat,
    onlyReadyToCook,
    recipeSearch,
  ]);

  // Günün 4 Çeşit Menüsü
  const dailyMenu = useMemo(() => {
    const pickFrom = (cats: RecipeCategory[]) => {
      const candidates = matchedRecipes
        .filter((m) => cats.includes(m.recipe.category))
        .slice(0, 10);
      if (candidates.length === 0) return null;
      return candidates[menuSeed % candidates.length];
    };
    return [
      { role: '🥣 Başlangıç Çorbası', item: pickFrom(['corba']) },
      {
        role: '🍖 Ana Yemek',
        item: pickFrom(['et_tavuk', 'sebze_zeytinyagli', 'dunya_mutfagi']),
      },
      { role: '🍚 Yardımcı Lezzet', item: pickFrom(['bakliyat_pilav', 'salata_meze']) },
      { role: '🍮 Tatlı', item: pickFrom(['tatli']) },
    ].filter((entry) => entry.item !== null);
  }, [matchedRecipes, menuSeed]);

  const switchTab = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const pickRandomRecipe = () => {
    const pool = matchedRecipes.filter((m) => m.missingIngredients.length <= 2);
    const targetPool = pool.length > 0 ? pool : matchedRecipes;
    if (targetPool.length === 0) return;
    const randomPick = targetPool[Math.floor(Math.random() * targetPool.length)];
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { y: 0.7 },
    });
    setSelectedRecipeId(randomPick.recipe.id);
  };

  const displayedRecipes = useMemo(
    () =>
      activeTab === 'favoriler'
        ? filteredRecipes.filter((m) => favoritesSet.has(m.recipe.id))
        : filteredRecipes.slice(0, visibleCount),
    [activeTab, filteredRecipes, favoritesSet, visibleCount]
  );

  const uncheckedShoppingCount = shoppingList.filter((i) => !i.checked).length;

  const handleShareShoppingList = () => {
    const text = `🛒 Mutfak Alışveriş Listem\n\n${shoppingList
      .map((i) => `${i.checked ? '✅' : '⬜'} ${i.measure} ${i.name} (${i.recipeTitle})`)
      .join('\n')}`;
    if (navigator.share) {
      navigator.share({ title: 'Mutfak Alışveriş Listem', text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text);
      setShoppingCopiedToast(true);
      setTimeout(() => setShoppingCopiedToast(false), 3000);
    }
  };

  return (
    <div className="app-shell">
      {/* FERAH, GÜVENLİ BOŞLUKLU (SAFE-AREA) MODERN ÜST BAR */}
      <header className="main-header">
        <div className="header-top-row">
          <div className="brand-block" onClick={() => switchTab('tarifler')}>
            <div className="brand-logo">
              <ChefHat size={23} />
            </div>
            <div className="brand-text">
              <div className="brand-title-line">
                <h1>Ne Pişirsem?</h1>
              </div>
              <p className="brand-tagline">Evdeki malzemelerle tam ölçülü tarifler</p>
            </div>
          </div>

          <div className="header-actions-row">
            {/* KİŞİ SAYISI KONTROLÜ */}
            <div className="global-servings-pill">
              <Users size={16} className="text-rose shrink-0 servings-users-icon" />
              <button
                type="button"
                className="mini-step-btn"
                onClick={() => setGlobalServings((s) => Math.max(1, s - 1))}
                aria-label="Kişi azalt"
              >
                <Minus size={14} />
              </button>
              <strong className="servings-pill-val">{globalServings} Kişilik</strong>
              <button
                type="button"
                className="mini-step-btn"
                onClick={() => setGlobalServings((s) => Math.min(20, s + 1))}
                aria-label="Kişi artır"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              type="button"
              className="surprise-me-btn"
              onClick={pickRandomRecipe}
              title="Rastgele Yemek Öner"
            >
              <Dices size={17} />
              <span className="surprise-btn-label">Bana Öner</span>
            </button>

            <button
              type="button"
              className="info-guide-btn"
              onClick={() => {
                triggerNativeHaptic('light');
                setIsGuideModalOpen(true);
              }}
              aria-label="Mutfak Rehberi ve Gizlilik"
              title="Mutfak Rehberi & Gizlilik"
            >
              <Info size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ANA ÇALIŞMA ALANI */}
      <main className="main-workspace">
        {/* SOL PANEL: KİLERİM */}
        <section
          className={`workspace-panel pantry-panel ${
            activeTab === 'kiler' ? 'tab-active' : 'tab-inactive-mobile'
          }`}
        >
          <div className="panel-card pantry-card">
            <div className="panel-card-header pantry-header-row">
              <div className="header-title-wrap">
                <h2>🧺 Kilerim ({pantry.length})</h2>
                <p>Evdeki malzemelerinizi seçin, uygun yemekler anında listelensin</p>
              </div>
              <div className="header-btn-group">
                <button
                  type="button"
                  className="share-list-btn"
                  onClick={selectAllVisibleIngredients}
                >
                  <Check size={14} /> Tümünü Seç
                </button>
                <button type="button" className="clear-pantry-btn" onClick={clearPantry}>
                  <Trash2 size={14} /> Sıfırla
                </button>
              </div>
            </div>

            {/* HIZLI DOLAP PAKETLERİ */}
            <div className="presets-grid">
              {QUICK_PANTRY_PRESETS.map((preset) => {
                const isAllIncluded = preset.items.every((it) =>
                  pantrySet.has(canonicalizeIngredientName(it))
                );
                return (
                  <button
                    type="button"
                    key={preset.id}
                    className={`preset-chip ${isAllIncluded ? 'preset-active' : ''}`}
                    onClick={() => applyPreset(preset.items)}
                  >
                    <span>{preset.title}</span>
                    <span className="preset-icon-badge">
                      {isAllIncluded ? (
                        <Check size={14} strokeWidth={2.5} className="shrink-0" />
                      ) : (
                        <Plus size={14} strokeWidth={2.5} className="shrink-0" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ŞU AN KİLERDE SEÇİLİ OLAN MALZEMELER ŞERİDİ */}
            <div className="active-pantry-summary-box">
              <div className="active-pantry-summary-header">
                <span>
                  ✅ Şu An Seçili Malzemeleriniz (<strong>{pantry.length}</strong>)
                </span>
                {pantry.length > 0 && (
                  <small>Çıkarmak istediğiniz malzemeye dokunun</small>
                )}
              </div>
              {pantry.length === 0 ? (
                <p className="active-pantry-empty-hint">
                  Kilerinizde şu an hiçbir malzeme seçili değil. Aşağıdan evinizdeki malzemeleri
                  seçtiğinizde sadece o malzemelere uygun tarifler "Var" olarak işaretlenir.
                </p>
              ) : (
                <div className="active-pantry-pills-strip">
                  {pantry.map((itemName) => (
                    <button
                      type="button"
                      key={itemName}
                      className="active-pantry-mini-pill"
                      onClick={() => toggleIngredient(itemName)}
                      title="Kilerden çıkar"
                    >
                      <span>{itemName.charAt(0).toUpperCase() + itemName.slice(1)}</span>
                      <X size={12} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MALZEME ARAMA */}
            <div className="search-input-box pantry-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                value={ingredientSearch}
                onChange={(e) => setIngredientSearch(e.target.value)}
                placeholder="Malzeme ara (Örn: kıyma, mercimek, patlıcan...)"
              />
              {ingredientSearch && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setIngredientSearch('')}
                >
                  ×
                </button>
              )}
            </div>

            {/* MALZEME KATEGORİLERİ */}
            <div className="category-pills-row pantry-cats-row">
              {INGREDIENT_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  className={`cat-pill ${selectedIngredientCat === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedIngredientCat(cat.id)}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* MALZEME SEÇİM IZGARASI */}
            <div className="ingredients-grid">
              {filteredIngredients.map((item) => (
                <IngredientChip
                  key={item.id}
                  name={item.name}
                  emoji={item.emoji}
                  isSelected={pantrySet.has(item.name.toLowerCase())}
                  onToggle={toggleIngredient}
                />
              ))}
            </div>

            <div className="mobile-cta-footer">
              <button
                type="button"
                className="primary-cta-btn"
                onClick={() => switchTab('tarifler')}
              >
                <Sparkles size={18} />
                <span>Tarifleri Gör ({readyToCookCount} Hazır Yemek)</span>
              </button>
            </div>
          </div>
        </section>

        {/* SAĞ PANEL: TARİFLER / GÜNÜN MENÜSÜ / FAVORİLER / ALIŞVERİŞ */}
        <section
          className={`workspace-panel results-panel ${
            activeTab !== 'kiler' ? 'tab-active' : 'tab-inactive-mobile'
          }`}
        >
          {/* 1) GÜNÜN MENÜSÜ SEKMESİ */}
          {activeTab === 'menu' ? (
            <div className="panel-card">
              <div className="panel-card-header">
                <div className="header-title-wrap">
                  <h2>🍽️ Günün 4 Çeşit Menüsü ({globalServings} Kişilik)</h2>
                  <p>Kilerinizdeki malzemelere göre uyumlu çorba, ana yemek, yardımcı ve tatlı</p>
                </div>
                <button
                  type="button"
                  className="surprise-me-btn"
                  onClick={() => setMenuSeed((s) => s + 1)}
                >
                  <Dices size={16} /> Menüyü Değiştir
                </button>
              </div>

              <div className="daily-menu-grid">
                {dailyMenu.map((slot, idx) => {
                  const matched = slot.item!;
                  const { recipe, missingIngredients, canCookImmediately } = matched;

                  return (
                    <div
                      key={idx}
                      className="menu-slot-card"
                      onClick={() => setSelectedRecipeId(matched.recipe.id)}
                    >
                      <div className="menu-slot-role">{slot.role}</div>
                      <div className="menu-slot-body">
                        <div className="menu-slot-thumb">
                          <DishVisualHeader
                            title={recipe.title}
                            category={recipe.category}
                            emoji={recipe.emoji}
                            image={recipe.image}
                            height={88}
                          />
                        </div>
                        <div className="menu-slot-info">
                          <h3>{recipe.title}</h3>
                          <div className="menu-slot-badges mt-2">
                            {canCookImmediately ? (
                              <span className="status-pill ready">Hemen Pişir</span>
                            ) : (
                              <span className="status-pill missing">
                                {missingIngredients.length} Eksik
                              </span>
                            )}
                            <span className="portion-tag">
                              {recipe.prepTime + recipe.cookTime} dk
                            </span>
                          </div>
                        </div>
                        <ChevronRight size={19} className="text-muted shrink-0" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeTab === 'alisveris' ? (
            /* 2) ALIŞVERİŞ LİSTESİ SEKMESİ */
            <div className="panel-card">
              <div className="panel-card-header">
                <div className="header-title-wrap">
                  <h2>🛒 Alışveriş Listem</h2>
                  <p>Tariflerdeki eksik malzemeleri veya kendi ihtiyaçlarınızı takip edin</p>
                </div>
                {shoppingList.length > 0 && (
                  <div className="header-btn-group">
                    <button
                      type="button"
                      className="share-list-btn"
                      onClick={handleShareShoppingList}
                    >
                      <Share2 size={14} /> Paylaş
                    </button>
                    <button
                      type="button"
                      className="clear-pantry-btn"
                      onClick={clearShoppingList}
                    >
                      <Trash2 size={14} /> Temizle
                    </button>
                  </div>
                )}
              </div>

              {shoppingCopiedToast && (
                <div className="cart-success-toast">
                  <CheckCircle2 size={16} />
                  <span>Alışveriş listeniz panoya kopyalandı!</span>
                </div>
              )}

              <form onSubmit={addCustomShoppingItem} className="shopping-add-form">
                <input
                  type="text"
                  value={customShoppingInput}
                  onChange={(e) => setCustomShoppingInput(e.target.value)}
                  placeholder="Malzeme ekle (Örn: 1 kg yoğurt...)"
                />
                <button type="submit">
                  <Plus size={16} /> Ekle
                </button>
              </form>

              {shoppingList.length === 0 ? (
                <div className="empty-state-box">
                  <ShoppingBasket size={42} className="text-rose" />
                  <h3>Listeniz Boş</h3>
                  <p>Tarif içinden eksik malzemeleri tek tıkla buraya ekleyebilirsiniz.</p>
                </div>
              ) : (
                <div className="shopping-items-list">
                  {shoppingList.map((item) => (
                    <div
                      key={item.id}
                      className={`shopping-item-row ${item.checked ? 'checked' : ''}`}
                      onClick={() => toggleShoppingItem(item.id)}
                    >
                      <div className="shopping-checkbox">
                        {item.checked && <Check size={14} />}
                      </div>
                      <div className="shopping-item-details">
                        <strong>
                          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                        </strong>
                        <span>{item.recipeTitle}</span>
                      </div>
                      <div className="shopping-item-measure">{item.measure}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* 3) TARİFLER VE FAVORİLER SEKMESİ */
            <div className="panel-card">
              {/* MUTFAK SEÇİMİ: TÜMÜ | TÜRKİYE | DÜNYA */}
              <div className="cuisine-origin-tabs">
                <button
                  type="button"
                  className={`origin-tab-btn ${cuisineFilter === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    setCuisineFilter('all');
                    setSelectedCity('tumu');
                  }}
                >
                  <span className="origin-label">🍽️ Tümü</span>
                  <span className="origin-count">{matchedRecipes.length}</span>
                </button>
                <button
                  type="button"
                  className={`origin-tab-btn ${cuisineFilter === 'turkish' ? 'active' : ''}`}
                  onClick={() => setCuisineFilter('turkish')}
                >
                  <span className="origin-label">🇹🇷 Türkiye</span>
                  <span className="origin-count">{turkishCount}</span>
                </button>
                <button
                  type="button"
                  className={`origin-tab-btn ${cuisineFilter === 'world' ? 'active' : ''}`}
                  onClick={() => {
                    setCuisineFilter('world');
                    setSelectedCity('tumu');
                  }}
                >
                  <span className="origin-label">🌍 Dünya</span>
                  <span className="origin-count">{worldCount}</span>
                </button>
              </div>

              {/* ARAMA & SADECE EKSİKSİZLER FİLTRESİ */}
              <div className="recipes-filter-toolbar">
                <div className="search-input-box flex-1">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    value={recipeSearch}
                    onChange={(e) => setRecipeSearch(e.target.value)}
                    placeholder="Yemek, şehir veya malzeme ara..."
                  />
                  {recipeSearch && (
                    <button
                      type="button"
                      className="clear-search"
                      onClick={() => setRecipeSearch('')}
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="toolbar-actions-group">
                  <button
                    type="button"
                    className={`ready-filter-toggle ${onlyReadyToCook ? 'active' : ''}`}
                    onClick={() => setOnlyReadyToCook(!onlyReadyToCook)}
                  >
                    <CheckCircle2 size={16} />
                    <span>Hazır ({readyToCookCount})</span>
                  </button>

                  <button
                    type="button"
                    className="add-custom-recipe-btn"
                    onClick={() => {
                      triggerNativeHaptic('light');
                      setIsAddRecipeModalOpen(true);
                    }}
                    title="Kendi Tarifini Ekle"
                  >
                    <Plus size={16} />
                    <span>Tarif Ekle</span>
                  </button>
                </div>
              </div>

              {/* YEMEK KATEGORİLERİ */}
              <div className="category-pills-row">
                {RECIPE_CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    className={`cat-pill ${selectedRecipeCat === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedRecipeCat(cat.id)}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* ŞEHİR / YÖRE FİLTRESİ (Sadece seçilen ili getirir) */}
              {cuisineFilter !== 'world' && (
                <div className="category-pills-row city-pills-row">
                  {CITY_FILTERS.map((city) => (
                    <button
                      type="button"
                      key={city.id}
                      className={`cat-pill region-pill ${
                        selectedCity === city.id ? 'active' : ''
                      }`}
                      onClick={() => setSelectedCity(city.id)}
                    >
                      <span>{city.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* TARİF KARTLARI IZGARASI */}
              {displayedRecipes.length === 0 ? (
                <div className="empty-state-box">
                  <ChefHat size={42} className="text-rose" />
                  <h3>Tarif Bulunamadı</h3>
                  <p>Arama kriterini veya filtreyi değiştirebilirsiniz.</p>
                  <button
                    type="button"
                    className="surprise-me-btn mt-3 mx-auto"
                    onClick={() => {
                      setOnlyReadyToCook(false);
                      setSelectedCity('tumu');
                      setSelectedRecipeCat('tumu');
                      setRecipeSearch('');
                    }}
                  >
                    Filtreleri Sıfırla
                  </button>
                </div>
              ) : (
                <>
                  <div className="recipe-cards-grid">
                    {displayedRecipes.map((matched) => (
                      <RecipeCardItem
                        key={matched.recipe.id}
                        matched={matched}
                        isFav={favoritesSet.has(matched.recipe.id)}
                        globalServings={globalServings}
                        onSelect={handleSelectRecipe}
                        onToggleFav={toggleFavorite}
                      />
                    ))}
                  </div>

                  {activeTab !== 'favoriler' && visibleCount < filteredRecipes.length && (
                    <div className="load-more-wrap">
                      <button
                        type="button"
                        className="load-more-btn"
                        onClick={() => setVisibleCount((prev) => prev + 24)}
                      >
                        Daha Fazla Göster ({filteredRecipes.length - visibleCount})
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </main>

      {/* TÜM CİHAZLARDA (iPhone, iPad, Tablet) HER ZAMAN ERİŞİLEBİLİR MODERN ALT NAVİGASYON BAR */}
      <nav className="mobile-bottom-nav" aria-label="Ana Navigasyon">
        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'kiler' ? 'active' : ''}`}
          onClick={() => switchTab('kiler')}
        >
          <div className="nav-icon-pill">
            <ShoppingBasket size={21} strokeWidth={activeTab === 'kiler' ? 2.4 : 2} />
            <span className="nav-count-pill">{pantry.length}</span>
          </div>
          <span className="nav-label">Kilerim</span>
        </button>

        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'tarifler' ? 'active' : ''}`}
          onClick={() => switchTab('tarifler')}
        >
          <div className="nav-icon-pill">
            <ChefHat size={21} strokeWidth={activeTab === 'tarifler' ? 2.4 : 2} />
            <span className="nav-count-pill">{readyToCookCount}</span>
          </div>
          <span className="nav-label">Tarifler</span>
        </button>

        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => switchTab('menu')}
        >
          <div className="nav-icon-pill">
            <UtensilsCrossed size={21} strokeWidth={activeTab === 'menu' ? 2.4 : 2} />
          </div>
          <span className="nav-label">Menü</span>
        </button>

        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'favoriler' ? 'active' : ''}`}
          onClick={() => switchTab('favoriler')}
        >
          <div className="nav-icon-pill">
            <Heart
              size={21}
              strokeWidth={activeTab === 'favoriler' ? 2.4 : 2}
              fill={activeTab === 'favoriler' ? 'currentColor' : 'none'}
            />
            {favorites.length > 0 && (
              <span className="nav-count-pill">{favorites.length}</span>
            )}
          </div>
          <span className="nav-label">Favoriler</span>
        </button>

        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'alisveris' ? 'active' : ''}`}
          onClick={() => switchTab('alisveris')}
        >
          <div className="nav-icon-pill">
            <Sparkles size={21} strokeWidth={activeTab === 'alisveris' ? 2.4 : 2} />
            {uncheckedShoppingCount > 0 && (
              <span className="nav-badge">{uncheckedShoppingCount}</span>
            )}
          </div>
          <span className="nav-label">Liste</span>
        </button>
      </nav>

      {/* MUTFAK ÖLÇÜ REHBERİ & GİZLİLİK MODALI */}
      {isGuideModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsGuideModalOpen(false)}>
          <div className="modal-sheet guide-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="guide-modal-header">
              <div className="guide-modal-title-wrap">
                <BookOpen size={22} className="text-rose shrink-0" />
                <div>
                  <h2>Mutfak Rehberi & Uygulama Bilgisi</h2>
                  <p>Standart bardak/kaşık ölçüleri ve veri güvenliği</p>
                </div>
              </div>
              <button
                type="button"
                className="circle-action-btn"
                onClick={() => setIsGuideModalOpen(false)}
                aria-label="Kapat"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-scroll-body">
              <div className="modal-section">
                <h3 className="section-heading mb-3">
                  <span>🥛 Standart Türk Mutfağı Ölçü Rehberi</span>
                </h3>
                <div className="scaled-ingredients-grid">
                  <div className="scaled-ingredient-row in-pantry">
                    <div className="ing-info">
                      <span className="ing-name">1 Su Bardağı (Sıvı / Su / Süt)</span>
                    </div>
                    <strong className="measure-primary">200 ml</strong>
                  </div>
                  <div className="scaled-ingredient-row in-pantry">
                    <div className="ing-info">
                      <span className="ing-name">1 Su Bardağı Un</span>
                    </div>
                    <strong className="measure-primary">~120 gr</strong>
                  </div>
                  <div className="scaled-ingredient-row in-pantry">
                    <div className="ing-info">
                      <span className="ing-name">1 Su Bardağı Pirinç / Bakliyat</span>
                    </div>
                    <strong className="measure-primary">~180 gr</strong>
                  </div>
                  <div className="scaled-ingredient-row in-pantry">
                    <div className="ing-info">
                      <span className="ing-name">1 Çay Bardağı</span>
                    </div>
                    <strong className="measure-primary">100 ml</strong>
                  </div>
                  <div className="scaled-ingredient-row in-pantry">
                    <div className="ing-info">
                      <span className="ing-name">1 Yemek Kaşığı</span>
                    </div>
                    <strong className="measure-primary">15 ml (~12 gr)</strong>
                  </div>
                  <div className="scaled-ingredient-row in-pantry">
                    <div className="ing-info">
                      <span className="ing-name">1 Tatlı Kaşığı / 1 Çay Kaşığı</span>
                    </div>
                    <strong className="measure-primary">5 ml / 2.5 ml</strong>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3 className="section-heading mb-3">
                  <ShieldCheck size={19} className="text-rose" />
                  <span>Gizlilik ve Çevrimdışı Kullanım Güvencesi</span>
                </h3>
                <p className="step-instruction">
                  <strong>Ne Pişirsem?</strong> uygulaması tüm tarif arşivini, akıllı kiler
                  eşleştiricisini ve porsiyon hesaplayıcısını doğrudan cihazınızda (%100
                  çevrimdışı / offline) çalıştırır. Seçtiğiniz kiler malzemeleri, favori
                  tarifleriniz ve alışveriş listeniz yalnızca cihazınızın yerel hafızasında
                  saklanır; hiçbir kişisel veriniz toplanmaz, takip edilmez ve dış sunuculara
                  aktarılmaz.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KİŞİSEL TARİF DEFTERİM - KENDİ TARİFİNİ EKLE MODALI */}
      {isAddRecipeModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddRecipeModalOpen(false)}>
          <div className="modal-sheet guide-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="guide-modal-header">
              <div className="guide-modal-title-wrap">
                <ChefHat size={22} className="text-rose shrink-0" />
                <div>
                  <h2>Kişisel Tarif Defterime Ekle</h2>
                  <p>Kendi aile tarifinizi kaydedin, porsiyon ve kiler hesabına dahil edin</p>
                </div>
              </div>
              <button
                type="button"
                className="circle-action-btn"
                onClick={() => setIsAddRecipeModalOpen(false)}
                aria-label="Kapat"
              >
                <X size={20} />
              </button>
            </div>

            <form className="modal-scroll-body" onSubmit={handleCreateCustomRecipe}>
              <div className="modal-section">
                <label className="cookware-label">Yemek Adı</label>
                <div className="search-input-box mt-2">
                  <input
                    type="text"
                    required
                    style={{ paddingLeft: '14px' }}
                    value={newRecipeTitle}
                    onChange={(e) => setNewRecipeTitle(e.target.value)}
                    placeholder="Örn: Anne Usulü Sebzeli Güveç"
                  />
                </div>

                <label className="cookware-label">Kategori & Pişirme Süresi (dk)</label>
                <div className="recipes-filter-toolbar mt-2">
                  <select
                    value={newRecipeCategory}
                    onChange={(e) =>
                      setNewRecipeCategory(e.target.value as Exclude<RecipeCategory, 'tumu'>)
                    }
                    style={{
                      flex: 1,
                      padding: '11px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      background: '#f8fafc',
                    }}
                  >
                    <option value="corba">🥣 Çorba</option>
                    <option value="et_tavuk">🍖 Et & Tavuk</option>
                    <option value="sebze_zeytinyagli">🫒 Sebze & Zeytinyağlı</option>
                    <option value="bakliyat_pilav">🍚 Pilav & Bakliyat</option>
                    <option value="hamur_borek">🥐 Börek & Hamur İşi</option>
                    <option value="kahvalti">🍳 Kahvaltılık</option>
                    <option value="salata_meze">🥗 Salata & Meze</option>
                    <option value="tatli">🍮 Tatlı</option>
                  </select>
                  <input
                    type="number"
                    min="5"
                    max="240"
                    value={newRecipePrep}
                    onChange={(e) => setNewRecipePrep(e.target.value)}
                    placeholder="Hazırlık"
                    style={{
                      width: '80px',
                      padding: '11px 10px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                    }}
                  />
                  <input
                    type="number"
                    min="5"
                    max="240"
                    value={newRecipeCook}
                    onChange={(e) => setNewRecipeCook(e.target.value)}
                    placeholder="Pişirme"
                    style={{
                      width: '80px',
                      padding: '11px 10px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                    }}
                  />
                </div>

                <label className="cookware-label">Malzemeler (Virgül ile ayırın)</label>
                <div className="search-input-box mt-2">
                  <input
                    type="text"
                    required
                    style={{ paddingLeft: '14px' }}
                    value={newRecipeIngredientsText}
                    onChange={(e) => setNewRecipeIngredientsText(e.target.value)}
                    placeholder="Örn: patlıcan, domates, yeşil biber, sarımsak, zeytinyağı"
                  />
                </div>

                <label className="cookware-label">Hazırlanış Adımları (Her satıra 1 adım)</label>
                <textarea
                  rows={3}
                  value={newRecipeStepsText}
                  onChange={(e) => setNewRecipeStepsText(e.target.value)}
                  placeholder="Sebzeleri küp doğrayın.&#10;Güveç kabına dizip kısık ateşte pişirin."
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontFamily: 'inherit',
                    fontSize: '0.88rem',
                  }}
                />

                <button type="submit" className="primary-cta-btn mt-3">
                  <Check size={18} />
                  <span>Tarifi Defterime Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TARİF DETAY & PORSİYON HESAPLAMA MODALI */}
      <RecipeDetailModal
        matchedRecipe={selectedMatchedRecipe}
        onClose={() => setSelectedRecipeId(null)}
        defaultServings={globalServings}
        isFavorite={
          selectedMatchedRecipe
            ? favoritesSet.has(selectedMatchedRecipe.recipe.id)
            : false
        }
        onToggleFavorite={toggleFavorite}
        onAddMissingToShoppingList={addMissingToShoppingList}
        pantryItems={pantry}
        onTogglePantryIngredient={toggleIngredient}
      />
    </div>
  );
}

export default App;
