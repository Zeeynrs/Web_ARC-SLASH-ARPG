import React, { useState } from 'react';
import { PixelButton } from '../ui/PixelButton';
import { playUiClick, playUiHover, playCoin } from '../../utils/audioSynth';

export function Navbar({ onOpenSettings, soundState, onTriggerSecret, onReplayIntro }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const navLinks = [
    { label: 'WORLD', href: '#world' },
    { label: 'HEROES', href: '#heroes' },
    { label: 'GAMEPLAY', href: '#gameplay' },
    { label: 'BOSSES', href: '#bosses' },
    { label: 'ARSENAL', href: '#arsenal' },
    { label: 'NEWS', href: '#news' },
    { label: 'TRAILER 🔒', href: '#trailer' }
  ];

  const handleLogoClick = () => {
    playCoin();
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next === 5) {
      if (onTriggerSecret) onTriggerSecret('logo');
      setLogoClicks(0);
    }
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    playUiClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#080a0f]/95 border-b-2 border-[#2c394b] backdrop-blur-md select-none transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 h-18 lg:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo with Pixel Icon */}
        <a
          href="#hero"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 min-w-0"
          title="Parallel Dungeons - Click for secrets!"
        >
          {/* Pixel Sword Logo Icon */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#111622] border-2 border-[#f59e0b]/70 shadow-[0_0_12px_rgba(245,158,11,0.25)] group-hover:scale-105 group-hover:border-[#f59e0b] transition-all shrink-0">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="pixelated sm:w-[22px] sm:h-[22px]">
              <rect x="13" y="1" width="2" height="2" fill="#e0f2fe" />
              <rect x="11" y="3" width="2" height="2" fill="#38bdf8" />
              <rect x="9" y="5" width="2" height="2" fill="#0284c7" />
              <rect x="7" y="7" width="2" height="2" fill="#0369a1" />
              <rect x="5" y="9" width="2" height="2" fill="#f59e0b" />
              <rect x="7" y="9" width="2" height="2" fill="#b45309" />
              <rect x="3" y="11" width="2" height="2" fill="#f59e0b" />
              <rect x="1" y="13" width="2" height="2" fill="#dc2626" />
            </svg>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-pixel text-[11px] sm:text-xs md:text-sm lg:text-[15px] text-[#f8fafc] tracking-wider sm:tracking-widest group-hover:text-[#fde047] transition-colors whitespace-nowrap truncate">
              PARALLEL DUNGEONS
            </span>
            <span className="font-pixel text-[6.5px] sm:text-[7.5px] text-[#f59e0b] tracking-wider mt-0.5">
              DARK FANTASY ARPG
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Visible on xl screens where ample width is guaranteed) */}
        <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-6 mx-2 shrink">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              onMouseEnter={playUiHover}
              className="font-pixel text-[9px] 2xl:text-[10px] text-[#cbd5e1] tracking-wider hover:text-[#fde047] transition-colors py-1.5 px-1 relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f59e0b] transition-all duration-150 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Utilities (Audio, Settings, Prologue, Play Now, and Hamburger) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Desktop Utilities (Prologue on 2xl, SFX & Settings on md+) */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
            {onReplayIntro && (
              <button
                type="button"
                onClick={() => {
                  playUiClick();
                  onReplayIntro();
                }}
                onMouseEnter={playUiHover}
                className="px-2.5 h-8.5 hidden 2xl:flex items-center gap-1.5 bg-[#141c2c] border border-[#f59e0b]/40 text-[#fde047] font-pixel text-[8px] hover:bg-[#b45309] hover:text-white transition-all cursor-pointer shadow-[0_0_8px_rgba(245,158,11,0.2)] whitespace-nowrap"
                title="Watch Cinematic Intro"
              >
                <span>🎬</span>
                <span>PROLOGUE</span>
              </button>
            )}

            {/* Quick Sound Toggle */}
            <button
              type="button"
              onClick={soundState.toggleSfx}
              onMouseEnter={playUiHover}
              className={`w-8.5 h-8.5 flex items-center justify-center border transition-all cursor-pointer ${
                soundState.sfxEnabled
                  ? 'bg-[#141c2c] border-[#38bdf8] text-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.25)]'
                  : 'bg-[#0f172a] border-[#3b4b66] text-[#64748b]'
              }`}
              title={soundState.sfxEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            >
              {soundState.sfxEnabled ? '🔊' : '🔇'}
            </button>

            {/* Settings Modal Button */}
            <button
              type="button"
              onClick={() => {
                playUiClick();
                onOpenSettings();
              }}
              onMouseEnter={playUiHover}
              className="w-8.5 h-8.5 flex items-center justify-center bg-[#141c2c] border border-[#3b4b66] text-[#cbd5e1] hover:border-[#f59e0b] hover:text-[#fde047] transition-all cursor-pointer"
              title="Open Settings"
            >
              ⚙️
            </button>

            {/* Subtle Divider */}
            <div className="h-5 w-px bg-[#2c394b] mx-0.5" />
          </div>

          {/* Primary Play Now Link - Guaranteed to stay safely inside navbar frame */}
          <PixelButton
            variant="primary"
            size="sm"
            href="https://game.parallel-dungeons.site"
            target="_blank"
            rel="noopener noreferrer"
            icon="⚔️"
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[8px] sm:text-[9px] shadow-[0_0_12px_rgba(245,158,11,0.3)] whitespace-nowrap shrink-0"
          >
            <span className="hidden xs:inline">PLAY NOW</span>
            <span className="xs:hidden">PLAY</span>
          </PixelButton>

          {/* Mobile/Tablet Hamburger Button (Visible on screens < xl) */}
          <button
            type="button"
            onClick={() => {
              playUiClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden w-8.5 h-8.5 sm:w-9 sm:h-9 flex flex-col items-center justify-center gap-1 bg-[#141c2c] border border-[#3b4b66] hover:border-[#f59e0b] cursor-pointer transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            <span className="w-4 sm:w-4.5 h-0.5 bg-[#f8fafc]" />
            <span className="w-4 sm:w-4.5 h-0.5 bg-[#f8fafc]" />
            <span className="w-4 sm:w-4.5 h-0.5 bg-[#f8fafc]" />
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[72px] lg:top-20 bg-black/75 backdrop-blur-xs z-30 xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile/Tablet Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="relative z-40 xl:hidden bg-[#0c1017] border-b-2 border-[#2c394b] px-4 sm:px-6 py-5 space-y-4 animate-fade-in max-h-[calc(100dvh-5rem)] overflow-y-auto shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-pixel text-xs text-[#cbd5e1] hover:text-[#fde047] p-2.5 bg-[#111622] border border-[#2c394b] block transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#2c394b] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={soundState.toggleSfx}
              className="flex-1 py-2 bg-[#141c2c] border border-[#3b4b66] text-xs font-pixel text-[#38bdf8] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{soundState.sfxEnabled ? '🔊 SFX ON' : '🔇 SFX OFF'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettings();
              }}
              className="px-4 py-2 bg-[#141c2c] border border-[#3b4b66] text-xs font-pixel text-[#cbd5e1] cursor-pointer"
            >
              ⚙️ SETTINGS
            </button>
          </div>

          {onReplayIntro && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="w-full py-2 bg-[#141c2c] border border-[#f59e0b]/60 text-xs font-pixel text-[#fde047] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🎬 WATCH PROLOGUE CUTSCENE</span>
            </button>
          )}

          <PixelButton
            variant="primary"
            size="md"
            href="https://game.parallel-dungeons.site"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            icon="⚔️"
          >
            PLAY NOW
          </PixelButton>
        </div>
      )}
    </header>
  );
}

export default Navbar;
