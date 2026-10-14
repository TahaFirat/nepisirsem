import React, { useState, useEffect } from 'react';
import {
  X,
  Users,
  Clock,
  ChefHat,
  Check,
  ShoppingBag,
  Heart,
  Share2,
  Play,
  Pause,
  RotateCcw,
  Utensils,
  AlertCircle,
  CheckCircle2,
  Minus,
  Plus,
  PlayCircle,
  ExternalLink,
  Volume2,
  VolumeX,
} from 'lucide-react';
import type { MatchedRecipe } from '../types/recipe';
import { scaleRecipeIngredients } from '../utils/portionScaler';
import type { ScaledIngredientResult } from '../utils/portionScaler';
import {
  DishVisualHeader,
  getYoutubeRecipeSearchUrl,
  getNefisYemekSearchUrl,
} from './DishVisualHeader';

interface RecipeDetailModalProps {
  matchedRecipe: MatchedRecipe | null;
  onClose: () => void;
  defaultServings: number;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  onAddMissingToShoppingList: (
    items: { name: string; measure: string; recipeTitle: string }[]
  ) => void;
  pantryItems: string[];
}

const PORTION_NUMBERS = [1, 2, 4, 6, 8, 12];

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  matchedRecipe,
  onClose,
  defaultServings,
  isFavorite,
  onToggleFavorite,
  onAddMissingToShoppingList,
  pantryItems,
}) => {
  const [servings, setServings] = useState<number>(defaultServings || 4);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [addedToCartBanner, setAddedToCartBanner] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    if (matchedRecipe) {
      setServings(defaultServings || matchedRecipe.recipe.baseServings || 4);
      setCompletedSteps([]);
      setActiveTimerStep(null);
      setIsTimerRunning(false);
      setAddedToCartBanner(false);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    };
  }, [matchedRecipe, defaultServings]);

  useEffect(() => {
    if (!isTimerRunning || timerSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setTimerSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  if (!matchedRecipe) return null;

  const { recipe, missingIngredients } = matchedRecipe;
  const scaledIngredients: ScaledIngredientResult[] = scaleRecipeIngredients(
    recipe.ingredients,
    recipe.baseServings,
    servings
  );

  const youtubeUrl = getYoutubeRecipeSearchUrl(recipe.title);
  const nefisYemekUrl = getNefisYemekSearchUrl(recipe.title);

  const normalizedPantry = new Set(pantryItems.map((p) => p.toLowerCase().trim()));

  const isIngredientInPantry = (name: string) => {
    const n = name.toLowerCase().trim();
    return (
      normalizedPantry.has(n) ||
      n === 'su' ||
      n === 'tuz' ||
      !missingIngredients.some((m) => m.name.toLowerCase() === n)
    );
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const startStepTimer = (idx: number, minutes: number) => {
    if (activeTimerStep === idx) {
      setIsTimerRunning(!isTimerRunning);
      return;
    }
    setActiveTimerStep(idx);
    setTimerSecondsLeft(minutes * 60);
    setIsTimerRunning(true);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleAddMissing = () => {
    const missingScaled = scaledIngredients
      .filter((ing) => !isIngredientInPantry(ing.name))
      .map((ing) => ({
        name: ing.name,
        measure: ing.formattedMeasure,
        recipeTitle: `${recipe.title} (${servings} Kişilik)`,
      }));

    if (missingScaled.length > 0) {
      onAddMissingToShoppingList(missingScaled);
      setAddedToCartBanner(true);
      setTimeout(() => setAddedToCartBanner(false), 3000);
    }
  };

  const handleShare = () => {
    const text = `🍲 *${recipe.title}* (${servings} Kişilik)\n\n📝 *Malzemeler:*\n${scaledIngredients
      .map((i) => `• ${i.formattedMeasure} ${i.name}`)
      .join('\n')}\n\n👩‍🍳 *Yapılışı:*\n${recipe.steps
      .map((s, idx) => `${idx + 1}) ${s.instruction}`)
      .join('\n')}`;

    if (navigator.share) {
      navigator.share({ title: recipe.title, text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text);
      alert('Tarif panoya kopyalandı!');
    }
  };

  const toggleVoiceRead = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const fullText = `${recipe.title}, ${servings} kişilik tarif. Malzemeler: ${scaledIngredients
      .map((i) => `${i.formattedMeasure} ${i.name}`)
      .join(', ')}. Hazırlanışı: ${recipe.steps
      .map((s) => `${s.title}. ${s.instruction}`)
      .join(' ')}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.98;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Üst Orijinal Yemek Fotoğrafı ve Başlık */}
        <DishVisualHeader
          title={recipe.title}
          category={recipe.category}
          emoji={recipe.emoji}
          height={230}
          className="modal-hero"
        >
          <div className="modal-top-actions">
            <button
              className={`circle-action-btn ${isFavorite ? 'fav-active' : ''}`}
              onClick={() => onToggleFavorite(recipe.id)}
              title="Favorilere Ekle"
            >
              <Heart size={19} fill={isFavorite ? '#E11D48' : 'none'} />
            </button>
            <button className="circle-action-btn" onClick={handleShare} title="Paylaş">
              <Share2 size={19} />
            </button>
            <button className="circle-action-btn close-btn" onClick={onClose} title="Kapat">
              <X size={21} />
            </button>
          </div>

          <div className="modal-hero-content">
            <span className="modal-badge">
              {recipe.countryLabel ? `${recipe.countryLabel} • ` : ''}
              {recipe.prepTime + recipe.cookTime} dk • {recipe.caloriesPerServing} kcal
            </span>
            <h2 className="modal-title">{recipe.title}</h2>
          </div>
        </DishVisualHeader>

        <div className="modal-scroll-body">
          {/* 1) KİŞİ SAYISI AYARI (SADE & HIZLI) */}
          <div className="portion-calculator-card">
            <div className="portion-header">
              <div className="portion-title-group">
                <div className="portion-icon-box">
                  <Users size={19} />
                </div>
                <div>
                  <h3>Kaç Kişilik?</h3>
                  <p>Ölçüler kişi sayısına göre otomatik hesaplanır</p>
                </div>
              </div>

              <div className="portion-stepper">
                <button
                  className="stepper-btn"
                  onClick={() => setServings((s) => Math.max(1, s - 1))}
                  disabled={servings <= 1}
                >
                  <Minus size={16} />
                </button>
                <div className="stepper-value">
                  <span className="stepper-number">{servings}</span>
                  <span className="stepper-label">Kişilik</span>
                </div>
                <button
                  className="stepper-btn"
                  onClick={() => setServings((s) => Math.min(20, s + 1))}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="portion-presets-row">
              {PORTION_NUMBERS.map((num) => (
                <button
                  key={num}
                  className={`portion-preset-chip ${servings === num ? 'active' : ''}`}
                  onClick={() => setServings(num)}
                >
                  <span className="preset-count">{num} Kişi</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2) MALZEME LİSTESİ (NET & TEMİZ) */}
          <div className="modal-section">
            <div className="section-header-row">
              <h3 className="section-heading">
                <Utensils size={18} className="text-rose" />
                <span>Malzemeler ({servings} Kişilik)</span>
              </h3>
              {missingIngredients.length > 0 && (
                <button className="add-missing-btn" onClick={handleAddMissing}>
                  <ShoppingBag size={14} />
                  <span>Eksikleri Listeye Ekle ({missingIngredients.length})</span>
                </button>
              )}
            </div>

            {addedToCartBanner && (
              <div className="cart-success-toast">
                <CheckCircle2 size={16} />
                <span>Eksik malzemeler alışveriş listenize eklendi!</span>
              </div>
            )}

            <div className="scaled-ingredients-grid">
              {scaledIngredients.map((ing, idx) => {
                const inPantry = isIngredientInPantry(ing.name);
                return (
                  <div
                    key={idx}
                    className={`scaled-ingredient-row ${
                      inPantry ? 'in-pantry' : 'missing-pantry'
                    }`}
                  >
                    <div className="ing-status-icon">
                      {inPantry ? <Check size={15} /> : <AlertCircle size={15} />}
                    </div>
                    <div className="ing-info">
                      <span className="ing-name">
                        {ing.name.charAt(0).toUpperCase() + ing.name.slice(1)}
                      </span>
                    </div>
                    <div className="ing-measure-badge">
                      <strong className="measure-primary">{ing.formattedMeasure}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3) ADIM ADIM HAZIRLANIŞ */}
          <div className="modal-section">
            <div className="section-header-row">
              <h3 className="section-heading">
                <Clock size={18} className="text-rose" />
                <span>Hazırlanışı</span>
              </h3>

              <button
                className={`voice-read-btn ${isSpeaking ? 'speaking' : ''}`}
                onClick={toggleVoiceRead}
              >
                {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isSpeaking ? 'Durdur' : 'Sesli Oku'}</span>
              </button>
            </div>

            <div className="steps-list">
              {recipe.steps.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                const isTimerActive = activeTimerStep === idx;

                return (
                  <div
                    key={idx}
                    className={`recipe-step-card ${isDone ? 'step-done' : ''}`}
                    onClick={() => toggleStep(idx)}
                  >
                    <div className="step-number-badge">
                      {isDone ? <Check size={15} /> : idx + 1}
                    </div>
                    <div className="step-body">
                      <div className="step-title-row">
                        <h4>{step.title}</h4>
                        {step.timerMinutes && (
                          <button
                            className={`step-timer-btn ${
                              isTimerActive ? 'timer-running' : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              startStepTimer(idx, step.timerMinutes!);
                            }}
                          >
                            {isTimerActive ? (
                              <>
                                {isTimerRunning ? <Pause size={12} /> : <Play size={12} />}
                                <span>{formatTimer(timerSecondsLeft)}</span>
                              </>
                            ) : (
                              <>
                                <Clock size={12} />
                                <span>{step.timerMinutes} dk</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <p className="step-instruction">{step.instruction}</p>

                      {isTimerActive && (
                        <div
                          className="active-timer-bar"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="timer-status-text">
                            ⏱️ Kalan Süre:{' '}
                            <span className="timer-countdown">
                              {formatTimer(timerSecondsLeft)}
                            </span>
                            {timerSecondsLeft === 0 && ' — Süre Doldu! 🔔'}
                          </div>
                          <div className="timer-controls">
                            <button
                              className="timer-mini-btn"
                              onClick={() => setIsTimerRunning(!isTimerRunning)}
                            >
                              {isTimerRunning ? 'Duraklat' : 'Devam'}
                            </button>
                            <button
                              className="timer-mini-btn"
                              onClick={() => {
                                setTimerSecondsLeft(step.timerMinutes! * 60);
                                setIsTimerRunning(false);
                              }}
                            >
                              <RotateCcw size={12} /> Sıfırla
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4) PÜF NOKTASI & VİDEO / KAYNAK BAĞLANTILARI */}
          <div className="chef-tip-box">
            <div className="tip-header">
              <ChefHat size={17} />
              <h4>Püf Noktası & Servis Önerisi</h4>
            </div>
            <p>
              {recipe.chefTip} {recipe.servingSuggestion}
            </p>
          </div>

          <div className="guides-btn-grid">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="guide-link-btn youtube-btn"
            >
              <PlayCircle size={17} className="shrink-0" />
              <div>
                <strong>YouTube Video Tarifi</strong>
                <span>Yapılış videosunu izle</span>
              </div>
              <ExternalLink size={13} className="ml-auto shrink-0" />
            </a>

            <a
              href={nefisYemekUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="guide-link-btn nefisyemek-btn"
            >
              <Utensils size={16} className="shrink-0" />
              <div>
                <strong>Nefis Yemek Tarifleri</strong>
                <span>Alternatif tarif & yorumlar</span>
              </div>
              <ExternalLink size={13} className="ml-auto shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
