import React from 'react';
import { PixelButton } from '../ui/PixelButton';
import { PixelCard } from '../ui/PixelCard';
import { PixelBadge } from '../ui/PixelBadge';
import { DungeonCanvas } from './DungeonCanvas';
import { playUiClick } from '../../utils/audioSynth';

export function HeroSection({ onExploreWorld, onWatchTrailer }) {
  const stats = [
    { label: 'DUNGEON STAGES', val: '50', icon: '🏰', color: '#f59e0b' },
    { label: 'PLAYABLE CLASSES', val: '3', icon: '⚔️', color: '#38bdf8' },
    { label: 'ARSENAL ITEMS', val: '120+', icon: '🛡️', color: '#10b981' },
    { label: 'ACHIEVEMENTS', val: '18', icon: '🏆', color: '#c084fc' }
  ];

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-16 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#0284c7]/10 via-[#f59e0b]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Main Hero Header */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
        {/* Genre Tag */}
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#111622] border border-[#f59e0b]/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
          <span className="w-2 h-2 bg-[#f59e0b] animate-ping" />
          <span className="font-pixel text-[9px] sm:text-[10px] text-[#fde047] tracking-widest uppercase">
            IMMERSIVE 16-BIT DARK FANTASY ARPG
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl text-[#f8fafc] tracking-widest leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] mb-4">
          ARC SLASH
        </h1>

        {/* Subtitle / Fantasy Hook */}
        <h2 className="font-pixel text-xs sm:text-sm md:text-base text-[#38bdf8] tracking-widest uppercase mb-4">
          RETRO DUNGEON CRAWLER FOR THE WEB
        </h2>

        <p className="font-outfit text-base sm:text-lg text-[#cbd5e1] max-w-2xl leading-relaxed mb-8">
          Enter the dungeon. Master your blade. Face the darkness. Traverse through 50 dangerous chambers, harvest divine equipment, and survive the terrifying titan of the Deep Dark.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PixelButton
            variant="primary"
            size="lg"
            href="https://arch-slash-arpg.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            icon="⚔️"
            className="animate-pulse"
          >
            PLAY NOW (FREE)
          </PixelButton>

          <PixelButton
            variant="crimson"
            size="lg"
            onClick={onWatchTrailer}
            icon="🔒"
          >
            TRAILER [DISEGEL]
          </PixelButton>

          <PixelButton
            variant="dark"
            size="lg"
            onClick={onExploreWorld}
            icon="🗺️"
          >
            EXPLORE WORLD
          </PixelButton>
        </div>
      </div>

      {/* Main Interactive Pixel-Art Dungeon Stage Canvas */}
      <div className="max-w-4xl mx-auto mb-12">
        <PixelCard variant="gold" className="p-1 sm:p-2 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#0a0e17] border-b border-[#2c394b] font-pixel text-[8.5px] text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#22c55e] inline-block" />
              <span>LIVE ARENA PREVIEW — FLOOR 01</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#f59e0b]">60 FPS CANVAS 2D</span>
            </div>
          </div>
          <DungeonCanvas />
        </PixelCard>
      </div>

      {/* Stats Pillars Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {stats.map((s) => (
          <PixelCard key={s.label} className="p-4 text-center group hover:border-[#f59e0b] transition-all">
            <span className="text-2xl mb-2 block">{s.icon}</span>
            <div className="font-pixel text-xl sm:text-2xl text-[#f8fafc] mb-1 group-hover:text-[#fde047] transition-colors">
              {s.val}
            </div>
            <div className="font-pixel text-[8px] sm:text-[9px] text-[#94a3b8] uppercase tracking-wider">
              {s.label}
            </div>
          </PixelCard>
        ))}
      </div>
    </section>
  );
}
