import { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PastEvents from './pages/PastEvents';
import Team from './pages/team';
import OpenSource from './pages/OpenSource';
import Projects from './pages/Projects';
import Placements from './pages/Placements';
import Contact from './pages/Contact';
import './App.css';

const normalize = (hash: string) => (hash === '#' ? '' : hash);

function App() {
  const [route, setRoute] = useState(() => normalize(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setRoute(normalize(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderView = () => {
    switch (route) {
      case '#events': return <PastEvents />;
      case '#projects': return <Projects />;
      case '#opensource': return <OpenSource />;
      case '#team': return <Team />;
      case '#placements': return <Placements />;
      case '#contact': return <Contact />;
      default: return <Home />;
    }
  };

  return <MainLayout route={route}>{renderView()}</MainLayout>;
}

export default App;
