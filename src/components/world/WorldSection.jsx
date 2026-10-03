import React, { useState } from 'react';
import { DUNGEONS_DATA } from '../../data/dungeonsData';
import { PixelCard } from '../ui/PixelCard';
import { PixelBadge } from '../ui/PixelBadge';
import { DungeonModal } from './DungeonModal';
import { playUiClick, playUiHover } from '../../utils/audioSynth';

export function WorldSection() {
  const [selectedDungeon, setSelectedDungeon] = useState(null);
  const [hoveredDungeon, setHoveredDungeon] = useState(null);

  const handleOpenDungeon = (dungeon) => {
    playUiClick();
    setSelectedDungeon(dungeon);
  };

  return (
    <section id="world" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#111622] border border-[#2ecc71]/40">
          <span className="font-pixel text-[9px] text-[#4ade80] tracking-widest uppercase">
            DUNGEON LABYRINTH MAP
          </span>
        </div>

        <h2 className="font-pixel text-xl sm:text-3xl md:text-4xl text-[#f8fafc] tracking-wider sm:tracking-widest mb-4">
          50 FLOORS OF THE ABYSS
        </h2>

        <p className="font-outfit text-sm sm:text-base text-[#94a3b8] max-w-xl">
          Descending deeper alters the very rules of reality. From emerald slime caverns to the petrified deepslate ruins of the Warden, inspect each biome threshold before descending.
        </p>
      </div>

      {/* Interactive Map Nodes Layout */}
      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Connecting Vertical Energy Conduit */}
        <div className="hidden sm:block absolute left-6 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#2ecc71] via-[#f59e0b] to-[#06b6d4] opacity-50 pointer-events-none" />

        {DUNGEONS_DATA.map((dungeon, index) => {
          const isHovered = hoveredDungeon?.id === dungeon.id;

          return (
            <div
              key={dungeon.id}
              className="relative sm:pl-16 transition-all duration-200"
              onMouseEnter={() => {
                playUiHover();
                setHoveredDungeon(dungeon);
              }}
              onMouseLeave={() => setHoveredDungeon(null)}
            >
              {/* Node Marker Dot (on the connecting line) */}
              <div
                className={`hidden sm:flex absolute left-6 top-8 -translate-x-1/2 w-6 h-6 items-center justify-center border-2 transition-transform duration-150 ${
                  isHovered ? 'scale-125 shadow-[0_0_12px_#fde047]' : ''
                }`}
                style={{
                  backgroundColor: dungeon.bgColor,
                  borderColor: dungeon.themeColor
                }}
              >
                <span className="font-pixel text-[8px] text-[#f8fafc]">
                  0{index + 1}
                </span>
              </div>

              {/* Node Card */}
              <PixelCard
                className="p-5 sm:p-6 transition-all duration-200 cursor-pointer"
                interactive
                style={{
                  borderColor: isHovered ? dungeon.themeColor : '#2c394b',
                  boxShadow: isHovered
                    ? `0 0 24px ${dungeon.themeColor}33, inset 0 0 12px ${dungeon.themeColor}22`
                    : undefined
                }}
                onClick={() => handleOpenDungeon(dungeon)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-pixel text-[9px] text-[#94a3b8]">
                        {dungeon.stages}
                      </span>
                      <span className="text-[#64748b]">•</span>
                      <span className="font-pixel text-[8.5px] text-[#38bdf8]">
                        {dungeon.depth}
                      </span>
                      <PixelBadge variant="gold" size="xs">
                        THREAT: {dungeon.threat} ({dungeon.threatLevel})
                      </PixelBadge>
                    </div>

                    <h3 className="font-pixel text-lg sm:text-xl text-[#f8fafc] tracking-wider group-hover:text-[#fde047]">
                      {dungeon.name}
                    </h3>

                    <p className="font-outfit text-xs sm:text-sm text-[#94a3b8] line-clamp-2 max-w-2xl">
                      {dungeon.desc}
                    </p>
                  </div>

                  {/* Right Boss Badge & Action */}
                  <div className="flex flex-col items-start md:items-end justify-between gap-2 border-t md:border-t-0 md:border-l border-[#2c394b] pt-3 md:pt-0 md:pl-5 shrink-0">
                    <div className="text-left md:text-right">
                      <span className="font-pixel text-[7.5px] text-[#f59e0b] block uppercase">
                        BOSS GUARDIAN
                      </span>
                      <span className="font-pixel text-xs text-[#f8fafc]">
                        {dungeon.boss.name}
                      </span>
                      <span className="font-outfit text-[11px] text-[#ef4444] block">
                        {dungeon.boss.hp} HP
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1 font-pixel text-[8.5px] text-[#38bdf8] group-hover:translate-x-1 transition-transform">
                      <span>INSPECT DATA</span>
                      <span>▶</span>
                    </div>
                  </div>
                </div>
              </PixelCard>
            </div>
          );
        })}
      </div>

      {/* Modal Inspection Window */}
      {selectedDungeon && (
        <DungeonModal
          dungeon={selectedDungeon}
          onClose={() => setSelectedDungeon(null)}
        />
      )}
    </section>
  );
}
