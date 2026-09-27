import React, { useEffect, useRef, useState } from 'react';
import { drawHeroCanvas } from '../../utils/pixelRenderer';
import { playSlash } from '../../utils/audioSynth';

export function DungeonCanvas({ onKnightClick }) {
  const canvasRef = useRef(null);
  const [isSwinging, setIsSwinging] = useState(false);
  const [knightFacing, setKnightFacing] = useState('right');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 420;
    };
    window.addEventListener('resize', handleResize);

    // Torches on the walls
    const torches = [
      { x: 0.15, y: 0.38 },
      { x: 0.85, y: 0.38 }
    ];

    // Ambient floating dungeon embers & dust
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      color: Math.random() > 0.6 ? '#f59e0b' : '#38bdf8',
      alpha: Math.random() * 0.6 + 0.3
    }));

    let animId;

    const render = () => {
      const now = Date.now();
      const time = now * 0.005;
      ctx.clearRect(0, 0, width, height);

      // 1. Dungeon Dark Cobblestone Floor & Wall Backing
      ctx.fillStyle = '#0a0d14';
      ctx.fillRect(0, 0, width, height);

      // Wall division line
      const wallH = height * 0.58;
      ctx.fillStyle = '#0f1522';
      ctx.fillRect(0, 0, width, wallH);

      // Stone Wall Brick Grid
      ctx.strokeStyle = '#1b2434';
      ctx.lineWidth = 2;
      for (let y = 0; y < wallH; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        const offset = (y / 36) % 2 === 0 ? 0 : 35;
        for (let x = offset; x < width; x += 70) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + 36);
          ctx.stroke();
        }
      }

      // Stone Floor flagstones
      ctx.fillStyle = '#0d121c';
      ctx.fillRect(0, wallH, width, height - wallH);
      ctx.strokeStyle = '#1a2233';
      for (let y = wallH; y < height; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Floor border trim
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, wallH - 3, width, 6);

      // 2. Flickering Wall Torches
      torches.forEach((t) => {
        const tx = width * t.x;
        const ty = height * t.y;
        const flicker = Math.sin(now * 0.02 + tx) * 6;
        const rad = 110 + flicker;

        // Radial light
        const glow = ctx.createRadialGradient(tx, ty, 5, tx, ty, rad);
        glow.addColorStop(0, 'rgba(245, 158, 11, 0.7)');
        glow.addColorStop(0.5, 'rgba(217, 119, 6, 0.25)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(tx, ty, rad, 0, Math.PI * 2);
        ctx.fill();

        // Wooden sconce & Flame head
        ctx.fillStyle = '#451a03';
        ctx.fillRect(tx - 3, ty + 6, 6, 16);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(tx - 4, ty - 3 + Math.sin(now * 0.03) * 2, 8, 10);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(tx - 2, ty - 7 + Math.sin(now * 0.05) * 2, 4, 6);
      });

      // 3. Central Animated Knight
      const knightX = width / 2;
      const knightY = wallH + 45;

      drawHeroCanvas(ctx, 'knight', width, height, {
        time,
        isAttacking: isSwinging,
        facing: knightFacing,
        scale: 3.4,
        hasGlow: true
      });

      // 4. Floating dungeon embers
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      });
      ctx.globalAlpha = 1.0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isSwinging, knightFacing]);

  const handleCanvasClick = (e) => {
    playSlash();
    setIsSwinging(true);
    // Alternate facing direction
    setKnightFacing((prev) => (prev === 'right' ? 'left' : 'right'));
    setTimeout(() => setIsSwinging(false), 300);
    if (onKnightClick) onKnightClick();
  };

  return (
    <div 
      className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] cursor-pointer group"
      onClick={handleCanvasClick}
      title="Click Knight to swing sword!"
    >
      <canvas ref={canvasRef} className="w-full h-full block pixelated" />

      {/* Floating Tactical Cue */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#111622]/85 border border-[#3b4b66] text-[#94a3b8] font-pixel text-[8px] tracking-wider pointer-events-none group-hover:border-[#f59e0b] group-hover:text-[#fde047] transition-all">
        ⚔️ CLICK CHAMPION TO SWING BLADE
      </div>
    </div>
  );
}
