import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

/**
 * Kalıcı depolama: localStorage + (iOS/Android'de) Capacitor Preferences.
 * iOS WKWebView localStorage'ı depolama baskısında silebildiği için
 * kullanıcı verileri (kendi tarifleri, favoriler, kiler, alışveriş listesi)
 * ayrıca native UserDefaults / SharedPreferences içine yazılır.
 */
const isNative = (() => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
})();

export function saveJson(key: string, value: unknown): void {
  const raw = JSON.stringify(value);
  try {
    localStorage.setItem(key, raw);
  } catch {
    // kota dolu olabilir; native kopya yine yazılır
  }
  if (isNative) {
    Preferences.set({ key, value: raw }).catch(() => {});
  }
}

export function loadJsonSync<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw) as T;
  } catch {
    // ignore
  }
  return fallback;
}

/**
 * Uygulama açılışında native kopyayı okur. localStorage silinmişse
 * veriyi geri yükler ve geri döndürür; aksi halde null döner.
 */
export async function restoreFromNative<T>(key: string): Promise<T | null> {
  if (!isNative) return null;
  try {
    const { value } = await Preferences.get({ key });
    if (value === null || value === undefined) {
      // İlk sürüm geçişi: localStorage'daki veriyi native'e kopyala
      const local = localStorage.getItem(key);
      if (local !== null) {
        await Preferences.set({ key, value: local });
      }
      return null;
    }
    const local = localStorage.getItem(key);
    if (local === value) return null;
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore
    }
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
