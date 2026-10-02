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
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#080a0f]/90 border-b-2 border-[#2c394b] backdrop-blur-md select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo with Pixel Icon */}
        <a
          href="#hero"
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer group"
          title="Parallel Dungeons - Click for secrets!"
        >
          {/* Pixel Sword Logo Icon */}
          <div className="w-8 h-8 flex items-center justify-center bg-[#182030] border border-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="pixelated">
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

          <div className="flex flex-col">
            <span className="font-pixel text-xs sm:text-sm md:text-base text-[#f8fafc] tracking-wider sm:tracking-widest group-hover:text-[#fde047] transition-colors whitespace-nowrap">
              PARALLEL DUNGEONS
            </span>
            <span className="font-pixel text-[7px] text-[#f59e0b] tracking-wider -mt-0.5">
              DARK FANTASY ARPG
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              onMouseEnter={playUiHover}
              className="font-pixel text-[10px] text-[#cbd5e1] tracking-widest hover:text-[#fde047] transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f59e0b] transition-all duration-150 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Utilities (Audio, Settings, Prologue, Play Now) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Replay Cinematic Prologue Button */}
          {onReplayIntro && (
            <button
              type="button"
              onClick={() => {
                playUiClick();
                onReplayIntro();
              }}
              onMouseEnter={playUiHover}
              className="px-2.5 h-9 hidden md:flex items-center gap-1.5 bg-[#182030] border border-[#f59e0b]/50 text-[#fde047] font-pixel text-[8.5px] hover:bg-[#b45309] hover:text-white transition-all cursor-pointer shadow-[0_0_8px_rgba(245,158,11,0.2)]"
              title="Watch Cinematic Intro"
            >
              <span>🎬</span>
              <span className="hidden xl:inline">PROLOGUE</span>
            </button>
          )}

          {/* Quick Sound Toggle */}
          <button
            type="button"
            onClick={soundState.toggleSfx}
            onMouseEnter={playUiHover}
            className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer ${
              soundState.sfxEnabled
                ? 'bg-[#182030] border-[#38bdf8] text-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.3)]'
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
            className="w-9 h-9 flex items-center justify-center bg-[#182030] border border-[#3b4b66] text-[#cbd5e1] hover:border-[#f59e0b] hover:text-[#fde047] transition-all cursor-pointer"
            title="Open Settings"
          >
            ⚙️
          </button>

          {/* Primary Play Now External Game Link */}
          <PixelButton
            variant="primary"
            size="sm"
            href="https://arch-slash-arpg.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            icon="⚔️"
          >
            PLAY NOW
          </PixelButton>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <PixelButton
            variant="primary"
            size="sm"
            href="https://arch-slash-arpg.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[8px] px-2 py-1"
          >
            PLAY
          </PixelButton>

          <button
            type="button"
            onClick={() => {
              playUiClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1 bg-[#182030] border border-[#3b4b66] cursor-pointer"
            aria-label="Toggle mobile navigation menu"
          >
            <span className="w-5 h-0.5 bg-[#f8fafc]" />
            <span className="w-5 h-0.5 bg-[#f8fafc]" />
            <span className="w-5 h-0.5 bg-[#f8fafc]" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0c1017] border-b-2 border-[#2c394b] px-5 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-pixel text-xs text-[#cbd5e1] hover:text-[#fde047] p-2 bg-[#111622] border border-[#2c394b] block"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#2c394b] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={soundState.toggleSfx}
              className="flex-1 py-2 bg-[#182030] border border-[#3b4b66] text-xs font-pixel text-[#38bdf8] flex items-center justify-center gap-2"
            >
              <span>{soundState.sfxEnabled ? '🔊 SFX ON' : '🔇 SFX OFF'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettings();
              }}
              className="px-4 py-2 bg-[#182030] border border-[#3b4b66] text-xs font-pixel text-[#cbd5e1]"
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
              className="w-full py-2 bg-[#182030] border border-[#f59e0b]/60 text-xs font-pixel text-[#fde047] flex items-center justify-center gap-2"
            >
              <span>🎬 WATCH PROLOGUE CUTSCENE</span>
            </button>
          )}

          <PixelButton
            variant="primary"
            size="md"
            href="https://arch-slash-arpg.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            icon="⚔️"
          >
            PLAY NOW (NETLIFY)
          </PixelButton>
        </div>
      )}
    </header>
  );
}
