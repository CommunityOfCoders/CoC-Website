/* tiny vibration where the browser allows it (Android); silent elsewhere */
export function buzz(ms: number | number[] = 8) {
  try {
    // browsers reject vibrate() before the first real tap, which only spams the console
    const ua = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
    if (ua && !ua.hasBeenActive) return;
    if ('vibrate' in navigator) navigator.vibrate(ms);
  } catch {
    /* ignore */
  }
}
