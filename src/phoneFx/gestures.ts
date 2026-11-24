import { buzz } from './haptics';

/* Swipe gestures for phones:
   - Placements: swipe left / right to move between Internships,
     6-Months, Placements and PPOs.
   - Project + contributor sheets: drag the sheet down to close it
     (starts from the grab handle, or from the top of the content). */
const SHEETS = '.drawer-panel.is-open, .os-drawer-panel.is-open, .ev-drawer-panel.is-open';
const CLOSE_BTNS = '.drawer-mclose, .os-drawer-mclose, .ev-drawer-close';

export function initGestures(): () => void {
  let sx = 0;
  let sy = 0;
  let st = 0;
  let sheet: HTMLElement | null = null;
  let content: HTMLElement | null = null;
  let dragging = false;
  let swipeArea: Element | null = null;

  const onStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    sx = t.clientX;
    sy = t.clientY;
    st = performance.now();
    dragging = false;

    const target = e.target as Element;
    sheet = target.closest<HTMLElement>(SHEETS);
    // the events sheet scrolls itself; the others scroll an inner content box
    content = sheet?.matches('.ev-drawer-panel') ? sheet : (sheet?.querySelector<HTMLElement>('.drawer-content, .os-drawer-content') ?? null);
    swipeArea = sheet ? null : target.closest('.placement-page');
  };

  const onMove = (e: TouchEvent) => {
    if (!sheet || e.touches.length !== 1) return;
    const dy = e.touches[0].clientY - sy;
    const dx = e.touches[0].clientX - sx;
    const nearTop = (content?.scrollTop ?? 0) <= 0;
    const fromHandle = sy - sheet.getBoundingClientRect().top < 56;
    if (!dragging) {
      // begin only on a clear downward pull from the handle / top of the content
      if (dy > 8 && Math.abs(dy) > Math.abs(dx) * 1.4 && (fromHandle || nearTop)) {
        dragging = true;
        sheet.style.transition = 'none';
      } else return;
    }
    e.preventDefault();
    sheet.style.transform = `translateY(${Math.max(0, dy)}px)`;
  };

  const onEnd = (e: TouchEvent) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - sx;
    const dy = t.clientY - sy;
    const dt = Math.max(1, performance.now() - st);

    if (sheet && dragging) {
      const fast = dy / dt > 0.6;
      const el = sheet;
      el.style.transition = '';
      el.style.transform = '';
      if (dy > 120 || fast) {
        buzz(10);
        el.querySelector<HTMLElement>(CLOSE_BTNS)?.click();
      }
    } else if (swipeArea && Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 2 && dt < 700) {
      const tabs = Array.from(document.querySelectorAll<HTMLElement>('.placement-tab-btn'));
      const i = tabs.findIndex((b) => b.classList.contains('active'));
      const next = tabs[i + (dx < 0 ? 1 : -1)];
      if (next) {
        buzz(8);
        next.click();
      }
    }
    sheet = null;
    content = null;
    dragging = false;
    swipeArea = null;
  };

  document.addEventListener('touchstart', onStart, { passive: true });
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onEnd, { passive: true });
  document.addEventListener('touchcancel', onEnd, { passive: true });
  return () => {
    document.removeEventListener('touchstart', onStart);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);
    document.removeEventListener('touchcancel', onEnd);
  };
}
