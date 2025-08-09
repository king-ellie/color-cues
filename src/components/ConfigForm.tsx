import React, { useState, useEffect } from 'react';
import ColorPicker from './ColorPicker';
import '../styles.css';

interface ConfigFormProps {
  onStart: (settings: {
    interval: number;
    transition: 'fade' | 'instant';
    colors: string[];
  }) => void;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ onStart }) => {
  const [interval, setInterval] = useState(5);
  const [transition, setTransition] = useState<'fade' | 'instant'>('fade');
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.backgroundColor = currentColor;
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [currentColor]);

  useEffect(() => {
    const savedSettings = localStorage.getItem('colorWheelSettings');
    if (savedSettings) {
      const { interval, transition, colors } = JSON.parse(savedSettings);
      setInterval(interval);
      setTransition(transition);
      setColors(colors);
    }
  }, []);

  const handleAddColor = () => {
    if (colors.length < 8 && !colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };

  const handleRemoveColor = (color: string) => {
    setColors(colors.filter((c) => c !== color));
  };

  const handleStart = () => {
    if (colors.length >= 2) {
      const settings = { interval, transition, colors };
      localStorage.setItem('colorWheelSettings', JSON.stringify(settings));
      onStart(settings);
    } else {
      alert('Please select at least 2 colors.');
    }
  };

  return (
    <div className="config-form">
      <h1>Color Wheel Configurator</h1>
      <label>
        Time between each color (minutes):
        <input
          type="number"
          min="1"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
        />
      </label>
      <label>
        Transition style:
        <select
          value={transition}
          onChange={(e) => setTransition(e.target.value as 'fade' | 'instant')}
        >
          <option value="fade">Gradual Fade</option>
          <option value="instant">Instant Switch</option>
        </select>
      </label>
      <ColorPicker
        color={currentColor}
        onChange={setCurrentColor}
      />
      <button onClick={handleAddColor} disabled={colors.length >= 8}>
        Add Color
      </button>
      <div className="color-list">
        {colors.map((color) => (
          <div
            key={color}
            className="color-item"
            style={{ backgroundColor: color }}
            onClick={() => handleRemoveColor(color)}
          />
        ))}
      </div>
      <button onClick={handleStart}>Play</button>
    </div>
  );
};

export default ConfigForm;
