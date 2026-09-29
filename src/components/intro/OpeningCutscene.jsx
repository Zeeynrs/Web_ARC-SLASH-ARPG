import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PixelButton } from '../ui/PixelButton';
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

// Class definitions with rich RPG lore and signature abilities
const HERO_CLASSES = [
  {
    id: 'knight',
    name: 'KNIGHT',
    title: 'THE PALADIN VANGUARD',
    icon: '⚔️',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    accent: '#fde047',
    skill: 'ARC CLEAVE',
    desc: 'Master of enchanted steel and divine barriers. Cleaves darkness with devastating arc waves.',
    stats: { atk: 85, def: 95, spd: 60 }
  },
  {
    id: 'mage',
    name: 'MAGE',
    title: 'THE VOID ARCANIST',
    icon: '🔮',
    color: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.45)',
    accent: '#e9d5ff',
    skill: 'VOID SINGULARITY',
    desc: 'Wields unstable abyssal mana. Rips reality apart with cosmic rifts and arcane nova.',
    stats: { atk: 100, def: 45, spd: 70 }
  },
  {
    id: 'assassin',
    name: 'ASSASSIN',
    title: 'THE SHADOW PHANTOM',
    icon: '🗡️',
    color: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    accent: '#6ee7b7',
    skill: 'VENOM FLURRY',
    desc: 'Silent executioner cloaked in night. Strikes vital runes with lethal poison daggers.',
    stats: { atk: 92, def: 50, spd: 100 }
  }
];

// 5 Cinematic Chapters
const SCENE_CHAPTERS = [
  { num: 1, label: 'I. THE ABYSS', time: '00:00' },
  { num: 2, label: 'II. THE EMBER', time: '00:03' },
  { num: 3, label: 'III. THE WARDEN', time: '00:07' },
  { num: 4, label: 'IV. THE STRIKE', time: '00:11' },
  { num: 5, label: 'V. ARC SLASH', time: '00:15' }
];

