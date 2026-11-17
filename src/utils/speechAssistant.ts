/**
 * Doğal Yapay Zeka (Neural VITS) Türkçe Sesli Tarif Asistanı
 *
 * Doğal insan sesi sentezi için MIT Lisanslı @mintplex-labs/piper-tts-web
 * (espeak-ng phonemizer + onnxruntime-web) ve MIT Lisanslı açık kaynak
 * Türkçe VITS nöral ses modelleri (Kadın Sesi & Erkek Sesi) kullanılır.
 * İnternet erişimi olmadığında cihazın yerel ses motoruna otomatik geçer.
 */
import {
  isNativeIosBridgeAvailable,
  playWavAudioNativeIos,
  prepareNativeAudioSession,
  speakTextNativeIos,
  stopSpeakNativeIos,
  stopWavAudioNativeIos,
} from './nativeBridge';

export type NeuralVoiceOptionId = 'female' | 'male' | 'system';

export interface VoiceOptionItem {
  id: NeuralVoiceOptionId;
  label: string;
}

export const TURKISH_VOICE_OPTIONS: VoiceOptionItem[] = [
  { id: 'female', label: '👩 Kadın Sesi' },
  { id: 'male', label: '👨 Erkek Sesi' },
  { id: 'system', label: '⚡ Hızlı Sistem Sesi' },
];

const MODEL_ENDPOINTS: Record<'female' | 'male', { onnx: string; config: string }> = {
  female: {
    onnx: 'https://huggingface.co/ilkeraktuna/piper-tts-tr-ilkiz-medium/resolve/main/ilkiz.onnx',
    config: 'https://huggingface.co/ilkeraktuna/piper-tts-tr-ilkiz-medium/resolve/main/ilkiz.onnx.json',
  },
  male: {
    onnx: 'https://huggingface.co/diffusionstudio/piper-voices/resolve/main/tr/tr_TR/fahrettin/medium/tr_TR-fahrettin-medium.onnx',
    config: 'https://huggingface.co/diffusionstudio/piper-voices/resolve/main/tr/tr_TR/fahrettin/medium/tr_TR-fahrettin-medium.onnx.json',
  },
};

const ONNX_WASM_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.18.0/';
const PIPER_WASM_BASE = 'https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize';
const IDB_NAME = 'nepisirsem_tts_models_v1';
const IDB_STORE = 'blobs';

interface SpeechWindow extends Window {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
  __nepisirsemOnSpeechBoundary?: (token: number, charIndex: number, charLength: number) => void;
  __nepisirsemOnSpeechEnd?: (token: number) => void;
  __nepisirsemOnWavEnd?: (token: number) => void;
  __nepisirsemOnWavError?: (token: number) => void;
}

interface PiperModelConfig {
  audio: { sample_rate: number };
  espeak: { voice: string };
  inference: { noise_scale: number; length_scale: number; noise_w: number };
  speaker_id_map?: Record<string, number>;
}

let activeSpeechToken = 0;
let sharedAudioCtx: AudioContext | null = null;
let currentSourceNode: AudioBufferSourceNode | null = null;
let wordSyncInterval: ReturnType<typeof setInterval> | null = null;

// Modelleri ve sentezlenmiş sesleri bellekte tut (sıfır bekleme)
const loadedSessions = new Map<'female' | 'male', {
  ort: typeof import('onnxruntime-web/wasm');
  session: import('onnxruntime-web/wasm').InferenceSession;
  config: PiperModelConfig;
  createPhonemize: (arg?: Record<string, unknown>) => Promise<{ callMain: (args: string[]) => void }>;
}>();

const synthesizedWavCache = new Map<string, { wavBuffer: ArrayBuffer; durationSec: number }>();

function openModelDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function readCachedArrayBuffer(key: string): Promise<ArrayBuffer | undefined> {
  try {
    const db = await openModelDb();
    return await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => resolve(req.result as ArrayBuffer | undefined);
      req.onerror = () => resolve(undefined);
    });
  } catch {
    return undefined;
  }
}

async function writeCachedArrayBuffer(key: string, buf: ArrayBuffer): Promise<void> {
  try {
    const db = await openModelDb();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(buf, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // ignore storage quota errors cleanly
  }
}

async function fetchWithProgress(
  url: string,
  onProgress?: (loaded: number, total: number) => void
): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  const total = Number(res.headers.get('Content-Length') || 0);
  const reader = res.body?.getReader();
  if (!reader) {
    return await res.arrayBuffer();
  }
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      loaded += value.length;
      if (total > 0) {
        onProgress?.(loaded, total);
      }
    }
  }
  const merged = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  return merged.buffer;
}

async function getOrFetchBinary(
  key: string,
  url: string,
  onProgress?: (loaded: number, total: number) => void
): Promise<ArrayBuffer> {
  const cached = await readCachedArrayBuffer(key);
  if (cached && cached.byteLength > 0) {
    return cached;
  }
  const fetched = await fetchWithProgress(url, onProgress);
  await writeCachedArrayBuffer(key, fetched);
  return fetched;
}

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
    stopWavAudioNativeIos();
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

