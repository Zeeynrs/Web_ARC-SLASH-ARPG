import { useState, useEffect } from 'react';

export function useScrollDepth() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFloor, setCurrentFloor] = useState('FLOOR 01');
  const [currentBiome, setCurrentBiome] = useState('SLIME CAVE');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, scrollY / docHeight));
      setScrollProgress(progress);

      if (progress < 0.2) {
        setCurrentFloor('FLOOR 01');
        setCurrentBiome('SLIME CAVE');
      } else if (progress < 0.4) {
        setCurrentFloor('FLOOR 15');
        setCurrentBiome('ANCIENT CRYPT');
      } else if (progress < 0.6) {
        setCurrentFloor('FLOOR 22');
        setCurrentBiome('LAVA CAVERN');
      } else if (progress < 0.8) {
        setCurrentFloor('FLOOR 35');
        setCurrentBiome('DEEP DARK (WARDEN)');
      } else {
        setCurrentFloor('FLOOR 50');
        setCurrentBiome('THE DEEP DARK CORE');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpToFloor = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    scrollProgress,
    currentFloor,
    currentBiome,
    jumpToFloor
  };
}
