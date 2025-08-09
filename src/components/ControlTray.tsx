import React, { useState, useEffect } from 'react';
import '../styles.css';

interface ControlTrayProps {
  isPaused: boolean;
  onPauseToggle: () => void;
  onReturn: () => void;
}

const ControlTray: React.FC<ControlTrayProps> = ({ isPaused, onPauseToggle, onReturn }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timeout);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!visible) return null;

  return (
    <div className="control-tray">
      <button onClick={onPauseToggle}>{isPaused ? 'Resume' : 'Pause'}</button>
      <button onClick={onReturn}>Return to Form</button>
    </div>
  );
};

export default ControlTray;
