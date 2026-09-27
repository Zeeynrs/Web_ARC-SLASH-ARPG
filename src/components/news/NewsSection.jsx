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
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
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
          <span className="font-pixel text-[9px] text-[#fde047] tracking-widest uppercase">
            CHRONICLES & DISPATCHES
          </span>
        </div>

        <h2 className="font-pixel text-3xl sm:text-4xl text-[#f8fafc] tracking-widest mb-4">
          NEWS & PATCH NOTES
        </h2>

        <p className="font-outfit text-sm sm:text-base text-[#94a3b8] max-w-xl">
          Stay updated on the ongoing expansion of the dungeon. Review patch balance adjustments, community speedrun leaderboards, and developer logs.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
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
            placeholder="SEARCH ARCHIVES..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 bg-[#0d121c] border border-[#2c394b] font-pixel text-[9px] text-[#f8fafc] placeholder-[#64748b] focus:border-[#f59e0b] focus:outline-none"
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
              {/* Category & Date */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <PixelBadge
                  variant={article.featured ? 'gold' : 'mana'}
                  size="xs"
                >
                  {article.category}
                </PixelBadge>
                <span className="font-pixel text-[8px] text-[#94a3b8]">
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

            {/* Read More Link */}
            <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between font-pixel text-[8.5px]">
              <span className="text-[#38bdf8]">{article.readTime}</span>
              <span className="text-[#f59e0b] group-hover:translate-x-1 transition-transform">
                READ LOG ▶
              </span>
            </div>
          </PixelCard>
        ))}
      </div>

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
