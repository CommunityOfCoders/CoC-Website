/* Page change feel: a thin accent bar sweeps across the top and the new
   page fades in, instead of an instant cut. */
export function initTransition(): () => void {
  const bar = document.createElement('div');
  bar.className = 'page-bar';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  const run = () => {
    bar.classList.remove('is-running');
    void bar.offsetWidth;
    bar.classList.add('is-running');
    const main = document.querySelector('main');
    if (main) {
      main.classList.remove('page-in');
      void (main as HTMLElement).offsetWidth;
      main.classList.add('page-in');
    }
  };
  window.addEventListener('hashchange', run);
  return () => {
    window.removeEventListener('hashchange', run);
    bar.remove();
    document.querySelector('main')?.classList.remove('page-in');
  };
}
