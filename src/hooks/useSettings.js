import { useState, useEffect } from 'react';

const SETTINGS_KEY = 'parallel_dungeons_settings';
const LEGACY_SETTINGS_KEY = 'arc_slash_settings';

const DEFAULT_SETTINGS = {
  sfx: true,
  music: true,
  volume: 0.75,
  crtScanlines: true,
  screenShake: true,
  reducedMotion: false,
  customCursor: true
};

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(SETTINGS_KEY) || localStorage.getItem(LEGACY_SETTINGS_KEY);
        if (saved) {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
        }
      }
    } catch (e) {
      console.warn('Could not load settings', e);
    }
    return DEFAULT_SETTINGS;
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    } catch (e) {}
  };

  return {
    settings,
    updateSetting,
    resetSettings
  };
}
