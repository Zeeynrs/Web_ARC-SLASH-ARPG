import React, { useState } from 'react';
import { CHARACTERS_DATA } from '../../data/charactersData';
import { PixelCard } from '../ui/PixelCard';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelButton } from '../ui/PixelButton';
import { PixelSpriteRenderer } from './PixelSpriteRenderer';
import { playUiClick, playUiHover, playSkill, playShield, playHeal, playExplosion } from '../../utils/audioSynth';

export function CharacterWiki() {
  const [selectedRole, setSelectedRole] = useState('knight');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'abilities', 'equipment', 'lore'
  const [triggeredSkill, setTriggeredSkill] = useState(null);

  const hero = CHARACTERS_DATA.find((c) => c.id === selectedRole) || CHARACTERS_DATA[0];

  const handleSelectRole = (roleId) => {
    playUiClick();
    setSelectedRole(roleId);
  };

  const handleTestSkill = (ability) => {
    if (ability.id.includes('fireball')) playExplosion();
    else if (ability.id.includes('bastion')) playShield();
    else if (ability.id.includes('heal')) playHeal();
    else playSkill();

    setTriggeredSkill({ ...ability, key: Date.now() });
  };

  return (
    <div className="w-full">
      {/* Outer 16-Bit RPG Encyclopedia Chassis */}
      <PixelCard variant="gold" className="p-4 sm:p-6 lg:p-8 bg-[#0e131d]">
        {/* Codex Title Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b-2 border-[#2c394b]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{hero.icon}</span>
            <div>
              <h3 className="font-pixel text-base sm:text-lg text-[#f8fafc] tracking-widest uppercase">
                ARC SLASH CODEX — HERO ARCHIVES
              </h3>
              <span className="font-outfit text-xs text-[#94a3b8]">
                Select a class to inspect statistics, active abilities, and combat gear
              </span>
            </div>
          </div>

          <PixelBadge variant="gold" size="sm">
            TIER 1 — 5 PROGRESSION
          </PixelBadge>
        </div>

        {/* 3-Column Layout: Left (Class List), Center (Pixel Sprite), Right (Data Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Hero Selectors (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-pixel text-[9px] text-[#38bdf8] uppercase tracking-widest block mb-2">
              SELECT CLASS
            </span>

            {CHARACTERS_DATA.map((c) => {
              const isSelected = c.id === selectedRole;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectRole(c.id)}
                  onMouseEnter={playUiHover}
                  className={`w-full p-3.5 border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#182338] border-[#f59e0b] shadow-[0_0_14px_rgba(245,158,11,0.25)] translate-x-1'
                      : 'bg-[#101622] border-[#2c394b] hover:border-[#3b4b66] hover:bg-[#141b2a]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{c.icon}</span>
                    <div>
                      <div className="font-pixel text-xs text-[#f8fafc] tracking-wider">
                        {c.name}
                      </div>
                      <div className="font-outfit text-[11px] text-[#94a3b8] line-clamp-1">
                        {c.title}
                      </div>
                    </div>
                  </div>
                  {isSelected && <span className="font-pixel text-[10px] text-[#f59e0b]">▶</span>}
                </button>
              );
            })}

            {/* Quick Summary Pill */}
            <div className="p-3 bg-[#0a0d14] border border-[#2c394b] mt-4">
              <span className="font-pixel text-[8px] text-[#f59e0b] block mb-1">
                COMBAT ROLE
              </span>
              <p className="font-outfit text-xs text-[#cbd5e1]">
                {hero.role}
              </p>
            </div>
          </div>

          {/* Center Column: Live Pixel Art Hero Canvas (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-[#0a0d14] border-2 border-[#2c394b] shadow-inner min-h-[340px]">
            <div className="w-full flex items-center justify-between px-2 mb-2 font-pixel text-[8px] text-[#64748b]">
              <span>CANVAS 2D SPRITE</span>
              <span className="text-[#38bdf8] uppercase">{hero.name} IDLE</span>
            </div>

            <PixelSpriteRenderer
              role={selectedRole}
              scale={4.2}
              triggerSkill={triggeredSkill}
            />

            <div className="w-full mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between">
              <span className="font-pixel text-[8px] text-[#94a3b8]">SPEED: {hero.stats.speed} px/f</span>
              <span className="font-pixel text-[8px] text-[#22c55e]">HP: {hero.stats.hp}</span>
            </div>
          </div>

          {/* Right Column: Tabbed Information Panel (5 cols on lg) */}
          <div className="lg:col-span-5 bg-[#0a0d14] border-2 border-[#2c394b] p-4 sm:p-5">
            {/* Nav Tabs */}
            <div className="flex items-center gap-1.5 pb-3 mb-4 border-b border-[#2c394b] overflow-x-auto">
              {[
                { id: 'overview', label: 'OVERVIEW' },
                { id: 'abilities', label: 'ABILITIES' },
                { id: 'equipment', label: 'EQUIPMENT' },
                { id: 'lore', label: 'LORE' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playUiClick();
                    setActiveTab(tab.id);
                  }}
                  onMouseEnter={playUiHover}
                  className={`px-3 py-1.5 font-pixel text-[8.5px] tracking-wider transition-all border cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#182030] border-[#f59e0b] text-[#fde047]'
                      : 'bg-transparent border-transparent text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  [{tab.label}]
                </button>
              ))}
            </div>

            {/* Tab 1: OVERVIEW & RPG STAT BARS */}
            {activeTab === 'overview' && (
              <div className="space-y-4 animate-fade-in">
                <p className="font-outfit text-xs text-[#cbd5e1] leading-relaxed">
                  {hero.desc}
                </p>

                {/* RPG Stat Bars */}
                <div className="space-y-2.5 pt-2">
                  <StatBar label="HEALTH (HP)" value={hero.stats.ratings.hp} max={5} color="#ef4444" detail={`${hero.stats.hp} HP`} />
                  <StatBar label="ATTACK (ATK)" value={hero.stats.ratings.atk} max={5} color="#f59e0b" detail={`${hero.stats.damage} DMG`} />
                  <StatBar label="DEFENSE (DEF)" value={hero.stats.ratings.def} max={5} color="#3b82f6" detail={`${hero.stats.shield} Shield`} />
                  <StatBar label="SPEED (SPD)" value={hero.stats.ratings.spd} max={5} color="#10b981" detail={`${hero.stats.speed}x`} />
                  <StatBar label="MAGIC (MAG)" value={hero.stats.ratings.mag} max={5} color="#a855f7" detail="Arcane" />
                </div>

                <div className="p-3 bg-[#111622] border border-[#1e293b] mt-4">
                  <span className="font-pixel text-[8.5px] text-[#38bdf8] block mb-1">
                    TACTICAL PLAYSTYLE:
                  </span>
                  <ul className="space-y-1 font-outfit text-xs text-[#94a3b8] list-disc list-inside">
                    {hero.playstyle.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: ABILITIES WITH INTERACTIVE SIMULATOR */}
            {activeTab === 'abilities' && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center justify-between text-[8px] font-pixel text-[#94a3b8] mb-1">
                  <span>ROLE SKILLS (KEY 1, 2, 3)</span>
                  <span className="text-[#f59e0b]">CLICK TO CAST ✦</span>
                </div>

                {hero.abilities.map((ability, index) => (
                  <div
                    key={ability.id}
                    onClick={() => handleTestSkill(ability)}
                    onMouseEnter={playUiHover}
                    className="p-3 bg-[#111622] border border-[#2c394b] hover:border-[#f59e0b] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg group-hover:scale-110 transition-transform">
                          {ability.icon}
                        </span>
                        <span className="font-pixel text-[10px] text-[#f8fafc] group-hover:text-[#fde047]">
                          {ability.name}
                        </span>
                      </div>
                      <span className="font-pixel text-[8px] text-[#38bdf8] border border-[#0284c7] px-1.5 py-0.5">
                        CD: {ability.cooldown}
                      </span>
                    </div>

                    <p className="font-outfit text-xs text-[#cbd5e1] mb-2 leading-relaxed">
                      {ability.description}
                    </p>

                    <div className="flex items-center justify-between font-pixel text-[8px] text-[#94a3b8] pt-1.5 border-t border-[#1e293b]">
                      <span>TYPE: {ability.type}</span>
                      <span className="text-[#22c55e]">UNLOCK: {ability.unlock}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: SIGNATURE EQUIPMENT */}
            {activeTab === 'equipment' && (
              <div className="space-y-3 animate-fade-in">
                <span className="font-pixel text-[8px] text-[#94a3b8] block mb-2">
                  STARTING & SIGNATURE EQUIPMENT
                </span>

                {hero.equipment.map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#111622] border border-[#2c394b] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-pixel text-[9.5px] text-[#f8fafc]">
                        {item.name}
                      </span>
                      <PixelBadge variant="gold" size="xs">
                        {item.tier}
                      </PixelBadge>
                    </div>
                    <p className="font-outfit text-xs text-[#94a3b8]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: LORE & QUOTES */}
            {activeTab === 'lore' && (
              <div className="space-y-4 animate-fade-in p-2">
                <div className="border-l-2 border-[#f59e0b] pl-3 italic font-outfit text-sm text-[#fde047]">
                  "{hero.quote}"
                </div>

                <p className="font-outfit text-xs text-[#cbd5e1] leading-relaxed">
                  As the darkness descends across the 50 floors of the dungeon, the {hero.name} answers the call of the ancients. Driven by unyielding resolve, they must confront the Warden and pierce the final void of the True Mirror.
                </p>

                <div className="p-3 bg-[#111622] border border-[#2c394b]">
                  <span className="font-pixel text-[8px] text-[#64748b] block mb-1">
                    IN-GAME CONTROLS:
                  </span>
                  <div className="font-pixel text-[8px] text-[#94a3b8] space-y-1">
                    <div>MOVE: [W, A, S, D] / ARROWS</div>
                    <div>ATTACK: [J] / SPACEBAR</div>
                    <div>SKILLS: [1], [2], [3]</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PixelCard>
    </div>
  );
}

// Subcomponent: Animated RPG Stat Bar
function StatBar({ label, value, max = 5, color, detail }) {
  const blocks = Array.from({ length: max }, (_, i) => i < value);

  return (
    <div>
      <div className="flex justify-between items-center font-pixel text-[8px] text-[#cbd5e1] mb-1">
        <span>{label}</span>
        <span className="text-[#94a3b8] font-outfit text-[11px]">{detail}</span>
      </div>
      <div className="flex gap-1 h-3 bg-[#111622] p-0.5 border border-[#2c394b]">
        {blocks.map((filled, idx) => (
          <div
            key={idx}
            className={`flex-1 transition-all duration-300 ${
              filled ? '' : 'bg-[#182030]'
            }`}
            style={{ backgroundColor: filled ? color : undefined }}
          />
        ))}
      </div>
    </div>
  );
}
