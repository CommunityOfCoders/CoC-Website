/* tiny vibration where the browser allows it (Android); silent elsewhere */
export function buzz(ms: number | number[] = 8) {
  try {
    if ('vibrate' in navigator) navigator.vibrate(ms);
  } catch {
    /* ignore */
  }
}
