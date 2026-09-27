import React from 'react';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelButton } from '../ui/PixelButton';
import { playUiClick } from '../../utils/audioSynth';

export function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0f1420] border-2 border-[#b45309] p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.95),0_0_15px_rgba(245,158,11,0.2)] max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 mb-4 border-b-2 border-[#2c394b]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <PixelBadge variant="gold" size="xs">
                {article.category}
              </PixelBadge>
              <span className="font-pixel text-[8.5px] text-[#94a3b8]">
                {article.date} • {article.readTime}
              </span>
            </div>
            <h2 className="font-pixel text-base sm:text-lg text-[#f8fafc] tracking-widest leading-snug">
              {article.title}
            </h2>
            <span className="font-outfit text-xs text-[#38bdf8]">
              By {article.author}
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

        {/* Article Body Styled Like An Ancient Adventurer's Log */}
        <div className="p-5 bg-[#090d15] border border-[#2c394b] mb-6 space-y-4 font-outfit text-sm text-[#cbd5e1] leading-relaxed">
          <div className="border-l-2 border-[#f59e0b] pl-3 italic font-outfit text-xs text-[#fde047]">
            {article.excerpt}
          </div>

          <div className="space-y-4 pt-2 whitespace-pre-line">
            {article.content}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-[#1e293b] flex flex-wrap gap-2">
            {article.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-[#111622] border border-[#2c394b] font-pixel text-[8px] text-[#94a3b8]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#2c394b] flex items-center justify-between">
          <PixelButton
            variant="primary"
            size="sm"
            href="https://arch-slash-arpg.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            icon="⚔️"
          >
            PLAY THIS UPDATE
          </PixelButton>

          <PixelButton variant="dark" size="sm" onClick={onClose}>
            CLOSE ARCHIVE
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
