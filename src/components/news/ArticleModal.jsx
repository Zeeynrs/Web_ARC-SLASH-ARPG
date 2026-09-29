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

              {article.commitHash && (
                <a
                  href={article.commitUrl || `https://github.com/${article.commitRepo || 'Zeeynrs/ARC-SLASH-ARPG'}/commit/${article.commitHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 bg-[#111827] border border-[#38bdf8]/40 hover:border-[#38bdf8] font-pixel text-[8px] text-[#38bdf8] transition-colors flex items-center gap-1.5"
                  title="View commit on GitHub"
                >
                  <svg className="w-2.5 h-2.5 inline-block opacity-80" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z" />
                  </svg>
                  {article.commitHash} ({article.commitRepo}) ↗
                </a>
              )}

              <span className="font-pixel text-[8.5px] text-[#94a3b8]">
                {article.date} • {article.readTime}
              </span>
            </div>

            <h2 className="font-pixel text-base sm:text-lg text-[#f8fafc] tracking-widest leading-snug">
              {article.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 mt-1.5 font-outfit text-xs text-[#94a3b8]">
              <span>
                Committed by <strong className="text-[#38bdf8]">@{article.author}</strong>
              </span>
              {article.commitMessage && (
                <span className="text-[#64748b] flex items-center gap-1">
                  Message: <code className="text-[#cbd5e1] font-mono text-[11px] bg-[#1e293b] px-1.5 py-0.5 border border-[#334155]">{article.commitMessage}</code>
                </span>
              )}
            </div>
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
        <div className="pt-4 border-t border-[#2c394b] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {article.commitUrl && (
              <PixelButton
                variant="mana"
                size="sm"
                href={article.commitUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon="↗"
              >
                VIEW COMMIT
              </PixelButton>
            )}

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
          </div>

          <PixelButton variant="dark" size="sm" onClick={onClose}>
            CLOSE ARCHIVE
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
