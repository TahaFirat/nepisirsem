import React, { useState, useMemo, useEffect } from 'react';
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
} from 'lucide-react';
import {
  INGREDIENTS_DATA,
  INGREDIENT_CATEGORIES,
  QUICK_PANTRY_PRESETS,
} from './data/ingredients';
import { RECIPE_CATEGORIES } from './data/recipes';
import { getFullRecipeArchive } from './data/legacyRecipesBridge';
import type {
  CuisineOrigin,
  IngredientCategoryId,
  MatchedRecipe,
  RecipeCategory,
} from './types/recipe';
import { matchRecipesWithPantry } from './utils/recipeMatcher';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { DishVisualHeader } from './components/DishVisualHeader';
import './App.css';

interface ShoppingItem {
  id: string;
  name: string;
  measure: string;
  recipeTitle: string;
  checked: boolean;
}

type ActiveTab = 'kiler' | 'tarifler' | 'menu' | 'favoriler' | 'alisveris';

const DEFAULT_PANTRY = [
  'su',
  'tuz',
  'sıvı yağ',
  'zeytinyağı',
  'tereyağı',
  'salça',
  'biber salçası',
  'soğan',
  'sarımsak',
  'un',
  'şeker',
  'domates',
  'patates',
  'yumurta',
  'yeşil biber',
  'kırmızı mercimek',
  'pirinç',
  'pilavlık bulgur',
  'köftelik bulgur',
  'yoğurt',
  'süt',
  'karabiber',
  'pul biber',
  'nane',
  'kekik',
  'kimyon',
  'limon',
  'limon suyu',
];

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

