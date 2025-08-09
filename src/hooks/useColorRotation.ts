import { useState, useEffect, useRef } from 'react';
import { interpolateColor } from '../utils/colorUtils';

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
  const transitionRef = useRef<number | null>(null);
  const fadeRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const updateColor = () => {
      const nextIndex = (colorIndex.current + 1) % colors.length;
      const nextColor = colors[nextIndex];

      if (transition === 'fade') {
        let step = 0;
        const steps = 100;
        const intervalMs = (interval * 60 * 1000) / steps;

        fadeRef.current = window.setInterval(() => {
          step++;
          const factor = step / steps;
          const interpolatedColor = interpolateColor(
            colors[colorIndex.current],
            nextColor,
            factor
          );
          setCurrentColor(interpolatedColor);

          if (step >= steps) {
            clearInterval(fadeRef.current!);
            colorIndex.current = nextIndex;
          }
        }, intervalMs);
      } else {
        setCurrentColor(nextColor);
        colorIndex.current = nextIndex;
      }
    };

    if (transition === 'fade') {
      updateColor();
    } else {
      transitionRef.current = setInterval(updateColor, interval * 60 * 1000);
    }

    return () => {
      if (transitionRef.current) clearInterval(transitionRef.current);
      if (fadeRef.current) clearInterval(fadeRef.current);
    };
  }, [isPaused, interval, transition, colors]);

  const togglePause = () => setIsPaused(!isPaused);

  return { currentColor, isPaused, togglePause };
};

export default useColorRotation;
