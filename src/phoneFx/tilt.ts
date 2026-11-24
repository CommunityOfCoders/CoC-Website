import { buzz } from './haptics';

/* Opt-in tilt parallax: tilt the phone and photos, logos and titles drift
   at different depths. Off by default (iPhones must grant motion access
   with a tap; it also saves a little battery). The choice is remembered. */
const KEY = 'coc-tilt';
const ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="2.5" transform="rotate(18 12 12)"/><path d="M4 9a9 9 0 0 1 3-4M20 15a9 9 0 0 1-3 4"/></svg>';

type OrientationCtor = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<'granted' | 'denied'> };

export function initTilt(): () => void {
  if (!('DeviceOrientationEvent' in window)) return () => {};

  const root = document.documentElement;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'tilt-toggle';
  btn.setAttribute('aria-label', 'Toggle tilt effect');
  btn.setAttribute('aria-pressed', 'false');
  btn.innerHTML = ICON;
  document.body.appendChild(btn);

  let on = false;
  let raf = 0;
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  let base: number | null = null;

  const clamp = (v: number) => Math.max(-1, Math.min(1, v));
  const handle = (e: DeviceOrientationEvent) => {
    if (e.gamma == null || e.beta == null) return;
    base = base == null ? e.beta : base + (e.beta - base) * 0.01; // slowly follows how you hold it
    tx = clamp(e.gamma / 22);
    ty = clamp((e.beta - base) / 22);
  };
  const loop = () => {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    root.style.setProperty('--tx', cx.toFixed(3));
    root.style.setProperty('--ty', cy.toFixed(3));
    raf = requestAnimationFrame(loop);
  };

  const enable = async () => {
    const Ctor = window.DeviceOrientationEvent as OrientationCtor;
    if (typeof Ctor.requestPermission === 'function') {
      try {
        if ((await Ctor.requestPermission()) !== 'granted') return;
      } catch {
        return;
      }
    }
    on = true;
    base = null;
    window.addEventListener('deviceorientation', handle);
    raf = requestAnimationFrame(loop);
    root.classList.add('tilt-on');
    btn.classList.add('is-on');
    btn.setAttribute('aria-pressed', 'true');
    try { localStorage.setItem(KEY, '1'); } catch { /* ignore */ }
  };
  const disable = () => {
    on = false;
    window.removeEventListener('deviceorientation', handle);
    cancelAnimationFrame(raf);
    root.classList.remove('tilt-on');
    root.style.removeProperty('--tx');
    root.style.removeProperty('--ty');
    btn.classList.remove('is-on');
    btn.setAttribute('aria-pressed', 'false');
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  };

  btn.addEventListener('click', () => {
    buzz(10);
    if (on) disable();
    else void enable();
  });

  // Android needs no permission, so a saved "on" can resume by itself
  try {
    const Ctor = window.DeviceOrientationEvent as OrientationCtor;
    if (localStorage.getItem(KEY) === '1' && typeof Ctor.requestPermission !== 'function') void enable();
  } catch { /* ignore */ }

  return () => {
    window.removeEventListener('deviceorientation', handle);
    cancelAnimationFrame(raf);
    root.classList.remove('tilt-on');
    root.style.removeProperty('--tx');
    root.style.removeProperty('--ty');
    btn.remove();
  };
}
