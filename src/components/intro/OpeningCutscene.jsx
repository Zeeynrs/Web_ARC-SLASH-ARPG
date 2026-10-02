import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  playSlash,
  playHit,
  playUiClick,
  playUiHover,
  playSkill,
  playExplosion,
  playBossRoar,
  playAchievement,
  startAmbientDungeon,
  stopAmbientDungeon,
  playTorchIgnite,
  playSwordDraw,
  playDramaticSting,
  playMonsterGrowl,
  playComboHit
} from '../../utils/audioSynth';

// 5 Cinematic Chapters with their timeline boundaries (in seconds)
const SCENE_CHAPTERS = [
  { num: 1, label: 'I. THE ABYSS', start: 0, end: 4.5, timeStr: '00:00' },
  { num: 2, label: 'II. THE EMBER', start: 4.5, end: 9.5, timeStr: '00:05' },
  { num: 3, label: 'III. THE WARDEN', start: 9.5, end: 15.0, timeStr: '00:10' },
  { num: 4, label: 'IV. THE STRIKE', start: 15.0, end: 22.0, timeStr: '00:15' },
  { num: 5, label: 'V. PARALLEL DUNGEONS', start: 22.0, end: 28.5, timeStr: '00:22' }
];

const TOTAL_CUTSCENE_DURATION = 28.5; // in seconds

