import React, { useState, useEffect, useRef } from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { playHit, playShield, playUiClick, playUiHover, playExplosion } from '../../utils/audioSynth';
import { drawBossCanvas } from '../../utils/pixelRenderer';

export function TrailerSection() {
  const [sealHitCount, setSealHitCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [showSealAlert, setShowSealAlert] = useState(false);
  const [notified, setNotified] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Triggered when user attempts to interact with or break the sealed trailer
  const handleAttemptAccess = () => {
    playShield();
    setShake(true);
    setSealHitCount((prev) => prev + 1);
    setShowSealAlert(true);

    setTimeout(() => setShake(false), 450);
  };

  const handleNotifyToggle = () => {
    playUiClick();
    setNotified(!notified);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || 640);
    let height = (canvas.height = canvas.parentElement.clientHeight || 380);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 380;
    };
    window.addEventListener('resize', handleResize);

    let frame = 0;

    const render = () => {
      frame++;
      const time = frame * 0.03;
      ctx.clearRect(0, 0, width, height);

      // --- LAYER 1: Darkened Encrypted CRT Surveillance Monitor ---
      ctx.fillStyle = '#06080e';
      ctx.fillRect(0, 0, width, height);

      // Subtle encrypted grid
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      for (let y = 0; y < height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Distant shadowy glimpse of Warden / Slime boss behind encrypted static
      ctx.save();
      ctx.globalAlpha = 0.22 + Math.sin(time * 2) * 0.08;
      ctx.translate(width * 0.5, height * 0.52);
      drawBossCanvas(ctx, 'warden', 220, 220, { time, scale: 2.2 });
      ctx.restore();

      // CRT Scanlines & TV static glitches
      for (let y = 0; y < height; y += 4) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.fillRect(0, y, width, 2);
      }

      // Random CRT static noise lines
      if (Math.random() > 0.4) {
        const glitchY = Math.random() * height;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.fillRect(0, glitchY, width, Math.random() * 8 + 2);
      }

      // Encrypted Feed Watermark Text
      ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.font = '9px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('[ TRANSMISSION ENCRYPTED — LEVEL 5 CLEARANCE REQUIRED ]', width / 2, 45);

      // --- LAYER 2: Heavy Criss-Crossing Arcane Chains ---
      const drawChain = (x1, y1, x2, y2, color1 = '#475569', color2 = '#1e293b') => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.hypot(dx, dy);
        const steps = Math.floor(dist / 22);

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const cx = x1 + dx * t;
          const cy = y1 + dy * t;
          const linkAngle = Math.atan2(dy, dx) + (i % 2 === 0 ? 0 : 0.85);

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(linkAngle);

          // Chain shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(-8, -4, 18, 9);

          // Chain link outer
          ctx.fillStyle = color1;
          ctx.fillRect(-7, -3.5, 15, 7);

          // Inner link hole
          ctx.fillStyle = color2;
          ctx.fillRect(-3, -1.5, 7, 3);

          // Specular highlight
          ctx.fillStyle = '#94a3b8';
          ctx.fillRect(-6, -3, 12, 1.5);

          ctx.restore();
        }
      };

      // Diagonal Chains (Corner to Corner)
      drawChain(0, 0, width, height, '#64748b', '#0f172a');
      drawChain(width, 0, 0, height, '#64748b', '#0f172a');

      // Horizontal Center Chains
      drawChain(0, height / 2, width, height / 2, '#475569', '#1e293b');

      // --- LAYER 3: Glowing Arcane Seal & Magic Sigil (Pusat Segel Sihir) ---
      const midX = width / 2;
      const midY = height / 2;
      const pulse = Math.sin(time * 3) * 0.15 + 0.85;

      // Magical Barrier Aura
      const barrierRad = 95 * pulse;
      const auraGrad = ctx.createRadialGradient(midX, midY, 15, midX, midY, barrierRad);
      auraGrad.addColorStop(0, 'rgba(239, 68, 68, 0.45)');
      auraGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.25)');
      auraGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(midX, midY, barrierRad, 0, Math.PI * 2);
      ctx.fill();

      // Outer Magic Circle with Spinning Ancient Runes
      ctx.save();
      ctx.translate(midX, midY);
      ctx.rotate(time * 0.4);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating Runic Marks on Outer Circle
      const runes = ['✦', '⚔', '🛡', '⚡', 'ᛟ', 'ᚱ', 'ᛉ', '᚛'];
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#fde047';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let r = 0; r < runes.length; r++) {
        const ang = (r * Math.PI * 2) / runes.length;
        ctx.fillText(runes[r], Math.cos(ang) * 75, Math.sin(ang) * 75);
      }
      ctx.restore();

      // Inner Counter-Rotating Circle
      ctx.save();
      ctx.translate(midX, midY);
      ctx.rotate(-time * 0.5);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, 0, 56, 0, Math.PI * 2);
      ctx.stroke();

      // 6-pointed star / hexagon inside
      for (let h = 0; h < 6; h++) {
        const hAng = (h * Math.PI * 2) / 6;
        ctx.fillStyle = '#fca5a5';
        ctx.fillRect(Math.cos(hAng) * 56 - 2.5, Math.sin(hAng) * 56 - 2.5, 5, 5);
      }
      ctx.restore();

      // Heavy Iron Seal Padlock Body
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(midX - 32, midY - 24, 64, 48);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.strokeRect(midX - 32, midY - 24, 64, 48);

      // Padlock shackle loop
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(midX, midY - 24, 20, Math.PI, 0);
      ctx.stroke();

      // Glowing Ruby Keyhole / Seal Core
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(midX, midY - 2, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fde047';
      ctx.fillRect(midX - 3, midY + 4, 6, 10);

      // Padlock Crest Inscription
      ctx.font = '7.5px "Press Start 2P", monospace';
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      ctx.fillText('SEALED', midX, midY + 36);

      // --- LAYER 4: Hazard Diagonal Warning Strips ---
      const tapeH = 22;
      // Top Hazard Tape
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(0, 0, width, tapeH);
      ctx.fillStyle = '#f59e0b';
      ctx.font = '7.5px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('/// ⚠ AREA DISEGEL • DALAM PENGEMBANGAN • WORK IN PROGRESS ⚠ ///', width / 2, 14);

      // Bottom Hazard Tape
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(0, height - tapeH, width, tapeH);
      ctx.fillStyle = '#ef4444';
      ctx.fillText('/// 🔒 CLASSIFIED REEL • TAHAP PRODUKSI • ACCESS LOCKED 🔒 ///', width / 2, height - 8);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section id="trailer" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#111622] border border-[#ef4444]/60 shadow-[0_0_12px_rgba(239,68,68,0.25)]">
          <span className="w-2 h-2 bg-[#ef4444] animate-ping" />
          <span className="font-pixel text-[9px] text-[#ef4444] tracking-widest uppercase">
            SEKTOR TERKUNCI // CLASSIFIED ARCHIVE
          </span>
        </div>

        <h2 className="font-pixel text-3xl sm:text-4xl text-[#f8fafc] tracking-widest mb-4 flex items-center gap-3">
          <span>RUANG TRAILER SINEMATIK</span>
          <span className="text-[#ef4444] text-2xl sm:text-3xl">[DISEGEL]</span>
        </h2>

        <p className="font-outfit text-sm sm:text-base text-[#94a3b8] max-w-xl">
          Bilik rekaman trailer resmi saat ini disegel oleh rantai sihir kuno dan sedang dalam tahap pengembangan aktif oleh tim pengembang Parallel Dungeons. Rekaman penuh akan dibuka pada pembaruan rilis mendatang.
        </p>
      </div>

      {/* Main Sealed Arcade / Vault Frame */}
      <div className="max-w-4xl mx-auto">
        <PixelCard
          variant="crimson"
          className={`p-2 sm:p-4 bg-[#0a0d14] border-2 border-[#ef4444]/60 shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-transform duration-150 ${
            shake ? 'translate-x-1 -translate-y-1 scale-[1.01]' : ''
          }`}
        >
          {/* Top Arcade Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#111622] border-b border-[#2c394b] font-pixel text-[8.5px] text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ef4444] animate-pulse" />
              <span className="text-[#fca5a5]">STATUS: DISEGEL (DALAM PENGEMBANGAN)</span>
            </div>
            <span className="text-[#f59e0b]">ENKRIPSI: LEVEL 5 ARCANUM</span>
          </div>

          {/* Sealed Interactive Canvas Container */}
          <div
            className="relative w-full h-[300px] sm:h-[400px] md:h-[460px] cursor-not-allowed bg-[#05070a] overflow-hidden select-none group"
            onClick={handleAttemptAccess}
            title="Sektor trailer disegel! Klik untuk mengetes kekuatan segel sihir."
          >
            <canvas ref={canvasRef} className="w-full h-full block pixelated" />

            {/* Floating Interactive Hover Prompt */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]">
              <div className="px-4 py-2 bg-[#18111d] border-2 border-[#ef4444] text-[#fca5a5] font-pixel text-[9px] tracking-wider shadow-lg flex items-center gap-2">
                <span>🔒</span>
                <span>SEGEL SIHIR AKTIF • KLIK UNTUK MENGUJI</span>
              </div>
            </div>
          </div>

          {/* Under-Vault Status HUD & Production Console */}
          <div className="pt-4 px-3 pb-2 flex flex-col gap-3 bg-[#111622] border-t border-[#2c394b]">
            {/* Alert Banner when clicked */}
            {showSealAlert && (
              <div className="p-3 bg-[#1e1017] border border-[#ef4444] flex items-start justify-between gap-3 animate-fade-in font-outfit text-xs text-[#fca5a5]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <span className="font-pixel text-[8.5px] text-[#ef4444] block mb-0.5">
                      SEGEL SIHIR TERLALU KUAT! ({sealHitCount}x DIUJI)
                    </span>
                    <span>
                      Rekaman sinematik sedang dipersiapkan dan dioptimalkan untuk performa 60 FPS. Belum siap untuk diputar ke publik.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSealAlert(false)}
                  className="font-pixel text-[8px] text-[#94a3b8] hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Development Progress Bar */}
            <div>
              <div className="flex items-center justify-between font-pixel text-[8px] text-[#cbd5e1] mb-1.5">
                <span className="text-[#f59e0b]">PROGRES PENGEMBANGAN TRAILER</span>
                <span className="text-[#38bdf8]">82% COMPLETE</span>
              </div>
              <div className="w-full h-3 bg-[#090d15] border border-[#3b4b66] p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#22c55e]"
                  style={{ width: '82%' }}
                />
              </div>
            </div>

            {/* Bottom Actions Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 font-pixel text-[8.5px]">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleNotifyToggle}
                  onMouseEnter={playUiHover}
                  className={`px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 ${
                    notified
                      ? 'bg-[#064e3b] border-[#10b981] text-[#6ee7b7]'
                      : 'bg-[#182030] border-[#3b4b66] text-[#cbd5e1] hover:border-[#f59e0b] hover:text-[#fde047]'
                  }`}
                >
                  <span>{notified ? '✓' : '🔔'}</span>
                  <span>{notified ? 'NOTIFIKASI AKTIF' : 'KABARI SAAT RILIS'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    setShowRoadmap(!showRoadmap);
                  }}
                  onMouseEnter={playUiHover}
                  className="px-3 py-1.5 bg-[#182030] border border-[#3b4b66] text-[#cbd5e1] hover:border-[#38bdf8] hover:text-[#38bdf8] transition-all cursor-pointer"
                >
                  {showRoadmap ? '▲ SEMBUNYIKAN ROADMAP' : '▼ INTIP ROADMAP'}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-outfit text-xs text-[#64748b] hidden sm:inline">
                  TARGET: UPDATE EKSPANSI 2026
                </span>
                <PixelButton
                  variant="primary"
                  size="sm"
                  href="https://game.parallel-dungeons.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[8px] px-3 py-1.5"
                  icon="⚔️"
                >
                  MAINKAN GAME LIVE
                </PixelButton>
              </div>
            </div>

            {/* Collapsible Developer Roadmap Drawer */}
            {showRoadmap && (
              <div className="mt-2 p-3 bg-[#0d121c] border border-[#2c394b] animate-fade-in font-outfit text-xs space-y-2">
                <div className="font-pixel text-[8px] text-[#fde047] uppercase tracking-wider mb-2">
                  ✦ ROADMAP PRODUKSI TRAILER RESMI ✦
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#94a3b8]">
                  <div className="flex items-center gap-2 p-2 bg-[#111622] border border-[#1e293b]">
                    <span className="text-[#22c55e]">✓</span>
                    <span>16-Bit Engine Capture Footage (Selesai)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#111622] border border-[#1e293b]">
                    <span className="text-[#22c55e]">✓</span>
                    <span>Boss Encounters Storyboard (Selesai)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#111622] border border-[#1e293b]">
                    <span className="text-[#f59e0b]">⏳</span>
                    <span>Orchestral Synth OST Remaster (75%)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#111622] border border-[#1e293b]">
                    <span className="text-[#f59e0b]">⏳</span>
                    <span>Final Cutscene 4K Retro Color Grading (60%)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </PixelCard>
      </div>
    </section>
  );
}
