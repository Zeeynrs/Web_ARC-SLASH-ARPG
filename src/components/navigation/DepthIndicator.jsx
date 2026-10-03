import React, { useState } from 'react';
import { useScrollDepth } from '../../hooks/useScrollDepth';
import { playUiClick, playUiHover } from '../../utils/audioSynth';

export function DepthIndicator() {
  const { scrollProgress, currentFloor, currentBiome, jumpToFloor } = useScrollDepth();

  // On standard laptops (<1600px), default to collapsed HUD pill so it doesn't cover content
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1600;
    }
    return true;
  });

  const milestones = [
    { floor: 'F-01', id: 'hero', name: 'Slime Cave', label: 'FLOOR 01' },
    { floor: 'F-15', id: 'world', name: 'Ancient Crypt', label: 'FLOOR 15' },
    { floor: 'F-22', id: 'heroes', name: 'Lava Cavern', label: 'FLOOR 22' },
    { floor: 'F-35', id: 'bosses', name: 'Warden Sanctuary', label: 'FLOOR 35' },
    { floor: 'F-50', id: 'arsenal', name: 'Deep Dark Core', label: 'FLOOR 50' }
  ];

  // Collapsed State: Unobtrusive retro HUD pill at the bottom edge
  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={() => {
          playUiClick();
          setIsCollapsed(false);
        }}
        onMouseEnter={playUiHover}
        className="fixed left-4 bottom-4 z-40 hidden xl:flex items-center gap-2.5 px-3 py-2 bg-[#111622]/95 border-2 border-[#2c394b] hover:border-[#f59e0b] shadow-[0_4px_16px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer transition-all group select-none"
        title="Expand Dungeon Depth Navigation (Depth Meter)"
      >
        <span className="w-2 h-2 bg-[#f59e0b] animate-ping" />
        <span className="font-pixel text-[8.5px] text-[#f59e0b] group-hover:text-[#fde047]">
          {currentFloor}
        </span>
        <span className="text-[#64748b]">•</span>
        <span className="font-outfit text-[11px] text-[#38bdf8] uppercase tracking-wider">
          {currentBiome}
        </span>
        <span className="font-pixel text-[7.5px] text-[#94a3b8] group-hover:text-white ml-1 px-1.5 py-0.5 bg-[#182030] border border-[#3b4b66]">
          ▲ DEPTH
        </span>
      </button>
    );
  }

  // Expanded State: Full Depth Meter with Milestone Jumps
  return (
    <aside 
      aria-label="Dungeon Depth Navigation"
      className="fixed left-4 bottom-4 z-40 hidden xl:flex flex-col items-start bg-[#111622]/95 border-2 border-[#2c394b] p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.85)] backdrop-blur-md select-none w-56 animate-fade-in"
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2c394b] w-full">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#f59e0b] animate-ping" />
          <span className="font-pixel text-[8.5px] text-[#f59e0b] tracking-widest uppercase">
            DEPTH METER
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            playUiClick();
            setIsCollapsed(true);
          }}
          onMouseEnter={playUiHover}
          className="w-5 h-5 flex items-center justify-center bg-[#182030] border border-[#3b4b66] text-[#94a3b8] hover:text-[#fde047] hover:border-[#f59e0b] font-pixel text-[8px] cursor-pointer"
          title="Minimize Depth Meter"
        >
          _
        </button>
      </div>

      <div className="font-pixel text-[10px] text-[#f8fafc] mb-0.5">
        {currentFloor}
      </div>
      <div className="font-outfit text-[11px] text-[#38bdf8] mb-2.5 uppercase tracking-wider truncate w-full">
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

      <button
        type="button"
        onClick={() => {
          playUiClick();
          setIsCollapsed(true);
        }}
        className="w-full mt-2.5 pt-1.5 border-t border-[#1e293b] font-pixel text-[7px] text-[#64748b] hover:text-[#cbd5e1] text-center cursor-pointer"
      >
        ▼ MINIMIZE HUD
      </button>
    </aside>
  );
}
