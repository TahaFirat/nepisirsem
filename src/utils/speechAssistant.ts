/**
 * Doğal Yapay Zeka (Neural VITS) Sesli Tarif Asistanı
 *
 * Doğal insan sesi sentezi için MIT Lisanslı @mintplex-labs/piper-tts-web
 * (https://github.com/Mintplex-Labs/piper-tts-web) ve Rhasspy Piper Türkçe
 * nöral ses modelleri (tr_TR-dfki-medium, tr_TR-fettah-medium) kullanılır.
 * İnternet yokken veya ilk indirme başarısız olursa cihazın yerel ses motoruna
 * (iOS AVSpeechSynthesizer / Web Speech API) otomatik yedek geçiş yapar.
 */
import {
  isNativeIosBridgeAvailable,
  prepareNativeAudioSession,
  speakTextNativeIos,
  stopSpeakNativeIos,
} from './nativeBridge';

export type NeuralVoiceOptionId = 'tr_TR-dfki-medium' | 'tr_TR-fettah-medium' | 'system';

export interface VoiceOptionItem {
  id: NeuralVoiceOptionId;
  label: string;
}

export const TURKISH_VOICE_OPTIONS: VoiceOptionItem[] = [
  { id: 'tr_TR-dfki-medium', label: '✨ Doğal AI Ses (Kadın / Defne)' },
  { id: 'tr_TR-fettah-medium', label: '✨ Doğal AI Ses (Erkek / Fettah)' },
  { id: 'system', label: '⚡ Hızlı Sistem Sesi (Çevrimdışı)' },
];

interface SpeechWindow extends Window {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
  __nepisirsemOnSpeechBoundary?: (token: number, charIndex: number, charLength: number) => void;
  __nepisirsemOnSpeechEnd?: (token: number) => void;
}

let activeSpeechToken = 0;
let sharedAudioCtx: AudioContext | null = null;
let currentSourceNode: AudioBufferSourceNode | null = null;
let wordSyncInterval: ReturnType<typeof setInterval> | null = null;
let lastLoadedNeuralVoice: string | null = null;

// Adım metinleri ve sesler için bellek içi WAV önbelleği (geri/ileri adımda 0ms bekleme)
const audioBufferCache = new Map<string, AudioBuffer>();

function getOrCreateAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const win = window as SpeechWindow;
  const Ctor = win.AudioContext || win.webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new Ctor();
  }
  return sharedAudioCtx;
}

/**
 * iOS WKWebView & Safari güvenlik politikası gereği ses çalma iznini
 * doğrudan kullanıcının dokunma (onClick) anında senkron olarak açar.
 */
export function unlockAudioForPlayback(): void {
  if (typeof window === 'undefined') return;
  prepareNativeAudioSession();
  const ctx = getOrCreateAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  try {
    const emptyBuffer = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = emptyBuffer;
    src.connect(ctx.destination);
    src.start(0);
  } catch {
    // ignore
  }
}

