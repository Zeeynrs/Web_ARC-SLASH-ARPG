import React, { useState, useEffect } from 'react';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelButton } from '../ui/PixelButton';
import { playAchievement, playCoin } from '../../utils/audioSynth';

export function EasterEggSystem({ secretTrigger, onClearSecret }) {
  const [activeSecret, setActiveSecret] = useState(null);
  const [konamiProgress, setKonamiProgress] = useState([]);

  // Konami Code Sequence: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a
  const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      const nextProgress = [...konamiProgress, key];

      // Check if current prefix matches
      let isPrefix = true;
      for (let i = 0; i < nextProgress.length; i++) {
        if (nextProgress[i].toLowerCase() !== KONAMI_CODE[i].toLowerCase()) {
          isPrefix = false;
          break;
        }
      }

      if (isPrefix) {
        if (nextProgress.length === KONAMI_CODE.length) {
          // Success!
          playAchievement();
          setActiveSecret({
            title: 'KONAMI CODE AWAKENING',
            badge: 'SECRET RETRO CHEAT',
            message: 'You entered the legendary ancient input code! All 50 dungeon floors resonate with divine arcade power. Attack speed increased by +50% in spirit!',
            reward: '🏆 MEDAL UNLOCKED: ARCADE MASTER'
          });
          setKonamiProgress([]);
        } else {
          setKonamiProgress(nextProgress);
        }
      } else {
        setKonamiProgress([key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  // Handle external triggers (e.g. Logo clicks)
  useEffect(() => {
    if (secretTrigger === 'logo') {
      playAchievement();
      setActiveSecret({
        title: 'THE ARCHITECTS OF THE VOID',
        badge: 'COMMUNITY DISCOVERY',
        message: 'You discovered the hidden sigil in the Parallel Dungeons emblem. The development team salutes your thorough exploration of the labyrinth!',
        reward: '💰 +500 VIRTUAL GOLD COINS'
      });
      if (onClearSecret) onClearSecret();
    }
  }, [secretTrigger, onClearSecret]);

  if (!activeSecret) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none"
      onClick={() => setActiveSecret(null)}
    >
      <div
        className="relative w-full max-w-md bg-[#111622] border-2 border-[#ffd700] p-6 shadow-[0_0_35px_rgba(255,215,0,0.4)] text-center animate-bounce-short"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-4xl block mb-2">✨ ⚔️ ✨</span>
        <PixelBadge variant="gold" size="sm" className="mb-2">
          {activeSecret.badge}
        </PixelBadge>

        <h3 className="font-pixel text-base text-[#fde047] tracking-widest my-2">
          {activeSecret.title}
        </h3>

        <p className="font-outfit text-xs text-[#cbd5e1] leading-relaxed mb-4">
          {activeSecret.message}
        </p>

        <div className="p-3 bg-[#090d14] border border-[#f59e0b] font-pixel text-[9px] text-[#22c55e] mb-5">
          {activeSecret.reward}
        </div>

        <PixelButton
          variant="primary"
          size="sm"
          onClick={() => setActiveSecret(null)}
        >
          CLAIM & RESUME
        </PixelButton>
      </div>
    </div>
  );
}
