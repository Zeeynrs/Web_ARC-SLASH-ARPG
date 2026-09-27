import React, { useState, useEffect, useRef } from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { playSlash, playHit, playExplosion, playBossRoar, playUiClick, playUiHover } from '../../utils/audioSynth';
import { drawHeroCanvas, drawBossCanvas } from '../../utils/pixelRenderer';

export function TrailerSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentScene, setCurrentScene] = useState('ARENA COMBAT');
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Play / Pause toggle
  const togglePlay = () => {
    playUiClick();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || 640);
    let height = (canvas.height = canvas.parentElement.clientHeight || 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 360;
    };
    window.addEventListener('resize', handleResize);

    let frameCount = 0;

    const render = () => {
      frameCount++;
      const time = frameCount * 0.03;

      if (isPlaying) {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.15));
      }

      ctx.clearRect(0, 0, width, height);

      // Background Dungeon Arena
      ctx.fillStyle = '#0a0d15';
      ctx.fillRect(0, 0, width, height);

      // Floor grid
      ctx.strokeStyle = '#161f30';
      ctx.lineWidth = 2;
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Simulated Gameplay Action Scenes based on progress %
      if (progress < 40) {
        // Scene 1: Slime Dungeon Melee Action
        setCurrentScene('FLOOR 01 — SLIME DUNGEON LABYRINTH');

        // Draw Player Knight
        const px = width * 0.35 + Math.sin(time * 2) * 20;
        const py = height * 0.55;
        drawHeroCanvas(ctx, 'knight', width * 0.8, height, {
          time,
          isAttacking: Math.sin(time * 4) > 0.3,
          facing: 'right',
          scale: 3.2
        });

        // Draw Slime King Boss on the right
        ctx.save();
        ctx.translate(width * 0.65, height * 0.55);
        drawBossCanvas(ctx, 'slime', 200, 200, { time, scale: 2.2 });
        ctx.restore();

        // Slash sparks
        if (Math.sin(time * 4) > 0.5) {
          ctx.fillStyle = '#fde047';
          ctx.fillRect(width * 0.48, height * 0.5, 6, 6);
          ctx.fillRect(width * 0.52, height * 0.46, 8, 8);
        }
      } else if (progress < 75) {
        // Scene 2: The Warden Boss Encounter & Sonic Boom
        setCurrentScene('FLOOR 35 — THE WARDEN (SONIC CATACLYSM)');

        // Draw Player dodging
        drawHeroCanvas(ctx, 'knight', width * 0.5, height, {
          time,
          isAttacking: false,
          facing: 'left',
          scale: 3.0
        });

        // Draw The Warden
        ctx.save();
        ctx.translate(width * 0.68, height * 0.52);
        drawBossCanvas(ctx, 'warden', 240, 240, { time, scale: 2.6 });
        ctx.restore();

        // Sonic Cataclysm Beam Telegraph
        const beamPulse = Math.sin(time * 8);
        if (beamPulse > 0.2) {
          ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
          ctx.fillRect(0, height * 0.46, width * 0.7, 30);
          ctx.fillStyle = '#67e8f9';
          ctx.fillRect(0, height * 0.49, width * 0.7, 8);
        }
      } else {
        // Scene 3: Alter Ego Duel & Climax
        setCurrentScene('FLOOR 50 — DEEP DARK CORE (TRUE MIRROR)');

        // Draw Assassin Player
        ctx.save();
        ctx.translate(width * 0.28, height * 0.52);
        drawHeroCanvas(ctx, 'assassin', 200, 200, {
          time,
          isAttacking: true,
          facing: 'right',
          scale: 3.2
        });
        ctx.restore();

        // Draw Alter Ego Nemesis
        ctx.save();
        ctx.translate(width * 0.72, height * 0.52);
        drawBossCanvas(ctx, 'alter_ego', 200, 200, { time, scale: 2.4 });
        ctx.restore();
      }

      // Paused Watermark Overlay
      if (!isPlaying) {
        ctx.fillStyle = 'rgba(8, 10, 15, 0.75)';
        ctx.fillRect(0, 0, width, height);

        // Big Retro Play Triangle
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        const midX = width / 2;
        const midY = height / 2;
        ctx.moveTo(midX - 25, midY - 30);
        ctx.lineTo(midX + 35, midY);
        ctx.lineTo(midX - 25, midY + 30);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '11px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK TO PLAY GAMEPLAY DEMO REEL', midX, midY + 65);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, progress]);

  return (
    <section id="trailer" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#111622] border border-[#ef4444]/40">
          <span className="font-pixel text-[9px] text-[#ef4444] tracking-widest uppercase">
            CINEMATIC DEMO REEL
          </span>
        </div>

        <h2 className="font-pixel text-3xl sm:text-4xl text-[#f8fafc] tracking-widest mb-4">
          ARC SLASH IN ACTION
        </h2>

        <p className="font-outfit text-sm sm:text-base text-[#94a3b8] max-w-xl">
          Watch real-time dungeon action featuring Sweeping Slashes, Warden Sonic Cataclysms, and high-floor Alter Ego parry duels.
        </p>
      </div>

      {/* Main Pixel TV / Video Frame */}
      <div className="max-w-4xl mx-auto">
        <PixelCard variant="gold" className="p-2 sm:p-4 bg-[#0a0d14]">
          {/* Top Arcade Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#111622] border-b border-[#2c394b] font-pixel text-[8.5px] text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 ${isPlaying ? 'bg-[#ef4444] animate-pulse' : 'bg-[#64748b]'}`} />
              <span className="text-[#f8fafc]">{currentScene}</span>
            </div>
            <span className="text-[#f59e0b]">60 FPS RETRO REC</span>
          </div>

          {/* Video Canvas Container */}
          <div
            className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] cursor-pointer bg-[#05070a] overflow-hidden"
            onClick={togglePlay}
          >
            <canvas ref={canvasRef} className="w-full h-full block pixelated" />
          </div>

          {/* Custom Pixel Video Player Controls */}
          <div className="pt-3 px-2 flex flex-col gap-2 bg-[#111622] border-t border-[#2c394b]">
            {/* Scrubber Progress Bar */}
            <div
              className="w-full h-2.5 bg-[#090d15] border border-[#3b4b66] cursor-pointer p-0.5"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = (clickX / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, newProgress)));
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-[#b45309] to-[#f59e0b]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom Playback Buttons */}
            <div className="flex items-center justify-between font-pixel text-[9px] text-[#cbd5e1] py-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  onMouseEnter={playUiHover}
                  className="px-3 py-1 bg-[#1e293b] border border-[#475569] hover:border-[#f59e0b] hover:text-[#fde047] transition-all cursor-pointer"
                >
                  {isPlaying ? 'PAUSE ⏸' : 'PLAY ▶'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  onMouseEnter={playUiHover}
                  className="px-2.5 py-1 bg-[#1e293b] border border-[#475569] hover:border-[#38bdf8] transition-all cursor-pointer"
                >
                  {isMuted ? '🔇 MUTED' : '🔊 SFX'}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-outfit text-xs text-[#94a3b8]">
                  {Math.round(progress)}% COMPLETE
                </span>
                <PixelButton
                  variant="primary"
                  size="sm"
                  href="https://arch-slash-arpg.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[8px] px-3 py-1"
                >
                  PLAY GAME
                </PixelButton>
              </div>
            </div>
          </div>
        </PixelCard>
      </div>
    </section>
  );
}
