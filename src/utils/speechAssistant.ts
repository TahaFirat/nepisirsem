/**
 * Sesli Tarif Asistanı & Sesli Komut Motoru
 *
 * Text-to-Speech (getVoices, hız ayarı, anlık kelime vurgulama / onboundary) ve
 * Speech-to-Text (Türkçe sesli komut algılama) mimarisi MIT Lisanslı
 * ErenBekman/speech-text-voice (https://github.com/ErenBekman/speech-text-voice)
 * projesinden esinlenilerek ve geliştirilerek uyarlanmıştır.
 *
 * MIT License — Commercial & App Store distribution permitted.
 */
import {
  isNativeIosBridgeAvailable,
  requestNativeTurkishVoices,
  speakTextNativeIos,
  stopSpeakNativeIos,
} from './nativeBridge';

export type VoiceCommandAction = 'next' | 'prev' | 'stop' | 'play' | 'timer';

interface SpeechRecognitionAlternativeLike {
  transcript?: string;
}

interface SpeechRecognitionResultLike {
  0?: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  results?: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionInstanceLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((ev: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechWindow extends Window {
  __nepisirsemOnNativeVoices?: (voices: string[]) => void;
  __nepisirsemOnSpeechBoundary?: (token: number, charIndex: number, charLength: number) => void;
  __nepisirsemOnSpeechEnd?: (token: number) => void;
  SpeechRecognition?: new () => SpeechRecognitionInstanceLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstanceLike;
}

let activeSpeechToken = 0;

function pickPreferredVoiceName(names: string[]): string {
  const yelda = names.find((n) => n.toLocaleLowerCase('tr-TR').includes('yelda'));
  if (yelda) return yelda;
  const cem = names.find((n) => n.toLocaleLowerCase('tr-TR').includes('cem'));
  if (cem) return cem;
  return names[0] || 'Türkçe Asistan';
}

export function loadAvailableTurkishVoices(onVoicesLoaded: (voices: string[], defaultVoice: string) => void): void {
  if (typeof window === 'undefined') return;
  const win = window as SpeechWindow;

  if (isNativeIosBridgeAvailable()) {
    win.__nepisirsemOnNativeVoices = (names: string[]) => {
      const list = Array.isArray(names) && names.length > 0 ? names : ['Yelda (iOS Türkçe)'];
      onVoicesLoaded(list, pickPreferredVoiceName(list));
    };
    requestNativeTurkishVoices();
    return;
  }

  if (!('speechSynthesis' in window)) return;

  const extractVoices = () => {
    const all = window.speechSynthesis.getVoices();
    if (!all || all.length === 0) return false;
    const trVoices = all
      .filter((v) => v.lang.toLowerCase().startsWith('tr'))
      .map((v) => v.name);
    const list = trVoices.length > 0 ? Array.from(new Set(trVoices)) : [all[0].name];
    onVoicesLoaded(list, pickPreferredVoiceName(list));
    return true;
  };

  if (!extractVoices()) {
    const prevHandler = window.speechSynthesis.onvoiceschanged;
    window.speechSynthesis.onvoiceschanged = () => {
      extractVoices();
      if (typeof prevHandler === 'function') {
        prevHandler.call(window.speechSynthesis, new Event('voiceschanged'));
      }
    };
  }
}

export function stopAllSpeech(): void {
  activeSpeechToken += 1;
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

export function speakStepText(options: {
  text: string;
  rate: number;
  voiceName?: string;
  onWordBoundary: (charIndex: number, charLength: number) => void;
  onFinish: () => void;
  onError?: () => void;
}): void {
  if (typeof window === 'undefined') return;
  stopAllSpeech();

  const myToken = ++activeSpeechToken;
  const win = window as SpeechWindow;

  if (isNativeIosBridgeAvailable()) {
    win.__nepisirsemOnSpeechBoundary = (token: number, charIndex: number, charLength: number) => {
      if (token === myToken) {
        options.onWordBoundary(charIndex, charLength);
      }
    };
    win.__nepisirsemOnSpeechEnd = (token: number) => {
      if (token === myToken) {
        options.onFinish();
      }
    };
    const ok = speakTextNativeIos(options.text, options.rate, options.voiceName, myToken);
    if (ok) return;
  }

  if (!('speechSynthesis' in window)) {
    options.onError?.();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(options.text);
  utterance.lang = 'tr-TR';
  utterance.rate = Math.max(0.65, Math.min(1.5, options.rate));

  const voices = window.speechSynthesis.getVoices();
  if (options.voiceName && voices.length > 0) {
    const matched = voices.find((v) => v.name === options.voiceName);
    if (matched) utterance.voice = matched;
  } else if (voices.length > 0) {
    const tr = voices.find((v) => v.lang.toLowerCase().startsWith('tr'));
    if (tr) utterance.voice = tr;
  }

  utterance.onboundary = (event: SpeechSynthesisEvent) => {
    if (myToken !== activeSpeechToken) return;
    const len = typeof event.charLength === 'number' && event.charLength > 0 ? event.charLength : 6;
    options.onWordBoundary(event.charIndex, len);
  };

  utterance.onend = () => {
    if (myToken === activeSpeechToken) {
      options.onFinish();
    }
  };

  utterance.onerror = () => {
    if (myToken === activeSpeechToken) {
      options.onError?.();
    }
  };

  window.speechSynthesis.speak(utterance);
}

export function isVoiceCommandSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const win = window as SpeechWindow;
  return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
}

export function startVoiceCommandListener(callbacks: {
  onCommand: (action: VoiceCommandAction, rawTranscript: string) => void;
  onEnd: () => void;
}): (() => void) | null {
  if (typeof window === 'undefined') return null;
  const win = window as SpeechWindow;
  const Ctor = win.SpeechRecognition || win.webkitSpeechRecognition;
  if (!Ctor) return null;

  try {
    const rec = new Ctor();
    rec.lang = 'tr-TR';
    rec.interimResults = false;
    rec.continuous = false;

    rec.onresult = (ev) => {
      const transcript = (ev.results?.[0]?.[0]?.transcript || '').toLocaleLowerCase('tr-TR').trim();
      if (!transcript) return;
      if (/sonraki|ileri|geç|diğer/.test(transcript)) {
        callbacks.onCommand('next', transcript);
      } else if (/önceki|geri/.test(transcript)) {
        callbacks.onCommand('prev', transcript);
      } else if (/dur|kapat|sus|bitir/.test(transcript)) {
        callbacks.onCommand('stop', transcript);
      } else if (/zamanlayıcı|sayaç|başlat|kur/.test(transcript)) {
        callbacks.onCommand('timer', transcript);
      } else if (/oku|devam|tekrar/.test(transcript)) {
        callbacks.onCommand('play', transcript);
      }
    };

    rec.onerror = () => callbacks.onEnd();
    rec.onend = () => callbacks.onEnd();
    rec.start();

    return () => {
      try {
        rec.stop();
      } catch {
        // ignore
      }
    };
  } catch {
    callbacks.onEnd();
    return null;
  }
}
