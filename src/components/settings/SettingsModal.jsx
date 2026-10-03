import React, { useEffect } from 'react';
import { PixelButton } from '../ui/PixelButton';
import { playUiClick, playUiHover } from '../../utils/audioSynth';

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  updateSetting,
  onReplayIntro
}) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-[#111622] border-2 border-[#b45309] shadow-[0_0_30px_rgba(0,0,0,0.9),0_0_15px_rgba(245,158,11,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 pb-3 border-b-2 border-[#2c394b] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚙️</span>
            <div>
              <h2 className="font-pixel text-sm sm:text-base text-[#fde047] tracking-widest">
                DUNGEON SETTINGS
              </h2>
              <span className="font-outfit text-xs text-[#94a3b8]">
                Preferences are saved automatically
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center bg-[#1e293b] border border-[#475569] text-[#f8fafc] font-pixel text-xs hover:bg-[#ef4444] hover:border-[#dc2626] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6 overflow-y-auto flex-1 p-4 sm:p-5">
          {/* Audio Section */}
          <div className="space-y-3">
            <h3 className="font-pixel text-[10px] text-[#38bdf8] uppercase tracking-wider flex items-center gap-2">
              <span>🔊</span> AUDIO ENGINE
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* SFX Toggle */}
              <div className="flex items-center justify-between p-3 bg-[#0d121c] border border-[#2c394b]">
                <span className="font-pixel text-[9px] text-[#cbd5e1]">SFX SYNTH</span>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    updateSetting('sfx', !settings.sfx);
                  }}
                  className={`px-3 py-1 font-pixel text-[8.5px] border cursor-pointer transition-all ${
                    settings.sfx
                      ? 'bg-[#15803d] border-[#22c55e] text-[#dcfce7]'
                      : 'bg-[#1e293b] border-[#475569] text-[#94a3b8]'
                  }`}
                >
                  {settings.sfx ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Music Ambient Toggle */}
              <div className="flex items-center justify-between p-3 bg-[#0d121c] border border-[#2c394b]">
                <span className="font-pixel text-[9px] text-[#cbd5e1]">AMBIENT DRONE</span>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    updateSetting('music', !settings.music);
                  }}
                  className={`px-3 py-1 font-pixel text-[8.5px] border cursor-pointer transition-all ${
                    settings.music
                      ? 'bg-[#15803d] border-[#22c55e] text-[#dcfce7]'
                      : 'bg-[#1e293b] border-[#475569] text-[#94a3b8]'
                  }`}
                >
                  {settings.music ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Volume Slider */}
            <div className="p-3 bg-[#0d121c] border border-[#2c394b] flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-pixel text-[9px] text-[#cbd5e1]">MASTER VOLUME</span>
                <span className="font-pixel text-[9px] text-[#f59e0b]">
                  {Math.round(settings.volume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.volume}
                onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
                className="w-full accent-[#f59e0b] cursor-pointer"
              />
            </div>
          </div>

          {/* Display & Visuals */}
          <div className="space-y-3">
            <h3 className="font-pixel text-[10px] text-[#a855f7] uppercase tracking-wider flex items-center gap-2">
              <span>🖥️</span> DISPLAY & PIXEL EFFECTS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* CRT Scanlines */}
              <div className="flex items-center justify-between p-3 bg-[#0d121c] border border-[#2c394b]">
                <span className="font-pixel text-[9px] text-[#cbd5e1]">CRT SCANLINES</span>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    updateSetting('crtScanlines', !settings.crtScanlines);
                  }}
                  className={`px-3 py-1 font-pixel text-[8.5px] border cursor-pointer transition-all ${
                    settings.crtScanlines
                      ? 'bg-[#15803d] border-[#22c55e] text-[#dcfce7]'
                      : 'bg-[#1e293b] border-[#475569] text-[#94a3b8]'
                  }`}
                >
                  {settings.crtScanlines ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Screen Shake */}
              <div className="flex items-center justify-between p-3 bg-[#0d121c] border border-[#2c394b]">
                <span className="font-pixel text-[9px] text-[#cbd5e1]">SCREEN SHAKE</span>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    updateSetting('screenShake', !settings.screenShake);
                  }}
                  className={`px-3 py-1 font-pixel text-[8.5px] border cursor-pointer transition-all ${
                    settings.screenShake
                      ? 'bg-[#15803d] border-[#22c55e] text-[#dcfce7]'
                      : 'bg-[#1e293b] border-[#475569] text-[#94a3b8]'
                  }`}
                >
                  {settings.screenShake ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Custom Cursor */}
              <div className="flex items-center justify-between p-3 bg-[#0d121c] border border-[#2c394b]">
                <span className="font-pixel text-[9px] text-[#cbd5e1]">PIXEL SWORD CURSOR</span>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    updateSetting('customCursor', !settings.customCursor);
                  }}
                  className={`px-3 py-1 font-pixel text-[8.5px] border cursor-pointer transition-all ${
                    settings.customCursor
                      ? 'bg-[#15803d] border-[#22c55e] text-[#dcfce7]'
                      : 'bg-[#1e293b] border-[#475569] text-[#94a3b8]'
                  }`}
                >
                  {settings.customCursor ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between p-3 bg-[#0d121c] border border-[#2c394b]">
                <span className="font-pixel text-[9px] text-[#cbd5e1]">REDUCED MOTION</span>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    updateSetting('reducedMotion', !settings.reducedMotion);
                  }}
                  className={`px-3 py-1 font-pixel text-[8.5px] border cursor-pointer transition-all ${
                    settings.reducedMotion
                      ? 'bg-[#b45309] border-[#f59e0b] text-[#fef08a]'
                      : 'bg-[#1e293b] border-[#475569] text-[#94a3b8]'
                  }`}
                >
                  {settings.reducedMotion ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* Intro Cutscene Management */}
          <div className="p-4 bg-[#0d121c] border border-[#2c394b] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="font-pixel text-[9px] text-[#fde047] block mb-1">
                CINEMATIC INTRO
              </span>
              <p className="font-outfit text-xs text-[#94a3b8]">
                Re-experience the pixel-art torch awakening sequence.
              </p>
            </div>
            <PixelButton
              variant="dark"
              size="sm"
              onClick={() => {
                onClose();
                onReplayIntro();
              }}
            >
              REPLAY INTRO
            </PixelButton>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-[#2c394b] flex justify-end shrink-0 bg-[#0c1017]">
          <PixelButton variant="primary" size="sm" onClick={onClose}>
            CONFIRM & CLOSE
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
