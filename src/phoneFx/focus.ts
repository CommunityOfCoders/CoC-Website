/* Phones have no hover, so the card that scrolls into the middle of the
   screen plays its hover animation instead (class `is-hot`): dates rise in,
   stamps slam down, photos zoom, panels fill. It leaves again when the card
   scrolls away, just like moving the mouse off it on a computer.
   `fx-scroll` on <html> switches the phone CSS to "hidden until hot". */

// cards in lists: hot while they cross the middle band of the screen
const BAND = [
  '.ev-card', '.project-card', '.os-card', '.team-card',
  '.ach-tile', '.ach-feature', '.achievement-card',
  '.pillar', '.ethos__item', '.act__link', '.lbento__tile',
  '.hero__media', '.ct-media', '.ct-comm',
].join(', ');
// sideways carousels: hot only when also centred left-to-right
const CENTRE = '.tb__card';

export function initFocus(): () => void {
  if (typeof IntersectionObserver === 'undefined') return () => {};
  const root = document.documentElement;
  root.classList.add('fx-scroll');

  const toggle = (entries: IntersectionObserverEntry[]) => {
    for (const e of entries) e.target.classList.toggle('is-hot', e.isIntersecting);
  };
  const band = new IntersectionObserver(toggle, { rootMargin: '-44% 0px -44% 0px' });
  const centre = new IntersectionObserver(toggle, { rootMargin: '-30% -42% -30% -42%' });

  const seen = new WeakSet<Element>();
  const scan = () => {
    document.querySelectorAll(BAND).forEach((el) => {
      if (!seen.has(el)) { seen.add(el); band.observe(el); }
    });
    document.querySelectorAll(CENTRE).forEach((el) => {
      if (!seen.has(el)) { seen.add(el); centre.observe(el); }
    });
  };
  scan();

  // pages, filters and lazy sections mount cards later
  let queued = 0;
  const mo = new MutationObserver(() => {
    if (queued) return;
    queued = requestAnimationFrame(() => { queued = 0; scan(); });
  });
  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    mo.disconnect();
    cancelAnimationFrame(queued);
    band.disconnect();
    centre.disconnect();
    root.classList.remove('fx-scroll');
    document.querySelectorAll('.is-hot').forEach((el) => el.classList.remove('is-hot'));
  };
}