export function OpeningCutscene({ onComplete }) {
  // Scene State: 1 (Abyss), 2 (Ember Torch), 3 (Warden Awakening), 4 (Champion Strike), 5 (Title & Enter)
  const [scene, setScene] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [selectedClass, setSelectedClass] = useState('knight');
  const [isSlashing, setIsSlashing] = useState(false);
  const [combo, setCombo] = useState(0);
  const [screenShake, setScreenShake] = useState(0);
  const [screenFlash, setScreenFlash] = useState(null); // 'gold', 'cyan', 'purple', 'crimson'
  const [autoAdvance, setAutoAdvance] = useState(true);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const comboTimeoutRef = useRef(null);
  const lastSlashTimeRef = useRef(0);
  const damagePopupsRef = useRef([]);
  const sparksRef = useRef([]);

  // Unlock Web Audio context safely
  const unlockAudio = useCallback(() => {
    try {
      startAmbientDungeon();
      setAudioUnlocked(true);
    } catch (e) {
      console.warn('Audio unlock caught:', e);
    }
  }, []);

  // Trigger audio stings upon scene transitions
  const playSceneAudio = useCallback((targetScene) => {
    switch (targetScene) {
      case 2:
        playTorchIgnite();
        break;
      case 3:
        playMonsterGrowl();
        break;
      case 4:
        playSwordDraw();
        break;
      case 5:
        playDramaticSting();
        break;
      default:
        break;
    }
  }, []);

  // Jump to specific scene
  const goToScene = useCallback((targetScene) => {
    setScene(targetScene);
    playSceneAudio(targetScene);
  }, [playSceneAudio]);

  // Sequenced automatic scene transitions
  useEffect(() => {
    if (!autoAdvance) return;
    const timers = [];

    // Scene 1 -> 2 (at 3.5s)
    timers.push(
      setTimeout(() => {
        setScene(2);
        playTorchIgnite();
      }, 3500)
    );

    // Scene 2 -> 3 (at 7.2s)
    timers.push(
      setTimeout(() => {
        setScene(3);
        playMonsterGrowl();
      }, 7200)
    );

    // Scene 3 -> 4 (at 11.2s)
    timers.push(
      setTimeout(() => {
        setScene(4);
        playSwordDraw();
      }, 11200)
    );

    // Scene 4 -> 5 (at 16.0s)
    timers.push(
      setTimeout(() => {
        setScene(5);
        playDramaticSting();
      }, 16000)
    );

    return () => timers.forEach(clearTimeout);
  }, [autoAdvance]);

  // Execute an interactive combat slash / spell strike
  const triggerSlash = useCallback(() => {
    unlockAudio();

    const now = Date.now();
    lastSlashTimeRef.current = now;
    setIsSlashing(true);
    setTimeout(() => setIsSlashing(false), 340);

    // Dynamic screen shake & flash
    setScreenShake(8);
    setTimeout(() => setScreenShake(0), 220);

    // Increment combo
    setCombo((prev) => {
      const next = prev + 1;
      playComboHit(next);

      // Reset combo after 2.4s of inactivity
      if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
      comboTimeoutRef.current = setTimeout(() => {
        setCombo(0);
      }, 2400);

      return next;
    });

    // Class specific sounds & flash colors
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

    // Generate floating RPG damage popups
    const isCrit = Math.random() > 0.35;
    let baseDmg = 1200 + Math.floor(Math.random() * 850);
    if (selectedClass === 'mage') baseDmg = 2100 + Math.floor(Math.random() * 1400);
    if (selectedClass === 'assassin') baseDmg = 1850 + Math.floor(Math.random() * 1900);
    if (isCrit) baseDmg = Math.floor(baseDmg * 1.75);

    let prefix = '';
    if (isCrit) prefix = selectedClass === 'assassin' ? 'BACKSTAB! ' : 'CRITICAL! ';
    if (combo >= 4 && combo % 3 === 0) prefix = 'ARC OVERLOAD! ';

    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : window.innerWidth;
    const h = canvas ? canvas.height : window.innerHeight;
    const spawnX = w / 2 + 55 + (Math.random() - 0.5) * 40;
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
      const angle = (Math.random() * Math.PI * 2);
      const spd = Math.random() * 7 + 3;
      sparksRef.current.push({
        x: spawnX,
        y: spawnY,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 2,
        size: Math.random() * 3 + 2,
        color: Math.random() > 0.5 ? '#fde047' : selectedClass === 'mage' ? '#a855f7' : selectedClass === 'assassin' ? '#10b981' : '#38bdf8',
        life: 1.0
      });
    }
  }, [selectedClass, combo, unlockAudio]);

  // Cycle class with key
  const cycleClass = useCallback(() => {
    setSelectedClass((prev) => {
      if (prev === 'knight') return 'mage';
      if (prev === 'mage') return 'assassin';
      return 'knight';
    });
    playUiClick();
  }, []);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space: Slash / Attack
      if (e.code === 'Space') {
        e.preventDefault();
        triggerSlash();
      }
      // Enter: Enter Dungeon (Scene 5) or advance
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
      // Q or E or C: Switch Hero Class
      else if (e.code === 'KeyQ' || e.code === 'KeyE' || e.code === 'KeyC') {
        cycleClass();
      }
      // 1 to 5: Direct Jump to Scene Chapters
      else if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'].includes(e.code)) {
        const target = parseInt(e.code.replace('Digit', ''), 10);
        setAutoAdvance(false);
        goToScene(target);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scene, triggerSlash, cycleClass, goToScene]);

  // Main Canvas Rendering Engine
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

    // Dust particles
    const dustParticles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      alpha: Math.random() * 0.7 + 0.2
    }));

    // Torch fire particles
    const fireParticles = [];

    // Creeping ground fog particles
    const fogWaves = Array.from({ length: 14 }, (_, i) => ({
      x: (width / 14) * i,
      speed: Math.random() * 0.4 + 0.2,
      baseY: height - 60,
      radius: Math.random() * 60 + 80
    }));

    let startTime = Date.now();

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

      // --- SCENE 1: The Dark Catacombs Void & Ancient Seal ---
      if (scene === 1) {
        ctx.fillStyle = '#05070a';
        ctx.fillRect(0, 0, width, height);

        // Cracking Ancient Void Seal in center
        const sealX = width / 2;
        const sealY = height / 2;
        const sealPulse = Math.sin(time * 3) * 0.12 + 0.88;

        ctx.strokeStyle = `rgba(245, 158, 11, ${0.25 * sealPulse})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(sealX, sealY, 90, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * sealPulse})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sealX, sealY, 130, 0, Math.PI * 2);
        ctx.stroke();

        // Cracking veins of gold light
        for (let i = 0; i < 6; i++) {
          const ang = (i * Math.PI) / 3 + time * 0.2;
          ctx.beginPath();
          ctx.moveTo(sealX, sealY);
          ctx.lineTo(sealX + Math.cos(ang) * 90, sealY + Math.sin(ang) * 90);
          ctx.strokeStyle = `rgba(253, 224, 71, ${0.15 * sealPulse})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Ambient faint dust
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        dustParticles.forEach((p) => {
          ctx.fillRect(p.x, p.y, p.size, p.size);
          p.y += p.speedY * 0.3;
          if (p.y < 0) p.y = height;
        });
      }

      // --- SCENE 2: The Flickering Torch in the Dark ---
      if (scene >= 2) {
        ctx.fillStyle = '#080a0f';
        ctx.fillRect(0, 0, width, height);

        const torchX = width / 2;
        const torchY = height / 2 - 40;
        const flicker = Math.sin(now * 0.02) * 8 + Math.cos(now * 0.05) * 6;
        const radius = scene === 2 ? 180 + flicker : 380 + flicker;

        // Warm radial torch glow
        const radialGlow = ctx.createRadialGradient(torchX, torchY, 10, torchX, torchY, radius);
        radialGlow.addColorStop(0, 'rgba(245, 158, 11, 0.85)');
        radialGlow.addColorStop(0.35, 'rgba(217, 119, 6, 0.35)');
        radialGlow.addColorStop(0.7, 'rgba(180, 83, 9, 0.12)');
        radialGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(torchX, torchY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Spawn fire embers
        if (fireParticles.length < 40) {
          fireParticles.push({
            x: torchX + (Math.random() - 0.5) * 14,
            y: torchY + 10,
            vx: (Math.random() - 0.5) * 1.8,
            vy: -Math.random() * 2.8 - 1,
            size: Math.random() * 3 + 2,
            color: Math.random() > 0.5 ? '#f59e0b' : '#ef4444',
            life: 1
          });
        }

        // Draw and update fire particles
        for (let i = fireParticles.length - 1; i >= 0; i--) {
          const p = fireParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.032;
          if (p.life <= 0) {
            fireParticles.splice(i, 1);
            continue;
          }
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.globalAlpha = 1.0;
        }

        // Draw Torch wooden bracket & glowing flame head
        ctx.fillStyle = '#451a03';
        ctx.fillRect(torchX - 4, torchY + 12, 8, 30);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(torchX - 3, torchY + 14, 6, 26);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(torchX - 5, torchY - 2 + Math.sin(now * 0.04) * 2, 10, 14);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(torchX - 3, torchY - 6 + Math.sin(now * 0.05) * 3, 6, 8);
      }

      // --- SCENE 3 & 4 & 5: Parallax Perspective Corridor & Volumetric Atmosphere ---
      if (scene >= 3) {
        const vanishingX = width / 2;
        const vanishingY = height / 2 - 30;

        // Floor perspective lines
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        for (let i = -5; i <= 5; i++) {
          ctx.beginPath();
          ctx.moveTo(vanishingX, vanishingY);
          ctx.lineTo(vanishingX + i * (width * 0.2), height);
          ctx.stroke();
        }

        // Horizontal floor flagstone tiles
        const steps = 7;
        for (let s = 1; s <= steps; s++) {
          const y = vanishingY + Math.pow(s / steps, 2.1) * (height - vanishingY);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.strokeStyle = '#182030';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Left & Right Stone Wall Pillars
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width * 0.18, height);
        ctx.fillRect(width * 0.82, 0, width * 0.18, height);

        // Brick Outlines & Moss Highlights
        ctx.strokeStyle = '#273549';
        ctx.lineWidth = 2;
        for (let y = 0; y < height; y += 45) {
          ctx.strokeRect(0, y, width * 0.18, 45);
          ctx.strokeRect(width * 0.82, y, width * 0.18, 45);
          // Faint green moss highlight on stones
          ctx.fillStyle = '#064e3b';
          ctx.fillRect(width * 0.18 - 8, y + 38, 6, 4);
          ctx.fillRect(width * 0.82 + 2, y + 20, 6, 4);
        }

        // Left & Right Wall Torches
        const leftTorchX = width * 0.18 - 12;
        const rightTorchX = width * 0.82 + 12;
        const wallTorchY = height * 0.42;

        [leftTorchX, rightTorchX].forEach((tx) => {
          ctx.fillStyle = '#451a03';
          ctx.fillRect(tx - 3, wallTorchY, 6, 22);
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(tx - 4, wallTorchY - 8 + Math.sin(time * 8) * 2, 8, 10);
          ctx.fillStyle = '#fde047';
          ctx.fillRect(tx - 2, wallTorchY - 12 + Math.sin(time * 10) * 3, 4, 6);
        });

        // Volumetric God Rays from Ceiling Archways
        ctx.save();
        ctx.fillStyle = 'rgba(251, 191, 36, 0.035)';
        ctx.beginPath();
        ctx.moveTo(width * 0.3, 0);
        ctx.lineTo(width * 0.4, 0);
        ctx.lineTo(width * 0.65, height);
        ctx.lineTo(width * 0.45, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // --- SCENE 3: The Lurking Void Warden Demon Silhouette at the Depths ---
        if (scene === 3) {
          drawVoidWarden(ctx, vanishingX, vanishingY + 30, time);
        }

        // Floating dungeon dust particles
        ctx.fillStyle = 'rgba(248, 250, 252, 0.45)';
        dustParticles.forEach((p) => {
          ctx.fillRect(p.x, p.y, p.size, p.size);
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.y < 0) p.y = height;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
        });

        // Creeping Floor Mist / Fog
        ctx.fillStyle = 'rgba(30, 41, 59, 0.28)';
        fogWaves.forEach((fw) => {
          fw.x += fw.speed;
          if (fw.x > width + 100) fw.x = -100;
          ctx.beginPath();
          ctx.arc(fw.x, fw.baseY + Math.sin(time * 2 + fw.x * 0.01) * 8, fw.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // --- SCENE 4 & 5: Cinematic Champion & Interactive Target Minion ---
      if (scene >= 4) {
        const kx = width / 2;
        const targetKy = scene === 4 ? height / 2 + 55 : height / 2 + 100;
        const knightScale = scene === 4 ? 3.1 : 3.6;

        // Draw Interactive Shadow Minion / Target Creature in Front
        const minionX = kx + 85 * (knightScale / 3.2);
        const minionY = targetKy - 15;
        const isMinionHit = now - lastSlashTimeRef.current < 260;
        drawShadowMinion(ctx, minionX, minionY, knightScale * 0.65, time, isMinionHit);

        // Render Hero Champion
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

      // Render Floating Damage Numbers
      for (let i = damagePopupsRef.current.length - 1; i >= 0; i--) {
        const dp = damagePopupsRef.current[i];
        dp.y -= 1.4;
        dp.life -= 0.022;

        if (dp.life <= 0) {
          damagePopupsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.font = `bold ${Math.round(13 * dp.scale)}px "Press Start 2P", monospace`;
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
        sp.life -= 0.04;

        if (sp.life <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.life;
        ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
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
  }, [scene, selectedClass, isSlashing, screenShake]);

  // --- DRAW THE VOID WARDEN (SCENE 3) ---
  function drawVoidWarden(ctx, vx, vy, time) {
    ctx.save();
    ctx.translate(vx, vy);

    const breathe = Math.sin(time * 3) * 6;
    const wardenScale = 1.8;

    // Menacing Dark Purple Void Miasma Aura
    const auraPulse = Math.sin(time * 4) * 0.2 + 0.8;
    const auraGrad = ctx.createRadialGradient(0, -30, 20, 0, -30, 140 * wardenScale);
    auraGrad.addColorStop(0, `rgba(88, 28, 135, ${0.65 * auraPulse})`);
    auraGrad.addColorStop(0.5, `rgba(30, 27, 75, ${0.35 * auraPulse})`);
    auraGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, -30, 140 * wardenScale, 0, Math.PI * 2);
    ctx.fill();

    // Colossal Horned Silhouette
    ctx.fillStyle = '#090514';

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

    // Spiked Horns
    // Left Horn
    ctx.beginPath();
    ctx.moveTo(-35 * wardenScale, -45 + breathe);
    ctx.quadraticCurveTo(-65 * wardenScale, -95 + breathe, -95 * wardenScale, -80 + breathe);
    ctx.lineTo(-75 * wardenScale, -65 + breathe);
    ctx.quadraticCurveTo(-50 * wardenScale, -75 + breathe, -25 * wardenScale, -45 + breathe);
    ctx.closePath();
    ctx.fill();

    // Right Horn
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

    ctx.restore();
  }

  // --- DRAW THE SHADOW MINION / TRAINING DUMMY (SCENE 4 & 5) ---
  function drawShadowMinion(ctx, mx, my, s, time, isHit) {
    ctx.save();
    ctx.translate(mx, my);

    // If hit, knockback and white flash
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

    // Spiky Claws / Minion Arms
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
    ctx.strokeStyle = wardColor + (0.55 * wardPulse) + ')';
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

    // Twin-Tail Flowing Crimson Cape
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

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.4 * s;
    ctx.beginPath();
    ctx.moveTo(-14 * s - capeWave * 0.8, 27 * s);
    ctx.lineTo(14 * s + capeWave * 0.8, 27 * s);
    ctx.stroke();

    // Armored Sabatons & Greaves (Legs)
    const leftLegX = -7 * s + legStride * 0.6;
    const leftLegY = 12 * s + (isWalking ? Math.abs(legStride) * 0.4 : 0);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(leftLegX - 2 * s, leftLegY, 5 * s, 12 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(leftLegX - 1.5 * s, leftLegY + 1 * s, 4 * s, 6 * s);
    ctx.fillStyle = '#475569';
    ctx.fillRect(leftLegX - 3 * s, leftLegY + 10 * s, 6 * s, 4 * s);

    const rightLegX = 7 * s - legStride * 0.6;
    const rightLegY = 12 * s + (isWalking ? Math.abs(legStride) * 0.4 : 0);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(rightLegX - 3 * s, rightLegY, 5 * s, 12 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(rightLegX - 2.5 * s, rightLegY + 1 * s, 4 * s, 6 * s);
    ctx.fillStyle = '#475569';
    ctx.fillRect(rightLegX - 3 * s, rightLegY + 10 * s, 6 * s, 4 * s);

    // Chainmail Fauld & Hip Tassets (Waist)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-8 * s, 6 * s + walkBob, 16 * s, 7 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-9 * s, 7 * s + walkBob, 4 * s, 6 * s);
    ctx.fillRect(5 * s, 7 * s + walkBob, 4 * s, 6 * s);

    // Leather belt with golden buckle
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-8 * s, 4 * s + walkBob, 16 * s, 3 * s);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-2.5 * s, 3.5 * s + walkBob, 5 * s, 4 * s);

    // Steel Cuirass (Chestplate)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-8 * s, -8 * s + walkBob, 16 * s, 13 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-7 * s, -7 * s + walkBob, 14 * s, 11 * s);
    ctx.fillStyle = '#475569';
    ctx.fillRect(-5 * s, -6 * s + walkBob, 10 * s, 9 * s);

    // Golden Rune Cross on Chest
    const runeGlow = Math.sin(time * 4) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(245, 158, 11, ${runeGlow})`;
    ctx.fillRect(-1.5 * s, -4 * s + walkBob, 3 * s, 7 * s);
    ctx.fillRect(-4.5 * s, -2 * s + walkBob, 9 * s, 3 * s);

    // Pauldrons
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-13 * s, -8 * s + walkBob, 6 * s, 8 * s);
    ctx.fillRect(7 * s, -8 * s + walkBob, 6 * s, 8 * s);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-13 * s, -9 * s + walkBob, 6 * s, 2 * s);
    ctx.fillRect(7 * s, -9 * s + walkBob, 6 * s, 2 * s);

    // Kite Shield on Left Arm
    const shieldX = -13 * s;
    const shieldY = -2 * s + walkBob;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(shieldX - 2 * s, shieldY, 8 * s, 16 * s);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(shieldX, shieldY + 2 * s, 4 * s, 12 * s);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(shieldX - 1 * s, shieldY + 6 * s, 6 * s, 3 * s);

    // Great-Helm & Flowing Red Plume
    const headY = -20 * s + walkBob;
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(0, headY - 4 * s);
    ctx.quadraticCurveTo(-14 * s - capeWave, headY - 14 * s, -18 * s - capeWave * 1.2, headY - 2 * s);
    ctx.lineTo(-12 * s - capeWave * 0.8, headY - 2 * s);
    ctx.quadraticCurveTo(-8 * s - capeWave * 0.5, headY - 8 * s, 0, headY - 2 * s);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-7 * s, headY, 14 * s, 12 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-6.5 * s, headY + 0.5 * s, 13 * s, 11 * s);
    ctx.fillStyle = '#080a10';
    ctx.fillRect(-6 * s, headY + 5.5 * s, 12 * s, 4 * s);

    // Glowing Cyan Visor Soul Eyes
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
    ctx.fillStyle = '#082f49';
    ctx.fillRect(3 * s, -1.2 * s, 28 * s, 2.4 * s);
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(4 * s, -0.8 * s, 26 * s, 1.6 * s);

    // Blade tip bevel
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(36 * s, -3.5 * s);
    ctx.lineTo(41 * s, 0);
    ctx.lineTo(36 * s, 3.5 * s);
    ctx.closePath();
    ctx.fill();

    // Winged Golden Crossguard & Ruby Gem
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-2 * s, -7 * s, 4 * s, 14 * s);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-1 * s, -2 * s, 2.5 * s, 4 * s);

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
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-1 * s, -4 * s + bob, 2 * s, 26 * s);

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

    // Dark Shadow Cloak & Mask
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

  const handleEnterDungeon = () => {
    playSlash();
    setIsFadingOut(true);
    startAmbientDungeon();
    try {
      localStorage.setItem('arcSlashIntroSeen', 'true');
    } catch (e) {}
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  const handleSkip = () => {
    playUiClick();
    setIsFadingOut(true);
    startAmbientDungeon();
    try {
      localStorage.setItem('arcSlashIntroSeen', 'true');
    } catch (e) {}
    setTimeout(() => {
      onComplete();
    }, 380);
  };

  return (
    <div
      onClick={triggerSlash}
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
      <div className="relative z-30 w-full h-14 md:h-16 bg-[#040609] border-b border-[#1e293b] flex items-center justify-between px-4 sm:px-8 select-none">
        {/* Left Badge */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#f59e0b] rotate-45 animate-pulse" />
          <span className="font-pixel text-[8px] sm:text-[9.5px] text-[#e2e8f0] tracking-widest uppercase">
            ARC-CINEMATICS // PROLOGUE
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#1e293b] text-[#38bdf8] font-mono text-[9px] border border-[#3b4b66]">
            60 FPS
          </span>
        </div>

        {/* Center Prompt / Audio Hint */}
        <div className="hidden md:flex items-center gap-2 text-center">
          <span className="font-pixel text-[8.5px] text-[#94a3b8] tracking-widest">
            {audioUnlocked ? '🔊 STEREO SYNTH ACTIVE' : '🔇 CLICK ANYWHERE TO UNMUTE AUDIO'}
          </span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {!audioUnlocked && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                unlockAudio();
              }}
              className="px-2.5 py-1 bg-[#b45309] border border-[#fde047] text-[#fde047] font-pixel text-[8.5px] tracking-wider hover:bg-[#d97706] hover:text-white transition-all shadow-[0_0_10px_rgba(245,158,11,0.4)] cursor-pointer"
            >
              🔊 UNMUTE
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            onMouseEnter={playUiHover}
            className="px-3 py-1 bg-[#182030]/90 border border-[#3b4b66] text-[#cbd5e1] font-pixel text-[8.5px] tracking-widest hover:border-[#f8fafc] hover:text-white transition-all cursor-pointer"
          >
            SKIP [ESC] ⏭
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
            <span className="font-pixel text-[9px] sm:text-[10px] text-[#38bdf8] tracking-widest uppercase mb-3 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              ✦ CHRONICLE ENTRY I ✦
            </span>
            <h1 className="font-pixel text-xl sm:text-3xl text-[#f8fafc] tracking-widest leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              THE DUNGEON REMEMBERS...
            </h1>
            <p className="font-outfit text-sm sm:text-base text-[#94a3b8] mt-3 tracking-wider max-w-lg leading-relaxed">
              Di kedalaman 50 lantai Catacombs purba, segel kegelapan mulai retak.
            </p>
          </div>
        )}

        {/* SCENE 2: THE EMBER */}
        {scene === 2 && (
          <div className="animate-fade-in flex flex-col items-center">
            <span className="font-pixel text-[9px] sm:text-[10px] text-[#f59e0b] tracking-widest uppercase mb-3 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
              ✦ A SPARK IN THE VOID ✦
            </span>
            <h2 className="font-pixel text-base sm:text-2xl text-[#fef08a] tracking-widest leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              A SINGLE EMBER PIERCES THE SHADOWS.
            </h2>
            <p className="font-outfit text-sm sm:text-base text-[#cbd5e1] mt-3 tracking-wider max-w-md">
              Sebuah obor kuno dinyalakan oleh mereka yang berani melangkah masuk.
            </p>
          </div>
        )}

        {/* SCENE 3: THE WARDEN */}
        {scene === 3 && (
          <div className="animate-fade-in flex flex-col items-center">
            <span className="font-pixel text-[9.5px] sm:text-[11px] text-[#ef4444] tracking-widest uppercase mb-2 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
              ⚠️ DANGER: LEVEL 50 BOSS DETECTED
            </span>
            <h2 className="font-pixel text-lg sm:text-2xl text-[#f8fafc] tracking-widest drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]">
              THE VOID WARDEN AWAKENS
            </h2>
            <p className="font-outfit text-sm sm:text-base text-[#c084fc] mt-2 tracking-wider max-w-lg">
              Entitas kegelapan mengintai di kedalaman terdalam. Hanya bilah Arc yang dapat mematahkan kutukannya.
            </p>
          </div>
        )}

        {/* SCENE 4: THE CHAMPION */}
        {scene === 4 && (
          <div className="animate-fade-in flex flex-col items-center">
            <span className="font-pixel text-[9px] text-[#38bdf8] tracking-widest uppercase mb-2">
              ✦ READY WEAPONS ✦
            </span>
            <h2 className="font-pixel text-base sm:text-xl text-[#fde047] tracking-widest drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mb-3">
              A CHAMPION STEPS FORWARD.
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0f172a]/90 border border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <span className="font-pixel text-[8.5px] sm:text-[9.5px] text-[#f8fafc] tracking-widest">
                [ KLIK ATAU TEKAN SPASI UNTUK MENGAYUNKAN SERANGAN ]
              </span>
            </div>
          </div>
        )}

        {/* SCENE 5: ARC SLASH GRAND TITLE & HERO DEPLOYMENT */}
        {scene >= 5 && (
          <div className="flex flex-col items-center animate-fade-in pointer-events-auto w-full max-w-3xl">
            {/* Crest & Title */}
            <div className="flex items-center gap-3 mb-1">
              <span className="w-8 h-0.5 bg-[#f59e0b]" />
              <span className="font-pixel text-[9px] sm:text-[10px] text-[#f59e0b] tracking-widest uppercase">
                DARK FANTASY ACTION RPG
              </span>
              <span className="w-8 h-0.5 bg-[#f59e0b]" />
            </div>

            <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-[#f8fafc] tracking-widest my-1 drop-shadow-[0_0_30px_rgba(245,158,11,0.7)]">
              ARC SLASH
            </h1>

            <p className="font-outfit text-xs sm:text-sm text-[#cbd5e1] max-w-lg tracking-wider mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Taklukkan 50 lantai Catacombs. Kuasai gaya tempurmu dan kembalikan cahaya.
            </p>

            {/* Interactive Hero Class Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-5">
              {HERO_CLASSES.map((cls) => {
                const isSelected = selectedClass === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playUiClick();
                      setSelectedClass(cls.id);
                    }}
                    onMouseEnter={playUiHover}
                    className={`relative p-3 text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#182030] shadow-[0_0_18px_rgba(245,158,11,0.35)] scale-102'
                        : 'bg-[#0f172a]/80 border-[#2c394b] opacity-80 hover:opacity-100 hover:border-[#475569]'
                    }`}
                    style={{
                      borderColor: isSelected ? cls.color : undefined
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{cls.icon}</span>
                        <span
                          className="font-pixel text-[9.5px] tracking-wider"
                          style={{ color: cls.color }}
                        >
                          {cls.name}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="px-1 py-0.5 bg-[#f59e0b]/20 border border-[#f59e0b] font-pixel text-[7px] text-[#fde047]">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <div className="font-pixel text-[7.5px] text-[#94a3b8] mb-1.5 tracking-wider">
                      {cls.skill}
                    </div>

                    {/* Stats Preview */}
                    <div className="space-y-1 font-mono text-[9px] text-[#64748b]">
                      <div className="flex justify-between items-center">
                        <span>ATK</span>
                        <div className="w-16 bg-[#1e293b] h-1.5">
                          <div
                            className="bg-[#ef4444] h-1.5"
                            style={{ width: `${cls.stats.atk}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>DEF</span>
                        <div className="w-16 bg-[#1e293b] h-1.5">
                          <div
                            className="bg-[#38bdf8] h-1.5"
                            style={{ width: `${cls.stats.def}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>SPD</span>
                        <div className="w-16 bg-[#1e293b] h-1.5">
                          <div
                            className="bg-[#10b981] h-1.5"
                            style={{ width: `${cls.stats.spd}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Launch Button */}
            <div className="flex flex-col items-center gap-2">
              <PixelButton
                variant="primary"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnterDungeon();
                }}
                className="animate-bounce shadow-[0_0_25px_rgba(245,158,11,0.6)]"
              >
                [ ENTER THE DUNGEON ]
              </PixelButton>

              <span className="font-pixel text-[8px] sm:text-[9px] text-[#94a3b8] tracking-widest mt-1">
                TEKAN ENTER ATAU KLIK UNTUK MASUK • [SPASI] UJI SERANGAN
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
              {combo >= 8 ? 'GODLIKE' : combo >= 5 ? 'ARC RAGE' : 'STRIKE'}
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM CINEMASCOPE LETTERBOX BAR & CHAPTER SCRUBBER */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full h-16 md:h-20 bg-[#040609] border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-2 gap-2 select-none">
        {/* Chapter Pills Scrubber */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto w-full sm:w-auto justify-center sm:justify-start">
          {SCENE_CHAPTERS.map((ch) => {
            const isActive = scene === ch.num;
            return (
              <button
                key={ch.num}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAutoAdvance(false);
                  goToScene(ch.num);
                }}
                className={`px-2.5 py-1 font-pixel text-[7.5px] sm:text-[8px] tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#1e293b] border-[#f59e0b] text-[#fde047] shadow-[0_0_10px_rgba(245,158,11,0.4)] scale-105'
                    : 'bg-[#0d121c] border-[#2c394b] text-[#64748b] hover:text-[#cbd5e1] hover:border-[#475569]'
                }`}
              >
                {ch.label}
              </button>
            );
          })}
        </div>

        {/* Helpful Shortcut Indicator */}
        <div className="hidden lg:flex items-center gap-4 text-[#64748b] font-pixel text-[8px] tracking-widest">
          <span>[SPASI/KLIK] SERANG</span>
          <span>[Q/E] GANTI KELAS</span>
          <span>[ENTER] MASUK</span>
        </div>
      </div>
    </div>
  );
}
