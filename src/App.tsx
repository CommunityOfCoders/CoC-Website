import { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PastEvents from './pages/PastEvents';
import Team from './pages/team';
import OpenSource from './pages/OpenSource';
import './App.css';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0, 0); // Reset scroll on view change
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderView = () => {
    switch (currentHash) {
      case '#events':
        return <PastEvents />;
      case '#team':
        return <Team />;
      case '#open-source':
        return <OpenSource />;
      // Additional views can be wired up here
      default:
        return <Home />;
    }
  };

  return (
    <MainLayout>
      {renderView()}
    </MainLayout>
  );
}

export default App;

