import React, { useState, useMemo } from 'react';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_TIERS, EQUIPMENT_DATA } from '../../data/equipmentData';
import { PixelCard } from '../ui/PixelCard';
import { PixelBadge } from '../ui/PixelBadge';
import { EquipmentModal } from './EquipmentModal';
import { playUiClick, playUiHover } from '../../utils/audioSynth';

export function ArsenalSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all'); // 'all', 'knight', 'mage', 'assassin'
  const [tierFilter, setTierFilter] = useState('all'); // 'all', '1', '2', '3', '4', '5'
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedItem, setInspectedItem] = useState(null);

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

  const handleItemClick = (item) => {
    playUiClick();
    setInspectedItem(item);
  };

  return (
    <section id="arsenal" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#111622] border border-[#f59e0b]/40">
          <span className="font-pixel text-[9px] text-[#fde047] tracking-widest uppercase">
            RPG EQUIPMENT & ARSENAL
          </span>
        </div>

        <h2 className="font-pixel text-3xl sm:text-4xl text-[#f8fafc] tracking-widest mb-4">
          FORGED IN THE ABYSS
        </h2>

        <p className="font-outfit text-sm sm:text-base text-[#94a3b8] max-w-xl">
          Complete database of all 120 weapons, shields, divine armor plates, and deep dark relics. Study their attributes, role synergies, and God-Tier scaling before diving into the catacombs.
        </p>
      </div>

      {/* Main Arsenal Chassis */}
      <PixelCard variant="gold" className="p-5 sm:p-7 bg-[#0d121c]">
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

        {/* Third Row: Role Filters & Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
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

          {/* Search Box & Count */}
          <div className="flex items-center gap-3">
            <span className="font-pixel text-[7.5px] text-[#64748b] hidden lg:inline">
              SHOWING {filteredItems.length} / {EQUIPMENT_DATA.length}
            </span>
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH 120 ITEMS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-60 px-3 py-1.5 bg-[#090c14] border border-[#2c394b] font-pixel text-[8.5px] text-[#f8fafc] placeholder-[#64748b] focus:border-[#f59e0b] focus:outline-none"
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

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
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
                  <div className="flex items-center justify-between mb-3">
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
              NO EQUIPMENT FOUND MATCHING SEARCH FILTERS
            </span>
          </div>
        )}
      </PixelCard>

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
