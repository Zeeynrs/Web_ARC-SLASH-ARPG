import React, { useEffect, useRef, useState } from 'react';
import { drawHeroCanvas } from '../../utils/pixelRenderer';
import { playSlash, playSkill } from '../../utils/audioSynth';

export function PixelSpriteRenderer({
  role = 'knight',
  scale = 4.2,
  triggerSkill = null,
  onSpriteClick
}) {
  const canvasRef = useRef(null);
  const [isAttacking, setIsAttacking] = useState(false);
  const [facing, setFacing] = useState('right');

  // Trigger skill animation when triggerSkill prop changes
  useEffect(() => {
    if (triggerSkill) {
      setIsAttacking(true);
      const timer = setTimeout(() => setIsAttacking(false), 450);
      return () => clearTimeout(timer);
    }
  }, [triggerSkill]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 240);
    const height = (canvas.height = 280);

    let animId;

    const render = () => {
      const now = Date.now();
      const time = now * 0.005;

      drawHeroCanvas(ctx, role, width, height, {
        time,
        isAttacking,
        facing,
        scale,
        hasGlow: true
      });

      // Special particle burst during attack/skill
      if (isAttacking) {
        ctx.save();
        const color = role === 'mage' ? '#c084fc' : role === 'assassin' ? '#34d399' : '#f59e0b';
        ctx.fillStyle = color;
        for (let i = 0; i < 6; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 30 + Math.random() * 40;
          const px = width / 2 + Math.cos(angle) * dist;
          const py = height / 2 + Math.sin(angle) * dist;
          ctx.fillRect(px, py, 4, 4);
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [role, isAttacking, facing, scale]);

  const handleClick = () => {
    playSlash();
    setIsAttacking(true);
    setFacing((prev) => (prev === 'right' ? 'left' : 'right'));
    setTimeout(() => setIsAttacking(false), 350);
    if (onSpriteClick) onSpriteClick();
  };

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer group"
      onClick={handleClick}
      title="Click hero to attack!"
    >
      <canvas ref={canvasRef} className="block pixelated max-w-full" />
      <span className="absolute bottom-1 px-2.5 py-0.5 bg-[#090d14]/90 border border-[#3b4b66] text-[#94a3b8] font-pixel text-[7.5px] tracking-wider pointer-events-none group-hover:text-[#fde047] group-hover:border-[#f59e0b] transition-all">
        CLICK TO TEST ATTACK ⚔️
      </span>
    </div>
  );
}
