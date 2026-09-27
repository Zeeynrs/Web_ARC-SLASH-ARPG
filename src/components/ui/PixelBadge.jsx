import React from 'react';
import { cn } from '../../utils/cn';

export function PixelBadge({
  children,
  variant = 'default', // 'default', 'gold', 'crimson', 'mana', 'sculk', 'emerald'
  size = 'sm',
  className = ''
}) {
  const variantStyles = {
    default: 'bg-[#1e293b] text-[#cbd5e1] border-[#475569]',
    gold: 'bg-[#78350f]/60 text-[#fde047] border-[#ca8a04]',
    crimson: 'bg-[#7f1d1d]/60 text-[#fca5a5] border-[#dc2626]',
    mana: 'bg-[#0c4a6e]/60 text-[#7dd3fc] border-[#0284c7]',
    sculk: 'bg-[#083344]/80 text-[#67e8f9] border-[#0891b2]',
    emerald: 'bg-[#064e3b]/70 text-[#6ee7b7] border-[#059669]'
  };

  const sizeStyles = {
    xs: 'text-[7px] px-1.5 py-0.5 tracking-wider',
    sm: 'text-[8.5px] px-2.5 py-1 tracking-wider',
    md: 'text-[10px] px-3 py-1.5 tracking-widest'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-["Press_Start_2P"] uppercase border select-none',
        variantStyles[variant] || variantStyles.default,
        sizeStyles[size] || sizeStyles.sm,
        className
      )}
    >
      {children}
    </span>
  );
}
