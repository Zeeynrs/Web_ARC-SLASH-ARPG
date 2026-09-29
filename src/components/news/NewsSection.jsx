import React, { useState, useMemo } from 'react';
import { NEWS_CATEGORIES, NEWS_DATA } from '../../data/newsData';
import { PixelCard } from '../ui/PixelCard';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelButton } from '../ui/PixelButton';
import { ArticleModal } from './ArticleModal';
import { playUiClick, playUiHover } from '../../utils/audioSynth';

export function NewsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredNews = useMemo(() => {
    return NEWS_DATA.filter((item) => {
      const matchCat =
        activeCategory === 'ALL' || item.category.toUpperCase() === activeCategory.toUpperCase();
      const q = searchQuery.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        (item.commitHash && item.commitHash.toLowerCase().includes(q)) ||
        (item.commitMessage && item.commitMessage.toLowerCase().includes(q)) ||
        (item.commitRepo && item.commitRepo.toLowerCase().includes(q)) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOpenArticle = (art) => {
    playUiClick();
    setSelectedArticle(art);
  };

  return (
    <section id="news" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#111622] border border-[#f59e0b]/40">
          <span className="font-pixel text-[9px] text-[#fde047] tracking-widest uppercase flex items-center gap-1.5">
            <svg className="w-3 h-3 inline-block text-[#38bdf8]" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z" />
            </svg>
            CHRONICLES & DISPATCHES • GITHUB COMMITS
          </span>
        </div>

        <h2 className="font-pixel text-3xl sm:text-4xl text-[#f8fafc] tracking-widest mb-4">
          NEWS & PATCH NOTES
        </h2>

        <p className="font-outfit text-sm sm:text-base text-[#94a3b8] max-w-2xl leading-relaxed">
          Official development dispatches, combat patch notes, and engine architectural updates synchronized directly with GitHub repository commits (<code className="text-[#38bdf8] font-mono text-xs">Zeeynrs/ARC-SLASH-ARPG</code> & <code className="text-[#38bdf8] font-mono text-xs">Web_ARC-SLASH-ARPG</code>).
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                playUiClick();
                setActiveCategory(cat);
              }}
              onMouseEnter={playUiHover}
              className={`px-3 py-1.5 font-pixel text-[8px] sm:text-[9px] tracking-wider transition-all whitespace-nowrap border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#182030] border-[#f59e0b] text-[#fde047] shadow-[0_0_8px_rgba(245,158,11,0.25)]'
                  : 'bg-[#101622] border-[#2c394b] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#3b4b66]'
              }`}
            >
              [{cat}]
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="SEARCH (MSG, SHA, TAG)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 px-3 py-1.5 bg-[#0d121c] border border-[#2c394b] font-pixel text-[9px] text-[#f8fafc] placeholder-[#64748b] focus:border-[#f59e0b] focus:outline-none"
          />
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => (
          <PixelCard
            key={article.id}
            variant={article.featured ? 'gold' : 'default'}
            className="p-6 flex flex-col justify-between group hover:border-[#f59e0b] transition-all cursor-pointer"
            interactive
            onClick={() => handleOpenArticle(article)}
          >
            <div>
              {/* Category, Commit Hash & Date */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <PixelBadge
                    variant={article.featured ? 'gold' : 'mana'}
                    size="xs"
                  >
                    {article.category}
                  </PixelBadge>

                  {article.commitHash && (
                    <span className="px-1.5 py-0.5 bg-[#0b101b] border border-[#3b4b66]/60 font-pixel text-[7.5px] text-[#38bdf8] flex items-center gap-1">
                      <svg className="w-2 h-2 inline-block opacity-75" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z" />
                      </svg>
                      {article.commitHash}
                    </span>
                  )}
                </div>

                <span className="font-pixel text-[8px] text-[#94a3b8] whitespace-nowrap">
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-pixel text-xs sm:text-sm text-[#f8fafc] tracking-wider leading-snug mb-3 group-hover:text-[#fde047] transition-colors">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="font-outfit text-xs text-[#94a3b8] leading-relaxed line-clamp-3 mb-4">
                {article.excerpt}
              </p>
            </div>

            {/* Read More Link & Commit Meta */}
            <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between font-pixel text-[8.5px]">
              <span className="text-[#38bdf8]">{article.readTime}</span>
              <span className="text-[#f59e0b] group-hover:translate-x-1 transition-transform">
                READ LOG ▶
              </span>
            </div>
          </PixelCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <div className="p-12 text-center border-2 border-dashed border-[#2c394b] bg-[#0c101a] my-6">
          <p className="font-pixel text-xs text-[#94a3b8] mb-2">NO DISPATCHES FOUND</p>
          <p className="font-outfit text-xs text-[#64748b]">Try clearing your search query or switching category filters.</p>
        </div>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
}
