import { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PastEvents from './pages/PastEvents';
import Team from './pages/team';
import OpenSource from './pages/OpenSource';
import Placements from './pages/Placements';
import Contact from './pages/Contact';
import Projects from "./pages/Projects";
import Achievements from "./pages/Achievements";
import CompetitiveProgramming from "./pages/CompetitiveProgramming";
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
    const baseRoute = route.split('?')[0].split('/')[0];
    switch (baseRoute) {
      case '#events': return <PastEvents />;
      case '#projects': return <Projects />;
      case '#opensource': return <OpenSource />;
      case '#cp': return <CompetitiveProgramming />;
      case '#achievements': return <Achievements />;
      case '#team': return <Team />;
      case '#placements': return <Placements />;
      case '#contact': return <Contact />;
      default: return <Home />;
    }
  };

  const baseRoute = route.split('?')[0].split('/')[0];
  return <MainLayout route={baseRoute}>{renderView()}</MainLayout>;
}

export default App;
