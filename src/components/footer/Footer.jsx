import React, { useState } from 'react';
import { PixelButton } from '../ui/PixelButton';
import { playUiClick, playUiHover, playAchievement } from '../../utils/audioSynth';

export function Footer({ onTriggerSecret }) {
  const [torchClicked, setTorchClicked] = useState(false);

  const handleTorchClick = () => {
    playAchievement();
    setTorchClicked(true);
    if (onTriggerSecret) onTriggerSecret('torch');
    setTimeout(() => setTorchClicked(false), 3000);
  };

  const navLinks = [
    { label: 'WORLD', href: '#world' },
    { label: 'HEROES', href: '#heroes' },
    { label: 'GAMEPLAY', href: '#gameplay' },
    { label: 'BOSSES', href: '#bosses' },
    { label: 'ARSENAL', href: '#arsenal' },
    { label: 'NEWS', href: '#news' },
    { label: 'TRAILER', href: '#trailer' }
  ];

  return (
    <footer className="relative bg-[#06080d] border-t-2 border-[#2c394b] pt-16 pb-12 px-4 select-none">
      {/* Background Subtle Gradient */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1e293b]">
          {/* Col 1: Brand & Lore (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-[#182030] border border-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.3)]">
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
              <div>
                <span className="font-pixel text-base text-[#f8fafc] tracking-widest block">
                  ARC SLASH
                </span>
                <span className="font-pixel text-[8px] text-[#f59e0b] tracking-wider">
                  DARK FANTASY ACTION RPG
                </span>
              </div>
            </div>

            <p className="font-outfit text-xs text-[#94a3b8] max-w-sm leading-relaxed">
              A 16-bit retro dungeon crawler web game created with vanilla HTML5 Canvas 2D and procedural Web Audio API. 50 stages, 3 classes, 120+ equipment items, and 0 microtransactions.
            </p>

            <div className="pt-2">
              <PixelButton
                variant="primary"
                size="md"
                href="https://arch-slash-arpg.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                icon="⚔️"
              >
                PLAY NOW ON NETLIFY
              </PixelButton>
            </div>
          </div>

          {/* Col 2: Fast Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-pixel text-[9px] text-[#fde047] uppercase tracking-wider block mb-2">
              EXPLORE CODEX
            </span>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => playUiClick()}
                    onMouseEnter={playUiHover}
                    className="font-pixel text-[8.5px] text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                  >
                    ✦ {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Secret Torch & Credits (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-pixel text-[9px] text-[#38bdf8] uppercase tracking-wider block mb-2">
              SECRET SANCTUARY
            </span>
            <p className="font-outfit text-xs text-[#94a3b8] leading-relaxed">
              Can you uncover every secret hidden in the website? Try typing the ancient Konami Code or interacting with the mysterious wall torch.
            </p>

            {/* Interactive Hidden Wall Torch */}
            <div
              onClick={handleTorchClick}
              className={`p-3 bg-[#0c1017] border-2 transition-all cursor-pointer flex items-center gap-3 ${
                torchClicked
                  ? 'border-[#f59e0b] shadow-[0_0_15px_#f59e0b] scale-105'
                  : 'border-[#2c394b] hover:border-[#f59e0b]'
              }`}
              title="Click secret dungeon torch!"
            >
              <span className={`text-2xl ${torchClicked ? 'animate-bounce' : ''}`}>
                🔥
              </span>
              <div>
                <span className="font-pixel text-[8.5px] text-[#f8fafc] block">
                  {torchClicked ? 'TORCH IGNITED! ✨' : 'SECRET WALL TORCH'}
                </span>
                <span className="font-outfit text-[11px] text-[#64748b]">
                  {torchClicked ? 'Achievement unlocked!' : 'Click to inspect the flame'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-outfit text-xs text-[#64748b]">
          <div>
            © 2026 ARC SLASH Development Team. Open-Source under GNU GPL-3.0 License.
          </div>
          <div className="flex items-center gap-4 font-pixel text-[8px]">
            <a
              href="https://arch-slash-arpg.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94a3b8] hover:text-[#f59e0b]"
            >
              LIVE DEMO
            </a>
            <span>•</span>
            <span className="text-[#38bdf8]">
              THEME: IMMERSIVE GAMING THROUGH WEB TECH
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
