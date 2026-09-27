import { useState, useEffect, useCallback } from 'react';
import * as audioSynth from '../utils/audioSynth';

export function useSound() {
  const [sfx, setSfxState] = useState(audioSynth.getSfxEnabled());
  const [music, setMusicState] = useState(audioSynth.getMusicEnabled());
  const [volume, setVolumeState] = useState(audioSynth.getMasterVolume());

  const toggleSfx = useCallback(() => {
    const next = !sfx;
    audioSynth.setSfxEnabled(next);
    setSfxState(next);
    if (next) audioSynth.playUiClick();
  }, [sfx]);

  const toggleMusic = useCallback(() => {
    const next = !music;
    audioSynth.setMusicEnabled(next);
    setMusicState(next);
    if (sfx) audioSynth.playUiClick();
  }, [music, sfx]);

  const changeVolume = useCallback((newVol) => {
    audioSynth.setMasterVolume(newVol);
    setVolumeState(newVol);
  }, []);

  return {
    sfxEnabled: sfx,
    musicEnabled: music,
    masterVolume: volume,
    toggleSfx,
    toggleMusic,
    setMasterVolume: changeVolume,
    playSlash: audioSynth.playSlash,
    playHit: audioSynth.playHit,
    playUiHover: audioSynth.playUiHover,
    playUiClick: audioSynth.playUiClick,
    playSkill: audioSynth.playSkill,
    playShield: audioSynth.playShield,
    playHeal: audioSynth.playHeal,
    playExplosion: audioSynth.playExplosion,
    playBossRoar: audioSynth.playBossRoar,
    playCoin: audioSynth.playCoin,
    playAchievement: audioSynth.playAchievement,
    startAmbientDungeon: audioSynth.startAmbientDungeon,
    stopAmbientDungeon: audioSynth.stopAmbientDungeon
  };
}
