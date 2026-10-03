import React from 'react';
import { CharacterWiki } from './CharacterWiki';

export function CharacterSection() {
  return (
    <section id="heroes" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#111622] border border-[#38bdf8]/40">
          <span className="font-pixel text-[9px] text-[#38bdf8] tracking-widest uppercase">
            PLAYABLE HERO CLASSES
          </span>
        </div>

        <h2 className="font-pixel text-xl sm:text-3xl md:text-4xl text-[#f8fafc] tracking-wider sm:tracking-widest mb-4">
          CHOOSE YOUR CHAMPION
        </h2>

        <p className="font-outfit text-sm sm:text-base text-[#94a3b8] max-w-xl">
          Three unique combat roles engineered for distinct tactical styles. Defend with sweeping blades, unleash arcane lightning, or strike invisibly from the shadows.
        </p>
      </div>

      <CharacterWiki />
    </section>
  );
}
