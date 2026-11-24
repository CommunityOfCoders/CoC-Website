import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { PageCurtain, type CurtainPhase } from './components/ui/PageCurtain';
import './App.css';

/* Pages other than Home load on demand, so the first visit only downloads
   what it shows. They are prefetched once the browser is idle, so moving
   between tabs is still instant. */
const pageImports = {
  events: () => import('./pages/PastEvents'),
  projects: () => import('./pages/Projects'),
  opensource: () => import('./pages/OpenSource'),
  achievements: () => import('./pages/Achievements'),
  team: () => import('./pages/team'),
  placements: () => import('./pages/Placements'),
  contact: () => import('./pages/Contact'),
};
const PastEvents = lazy(pageImports.events);
const Projects = lazy(pageImports.projects);
const OpenSource = lazy(pageImports.opensource);
const Achievements = lazy(pageImports.achievements);
const Team = lazy(pageImports.team);
const Placements = lazy(pageImports.placements);
const Contact = lazy(pageImports.contact);

const normalize = (hash: string) => (hash === '#' ? '' : hash);
const baseOf = (route: string) => route.split('?')[0].split('/')[0];

const TITLES: Record<string, string> = {
  '#events': 'Events',
  '#projects': 'Projects',
  '#opensource': 'Open Source',
  '#achievements': 'Achievements',
  '#team': 'Team',
  '#placements': 'Placements',
  '#contact': 'Contact',
};

const COVER_MS = 520; // curtain fully closed - swap the page underneath
const REVEAL_MS = 860; // curtain fully lifted

function App() {
  const [route, setRoute] = useState(() => normalize(window.location.hash));
  const [curtain, setCurtain] = useState<{ label: string; phase: CurtainPhase } | null>(null);
  const routeRef = useRef(route);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clearTimers = () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
    const swap = (next: string) => {
      routeRef.current = next;
      setRoute(next);
      window.scrollTo(0, 0);
    };

    const onHashChange = () => {
      const next = normalize(window.location.hash);
      const changesPage = baseOf(next) !== baseOf(routeRef.current);
      // same page (e.g. opening an event by ?id=), or reduced motion: no curtain
      if (!changesPage || reduce.matches) {
        clearTimers();
        setCurtain(null);
        swap(next);
        return;
      }
      clearTimers();
      const label = TITLES[baseOf(next)] ?? 'Home';
      setCurtain({ label, phase: 'in' });
      timers.current.push(
        window.setTimeout(() => {
          swap(next);
          setCurtain({ label, phase: 'out' });
        }, COVER_MS),
        window.setTimeout(() => setCurtain(null), COVER_MS + REVEAL_MS),
      );
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      clearTimers();
    };
  }, []);

  // warm the other pages once the browser has nothing better to do
  useEffect(() => {
    const prefetch = () => Object.values(pageImports).forEach((load) => void load());
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(prefetch);
    else window.setTimeout(prefetch, 1500);
  }, []);

  const titleKey = baseOf(route);
  useEffect(() => {
    const page = TITLES[titleKey];
    document.title = page ? `${page} · Community of Coders · VJTI` : 'Community of Coders · VJTI';
  }, [titleKey]);

  const renderView = () => {
    switch (titleKey) {
      case '#events': return <PastEvents />;
      case '#projects': return <Projects />;
      case '#opensource': return <OpenSource />;
      case '#achievements': return <Achievements />;
      case '#team': return <Team />;
      case '#placements': return <Placements />;
      case '#contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <>
      <MainLayout route={titleKey}>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>{renderView()}</Suspense>
      </MainLayout>
      {curtain && <PageCurtain key={curtain.label} label={curtain.label} phase={curtain.phase} />}
    </>
  );
}

export default App;
