import React, { useState } from 'react';
import { BOSSES_DATA } from '../../data/bossesData';
import { PixelCard } from '../ui/PixelCard';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelBossRenderer } from './PixelBossRenderer';
import { playUiClick, playUiHover } from '../../utils/audioSynth';

export function BossArchive() {
  const [selectedBossId, setSelectedBossId] = useState('warden');
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const [activeAction, setActiveAction] = useState('idle');

  const boss = BOSSES_DATA.find((b) => b.id === selectedBossId) || BOSSES_DATA[0];

  const handleSelectBoss = (id) => {
    playUiClick();
    setSelectedBossId(id);
    setActiveAction('idle');
  };

  const handleRoar = () => {
    setIsScreenShaking(true);
    setTimeout(() => setIsScreenShaking(false), 380);
  };

  const handleTriggerAction = (actionId) => {
    playUiClick();
    setActiveAction(actionId);
  };

  return (
    <section id="bosses" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#111622] border border-[#ef4444]/40">
          <span className="font-pixel text-[9px] text-[#ef4444] tracking-widest uppercase">
            BESTIARY & BOSS CODEX
          </span>
        </div>

        <h2 className="font-pixel text-xl sm:text-3xl md:text-4xl text-[#f8fafc] tracking-wider sm:tracking-widest mb-4">
          ANCIENT GUARDIANS OF THE DEEP
        </h2>

        <p className="font-outfit text-sm sm:text-base text-[#94a3b8] max-w-xl">
          Brutal encounter mechanics, predictive projectile telegraphs, and unforgiving damage. Study their unique combat animation phases or perish in the catacombs.
        </p>
      </div>

      {/* Main Codex Interface */}
      <div className={isScreenShaking ? 'screen-shake' : ''}>
        <PixelCard
          variant="sculk"
          className="p-5 sm:p-7 transition-all duration-300"
          style={{ borderColor: boss.themeColor }}
        >
          {/* Boss Navigation Selector Strip */}
          <div className="flex items-center gap-2 pb-4 mb-6 border-b-2 border-[#2c394b] overflow-x-auto">
            {BOSSES_DATA.map((b) => {
              const isActive = b.id === selectedBossId;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleSelectBoss(b.id)}
                  onMouseEnter={playUiHover}
                  className={`px-3.5 py-2 font-pixel text-[9px] tracking-wider transition-all whitespace-nowrap border-2 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#182338] text-[#f8fafc] shadow-[0_0_12px_rgba(245,158,11,0.25)] scale-[1.02]'
                      : 'bg-[#0f1420] text-[#94a3b8] border-[#2c394b] hover:border-[#3b4b66] hover:text-[#f8fafc]'
                  }`}
                  style={{
                    borderColor: isActive ? b.themeColor : undefined
                  }}
                >
                  <span
                    className="w-2 h-2 inline-block"
                    style={{ backgroundColor: b.themeColor }}
                  />
                  <span>{b.name.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic 2-Column Codex Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Animated Canvas Boss Model & Vital Signs (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center bg-[#090d15] border-2 border-[#2c394b] p-5 shadow-inner">
              <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-[#1e293b]">
                <PixelBadge variant="crimson" size="xs">
                  {boss.threat}
                </PixelBadge>
                <span className="font-pixel text-[8.5px] text-[#94a3b8]">
                  {boss.stage}
                </span>
              </div>

              {/* Procedural Animated Boss Sprite Canvas with Dynamic Phase Support */}
              <div className="py-2 w-full flex justify-center">
                <PixelBossRenderer
                  bossId={boss.id}
                  scale={2.5}
                  onRoar={handleRoar}
                  activeAction={activeAction}
                  onActionComplete={() => setActiveAction('idle')}
                  actions={boss.actions || []}
                />
              </div>

              {/* Interactive Combat Action Selector Buttons */}
              <div className="w-full mt-2 pt-3 border-t border-[#1e293b]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-pixel text-[8px] text-[#38bdf8] uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚔️</span> SIGNATURE ATTACKS & ANIMATIONS
                  </span>
                  <span className="font-pixel text-[7.5px] text-[#94a3b8]">
                    {activeAction === 'idle' ? 'CLICK TO TEST' : 'ATTACKING...'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {(boss.actions || []).map((action) => {
                    const isCurrent = activeAction === action.id;
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleTriggerAction(action.id)}
                        onMouseEnter={playUiHover}
                        className={`px-2 py-2 font-pixel text-[7.5px] tracking-wider border transition-all flex flex-col items-center justify-center gap-1 text-center cursor-pointer ${
                          isCurrent
                            ? 'bg-[#182338] text-[#fde047] border-[#fbbf24] shadow-[0_0_12px_rgba(251,191,36,0.35)] scale-[1.02]'
                            : 'bg-[#111622] text-[#cbd5e1] border-[#2c394b] hover:border-[#38bdf8] hover:text-[#f8fafc] hover:bg-[#161f30]'
                        }`}
                        title={action.desc}
                      >
                        <span className="text-sm">{action.icon}</span>
                        <span className="truncate w-full leading-tight">{action.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* HP Bar */}
              <div className="w-full space-y-1.5 mt-4 pt-3 border-t border-[#1e293b]">
                <div className="flex justify-between items-center font-pixel text-[9px]">
                  <span className="text-[#cbd5e1]">MAX HEALTH</span>
                  <span className="text-[#ef4444] font-bold">{boss.hp.toLocaleString()} HP</span>
                </div>
                <div className="w-full h-4 bg-[#111622] border border-[#ef4444]/60 p-0.5">
                  <div className="h-full bg-gradient-to-r from-[#b91c1c] to-[#ef4444] shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                </div>
              </div>

              {/* Quick Biome Stamp */}
              <div className="w-full mt-4 p-2.5 bg-[#111622] border border-[#2c394b] flex items-center justify-between font-pixel text-[8px] text-[#94a3b8]">
                <span>BIOME:</span>
                <span className="text-[#38bdf8] uppercase">{boss.dungeon}</span>
              </div>
            </div>

            {/* Right: Boss Mechanics, Tactics & Loot (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header Title */}
              <div>
                <h3 className="font-pixel text-2xl sm:text-3xl text-[#f8fafc] tracking-widest mb-1" style={{ color: boss.themeColor }}>
                  {boss.name}
                </h3>
                <span className="font-pixel text-[9px] text-[#f59e0b] tracking-wider uppercase block mb-3">
                  {boss.title}
                </span>
                <p className="font-outfit text-sm text-[#cbd5e1] leading-relaxed">
                  {boss.desc}
                </p>
                <div className="mt-3 pl-3 border-l-2 border-[#f59e0b] italic font-outfit text-xs text-[#fde047]">
                  "{boss.quote}"
                </div>
              </div>

              {/* Boss Mechanics Breakdown */}
              <div>
                <h4 className="font-pixel text-[9.5px] text-[#38bdf8] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>⚔️</span> COMBAT MECHANICS & TELEGRAPHS
                </h4>
                <div className="space-y-2.5">
                  {boss.mechanics.map((m, idx) => {
                    const matchingAction = (boss.actions || [])[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (matchingAction) handleTriggerAction(matchingAction.id);
                        }}
                        className="p-3 bg-[#0a0e17] border border-[#2c394b] hover:border-[#38bdf8] transition-colors cursor-pointer group"
                        title={matchingAction ? `Click to preview ${matchingAction.name} animation!` : undefined}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-base group-hover:scale-110 transition-transform">{m.icon}</span>
                            <span className="font-pixel text-[10px] text-[#f8fafc] group-hover:text-[#38bdf8] transition-colors">
                              {m.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {matchingAction && (
                              <span className="font-pixel text-[7.5px] text-[#f59e0b] opacity-80 group-hover:opacity-100">
                                [PREVIEW ⚡]
                              </span>
                            )}
                            <PixelBadge variant="mana" size="xs">
                              {m.type}
                            </PixelBadge>
                          </div>
                        </div>
                        <p className="font-outfit text-xs text-[#94a3b8] leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Survival Tactics */}
              <div className="p-4 bg-[#0a0e17] border border-[#2c394b]">
                <h4 className="font-pixel text-[9px] text-[#10b981] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>🛡️</span> COMBAT SURVIVAL STRATEGY
                </h4>
                <ul className="space-y-1.5 font-outfit text-xs text-[#cbd5e1] list-disc list-inside">
                  {boss.strategy.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Rare Boss Drops */}
              <div>
                <h4 className="font-pixel text-[9px] text-[#f59e0b] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>💎</span> CODEX HARVEST & REWARDS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {boss.drops.map((drop, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 bg-[#111622] border border-[#f59e0b]/40 font-pixel text-[8px] text-[#fde047]"
                    >
                      ✦ {drop}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PixelCard>
      </div>
    </section>
  );
}
