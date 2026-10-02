import React, { useState, useEffect } from 'react';
import { OpeningCutscene } from './components/intro/OpeningCutscene';
import { Navbar } from './components/navigation/Navbar';
import { DepthIndicator } from './components/navigation/DepthIndicator';
import { HeroSection } from './components/hero/HeroSection';
import { WorldSection } from './components/world/WorldSection';
import { CharacterSection } from './components/characters/CharacterSection';
import { GameplaySection } from './components/gameplay/GameplaySection';
import { BossArchive } from './components/bosses/BossArchive';
import { ArsenalSection } from './components/arsenal/ArsenalSection';
import { NewsSection } from './components/news/NewsSection';
import { TrailerSection } from './components/trailer/TrailerSection';
import { Footer } from './components/footer/Footer';
import { SettingsModal } from './components/settings/SettingsModal';
import { EasterEggSystem } from './components/eastereggs/EasterEggSystem';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScanlineOverlay } from './components/ui/ScanlineOverlay';
import { useSettings } from './hooks/useSettings';
import { useSound } from './hooks/useSound';

export function App() {
  const { settings, updateSetting, resetSettings } = useSettings();
  const sound = useSound();

  // Cutscene management: check if user has previously seen intro
  const [showCutscene, setShowCutscene] = useState(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        const seen = localStorage.getItem('parallelDungeonsIntroSeen') || localStorage.getItem('arcSlashIntroSeen');
        return seen !== 'true';
      }
    } catch (e) {}
    return true;
  });

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [secretTrigger, setSecretTrigger] = useState(null);

  // Sync audio settings with sound hook
  useEffect(() => {
    if (sound.sfxEnabled !== settings.sfx) sound.toggleSfx();
  }, [settings.sfx]);

  useEffect(() => {
    if (sound.musicEnabled !== settings.music) sound.toggleMusic();
  }, [settings.music]);

  useEffect(() => {
    sound.setMasterVolume(settings.volume);
  }, [settings.volume]);

  const handleCutsceneComplete = () => {
    setShowCutscene(false);
    try {
      localStorage.setItem('parallelDungeonsIntroSeen', 'true');
    } catch (e) {}
  };

  const handleReplayIntro = () => {
    setShowCutscene(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#080a0f] text-[#f8fafc] font-outfit overflow-x-hidden">
      {/* 1. Interactive Pixel Sword Custom Cursor (Disabled on mobile) */}
      <CustomCursor enabled={settings.customCursor} />

      {/* 2. CRT Scanline & Ambient Vignette Filter */}
      <ScanlineOverlay enabled={settings.crtScanlines} />

      {/* 3. Opening Cutscene (Interactive prologue) */}
      {showCutscene ? (
        <OpeningCutscene onComplete={handleCutsceneComplete} />
      ) : (
        <div className="animate-fade-in">
          {/* Top Fixed Navbar */}
          <Navbar
            onOpenSettings={() => setSettingsOpen(true)}
            soundState={sound}
            onTriggerSecret={(type) => setSecretTrigger(type)}
            onReplayIntro={handleReplayIntro}
          />

          {/* Vertical Depth Meter */}
          <DepthIndicator />

          {/* Main Website Page Content */}
          <main>
            {/* Hero Section */}
            <HeroSection
              onExploreWorld={() => scrollToSection('world')}
              onWatchTrailer={() => scrollToSection('trailer')}
            />

            {/* World / 50 Floors Dungeon Map */}
            <WorldSection />

            {/* Playable Heroes & Character Wiki Codex */}
            <CharacterSection />

            {/* Combat Systems & Mechanics */}
            <GameplaySection />

            {/* Boss Archive / Codex (Warden, Alter Ego, Dragon, Skeleton, Slime) */}
            <BossArchive />

            {/* Arsenal / Equipment Wiki */}
            <ArsenalSection />

            {/* News, Updates & Patch Notes */}
            <NewsSection />

            {/* Official Trailer Video Reel */}
            <TrailerSection />
          </main>

          {/* Footer */}
          <Footer
            onTriggerSecret={(type) => setSecretTrigger(type)}
          />

          {/* Settings Modal */}
          <SettingsModal
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            settings={settings}
            updateSetting={updateSetting}
            onReplayIntro={handleReplayIntro}
          />

          {/* Secret Easter Egg System */}
          <EasterEggSystem
            secretTrigger={secretTrigger}
            onClearSecret={() => setSecretTrigger(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
