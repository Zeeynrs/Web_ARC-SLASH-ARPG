import React from 'react';

export function ScanlineOverlay({ enabled = true }) {
  if (!enabled) return null;

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-50 select-none overflow-hidden"
    >
      {/* CRT Scanline bars */}
      <div 
        className="w-full h-full opacity-25"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%)',
          backgroundSize: '100% 4px'
        }}
      />
      {/* Ambient Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(0, 0, 0, 0.65) 100%)'
        }}
      />
    </div>
  );
}
