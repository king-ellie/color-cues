import { useState, useEffect, useRef } from 'react';

interface Settings {
  interval: number;
  transition: 'fade' | 'instant';
  colors: string[];
}

const useColorRotation = (settings: Settings) => {
  const { interval, transition, colors } = settings;
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [isPaused, setIsPaused] = useState(false);
  const colorIndex = useRef(0);
  const transitionRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const updateColor = () => {
      colorIndex.current = (colorIndex.current + 1) % colors.length;
      setCurrentColor(colors[colorIndex.current]);
    };

    if (transition === 'fade') {
      transitionRef.current = setInterval(updateColor, interval * 60 * 1000);
    } else {
      transitionRef.current = setTimeout(updateColor, interval * 60 * 1000);
    }

    return () => {
      if (transitionRef.current) clearInterval(transitionRef.current);
    };
  }, [isPaused, interval, transition, colors]);

  const togglePause = () => setIsPaused(!isPaused);

  return { currentColor, isPaused, togglePause };
};

export default useColorRotation;
