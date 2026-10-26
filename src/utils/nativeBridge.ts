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
