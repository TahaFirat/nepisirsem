interface WebKitMessageHandler {
  postMessage: (body: Record<string, unknown>) => void;
}

interface WebKitWindow extends Window {
  webkit?: {
    messageHandlers?: {
      nepisirsemNative?: WebKitMessageHandler;
    };
  };
}

function postNativeMessage(payload: Record<string, unknown>): boolean {
  if (typeof window === 'undefined') return false;
  const wk = (window as WebKitWindow).webkit;
  const handler = wk?.messageHandlers?.nepisirsemNative;
  if (handler && typeof handler.postMessage === 'function') {
    try {
      handler.postMessage(payload);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export function isNativeIosBridgeAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  const wk = (window as WebKitWindow).webkit;
  return typeof wk?.messageHandlers?.nepisirsemNative?.postMessage === 'function';
}

export function triggerNativeHaptic(
  style: 'light' | 'medium' | 'success' | 'warning' = 'light'
): void {
  const sent = postNativeMessage({ action: 'haptic', style });
  if (!sent && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(style === 'success' ? [15, 30, 15] : 8);
    } catch {
      // ignore
    }
  }
}

export function scheduleNativeCookingTimer(
  seconds: number,
  recipeTitle: string,
  stepTitle: string
): void {
  postNativeMessage({
    action: 'scheduleTimer',
    seconds,
    recipeTitle,
    stepTitle,
  });
}

export function cancelNativeCookingTimer(): void {
  postNativeMessage({ action: 'cancelTimer' });
}

export function triggerTimerFinishedChime(): void {
  postNativeMessage({ action: 'timerFinishedChime' });
}

export function speakTextNativeIos(
  text: string,
  rate: number,
  voiceName: string | undefined,
  token: number
): boolean {
  return postNativeMessage({
    action: 'speakText',
    text,
    rate,
    voiceName: voiceName || '',
    token,
  });
}

export function stopSpeakNativeIos(): boolean {
  return postNativeMessage({ action: 'stopSpeak' });
}

export function requestNativeTurkishVoices(): boolean {
  return postNativeMessage({ action: 'listTurkishVoices' });
}

export function prepareNativeAudioSession(): boolean {
  return postNativeMessage({ action: 'prepareAudioPlayback' });
}

export function playWavAudioNativeIos(
  base64: string,
  rate: number,
  token: number
): boolean {
  return postNativeMessage({
    action: 'playWavBase64',
    base64,
    rate,
    token,
  });
}

export function stopWavAudioNativeIos(): boolean {
  return postNativeMessage({ action: 'stopWavAudio' });
}
