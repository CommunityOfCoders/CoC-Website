/* Touch has no hover, so give every tappable thing a "pressed" state:
   it squishes under the finger and takes its accent colour. Removed the moment the finger moves (scroll). */
const SEL = [
  '.project-card', '.os-card', '.ev-card', '.team-card', '.ach-tile', '.os-program-card',
  '.btn', '.placement-tab-btn', '.nav__drawer-link', '.footer__link', '.footer__social',
  '.drawer-action-btn', '.os-action-btn', '.drawer-author-chip', '.os-card__links a',
].join(',');

export function initPress(): () => void {
  let active: Element | null = null;
  let sx = 0;
  let sy = 0;

  const clear = () => {
    active?.classList.remove('is-pressed');
    active = null;
  };
  const down = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    const el = (e.target as Element | null)?.closest(SEL);
    if (!el) return;
    clear();
    active = el;
    sx = e.clientX;
    sy = e.clientY;
    el.classList.add('is-pressed');
  };
  const move = (e: PointerEvent) => {
    if (active && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) clear();
  };

  document.addEventListener('pointerdown', down, { passive: true });
  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerup', clear, { passive: true });
  document.addEventListener('pointercancel', clear, { passive: true });
  window.addEventListener('scroll', clear, { passive: true });
  return () => {
    document.removeEventListener('pointerdown', down);
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', clear);
    document.removeEventListener('pointercancel', clear);
    window.removeEventListener('scroll', clear);
    clear();
  };
}