/**
 * Sentezlenen ses sinyalini normalize ederek iPhone/Android hoparlöründen
 * her seçenekte yüksek, net ve sıcak ses çıkmasını garanti eder.
 */
function encodeNormalizedWav(pcm: Float32Array, sampleRate: number): { wavBuffer: ArrayBuffer; durationSec: number } {
  let maxPeak = 0;
  for (let i = 0; i < pcm.length; i++) {
    const abs = Math.abs(pcm[i]);
    if (abs > maxPeak) maxPeak = abs;
  }
  const gain = maxPeak > 0.002 ? Math.min(12, 0.88 / maxPeak) : 1;

  const numSamples = pcm.length;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true); // PCM
  view.setUint16(20, 1, true); // Linear PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  let byteOffset = 44;
  for (let i = 0; i < numSamples; i++) {
    const clamped = Math.max(-1, Math.min(1, pcm[i] * gain));
    view.setInt16(byteOffset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
    byteOffset += 2;
  }

  return {
    wavBuffer: buffer,
    durationSec: numSamples / sampleRate,
  };
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  const parts: string[] = [];
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const slice = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
    parts.push(String.fromCharCode(...slice));
  }
  return btoa(parts.join(''));
}

async function getOrInitNeuralSession(
  voiceGender: 'female' | 'male',
  onProgress?: (pct: number) => void
) {
  const cachedSession = loadedSessions.get(voiceGender);
  if (cachedSession) return cachedSession;

  const [{ createPiperPhonemize }, ortModule] = await Promise.all([
    import('./piperPhonemizer.js'),
    import('onnxruntime-web/wasm'),
  ]);

  const ort = (ortModule.default || ortModule) as typeof import('onnxruntime-web/wasm');
  if (ort.env?.wasm) {
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.wasmPaths = ONNX_WASM_BASE;
  }

  const urls = MODEL_ENDPOINTS[voiceGender];
  const configBuf = await getOrFetchBinary(`${voiceGender}-config-v1`, urls.config);
  const configText = new TextDecoder().decode(configBuf);
  const config = JSON.parse(configText) as PiperModelConfig;

  const modelBuf = await getOrFetchBinary(`${voiceGender}-onnx-v1`, urls.onnx, (loaded, total) => {
    if (total > 0) {
      onProgress?.(Math.min(99, Math.round((loaded / total) * 100)));
    }
  });

  const session = await ort.InferenceSession.create(modelBuf, {
    executionProviders: ['wasm'],
  });

  const bundle = {
    ort,
    session,
    config,
    createPhonemize: createPiperPhonemize,
  };
  loadedSessions.set(voiceGender, bundle);
  return bundle;
}

