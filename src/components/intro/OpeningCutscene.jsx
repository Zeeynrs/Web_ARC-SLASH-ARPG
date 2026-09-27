import React, { useState, useEffect, useRef } from 'react';
import { PixelButton } from '../ui/PixelButton';
import { playSlash, playUiClick, playUiHover, startAmbientDungeon } from '../../utils/audioSynth';

export function OpeningCutscene({ onComplete }) {
  const [scene, setScene] = useState(1); // 1: Black, 2: Torch, 3: Corridor, 4: Knight, 5: Title & Enter
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [audioPromptVisible, setAudioPromptVisible] = useState(true);
  const [selectedClass, setSelectedClass] = useState('knight'); // 'knight', 'mage', 'assassin'
  const [isSlashing, setIsSlashing] = useState(false);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Advance scenes sequentially
  useEffect(() => {
    const timers = [];

    // Scene 1 -> 2 after 3.0s
    timers.push(setTimeout(() => setScene(2), 3000));
    // Scene 2 -> 3 after 6.0s
    timers.push(setTimeout(() => setScene(3), 6000));
    // Scene 3 -> 4 after 9.2s
    timers.push(setTimeout(() => setScene(4), 9200));
    // Scene 4 -> 5 after 13.0s
    timers.push(setTimeout(() => setScene(5), 13000));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Trigger slash animation on click or Space
  const triggerSlash = () => {
    if (scene < 4) return;
    playSlash();
    setIsSlashing(true);
    setTimeout(() => setIsSlashing(false), 380);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && scene >= 4) {
        e.preventDefault();
        triggerSlash();
      } else if (e.code === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scene]);

  // Canvas animation for dungeon corridor, torches, dust particles, and cinematic champion
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

    // Dust particle system
    const dustParticles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      alpha: Math.random() * 0.7 + 0.2
    }));

    const fireParticles = [];
    const bladeSparks = [];

    let startTime = Date.now();

    const render = () => {
      const now = Date.now();
      const elapsed = (now - startTime) * 0.001;
      const time = now * 0.004;

      ctx.clearRect(0, 0, width, height);

      // --- SCENE 1: Deep Black Void with subtle stardust ---
      if (scene === 1) {
        ctx.fillStyle = '#05070a';
        ctx.fillRect(0, 0, width, height);

        // Ambient faint dust
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        dustParticles.forEach((p) => {
          ctx.fillRect(p.x, p.y, p.size, p.size);
          p.y += p.speedY * 0.4;
          if (p.y < 0) p.y = height;
        });
      }

      // --- SCENE 2: The Flickering Torch in the Dark ---
      if (scene >= 2) {
        ctx.fillStyle = '#080a0f';
        ctx.fillRect(0, 0, width, height);

        // Torch light radius expanding
        const torchX = width / 2;
        const torchY = height / 2 - 40;
        const flicker = Math.sin(now * 0.02) * 8 + Math.cos(now * 0.05) * 6;
        const radius = scene === 2 ? 160 + flicker : 360 + flicker;

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
        if (fireParticles.length < 35) {
          fireParticles.push({
            x: torchX + (Math.random() - 0.5) * 12,
            y: torchY + 10,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2.5 - 1,
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

        // Draw Torch wooden bracket & glowing head
        ctx.fillStyle = '#451a03';
        ctx.fillRect(torchX - 4, torchY + 12, 8, 30);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(torchX - 3, torchY + 14, 6, 26);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(torchX - 5, torchY - 2 + Math.sin(now * 0.04) * 2, 10, 14);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(torchX - 3, torchY - 6 + Math.sin(now * 0.05) * 3, 6, 8);
      }

      // --- SCENE 3 & 4 & 5: Parallax Dungeon Corridor ---
      if (scene >= 3) {
        // Perspective corridor stone walls
        const vanishingX = width / 2;
        const vanishingY = height / 2 - 30;

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;

        // Floor perspective lines
        for (let i = -4; i <= 4; i++) {
          ctx.beginPath();
          ctx.moveTo(vanishingX, vanishingY);
          ctx.lineTo(vanishingX + i * (width * 0.22), height);
          ctx.stroke();
        }

        // Horizontal floor flagstones
        const steps = 6;
        for (let s = 1; s <= steps; s++) {
          const y = vanishingY + Math.pow(s / steps, 2.2) * (height - vanishingY);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.strokeStyle = '#182030';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Left & Right stone wall pillars
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width * 0.16, height);
        ctx.fillRect(width * 0.84, 0, width * 0.16, height);

        // Brick outlines
        ctx.strokeStyle = '#273549';
        ctx.lineWidth = 2;
        for (let y = 0; y < height; y += 45) {
          ctx.strokeRect(0, y, width * 0.16, 45);
          ctx.strokeRect(width * 0.84, y, width * 0.16, 45);
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
      }

      // --- SCENE 4 & 5: Cinematic High-Detail Character Model ---
      if (scene >= 4) {
        // In Scene 4, the champion walks forward down the perspective corridor
        // In Scene 5, the champion stands firmly with heroic stance and ready blade
        const kx = width / 2;
        const targetKy = scene === 4 ? height / 2 + 55 : height / 2 + 105;
        const knightScale = scene === 4 ? 3.0 : 3.6;

        // Render the high-definition cinematic champion
        drawCinematicChampion(
          ctx,
          kx,
          targetKy,
          knightScale,
          time,
          scene,
          selectedClass,
          isSlashing,
          bladeSparks
        );
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [scene, selectedClass, isSlashing]);

  // Master Cinematic Champion Drawing Function
  function drawCinematicChampion(ctx, cx, cy, scale, time, currentScene, role, isAttacking, sparks) {
    ctx.save();
    ctx.translate(cx, cy);

    // 1. Soft Realistic Contact Shadow on Dungeon Stone
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.beginPath();
    ctx.ellipse(0, 36 * scale * 0.45, 26 * scale, 8 * scale * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Arcane Floor Ward Circle (Glows & Spins Under Hero's Feet)
    const wardPulse = Math.sin(time * 3) * 0.15 + 0.85;
    const wardRadius = 30 * scale;
    const wardColor =
      role === 'mage'
        ? 'rgba(168, 85, 247, '
        : role === 'assassin'
        ? 'rgba(16, 185, 129, '
        : 'rgba(56, 189, 248, ';

    // Outer spinning ward ring
    ctx.strokeStyle = wardColor + (0.5 * wardPulse) + ')';
    ctx.lineWidth = 2;
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

    // 3. Draw Hero by Selected Class
    if (role === 'mage') {
      drawCinematicMage(ctx, scale, time, currentScene, isAttacking);
    } else if (role === 'assassin') {
      drawCinematicAssassin(ctx, scale, time, currentScene, isAttacking);
    } else {
      drawCinematicKnight(ctx, scale, time, currentScene, isAttacking);
    }

    // 4. Attack Slash Wave FX
    if (isAttacking) {
      ctx.save();
      const slashAngle = time * 8;
      ctx.strokeStyle = role === 'mage' ? '#c084fc' : role === 'assassin' ? '#34d399' : '#38bdf8';
      ctx.lineWidth = 6 * scale * 0.4;
      ctx.beginPath();
      ctx.arc(0, -5 * scale, 34 * scale, -0.6, 1.2);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2 * scale * 0.4;
      ctx.beginPath();
      ctx.arc(0, -5 * scale, 34 * scale, -0.4, 1.0);
      ctx.stroke();

      // Golden sparks
      for (let j = 0; j < 6; j++) {
        const sparkAng = -0.5 + Math.random() * 1.6;
        const dist = 34 * scale + (Math.random() - 0.5) * 10;
        ctx.fillStyle = '#fde047';
        ctx.fillRect(Math.cos(sparkAng) * dist, -5 * scale + Math.sin(sparkAng) * dist, 4, 4);
      }
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

    // A. Twin-Tail Flowing Crimson Cape (Behind Body)
    ctx.fillStyle = '#450a0a'; // Deep shade
    ctx.beginPath();
    ctx.moveTo(-10 * s, -6 * s + walkBob);
    ctx.quadraticCurveTo(-18 * s - capeWave, 10 * s, -14 * s - capeWave * 0.8, 28 * s);
    ctx.lineTo(14 * s + capeWave * 0.8, 28 * s);
    ctx.quadraticCurveTo(18 * s + capeWave, 10 * s, 10 * s, -6 * s + walkBob);
    ctx.closePath();
    ctx.fill();

    // Cape inner red velvet
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(-8 * s, -4 * s + walkBob);
    ctx.quadraticCurveTo(-15 * s - capeWave * 0.8, 12 * s, -11 * s - capeWave * 0.6, 26 * s);
    ctx.lineTo(11 * s + capeWave * 0.6, 26 * s);
    ctx.quadraticCurveTo(15 * s + capeWave * 0.8, 12 * s, 8 * s, -4 * s + walkBob);
    ctx.closePath();
    ctx.fill();

    // Cape gold embroidered hem
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.4 * s;
    ctx.beginPath();
    ctx.moveTo(-14 * s - capeWave * 0.8, 27 * s);
    ctx.lineTo(14 * s + capeWave * 0.8, 27 * s);
    ctx.stroke();

    // B. Armored Sabatons & Greaves (Legs)
    // Left leg
    const leftLegX = -7 * s + legStride * 0.6;
    const leftLegY = 12 * s + (isWalking ? Math.abs(legStride) * 0.4 : 0);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(leftLegX - 2 * s, leftLegY, 5 * s, 12 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(leftLegX - 1.5 * s, leftLegY + 1 * s, 4 * s, 6 * s);
    ctx.fillStyle = '#475569'; // Steel sabaton toe
    ctx.fillRect(leftLegX - 3 * s, leftLegY + 10 * s, 6 * s, 4 * s);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(leftLegX - 2.5 * s, leftLegY + 10 * s, 4 * s, 1.5 * s);

    // Right leg
    const rightLegX = 7 * s - legStride * 0.6;
    const rightLegY = 12 * s + (isWalking ? Math.abs(legStride) * 0.4 : 0);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(rightLegX - 3 * s, rightLegY, 5 * s, 12 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(rightLegX - 2.5 * s, rightLegY + 1 * s, 4 * s, 6 * s);
    ctx.fillStyle = '#475569'; // Steel sabaton toe
    ctx.fillRect(rightLegX - 3 * s, rightLegY + 10 * s, 6 * s, 4 * s);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(rightLegX - 2.5 * s, rightLegY + 10 * s, 4 * s, 1.5 * s);

    // C. Chainmail Fauld & Hip Tassets (Waist)
    ctx.fillStyle = '#0f172a'; // Chainmail skirt
    ctx.fillRect(-8 * s, 6 * s + walkBob, 16 * s, 7 * s);
    // Steel side tassets with golden rivets
    ctx.fillStyle = '#334155';
    ctx.fillRect(-9 * s, 7 * s + walkBob, 4 * s, 6 * s);
    ctx.fillRect(5 * s, 7 * s + walkBob, 4 * s, 6 * s);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-8.5 * s, 11 * s + walkBob, 2 * s, 2 * s);
    ctx.fillRect(6.5 * s, 11 * s + walkBob, 2 * s, 2 * s);

    // Leather warrior belt with golden buckle
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-8 * s, 4 * s + walkBob, 16 * s, 3 * s);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-2.5 * s, 3.5 * s + walkBob, 5 * s, 4 * s);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(-1 * s, 4.5 * s + walkBob, 2 * s, 2 * s);

    // D. Masterwork Steel Cuirass (Chestplate)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-8 * s, -8 * s + walkBob, 16 * s, 13 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-7 * s, -7 * s + walkBob, 14 * s, 11 * s);
    ctx.fillStyle = '#475569';
    ctx.fillRect(-5 * s, -6 * s + walkBob, 10 * s, 9 * s);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(-4 * s, -5 * s + walkBob, 8 * s, 4 * s);
    ctx.fillStyle = '#cbd5e1'; // Specular chest highlight
    ctx.fillRect(-3 * s, -5 * s + walkBob, 6 * s, 1.5 * s);

    // Golden Inlaid Arcane Rune Cross on Chest
    const runeGlow = Math.sin(time * 4) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(245, 158, 11, ${runeGlow})`;
    ctx.fillRect(-1.5 * s, -4 * s + walkBob, 3 * s, 7 * s);
    ctx.fillRect(-4.5 * s, -2 * s + walkBob, 9 * s, 3 * s);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(-1 * s, -2 * s + walkBob, 2 * s, 3 * s);

    // E. Segmented Shoulder Pauldrons
    // Left pauldron
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-13 * s, -8 * s + walkBob, 6 * s, 8 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-12.5 * s, -7.5 * s + walkBob, 5 * s, 6.5 * s);
    ctx.fillStyle = '#f59e0b'; // Gold pauldron rim
    ctx.fillRect(-13 * s, -9 * s + walkBob, 6 * s, 2 * s);

    // Right pauldron
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(7 * s, -8 * s + walkBob, 6 * s, 8 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(7.5 * s, -7.5 * s + walkBob, 5 * s, 6.5 * s);
    ctx.fillStyle = '#f59e0b'; // Gold pauldron rim
    ctx.fillRect(7 * s, -9 * s + walkBob, 6 * s, 2 * s);

    // F. Left Arm with Heavy Battle Kite Shield
    const shieldX = -13 * s;
    const shieldY = -2 * s + walkBob;
    ctx.fillStyle = '#0f172a'; // Shield base
    ctx.fillRect(shieldX - 2 * s, shieldY, 8 * s, 16 * s);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(shieldX - 1 * s, shieldY + 1 * s, 6 * s, 14 * s);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(shieldX, shieldY + 2 * s, 4 * s, 12 * s);
    // Shield golden cross crest & rivets
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(shieldX - 1 * s, shieldY + 6 * s, 6 * s, 3 * s);
    ctx.fillRect(shieldX + 1 * s, shieldY + 3 * s, 2 * s, 10 * s);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(shieldX - 1.5 * s, shieldY + 0.5 * s, 1.5 * s, 1.5 * s);
    ctx.fillRect(shieldX + 4.5 * s, shieldY + 0.5 * s, 1.5 * s, 1.5 * s);

    // G. Crusader Full-Plate Great-Helm
    const headY = -20 * s + walkBob;

    // Red flowing helmet plume (Streaming backward)
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(0, headY - 4 * s);
    ctx.quadraticCurveTo(-14 * s - capeWave, headY - 14 * s, -18 * s - capeWave * 1.2, headY - 2 * s);
    ctx.lineTo(-12 * s - capeWave * 0.8, headY - 2 * s);
    ctx.quadraticCurveTo(-8 * s - capeWave * 0.5, headY - 8 * s, 0, headY - 2 * s);
    ctx.closePath();
    ctx.fill();

    // Helmet dome & cheek plates
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-7 * s, headY, 14 * s, 12 * s);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-6.5 * s, headY + 0.5 * s, 13 * s, 11 * s);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(-5 * s, headY + 1 * s, 10 * s, 4 * s);
    ctx.fillStyle = '#cbd5e1'; // Dome specular highlight
    ctx.fillRect(-4 * s, headY + 1 * s, 8 * s, 1.5 * s);

    // Helmet golden winged crest
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-2 * s, headY - 3 * s, 4 * s, 4 * s);
    ctx.fillRect(-4 * s, headY - 2 * s, 8 * s, 2 * s);

    // Menacing Visor Slit
    ctx.fillStyle = '#080a10';
    ctx.fillRect(-6 * s, headY + 5.5 * s, 12 * s, 4 * s);

    // Glowing Cyan Soul Eyes with Energy Smoke Bloom
    ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.fillRect(-5 * s, headY + 5 * s, 10 * s, 5 * s);
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(-4 * s, headY + 6.5 * s, 3.5 * s, 2 * s);
    ctx.fillRect(0.5 * s, headY + 6.5 * s, 3.5 * s, 2 * s);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-3 * s, headY + 7 * s, 1.5 * s, 1 * s);
    ctx.fillRect(1.5 * s, headY + 7 * s, 1.5 * s, 1 * s);

    // H. Right Arm & Legendary Arcane Greatsword
    ctx.save();
    const swordBaseX = 10 * s;
    const swordBaseY = 4 * s + walkBob;
    ctx.translate(swordBaseX, swordBaseY);

    // Sword rotation (held high heroically, or swings on attack)
    const swordAngle = isAttacking ? 1.4 : -0.35 + Math.sin(time * 2) * 0.05;
    ctx.rotate(swordAngle);

    // Greatsword steel blade
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, -3.5 * s, 36 * s, 7 * s);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(1.5 * s, -2.5 * s, 33 * s, 5 * s);

    // Central fuller with glowing cyan runes
    ctx.fillStyle = '#082f49';
    ctx.fillRect(3 * s, -1.2 * s, 28 * s, 2.4 * s);
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(4 * s, -0.8 * s, 26 * s, 1.6 * s);

    // Pulsing traveling rune spark on blade
    const sparkTravel = ((time * 3) % 1) * 22 * s + 4 * s;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sparkTravel, -1 * s, 3 * s, 2 * s);

    // Blade tip bevel
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(36 * s, -3.5 * s);
    ctx.lineTo(41 * s, 0);
    ctx.lineTo(36 * s, 3.5 * s);
    ctx.closePath();
    ctx.fill();

    // Winged Golden Crossguard
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-2 * s, -7 * s, 4 * s, 14 * s);
    ctx.fillRect(-3 * s, -8 * s, 2 * s, 4 * s);
    ctx.fillRect(-3 * s, 4 * s, 2 * s, 4 * s);

    // Glowing Ruby Centerpiece Gem
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-1 * s, -2 * s, 2.5 * s, 4 * s);
    ctx.fillStyle = '#fca5a5';
    ctx.fillRect(-0.5 * s, -1 * s, 1 * s, 1.5 * s);

    // Leather wrapped grip & Heavy pommel
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-8 * s, -1.5 * s, 6 * s, 3 * s);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-11 * s, -3 * s, 3 * s, 6 * s);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-10.5 * s, -1.5 * s, 2 * s, 3 * s);

    // Armored Gauntlet gripping the hilt
    ctx.fillStyle = '#334155';
    ctx.fillRect(-6 * s, -3 * s, 4 * s, 6 * s);
    ctx.fillStyle = '#f59e0b'; // Gold knuckles
    ctx.fillRect(-4 * s, -3 * s, 1.5 * s, 6 * s);

    ctx.restore();
  }

  // --- 2. DETAILED CINEMATIC MAGE ---
  function drawCinematicMage(ctx, s, time, currentScene, isAttacking) {
    const bob = Math.sin(time * 3) * (2 * s);

    // Astral Cape & Flowing Robe
    ctx.fillStyle = '#2e1065';
    ctx.beginPath();
    ctx.moveTo(-10 * s, -4 * s + bob);
    ctx.quadraticCurveTo(-18 * s, 14 * s, -15 * s, 26 * s);
    ctx.lineTo(15 * s, 26 * s);
    ctx.quadraticCurveTo(18 * s, 14 * s, 10 * s, -4 * s + bob);
    ctx.closePath();
    ctx.fill();

    // Robe front
    ctx.fillStyle = '#581c87';
    ctx.fillRect(-8 * s, -6 * s + bob, 16 * s, 30 * s);
    ctx.fillStyle = '#9333ea';
    ctx.fillRect(-6 * s, -4 * s + bob, 12 * s, 26 * s);

    // Gold constellation trim
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-1 * s, -4 * s + bob, 2 * s, 26 * s);
    ctx.fillRect(-5 * s, 8 * s + bob, 10 * s, 2 * s);

    // Deep Mystic Hood
    const headY = -18 * s + bob;
    ctx.fillStyle = '#3b0764';
    ctx.beginPath();
    ctx.moveTo(0, headY - 6 * s);
    ctx.lineTo(-8 * s, headY + 8 * s);
    ctx.lineTo(8 * s, headY + 8 * s);
    ctx.closePath();
    ctx.fill();

    // Dark interior hood & glowing purple eyes
    ctx.fillStyle = '#05030a';
    ctx.fillRect(-5 * s, headY + 1 * s, 10 * s, 6 * s);
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(-3 * s, headY + 3 * s, 2 * s, 2 * s);
    ctx.fillRect(1 * s, headY + 3 * s, 2 * s, 2 * s);

    // Arcane Staff with floating crystal
    ctx.fillStyle = '#78350f';
    ctx.fillRect(12 * s, -24 * s + bob, 3 * s, 48 * s);
    // Floating mana crystal
    const crystalFloat = Math.sin(time * 5) * 3;
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.moveTo(13.5 * s, -30 * s + bob + crystalFloat);
    ctx.lineTo(10 * s, -24 * s + bob + crystalFloat);
    ctx.lineTo(13.5 * s, -18 * s + bob + crystalFloat);
    ctx.lineTo(17 * s, -24 * s + bob + crystalFloat);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e9d5ff';
    ctx.fillRect(12 * s, -25 * s + bob + crystalFloat, 3 * s, 3 * s);
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

    // Leather vest & belt
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(-7 * s, -5 * s + bob, 14 * s, 20 * s);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(-6 * s, -2 * s + bob, 12 * s, 4 * s);

    // Cowl & Mask
    const headY = -16 * s + bob;
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(-6 * s, headY, 12 * s, 10 * s);
    ctx.fillStyle = '#022c22'; // Mask
    ctx.fillRect(-5 * s, headY + 4 * s, 10 * s, 6 * s);

    // Venom green eyes
    ctx.fillStyle = '#34d399';
    ctx.fillRect(-4 * s, headY + 3 * s, 3 * s, 1.5 * s);
    ctx.fillRect(1 * s, headY + 3 * s, 3 * s, 1.5 * s);

    // Dual Daggers (Left and Right)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-13 * s, 2 * s + bob, 3 * s, 12 * s);
    ctx.fillRect(10 * s, 2 * s + bob, 3 * s, 12 * s);
    // Green poison edge
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
    }, 900);
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
    }, 400);
  };

  const handleEnableAudio = () => {
    startAmbientDungeon();
    playUiClick();
    setAudioPromptVisible(false);
  };

  return (
    <div
      onClick={triggerSlash}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080a0f] text-white transition-opacity duration-700 select-none overflow-hidden cursor-crosshair ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Interactive Animation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pixelated" />

      {/* Top Bar: Skip & Sound Enable */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        {audioPromptVisible && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleEnableAudio();
            }}
            className="px-3 py-1.5 bg-[#182030]/90 border border-[#f59e0b] text-[#fde047] font-pixel text-[9px] tracking-wider hover:bg-[#b45309] hover:text-white transition-all shadow-[0_0_12px_rgba(245,158,11,0.3)] cursor-pointer"
          >
            🔊 ENABLE AUDIO
          </button>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          onMouseEnter={playUiHover}
          className="px-3 py-1.5 bg-[#0f172a]/90 border border-[#3b4b66] text-[#94a3b8] font-pixel text-[9px] tracking-widest hover:border-[#f8fafc] hover:text-white transition-all cursor-pointer"
        >
          SKIP [ESC] ⏭
        </button>
      </div>

      {/* Narrative Overlays according to Scene */}
      <div className="relative z-20 flex flex-col items-center justify-center max-w-2xl px-6 text-center pointer-events-none">
        {scene === 1 && (
          <div className="animate-fade-in flex flex-col items-center">
            <h1 className="font-pixel text-lg sm:text-2xl text-[#f8fafc] tracking-widest leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] animate-pulse">
              THE DUNGEON REMEMBERS...
            </h1>
            <p className="font-outfit text-sm text-[#94a3b8] mt-4 tracking-wider">
              Deep within the forgotten catacombs, a blade stirs in the dark.
            </p>
          </div>
        )}

        {scene === 2 && (
          <div className="animate-fade-in flex flex-col items-center">
            <span className="font-pixel text-[10px] text-[#f59e0b] tracking-widest uppercase mb-3">
              ✦ Flame in the Void ✦
            </span>
            <p className="font-pixel text-xs sm:text-sm text-[#e2e8f0] tracking-wider leading-loose drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              A single torch flickers against the encroaching shadows.
            </p>
          </div>
        )}

        {scene === 3 && (
          <div className="animate-fade-in flex flex-col items-center">
            <span className="font-pixel text-[10px] text-[#38bdf8] tracking-widest uppercase mb-2">
              Depths Unveiled
            </span>
            <h2 className="font-pixel text-sm sm:text-base text-[#f8fafc] tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              THE LABYRINTH STRETCHES 50 FLOORS DEEP
            </h2>
          </div>
        )}

        {scene === 4 && (
          <div className="animate-fade-in flex flex-col items-center">
            <p className="font-pixel text-xs sm:text-sm text-[#fde047] tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-2">
              A CHAMPION STEPS FORWARD.
            </p>
            <span className="font-pixel text-[8px] text-[#64748b] tracking-wider">
              [ KLIK ATAU TEKAN SPASI UNTUK MENGAYUNKAN PEDANG ]
            </span>
          </div>
        )}

        {scene >= 5 && (
          <div className="flex flex-col items-center animate-fade-in pointer-events-auto">
            {/* Title & Subtitle */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-[#f59e0b]" />
              <span className="font-pixel text-[10px] text-[#f59e0b] tracking-widest uppercase">
                Dark Fantasy Action RPG
              </span>
              <span className="w-6 h-0.5 bg-[#f59e0b]" />
            </div>

            <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-[#f8fafc] tracking-widest my-2 drop-shadow-[0_0_24px_rgba(245,158,11,0.6)]">
              ARC SLASH
            </h1>

            <p className="font-outfit text-sm sm:text-base text-[#cbd5e1] max-w-md tracking-wider mb-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Enter the dungeon. Master your blade. Face the darkness.
            </p>

            {/* Interactive Hero Class Selector in Intro */}
            <div className="flex items-center gap-2 mb-6">
              {[
                { id: 'knight', label: 'KNIGHT ⚔️', color: '#f59e0b' },
                { id: 'mage', label: 'MAGE 🔮', color: '#c084fc' },
                { id: 'assassin', label: 'ASSASSIN 🗡️', color: '#34d399' }
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playUiClick();
                    setSelectedClass(c.id);
                  }}
                  className={`px-3 py-1 font-pixel text-[8px] tracking-wider border transition-all cursor-pointer ${
                    selectedClass === c.id
                      ? 'bg-[#1e293b] shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      : 'bg-[#111622] border-[#2c394b] text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                  style={{
                    borderColor: selectedClass === c.id ? c.color : undefined,
                    color: selectedClass === c.id ? c.color : undefined
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Interactive Enter Button */}
            <PixelButton
              variant="primary"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                handleEnterDungeon();
              }}
              className="animate-bounce"
            >
              [ ENTER THE DUNGEON ]
            </PixelButton>

            <span className="font-pixel text-[8.5px] text-[#64748b] mt-4 tracking-widest">
              PRESS ENTER ATAU KLIK UNTUK MASUK • KLIK KARAKTER UNTUK TEBASAN
            </span>
          </div>
        )}
      </div>

      {/* Bottom Scene Indicator Dots */}
      <div className="absolute bottom-6 flex items-center gap-3 z-30">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setScene(s);
            }}
            aria-label={`Jump to scene ${s}`}
            className={`w-2.5 h-2.5 transition-all duration-300 cursor-pointer ${
              scene === s
                ? 'bg-[#f59e0b] shadow-[0_0_8px_#f59e0b] scale-125'
                : 'bg-[#334155] hover:bg-[#64748b]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
