import React from 'react';
import { cn } from '../../utils/cn';

export function PixelCard({
  children,
  className = '',
  variant = 'default', // 'default', 'gold', 'sculk', 'crimson', 'mana'
  interactive = false,
  onClick,
  ...props
}) {
  const borderStyles = {
    default: 'border-[#2c394b] bg-[#111622]/95 hover:border-[#3b4b66]',
    gold: 'border-[#b45309] bg-[#14120b]/95 shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-[#f59e0b]',
    sculk: 'border-[#0891b2] bg-[#081420]/95 shadow-[0_0_24px_rgba(6,182,212,0.2)] hover:border-[#22d3ee]',
    crimson: 'border-[#991b1b] bg-[#170a0a]/95 shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-[#ef4444]',
    mana: 'border-[#0369a1] bg-[#0a121e]/95 shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:border-[#38bdf8]'
  };

  return (
    <div
      className={cn(
        'relative border-2 p-5 transition-all duration-150',
        'shadow-[inset_2px_2px_0_0_rgba(255,255,255,0.06),inset_-2px_-2px_0_0_rgba(0,0,0,0.6),0_6px_20px_rgba(0,0,0,0.6)]',
        borderStyles[variant] || borderStyles.default,
        interactive && 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.8)] active:translate-y-0.5',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Corner Pixel Brackets */}
      <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#f8fafc]/40 pointer-events-none" />
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#f8fafc]/40 pointer-events-none" />
      <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#f8fafc]/40 pointer-events-none" />
      <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#f8fafc]/40 pointer-events-none" />

      {children}
    </div>
  );
}
