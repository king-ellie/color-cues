import React from 'react';
import ControlTray from './ControlTray';
import useColorRotation from '../hooks/useColorRotation';
import '../styles.css';

interface ColorDisplayProps {
  settings: {
    interval: number;
    transition: 'fade' | 'instant';
    colors: string[];
  };
  onReturn: () => void;
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ settings, onReturn }) => {
  const { currentColor, isPaused, togglePause } = useColorRotation(settings);

  return (
    <div
      className="color-display"
      style={{
        backgroundColor: currentColor,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      <ControlTray
        isPaused={isPaused}
        onPauseToggle={togglePause}
        onReturn={onReturn}
      />
    </div>
  );
};

export default ColorDisplay;