export function stopAllSpeech(): void {
  activeSpeechToken += 1;

  if (wordSyncInterval) {
    clearInterval(wordSyncInterval);
    wordSyncInterval = null;
  }

  if (currentSourceNode) {
    try {
      currentSourceNode.onended = null;
      currentSourceNode.stop();
      currentSourceNode.disconnect();
    } catch {
      // ignore
    }
    currentSourceNode = null;
  }

  if (isNativeIosBridgeAvailable()) {
    stopSpeakNativeIos();
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

interface WordSpan {
  start: number;
  length: number;
}

function tokenizeWordSpans(text: string): WordSpan[] {
  const spans: WordSpan[] = [];
  const regex = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    spans.push({ start: match.index, length: match[0].length });
  }
  return spans;
}

function speakWithSystemFallback(options: {
  token: number;
  text: string;
  rate: number;
  onWordBoundary: (charIndex: number, charLength: number) => void;
  onFinish: () => void;
  onError?: () => void;
}): void {
  if (typeof window === 'undefined') return;
  const win = window as SpeechWindow;

  if (isNativeIosBridgeAvailable()) {
    win.__nepisirsemOnSpeechBoundary = (token: number, charIndex: number, charLength: number) => {
      if (token === options.token) {
        options.onWordBoundary(charIndex, charLength);
      }
    };
    win.__nepisirsemOnSpeechEnd = (token: number) => {
      if (token === options.token) {
        options.onFinish();
      }
    };
    const ok = speakTextNativeIos(options.text, options.rate, undefined, options.token);
    if (ok) return;
  }

  if (!('speechSynthesis' in window)) {
    options.onError?.();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(options.text);
  utterance.lang = 'tr-TR';
  utterance.rate = Math.max(0.75, Math.min(1.4, options.rate));

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    const tr = voices.find((v) => v.lang.toLowerCase().startsWith('tr'));
    if (tr) utterance.voice = tr;
  }

  utterance.onboundary = (event: SpeechSynthesisEvent) => {
    if (options.token !== activeSpeechToken) return;
    const len = typeof event.charLength === 'number' && event.charLength > 0 ? event.charLength : 6;
    options.onWordBoundary(event.charIndex, len);
  };

  utterance.onend = () => {
    if (options.token === activeSpeechToken) {
      options.onFinish();
    }
  };

  utterance.onerror = () => {
    if (options.token === activeSpeechToken) {
      options.onError?.();
    }
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * Doğal Türkçe Nöral AI sesiyle metni sentezler ve çalar.
 * Model cihazda yoksa ilk seferinde indirip önbelleğe alır; sonraki tüm okumalarda
 * internetsiz ve anında doğal insan sesi üretir.
 */
export async function speakStepNatural(options: {
  text: string;
  voiceId: NeuralVoiceOptionId;
  rate: number;
  onStatusChange?: (statusText: string | null) => void;
  onDownloadProgress?: (percent: number | null) => void;
  onWordBoundary: (charIndex: number, charLength: number) => void;
  onFinish: () => void;
  onError?: () => void;
}): Promise<void> {
  if (typeof window === 'undefined') return;
  stopAllSpeech();

  const myToken = ++activeSpeechToken;

  if (options.voiceId === 'system') {
    options.onDownloadProgress?.(null);
    options.onStatusChange?.('⚡ Cihaz Sesli Asistanı');
    speakWithSystemFallback({
      token: myToken,
      text: options.text,
      rate: options.rate,
      onWordBoundary: options.onWordBoundary,
      onFinish: options.onFinish,
      onError: options.onError,
    });
    return;
  }

  try {
    const cacheKey = `${options.voiceId}::${options.text}`;
    let decodedBuffer = audioBufferCache.get(cacheKey);
    const ctx = getOrCreateAudioContext();

    if (!ctx) {
      throw new Error('AudioContext not available');
    }

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    if (!decodedBuffer) {
      options.onStatusChange?.('🎙️ Doğal insan sesi hazırlanıyor...');
      const piper = await import('@mintplex-labs/piper-tts-web');

      if (myToken !== activeSpeechToken) return;

      // Piper TtsSession singleton farklı ses seçildiğinde sıfırlanmalı
      const SessionClass = piper.TtsSession as unknown as {
        _instance: unknown;
        new (opts: {
          voiceId: 'tr_TR-dfki-medium' | 'tr_TR-fettah-medium';
          progress?: (p: { total: number; loaded: number }) => void;
        }): {
          predict: (txt: string) => Promise<Blob>;
        };
      };

      if (lastLoadedNeuralVoice && lastLoadedNeuralVoice !== options.voiceId) {
        SessionClass._instance = null;
      }

      const session = new SessionClass({
        voiceId: options.voiceId,
        progress: (p) => {
          if (myToken !== activeSpeechToken) return;
          if (p.total > 0) {
            const pct = Math.min(99, Math.round((p.loaded / p.total) * 100));
            options.onDownloadProgress?.(pct);
            options.onStatusChange?.(`📥 Doğal Türkçe ses indiriliyor (%${pct}) — tek seferlik`);
          }
        },
      });

      const wavBlob = await session.predict(options.text);
      if (myToken !== activeSpeechToken) return;

      lastLoadedNeuralVoice = options.voiceId;
      options.onDownloadProgress?.(null);

      const arrayBuf = await wavBlob.arrayBuffer();
      if (myToken !== activeSpeechToken) return;

      decodedBuffer = await ctx.decodeAudioData(arrayBuf);
      if (myToken !== activeSpeechToken) return;

      audioBufferCache.set(cacheKey, decodedBuffer);
      // Belleği hafif tutmak için en fazla 30 adım önbellekte tut
      if (audioBufferCache.size > 30) {
        const firstKey = audioBufferCache.keys().next().value;
        if (firstKey) audioBufferCache.delete(firstKey);
      }
    }

    if (myToken !== activeSpeechToken) return;

    options.onDownloadProgress?.(null);
    options.onStatusChange?.('✨ Doğal Türkçe AI Ses');

    const source = ctx.createBufferSource();
    source.buffer = decodedBuffer;
    source.playbackRate.value = Math.max(0.75, Math.min(1.4, options.rate));
    source.connect(ctx.destination);
    currentSourceNode = source;

    const totalPlaySeconds = decodedBuffer.duration / source.playbackRate.value;
    const spans = tokenizeWordSpans(options.text);
    const startTime = ctx.currentTime;

    if (spans.length > 0 && totalPlaySeconds > 0.1) {
      wordSyncInterval = setInterval(() => {
        if (myToken !== activeSpeechToken) {
          if (wordSyncInterval) clearInterval(wordSyncInterval);
          return;
        }
        const elapsed = Math.max(0, ctx.currentTime - startTime);
        const progress = Math.min(0.999, elapsed / totalPlaySeconds);
        const idx = Math.min(spans.length - 1, Math.floor(progress * spans.length));
        const span = spans[idx];
        if (span) {
          options.onWordBoundary(span.start, span.length);
        }
      }, 90);
    }

    source.onended = () => {
      if (wordSyncInterval) {
        clearInterval(wordSyncInterval);
        wordSyncInterval = null;
      }
      if (currentSourceNode === source) {
        currentSourceNode = null;
      }
      if (myToken === activeSpeechToken) {
        options.onFinish();
      }
    };

    source.start(0);
  } catch (err) {
    console.warn('Doğal AI ses motoru yedek moda geçti:', err);
    if (myToken !== activeSpeechToken) return;
    options.onDownloadProgress?.(null);
    options.onStatusChange?.('⚡ Çevrimdışı Sistem Sesi (Yedek)');
    speakWithSystemFallback({
      token: myToken,
      text: options.text,
      rate: options.rate,
      onWordBoundary: options.onWordBoundary,
      onFinish: options.onFinish,
      onError: options.onError,
    });
  }
}
