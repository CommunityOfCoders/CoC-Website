import { initPress } from './press';
import { initGestures } from './gestures';
import { initPeek } from './peek';
import { initFocus } from './focus';

/* Phone-only touch effects. Each module returns a cleanup function.
   Everything starts when the viewport is phone-sized and stops again if
   it grows, and is skipped entirely under "reduce motion". */
type Init = () => () => void;
const MODULES: Init[] = [initPress, initGestures, initPeek, initFocus];

export function initPhoneFx(): () => void {
  if (typeof window === 'undefined') return () => {};
  const phone = window.matchMedia('(max-width: 640px)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let cleanups: Array<() => void> = [];

  const start = () => {
    stop();
    if (!phone.matches || reduce.matches) return;
    cleanups = MODULES.map((m) => m());
  };
  const stop = () => {
    cleanups.forEach((c) => c());
    cleanups = [];
  };

  start();
  phone.addEventListener('change', start);
  reduce.addEventListener('change', start);
  return () => {
    phone.removeEventListener('change', start);
    reduce.removeEventListener('change', start);
    stop();
  };
}
