import React, { useState, useEffect, useRef } from 'react';
import { PixelButton } from '../ui/PixelButton';
import { playSlash, playUiClick, playUiHover, startAmbientDungeon } from '../../utils/audioSynth';
import { drawHeroCanvas } from '../../utils/pixelRenderer';

export function OpeningCutscene({ onComplete }) {
  const [scene, setScene] = useState(1); // 1: Black, 2: Torch, 3: Corridor, 4: Knight, 5: Title & Enter
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [audioPromptVisible, setAudioPromptVisible] = useState(true);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Advance scenes sequentially
  useEffect(() => {
    const timers = [];

    // Scene 1 -> 2 after 3.2s
    timers.push(setTimeout(() => setScene(2), 3200));
    // Scene 2 -> 3 after 6.2s
    timers.push(setTimeout(() => setScene(3), 6200));
    // Scene 3 -> 4 after 9.5s
    timers.push(setTimeout(() => setScene(4), 9500));
    // Scene 4 -> 5 after 13.0s
    timers.push(setTimeout(() => setScene(5), 13000));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Canvas animation for dungeon corridor, torches, dust particles, and knight
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle system
    const dustParticles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      alpha: Math.random() * 0.7 + 0.2
    }));

    const fireParticles = [];

    let startTime = Date.now();

    const render = () => {
      const now = Date.now();
      const elapsed = (now - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      // --- SCENE 1: Deep Black Void with subtle stardust ---
      if (scene === 1) {
        ctx.fillStyle = '#05070a';
        ctx.fillRect(0, 0, width, height);

        // Ambient faint dust
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        dustParticles.forEach((p) => {
          ctx.fillRect(p.x, p.y, p.size, p.size);
          p.y += p.speedY * 0.4;
          if (p.y < 0) p.y = height;
        });
      }

      // --- SCENE 2: The Flickering Torch in the Dark ---
      if (scene >= 2) {
        ctx.fillStyle = '#080a0f';
        ctx.fillRect(0, 0, width, height);

        // Torch light radius expanding
        const torchX = width / 2;
        const torchY = height / 2 - 20;
        const flicker = Math.sin(now * 0.02) * 8 + Math.cos(now * 0.05) * 6;
        const radius = scene === 2 ? 140 + flicker : 320 + flicker;

        const radialGlow = ctx.createRadialGradient(torchX, torchY, 10, torchX, torchY, radius);
        radialGlow.addColorStop(0, 'rgba(245, 158, 11, 0.85)');
        radialGlow.addColorStop(0.35, 'rgba(217, 119, 6, 0.4)');
        radialGlow.addColorStop(0.7, 'rgba(180, 83, 9, 0.15)');
        radialGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(torchX, torchY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Spawn fire embers
        if (fireParticles.length < 35) {
          fireParticles.push({
            x: torchX + (Math.random() - 0.5) * 12,
            y: torchY + 10,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2.5 - 1,
            size: Math.random() * 3 + 2,
            color: Math.random() > 0.5 ? '#f59e0b' : '#ef4444',
            life: 1
          });
        }

        // Draw and update fire particles
        for (let i = fireParticles.length - 1; i >= 0; i--) {
          const p = fireParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.03;
          if (p.life <= 0) {
            fireParticles.splice(i, 1);
            continue;
          }
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.globalAlpha = 1.0;
        }

        // Draw Torch wooden bracket & glowing head
        ctx.fillStyle = '#451a03';
        ctx.fillRect(torchX - 4, torchY + 12, 8, 30);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(torchX - 3, torchY + 14, 6, 26);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(torchX - 5, torchY - 2 + Math.sin(now * 0.04) * 2, 10, 14);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(torchX - 3, torchY - 6 + Math.sin(now * 0.05) * 3, 6, 8);
      }

      // --- SCENE 3 & 4: Parallax Dungeon Corridor ---
      if (scene >= 3) {
        // Perspective corridor stone walls
        const vanishingX = width / 2;
        const vanishingY = height / 2 - 30;

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;

        // Floor perspective lines
        for (let i = -4; i <= 4; i++) {
          ctx.beginPath();
          ctx.moveTo(vanishingX, vanishingY);
          ctx.lineTo(vanishingX + i * (width * 0.22), height);
          ctx.stroke();
        }

        // Horizontal floor flagstones
        const steps = 6;
        for (let s = 1; s <= steps; s++) {
          const y = vanishingY + Math.pow(s / steps, 2.2) * (height - vanishingY);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.strokeStyle = '#182030';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Left & Right stone wall pillars
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width * 0.16, height);
        ctx.fillRect(width * 0.84, 0, width * 0.16, height);

        // Brick outlines
        ctx.strokeStyle = '#273549';
        ctx.lineWidth = 2;
        for (let y = 0; y < height; y += 45) {
          ctx.strokeRect(0, y, width * 0.16, 45);
          ctx.strokeRect(width * 0.84, y, width * 0.16, 45);
        }

        // Floating dungeon dust particles
        ctx.fillStyle = 'rgba(248, 250, 252, 0.45)';
        dustParticles.forEach((p) => {
          ctx.fillRect(p.x, p.y, p.size, p.size);
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.y < 0) p.y = height;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
        });
      }

      // --- SCENE 4: Knight Silhouette Approaching ---
      if (scene >= 4) {
        const knightScale = scene === 4 ? 2.5 : 3.2;
        const walkBob = Math.sin(now * 0.008) * 3;
        const kx = width / 2;
        const ky = height / 2 + 50 + walkBob;

        // Silhouette / Lit Knight
        ctx.save();
        ctx.translate(kx, ky);

        // Ground shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.ellipse(0, 35 * knightScale * 0.4, 25 * knightScale, 7 * knightScale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Knight model
        const s = knightScale * 0.8;
        // Cape
        ctx.fillStyle = scene === 4 ? '#450a0a' : '#991b1b';
        ctx.fillRect(-12 * s, -14 * s, 24 * s, 28 * s);
        // Armor
        ctx.fillStyle = scene === 4 ? '#0f172a' : '#334155';
        ctx.fillRect(-8 * s, -16 * s, 16 * s, 22 * s);
        // Helmet
        ctx.fillStyle = scene === 4 ? '#1e293b' : '#475569';
        ctx.fillRect(-7 * s, -28 * s, 14 * s, 12 * s);
        // Glowing cyan eye slits
        ctx.fillStyle = '#00e5ff';
        ctx.fillRect(-3 * s, -23 * s, 3 * s, 2 * s);
        ctx.fillRect(2 * s, -23 * s, 3 * s, 2 * s);

        // Drawn Greatsword reflecting torch flame
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(10 * s, -30 * s, 4 * s, 36 * s);
        ctx.fillStyle = '#f59e0b'; // Light reflection
        ctx.fillRect(11 * s, -28 * s, 2 * s, 14 * s);

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [scene]);

  const handleEnterDungeon = () => {
    playSlash();
    setIsFadingOut(true);
    startAmbientDungeon();
    try {
      localStorage.setItem('arcSlashIntroSeen', 'true');
    } catch (e) {}
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  const handleSkip = () => {
    playUiClick();
    setIsFadingOut(true);
    startAmbientDungeon();
    try {
      localStorage.setItem('arcSlashIntroSeen', 'true');
    } catch (e) {}
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  const handleEnableAudio = () => {
    startAmbientDungeon();
    playUiClick();
    setAudioPromptVisible(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080a0f] text-white transition-opacity duration-700 select-none overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Interactive Animation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pixelated" />

      {/* Top Bar: Skip & Sound Enable */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        {audioPromptVisible && (
          <button
            type="button"
            onClick={handleEnableAudio}
            className="px-3 py-1.5 bg-[#182030]/90 border border-[#f59e0b] text-[#fde047] font-pixel text-[9px] tracking-wider hover:bg-[#b45309] hover:text-white transition-all shadow-[0_0_12px_rgba(245,158,11,0.3)] cursor-pointer"
          >
            🔊 ENABLE AUDIO
          </button>
        )}
        <button
          type="button"
          onClick={handleSkip}
          onMouseEnter={playUiHover}
          className="px-3 py-1.5 bg-[#0f172a]/90 border border-[#3b4b66] text-[#94a3b8] font-pixel text-[9px] tracking-widest hover:border-[#f8fafc] hover:text-white transition-all cursor-pointer"
        >
          SKIP [ESC] ⏭
        </button>
      </div>

      {/* Narrative Overlays according to Scene */}
      <div className="relative z-20 flex flex-col items-center justify-center max-w-2xl px-6 text-center">
        {scene === 1 && (
          <div className="animate-fade-in flex flex-col items-center">
            <h1 className="font-pixel text-lg sm:text-2xl text-[#f8fafc] tracking-widest leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] animate-pulse">
              THE DUNGEON REMEMBERS...
            </h1>
            <p className="font-outfit text-sm text-[#94a3b8] mt-4 tracking-wider">
              Deep within the forgotten catacombs, a blade stirs in the dark.
            </p>
          </div>
        )}

        {scene === 2 && (
          <div className="animate-fade-in flex flex-col items-center">
            <span className="font-pixel text-[10px] text-[#f59e0b] tracking-widest uppercase mb-3">
              ✦ Flame in the Void ✦
            </span>
            <p className="font-pixel text-xs sm:text-sm text-[#e2e8f0] tracking-wider leading-loose drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              A single torch flickers against the encroaching shadows.
            </p>
          </div>
        )}

        {scene === 3 && (
          <div className="animate-fade-in flex flex-col items-center">
            <span className="font-pixel text-[10px] text-[#38bdf8] tracking-widest uppercase mb-2">
              Depths Unveiled
            </span>
            <h2 className="font-pixel text-sm sm:text-base text-[#f8fafc] tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              THE LABYRINTH STRETCHES 50 FLOORS DEEP
            </h2>
          </div>
        )}

        {scene === 4 && (
          <div className="animate-fade-in flex flex-col items-center">
            <p className="font-pixel text-xs sm:text-sm text-[#fde047] tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              A CHAMPION STEPS FORWARD.
            </p>
          </div>
        )}

        {scene >= 5 && (
          <div className="flex flex-col items-center animate-fade-in">
            {/* Title & Subtitle */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-[#f59e0b]" />
              <span className="font-pixel text-[10px] text-[#f59e0b] tracking-widest uppercase">
                Dark Fantasy Action RPG
              </span>
              <span className="w-6 h-0.5 bg-[#f59e0b]" />
            </div>

            <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-[#f8fafc] tracking-widest my-3 drop-shadow-[0_0_24px_rgba(245,158,11,0.6)]">
              ARC SLASH
            </h1>

            <p className="font-outfit text-sm sm:text-base text-[#cbd5e1] max-w-md tracking-wider mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Enter the dungeon. Master your blade. Face the darkness.
            </p>

            {/* Interactive Enter Button */}
            <PixelButton
              variant="primary"
              size="lg"
              onClick={handleEnterDungeon}
              className="animate-bounce"
            >
              [ ENTER THE DUNGEON ]
            </PixelButton>

            <span className="font-pixel text-[9px] text-[#64748b] mt-6 tracking-widest">
              PRESS ENTER OR CLICK TO DESCEND
            </span>
          </div>
        )}
      </div>

      {/* Bottom Scene Indicator Dots */}
      <div className="absolute bottom-6 flex items-center gap-3 z-30">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScene(s)}
            aria-label={`Jump to scene ${s}`}
            className={`w-2.5 h-2.5 transition-all duration-300 ${
              scene === s
                ? 'bg-[#f59e0b] shadow-[0_0_8px_#f59e0b] scale-125'
                : 'bg-[#334155] hover:bg-[#64748b]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
