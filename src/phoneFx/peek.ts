/* Long-press a project or contributor card to "peek": a bigger copy pops
   up with everything the compact phone card hides (all tags, mentors).
   Let go and it closes; a quick tap still opens the full sheet. */
const CARDS = '.project-card, .os-card';
const HOLD_MS = 450;

export function initPeek(): () => void {
  let timer = 0;
  let overlay: HTMLDivElement | null = null;
  let sx = 0;
  let sy = 0;
  let swallow = false;

  const close = () => {
    clearTimeout(timer);
    if (overlay) {
      const o = overlay;
      o.classList.remove('is-open');
      window.setTimeout(() => o.remove(), 250);
      overlay = null;
      // the finger-up right after a long press must not also open the card
      swallow = true;
      window.setTimeout(() => (swallow = false), 400);
    }
  };

  const open = (card: Element) => {
    const o = document.createElement('div');
    o.className = 'peek-overlay';
    o.setAttribute('aria-hidden', 'true');
    const wrap = document.createElement('div');
    wrap.className = 'peek-card';
    const clone = card.cloneNode(true) as HTMLElement;
    clone.classList.remove('is-pressed');
    clone.style.removeProperty('transform');
    wrap.appendChild(clone);
    o.appendChild(wrap);
    document.body.appendChild(o);
    requestAnimationFrame(() => o.classList.add('is-open'));
    overlay = o;
  };

  const down = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    const card = (e.target as Element | null)?.closest(CARDS);
    if (!card || (e.target as Element).closest('a, button')) return;
    sx = e.clientX;
    sy = e.clientY;
    clearTimeout(timer);
    timer = window.setTimeout(() => open(card), HOLD_MS);
  };
  const move = (e: PointerEvent) => {
    if (!overlay && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) clearTimeout(timer);
  };
  const up = () => (overlay ? close() : clearTimeout(timer));
  const click = (e: MouseEvent) => {
    if (swallow) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const noMenu = (e: Event) => {
    if ((e.target as Element | null)?.closest(CARDS)) e.preventDefault();
  };

  document.addEventListener('pointerdown', down, { passive: true });
  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerup', up, { passive: true });
  document.addEventListener('pointercancel', up, { passive: true });
  document.addEventListener('click', click, true);
  document.addEventListener('contextmenu', noMenu);
  window.addEventListener('scroll', up, { passive: true });
  return () => {
    document.removeEventListener('pointerdown', down);
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', up);
    document.removeEventListener('pointercancel', up);
    document.removeEventListener('click', click, true);
    document.removeEventListener('contextmenu', noMenu);
    window.removeEventListener('scroll', up);
    clearTimeout(timer);
    overlay?.remove();
    overlay = null;
  };
}
