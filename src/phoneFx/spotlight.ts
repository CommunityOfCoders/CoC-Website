/* Phone replacement for hover: as you scroll, the card closest to the
   middle of the screen "lights up" (accent outline, tinted header) so
   there is always one clear focus - like hovering, without a mouse. */
const CARDS = '.project-card, .os-card, .team-card, .ev-card';

export function initSpotlight(): () => void {
  let raf = 0;
  let lit: Element | null = null;

  const update = () => {
    raf = 0;
    const vh = window.innerHeight;
    const mid = vh * 0.5;
    let best: Element | null = null;
    let bestDist = vh * 0.3; // only light a card that is actually near the middle
    document.querySelectorAll(CARDS).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh || r.height === 0) return;
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestDist) {
        bestDist = d;
        best = el;
      }
    });
    if (best !== lit) {
      lit?.classList.remove('is-lit');
      (best as Element | null)?.classList.add('is-lit');
      lit = best;
    }
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('hashchange', schedule);
  schedule();
  const poll = window.setInterval(schedule, 700); // cards mount / filter after load
  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('hashchange', schedule);
    window.clearInterval(poll);
    if (raf) cancelAnimationFrame(raf);
    lit?.classList.remove('is-lit');
  };
}