export function OpeningCutscene({ onComplete }) {
  // Timeline playback state
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scene, setScene] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [selectedClass, setSelectedClass] = useState('knight');
  const [isSlashing, setIsSlashing] = useState(false);
  const [combo, setCombo] = useState(0);
  const [screenShake, setScreenShake] = useState(0);
  const [screenFlash, setScreenFlash] = useState(null); // 'gold', 'emerald', 'purple', 'crimson'
  const [grandSlashRevealed, setGrandSlashRevealed] = useState(false);

  // Auto-launch countdown remaining for Scene 5
  const [autoEnterRemaining, setAutoEnterRemaining] = useState(6);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(Date.now());
  const currentTimeRef = useRef(0);
  const isPlayingRef = useRef(true);
  const lastSlashTimeRef = useRef(0);
  const comboTimeoutRef = useRef(null);
  const damagePopupsRef = useRef([]);
  const sparksRef = useRef([]);
  const voidDebrisRef = useRef([]);
  const minionStatesRef = useRef([
    { id: 1, xOffset: 75, hp: 100, isDead: false, hitTimer: 0 },
    { id: 2, xOffset: 125, hp: 100, isDead: false, hitTimer: 0 }
  ]);
  const audioUnlockedRef = useRef(false);
  const lastTriggeredActionRef = useRef({});

  // Safely unlock Web Audio context
  const unlockAudio = useCallback(() => {
    if (audioUnlockedRef.current) return;
    try {
      startAmbientDungeon();
      audioUnlockedRef.current = true;
      setAudioUnlocked(true);
    } catch (e) {
      console.warn('Audio unlock warning:', e);
    }
  }, []);

  // Listen for any initial interaction to unblock audio seamlessly
  useEffect(() => {
    const handleFirstInteraction = () => {
      unlockAudio();
    };
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [unlockAudio]);

  // Execute an interactive combat slash / spell strike
  const triggerSlash = useCallback((customDamage, customCrit) => {
    unlockAudio();

    const now = Date.now();
    lastSlashTimeRef.current = now;
    setIsSlashing(true);
    setTimeout(() => setIsSlashing(false), 320);

    // Dynamic screen shake & flash
    setScreenShake(7);
    setTimeout(() => setScreenShake(0), 200);

    // Increment combo
    setCombo((prev) => {
      const next = prev + 1;
      playComboHit(next);

      if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
      comboTimeoutRef.current = setTimeout(() => {
        setCombo(0);
      }, 2500);

      return next;
    });

    // Class-specific sound effects & flash color
    if (selectedClass === 'mage') {
      playExplosion();
      playSkill();
      setScreenFlash('purple');
    } else if (selectedClass === 'assassin') {
      playSlash();
      playSkill();
      setScreenFlash('emerald');
    } else {
      playSlash();
      playHit();
      setScreenFlash('gold');
    }
    setTimeout(() => setScreenFlash(null), 120);

    // Hit minions and spawn visual hit reactions
    minionStatesRef.current.forEach((m) => {
      m.hitTimer = Date.now();
      m.hp = Math.max(0, m.hp - 35);
      if (m.hp <= 0) m.isDead = true;
    });

    // Generate floating RPG damage popups
    const isCrit = customCrit ?? Math.random() > 0.35;
    let baseDmg = customDamage ?? (1200 + Math.floor(Math.random() * 850));
    if (selectedClass === 'mage' && !customDamage) baseDmg = 2100 + Math.floor(Math.random() * 1400);
    if (selectedClass === 'assassin' && !customDamage) baseDmg = 1850 + Math.floor(Math.random() * 1900);
    if (isCrit) baseDmg = Math.floor(baseDmg * 1.75);

    let prefix = '';
    if (isCrit) prefix = selectedClass === 'assassin' ? 'BACKSTAB! ' : 'CRITICAL! ';
    if (combo >= 3 && combo % 2 === 0) prefix = 'ARC OVERLOAD! ';

    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : window.innerWidth;
    const h = canvas ? canvas.height : window.innerHeight;
    const spawnX = w / 2 + 55 + (Math.random() - 0.5) * 50;
    const spawnY = h / 2 - 20 + (Math.random() - 0.5) * 40;

    damagePopupsRef.current.push({
      id: Math.random(),
      text: `${prefix}${baseDmg}`,
      x: spawnX,
      y: spawnY,
      color: isCrit ? '#fde047' : selectedClass === 'mage' ? '#c084fc' : selectedClass === 'assassin' ? '#34d399' : '#38bdf8',
      life: 1.0,
      scale: isCrit ? 1.3 : 1.0
    });

    // Spawn 18 flying weapon sparks
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 7 + 3;
      sparksRef.current.push({
        x: spawnX,
        y: spawnY,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 2,
        size: Math.random() * 3.5 + 2,
        color:
          Math.random() > 0.5
            ? '#fde047'
            : selectedClass === 'mage'
            ? '#a855f7'
            : selectedClass === 'assassin'
            ? '#10b981'
            : '#38bdf8',
        life: 1.0
      });
    }

    // Spawn 8 void debris particles
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 4 + 1;
      voidDebrisRef.current.push({
        x: spawnX,
        y: spawnY,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 1,
        size: Math.random() * 4 + 2,
        color: '#475569',
        life: 1.0
      });
    }
  }, [selectedClass, combo, unlockAudio]);

  // Jump to specific scene chapter
  const goToScene = useCallback(
    (targetScene) => {
      const ch = SCENE_CHAPTERS.find((c) => c.num === targetScene);
      if (ch) {
        currentTimeRef.current = ch.start;
        setCurrentTime(ch.start);
        setScene(targetScene);
      }
    },
    []
  );

  // Finish cutscene and enter dungeon
  const handleEnterDungeon = useCallback(() => {
    playSlash();
    setIsFadingOut(true);
    startAmbientDungeon();
    try {
      localStorage.setItem('parallelDungeonsIntroSeen', 'true');
    } catch (e) {}
    setTimeout(() => {
      onComplete();
    }, 850);
  }, [onComplete]);

  // Skip cutscene immediately
  const handleSkip = useCallback(() => {
    playUiClick();
    setIsFadingOut(true);
    startAmbientDungeon();
    try {
      localStorage.setItem('parallelDungeonsIntroSeen', 'true');
    } catch (e) {}
    setTimeout(() => {
      onComplete();
    }, 380);
  }, [onComplete]);

  // Synchronize playing ref
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // =========================================================================
  // MASTER TIMELINE DIRECTOR (Autonomous playback & choreography)
  // =========================================================================
  useEffect(() => {
    const directorInterval = setInterval(() => {
      if (!isPlayingRef.current) return;

      const newTime = currentTimeRef.current + 0.1;
      currentTimeRef.current = newTime;
      setCurrentTime(newTime);

      // Determine active scene from timestamp
      let activeSceneNum = 1;
      for (const ch of SCENE_CHAPTERS) {
        if (newTime >= ch.start && newTime < ch.end) {
          activeSceneNum = ch.num;
          break;
        }
      }
      if (newTime >= 22.0) activeSceneNum = 5;

      setScene(activeSceneNum);

      // Trigger scene audio transitions once per boundary
      if (newTime >= 4.5 && !lastTriggeredActionRef.current['scene_2_sound']) {
        lastTriggeredActionRef.current['scene_2_sound'] = true;
        playTorchIgnite();
      }
      if (newTime >= 9.5 && !lastTriggeredActionRef.current['scene_3_sound']) {
        lastTriggeredActionRef.current['scene_3_sound'] = true;
        playMonsterGrowl();
        setTimeout(() => playBossRoar(), 400);
      }
      if (newTime >= 15.0 && !lastTriggeredActionRef.current['scene_4_sound']) {
        lastTriggeredActionRef.current['scene_4_sound'] = true;
        playSwordDraw();
      }
      if (newTime >= 22.0 && !lastTriggeredActionRef.current['scene_5_sound']) {
        lastTriggeredActionRef.current['scene_5_sound'] = true;
        playDramaticSting();
        setGrandSlashRevealed(true);
      }

      // Autonomous Combat Strikes during Scene 4
      if (newTime >= 16.2 && !lastTriggeredActionRef.current['auto_slash_1']) {
        lastTriggeredActionRef.current['auto_slash_1'] = true;
        triggerSlash(1450, false);
      }
      if (newTime >= 17.8 && !lastTriggeredActionRef.current['auto_slash_2']) {
        lastTriggeredActionRef.current['auto_slash_2'] = true;
        triggerSlash(2280, true);
      }
      if (newTime >= 19.4 && !lastTriggeredActionRef.current['auto_slash_3']) {
        lastTriggeredActionRef.current['auto_slash_3'] = true;
        triggerSlash(3950, true);
      }
      if (newTime >= 20.8 && !lastTriggeredActionRef.current['auto_slash_4']) {
        lastTriggeredActionRef.current['auto_slash_4'] = true;
        triggerSlash(5600, true);
      }

      // Auto-Enter Countdown in Scene 5
      if (newTime >= 22.0) {
        const remaining = Math.max(0, Math.ceil(TOTAL_CUTSCENE_DURATION - newTime));
        setAutoEnterRemaining(remaining);
      }

      // Finish cutscene automatically at end of duration!
      if (newTime >= TOTAL_CUTSCENE_DURATION) {
        clearInterval(directorInterval);
        handleEnterDungeon();
      }
    }, 100);

    return () => clearInterval(directorInterval);
  }, [triggerSlash, handleEnterDungeon]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space: Slash / Attack
      if (e.code === 'Space') {
        e.preventDefault();
        triggerSlash();
      }
      // Enter: Enter Dungeon or advance
      else if (e.code === 'Enter') {
        e.preventDefault();
        if (scene >= 5) {
          handleEnterDungeon();
        } else {
          goToScene(scene + 1);
        }
      }
      // Escape: Skip Cutscene
      else if (e.code === 'Escape') {
        handleSkip();
      }
      // P: Toggle Pause / Resume
      else if (e.code === 'KeyP') {
        setIsPlaying((prev) => !prev);
      }
      // 1 to 5: Direct Jump to Scene Chapters
      else if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'].includes(e.code)) {
        const target = parseInt(e.code.replace('Digit', ''), 10);
        goToScene(target);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scene, triggerSlash, goToScene, handleEnterDungeon, handleSkip]);

  // =========================================================================
  // RICH GRAPHICS & CANVAS RENDERING ENGINE
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Supporting Visual Element 1: Atmospheric Dust & Mana Spores
    const dustParticles = Array.from({ length: 75 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.15,
      alpha: Math.random() * 0.6 + 0.25,
      color: Math.random() > 0.6 ? '#f59e0b' : Math.random() > 0.3 ? '#38bdf8' : '#e2e8f0'
    }));

    // Supporting Visual Element 2: Flickering Torch Fire & Embers
    const fireParticles = [];

    // Supporting Visual Element 3: Creeping Multi-Layer Ground Mist / Fog Waves
    const fogWavesBack = Array.from({ length: 12 }, (_, i) => ({
      x: (width / 12) * i,
      speed: Math.random() * 0.25 + 0.15,
      baseY: height - 85,
      radius: Math.random() * 60 + 90
    }));

    const fogWavesFront = Array.from({ length: 15 }, (_, i) => ({
      x: (width / 15) * i,
      speed: Math.random() * 0.45 + 0.3,
      baseY: height - 50,
      radius: Math.random() * 50 + 70
    }));

    // Supporting Visual Element 4: Fluttering Dungeon Bats in the Vault
    const bats = Array.from({ length: 5 }, (_, i) => ({
      x: -50 - i * 160,
      y: Math.random() * 120 + 30,
      speedX: Math.random() * 2.5 + 3.2,
      wingCycle: Math.random() * Math.PI,
      size: Math.random() * 4 + 7
    }));

    // Supporting Visual Element 5: Ancient Void Runes floating in Scene 1
    const ancientRunes = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      char: ['᚛', '᚜', 'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᛊ', 'ᛚ', 'ᛊ', 'ᚺ', '✦', '⚔', '🛡', '⚡'][Math.floor(Math.random() * 16)],
      speedY: -Math.random() * 0.4 - 0.15,
      alpha: Math.random() * 0.4 + 0.15,
      size: Math.floor(Math.random() * 10 + 12)
    }));

    // Supporting Visual Element 6: Hanging iron chains swaying
    const chains = [
      { xPct: 0.12, length: 130, swingOffset: 0 },
      { xPct: 0.28, length: 90, swingOffset: 1.2 },
      { xPct: 0.72, length: 105, swingOffset: 2.1 },
      { xPct: 0.88, length: 140, swingOffset: 0.7 }
    ];

    const render = () => {
      const now = Date.now();
      const time = now * 0.0035;

      ctx.save();

      // Screen shake translation
      if (screenShake > 0) {
        const ox = (Math.random() - 0.5) * screenShake;
        const oy = (Math.random() - 0.5) * screenShake;
        ctx.translate(ox, oy);
      }

      ctx.clearRect(0, 0, width, height);

      // Deep Catacomb Base Tint
      ctx.fillStyle = '#06080d';
      ctx.fillRect(0, 0, width, height);

      // =====================================================================
      // 1. GOTHIC CEILING ARCHES & HIGH VAULTING
      // =====================================================================
      ctx.strokeStyle = '#151d2c';
      ctx.lineWidth = 3;
      const archCenterX = width / 2;
      for (let r = 80; r <= 320; r += 70) {
        ctx.beginPath();
        ctx.arc(archCenterX, -40, r, 0, Math.PI);
        ctx.stroke();
      }

      // Hanging sway chains from the ceiling
      chains.forEach((ch) => {
        const cx = width * ch.xPct;
        const swing = Math.sin(time * 1.4 + ch.swingOffset) * 6;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx + swing, ch.length);
        ctx.stroke();

        // Iron chain links
        for (let y = 10; y < ch.length; y += 12) {
          const ly = y;
          const lx = cx + (swing * y) / ch.length;
          ctx.strokeRect(lx - 2.5, ly - 3, 5, 6);
        }

        // Hanging rusted iron cage / lantern at the bottom of the chain
        const endX = cx + swing;
        const endY = ch.length;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(endX - 7, endY, 14, 18);
        ctx.strokeStyle = '#475569';
        ctx.strokeRect(endX - 7, endY, 14, 18);

        // Faint glowing ember inside cage
        if (scene >= 2) {
          ctx.fillStyle = 'rgba(245, 158, 11, 0.45)';
          ctx.fillRect(endX - 3, endY + 4, 6, 8);
        }
      });

      // Fluttering Bats in the Vault (Scenes 1, 2, 3)
      if (scene <= 3) {
        ctx.fillStyle = '#1e293b';
        bats.forEach((bat) => {
          bat.x += bat.speedX;
          bat.wingCycle += 0.25;
          if (bat.x > width + 60) {
            bat.x = -60;
            bat.y = Math.random() * 120 + 30;
          }
          const wingSpan = Math.sin(bat.wingCycle) * bat.size;
          ctx.beginPath();
          ctx.moveTo(bat.x, bat.y);
          ctx.quadraticCurveTo(bat.x - bat.size, bat.y - wingSpan, bat.x - bat.size * 1.8, bat.y - wingSpan * 0.5);
          ctx.lineTo(bat.x, bat.y + 2);
          ctx.quadraticCurveTo(bat.x + bat.size, bat.y - wingSpan, bat.x + bat.size * 1.8, bat.y - wingSpan * 0.5);
          ctx.closePath();
          ctx.fill();
        });
      }

      // =====================================================================
      // --- SCENE 1: THE CATACOMBS ABYSS & ANCIENT VOID SEAL ---
      // =====================================================================
      if (scene === 1) {
        // Deep cosmic void background
        const sealX = width / 2;
        const sealY = height / 2;
        const sealPulse = Math.sin(time * 3) * 0.12 + 0.88;

        // Swirling Dark Void Vortex in the center
        const vortexGrad = ctx.createRadialGradient(sealX, sealY, 10, sealX, sealY, 220);
        vortexGrad.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
        vortexGrad.addColorStop(0.4, 'rgba(30, 27, 75, 0.45)');
        vortexGrad.addColorStop(0.8, 'rgba(14, 11, 30, 0.2)');
        vortexGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = vortexGrad;
        ctx.beginPath();
        ctx.arc(sealX, sealY, 220, 0, Math.PI * 2);
        ctx.fill();

        // Outer Tier 1: Concentric Runic Spinning Ring
        ctx.save();
        ctx.translate(sealX, sealY);
        ctx.rotate(time * 0.25);
        ctx.strokeStyle = `rgba(245, 158, 11, ${0.45 * sealPulse})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, 140, 0, Math.PI * 2);
        ctx.stroke();

        // 12 ancient rune nodes along outer ring
        for (let i = 0; i < 12; i++) {
          const ang = (i * Math.PI * 2) / 12;
          const rx = Math.cos(ang) * 140;
          const ry = Math.sin(ang) * 140;
          ctx.fillStyle = '#fde047';
          ctx.fillRect(rx - 3, ry - 3, 6, 6);
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.5)';
          ctx.strokeRect(rx - 5, ry - 5, 10, 10);
        }
        ctx.restore();

        // Middle Tier 2: Hexagram / Geometric Arcane Circle
        ctx.save();
        ctx.translate(sealX, sealY);
        ctx.rotate(-time * 0.35);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.35 * sealPulse})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, 95, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Triangle 1
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const a = (i * Math.PI * 2) / 3;
          const x = Math.cos(a) * 95;
          const y = Math.sin(a) * 95;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner Triangle 2 (Inverted Hexagram)
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const a = (i * Math.PI * 2) / 3 + Math.PI;
          const x = Math.cos(a) * 95;
          const y = Math.sin(a) * 95;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        // Glowing Core Seal
        ctx.strokeStyle = `rgba(245, 158, 11, ${0.7 * sealPulse})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(sealX, sealY, 50, 0, Math.PI * 2);
        ctx.stroke();

        // Molten golden veins cracking outward across the catacombs floor
        for (let i = 0; i < 8; i++) {
          const ang = (i * Math.PI) / 4 + Math.sin(time + i) * 0.1;
          const len = 190 + Math.sin(time * 2 + i) * 25;
          ctx.beginPath();
          ctx.moveTo(sealX, sealY);
          const midX = sealX + Math.cos(ang) * (len * 0.5) + (Math.sin(i) * 18);
          const midY = sealY + Math.sin(ang) * (len * 0.5) + (Math.cos(i) * 18);
          ctx.lineTo(midX, midY);
          ctx.lineTo(sealX + Math.cos(ang) * len, sealY + Math.sin(ang) * len);
          ctx.strokeStyle = `rgba(253, 224, 71, ${0.45 * sealPulse})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Floating ancient runes drifting up
        ancientRunes.forEach((r) => {
          ctx.save();
          ctx.font = `${r.size}px monospace`;
          ctx.fillStyle = `rgba(245, 158, 11, ${r.alpha * sealPulse})`;
          ctx.fillText(r.char, r.x, r.y);
          r.y += r.speedY;
          if (r.y < 0) r.y = height;
          ctx.restore();
        });
      }

      // =====================================================================
      // --- SCENE 2: THE EMBER & ILLUMINATED CRYPT CHAMBER ---
      // =====================================================================
      if (scene >= 2) {
        const torchX = width / 2;
        const torchY = height / 2 - 40;
        const flicker = Math.sin(now * 0.02) * 8 + Math.cos(now * 0.05) * 6;
        const radius = scene === 2 ? 260 + flicker : 420 + flicker;

        // Warm radial torch glow illuminating the stone crypt
        const radialGlow = ctx.createRadialGradient(torchX, torchY, 12, torchX, torchY, radius);
        radialGlow.addColorStop(0, 'rgba(245, 158, 11, 0.85)');
        radialGlow.addColorStop(0.35, 'rgba(217, 119, 6, 0.38)');
        radialGlow.addColorStop(0.7, 'rgba(180, 83, 9, 0.14)');
        radialGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(torchX, torchY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Spawn fire embers
        if (fireParticles.length < 50) {
          fireParticles.push({
            x: torchX + (Math.random() - 0.5) * 16,
            y: torchY + 8,
            vx: (Math.random() - 0.5) * 1.8,
            vy: -Math.random() * 2.8 - 1,
            size: Math.random() * 3.5 + 2,
            color: Math.random() > 0.5 ? '#f59e0b' : '#ef4444',
            life: 1
          });
        }

        // Draw and update fire particles
        for (let i = fireParticles.length - 1; i >= 0; i--) {
          const p = fireParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.03;
          if (p.life <= 0) {
            fireParticles.splice(i, 1);
            continue;
          }
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.globalAlpha = 1.0;
        }

        // Draw Gothic Stone Pedestal / Wall Mount & Ancient Torch Head
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(torchX - 10, torchY + 40, 20, 50); // Stone wall pillar base
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(torchX - 10, torchY + 40, 20, 50);

        // Torch iron bracket
        ctx.fillStyle = '#451a03';
        ctx.fillRect(torchX - 4, torchY + 12, 8, 30);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(torchX - 3, torchY + 14, 6, 26);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(torchX - 5, torchY - 2 + Math.sin(now * 0.04) * 2, 10, 14);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(torchX - 3, torchY - 6 + Math.sin(now * 0.05) * 3, 6, 8);
      }

      // =====================================================================
      // --- SCENES 3, 4, 5: 3D PARALLAX CORRIDOR, COLUMNS & ATMOSPHERE ---
      // =====================================================================
      if (scene >= 3) {
        const vanishingX = width / 2;
        const vanishingY = height / 2 - 30;

        // Floor perspective lines receding into catacombs
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        for (let i = -6; i <= 6; i++) {
          ctx.beginPath();
          ctx.moveTo(vanishingX, vanishingY);
          ctx.lineTo(vanishingX + i * (width * 0.18), height);
          ctx.stroke();
        }

        // Horizontal floor flagstone tiles with perspective depth
        const steps = 8;
        for (let s = 1; s <= steps; s++) {
          const y = vanishingY + Math.pow(s / steps, 2.1) * (height - vanishingY);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.strokeStyle = '#182030';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Wet reflections on flagstones
          ctx.fillStyle = 'rgba(56, 189, 248, 0.04)';
          ctx.fillRect(vanishingX - 120 * (s / steps), y - 2, 240 * (s / steps), 4);
        }

        // Left & Right Massive Gothic Stone Pillars
        const pillarWidth = width * 0.19;
        ctx.fillStyle = '#0b1120';
        ctx.fillRect(0, 0, pillarWidth, height);
        ctx.fillRect(width - pillarWidth, 0, pillarWidth, height);

        // Stone Brick Carvings & Moss Highlights
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        for (let y = 0; y < height; y += 46) {
          ctx.strokeRect(0, y, pillarWidth, 46);
          ctx.strokeRect(width - pillarWidth, y, pillarWidth, 46);

          // Emerald moss growth on dark stone
          ctx.fillStyle = '#064e3b';
          ctx.fillRect(pillarWidth - 10, y + 36, 7, 5);
          ctx.fillRect(width - pillarWidth + 3, y + 18, 7, 5);
        }

        // Ancient Wall Sconces with dynamic flickering flames
        const leftTorchX = pillarWidth - 14;
        const rightTorchX = width - pillarWidth + 14;
        const wallTorchY = height * 0.42;

        [leftTorchX, rightTorchX].forEach((tx) => {
          ctx.fillStyle = '#451a03';
          ctx.fillRect(tx - 3, wallTorchY, 6, 22);
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(tx - 4, wallTorchY - 8 + Math.sin(time * 8) * 2, 8, 10);
          ctx.fillStyle = '#fde047';
          ctx.fillRect(tx - 2, wallTorchY - 12 + Math.sin(time * 10) * 3, 4, 6);

          // Warm ambient aura around wall sconces
          const sconceGlow = ctx.createRadialGradient(tx, wallTorchY - 4, 2, tx, wallTorchY - 4, 55);
          sconceGlow.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
          sconceGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = sconceGlow;
          ctx.beginPath();
          ctx.arc(tx, wallTorchY - 4, 55, 0, Math.PI * 2);
          ctx.fill();
        });

        // Atmospheric God Rays from high ceiling grates
        ctx.save();
        ctx.fillStyle = 'rgba(251, 191, 36, 0.035)';
        ctx.beginPath();
        ctx.moveTo(width * 0.28, 0);
        ctx.lineTo(width * 0.38, 0);
        ctx.lineTo(width * 0.65, height);
        ctx.lineTo(width * 0.45, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Forgotten Rusted Sword stuck in stone alcove (Left Pillar base)
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(pillarWidth - 18, height - 110, 4, 30);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(pillarWidth - 23, height - 102, 14, 4);

        // Ancient Skull embedded in stone alcove (Right Pillar base)
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(width - pillarWidth + 18, height - 90, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(width - pillarWidth + 15, height - 91, 2.5, 3);
        ctx.fillRect(width - pillarWidth + 19, height - 91, 2.5, 3);

        // --- SCENE 3: THE LURKING VOID WARDEN (LEVEL 50 BOSS) ---
        if (scene === 3) {
          drawVoidWarden(ctx, vanishingX, vanishingY + 30, time);
        }

        // Creeping Floor Mist / Back Fog Layer
        ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
        fogWavesBack.forEach((fw) => {
          fw.x += fw.speed;
          if (fw.x > width + 100) fw.x = -100;
          ctx.beginPath();
          ctx.arc(fw.x, fw.baseY + Math.sin(time * 2 + fw.x * 0.01) * 8, fw.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Creeping Floor Mist / Front Fog Layer
        ctx.fillStyle = 'rgba(30, 41, 59, 0.25)';
        fogWavesFront.forEach((fw) => {
          fw.x += fw.speed;
          if (fw.x > width + 80) fw.x = -80;
          ctx.beginPath();
          ctx.arc(fw.x, fw.baseY + Math.sin(time * 2.5 + fw.x * 0.015) * 6, fw.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // =====================================================================
      // --- SCENE 4 & 5: CINEMATIC CHAMPION & SHADOW MINIONS BATTLE ---
      // =====================================================================
      if (scene >= 4) {
        const kx = width / 2;
        const targetKy = scene === 4 ? height / 2 + 55 : height / 2 + 95;
        const knightScale = scene === 4 ? 3.1 : 3.5;

        // Render Active Shadow Minions (Scene 4)
        if (scene === 4) {
          minionStatesRef.current.forEach((m) => {
            if (m.isDead) return;
            const minionX = kx + m.xOffset * (knightScale / 3.2);
            const minionY = targetKy - 15;
            const isMinionHit = now - m.hitTimer < 240;
            drawShadowMinion(ctx, minionX, minionY, knightScale * 0.65, time, isMinionHit);
          });
        }

        // Render Hero Champion with Class Model
        drawCinematicChampion(
          ctx,
          kx,
          targetKy,
          knightScale,
          time,
          scene,
          selectedClass,
          isSlashing
        );
      }

      // =====================================================================
      // --- SCENE 5 GRAND SLASH PARTICLES & SWEEPING ARC ---
      // =====================================================================
      if (scene === 5 && grandSlashRevealed) {
        // Triumphant Golden/Cyan Arc Slash across the screen
        ctx.save();
        const slashProgress = Math.min(1, (currentTime - 22.0) * 1.5);
        if (slashProgress < 1) {
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 12 * (1 - slashProgress);
          ctx.beginPath();
          ctx.moveTo(width * 0.15, height * 0.25);
          ctx.lineTo(width * (0.15 + 0.7 * slashProgress), height * (0.25 + 0.5 * slashProgress));
          ctx.stroke();

          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 6 * (1 - slashProgress);
          ctx.stroke();
        }
        ctx.restore();
      }

      // =====================================================================
      // FLOATING PARTICLES & FX LAYERS
      // =====================================================================

      // Floating dungeon dust motes & mana particles
      dustParticles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      });
      ctx.globalAlpha = 1.0;

      // Render Floating Damage Numbers
      for (let i = damagePopupsRef.current.length - 1; i >= 0; i--) {
        const dp = damagePopupsRef.current[i];
        dp.y -= 1.5;
        dp.life -= 0.022;

        if (dp.life <= 0) {
          damagePopupsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.font = `bold ${Math.round(13 * dp.scale)}px monospace`;
        ctx.fillStyle = dp.color;
        ctx.globalAlpha = Math.min(1, dp.life * 1.5);
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 6;
        ctx.fillText(dp.text, dp.x, dp.y);
        ctx.restore();
      }

      // Render Flying Weapon Sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const sp = sparksRef.current[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.25; // gravity
        sp.life -= 0.038;

        if (sp.life <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.life;
        ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
        ctx.globalAlpha = 1.0;
      }

      // Render Void Debris
      for (let i = voidDebrisRef.current.length - 1; i >= 0; i--) {
        const d = voidDebrisRef.current[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.35;
        d.life -= 0.045;

        if (d.life <= 0) {
          voidDebrisRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.life;
        ctx.fillRect(d.x, d.y, d.size, d.size);
        ctx.globalAlpha = 1.0;
      }

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [scene, selectedClass, isSlashing, screenShake, currentTime, grandSlashRevealed]);

  // --- DRAW THE VOID WARDEN (SCENE 3) ---
  function drawVoidWarden(ctx, vx, vy, time) {
    ctx.save();
    ctx.translate(vx, vy);

    const breathe = Math.sin(time * 3) * 6;
    const wardenScale = 1.85;

    // Menacing Dark Purple Void Miasma Aura
    const auraPulse = Math.sin(time * 4) * 0.2 + 0.8;
    const auraGrad = ctx.createRadialGradient(0, -30, 20, 0, -30, 150 * wardenScale);
    auraGrad.addColorStop(0, `rgba(88, 28, 135, ${0.7 * auraPulse})`);
    auraGrad.addColorStop(0.5, `rgba(30, 27, 75, ${0.4 * auraPulse})`);
    auraGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, -30, 150 * wardenScale, 0, Math.PI * 2);
    ctx.fill();

    // Colossal Horned Silhouette
    ctx.fillStyle = '#080410';

    // Massive Spiked Shoulders
    ctx.beginPath();
    ctx.moveTo(-70 * wardenScale, 20 + breathe);
    ctx.lineTo(-90 * wardenScale, -30 + breathe);
    ctx.lineTo(-50 * wardenScale, -45 + breathe);
    ctx.lineTo(0, -35 + breathe);
    ctx.lineTo(50 * wardenScale, -45 + breathe);
    ctx.lineTo(90 * wardenScale, -30 + breathe);
    ctx.lineTo(70 * wardenScale, 20 + breathe);
    ctx.closePath();
    ctx.fill();

    // Left Demon Horn
    ctx.beginPath();
    ctx.moveTo(-35 * wardenScale, -45 + breathe);
    ctx.quadraticCurveTo(-65 * wardenScale, -95 + breathe, -95 * wardenScale, -80 + breathe);
    ctx.lineTo(-75 * wardenScale, -65 + breathe);
    ctx.quadraticCurveTo(-50 * wardenScale, -75 + breathe, -25 * wardenScale, -45 + breathe);
    ctx.closePath();
    ctx.fill();

    // Right Demon Horn
    ctx.beginPath();
    ctx.moveTo(35 * wardenScale, -45 + breathe);
    ctx.quadraticCurveTo(65 * wardenScale, -95 + breathe, 95 * wardenScale, -80 + breathe);
    ctx.lineTo(75 * wardenScale, -65 + breathe);
    ctx.quadraticCurveTo(50 * wardenScale, -75 + breathe, 25 * wardenScale, -45 + breathe);
    ctx.closePath();
    ctx.fill();

    // Pulsing Fiery Crimson Demon Eyes
    const eyeGlow = Math.sin(time * 5) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(239, 68, 68, ${eyeGlow})`;
    ctx.fillRect(-22 * wardenScale, -40 + breathe, 14 * wardenScale, 5 * wardenScale);
    ctx.fillRect(8 * wardenScale, -40 + breathe, 14 * wardenScale, 5 * wardenScale);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-17 * wardenScale, -39 + breathe, 5 * wardenScale, 3 * wardenScale);
    ctx.fillRect(12 * wardenScale, -39 + breathe, 5 * wardenScale, 3 * wardenScale);

    // Glowing Ethereal Runic Chains Binding the Warden (Shattering effect)
    ctx.strokeStyle = `rgba(168, 85, 247, ${0.5 * auraPulse})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-90 * wardenScale, -30 + breathe);
    ctx.lineTo(-140 * wardenScale, 60);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(90 * wardenScale, -30 + breathe);
    ctx.lineTo(140 * wardenScale, 60);
    ctx.stroke();

    ctx.restore();
  }

  // --- DRAW SHADOW MINION (SCENE 4) ---
  function drawShadowMinion(ctx, mx, my, s, time, isHit) {
    ctx.save();
    ctx.translate(mx, my);

    if (isHit) {
      ctx.translate(14, -8);
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = '#0f172a';
    }

    const bob = Math.sin(time * 6) * (2 * s);

    // Minion Body & Ragged Cloak
    ctx.beginPath();
    ctx.moveTo(-10 * s, -15 * s + bob);
    ctx.lineTo(10 * s, -15 * s + bob);
    ctx.lineTo(14 * s, 15 * s);
    ctx.lineTo(-14 * s, 15 * s);
    ctx.closePath();
    ctx.fill();

    // Spiky Claws
    ctx.fillStyle = isHit ? '#ffffff' : '#1e293b';
    ctx.fillRect(-15 * s, -6 * s + bob, 5 * s, 12 * s);
    ctx.fillRect(10 * s, -6 * s + bob, 5 * s, 12 * s);

    // Horned Minion Head
    ctx.fillRect(-7 * s, -22 * s + bob, 14 * s, 9 * s);

    // Evil Glowing Eyes (Yellow/Red)
    if (!isHit) {
      ctx.fillStyle = '#eab308';
      ctx.fillRect(-5 * s, -19 * s + bob, 3 * s, 2 * s);
      ctx.fillRect(2 * s, -19 * s + bob, 3 * s, 2 * s);
    }

    // Shadow Floor Puddle
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(0, 16 * s, 16 * s, 5 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- MASTER CINEMATIC CHAMPION DRAWING ---
  function drawCinematicChampion(ctx, cx, cy, scale, time, currentScene, role, isAttacking) {
    ctx.save();
    ctx.translate(cx, cy);

    // Soft Realistic Contact Shadow on Stone
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.beginPath();
    ctx.ellipse(0, 36 * scale * 0.45, 26 * scale, 8 * scale * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Arcane Floor Ward Circle (Glows & Spins Under Hero)
    const wardPulse = Math.sin(time * 3) * 0.15 + 0.85;
    const wardRadius = 30 * scale;
    const wardColor =
      role === 'mage'
        ? 'rgba(168, 85, 247, '
        : role === 'assassin'
        ? 'rgba(16, 185, 129, '
        : 'rgba(56, 189, 248, ';

    // Outer spinning ward ring
    ctx.strokeStyle = wardColor + 0.55 * wardPulse + ')';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 36 * scale * 0.45, wardRadius, wardRadius * 0.38, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Inner rune ticks
    const tickCount = 8;
    for (let i = 0; i < tickCount; i++) {
      const angle = time * 0.5 + (i * Math.PI * 2) / tickCount;
      const rx = Math.cos(angle) * wardRadius;
      const ry = 36 * scale * 0.45 + Math.sin(angle) * (wardRadius * 0.38);
      ctx.fillStyle = role === 'mage' ? '#c084fc' : role === 'assassin' ? '#34d399' : '#38bdf8';
      ctx.fillRect(rx - 2, ry - 2, 4, 3);
    }

    // Draw Selected Hero Model
    if (role === 'mage') {
      drawCinematicMage(ctx, scale, time, currentScene, isAttacking);
    } else if (role === 'assassin') {
      drawCinematicAssassin(ctx, scale, time, currentScene, isAttacking);
    } else {
      drawCinematicKnight(ctx, scale, time, currentScene, isAttacking);
    }

    // Dynamic Attack Slash Wave FX
    if (isAttacking) {
      ctx.save();
      const slashColor = role === 'mage' ? '#c084fc' : role === 'assassin' ? '#34d399' : '#38bdf8';
      ctx.strokeStyle = slashColor;
      ctx.lineWidth = 8 * scale * 0.4;
      ctx.beginPath();
      ctx.arc(10 * scale, -5 * scale, 36 * scale, -0.6, 1.2);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5 * scale * 0.4;
      ctx.beginPath();
      ctx.arc(10 * scale, -5 * scale, 36 * scale, -0.4, 1.0);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  // --- 1. DETAILED CINEMATIC KNIGHT ---
  function drawCinematicKnight(ctx, s, time, currentScene, isAttacking) {
    const isWalking = currentScene === 4;
    const walkBob = isWalking ? Math.sin(time * 6) * (3.5 * s) : Math.sin(time * 2.5) * (1.2 * s);
    const legStride = isWalking ? Math.sin(time * 6) * (5 * s) : 0;
    const capeWave = Math.sin(time * 3.5) * (4 * s);

    // Flowing Crimson Cape
    ctx.fillStyle = '#450a0a';
    ctx.beginPath();
    ctx.moveTo(-10 * s, -6 * s + walkBob);
    ctx.quadraticCurveTo(-18 * s - capeWave, 10 * s, -14 * s - capeWave * 0.8, 28 * s);
    ctx.lineTo(14 * s + capeWave * 0.8, 28 * s);
    ctx.quadraticCurveTo(18 * s + capeWave, 10 * s, 10 * s, -6 * s + walkBob);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(-8 * s, -4 * s + walkBob);
    ctx.quadraticCurveTo(-15 * s - capeWave * 0.8, 12 * s, -11 * s - capeWave * 0.6, 26 * s);
    ctx.lineTo(11 * s + capeWave * 0.6, 26 * s);
    ctx.quadraticCurveTo(15 * s + capeWave * 0.8, 12 * s, 8 * s, -4 * s + walkBob);
    ctx.closePath();
    ctx.fill();

    // Greaves & Legs
    const leftLegX = -7 * s + legStride * 0.6;
    const leftLegY = 12 * s + (isWalking ? Math.abs(legStride) * 0.4 : 0);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(leftLegX - 2 * s, leftLegY, 5 * s, 12 * s);
    ctx.fillStyle = '#475569';
    ctx.fillRect(leftLegX - 3 * s, leftLegY + 10 * s, 6 * s, 4 * s);

    const rightLegX = 7 * s - legStride * 0.6;
    const rightLegY = 12 * s + (isWalking ? Math.abs(legStride) * 0.4 : 0);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(rightLegX - 3 * s, rightLegY, 5 * s, 12 * s);
    ctx.fillStyle = '#475569';
    ctx.fillRect(rightLegX - 3 * s, rightLegY + 10 * s, 6 * s, 4 * s);

    // Waist & Belt
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-8 * s, 6 * s + walkBob, 16 * s, 7 * s);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-8 * s, 4 * s + walkBob, 16 * s, 3 * s);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-2.5 * s, 3.5 * s + walkBob, 5 * s, 4 * s);

    // Steel Cuirass (Chestplate)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-8 * s, -8 * s + walkBob, 16 * s, 13 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-7 * s, -7 * s + walkBob, 14 * s, 11 * s);

    // Golden Rune Cross on Chest
    const runeGlow = Math.sin(time * 4) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(245, 158, 11, ${runeGlow})`;
    ctx.fillRect(-1.5 * s, -4 * s + walkBob, 3 * s, 7 * s);
    ctx.fillRect(-4.5 * s, -2 * s + walkBob, 9 * s, 3 * s);

    // Pauldrons
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-13 * s, -8 * s + walkBob, 6 * s, 8 * s);
    ctx.fillRect(7 * s, -8 * s + walkBob, 6 * s, 8 * s);

    // Kite Shield on Left Arm
    const shieldX = -13 * s;
    const shieldY = -2 * s + walkBob;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(shieldX - 2 * s, shieldY, 8 * s, 16 * s);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(shieldX, shieldY + 2 * s, 4 * s, 12 * s);

    // Great-Helm & Flowing Red Plume
    const headY = -20 * s + walkBob;
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(0, headY - 4 * s);
    ctx.quadraticCurveTo(-14 * s - capeWave, headY - 14 * s, -18 * s - capeWave * 1.2, headY - 2 * s);
    ctx.lineTo(-12 * s - capeWave * 0.8, headY - 2 * s);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-7 * s, headY, 14 * s, 12 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-6.5 * s, headY + 0.5 * s, 13 * s, 11 * s);
    ctx.fillStyle = '#080a10';
    ctx.fillRect(-6 * s, headY + 5.5 * s, 12 * s, 4 * s);

    // Glowing Cyan Visor Eyes
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(-4 * s, headY + 6.5 * s, 3.5 * s, 2 * s);
    ctx.fillRect(0.5 * s, headY + 6.5 * s, 3.5 * s, 2 * s);

    // Legendary Greatsword (Right Arm)
    ctx.save();
    const swordBaseX = 10 * s;
    const swordBaseY = 4 * s + walkBob;
    ctx.translate(swordBaseX, swordBaseY);

    const swordAngle = isAttacking ? 1.4 : -0.35 + Math.sin(time * 2) * 0.05;
    ctx.rotate(swordAngle);

    // Greatsword steel blade
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, -3.5 * s, 36 * s, 7 * s);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(1.5 * s, -2.5 * s, 33 * s, 5 * s);

    // Glowing cyan fuller runes
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(4 * s, -0.8 * s, 26 * s, 1.6 * s);

    // Crossguard
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-2 * s, -7 * s, 4 * s, 14 * s);

    ctx.restore();
  }

  // --- 2. DETAILED CINEMATIC MAGE ---
  function drawCinematicMage(ctx, s, time, currentScene, isAttacking) {
    const bob = Math.sin(time * 3) * (2 * s);

    // Astral Robes
    ctx.fillStyle = '#2e1065';
    ctx.beginPath();
    ctx.moveTo(-10 * s, -4 * s + bob);
    ctx.quadraticCurveTo(-18 * s, 14 * s, -15 * s, 26 * s);
    ctx.lineTo(15 * s, 26 * s);
    ctx.quadraticCurveTo(18 * s, 14 * s, 10 * s, -4 * s + bob);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#581c87';
    ctx.fillRect(-8 * s, -6 * s + bob, 16 * s, 30 * s);
    ctx.fillStyle = '#9333ea';
    ctx.fillRect(-6 * s, -4 * s + bob, 12 * s, 26 * s);

    // Deep Mystic Hood & Glowing Purple Eyes
    const headY = -18 * s + bob;
    ctx.fillStyle = '#3b0764';
    ctx.beginPath();
    ctx.moveTo(0, headY - 6 * s);
    ctx.lineTo(-8 * s, headY + 8 * s);
    ctx.lineTo(8 * s, headY + 8 * s);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#05030a';
    ctx.fillRect(-5 * s, headY + 1 * s, 10 * s, 6 * s);
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(-3 * s, headY + 3 * s, 2 * s, 2 * s);
    ctx.fillRect(1 * s, headY + 3 * s, 2 * s, 2 * s);

    // Arcane Staff with Floating Mana Crystal
    ctx.fillStyle = '#78350f';
    ctx.fillRect(12 * s, -24 * s + bob, 3 * s, 48 * s);

    const crystalFloat = Math.sin(time * 5) * 3;
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.moveTo(13.5 * s, -30 * s + bob + crystalFloat);
    ctx.lineTo(10 * s, -24 * s + bob + crystalFloat);
    ctx.lineTo(13.5 * s, -18 * s + bob + crystalFloat);
    ctx.lineTo(17 * s, -24 * s + bob + crystalFloat);
    ctx.closePath();
    ctx.fill();
  }

  // --- 3. DETAILED CINEMATIC ASSASSIN ---
  function drawCinematicAssassin(ctx, s, time, currentScene, isAttacking) {
    const bob = Math.sin(time * 3.5) * (1.8 * s);

    // Dark Shadow Cloak
    ctx.fillStyle = '#022c22';
    ctx.beginPath();
    ctx.moveTo(-9 * s, -5 * s + bob);
    ctx.quadraticCurveTo(-16 * s, 12 * s, -12 * s, 25 * s);
    ctx.lineTo(12 * s, 25 * s);
    ctx.quadraticCurveTo(16 * s, 12 * s, 9 * s, -5 * s + bob);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#064e3b';
    ctx.fillRect(-7 * s, -5 * s + bob, 14 * s, 20 * s);

    const headY = -16 * s + bob;
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(-6 * s, headY, 12 * s, 10 * s);
    ctx.fillStyle = '#022c22';
    ctx.fillRect(-5 * s, headY + 4 * s, 10 * s, 6 * s);

    // Venom green eyes
    ctx.fillStyle = '#34d399';
    ctx.fillRect(-4 * s, headY + 3 * s, 3 * s, 1.5 * s);
    ctx.fillRect(1 * s, headY + 3 * s, 3 * s, 1.5 * s);

    // Dual Poison Daggers
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-13 * s, 2 * s + bob, 3 * s, 12 * s);
    ctx.fillRect(10 * s, 2 * s + bob, 3 * s, 12 * s);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(-12 * s, 4 * s + bob, 1.5 * s, 8 * s);
    ctx.fillRect(11 * s, 4 * s + bob, 1.5 * s, 8 * s);
  }

  // Current progress percentage (0 - 100)
  const progressPercent = Math.min(100, Math.max(0, (currentTime / TOTAL_CUTSCENE_DURATION) * 100));

  return (
    <div
      onClick={() => triggerSlash()}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#080a0f] text-white transition-opacity duration-700 select-none overflow-hidden cursor-crosshair ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pixelated" />

      {/* Screen Flash Overlay on Heavy Hit */}
      {screenFlash && (
        <div
          className={`absolute inset-0 pointer-events-none z-30 transition-opacity duration-150 ${
            screenFlash === 'purple'
              ? 'bg-[#a855f7]/25'
              : screenFlash === 'emerald'
              ? 'bg-[#10b981]/25'
              : 'bg-[#fde047]/30'
          }`}
        />
      )}

      {/* ========================================================================= */}
      {/* TOP CINEMASCOPE LETTERBOX BAR */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full h-14 md:h-16 bg-[#040609]/95 border-b border-[#1e293b] flex items-center justify-between px-4 sm:px-8 select-none backdrop-blur-sm">
        {/* Left Badge: Cinematic Mode Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-[#f59e0b] rotate-45 animate-pulse" />
          <span className="font-pixel text-[8.5px] sm:text-[10px] text-[#e2e8f0] tracking-widest uppercase">
            PARALLEL-CINEMATICS // PROLOGUE
          </span>
          <span className="inline-block px-1.5 py-0.5 bg-[#0f172a] text-[#38bdf8] font-mono text-[9px] border border-[#3b4b66]">
            AUTO-PLAY
          </span>
        </div>

        {/* Center: Audio & Playback Status */}
        <div className="hidden md:flex items-center gap-3 text-center">
          {audioUnlocked ? (
            <div className="flex items-center gap-1.5 text-[#38bdf8] font-pixel text-[8.5px] tracking-widest">
              <span>🔊 STEREO SYNTH</span>
              {/* Sound wave visualizer bars */}
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-1 bg-[#38bdf8] h-3 animate-pulse" />
                <span className="w-1 bg-[#38bdf8] h-2 animate-bounce" />
                <span className="w-1 bg-[#38bdf8] h-3.5 animate-pulse" />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                unlockAudio();
              }}
              className="px-2 py-0.5 bg-[#b45309]/80 border border-[#fde047] text-[#fde047] font-pixel text-[8px] tracking-wider animate-pulse hover:bg-[#d97706] transition-all cursor-pointer"
            >
              🔇 KLIK UNTUK AKTIFKAN SUARA
            </button>
          )}
        </div>

        {/* Right Action Controls: Play/Pause, Unmute & Skip */}
        <div className="flex items-center gap-2">
          {/* Play / Pause Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playUiClick();
              setIsPlaying((prev) => !prev);
            }}
            onMouseEnter={playUiHover}
            className="px-2.5 py-1 bg-[#182030]/90 border border-[#3b4b66] text-[#cbd5e1] font-pixel text-[8px] tracking-wider hover:border-[#f8fafc] hover:text-white transition-all cursor-pointer"
            title="Pause / Play Cinematic"
          >
            {isPlaying ? '⏸ PAUSE' : '▶ RESUME'}
          </button>

          {/* Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            onMouseEnter={playUiHover}
            className="px-3 py-1 bg-[#182030]/90 border border-[#3b4b66] text-[#cbd5e1] font-pixel text-[8.5px] tracking-widest hover:border-[#f59e0b] hover:text-[#fde047] transition-all cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          >
            LEWATI [ESC] ⏭
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTER NARRATIVE DISPLAY ACCORDING TO SCENE */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center justify-center max-w-3xl px-6 text-center my-auto pointer-events-none">
        {/* SCENE 1: THE ABYSS */}
        {scene === 1 && (
          <div className="animate-fade-in flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#090d16]/80 border border-[#38bdf8]/40 mb-3 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="w-1.5 h-1.5 bg-[#38bdf8] rotate-45" />
              <span className="font-pixel text-[9px] sm:text-[10px] text-[#38bdf8] tracking-widest uppercase">
                BAB I : KEBANGKITAN RETAKAN KEGELAPAN
              </span>
              <span className="w-1.5 h-1.5 bg-[#38bdf8] rotate-45" />
            </div>

            <h1 className="font-pixel text-xl sm:text-3xl text-[#f8fafc] tracking-widest leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
              THE DUNGEON REMEMBERS...
            </h1>
            <p className="font-outfit text-sm sm:text-base text-[#94a3b8] mt-3 tracking-wider max-w-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Di kedalaman 50 lantai Catacombs purba, segel kuno mulai retak. Energi hampa yang terkunci ribuan tahun kini bergetar kembali.
            </p>
          </div>
        )}

        {/* SCENE 2: THE EMBER */}
        {scene === 2 && (
          <div className="animate-fade-in flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#090d16]/80 border border-[#f59e0b]/40 mb-3 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <span className="w-1.5 h-1.5 bg-[#f59e0b] rotate-45" />
              <span className="font-pixel text-[9px] sm:text-[10px] text-[#f59e0b] tracking-widest uppercase">
                BAB II : KILATAN CAHAYA PERTAMA
              </span>
              <span className="w-1.5 h-1.5 bg-[#f59e0b] rotate-45" />
            </div>

            <h2 className="font-pixel text-base sm:text-2xl text-[#fef08a] tracking-widest leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
              A SINGLE EMBER PIERCES THE SHADOWS
            </h2>
            <p className="font-outfit text-sm sm:text-base text-[#cbd5e1] mt-3 tracking-wider max-w-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Sebuah obor kuno membakar kesunyian. Lorong batu berpilar terungkap, membimbing langkah sang penakluk menuju lorong terlarang.
            </p>
          </div>
        )}

        {/* SCENE 3: THE WARDEN */}
        {scene === 3 && (
          <div className="animate-fade-in flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#450a0a]/90 border border-[#ef4444] mb-2 shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse">
              <span className="font-pixel text-[9px] sm:text-[10.5px] text-[#fecaca] tracking-widest uppercase">
                ⚠️ PERINGATAN: LEVEL 50 VOID WARDEN TERDETEKSI
              </span>
            </div>

            <h2 className="font-pixel text-lg sm:text-3xl text-[#f8fafc] tracking-widest drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]">
              THE WARDEN OF THE VOID AWAKENS
            </h2>
            <p className="font-outfit text-sm sm:text-base text-[#c084fc] mt-2.5 tracking-wider max-w-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Rantai segel hancur. Entitas kuno penguasa kegelapan bangkit menuntut jiwa siapa pun yang berani melangkah lebih dalam.
            </p>
          </div>
        )}

        {/* SCENE 4: THE STRIKE (Autonomous Combat Display) */}
        {scene === 4 && (
          <div className="animate-fade-in flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0f172a]/90 border border-[#38bdf8] mb-2 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <span className="font-pixel text-[9px] sm:text-[10px] text-[#38bdf8] tracking-widest uppercase">
                BAB IV : BILAH CAHAYA MENEBAS
              </span>
            </div>

            <h2 className="font-pixel text-base sm:text-2xl text-[#fde047] tracking-widest drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] mb-2">
              A CHAMPION ENGAGES THE SWARM!
            </h2>

            <p className="font-outfit text-xs sm:text-sm text-[#cbd5e1] max-w-md tracking-wider mb-2">
              Sang ksatria menebas bayangan kegelapan dengan rentetan serangan pedang sakti!
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#090d16]/80 border border-[#f59e0b]/50 text-[#fde047] font-pixel text-[8px] sm:text-[9px] tracking-widest">
              [ SERANGAN OTOMATIS BERLANGSUNG • KLIK UNTUK SERANGAN TAMBAHAN ]
            </div>
          </div>
        )}

        {/* SCENE 5: PARALLEL DUNGEONS GRAND TITLE (PURE CINEMATIC FINALE) */}
        {scene >= 5 && (
          <div className="flex flex-col items-center animate-fade-in pointer-events-none w-full max-w-2xl text-center">
            {/* Crest & Title Header */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1 bg-[#090d16]/85 border border-[#f59e0b]/40 mb-3 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <span className="w-2 h-2 bg-[#f59e0b] rotate-45" />
              <span className="font-pixel text-[9px] sm:text-[10.5px] text-[#f59e0b] tracking-widest uppercase">
                ✦ 50 FLOORS OF CATACOMBS ✦
              </span>
              <span className="w-2 h-2 bg-[#f59e0b] rotate-45" />
            </div>

            <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-[#f8fafc] tracking-wider sm:tracking-widest my-2 drop-shadow-[0_0_40px_rgba(245,158,11,0.8)] animate-pulse">
              PARALLEL DUNGEONS
            </h1>

            <div className="flex items-center gap-3 my-2">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#f59e0b]" />
              <span className="font-pixel text-[10px] sm:text-xs text-[#fde047] tracking-[0.25em] uppercase">
                DARK FANTASY ARPG
              </span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#f59e0b]" />
            </div>

            <p className="font-outfit text-sm sm:text-base text-[#cbd5e1] max-w-lg tracking-wider mt-2 mb-6 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Kutukan kegelapan menanti untuk dipecahkan. Gerbang purba telah terbuka, menyambut langkah sang penakluk.
            </p>

            {/* Seamless Auto-Launch Progress Bar */}
            <div className="flex flex-col items-center gap-2 w-full max-w-xs">
              <div className="w-full bg-[#1e293b]/90 border border-[#3b4b66] p-0.5 relative overflow-hidden rounded-xs">
                <div
                  className="h-1.5 bg-gradient-to-r from-[#f59e0b] via-[#fde047] to-[#38bdf8] transition-all duration-100"
                  style={{
                    width: `${Math.min(100, Math.max(0, ((currentTime - 22.0) / (TOTAL_CUTSCENE_DURATION - 22.0)) * 100))}%`
                  }}
                />
              </div>

              <span className="font-pixel text-[8.5px] sm:text-[9.5px] text-[#fde047] tracking-widest animate-pulse mt-1">
                MEMASUKI DUNGEON... {autoEnterRemaining}s
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic In-Cutscene Combo Meter HUD */}
      {combo > 0 && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-bounce">
          <div className="px-4 py-1.5 bg-[#090d16]/90 border-2 border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-2">
            <span className="font-pixel text-xs sm:text-sm text-[#fde047] tracking-widest">
              COMBO x{combo}!
            </span>
            <span className="font-pixel text-[8px] text-[#38bdf8]">
              {combo >= 8 ? 'GODLIKE' : combo >= 4 ? 'ARC RAGE' : 'STRIKE'}
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM CINEMASCOPE LETTERBOX BAR (CLEAN MOVIE PRESENTATION - NO BUTTONS) */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full bg-[#040609]/95 border-t border-[#1e293b]/60 flex flex-col justify-between select-none backdrop-blur-sm">
        {/* Continuous Movie Timeline Progress Line */}
        <div className="w-full bg-[#0b101b] h-1 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#38bdf8] via-[#f59e0b] to-[#fde047] transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between px-6 py-3 text-[#64748b] font-pixel text-[8px] sm:text-[9px] tracking-widest">
          {/* Active Chapter Label Display (Pure text, no button) */}
          <div className="flex items-center gap-2 text-[#94a3b8]">
            <span className="w-1.5 h-1.5 bg-[#f59e0b] rotate-45" />
            <span>
              {SCENE_CHAPTERS.find((ch) => ch.num === scene)?.label || 'PARALLEL DUNGEONS'}
            </span>
          </div>

          {/* Timecode & Subtle Hint */}
          <div className="flex items-center gap-4 text-[#64748b]">
            <span className="text-[#38bdf8] font-mono text-[9px]">
              {Math.floor(currentTime / 60)
                .toString()
                .padStart(2, '0')}
              :
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, '0')}{' '}
              / 00:28
            </span>
            <span className="hidden sm:inline text-[#475569]">[ESC] LEWATI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpeningCutscene;
