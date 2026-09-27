import React from 'react';
import { useScrollDepth } from '../../hooks/useScrollDepth';
import { playUiClick, playUiHover } from '../../utils/audioSynth';

export function DepthIndicator() {
  const { scrollProgress, currentFloor, currentBiome, jumpToFloor } = useScrollDepth();

  const milestones = [
    { floor: 'F-01', id: 'hero', name: 'Slime Cave', label: 'FLOOR 01' },
    { floor: 'F-15', id: 'world', name: 'Ancient Crypt', label: 'FLOOR 15' },
    { floor: 'F-22', id: 'heroes', name: 'Lava Cavern', label: 'FLOOR 22' },
    { floor: 'F-35', id: 'bosses', name: 'Warden Sanctuary', label: 'FLOOR 35' },
    { floor: 'F-50', id: 'arsenal', name: 'Deep Dark Core', label: 'FLOOR 50' }
  ];

  return (
    <aside 
      aria-label="Dungeon Depth Navigation"
      className="fixed left-4 bottom-8 z-40 hidden xl:flex flex-col items-start bg-[#111622]/90 border border-[#2c394b] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-sm select-none"
    >
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#2c394b] w-full">
        <span className="w-2 h-2 bg-[#f59e0b] animate-ping" />
        <span className="font-pixel text-[8.5px] text-[#f59e0b] tracking-widest uppercase">
          DEPTH METER
        </span>
      </div>

      <div className="font-pixel text-[10px] text-[#f8fafc] mb-1">
        {currentFloor}
      </div>
      <div className="font-outfit text-[11px] text-[#38bdf8] mb-3 uppercase tracking-wider">
        {currentBiome}
      </div>

      {/* Depth progress vertical bar */}
      <div className="w-full bg-[#1e293b] h-1.5 mb-3 overflow-hidden border border-[#3b4b66]">
        <div
          className="h-full bg-gradient-to-r from-[#2ecc71] via-[#f59e0b] to-[#06b6d4] transition-all duration-150"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {/* Quick Jump Floor Nodes */}
      <div className="flex flex-col gap-1.5 w-full">
        {milestones.map((m) => {
          const isActive = currentFloor.includes(m.floor.replace('F-', ''));
          return (
            <button
              key={m.floor}
              type="button"
              onClick={() => {
                playUiClick();
                jumpToFloor(m.id);
              }}
              onMouseEnter={playUiHover}
              className={`flex items-center justify-between gap-2 px-2 py-1 text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1e293b] border-l-2 border-[#f59e0b] text-[#fde047]'
                  : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#182030]'
              }`}
            >
              <span className="font-pixel text-[8px]">{m.floor}</span>
              <span className="font-outfit text-[10px] text-right truncate">{m.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
