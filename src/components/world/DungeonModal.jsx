import React, { useEffect } from 'react';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelButton } from '../ui/PixelButton';
import { playUiClick } from '../../utils/audioSynth';

export function DungeonModal({ dungeon, onClose }) {
  useEffect(() => {
    if (!dungeon) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dungeon, onClose]);

  if (!dungeon) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0e131d] border-2 shadow-[0_0_35px_rgba(0,0,0,0.95)] overflow-hidden"
        style={{ borderColor: dungeon.themeColor }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-5 pb-3 border-b-2 border-[#2c394b] shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-pixel text-[9px] text-[#94a3b8] uppercase">
                {dungeon.stages} • {dungeon.depth}
              </span>
              <PixelBadge variant="gold" size="xs">
                THREAT: {dungeon.threat}
              </PixelBadge>
            </div>
            <h2 className="font-pixel text-base sm:text-xl text-[#f8fafc] tracking-widest">
              {dungeon.name}
            </h2>
            <span className="font-outfit text-xs text-[#cbd5e1]">
              {dungeon.subTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center bg-[#1e293b] border border-[#475569] text-[#f8fafc] font-pixel text-xs hover:bg-[#ef4444] transition-colors cursor-pointer shrink-0 ml-3"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {/* Overview */}
          <p className="font-outfit text-sm text-[#cbd5e1] leading-relaxed">
            {dungeon.desc}
          </p>

          {/* Environment */}
          <div className="p-3 bg-[#111622] border border-[#2c394b]">
            <span className="font-pixel text-[8.5px] text-[#38bdf8] block mb-1 uppercase">
              ENVIRONMENTAL GEOGRAPHY
            </span>
            <p className="font-outfit text-xs text-[#94a3b8]">
              {dungeon.environment}
            </p>
          </div>

          {/* Key Enemies */}
          <div>
            <h3 className="font-pixel text-[9px] text-[#fde047] uppercase tracking-wider mb-2">
              KEY HOSTILE ENTITIES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dungeon.enemies.map((e, idx) => (
                <div key={idx} className="p-2.5 bg-[#111622] border border-[#2c394b]">
                  <span className="font-pixel text-[9px] text-[#f8fafc] block mb-0.5">
                    {e.name}
                  </span>
                  <span className="font-outfit text-[11px] text-[#94a3b8]">
                    {e.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Boss Encounter Preview */}
          <div className="p-4 bg-[#14120b] border-2 border-[#b45309]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-pixel text-[9px] text-[#f59e0b] uppercase">
                GUARDIAN BOSS: {dungeon.boss.name}
              </span>
              <span className="font-pixel text-[8px] text-[#ef4444] border border-[#ef4444] px-1.5 py-0.5">
                {dungeon.boss.hp} HP
              </span>
            </div>
            <div className="font-outfit text-xs text-[#fde047] italic mb-1">
              "{dungeon.boss.title} — {dungeon.boss.stage}"
            </div>
            <p className="font-outfit text-xs text-[#cbd5e1]">
              {dungeon.boss.desc}
            </p>
          </div>

          {/* Hazards */}
          <div className="p-3 bg-[#111622] border border-[#2c394b] flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <div className="font-outfit text-xs text-[#fca5a5]">
              <strong className="font-pixel text-[8px] uppercase">HAZARDS: </strong>
              {dungeon.traps}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-[#2c394b] flex justify-between items-center bg-[#0a0e17] shrink-0">
          <PixelButton
            variant="primary"
            size="sm"
            href="https://game.parallel-dungeons.site"
            target="_blank"
            rel="noopener noreferrer"
            icon="⚔️"
          >
            ENTER FLOOR IN GAME
          </PixelButton>

          <PixelButton variant="dark" size="sm" onClick={onClose}>
            CLOSE
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