export function App() {
  const [pantry, setPantry] = useState<string[]>(() => {
    const saved = localStorage.getItem('nepisirsem_pantry_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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
  const [selectedMatchedRecipe, setSelectedMatchedRecipe] =
    useState<MatchedRecipe | null>(null);
  const [menuSeed, setMenuSeed] = useState<number>(0);

  useEffect(() => {
    setVisibleCount(24);
  }, [selectedRecipeCat, cuisineFilter, selectedCity, onlyReadyToCook, recipeSearch]);

  const updatePantry = (newPantry: string[]) => {
    setPantry(newPantry);
    localStorage.setItem('nepisirsem_pantry_v2', JSON.stringify(newPantry));
  };

  const toggleIngredient = (name: string) => {
    const lower = name.toLowerCase();
    if (pantry.includes(lower)) {
      updatePantry(pantry.filter((item) => item !== lower));
    } else {
      updatePantry([...pantry, lower]);
    }
  };

  const applyPreset = (items: string[]) => {
    const merged = Array.from(new Set([...pantry, ...items.map((i) => i.toLowerCase())]));
    updatePantry(merged);
  };

  const selectAllVisibleIngredients = () => {
    const visibleNames = filteredIngredients.map((i) => i.name.toLowerCase());
    const merged = Array.from(new Set([...pantry, ...visibleNames]));
    updatePantry(merged);
  };

  const clearPantry = () => {
    updatePantry(['su', 'tuz']);
  };

  const toggleFavorite = (recipeId: string) => {
    const updated = favorites.includes(recipeId)
      ? favorites.filter((id) => id !== recipeId)
      : [...favorites, recipeId];
    setFavorites(updated);
    localStorage.setItem('nepisirsem_favs', JSON.stringify(updated));
  };

  const addMissingToShoppingList = (
    items: { name: string; measure: string; recipeTitle: string }[]
  ) => {
    const newEntries: ShoppingItem[] = items.map((item) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: item.name,
      measure: item.measure,
      recipeTitle: item.recipeTitle,
      checked: false,
    }));
    const updated = [...shoppingList, ...newEntries];
    setShoppingList(updated);
    localStorage.setItem('nepisirsem_shopping', JSON.stringify(updated));
  };

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

  const allArchiveRecipes = useMemo(() => getFullRecipeArchive(), []);

  const matchedRecipes = useMemo(() => {
    return matchRecipesWithPantry(allArchiveRecipes, pantry, true);
  }, [allArchiveRecipes, pantry]);

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

        // Eğer kullanıcı bir şehir adı yazdıysa (örn: "antep"), başka illerin "antep fıstığı" içeren tatlılarını getirme!
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

  const switchTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

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
    setSelectedMatchedRecipe(randomPick);
  };

  const displayedRecipes =
    activeTab === 'favoriler'
      ? filteredRecipes.filter((m) => favorites.includes(m.recipe.id))
      : filteredRecipes.slice(0, visibleCount);

  const uncheckedShoppingCount = shoppingList.filter((i) => !i.checked).length;

  return (
    <div className="app-shell">
      {/* SADE, TEMİZ, KULLANICI DOSTU ÜST BAR */}
      <header className="main-header">
        <div className="header-top-row">
          <div className="brand-block" onClick={() => switchTab('tarifler')}>
            <div className="brand-logo">
              <ChefHat size={22} />
            </div>
            <div className="brand-text">
              <div className="brand-title-line">
                <h1>Ne Pişirsem?</h1>
              </div>
            </div>
          </div>

          <div className="header-actions-row">
            {/* KİŞİ SAYISI KONTROLÜ */}
            <div className="global-servings-pill">
              <Users size={15} className="text-rose shrink-0" />
              <button
                className="mini-step-btn"
                onClick={() => setGlobalServings((s) => Math.max(1, s - 1))}
                aria-label="Kişi azalt"
              >
                <Minus size={13} />
              </button>
              <strong className="servings-pill-val">{globalServings} Kişilik</strong>
              <button
                className="mini-step-btn"
                onClick={() => setGlobalServings((s) => Math.min(20, s + 1))}
                aria-label="Kişi artır"
              >
                <Plus size={13} />
              </button>
            </div>

            <button
              className="surprise-me-btn"
              onClick={pickRandomRecipe}
              title="Rastgele Yemek Öner"
            >
              <Dices size={16} />
              <span className="surprise-btn-label">Bana Öner</span>
            </button>
          </div>
        </div>
      </header>

      {/* ANA ÇALIŞMA ALANI */}
      <main className="main-workspace">
        {/* SOL PANEL: KİLERİM */}
        <section
          className={`workspace-panel pantry-panel ${
            activeTab === 'kiler' ? 'tab-active' : 'tab-inactive'
          }`}
        >
          <div className="panel-card">
            <div className="panel-card-header pantry-header-row">
              <div className="header-title-wrap">
                <h2>🧺 Kilerim ({pantry.length})</h2>
              </div>
              <div className="header-btn-group">
                <button className="share-list-btn" onClick={selectAllVisibleIngredients}>
                  <Check size={13} /> Tümünü Seç
                </button>
                <button className="clear-pantry-btn" onClick={clearPantry}>
                  <Trash2 size={13} /> Sıfırla
                </button>
              </div>
            </div>

            {/* HIZLI DOLAP PAKETLERİ */}
            <div className="presets-grid mb-3">
              {QUICK_PANTRY_PRESETS.map((preset) => {
                const isAllIncluded = preset.items.every((it) =>
                  pantry.includes(it.toLowerCase())
                );
                return (
                  <button
                    key={preset.id}
                    className={`preset-chip ${isAllIncluded ? 'preset-active' : ''}`}
                    onClick={() => applyPreset(preset.items)}
                  >
                    <span>{preset.title}</span>
                    {isAllIncluded ? (
                      <Check size={13} className="shrink-0" />
                    ) : (
                      <Plus size={13} className="shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* MALZEME ARAMA */}
            <div className="search-input-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={ingredientSearch}
                onChange={(e) => setIngredientSearch(e.target.value)}
                placeholder="Malzeme ara (Örn: kıyma, mercimek, patlıcan...)"
              />
              {ingredientSearch && (
                <button className="clear-search" onClick={() => setIngredientSearch('')}>
                  ×
                </button>
              )}
            </div>

            {/* MALZEME KATEGORİLERİ */}
            <div className="category-pills-row">
              {INGREDIENT_CATEGORIES.map((cat) => (
                <button
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
              {filteredIngredients.map((item) => {
                const isSelected = pantry.includes(item.name.toLowerCase());
                return (
                  <button
                    key={item.id}
                    className={`ingredient-chip-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleIngredient(item.name)}
                  >
                    <span className="ing-emoji">{item.emoji}</span>
                    <span className="ing-label">
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </span>
                    <span className="ing-check">
                      {isSelected ? <Check size={12} /> : <Plus size={12} />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mobile-cta-footer">
              <button
                className="primary-cta-btn"
                onClick={() => switchTab('tarifler')}
              >
                <Sparkles size={17} />
                <span>
                  Tarifleri Gör ({readyToCookCount} Hazır Yemek)
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* SAĞ PANEL: TARİFLER / GÜNÜN MENÜSÜ / FAVORİLER / ALIŞVERİŞ */}
        <section
          className={`workspace-panel results-panel ${
            activeTab !== 'kiler' ? 'tab-active' : 'tab-inactive'
          }`}
        >
          {/* 1) GÜNÜN MENÜSÜ SEKMESİ */}
          {activeTab === 'menu' ? (
            <div className="panel-card">
              <div className="panel-card-header">
                <div className="header-title-wrap">
                  <h2>🍽️ Günün 4 Çeşit Menüsü ({globalServings} Kişilik)</h2>
                </div>
                <button
                  className="surprise-me-btn"
                  onClick={() => setMenuSeed((s) => s + 1)}
                >
                  <Dices size={15} /> Menüyü Değiştir
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
                      onClick={() => setSelectedMatchedRecipe(matched)}
                    >
                      <div className="menu-slot-role">{slot.role}</div>
                      <div className="menu-slot-body">
                        <div className="menu-slot-thumb">
                          <DishVisualHeader
                            title={recipe.title}
                            category={recipe.category}
                            emoji={recipe.emoji}
                            height={84}
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
                        <ChevronRight size={18} className="text-muted shrink-0" />
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
                </div>
                {shoppingList.length > 0 && (
                  <div className="header-btn-group">
                    <button
                      className="share-list-btn"
                      onClick={() => {
                        const text = `🛒 *Mutfak Alışveriş Listem*\n\n${shoppingList
                          .map(
                            (i) =>
                              `${i.checked ? '✅' : '⬜'} ${i.measure} ${i.name} (${i.recipeTitle})`
                          )
                          .join('\n')}`;
                        navigator.clipboard?.writeText(text);
                        alert('Alışveriş listeniz kopyalandı!');
                      }}
                    >
                      <Share2 size={13} /> Paylaş
                    </button>
                    <button className="clear-pantry-btn" onClick={clearShoppingList}>
                      <Trash2 size={13} /> Temizle
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={addCustomShoppingItem} className="shopping-add-form">
                <input
                  type="text"
                  value={customShoppingInput}
                  onChange={(e) => setCustomShoppingInput(e.target.value)}
                  placeholder="Malzeme ekle (Örn: 1 kg yoğurt...)"
                />
                <button type="submit">
                  <Plus size={15} /> Ekle
                </button>
              </form>

              {shoppingList.length === 0 ? (
                <div className="empty-state-box">
                  <ShoppingBasket size={40} className="text-rose" />
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
                  className={`origin-tab-btn ${cuisineFilter === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    setCuisineFilter('all');
                    setSelectedCity('tumu');
                  }}
                >
                  <span>🍽️ Tümü</span>
                  <span className="origin-count">{matchedRecipes.length}</span>
                </button>
                <button
                  className={`origin-tab-btn ${cuisineFilter === 'turkish' ? 'active' : ''}`}
                  onClick={() => setCuisineFilter('turkish')}
                >
                  <span>🇹🇷 Türk Mutfağı</span>
                  <span className="origin-count">{turkishCount}</span>
                </button>
                <button
                  className={`origin-tab-btn ${cuisineFilter === 'world' ? 'active' : ''}`}
                  onClick={() => {
                    setCuisineFilter('world');
                    setSelectedCity('tumu');
                  }}
                >
                  <span>🌍 Dünya</span>
                  <span className="origin-count">{worldCount}</span>
                </button>
              </div>

              {/* ARAMA & SADECE EKSİKSİZLER FİLTRESİ */}
              <div className="recipes-filter-toolbar">
                <div className="search-input-box flex-1">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    value={recipeSearch}
                    onChange={(e) => setRecipeSearch(e.target.value)}
                    placeholder="Yemek, şehir veya malzeme ara (Örn: Gaziantep, mantı, kebap...)"
                  />
                  {recipeSearch && (
                    <button className="clear-search" onClick={() => setRecipeSearch('')}>
                      ×
                    </button>
                  )}
                </div>

                <button
                  className={`ready-filter-toggle ${onlyReadyToCook ? 'active' : ''}`}
                  onClick={() => setOnlyReadyToCook(!onlyReadyToCook)}
                >
                  <CheckCircle2 size={15} />
                  <span>Hazır ({readyToCookCount})</span>
                </button>
              </div>

              {/* YEMEK KATEGORİLERİ */}
              <div className="category-pills-row">
                {RECIPE_CATEGORIES.map((cat) => (
                  <button
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

              {/* TARİF KARTLARI IZGARASI (SADE, NET, ORİJİNAL FOTOĞRAFLI) */}
              {displayedRecipes.length === 0 ? (
                <div className="empty-state-box">
                  <ChefHat size={40} className="text-rose" />
                  <h3>Tarif Bulunamadı</h3>
                  <p>Arama kriterini veya filtreyi değiştirebilirsiniz.</p>
                  <button
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
                    {displayedRecipes.map((matched) => {
                      const { recipe, missingIngredients, canCookImmediately } = matched;
                      const isFav = favorites.includes(recipe.id);

                      return (
                        <article
                          key={recipe.id}
                          className={`recipe-card ${canCookImmediately ? 'ready-card' : ''}`}
                          onClick={() => setSelectedMatchedRecipe(matched)}
                        >
                          <DishVisualHeader
                            title={recipe.title}
                            category={recipe.category}
                            emoji={recipe.emoji}
                            height={172}
                            className="recipe-card-media"
                          >
                            <div className="recipe-card-badges">
                              {canCookImmediately ? (
                                <span className="status-pill ready">
                                  <CheckCircle2 size={12} /> Hemen Pişir
                                </span>
                              ) : (
                                <span className="status-pill missing">
                                  <AlertCircle size={12} /> {missingIngredients.length} Eksik
                                </span>
                              )}
                            </div>

                            {recipe.countryLabel && (
                              <span className="country-origin-badge">{recipe.countryLabel}</span>
                            )}

                            <button
                              className={`card-fav-btn ${isFav ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(recipe.id);
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
                                <Check size={13} /> Tüm malzemeler evinizde hazır
                              </div>
                            ) : (
                              <div className="missing-preview-line">
                                <span>Eksik: </span>
                                <strong>
                                  {missingIngredients
                                    .slice(0, 3)
                                    .map((m) => m.name)
                                    .join(', ')}
                                  {missingIngredients.length > 3 &&
                                    ` +${missingIngredients.length - 3}`}
                                </strong>
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {activeTab === 'tarifler' && visibleCount < filteredRecipes.length && (
                    <div className="load-more-wrap">
                      <button
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

      {/* MOBİL ALT NAVİGASYON BAR */}
      <nav className="mobile-bottom-nav">
        <button
          className={`nav-tab-item ${activeTab === 'kiler' ? 'active' : ''}`}
          onClick={() => switchTab('kiler')}
        >
          <div className="badge-wrap">
            <ShoppingBasket size={20} />
            <span className="nav-count-pill">{pantry.length}</span>
          </div>
          <span className="nav-label">Kilerim</span>
        </button>

        <button
          className={`nav-tab-item ${activeTab === 'tarifler' ? 'active' : ''}`}
          onClick={() => switchTab('tarifler')}
        >
          <div className="badge-wrap">
            <ChefHat size={20} />
            <span className="nav-count-pill">{readyToCookCount}</span>
          </div>
          <span className="nav-label">Tarifler</span>
        </button>

        <button
          className={`nav-tab-item ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => switchTab('menu')}
        >
          <UtensilsCrossed size={20} />
          <span className="nav-label">Menü</span>
        </button>

        <button
          className={`nav-tab-item ${activeTab === 'favoriler' ? 'active' : ''}`}
          onClick={() => switchTab('favoriler')}
        >
          <div className="badge-wrap">
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className="nav-count-pill">{favorites.length}</span>
            )}
          </div>
          <span className="nav-label">Favoriler</span>
        </button>

        <button
          className={`nav-tab-item ${activeTab === 'alisveris' ? 'active' : ''}`}
          onClick={() => switchTab('alisveris')}
        >
          <div className="badge-wrap">
            <Sparkles size={20} />
            {uncheckedShoppingCount > 0 && (
              <span className="nav-badge">{uncheckedShoppingCount}</span>
            )}
          </div>
          <span className="nav-label">Liste</span>
        </button>
      </nav>

      {/* TARİF DETAY & PORSİYON HESAPLAMA MODALI */}
      <RecipeDetailModal
        matchedRecipe={selectedMatchedRecipe}
        onClose={() => setSelectedMatchedRecipe(null)}
        defaultServings={globalServings}
        isFavorite={
          selectedMatchedRecipe
            ? favorites.includes(selectedMatchedRecipe.recipe.id)
            : false
        }
        onToggleFavorite={toggleFavorite}
        onAddMissingToShoppingList={addMissingToShoppingList}
        pantryItems={pantry}
      />
    </div>
  );
}

export default App;