async function phonemizeTurkishText(
  createPhonemize: (arg?: Record<string, unknown>) => Promise<{ callMain: (args: string[]) => void }>,
  espeakVoice: string,
  text: string
): Promise<number[]> {
  const cleanText = text
    .replace(/[°]/g, ' derece ')
    .replace(/&/g, ' ve ')
    .replace(/\//g, ' veya ')
    .replace(/\s+/g, ' ')
    .trim();

  const input = JSON.stringify([{ text: cleanText }]);

  return await new Promise<number[]>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Phonemize timeout')), 20000);
    createPhonemize({
      print: (data: string) => {
        clearTimeout(timer);
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.phoneme_ids || []);
        } catch (e) {
          reject(e);
        }
      },
      printErr: (msg: string) => {
        if (msg && msg.toLowerCase().includes('error')) {
          clearTimeout(timer);
          reject(new Error(msg));
        }
      },
      locateFile: (url: string) => {
        if (url.endsWith('.wasm')) return `${PIPER_WASM_BASE}.wasm`;
        if (url.endsWith('.data')) return `${PIPER_WASM_BASE}.data`;
        return url;
      },
    })
      .then((module) => {
        module.callMain([
          '-l',
          espeakVoice || 'tr',
          '--input',
          input,
          '--espeak_data',
          '/espeak-ng-data',
        ]);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

async function synthesizeStepWav(
  voiceGender: 'female' | 'male',
  text: string,
  onProgress?: (pct: number) => void
): Promise<{ wavBuffer: ArrayBuffer; durationSec: number }> {
  const cacheKey = `${voiceGender}::${text}`;
  const existing = synthesizedWavCache.get(cacheKey);
  if (existing) return existing;

  const { ort, session, config, createPhonemize } = await getOrInitNeuralSession(
    voiceGender,
    onProgress
  );

  const phonemeIds = await phonemizeTurkishText(createPhonemize, config.espeak?.voice || 'tr', text);
  if (!phonemeIds.length) {
    throw new Error('Empty phoneme output');
  }

  const feeds: Record<string, import('onnxruntime-web/wasm').Tensor> = {
    input: new ort.Tensor('int64', BigInt64Array.from(phonemeIds.map((id) => BigInt(id))), [
      1,
      phonemeIds.length,
    ]),
    input_lengths: new ort.Tensor('int64', BigInt64Array.from([BigInt(phonemeIds.length)])),
    scales: new ort.Tensor(
      'float32',
      new Float32Array([
        config.inference?.noise_scale ?? 0.667,
        config.inference?.length_scale ?? 1.0,
        config.inference?.noise_w ?? 0.8,
      ])
    ),
  };

  if (config.speaker_id_map && Object.keys(config.speaker_id_map).length > 0) {
    feeds.sid = new ort.Tensor('int64', BigInt64Array.from([0n]));
  }

  const outputMap = await session.run(feeds);
  const pcm = outputMap.output.data as Float32Array;
  const encoded = encodeNormalizedWav(pcm, config.audio?.sample_rate || 22050);

  synthesizedWavCache.set(cacheKey, encoded);
  if (synthesizedWavCache.size > 30) {
    const oldest = synthesizedWavCache.keys().next().value;
    if (oldest) synthesizedWavCache.delete(oldest);
  }
  return encoded;
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
 * Bir sonraki adımı arka planda ön-sentezleyerek adımlar arasında sıfır bekleme sağlar.
 */
export function prefetchNextStepVoice(voiceId: NeuralVoiceOptionId, nextText: string): void {
  if (voiceId === 'system' || !nextText.trim()) return;
  if (!loadedSessions.has(voiceId)) return;
  synthesizeStepWav(voiceId, nextText).catch(() => {});
}

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
    options.onStatusChange?.('⚡ Hızlı Sistem Sesi');
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

  const genderLabel = options.voiceId === 'female' ? '👩 Kadın Sesi' : '👨 Erkek Sesi';

  try {
    options.onStatusChange?.(`${genderLabel} hazırlanıyor...`);
    const { wavBuffer, durationSec } = await synthesizeStepWav(
      options.voiceId,
      options.text,
      (pct) => {
        if (myToken !== activeSpeechToken) return;
        options.onDownloadProgress?.(pct);
        options.onStatusChange?.(`📥 ${genderLabel} indiriliyor (%${pct}) — tek seferlik`);
      }
    );

    if (myToken !== activeSpeechToken) return;

    options.onDownloadProgress?.(null);
    options.onStatusChange?.(`${genderLabel} (Doğal AI)`);

    const totalPlaySeconds = durationSec / Math.max(0.75, Math.min(1.4, options.rate));
    const spans = tokenizeWordSpans(options.text);

    const startWordTimer = () => {
      if (spans.length === 0 || totalPlaySeconds <= 0.1) return;
      const startedAt = performance.now();
      wordSyncInterval = setInterval(() => {
        if (myToken !== activeSpeechToken) {
          if (wordSyncInterval) clearInterval(wordSyncInterval);
          return;
        }
        const elapsed = (performance.now() - startedAt) / 1000;
        const progress = Math.min(0.999, elapsed / totalPlaySeconds);
        const idx = Math.min(spans.length - 1, Math.floor(progress * spans.length));
        const span = spans[idx];
        if (span) {
          options.onWordBoundary(span.start, span.length);
        }
      }, 85);
    };

    // 1. iPhone / Native iOS: Doğrudan Swift AVAudioPlayer üzerinden yüksek sesli ve kesintisiz çal
    if (isNativeIosBridgeAvailable()) {
      const win = window as SpeechWindow;
      win.__nepisirsemOnWavEnd = (token: number) => {
        if (wordSyncInterval) {
          clearInterval(wordSyncInterval);
          wordSyncInterval = null;
        }
        if (token === myToken && myToken === activeSpeechToken) {
          options.onFinish();
        }
      };
      win.__nepisirsemOnWavError = (token: number) => {
        if (wordSyncInterval) {
          clearInterval(wordSyncInterval);
          wordSyncInterval = null;
        }
        if (token === myToken && myToken === activeSpeechToken) {
          speakWithSystemFallback({
            token: myToken,
            text: options.text,
            rate: options.rate,
            onWordBoundary: options.onWordBoundary,
            onFinish: options.onFinish,
            onError: options.onError,
          });
        }
      };

      const b64 = arrayBufferToBase64(wavBuffer);
      const sent = playWavAudioNativeIos(b64, options.rate, myToken);
      if (sent) {
        startWordTimer();
        return;
      }
    }

    // 2. Web & Android: AudioContext + GainNode ile yüksek ve net oynatma
    const ctx = getOrCreateAudioContext();
    if (!ctx) throw new Error('AudioContext unavailable');
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const decodedBuffer = await ctx.decodeAudioData(wavBuffer.slice(0));
    if (myToken !== activeSpeechToken) return;

    const source = ctx.createBufferSource();
    source.buffer = decodedBuffer;
    source.playbackRate.value = Math.max(0.75, Math.min(1.4, options.rate));
    source.connect(ctx.destination);
    currentSourceNode = source;

    startWordTimer();

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
    console.warn('Doğal ses sentezleyici sistem sesine geçti:', err);
    if (myToken !== activeSpeechToken) return;
    options.onDownloadProgress?.(null);
    options.onStatusChange?.('⚡ Cihaz Sesi (Yedek)');
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
