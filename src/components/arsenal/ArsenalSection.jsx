import React, { useState, useMemo, useEffect } from 'react';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_TIERS, EQUIPMENT_DATA } from '../../data/equipmentData';
import { PixelCard } from '../ui/PixelCard';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelButton } from '../ui/PixelButton';
import { EquipmentModal } from './EquipmentModal';
import { playUiClick, playUiHover, playShield } from '../../utils/audioSynth';

export function ArsenalSection() {
  // Collapsible Vault Open / Close state
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  // Filters
  const [activeCategory, setActiveCategory] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all'); // 'all', 'knight', 'mage', 'assassin'
  const [tierFilter, setTierFilter] = useState('all'); // 'all', '1', '2', '3', '4', '5'
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedItem, setInspectedItem] = useState(null);

  // Pagination states ("Pisah Page")
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12); // 12, 24, 48, or 'all'

  // Auto-open vault if navigated to #arsenal
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#arsenal') {
        setIsVaultOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return EQUIPMENT_DATA.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchRole = roleFilter === 'all' || item.role === 'all' || item.role === roleFilter;
      const matchTier = tierFilter === 'all' || item.tier === Number(tierFilter);
      const matchSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.biomeName && item.biomeName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchRole && matchTier && matchSearch;
    });
  }, [activeCategory, roleFilter, tierFilter, searchQuery]);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, roleFilter, tierFilter, searchQuery, pageSize]);

  // Pagination calculations
  const effectivePageSize = pageSize === 'all' ? filteredItems.length || 1 : Number(pageSize);
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / effectivePageSize));

  const paginatedItems = useMemo(() => {
    if (pageSize === 'all') return filteredItems;
    const startIndex = (currentPage - 1) * effectivePageSize;
    return filteredItems.slice(startIndex, startIndex + effectivePageSize);
  }, [filteredItems, currentPage, effectivePageSize, pageSize]);

  // Featured 4 God-Tier items for the collapsed vault teaser
  const featuredGodItems = useMemo(() => {
    return EQUIPMENT_DATA.filter((i) => i.isGodTier).slice(0, 4);
  }, []);

  const handleItemClick = (item) => {
    playUiClick();
    setInspectedItem(item);
  };

  const toggleVault = () => {
    playShield();
    setIsVaultOpen((prev) => !prev);
  };

  const scrollToVaultTop = () => {
    const el = document.getElementById('arsenal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="arsenal" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#111622] border border-[#f59e0b]/40">
          <span className="font-pixel text-[9px] text-[#fde047] tracking-widest uppercase">
            RPG EQUIPMENT & ARSENAL
          </span>
        </div>

        <h2 className="font-pixel text-xl sm:text-3xl md:text-4xl text-[#f8fafc] tracking-wider sm:tracking-widest mb-4">
          FORGED IN THE ABYSS
        </h2>

        <p className="font-outfit text-sm sm:text-base text-[#94a3b8] max-w-xl mb-6">
          Complete database of 120 weapons, shields, sacred armor, and abyssal relics. Features collapsible vault access and multi-page pagination for seamless exploration.
        </p>

        {/* Master Open / Close Toggle Button in Header */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={toggleVault}
            onMouseEnter={playUiHover}
            className={`px-5 py-2.5 font-pixel text-xs sm:text-sm tracking-wider border-2 transition-all cursor-pointer flex items-center gap-2.5 shadow-md ${
              isVaultOpen
                ? 'bg-[#1e131d] border-[#ef4444] text-[#fca5a5] hover:bg-[#ef4444] hover:text-white'
                : 'bg-[#182030] border-[#f59e0b] text-[#fde047] hover:bg-[#f59e0b] hover:text-[#080a0f] shadow-[0_0_18px_rgba(245,158,11,0.35)] animate-pulse'
            }`}
          >
            <span>{isVaultOpen ? '▼' : '►'}</span>
            <span>{isVaultOpen ? '✕ CLOSE ARSENAL (COLLAPSE)' : '🔓 OPEN ARSENAL (120 ITEMS)'}</span>
          </button>

          {isVaultOpen && (
            <span className="font-pixel text-[8.5px] text-[#94a3b8] px-3 py-1 bg-[#111622] border border-[#2c394b]">
              PAGE {currentPage} / {totalPages} • {filteredItems.length} ITEMS FOUND
            </span>
          )}
        </div>
      </div>

      {/* STATE 1: COLLAPSED VAULT PREVIEW */}
      {!isVaultOpen && (
        <PixelCard variant="gold" className="p-6 sm:p-8 bg-[#0d121c] border-2 border-[#f59e0b]/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left: Lore & Status */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-[#182030] border-2 border-[#f59e0b] text-3xl shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                🛡️
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 bg-[#f59e0b] animate-ping" />
                  <span className="font-pixel text-[9px] text-[#f59e0b] tracking-widest uppercase">
                    ARSENAL VAULT SEALED / COLLAPSED
                  </span>
                </div>
                <h3 className="font-pixel text-base sm:text-lg text-[#f8fafc] mb-2 tracking-wider">
                  EQUIPMENT ARCHIVE IS CURRENTLY CLOSED
                </h3>
                <p className="font-outfit text-xs sm:text-sm text-[#94a3b8] max-w-xl leading-relaxed">
                  Open the arsenal to browse all 120 pieces of gear with class filters, Tier V God-Tier gear, and clean pagination without endless scrolling.
                </p>

                {/* Quick Spec Pills */}
                <div className="flex flex-wrap gap-2 mt-3 font-pixel text-[8px] text-[#cbd5e1]">
                  <span className="px-2 py-1 bg-[#111622] border border-[#2c394b]">
                    ⚔️ 120 TOTAL EQUIPMENT
                  </span>
                  <span className="px-2 py-1 bg-[#111622] border border-[#2c394b]">
                    ⚡ 5 TIERS (T1 - GOD TIER)
                  </span>
                  <span className="px-2 py-1 bg-[#111622] border border-[#2c394b]">
                    🛡️ 6 GEAR CATEGORIES
                  </span>
                  <span className="px-2 py-1 bg-[#111622] border border-[#2c394b]">
                    📖 PAGINATED NAVIGATION
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Big Open Vault CTA */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <PixelButton
                variant="primary"
                size="lg"
                onClick={toggleVault}
                icon="🔓"
                className="w-full sm:w-auto"
              >
                OPEN FULL CATALOG
              </PixelButton>
              <span className="font-pixel text-[7.5px] text-[#64748b]">
                CLICK TO UNLOCK EQUIPMENT
              </span>
            </div>
          </div>

          {/* Featured Showcase Preview Cards */}
          <div className="mt-6 pt-6 border-t border-[#1e293b]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-pixel text-[8.5px] text-[#fde047] tracking-wider uppercase">
                ✦ FEATURED GOD-TIER WEAPONS & RELICS ✦
              </span>
              <span className="font-pixel text-[7.5px] text-[#94a3b8]">
                CLICK CARD TO VIEW DETAILS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {featuredGodItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={playUiHover}
                  className="p-3 bg-[#111622] border border-[#3b4b66] hover:border-[#f59e0b] transition-all cursor-pointer group flex items-center gap-3 relative overflow-hidden"
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center bg-[#090d15] border shrink-0 text-xl group-hover:scale-110 transition-transform"
                    style={{ borderColor: item.accentColor }}
                  >
                    {item.category === 'weapon'
                      ? '⚔️'
                      : item.category === 'armor'
                      ? '🛡️'
                      : item.category === 'helmet'
                      ? '🪖'
                      : item.category === 'shield'
                      ? '🛡️'
                      : item.category === 'boots'
                      ? '🥾'
                      : '🧣'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-pixel text-[6.5px] text-[#f59e0b]">
                        ⚡ GOD-TIER
                      </span>
                      <span className="font-pixel text-[6.5px] text-[#38bdf8]">
                        F{item.minStage}+
                      </span>
                    </div>
                    <h4 className="font-pixel text-[8.5px] text-[#f8fafc] group-hover:text-[#fde047] transition-colors truncate">
                      {item.name}
                    </h4>
                    <span className="font-pixel text-[7px] text-[#64748b]">
                      INSPECT ▶
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PixelCard>
      )}

      {/* STATE 2: EXPANDED FULL ARSENAL VAULT WITH PAGINATION */}
      {isVaultOpen && (
        <PixelCard variant="gold" className="p-5 sm:p-7 bg-[#0d121c] animate-fade-in border-2 border-[#f59e0b]">
          {/* Top Vault Bar: Close & Stats */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#2c394b]">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-[#fde047] tracking-wider">
                VAULT UNLOCKED
              </span>
              <span className="font-pixel text-[8px] text-[#64748b]">
                • {filteredItems.length} ITEMS FOUND
              </span>
            </div>

            <button
              type="button"
              onClick={toggleVault}
              onMouseEnter={playUiHover}
              className="px-3 py-1 bg-[#1e131d] border border-[#ef4444] text-[#fca5a5] hover:bg-[#ef4444] hover:text-white font-pixel text-[8.5px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>✕</span>
              <span>CLOSE ARSENAL</span>
            </button>
          </div>

          {/* Top Controls: Category Tabs */}
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#2c394b] overflow-x-auto">
            {EQUIPMENT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  playUiClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={playUiHover}
                className={`px-3 py-2 font-pixel text-[8.5px] sm:text-[9.5px] tracking-wider transition-all whitespace-nowrap border cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-[#182030] border-[#f59e0b] text-[#fde047] shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                    : 'bg-[#111622] border-[#2c394b] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#3b4b66]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Second Row: Tier Filters Strip */}
          <div className="flex items-center gap-1.5 pb-4 mb-4 border-b border-[#1e293b] overflow-x-auto">
            <span className="font-pixel text-[8px] text-[#64748b] mr-1 hidden md:inline">
              TIER:
            </span>
            <button
              type="button"
              onClick={() => {
                playUiClick();
                setTierFilter('all');
              }}
              className={`px-2.5 py-1 font-pixel text-[8px] tracking-wider border transition-all cursor-pointer ${
                tierFilter === 'all'
                  ? 'bg-[#1e293b] border-[#f59e0b] text-[#fde047]'
                  : 'bg-[#111622] border-[#2c394b] text-[#64748b] hover:text-[#cbd5e1]'
              }`}
            >
              ALL TIERS (120)
            </button>
            {EQUIPMENT_TIERS.map((t) => (
              <button
                key={t.tier}
                type="button"
                onClick={() => {
                  playUiClick();
                  setTierFilter(String(t.tier));
                }}
                className={`px-2.5 py-1 font-pixel text-[8px] tracking-wider border transition-all cursor-pointer whitespace-nowrap ${
                  tierFilter === String(t.tier)
                    ? 'bg-[#1e293b] shadow-sm'
                    : 'bg-[#111622] border-[#2c394b] text-[#64748b] hover:text-[#cbd5e1]'
                }`}
                style={{
                  borderColor: tierFilter === String(t.tier) ? t.color : undefined,
                  color: tierFilter === String(t.tier) ? t.color : undefined
                }}
              >
                {t.tier === 5 ? '⚡ TIER V (GOD-TIER)' : `T-${t.tier}`}
              </button>
            ))}
          </div>

          {/* Third Row: Role Filters, Search Input, and Page Size Selector */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
            {/* Role Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="font-pixel text-[8px] text-[#64748b] mr-1 hidden md:inline">
                ROLE:
              </span>
              {[
                { id: 'all', label: 'ALL CLASSES' },
                { id: 'knight', label: 'KNIGHT ⚔️' },
                { id: 'mage', label: 'MAGE 🔮' },
                { id: 'assassin', label: 'ASSASSIN 🗡️' }
              ].map((rf) => (
                <button
                  key={rf.id}
                  type="button"
                  onClick={() => {
                    playUiClick();
                    setRoleFilter(rf.id);
                  }}
                  className={`px-2.5 py-1 font-pixel text-[8px] tracking-wider border transition-all cursor-pointer ${
                    roleFilter === rf.id
                      ? 'bg-[#1e293b] border-[#38bdf8] text-[#38bdf8]'
                      : 'bg-[#111622] border-[#2c394b] text-[#64748b] hover:text-[#cbd5e1]'
                  }`}
                >
                  {rf.label}
                </button>
              ))}
            </div>

            {/* Search Box & Per-Page Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Items Per Page Selector ("Pisah Page") */}
              <div className="flex items-center gap-1 font-pixel text-[7.5px] text-[#94a3b8]">
                <span>PER PAGE:</span>
                {[12, 24, 48, 'all'].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => {
                      playUiClick();
                      setPageSize(sz);
                    }}
                    className={`px-2 py-1 border transition-all cursor-pointer ${
                      pageSize === sz
                        ? 'bg-[#1e293b] border-[#f59e0b] text-[#fde047]'
                        : 'bg-[#111622] border-[#2c394b] text-[#64748b] hover:text-[#cbd5e1]'
                    }`}
                  >
                    {sz === 'all' ? 'ALL' : sz}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative flex-1 sm:flex-initial">
                <input
                  type="text"
                  placeholder="SEARCH EQUIPMENT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-56 px-3 py-1.5 bg-[#090c14] border border-[#2c394b] font-pixel text-[8.5px] text-[#f8fafc] placeholder-[#64748b] focus:border-[#f59e0b] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 font-pixel text-[8px] text-[#64748b] hover:text-[#f8fafc]"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Paginated Items Grid */}
          {paginatedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={playUiHover}
                  className="p-4 bg-[#111622] border-2 border-[#2c394b] hover:border-[#f59e0b] transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
                >
                  {item.isGodTier && (
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                      <div className="bg-[#f59e0b] text-[#080a0f] font-pixel text-[6px] font-bold py-0.5 text-center transform rotate-45 translate-x-3 -translate-y-1 shadow-sm">
                        GOD
                      </div>
                    </div>
                  )}

                  <div>
                    {/* Top Category & Tier */}
                    <div className={`flex items-center justify-between mb-3 ${item.isGodTier ? 'pr-7' : ''}`}>
                      <span className="font-pixel text-[7.5px] text-[#94a3b8] uppercase">
                        {item.role === 'all' ? 'UNIVERSAL' : item.role}
                      </span>
                      <div className="flex items-center gap-1">
                        {item.minStage && (
                          <span className="font-pixel text-[6.5px] px-1 py-0.5 bg-[#083344] text-[#22d3ee] border border-[#0891b2]/50">
                            F{item.minStage}+
                          </span>
                        )}
                        <PixelBadge
                          variant={item.tier === 5 ? 'sculk' : item.tier === 4 ? 'gold' : 'dark'}
                          size="xs"
                        >
                          {item.isGodTier ? 'GOD-TIER' : `T-${item.tier}`}
                        </PixelBadge>
                      </div>
                    </div>

                    {/* Item Icon & Name */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <div
                        className="w-10 h-10 flex items-center justify-center bg-[#090d15] border shrink-0 text-xl group-hover:scale-110 transition-transform"
                        style={{ borderColor: item.accentColor }}
                      >
                        {item.category === 'weapon'
                          ? '⚔️'
                          : item.category === 'armor'
                          ? '🛡️'
                          : item.category === 'helmet'
                          ? '🪖'
                          : item.category === 'shield'
                          ? '🛡️'
                          : item.category === 'boots'
                          ? '🥾'
                          : '🧣'}
                      </div>
                      <div>
                        <h4 className="font-pixel text-[9.5px] text-[#f8fafc] group-hover:text-[#fde047] transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="font-pixel text-[7.5px] text-[#f59e0b]">
                          {item.price > 0 ? `${item.price} G` : 'STARTER'}
                        </span>
                      </div>
                    </div>

                    <p className="font-outfit text-xs text-[#94a3b8] line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Stats Preview Pill */}
                  <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between font-pixel text-[8px]">
                    <span className="text-[#38bdf8]">
                      {item.stats.atkBonus
                        ? `+${item.stats.atkBonus} ATK`
                        : item.stats.defBonus
                        ? `+${item.stats.defBonus} DEF`
                        : item.stats.maxShieldBonus
                        ? `+${item.stats.maxShieldBonus} SHD`
                        : item.stats.maxHpBonus
                        ? `+${item.stats.maxHpBonus} HP`
                        : `+${item.stats.speedBonus || 0} SPD`}
                    </span>
                    <span className="text-[#64748b] group-hover:text-[#fde047] transition-colors">
                      INSPECT ▶
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <span className="text-3xl block mb-2">🔍</span>
              <span className="font-pixel text-xs text-[#94a3b8]">
                NO EQUIPMENT MATCHES YOUR ACTIVE FILTERS
              </span>
            </div>
          )}

          {/* Pagination Navigation Bar */}
          {totalPages > 1 && (
            <div className="mt-8 pt-6 border-t border-[#2c394b] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-pixel text-[8px] text-[#94a3b8]">
                PAGE {currentPage} OF {totalPages} • SHOWING {paginatedItems.length} OF {filteredItems.length} ITEMS
              </span>

              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {/* Prev Button */}
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => {
                    playUiClick();
                    setCurrentPage((p) => Math.max(1, p - 1));
                  }}
                  className={`px-3 py-1.5 font-pixel text-[8px] border transition-all ${
                    currentPage === 1
                      ? 'bg-[#0f141d] border-[#1e293b] text-[#475569] cursor-not-allowed'
                      : 'bg-[#182030] border-[#3b4b66] text-[#cbd5e1] hover:border-[#f59e0b] hover:text-[#fde047] cursor-pointer'
                  }`}
                >
                  ◀ PREV
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => {
                  // Only show current, first, last, and immediate neighbors if many pages
                  if (
                    totalPages > 7 &&
                    p !== 1 &&
                    p !== totalPages &&
                    Math.abs(p - currentPage) > 1
                  ) {
                    if (p === 2 || p === totalPages - 1) {
                      return (
                        <span key={p} className="font-pixel text-[8px] text-[#64748b] px-1">
                          ..
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        playUiClick();
                        setCurrentPage(p);
                      }}
                      className={`w-8 h-8 font-pixel text-[8.5px] border transition-all cursor-pointer flex items-center justify-center ${
                        currentPage === p
                          ? 'bg-[#1e293b] border-[#f59e0b] text-[#fde047] shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                          : 'bg-[#111622] border-[#2c394b] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#3b4b66]'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    playUiClick();
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                  }}
                  className={`px-3 py-1.5 font-pixel text-[8px] border transition-all ${
                    currentPage === totalPages
                      ? 'bg-[#0f141d] border-[#1e293b] text-[#475569] cursor-not-allowed'
                      : 'bg-[#182030] border-[#3b4b66] text-[#cbd5e1] hover:border-[#f59e0b] hover:text-[#fde047] cursor-pointer'
                  }`}
                >
                  NEXT ▶
                </button>
              </div>
            </div>
          )}

          {/* Bottom Vault Closing Bar */}
          <div className="mt-8 pt-4 border-t border-[#1e293b] flex flex-wrap items-center justify-between gap-3">
            <span className="font-pixel text-[7.5px] text-[#64748b]">
              ARSENAL CODEX • 120 TOTAL FORGED ITEMS
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToVaultTop}
                onMouseEnter={playUiHover}
                className="px-3 py-1.5 bg-[#111622] border border-[#2c394b] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#3b4b66] font-pixel text-[8px] cursor-pointer"
              >
                ▲ BACK TO TOP OF ARSENAL
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleVault();
                  scrollToVaultTop();
                }}
                onMouseEnter={playUiHover}
                className="px-4 py-1.5 bg-[#1e131d] border border-[#ef4444] text-[#fca5a5] hover:bg-[#ef4444] hover:text-white font-pixel text-[8px] cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <span>✕</span>
                <span>CLOSE ARSENAL</span>
              </button>
            </div>
          </div>
        </PixelCard>
      )}

      {/* Equipment Modal */}
      {inspectedItem && (
        <EquipmentModal
          item={inspectedItem}
          onClose={() => setInspectedItem(null)}
        />
      )}
    </section>
  );
}
