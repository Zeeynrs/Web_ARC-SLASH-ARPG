import React from 'react';
import { cn } from '../../utils/cn';
import { playUiClick, playUiHover } from '../../utils/audioSynth';

export function PixelButton({
  children,
  variant = 'primary', // 'primary', 'crimson', 'mana', 'dark', 'sculk'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  onClick,
  href,
  target,
  rel,
  disabled = false,
  icon,
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    playUiClick();
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    if (!disabled) playUiHover();
  };

  const variantStyles = {
    primary: 'bg-[#b45309] text-[#fef08a] border-[#f59e0b] shadow-[0_4px_0_0_#78350f,0_0_12px_rgba(245,158,11,0.3)] hover:bg-[#d97706]',
    crimson: 'bg-[#991b1b] text-[#fef2f2] border-[#ef4444] shadow-[0_4px_0_0_#7f1d1d,0_0_12px_rgba(239,68,68,0.35)] hover:bg-[#b91c1c]',
    mana: 'bg-[#0369a1] text-[#e0f2fe] border-[#38bdf8] shadow-[0_4px_0_0_#0c4a6e,0_0_12px_rgba(56,189,248,0.35)] hover:bg-[#0284c7]',
    sculk: 'bg-[#0e7490] text-[#cffafe] border-[#22d3ee] shadow-[0_4px_0_0_#164e63,0_0_16px_rgba(34,211,238,0.4)] hover:bg-[#0891b2]',
    dark: 'bg-[#182030] text-[#cbd5e1] border-[#3b4b66] shadow-[0_4px_0_0_#0f1420,0_0_8px_rgba(0,0,0,0.5)] hover:bg-[#222c42]'
  };

  const sizeStyles = {
    sm: 'text-[9px] px-3 py-1.5 gap-1.5 tracking-wider',
    md: 'text-[11px] px-5 py-2.5 gap-2 tracking-widest',
    lg: 'text-[13px] px-7 py-3.5 gap-2.5 tracking-widest'
  };

  const baseStyles = cn(
    'inline-flex items-center justify-center font-["Press_Start_2P"] select-none transition-all duration-75 active:translate-y-1 active:shadow-none border-2',
    'rounded-none pixelated',
    disabled ? 'opacity-40 cursor-not-allowed filter grayscale' : 'cursor-pointer',
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.md,
    className
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseStyles}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={baseStyles}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
