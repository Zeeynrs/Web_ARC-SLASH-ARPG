import React, { useState } from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelButton } from '../ui/PixelButton';
import { playUiClick, playUiHover, playShield, playSlash } from '../../utils/audioSynth';

export function GameplaySection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'combat',
      title: 'Real-Time Arc Slashes & Hitboxes',
      category: 'TACTICAL COMBAT',
      icon: '⚔️',
      desc: 'Precision weapon swings calculated via trigonometric angular arcs. Time sweeps to cleave through whole clusters of slimes or deflect incoming enemy projectiles with i-frames.',
      highlights: [
        'Sweeping arc hitboxes with customizable blade reach',
        'Role-specific attack tempos: wide knight sweeps, homing arcane bolts, lightning daggers',
        'Parry and Riposte timing windows to counter high-damage bosses'
      ]
    },
    {
      id: 'shield',
      title: 'Shield Recharge & Vitality Armor',
      category: 'DEFENSE MATRIX',
      icon: '🛡️',
      desc: 'Vitality is precious in the catacombs. Your kinetic shield absorbs oncoming hits, automatically regenerating after avoiding damage for 3 seconds.',
      highlights: [
        'Dual-layer defense: Base Health + Kinetic Energy Shield',
        'Armor mitigation formulas reducing flat incoming boss damage',
        'Clutch skill buffs like Iron Bastion to restore broken shields instantly'
      ]
    },
    {
      id: 'telegraph',
      title: 'Hazard Telegraphs & Threat Zones',
      category: 'BOSS MECHANICS',
      icon: '⚠️',
      desc: 'No cheap deaths. Every lethal boss attack features visual warning telegraphs—from the Warden’s acoustic sonic beam to the Dragon’s 120-degree inferno cone.',
      highlights: [
        'High-contrast linear and radial hazard zones on stone floors',
        'Telegraph charge timers allowing agile evasion and tactical repositioning',
        'Audio cues paired with screen tremors for visceral feedback'
      ]
    },
    {
      id: 'roulette',
      title: 'Event Rooms & Lucky Roulette',
      category: 'DUNGEON EXPLORATION',
      icon: '🎰',
      desc: 'Between dangerous dungeon stages, encounter mystery chambers featuring the goblin roulette wheel. Risk your hard-earned gold coins for legendary buffs or Tier IV equipment drops.',
      highlights: [
        'Mystery event rooms appearing periodically across all 50 stages',
        'Lucky roulette wheel with tiered odds and divine gear drops',
        'Rest stops to replenish potions and strategize before major boss doors'
      ]
    },
    {
      id: 'mobile',
      title: 'Adaptive Mobile Touch Deck',
      category: 'CROSS-PLATFORM',
      icon: '📱',
      desc: 'Engineered from scratch for touchscreens. Features a responsive 8-direction virtual cross D-Pad, contextual action buttons that adapt to your selected class, and utility bars.',
      highlights: [
        'Zero external emulator required—plays natively in smartphone browsers',
        'Adaptive action buttons adjusting dynamically to Knight, Mage, or Assassin',
        'Portrait handheld deck and landscape floating arcade controller modes'
      ]
    },
    {
      id: 'achievements',
      title: '18 Medals & Local Persistence',
      category: 'PROGRESSION',
      icon: '🏆',
      desc: 'Track your dungeon achievements seamlessly. All 18 medals, unlocked tier items, and cleared floor records persist safely in your browser’s localStorage without requiring logins.',
      highlights: [
        '18 unlockable achievement trophies with retro arcade fanfares',
        'Zero signup required; instant play and resume at any time',
        'Complete privacy with 100% offline local storage architecture'
      ]
    }
  ];

  return (
    <section id="gameplay" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#111622] border border-[#f59e0b]/40">
          <span className="font-pixel text-[9px] text-[#fde047] tracking-widest uppercase">
            GAME SYSTEMS & MECHANICS
          </span>
        </div>

        <h2 className="font-pixel text-3xl sm:text-4xl text-[#f8fafc] tracking-widest mb-4">
          CRAFTED FOR RETRO MASTERY
        </h2>

        <p className="font-outfit text-sm sm:text-base text-[#94a3b8] max-w-xl">
          Powered entirely by native HTML5 Canvas 2D and procedural Web Audio API. Built with zero bloated dependencies for instant 60 FPS arcade gameplay.
        </p>
      </div>

      {/* Grid of Gameplay Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <PixelCard
            key={feat.id}
            variant="default"
            className="p-6 flex flex-col justify-between group hover:border-[#f59e0b] transition-all"
            interactive
            onClick={() => {
              playUiClick();
              setActiveFeature(idx);
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {feat.icon}
                </span>
                <PixelBadge variant="mana" size="xs">
                  {feat.category}
                </PixelBadge>
              </div>

              <h3 className="font-pixel text-sm text-[#f8fafc] tracking-wider mb-2 group-hover:text-[#fde047] transition-colors">
                {feat.title}
              </h3>

              <p className="font-outfit text-xs text-[#94a3b8] leading-relaxed mb-4">
                {feat.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1e293b] space-y-1">
              {feat.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 font-outfit text-xs text-[#cbd5e1]">
                  <span className="text-[#f59e0b] text-[10px]">✦</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </PixelCard>
        ))}
      </div>

      {/* Controls Reference Card */}
      <div className="mt-12">
        <PixelCard variant="gold" className="p-6 bg-[#0a0e17]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="font-pixel text-[9px] text-[#f59e0b] uppercase">
                INSTANT INPUT BINDINGS
              </span>
              <h3 className="font-pixel text-lg text-[#f8fafc] tracking-wider">
                DESKTOP KEYBOARD CONTROLS
              </h3>
              <p className="font-outfit text-xs text-[#94a3b8]">
                Fast tactile responsiveness with zero input lag
              </p>
            </div>

            {/* Keyboard Keys Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <KeyBadge label="W A S D" desc="MOVE" />
              <KeyBadge label="J / SPACE" desc="ATTACK" />
              <KeyBadge label="1, 2, 3" desc="SKILLS" />
              <KeyBadge label="B" desc="SHOP" />
              <KeyBadge label="A" desc="MEDALS" />
              <KeyBadge label="R" desc="RETRY" />
            </div>

            <PixelButton
              variant="primary"
              size="sm"
              href="https://game.parallel-dungeons.site"
              target="_blank"
              rel="noopener noreferrer"
              icon="⚔️"
            >
              LAUNCH GAME
            </PixelButton>
          </div>
        </PixelCard>
      </div>
    </section>
  );
}

function KeyBadge({ label, desc }) {
  return (
    <div className="flex flex-col items-center bg-[#111622] border border-[#3b4b66] px-2.5 py-1.5 shadow-sm">
      <span className="font-pixel text-[9px] text-[#fde047]">{label}</span>
      <span className="font-outfit text-[9px] text-[#64748b] tracking-wider">{desc}</span>
    </div>
  );
}
