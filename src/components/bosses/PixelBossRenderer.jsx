import React, { useEffect, useRef, useState } from 'react';
import { drawBossCanvas } from '../../utils/pixelRenderer';
import { playBossRoar } from '../../utils/audioSynth';

export function PixelBossRenderer({ bossId = 'warden', scale = 2.4, onRoar }) {
  const canvasRef = useRef(null);
  const [isRoaring, setIsRoaring] = useState(false);
  const roaringRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 280);
    const height = (canvas.height = 300);

    let animId;

    const render = () => {
      const time = Date.now() * 0.005;
      drawBossCanvas(ctx, bossId, width, height, {
        time,
        scale,
        isRoaring: roaringRef.current
      });
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [bossId, scale]);

  const handleClick = () => {
    playBossRoar();
    setIsRoaring(true);
    roaringRef.current = true;
    setTimeout(() => {
      setIsRoaring(false);
      roaringRef.current = false;
    }, 1200);

    if (onRoar) onRoar();
  };

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer group"
      onClick={handleClick}
      title="Click boss to provoke roar!"
    >
      <canvas ref={canvasRef} className="block pixelated max-w-full" />
      <span
        className={`absolute bottom-1 px-2.5 py-0.5 border font-pixel text-[7.5px] tracking-wider pointer-events-none group-hover:scale-105 transition-all shadow-[0_0_8px_rgba(34,211,238,0.3)] ${
          isRoaring
            ? 'bg-[#ef4444]/90 border-[#fbbf24] text-[#fde047] scale-110 shadow-[0_0_15px_rgba(239,68,68,0.6)]'
            : 'bg-[#080d17]/90 border-[#22d3ee] text-[#22d3ee]'
        }`}
      >
        {isRoaring ? 'ENRAGED ROARING! 💥' : 'CLICK TO PROVOKE ROAR 🔊'}
      </span>
    </div>
  );
}
