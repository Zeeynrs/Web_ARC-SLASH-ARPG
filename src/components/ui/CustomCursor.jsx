import React, { useEffect, useState, useRef } from 'react';

export function CustomCursor({ enabled = true }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect mobile touch devices where custom cursors should be disabled
    const checkTouch = () => {
      const hasTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    const isCustomActive = enabled && !isTouchDevice;

    if (isCustomActive) {
      document.documentElement.classList.add('has-custom-cursor');
      document.body.classList.add('has-custom-cursor');
    } else {
      document.documentElement.classList.remove('has-custom-cursor');
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over an interactive element
      const target = e.target;
      if (!target) return;
      const interactive = target.closest(
        'button, a, input, select, textarea, [role="button"], [role="tab"], .cursor-pointer, .pixel-btn, [data-interactive]'
      );
      setIsHovering(!!interactive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [enabled, isTouchDevice]);

  if (!enabled || isTouchDevice || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[99999] select-none pixelated"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(${isHovering ? '-2px' : '0px'}, ${isHovering ? '-2px' : '0px'}) scale(${isClicking ? 0.9 : 1})`,
        transition: 'transform 0.06s ease-out'
      }}
    >
      {isHovering ? (
        // INTERACTIVE / POINTER STATE: Enchanted Radiant Warblade & Target Sparks
        // Hotspot is at the very tip (0, 0)
        <div className="relative">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="drop-shadow-[0_0_8px_rgba(245,158,11,0.95)]"
          >
            {/* Precision Hotspot Crosshair Dot */}
            <rect x="0" y="0" width="2" height="2" fill="#ffd700" />

            {/* Glowing Blade Edge (Hot Cyan & Gold) */}
            <rect x="2" y="2" width="3" height="3" fill="#ffffff" />
            <rect x="5" y="5" width="3" height="3" fill="#fef08a" />
            <rect x="8" y="8" width="3" height="3" fill="#38bdf8" />
            <rect x="11" y="11" width="3" height="3" fill="#0284c7" />
            <rect x="14" y="14" width="3" height="3" fill="#0369a1" />

            {/* Outer Blade Backing */}
            <rect x="3" y="1" width="2" height="2" fill="#fde047" />
            <rect x="1" y="3" width="2" height="2" fill="#fde047" />
            <rect x="6" y="4" width="2" height="2" fill="#bae6fd" />
            <rect x="4" y="6" width="2" height="2" fill="#bae6fd" />
            <rect x="9" y="7" width="2" height="2" fill="#7dd3fc" />
            <rect x="7" y="9" width="2" height="2" fill="#7dd3fc" />

            {/* Crossguard Wings */}
            <rect x="16" y="11" width="4" height="4" fill="#f59e0b" />
            <rect x="19" y="9" width="3" height="3" fill="#fbbf24" />
            <rect x="11" y="16" width="4" height="4" fill="#f59e0b" />
            <rect x="9" y="19" width="3" height="3" fill="#fbbf24" />

            {/* Central Guard Gem */}
            <rect x="15" y="15" width="4" height="4" fill="#dc2626" />
            <rect x="16" y="16" width="2" height="2" fill="#fef2f2" />

            {/* Grip Handle */}
            <rect x="18" y="18" width="3" height="3" fill="#78350f" />
            <rect x="20" y="20" width="3" height="3" fill="#451a03" />
            <rect x="22" y="22" width="3" height="3" fill="#78350f" />

            {/* Radiant Pommel */}
            <rect x="24" y="24" width="4" height="4" fill="#f59e0b" />
            <rect x="25" y="25" width="2" height="2" fill="#fde047" />
          </svg>

          {/* Glowing Aura Ring for Interactive Elements */}
          <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
        </div>
      ) : (
        // DEFAULT STATE: Classic 16-Bit Forged Steel Broadsword
        // Hotspot is at the very tip (0, 0)
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] filter"
        >
          {/* Tip (Hotspot directly at 0,0) */}
          <rect x="0" y="0" width="2" height="2" fill="#ffffff" />

          {/* Upper Blade */}
          <rect x="2" y="2" width="3" height="3" fill="#ffffff" />
          <rect x="3" y="1" width="2" height="2" fill="#cbd5e1" />
          <rect x="1" y="3" width="2" height="2" fill="#94a3b8" />

          {/* Mid Blade */}
          <rect x="5" y="5" width="3" height="3" fill="#e2e8f0" />
          <rect x="6" y="4" width="2" height="2" fill="#cbd5e1" />
          <rect x="4" y="6" width="2" height="2" fill="#64748b" />

          {/* Lower Blade */}
          <rect x="8" y="8" width="3" height="3" fill="#cbd5e1" />
          <rect x="9" y="7" width="2" height="2" fill="#94a3b8" />
          <rect x="7" y="9" width="2" height="2" fill="#475569" />

          <rect x="11" y="11" width="3" height="3" fill="#94a3b8" />
          <rect x="12" y="10" width="2" height="2" fill="#64748b" />
          <rect x="10" y="12" width="2" height="2" fill="#334155" />

          {/* Crossguard Wings */}
          <rect x="13" y="9" width="3" height="3" fill="#fbbf24" />
          <rect x="15" y="7" width="3" height="3" fill="#f59e0b" />
          <rect x="9" y="13" width="3" height="3" fill="#fbbf24" />
          <rect x="7" y="15" width="3" height="3" fill="#f59e0b" />

          {/* Crossguard Center Collar */}
          <rect x="13" y="13" width="3" height="3" fill="#b45309" />

          {/* Grip Handle */}
          <rect x="15" y="15" width="3" height="3" fill="#78350f" />
          <rect x="17" y="17" width="3" height="3" fill="#451a03" />

          {/* Ruby Pommel */}
          <rect x="19" y="19" width="4" height="4" fill="#dc2626" />
          <rect x="20" y="20" width="2" height="2" fill="#f87171" />
        </svg>
      )}
    </div>
  );
}
