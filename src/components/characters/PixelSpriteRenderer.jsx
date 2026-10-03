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
  const [facing, setFacing] = useState('right');
  const [floatingText, setFloatingText] = useState(null);
  const [comboCount, setComboCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  // Attack execution ref with sub-frame tracking
  const attackRef = useRef({
    active: false,
    startTime: 0,
    duration: 480,
    combo: 0
  });

  // Trigger skill animation when triggerSkill prop changes from parent
  useEffect(() => {
    if (triggerSkill) {
      const now = Date.now();
      attackRef.current = {
        active: true,
        startTime: now,
        duration: 520,
        combo: 1
      };
      setComboCount((prev) => (prev % 3) + 1);
      setIsShaking(true);
      const shakeTimer = setTimeout(() => setIsShaking(false), 240);

      // Audio feedback tailored to ability or role
      if (role === 'mage') playSkill();
      else playSlash();

      return () => clearTimeout(shakeTimer);
    }
  }, [triggerSkill, role]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 260);
    const height = (canvas.height = 280);

    let animId;

    const render = () => {
      const now = Date.now();
      const time = now * 0.005;

      let isAttacking = false;
      let attackProgress = 0;
      let combo = attackRef.current.combo;

      if (attackRef.current.active) {
        const elapsed = now - attackRef.current.startTime;
        if (elapsed < attackRef.current.duration) {
          isAttacking = true;
          attackProgress = elapsed / attackRef.current.duration;
        } else {
          attackRef.current.active = false;
        }
      }

      drawHeroCanvas(ctx, role, width, height, {
        time,
        isAttacking,
        attackProgress,
        combo,
        facing,
        scale,
        hasGlow: true
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [role, facing, scale]);

  const handleClick = () => {
    const now = Date.now();
    const nextCombo = attackRef.current.active ? (attackRef.current.combo + 1) % 3 : 0;

    attackRef.current = {
      active: true,
      startTime: now,
      duration: 480,
      combo: nextCombo
    };

    setComboCount(nextCombo + 1);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 240);

    // Audio feedback
    if (role === 'mage') {
      playSkill();
    } else {
      playSlash();
    }

    // Role-specific RPG combat feedback
    const feedbackList = {
      knight: [
        { label: '⚔️ CRESCENT SLASH', dmg: '168 DMG', color: '#f59e0b' },
        { label: '✦ HEAVY CLEAVE', dmg: '280 CRIT!', color: '#fde047' },
        { label: '💥 HEROIC BREAKER!', dmg: '460 CRIT!', color: '#ef4444' }
      ],
      mage: [
        { label: '🔮 ARCANE MISSILE', dmg: '195 MAG', color: '#c084fc' },
        { label: '⚡ COSMIC RAY', dmg: '320 CRIT!', color: '#e879f9' },
        { label: '🌟 ASTRAL BURST!', dmg: '540 CRIT!', color: '#60a5fa' }
      ],
      assassin: [
        { label: '🗡️ SHADOW DASH', dmg: '185 DMG', color: '#34d399' },
        { label: '💨 SCISSOR CLEAVE', dmg: '330 CRIT!', color: '#10b981' },
        { label: '☠️ FATAL X-STRIKE!', dmg: '620 CRIT!', color: '#a7f3d0' }
      ]
    };

    const list = feedbackList[role] || feedbackList.knight;
    setFloatingText({ ...list[nextCombo], id: now });

    if (onSpriteClick) onSpriteClick();
  };

  return (
    <div
      className={`relative flex items-center justify-center cursor-pointer group select-none transition-transform duration-75 ${
        isShaking ? 'translate-x-1 scale-[1.01]' : ''
      }`}
      onClick={handleClick}
      title="Click hero to attack and chain combos!"
    >
      {/* Explicit direction toggle button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setFacing((prev) => (prev === 'right' ? 'left' : 'right'));
        }}
        title="Flip facing direction"
        className="absolute top-2 right-2 px-2 py-0.5 bg-[#090d14]/90 border border-[#2c394b] hover:border-[#f59e0b] text-[#94a3b8] hover:text-[#fde047] font-pixel text-[7.5px] transition-all cursor-pointer z-10 shadow-sm"
      >
        FLIP ⇄
      </button>

      {/* Combo badge */}
      {comboCount > 0 && (
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#101622]/90 border border-[#f59e0b]/70 text-[#fde047] font-pixel text-[7.5px] tracking-wider pointer-events-none shadow-sm animate-pulse z-10">
          COMBO x{comboCount}
        </span>
      )}

      {/* Floating combat numbers */}
      {floatingText && (
        <div
          key={floatingText.id}
          className="absolute top-6 pointer-events-none flex flex-col items-center animate-combat-float z-20"
        >
          <span
            className="font-pixel text-[9px] tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
            style={{ color: floatingText.color }}
          >
            {floatingText.label}
          </span>
          <span className="font-pixel text-[8.5px] text-[#f8fafc] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] font-bold">
            {floatingText.dmg}
          </span>
        </div>
      )}

      <canvas ref={canvasRef} className="block pixelated max-w-full" />

      {/* Bottom prompt badge */}
      <span className="absolute bottom-1 px-3 py-1 bg-[#090d14]/90 border border-[#3b4b66] text-[#94a3b8] font-pixel text-[7.5px] tracking-wider pointer-events-none group-hover:text-[#fde047] group-hover:border-[#f59e0b] shadow-lg transition-all flex items-center gap-1.5">
        <span>⚔️</span> CLICK TO ATTACK / CHAIN COMBO
      </span>
    </div>
  );
}
