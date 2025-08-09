import { useState } from 'react';
import ConfigForm from './components/ConfigForm';
import ColorDisplay from './components/ColorDisplay';
import './App.css';

function App() {
  const [settings, setSettings] = useState<{
    interval: number;
    transition: 'fade' | 'instant';
    colors: string[];
  } | null>(null);

  const handleStart = (newSettings: {
    interval: number;
    transition: 'fade' | 'instant';
    colors: string[];
  }) => {
    setSettings(newSettings);
  };

  const handleReturn = () => {
    setSettings(null);
  };

  return (
    <div className="App">
      {settings ? (
        <ColorDisplay settings={settings} onReturn={handleReturn} />
      ) : (
        <ConfigForm onStart={handleStart} />
      )}
    </div>
  );
}

export default App;
