import React, { useState } from 'react';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelButton } from '../ui/PixelButton';
import { playUiClick, playShield, playCoin } from '../../utils/audioSynth';

export function EquipmentModal({ item, onClose }) {
  const [isEquipped, setIsEquipped] = useState(false);

  if (!item) return null;

  const handleEquip = () => {
    playShield();
    setIsEquipped(!isEquipped);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0f1420] border-2 border-[#b45309] p-6 shadow-[0_0_35px_rgba(0,0,0,0.95)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#2c394b]">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[9px] text-[#f59e0b] tracking-wider uppercase">
              EQUIPMENT INSPECTION
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="w-7 h-7 flex items-center justify-center bg-[#1e293b] border border-[#475569] text-[#f8fafc] font-pixel text-xs hover:bg-[#ef4444] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Big Pixel Item Icon Banner */}
        <div className="flex flex-col items-center justify-center p-6 bg-[#090c14] border border-[#2c394b] mb-5">
          <div 
            className="w-20 h-20 flex items-center justify-center border-2 mb-3 shadow-inner"
            style={{ borderColor: item.accentColor }}
          >
            {/* Visual Pixel representation */}
            <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              {item.category === 'weapon' ? '⚔️' : item.category === 'armor' ? '🛡️' : item.category === 'helmet' ? '🪖' : item.category === 'shield' ? '🛡️' : item.category === 'boots' ? '🥾' : '🧣'}
            </span>
          </div>

          <h3 className="font-pixel text-base text-[#f8fafc] text-center tracking-wider mb-1">
            {item.name}
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1">
            <PixelBadge variant={item.tier === 5 ? 'sculk' : 'gold'} size="xs">
              TIER {item.tier}
            </PixelBadge>
            {item.isGodTier && (
              <PixelBadge variant="gold" size="xs">
                ⚡ GOD-TIER
              </PixelBadge>
            )}
            {item.minStage && (
              <PixelBadge variant="sculk" size="xs">
                STAGE {item.minStage}+ {item.biomeName ? `(${item.biomeName})` : ''}
              </PixelBadge>
            )}
            {item.isExclusive && (
              <PixelBadge variant="crimson" size="xs">
                🎰 ROULETTE EXCLUSIVE
              </PixelBadge>
            )}
            <span className="font-pixel text-[8px] text-[#94a3b8] uppercase">
              {item.category} • {item.role}
            </span>
          </div>
        </div>

        {/* Item Stats Grid */}
        <div className="space-y-2 mb-4">
          <div className="p-3 bg-[#111622] border border-[#2c394b] space-y-1.5 font-pixel text-[8.5px]">
            <span className="text-[#38bdf8] uppercase block mb-1">COMBAT ATTRIBUTES</span>
            {item.stats.atkBonus !== undefined && item.stats.atkBonus > 0 && (
              <div className="flex justify-between text-[#fde047]">
                <span>ATTACK POWER:</span>
                <span>+{item.stats.atkBonus} ATK</span>
              </div>
            )}
            {item.stats.defBonus !== undefined && item.stats.defBonus > 0 && (
              <div className="flex justify-between text-[#38bdf8]">
                <span>DEFENSE ARMOR:</span>
                <span>+{item.stats.defBonus} DEF</span>
              </div>
            )}
            {item.stats.maxShieldBonus !== undefined && item.stats.maxShieldBonus > 0 && (
              <div className="flex justify-between text-[#38bdf8]">
                <span>MANA SHIELD:</span>
                <span>+{item.stats.maxShieldBonus} SHIELD</span>
              </div>
            )}
            {item.stats.maxHpBonus !== undefined && item.stats.maxHpBonus > 0 && (
              <div className="flex justify-between text-[#ef4444]">
                <span>HEALTH BONUS:</span>
                <span>+{item.stats.maxHpBonus} MAX HP</span>
              </div>
            )}
            {item.stats.speedBonus !== undefined && item.stats.speedBonus > 0 && (
              <div className="flex justify-between text-[#10b981]">
                <span>MOVEMENT SPEED:</span>
                <span>+{item.stats.speedBonus} SPD</span>
              </div>
            )}
          </div>

          {/* Description & Lore */}
          <div className="p-3 bg-[#111622] border border-[#2c394b] space-y-2">
            <p className="font-outfit text-xs text-[#cbd5e1] leading-relaxed">
              {item.description}
            </p>
            {item.lore && (
              <p className="font-outfit text-xs text-[#94a3b8] italic border-t border-[#1e293b] pt-2">
                "{item.lore}"
              </p>
            )}
          </div>

          {/* Shop Valuation */}
          <div className="flex justify-between items-center px-3 py-2 bg-[#111622] border border-[#2c394b] font-pixel text-[8.5px]">
            <span className="text-[#94a3b8]">SHOP VALUE:</span>
            <span className="text-[#fde047] flex items-center gap-1">
              <span>💰</span> {item.price > 0 ? `${item.price} GOLD` : 'FREE STARTER'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#2c394b] flex items-center justify-between gap-3">
          <PixelButton
            variant={isEquipped ? 'crimson' : 'primary'}
            size="sm"
            onClick={handleEquip}
          >
            {isEquipped ? 'UNEQUIP' : 'EQUIP ITEM'}
          </PixelButton>

          <PixelButton variant="dark" size="sm" onClick={onClose}>
            CLOSE
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
