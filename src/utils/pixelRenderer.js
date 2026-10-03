// Procedural 16-Bit Pixel Art Renderer for Parallel Dungeons
// Faithful to the mathematical Canvas 2D routines in Parallel Dungeons (ARC-SLASH-ARPG)

/**
 * Draw a Hero (Knight, Mage, Assassin) with animated idle/attack states
 */
/**
 * Helper to draw a glowing crescent slash arc
 */
function drawSlashArc(ctx, cx, cy, radius, startAngle, endAngle, outerColor, innerColor, edgeColor, lineWidth) {
  ctx.save();
  ctx.lineCap = 'round';

  // 1. Broad outer atmospheric blur/glow
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.strokeStyle = outerColor;
  ctx.lineWidth = lineWidth * 2.2;
  ctx.stroke();

  // 2. Core glowing slash wave
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.strokeStyle = innerColor;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  // 3. Razor-sharp white cutting edge
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.strokeStyle = edgeColor;
  ctx.lineWidth = Math.max(1.5, lineWidth * 0.35);
  ctx.stroke();

  ctx.restore();
}

/**
 * Helper to draw rotating arcane magic circle / sigil
 */
function drawMagicSigil(ctx, cx, cy, radius, time, ringColor, innerColor, coreColor) {
  ctx.save();
  ctx.translate(cx, cy);

  // Outer glowing ring
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Rotating inner square/diamond
  const rot = time * 3;
  ctx.save();
  ctx.rotate(rot);
  ctx.strokeStyle = innerColor;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-radius * 0.65, -radius * 0.65, radius * 1.3, radius * 1.3);
  ctx.rotate(Math.PI / 4);
  ctx.strokeRect(-radius * 0.65, -radius * 0.65, radius * 1.3, radius * 1.3);
  ctx.restore();

  // 4 Cardinal runic points
  ctx.fillStyle = ringColor;
  for (let i = 0; i < 4; i++) {
    const a = rot + (i * Math.PI) / 2;
    ctx.fillRect(Math.cos(a) * radius - 1.5, Math.sin(a) * radius - 1.5, 3, 3);
  }

  // Pulsing core
  ctx.fillStyle = coreColor;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Draw a Hero (Knight, Mage, Assassin) with animated idle/attack states
 */
export function drawHeroCanvas(ctx, role, width, height, options = {}) {
  const {
    time = Date.now() * 0.005,
    isAttacking = false,
    attackProgress = 0,
    combo = 0,
    facing = 'right',
    scale = 3,
    hasGlow = true
  } = options;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.imageSmoothingEnabled = false;

  // Resolve attack progress: if isAttacking but attackProgress is 0, synthesize a cyclic progress
  const progress = isAttacking ? (attackProgress > 0 ? attackProgress : Math.min(1, ((time * 2.5) % 1))) : 0;
  const dir = facing === 'left' ? -1 : 1;

  // Center coordinate - bias slightly towards opposite of facing to leave ample room for forward slash/projectiles
  const cx = facing === 'left' ? width * 0.54 : width * 0.46;
  const cy = height / 2 + 10;
  const pw = 20 * scale;
  const ph = 24 * scale;

  // Calculate dynamic root lunge offset for shadow & sprite
  let rootLungeX = 0;
  let rootLungeY = 0;

  if (isAttacking) {
    if (role === 'knight') {
      if (progress < 0.22) {
        rootLungeX = -2.5 * scale * dir * Math.sin((progress / 0.22) * Math.PI * 0.5);
      } else if (progress < 0.65) {
        const st = (progress - 0.22) / 0.43;
        rootLungeX = Math.sin(st * Math.PI * 0.85) * 6.5 * scale * dir;
        rootLungeY = Math.sin(st * Math.PI) * 1.5 * scale;
      } else {
        const rt = (progress - 0.65) / 0.35;
        rootLungeX = (1 - rt) * 3 * scale * dir;
      }
    } else if (role === 'mage') {
      if (progress < 0.25) {
        rootLungeY = -6 * scale * Math.sin((progress / 0.25) * Math.PI * 0.5);
      } else if (progress < 0.70) {
        const st = (progress - 0.25) / 0.45;
        rootLungeX = Math.sin(st * Math.PI) * 3.5 * scale * dir;
        rootLungeY = -6 * scale * (1 - st * 0.4);
      } else {
        const rt = (progress - 0.70) / 0.30;
        rootLungeY = -3.6 * scale * (1 - rt);
      }
    } else if (role === 'assassin') {
      if (progress < 0.18) {
        rootLungeY = 2 * scale * (progress / 0.18);
      } else if (progress < 0.65) {
        const st = (progress - 0.18) / 0.47;
        rootLungeX = Math.sin(st * Math.PI * 0.9) * 8.5 * scale * dir;
      } else {
        const rt = (progress - 0.65) / 0.35;
        rootLungeX = (1 - rt) * 3.5 * scale * dir;
      }
    }
  }

  const px = cx - pw / 2 + rootLungeX;
  const py = cy - ph / 2 + rootLungeY;

  // Contact Shadow (moves with rootLungeX, shrinks when airborne)
  const shadowAlpha = role === 'mage' && rootLungeY < -2 ? 0.25 : 0.4;
  const shadowScale = role === 'mage' && rootLungeY < -2 ? 0.75 : 1.0;
  ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
  ctx.beginPath();
  ctx.ellipse(cx + rootLungeX, cy + ph / 2 + 2, (pw * 0.55) * shadowScale, (6 * scale * 0.4) * shadowScale, 0, 0, Math.PI * 2);
  ctx.fill();

  // Subtle role aura glow
  if (hasGlow) {
    const pulse = Math.sin(time * 2) * 0.15 + 0.25;
    const glowColor = role === 'mage' ? 'rgba(168, 85, 247, ' : role === 'assassin' ? 'rgba(16, 185, 129, ' : 'rgba(59, 130, 246, ';
    const grad = ctx.createRadialGradient(cx + rootLungeX, cy + rootLungeY, 10, cx + rootLungeX, cy + rootLungeY, pw * 1.25);
    grad.addColorStop(0, glowColor + (isAttacking ? pulse + 0.25 : pulse) + ')');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx + rootLungeX, cy + rootLungeY, pw * 1.25, 0, Math.PI * 2);
    ctx.fill();
  }

  if (role === 'mage') {
    drawMageProcedural(ctx, px, py, pw, ph, scale, time, isAttacking, facing, progress, combo);
  } else if (role === 'assassin') {
    drawAssassinProcedural(ctx, px, py, pw, ph, scale, time, isAttacking, facing, progress, combo);
  } else {
    drawKnightProcedural(ctx, px, py, pw, ph, scale, time, isAttacking, facing, progress, combo);
  }

  ctx.restore();
}

// 1. KNIGHT
function drawKnightProcedural(ctx, px, py, pw, ph, s, time, isAttacking, facing, progress = 0, combo = 0) {
  const dir = facing === 'left' ? -1 : 1;
  const wave = Math.sin(time) * 3 * s;
  const headY = py - 4 * s;

  // Attack kinematics & angles
  let swordRot = dir === -1 ? -0.4 : 0.4;
  let bodyLean = 0;
  let stepOffset = 0;
  let isCleaving = false;
  let cleaveT = 0;

  if (isAttacking) {
    if (progress < 0.22) {
      // Windup: sword cocks back high behind head
      const t = progress / 0.22;
      bodyLean = -0.1 * dir * t;
      const startRot = dir === -1 ? -0.4 : 0.4;
      const windupRot = dir === -1 ? 1.8 : -1.8;
      swordRot = startRot + (windupRot - startRot) * t;
    } else if (progress < 0.65) {
      // Cleave strike: explosive slash downward
      isCleaving = true;
      cleaveT = (progress - 0.22) / 0.43;
      const st = Math.pow(cleaveT, 0.55);
      bodyLean = 0.16 * dir * Math.sin(cleaveT * Math.PI);
      stepOffset = 3.5 * s * dir * Math.sin(cleaveT * Math.PI);
      const startRot = dir === -1 ? 1.8 : -1.8;
      const endRot = dir === -1 ? -2.0 : 2.0;
      swordRot = startRot + (endRot - startRot) * st;
    } else {
      // Recovery: blade returns to ready stance
      const t = (progress - 0.65) / 0.35;
      bodyLean = 0.1 * dir * (1 - t);
      const startRot = dir === -1 ? -2.0 : 2.0;
      const endRot = dir === -1 ? -0.4 : 0.4;
      swordRot = startRot + (endRot - startRot) * t;
    }
  }

  // Flowing Crimson Cape (flutters violently backward during attack)
  const capeWave = isAttacking ? wave - 6 * s * dir : wave;
  ctx.fillStyle = '#7f1d1d';
  ctx.beginPath();
  if (facing === 'left') {
    ctx.moveTo(px + pw - 4 * s, py + 8 * s);
    ctx.quadraticCurveTo(px + pw + 13 * s + capeWave, py + ph / 2, px + pw + 9 * s + capeWave * 0.5, py + ph + 6 * s);
    ctx.lineTo(px + pw - 6 * s, py + ph + 3 * s);
  } else {
    ctx.moveTo(px + 4 * s, py + 8 * s);
    ctx.quadraticCurveTo(px - 13 * s - capeWave, py + ph / 2, px - 9 * s - capeWave * 0.5, py + ph + 6 * s);
    ctx.lineTo(px + 6 * s, py + ph + 3 * s);
  }
  ctx.closePath();
  ctx.fill();

  // Cape highlight & golden trim
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.2 * s;
  ctx.stroke();

  // Armored Sabatons (Boots) - front boot steps forward in martial stance during cleave
  const leftBootX = px + 3 * s + (facing === 'left' ? stepOffset : 0);
  const rightBootX = px + pw - 9 * s + (facing === 'right' ? stepOffset : 0);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(leftBootX, py + ph - 6 * s, 6 * s, 6 * s);
  ctx.fillRect(rightBootX, py + ph - 6 * s, 6 * s, 6 * s);
  ctx.fillStyle = '#475569';
  ctx.fillRect(leftBootX + 1 * s, py + ph - 6 * s, 4 * s, 3 * s);
  ctx.fillRect(rightBootX + 1 * s, py + ph - 6 * s, 4 * s, 3 * s);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(leftBootX + 1 * s, py + ph - 3 * s, 4 * s, 1.5 * s);
  ctx.fillRect(rightBootX + 1 * s, py + ph - 3 * s, 4 * s, 1.5 * s);

  // Steel Cuirass (Breastplate)
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 2 * s, py + 6 * s, pw - 4 * s, ph - 11 * s);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 4 * s, py + 7 * s, pw - 8 * s, ph - 13 * s);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px + 5 * s, py + 8 * s, pw - 10 * s, 5 * s);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px + 6 * s, py + 8 * s, pw - 12 * s, 2 * s);

  // Golden Inlaid Chest Crest
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px + pw / 2 - 2 * s, py + 9 * s, 4 * s, 5 * s);
  ctx.fillRect(px + pw / 2 - 4 * s, py + 10 * s, 8 * s, 2 * s);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px + pw / 2 - 1 * s, py + 10 * s, 2 * s, 2 * s);

  // Shoulder Pauldrons
  ctx.fillStyle = '#475569';
  ctx.fillRect(px - 1 * s, py + 6 * s, 4 * s, 5 * s);
  ctx.fillRect(px + pw - 3 * s, py + 6 * s, 4 * s, 5 * s);
  ctx.fillStyle = '#f59e0b'; // Pauldron gold rims
  ctx.fillRect(px - 1 * s, py + 5 * s, 4 * s, 1.5 * s);
  ctx.fillRect(px + pw - 3 * s, py + 5 * s, 4 * s, 1.5 * s);

  // Gold belt & buckle
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px + 2 * s, py + ph - 9 * s, pw - 4 * s, 3 * s);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px + pw / 2 - 3 * s, py + ph - 9 * s, 6 * s, 3 * s);
  ctx.fillStyle = '#fde68a';
  ctx.fillRect(px + pw / 2 - 1 * s, py + ph - 8 * s, 2 * s, 1 * s);

  // Left Arm & Kite Shield (shield pulls back slightly during strike to brace)
  const shieldPull = isCleaving ? -2 * s * dir : 0;
  const sx = (facing === 'left' ? px + pw - 4 * s : px - 5 * s) + shieldPull;
  const sy = py + 7 * s;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(sx, sy, 6 * s, 11 * s);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(sx + 1 * s, sy + 1 * s, 4 * s, 9 * s);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(sx + 2 * s, sy + 2 * s, 2 * s, 7 * s);
  ctx.fillStyle = '#f59e0b'; // Shield crest
  ctx.fillRect(sx + 1 * s, sy + 4 * s, 4 * s, 2 * s);

  // Crusader Helmet Dome
  ctx.fillStyle = '#dc2626'; // Red Plume
  ctx.beginPath();
  ctx.ellipse(px + pw / 2, headY - 4 * s, 3.5 * s, 6 * s, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 2 * s, headY, pw - 4 * s, 11 * s);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px + 3 * s, headY, pw - 6 * s, 3 * s);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(px + 4 * s, headY, pw - 8 * s, 1.5 * s);
  ctx.fillStyle = '#0a0d14'; // Visor slit background
  ctx.fillRect(px + 3 * s, headY + 5 * s, pw - 6 * s, 4 * s);

  // Glowing Cyan Eye Slits with Bloom (flare bright cyan during strike)
  const eyeX = facing === 'left' ? px + 4 * s : px + 10 * s;
  const eyeAlpha = isCleaving ? 0.8 : 0.4;
  ctx.fillStyle = `rgba(56, 189, 248, ${eyeAlpha})`;
  ctx.fillRect(eyeX - 1 * s, headY + 5 * s, 6 * s, 4 * s);
  ctx.fillStyle = '#00e5ff';
  ctx.fillRect(eyeX, headY + 6 * s, 4 * s, 2 * s);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(eyeX + 1 * s, headY + 6.5 * s, 2 * s, 1 * s);

  // Sword Blade & Pivot
  ctx.save();
  const swordX = facing === 'left' ? px + 2 * s : px + pw - 2 * s;
  const swordY = py + 12 * s;
  ctx.translate(swordX, swordY);
  ctx.rotate(swordRot);

  // Blade steel with edge gleam
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, -2.5 * s, 25 * s, 5 * s);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(1 * s, -1.5 * s, 22 * s, 3 * s);
  ctx.fillStyle = isCleaving ? '#38bdf8' : '#00e5ff'; // Runic fuller
  ctx.fillRect(3 * s, -1 * s, 17 * s, 2 * s);
  ctx.fillStyle = '#ffffff'; // Pulsing rune core
  const runePulseX = (Math.sin(time * 6) * 0.5 + 0.5) * 12 * s + 3 * s;
  ctx.fillRect(runePulseX, -0.5 * s, 3.5 * s, 1 * s);

  // Crossguard & Pommel
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(-2 * s, -6 * s, 3.5 * s, 12 * s);
  ctx.fillStyle = '#ef4444'; // Ruby center
  ctx.fillRect(-1 * s, -1.5 * s, 2 * s, 3 * s);
  ctx.fillStyle = '#78350f'; // Grip
  ctx.fillRect(-6 * s, -1.5 * s, 4 * s, 3 * s);
  ctx.fillStyle = '#cbd5e1'; // Pommel
  ctx.fillRect(-8 * s, -2.5 * s, 2.5 * s, 5 * s);

  ctx.restore();

  // --- VISUAL CRESCENT ARC SLASH TRAIL (VFX) ---
  if (isCleaving && cleaveT > 0.15 && cleaveT < 0.95) {
    const arcRadius = 24 * s;
    let arcStart, arcEnd;

    if (facing === 'right') {
      arcStart = -1.8;
      arcEnd = Math.min(2.1, swordRot);
    } else {
      arcStart = 1.8;
      arcEnd = Math.max(-2.1, swordRot);
    }

    drawSlashArc(
      ctx,
      swordX,
      swordY,
      arcRadius,
      arcStart,
      arcEnd,
      'rgba(0, 229, 255, 0.35)',
      '#00e5ff',
      '#ffffff',
      4 * s
    );

    // Golden secondary edge glow
    drawSlashArc(
      ctx,
      swordX,
      swordY,
      arcRadius - 1.5 * s,
      arcStart,
      arcEnd,
      'rgba(245, 158, 11, 0.25)',
      '#fde047',
      '#ffffff',
      2 * s
    );

    // Tip impact sparks & burst
    if (cleaveT > 0.35 && cleaveT < 0.85) {
      const tipX = swordX + Math.cos(swordRot) * 25 * s;
      const tipY = swordY + Math.sin(swordRot) * 25 * s;

      // Flying slash sparks
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(tipX + dir * 3 * s, tipY - 2 * s, 3 * s, 3 * s);
      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(tipX + dir * 6 * s, tipY + 1 * s, 2.5 * s, 2.5 * s);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(tipX + dir * 8 * s, tipY - 4 * s, 2 * s, 2 * s);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(tipX + dir * 5 * s, tipY + 4 * s, 2 * s, 2 * s);

      // Impact star flash (+)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(tipX - 1 * s, tipY - 4 * s, 2 * s, 8 * s);
      ctx.fillRect(tipX - 4 * s, tipY - 1 * s, 8 * s, 2 * s);
    }
  }
}

// 2. MAGE
function drawMageProcedural(ctx, px, py, pw, ph, s, time, isAttacking, facing, progress = 0, combo = 0) {
  const dir = facing === 'left' ? -1 : 1;
  const wave = Math.sin(time) * 2.5 * s;
  const headY = py - 4 * s;

  let staffAngle = dir === -1 ? -0.3 : 0.3;
  let isCasting = false;
  let castT = 0;

  if (isAttacking) {
    if (progress < 0.25) {
      // Windup / Levitation: staff raises high
      const t = progress / 0.25;
      const startAngle = dir === -1 ? -0.3 : 0.3;
      const raiseAngle = dir === -1 ? 0.75 : -0.75;
      staffAngle = startAngle + (raiseAngle - startAngle) * t;
    } else if (progress < 0.72) {
      // Cast burst: staff thrusts forward
      isCasting = true;
      castT = (progress - 0.25) / 0.47;
      staffAngle = dir === -1 ? -1.15 : 1.15;
    } else {
      // Recovery: staff floats back down
      const t = (progress - 0.72) / 0.28;
      const startAngle = dir === -1 ? -1.15 : 1.15;
      const endAngle = dir === -1 ? -0.3 : 0.3;
      staffAngle = startAngle + (endAngle - startAngle) * t;
    }
  }

  // Astral Robe Back (billows wider during magic cast)
  const robeExpansion = isAttacking ? 3 * s : 0;
  ctx.fillStyle = '#4c1d95';
  ctx.beginPath();
  ctx.moveTo(px + 2 * s, py + 8 * s);
  ctx.quadraticCurveTo(px - (5 * s + robeExpansion) + wave, py + ph + 8 * s, px + 2 * s, py + ph + 9 * s);
  ctx.lineTo(px + pw - 2 * s, py + ph + 9 * s);
  ctx.quadraticCurveTo(px + pw + (5 * s + robeExpansion) - wave, py + ph + 8 * s, px + pw - 2 * s, py + 8 * s);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = isCasting ? '#f472b6' : '#c084fc';
  ctx.lineWidth = 1 * s;
  ctx.stroke();

  // Slippers
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px + 4 * s, py + ph - 4 * s, 5 * s, 4 * s);
  ctx.fillRect(px + pw - 9 * s, py + ph - 4 * s, 5 * s, 4 * s);

  // Robe body
  ctx.fillStyle = '#312e81';
  ctx.fillRect(px + 3 * s, py + 8 * s, pw - 6 * s, ph - 11 * s);
  ctx.fillStyle = '#6366f1';
  ctx.fillRect(px + pw / 2 - 3 * s, py + 9 * s, 6 * s, ph - 12 * s);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px + pw / 2 - 1 * s, py + 12 * s, 2 * s, 4 * s);

  // Floating Mana Orb (offhand - orbits rapidly during cast)
  const orbSpeed = isAttacking ? 8 : 3;
  const orbDist = isAttacking ? 5 * s : 3 * s;
  const orbX = (facing === 'left' ? px + pw + 3 * s : px - 6 * s) + Math.cos(time * orbSpeed) * orbDist;
  const orbY = py + 10 * s + Math.sin(time * orbSpeed) * orbDist;

  // Mana orb aura
  ctx.fillStyle = isCasting ? 'rgba(244, 114, 182, 0.5)' : 'rgba(168, 85, 247, 0.4)';
  ctx.beginPath();
  ctx.arc(orbX, orbY, 6 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = isCasting ? '#f472b6' : '#a855f7';
  ctx.beginPath();
  ctx.arc(orbX, orbY, 4 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(orbX - 1 * s, orbY - 1 * s, 1.5 * s, 0, Math.PI * 2);
  ctx.fill();

  // Shadow Face
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px + 3 * s, headY + 3 * s, pw - 6 * s, 8 * s);

  // Glowing Purple Eyes (flares intensely during cast)
  const eyeX = facing === 'left' ? px + 4 * s : px + 10 * s;
  if (isCasting) {
    ctx.fillStyle = 'rgba(244, 114, 182, 0.6)';
    ctx.fillRect(eyeX - 1 * s, headY + 4 * s, 5 * s, 4 * s);
  }
  ctx.fillStyle = isCasting ? '#ffffff' : '#c084fc';
  ctx.fillRect(eyeX, headY + 5 * s, 3 * s, 2 * s);

  // Wizard Hat Brim
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px - 2 * s, headY + 3 * s, pw + 4 * s, 2 * s);

  // Wizard Hat Cone
  ctx.fillStyle = '#581c87';
  ctx.beginPath();
  ctx.moveTo(px, headY + 3 * s);
  ctx.lineTo(px + pw, headY + 3 * s);
  ctx.lineTo(px + pw / 2 - 2 * s, headY - 11 * s);
  ctx.lineTo(px + pw / 2 - 5 * s, headY - 9 * s);
  ctx.closePath();
  ctx.fill();

  // Magic Staff
  ctx.save();
  const staffX = facing === 'left' ? px + 2 * s : px + pw - 2 * s;
  const staffY = py + 11 * s;
  ctx.translate(staffX, staffY);
  ctx.rotate(staffAngle);

  // Wood shaft
  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, -18 * s, 2.5 * s, 30 * s);

  // Staff Headpiece Frame
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(-1 * s, -22 * s, 4.5 * s, 4 * s);

  // Crystal Headpiece (flares with intense radial burst during attack)
  const crystalGlowRad = isCasting ? 10 * s : (5 * s + Math.sin(time * 4) * 1.5 * s);
  ctx.fillStyle = isCasting ? 'rgba(244, 114, 182, 0.5)' : 'rgba(192, 132, 252, 0.4)';
  ctx.beginPath();
  ctx.arc(1.25 * s, -20 * s, crystalGlowRad, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = isCasting ? '#f472b6' : '#c084fc';
  ctx.beginPath();
  ctx.arc(1.25 * s, -20 * s, 5 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(1.25 * s, -20 * s, 2.5 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // --- ARCANE SUMMONING SIGIL & COSMIC MISSILE BURST (VFX) ---
  if (isCasting && castT > 0.1 && castT < 0.95) {
    const tipGlobalX = staffX + Math.cos(staffAngle - Math.PI / 2) * 20 * s;
    const tipGlobalY = staffY + Math.sin(staffAngle - Math.PI / 2) * 20 * s;

    // 1. Rotating Arcane Sigil
    const sigilX = tipGlobalX + dir * 6 * s;
    const sigilY = tipGlobalY;
    drawMagicSigil(ctx, sigilX, sigilY, 11 * s, time, '#c084fc', '#f472b6', '#ffffff');

    // 2. Arcane Missile Projectile surge
    const beamDist = castT * 60 * s;
    const projX = sigilX + dir * beamDist;
    const projY = sigilY;

    // Trailing plasma beam
    ctx.save();
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
    ctx.lineWidth = 8 * s;
    ctx.beginPath();
    ctx.moveTo(sigilX, sigilY);
    ctx.lineTo(projX, projY);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5 * s;
    ctx.beginPath();
    ctx.moveTo(sigilX, sigilY);
    ctx.lineTo(projX, projY);
    ctx.stroke();
    ctx.restore();

    // Piercing Comet Head
    ctx.fillStyle = 'rgba(232, 121, 249, 0.6)';
    ctx.beginPath();
    ctx.arc(projX, projY, 8 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.arc(projX, projY, 5 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(projX, projY, 3 * s, 0, Math.PI * 2);
    ctx.fill();

    // Magic spark particles
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(projX - dir * 6 * s, projY - 4 * s, 2 * s, 2 * s);
    ctx.fillRect(projX - dir * 10 * s, projY + 3 * s, 2.5 * s, 2.5 * s);
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(projX - dir * 14 * s, projY - 2 * s, 2 * s, 2 * s);
  }
}

// 3. ASSASSIN
function drawAssassinProcedural(ctx, px, py, pw, ph, s, time, isAttacking, facing, progress = 0, combo = 0) {
  const dir = facing === 'left' ? -1 : 1;
  const wave = Math.sin(time) * 3 * s;
  const headY = py - 4 * s;

  let d1Rot = dir === -1 ? -0.5 : 0.5;
  let d2Rot = dir === -1 ? 0.4 : -0.4;
  let isCleaving = false;
  let cleaveT = 0;

  if (isAttacking) {
    if (progress < 0.18) {
      // Windup / Stealth Coil
      const t = progress / 0.18;
      d1Rot = dir === -1 ? (0.5 - 2.0 * t) : (-0.5 + 2.0 * t);
      d2Rot = dir === -1 ? (-0.4 + 2.0 * t) : (0.4 - 2.0 * t);
    } else if (progress < 0.65) {
      // Scissor Cleave: dual daggers cross in explosive X-cleave
      isCleaving = true;
      cleaveT = (progress - 0.18) / 0.47;
      const st = Math.pow(cleaveT, 0.55);

      // Dagger 1 slashes downward
      const start1 = dir === -1 ? 1.5 : -1.5;
      const end1 = dir === -1 ? -1.7 : 1.7;
      d1Rot = start1 + (end1 - start1) * st;

      // Dagger 2 slashes upward
      const start2 = dir === -1 ? -1.6 : 1.6;
      const end2 = dir === -1 ? 1.4 : -1.4;
      d2Rot = start2 + (end2 - start2) * st;
    } else {
      // Recovery: daggers return to stealth guard
      const t = (progress - 0.65) / 0.35;
      const start1 = dir === -1 ? -1.7 : 1.7;
      const end1 = dir === -1 ? -0.5 : 0.5;
      d1Rot = start1 + (end1 - start1) * t;

      const start2 = dir === -1 ? 1.4 : -1.4;
      const end2 = dir === -1 ? 0.4 : -0.4;
      d2Rot = start2 + (end2 - start2) * t;
    }
  }

  // --- SHADOW AFTERIMAGE (GHOST SILHOUETTE) DURING DASH ---
  if (isCleaving && cleaveT > 0.15 && cleaveT < 0.85) {
    const ghostOffset = -dir * 8 * s;
    ctx.save();
    ctx.globalAlpha = 0.35 * (1 - cleaveT);
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(px + ghostOffset, py + 4 * s, pw, ph - 4 * s);
    ctx.fillStyle = '#34d399';
    const ghostEyeX = facing === 'left' ? px + ghostOffset + 4 * s : px + ghostOffset + 10 * s;
    ctx.fillRect(ghostEyeX, headY + 5 * s, 4 * s, 2 * s);
    ctx.restore();
  }

  // Agile Scarf / Shadow Cloak (whips back with speed)
  const scarfWave = isAttacking ? wave - 7 * s * dir : wave;
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  if (facing === 'left') {
    ctx.moveTo(px + pw - 2 * s, py + 6 * s);
    ctx.quadraticCurveTo(px + pw + 14 * s + scarfWave, py + 12 * s, px + pw + 9 * s, py + ph + 4 * s);
    ctx.lineTo(px + pw - 4 * s, py + ph - 2 * s);
  } else {
    ctx.moveTo(px + 2 * s, py + 6 * s);
    ctx.quadraticCurveTo(px - 14 * s - scarfWave, py + 12 * s, px - 9 * s, py + ph + 4 * s);
    ctx.lineTo(px + 4 * s, py + ph - 2 * s);
  }
  ctx.closePath();
  ctx.fill();

  // Tabi Boots
  ctx.fillStyle = '#09090b';
  ctx.fillRect(px + 4 * s, py + ph - 6 * s, 5 * s, 6 * s);
  ctx.fillRect(px + pw - 9 * s, py + ph - 6 * s, 5 * s, 6 * s);
  ctx.fillStyle = '#10b981';
  ctx.fillRect(px + 4 * s, py + ph - 6 * s, 5 * s, 2 * s);
  ctx.fillRect(px + pw - 9 * s, py + ph - 6 * s, 5 * s, 2 * s);

  // Stealth Leather Vest
  ctx.fillStyle = '#18181b';
  ctx.fillRect(px + 3 * s, py + 8 * s, pw - 6 * s, ph - 13 * s);
  ctx.fillStyle = '#27272a';
  ctx.fillRect(px + 5 * s, py + 9 * s, pw - 10 * s, ph - 15 * s);
  // Emerald crossed harness
  ctx.fillStyle = '#10b981';
  ctx.fillRect(px + 4 * s, py + 10 * s, 2 * s, 8 * s);
  ctx.fillRect(px + pw - 6 * s, py + 10 * s, 2 * s, 8 * s);

  // Shadow Cowl Hood
  ctx.fillStyle = '#09090b';
  ctx.beginPath();
  ctx.ellipse(px + pw / 2, headY + 3 * s, pw * 0.45, 6 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#18181b';
  ctx.fillRect(px + 3 * s, headY + 2 * s, pw - 6 * s, 9 * s);

  // Glowing Emerald Eyes (flares brightly during attack)
  const eyeX = facing === 'left' ? px + 4 * s : px + 10 * s;
  if (isCleaving) {
    ctx.fillStyle = 'rgba(52, 211, 153, 0.6)';
    ctx.fillRect(eyeX - 1 * s, headY + 4 * s, 6 * s, 4 * s);
  }
  ctx.fillStyle = '#34d399';
  ctx.fillRect(eyeX, headY + 5 * s, 4 * s, 2 * s);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(eyeX + 1 * s, headY + 5.5 * s, 2 * s, 1 * s);

  // Dagger 1 (Main hand)
  ctx.save();
  const d1X = facing === 'left' ? px + 2 * s : px + pw - 2 * s;
  const d1Y = py + 12 * s;
  ctx.translate(d1X, d1Y);
  ctx.rotate(d1Rot);

  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, -1.5 * s, 16 * s, 3 * s);
  ctx.fillStyle = isCleaving ? '#34d399' : '#10b981';
  ctx.fillRect(2 * s, -0.5 * s, 12 * s, 1 * s);
  ctx.fillStyle = '#09090b';
  ctx.fillRect(-3 * s, -1 * s, 3 * s, 2 * s);
  ctx.restore();

  // Dagger 2 (Offhand)
  ctx.save();
  const d2X = facing === 'left' ? px + pw - 3 * s : px + 3 * s;
  const d2Y = py + 14 * s;
  ctx.translate(d2X, d2Y);
  ctx.rotate(d2Rot);

  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, -1.5 * s, 14 * s, 3 * s);
  ctx.fillStyle = isCleaving ? '#6ee7b7' : '#10b981';
  ctx.fillRect(2 * s, -0.5 * s, 10 * s, 1 * s);
  ctx.fillStyle = '#09090b';
  ctx.fillRect(-2 * s, -1 * s, 2 * s, 2 * s);
  ctx.restore();

  // --- DUAL X-CLEAVE ARC TRAILS (VFX) ---
  if (isCleaving && cleaveT > 0.15 && cleaveT < 0.9) {
    const slashReach = 18 * s;

    // Slash Arc 1 (Downward cut)
    drawSlashArc(
      ctx,
      d1X,
      d1Y,
      slashReach,
      dir === 1 ? -1.5 : 1.5,
      d1Rot,
      'rgba(16, 185, 129, 0.4)',
      '#10b981',
      '#ffffff',
      3 * s
    );

    // Slash Arc 2 (Upward cut)
    drawSlashArc(
      ctx,
      d2X,
      d2Y,
      slashReach,
      dir === 1 ? 1.5 : -1.5,
      d2Rot,
      'rgba(52, 211, 153, 0.4)',
      '#34d399',
      '#ffffff',
      3 * s
    );

    // Center Cross Intersection Flash
    if (cleaveT > 0.35 && cleaveT < 0.75) {
      const crossX = (d1X + d2X) / 2 + dir * 14 * s;
      const crossY = (d1Y + d2Y) / 2;

      // 4-Point Impact Star (+)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(crossX - 1 * s, crossY - 5 * s, 2 * s, 10 * s);
      ctx.fillRect(crossX - 5 * s, crossY - 1 * s, 10 * s, 2 * s);

      // Green slash embers flying forward
      ctx.fillStyle = '#34d399';
      ctx.fillRect(crossX + dir * 5 * s, crossY - 3 * s, 2.5 * s, 2.5 * s);
      ctx.fillRect(crossX + dir * 8 * s, crossY + 4 * s, 2 * s, 2 * s);
      ctx.fillStyle = '#a7f3d0';
      ctx.fillRect(crossX + dir * 10 * s, crossY - 1 * s, 2 * s, 2 * s);
    }
  }
}

/**
 * Draw Boss Sprite (Warden, Alter Ego, Ancient Dragon, Skeleton King, Slime King)
 * High-fidelity 16-bit procedural canvas rendering with dynamic lighting, animations, and roar states.
 */
export function drawBossCanvas(ctx, bossId, width, height, options = {}) {
  const {
    time = Date.now() * 0.005,
    scale = 2.4,
    isRoaring = false,
    action = 'idle',
    actionProgress = 0
  } = options;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.imageSmoothingEnabled = false;

  const cx = width / 2;
  const cy = height / 2 + 15;

  if (bossId === 'warden') {
    drawWardenProcedural(ctx, cx, cy, scale * 1.05, time, isRoaring, action, actionProgress);
  } else if (bossId === 'alter_ego') {
    drawAlterEgoProcedural(ctx, cx, cy, scale * 1.0, time, isRoaring, action, actionProgress);
  } else if (bossId === 'ancient_dragon') {
    drawDragonProcedural(ctx, cx, cy, scale * 1.0, time, isRoaring, action, actionProgress);
  } else if (bossId === 'skeleton_king') {
    drawSkeletonKingProcedural(ctx, cx, cy, scale * 1.05, time, isRoaring, action, actionProgress);
  } else {
    drawSlimeKingProcedural(ctx, cx, cy, scale * 1.15, time, isRoaring, action, actionProgress);
  }

  ctx.restore();
}

// -----------------------------------------------------------------------------
// 1. THE WARDEN (Stage 35 - Apex Titan of the Deep Dark)
// -----------------------------------------------------------------------------
function drawWardenProcedural(ctx, cx, cy, s, time, isRoaring, action = 'idle', p = 0) {
  const isSonic = action === 'sonic';
  const isSlam = action === 'slam';
  const isRoarAct = action === 'roar' || isRoaring;

  const breathe = Math.sin(time * 2.2) * 2.2 * s;
  const heartRate = (isRoarAct || isSonic) ? 20 : 6;
  const heartBeat = (Math.sin(time * heartRate) + 1) * 0.5;
  const hornVibe = Math.sin(time * (isRoarAct ? 30 : 16)) * (isRoarAct ? 4.5 : 1.5) * s;
  const headScan = Math.sin(time * 1.4) * 3 * s;

  // A. Deepslate Crater & Glowing Sculk Fissures
  ctx.save();
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 34 * s, 46 * s, 11 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glowing cyan sculk fractures on the floor
  ctx.strokeStyle = (isSlam && p >= 0.4 && p <= 0.8) ? '#22d3ee' : '#06b6d4';
  ctx.lineWidth = (isSlam && p >= 0.4 && p <= 0.8) ? 2.5 * s : 1.5 * s;
  ctx.beginPath();
  ctx.moveTo(cx - 38 * s, cy + 34 * s);
  ctx.lineTo(cx - 18 * s, cy + 37 * s);
  ctx.lineTo(cx, cy + 35 * s);
  ctx.lineTo(cx + 22 * s, cy + 38 * s);
  ctx.lineTo(cx + 40 * s, cy + 33 * s);
  ctx.stroke();

  // Acoustic Shockwave Rings (Roar / Sonic / Heartbeat)
  if (isRoarAct || (isSonic && p >= 0.35 && p <= 0.8) || heartBeat > 0.85) {
    const ringRadius = ((time * 40) % 75) * s;
    const ringAlpha = Math.max(0, 1 - ringRadius / (75 * s));
    ctx.strokeStyle = `rgba(34, 211, 238, ${ringAlpha * 0.85})`;
    ctx.lineWidth = 2.5 * s;
    ctx.beginPath();
    ctx.arc(cx, cy - 8 * s + breathe * 0.5, ringRadius, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // B. Massive Deepslate Legs & Hoof Talons
  ctx.fillStyle = '#06131f';
  ctx.fillRect(cx - 20 * s, cy + 12 * s, 14 * s, 22 * s);
  ctx.fillRect(cx + 6 * s, cy + 12 * s, 14 * s, 22 * s);

  ctx.fillStyle = '#092237';
  ctx.fillRect(cx - 18 * s, cy + 14 * s, 10 * s, 16 * s);
  ctx.fillRect(cx + 8 * s, cy + 14 * s, 10 * s, 16 * s);

  // Sculk growth on shins
  ctx.fillStyle = '#0e7490';
  ctx.fillRect(cx - 19 * s, cy + 18 * s, 5 * s, 6 * s);
  ctx.fillRect(cx + 14 * s, cy + 18 * s, 5 * s, 6 * s);
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(cx - 18 * s, cy + 20 * s, 2 * s, 3 * s);
  ctx.fillRect(cx + 15 * s, cy + 20 * s, 2 * s, 3 * s);

  // Splayed deepslate hoof claws
  ctx.fillStyle = '#020617';
  ctx.fillRect(cx - 23 * s, cy + 30 * s, 18 * s, 5 * s);
  ctx.fillRect(cx + 5 * s, cy + 30 * s, 18 * s, 5 * s);
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(cx - 22 * s, cy + 33 * s, 3 * s, 3 * s);
  ctx.fillRect(cx - 16 * s, cy + 33 * s, 3 * s, 3 * s);
  ctx.fillRect(cx - 9 * s, cy + 33 * s, 3 * s, 3 * s);
  ctx.fillRect(cx + 6 * s, cy + 33 * s, 3 * s, 3 * s);
  ctx.fillRect(cx + 13 * s, cy + 33 * s, 3 * s, 3 * s);
  ctx.fillRect(cx + 19 * s, cy + 33 * s, 3 * s, 3 * s);

  // C. Muscular Deepslate Carapace / Torso
  const torsoY = cy - 24 * s + breathe * 0.5;
  ctx.fillStyle = '#071626';
  ctx.fillRect(cx - 26 * s, torsoY, 52 * s, 38 * s);
  ctx.fillStyle = '#040d17';
  ctx.fillRect(cx - 24 * s, torsoY + 2 * s, 48 * s, 34 * s);

  // Shoulder Boulders
  ctx.fillStyle = '#0b1f33';
  ctx.fillRect(cx - 29 * s, torsoY + 1 * s, 8 * s, 14 * s);
  ctx.fillRect(cx + 21 * s, torsoY + 1 * s, 8 * s, 14 * s);
  ctx.fillStyle = '#0891b2';
  ctx.fillRect(cx - 28 * s, torsoY + 2 * s, 4 * s, 3 * s);
  ctx.fillRect(cx + 24 * s, torsoY + 2 * s, 4 * s, 3 * s);

  // D. Exposed Sculk Soul Ribcage & Soul Core
  const ribY = torsoY + 8 * s;
  ctx.fillStyle = '#020617';
  ctx.fillRect(cx - 16 * s, ribY - 2 * s, 32 * s, 22 * s);

  // Glowing soul center (Sonic charge-up glow)
  ctx.save();
  const chargeMult = (isSonic && p < 0.35) ? (1 + (p / 0.35) * 2) : 1;
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = (20 * heartBeat * chargeMult);
  ctx.fillStyle = (isSonic && p < 0.35)
    ? `rgba(236, 254, 255, ${0.85 + heartBeat * 0.15})`
    : `rgba(6, 182, 212, ${0.75 + heartBeat * 0.25})`;
  ctx.fillRect(cx - 10 * s, ribY + 2 * s, 20 * s, 14 * s);
  ctx.fillStyle = '#ecfeff';
  ctx.fillRect(cx - 5 * s, ribY + 5 * s, 10 * s, 8 * s);

  // Floating soul wisps
  const s1X = cx + Math.sin(time * 4) * 5 * s;
  const s1Y = ribY + 6 * s + Math.cos(time * 3) * 2 * s;
  ctx.fillStyle = '#a5f3fc';
  ctx.fillRect(s1X - 2 * s, s1Y, 4 * s, 4 * s);
  ctx.restore();

  // Rib bones
  ctx.fillStyle = '#0f2942';
  for (let r = 0; r < 4; r++) {
    const ry = ribY + r * 5 * s;
    const rw = (28 - r * 3) * s;
    ctx.fillRect(cx - rw / 2, ry, rw, 2.5 * s);
    ctx.fillStyle = '#164e63';
    ctx.fillRect(cx - rw / 2, ry, rw, 1 * s);
    ctx.fillStyle = '#0f2942';
  }

  // E. Massive Arms & Claws with dynamic animation
  let armSwingLeft = Math.sin(time * 3) * 3 * s;
  let armSwingRight = -armSwingLeft;
  let armYOffset = 0;

  if (isSlam) {
    if (p < 0.4) {
      // Windup: arms raise high
      armYOffset = -(p / 0.4) * 22 * s;
      armSwingLeft = 0;
      armSwingRight = 0;
    } else if (p < 0.75) {
      // Smash down
      armYOffset = 14 * s;
    } else {
      // Recovery
      const rec = (p - 0.75) / 0.25;
      armYOffset = (1 - rec) * 14 * s;
    }
  }

  // Left Arm
  ctx.fillStyle = '#071626';
  ctx.fillRect(cx - 36 * s, torsoY + 4 * s + armSwingLeft + armYOffset, 11 * s, 26 * s);
  ctx.fillStyle = '#0e7490';
  ctx.fillRect(cx - 38 * s, torsoY + 22 * s + armSwingLeft + armYOffset, 13 * s, 12 * s);
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(cx - 38 * s, torsoY + 33 * s + armSwingLeft + armYOffset, 3 * s, 5 * s);
  ctx.fillRect(cx - 33 * s, torsoY + 34 * s + armSwingLeft + armYOffset, 3 * s, 5 * s);
  ctx.fillRect(cx - 28 * s, torsoY + 33 * s + armSwingLeft + armYOffset, 3 * s, 5 * s);

  // Right Arm
  ctx.fillStyle = '#071626';
  ctx.fillRect(cx + 25 * s, torsoY + 4 * s + armSwingRight + armYOffset, 11 * s, 26 * s);
  ctx.fillStyle = '#0e7490';
  ctx.fillRect(cx + 25 * s, torsoY + 22 * s + armSwingRight + armYOffset, 13 * s, 12 * s);
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(cx + 26 * s, torsoY + 33 * s + armSwingRight + armYOffset, 3 * s, 5 * s);
  ctx.fillRect(cx + 31 * s, torsoY + 34 * s + armSwingRight + armYOffset, 3 * s, 5 * s);
  ctx.fillRect(cx + 36 * s, torsoY + 33 * s + armSwingRight + armYOffset, 3 * s, 5 * s);

  // Sculk Slam Impact Crystals & Ground Ruptures
  if (isSlam && p >= 0.4 && p <= 0.85) {
    ctx.save();
    ctx.fillStyle = '#22d3ee';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 15;
    for (let spk = -2; spk <= 2; spk++) {
      const spkX = cx + spk * 18 * s;
      const spkH = (18 - Math.abs(spk) * 4) * s;
      ctx.beginPath();
      ctx.moveTo(spkX - 4 * s, cy + 34 * s);
      ctx.lineTo(spkX, cy + 34 * s - spkH);
      ctx.lineTo(spkX + 4 * s, cy + 34 * s);
      ctx.closePath();
      ctx.fill();
    }
    // Radial Quake Ring
    const qR = ((p - 0.4) / 0.45) * 65 * s;
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.7)';
    ctx.lineWidth = 3 * s;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 34 * s, qR, qR * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // F. Eyeless Monolith Head & Maw
  const headY = cy - 44 * s + breathe;
  ctx.fillStyle = '#0a1d30';
  ctx.fillRect(cx - 18 * s + headScan * 0.3, headY, 36 * s, 23 * s);
  ctx.fillStyle = '#040e1a';
  ctx.fillRect(cx - 16 * s + headScan * 0.3, headY + 2 * s, 32 * s, 19 * s);

  // Brow ridge
  ctx.fillStyle = '#0f2d4a';
  ctx.fillRect(cx - 17 * s + headScan * 0.3, headY + 4 * s, 34 * s, 3 * s);

  // Gaping cavernous mouth cavity
  let mouthOpen = 7 * s;
  if (isRoarAct) mouthOpen = 14 * s;
  if (isSonic && p >= 0.35 && p <= 0.8) mouthOpen = 18 * s;

  ctx.fillStyle = '#020617';
  ctx.fillRect(cx - 13 * s + headScan * 0.3, headY + 11 * s, 26 * s, mouthOpen);

  // Sharp sculk teeth
  ctx.fillStyle = '#22d3ee';
  for (let t = -11; t <= 9; t += 4) {
    ctx.fillRect(cx + t * s + headScan * 0.3, headY + 11 * s, 2 * s, 3 * s);
    ctx.fillRect(cx + t * s + headScan * 0.3, headY + 11 * s + mouthOpen - 3 * s, 2 * s, 3 * s);
  }

  // Acoustic Sonic Cataclysm Piercing Laser Beam!
  if (isSonic && p >= 0.35 && p <= 0.8) {
    ctx.save();
    const beamY = headY + 11 * s + mouthOpen * 0.5;
    // Outer cyan aura
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 24;
    ctx.fillStyle = 'rgba(34, 211, 238, 0.45)';
    ctx.fillRect(cx - 5 * s, beamY - 14 * s, 160 * s, 28 * s);
    // Core white beam
    ctx.fillStyle = '#ecfeff';
    ctx.fillRect(cx - 5 * s, beamY - 7 * s, 160 * s, 14 * s);

    // Sonic soundwave discs along the beam
    for (let sw = 1; sw <= 4; sw++) {
      const discX = cx + sw * 32 * s;
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.5 * s;
      ctx.beginPath();
      ctx.ellipse(discX, beamY, 8 * s, 24 * s, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // G. Resonating Branching Sculk Horns
  // Left Horn
  ctx.fillStyle = '#071d2e';
  ctx.fillRect(cx - 25 * s + hornVibe, headY - 10 * s, 8 * s, 13 * s);
  ctx.fillRect(cx - 31 * s + hornVibe, headY - 18 * s, 8 * s, 10 * s);
  ctx.fillRect(cx - 37 * s + hornVibe, headY - 26 * s, 7 * s, 9 * s);
  ctx.save();
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(cx - 39 * s + hornVibe, headY - 28 * s, 6 * s, 5 * s);
  ctx.fillRect(cx - 29 * s + hornVibe, headY - 19 * s, 4 * s, 4 * s);
  ctx.restore();

  // Right Horn
  ctx.fillStyle = '#071d2e';
  ctx.fillRect(cx + 17 * s - hornVibe, headY - 10 * s, 8 * s, 13 * s);
  ctx.fillRect(cx + 23 * s - hornVibe, headY - 18 * s, 8 * s, 10 * s);
  ctx.fillRect(cx + 30 * s - hornVibe, headY - 26 * s, 7 * s, 9 * s);
  ctx.save();
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(cx + 33 * s - hornVibe, headY - 28 * s, 6 * s, 5 * s);
  ctx.fillRect(cx + 25 * s - hornVibe, headY - 19 * s, 4 * s, 4 * s);
  ctx.restore();
}

// -----------------------------------------------------------------------------
// 2. ALTER EGO / APEX MIRROR (Stage 22 & Stage 50 True Nemesis)
// -----------------------------------------------------------------------------
function drawAlterEgoProcedural(ctx, cx, cy, s, time, isRoaring, action = 'idle', p = 0) {
  const isParry = action === 'parry';
  const isSlash = action === 'slash';
  const isClones = action === 'clones';

  const pulse = Math.sin(time * 3) * 4 * s;
  const floatY = Math.sin(time * 2.5) * 4 * s;
  const glitch = (isSlash || isRoaring) ? (Math.random() - 0.5) * 8 * s : Math.sin(time * 12) * 1.5 * s;

  // A. Swirling Corrupted Void Rift Vortex
  ctx.save();
  const vGrad = ctx.createRadialGradient(cx, cy + 24 * s, 4 * s, cx, cy + 24 * s, 36 * s);
  vGrad.addColorStop(0, 'rgba(88, 28, 135, 0.85)');
  vGrad.addColorStop(0.5, 'rgba(30, 10, 60, 0.7)');
  vGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = vGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 24 * s, 34 * s + pulse, 9 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spiral void tendrils
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 1.5 * s;
  for (let i = 0; i < 3; i++) {
    const angle = time * 2 + (i * Math.PI * 2) / 3;
    const ax = cx + Math.cos(angle) * (22 * s + pulse * 0.5);
    const ay = cy + 24 * s + Math.sin(angle) * 6 * s;
    ctx.beginPath();
    ctx.moveTo(cx, cy + 24 * s);
    ctx.quadraticCurveTo(ax, ay - 4 * s, ax + 5 * s, ay);
    ctx.stroke();
  }
  ctx.restore();

  // B. Shadow Clones (Mirror Shatter mode)
  if (isClones) {
    [-38, 38].forEach((cloneOffset, idx) => {
      ctx.save();
      ctx.globalAlpha = 0.65;
      const cloneColor = idx === 0 ? '#22d3ee' : '#ec4899';
      ctx.fillStyle = cloneColor;
      ctx.shadowColor = cloneColor;
      ctx.shadowBlur = 12;
      // Silhouette clone
      ctx.fillRect(cx + cloneOffset * s - 10 * s, cy - 14 * s + floatY, 20 * s, 28 * s);
      ctx.beginPath();
      ctx.ellipse(cx + cloneOffset * s, cy - 24 * s + floatY, 9 * s, 8 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      // Clone blade
      ctx.fillRect(cx + cloneOffset * s + 12 * s, cy - 28 * s + floatY, 4 * s, 36 * s);
      ctx.restore();
    });
  }

  // C. Flowing Tattered Shadow Cape
  const capeWave = Math.sin(time * 3.5) * 6 * s;
  ctx.fillStyle = '#2e1065';
  ctx.beginPath();
  ctx.moveTo(cx - 14 * s, cy - 8 * s + floatY);
  ctx.quadraticCurveTo(cx - 28 * s - capeWave, cy + 8 * s + floatY, cx - 22 * s - capeWave, cy + 26 * s + floatY);
  ctx.lineTo(cx - 10 * s, cy + 22 * s + floatY);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 1 * s;
  ctx.stroke();

  // Right cape fold
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(cx + 14 * s, cy - 8 * s + floatY);
  ctx.quadraticCurveTo(cx + 28 * s + capeWave, cy + 8 * s + floatY, cx + 24 * s + capeWave, cy + 26 * s + floatY);
  ctx.lineTo(cx + 10 * s, cy + 22 * s + floatY);
  ctx.closePath();
  ctx.fill();

  // D. Dark Obsidian Greaves & Boots
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 9 * s, cy + 12 * s + floatY, 7 * s, 14 * s);
  ctx.fillRect(cx + 2 * s, cy + 12 * s + floatY, 7 * s, 14 * s);
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(cx - 8 * s, cy + 22 * s + floatY, 6 * s, 4 * s);
  ctx.fillRect(cx + 3 * s, cy + 22 * s + floatY, 6 * s, 4 * s);

  // E. Corrupted Plate Armor & Core
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 12 * s + glitch * 0.3, cy - 10 * s + floatY, 24 * s, 24 * s);
  ctx.fillStyle = '#180828';
  ctx.fillRect(cx - 10 * s + glitch * 0.3, cy - 8 * s + floatY, 20 * s, 20 * s);

  // Neon violet rune lines
  ctx.fillStyle = '#c084fc';
  ctx.fillRect(cx - 2 * s, cy - 8 * s + floatY, 4 * s, 16 * s);
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(cx - 4 * s, cy + 6 * s + floatY, 8 * s, 4 * s);

  // F. Abyssal Cowl & Eyes
  const headY = cy - 28 * s + floatY;
  ctx.fillStyle = '#09090b';
  ctx.beginPath();
  ctx.ellipse(cx + glitch * 0.5, headY + 8 * s, 14 * s, 11 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cowl opening
  ctx.fillStyle = '#020617';
  ctx.fillRect(cx - 10 * s, headY + 5 * s, 20 * s, 9 * s);

  // Left Eye: Piercing Cyan
  ctx.save();
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(cx - 7 * s, headY + 7 * s, 4.5 * s, 3 * s);
  ctx.fillRect(cx - 9 * s, headY + 5 * s, 2 * s, 2 * s);
  ctx.restore();

  // Right Eye: Blazing Magenta
  ctx.save();
  ctx.shadowColor = '#f43f5e';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(cx + 2.5 * s, headY + 7 * s, 4.5 * s, 3 * s);
  ctx.fillRect(cx + 7 * s, headY + 5 * s, 2 * s, 2 * s);
  ctx.restore();

  // G. Wielding Corrupted Void Greatblade
  ctx.save();
  const swordX = cx + (isParry ? 0 : 18 * s);
  const swordY = cy + floatY + (isParry ? -6 * s : 0);
  ctx.translate(swordX, swordY);
  ctx.rotate(isParry ? -0.75 : (0.35 + Math.sin(time * 2.5) * 0.1));

  // Blade Core
  ctx.fillStyle = '#0f0217';
  ctx.fillRect(0, -32 * s, 6 * s, 42 * s);
  ctx.fillStyle = '#c084fc';
  ctx.fillRect(1.5 * s, -28 * s, 3 * s, 34 * s);
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(5 * s, -30 * s, 2 * s, 38 * s);

  // Crossguard
  ctx.fillStyle = '#a855f7';
  ctx.fillRect(-6 * s, 8 * s, 18 * s, 4 * s);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(1 * s, 14 * s, 4 * s, 4 * s);
  ctx.restore();

  // H. Special Action Overlays:
  // 1. Parry Stance Octagonal Barrier
  if (isParry) {
    ctx.save();
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 18;
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 3 * s;
    ctx.beginPath();
    ctx.arc(cx, cy + floatY, 32 * s, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 1.5 * s;
    ctx.strokeRect(cx - 24 * s, cy + floatY - 24 * s, 48 * s, 48 * s);

    // Floating Parry text banner
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.fillRect(cx - 44 * s, headY - 18 * s, 88 * s, 12 * s);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1 * s;
    ctx.strokeRect(cx - 44 * s, headY - 18 * s, 88 * s, 12 * s);
    ctx.fillStyle = '#fde047';
    ctx.font = `bold ${Math.floor(7 * s)}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('⚡ PARRY STANCE! ⚡', cx, headY - 9 * s);

    if (p > 0.45) {
      // Counter Flash
      ctx.fillStyle = 'rgba(34, 211, 238, 0.35)';
      ctx.fillRect(cx - 60 * s, cy - 60 * s, 120 * s, 120 * s);
    }
    ctx.restore();
  }

  // 2. Void Cross-Slash X-Crescents
  if (isSlash && p >= 0.25 && p <= 0.8) {
    ctx.save();
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 20;

    // Magenta Crescent Slash
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 5 * s;
    ctx.beginPath();
    ctx.arc(cx, cy + floatY, 46 * s, -0.75 * Math.PI, 0.25 * Math.PI);
    ctx.stroke();

    // Cyan/Violet Crescent Slash
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 4 * s;
    ctx.beginPath();
    ctx.arc(cx, cy + floatY, 46 * s, 0.25 * Math.PI, 1.25 * Math.PI);
    ctx.stroke();

    // Crossing sparks
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 2 * s, cy + floatY - 2 * s, 4 * s, 4 * s);
    ctx.restore();
  }
}

// -----------------------------------------------------------------------------
// 3. ANCIENT DRAGON (Stage 20 - Sovereign of the Molten Core)
// -----------------------------------------------------------------------------
function drawDragonProcedural(ctx, cx, cy, s, time, isRoaring, action = 'idle', p = 0) {
  const isBreath = action === 'breath';
  const isMeteor = action === 'meteor';
  const isBuffet = action === 'buffet';

  const breathe = Math.sin(time * 2.2) * 2.5 * s;
  const wingSpeed = isBuffet ? 14 : (isRoaring ? 7 : 4);
  const wingFlap = Math.sin(time * wingSpeed) * (isBuffet ? 18 : (isRoaring ? 14 : 9)) * s;
  const tailSway = Math.sin(time * 3) * 8 * s;

  // A. Volcanic Basalt Perch & Floating Embers
  ctx.save();
  ctx.fillStyle = 'rgba(15, 6, 8, 0.8)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 32 * s, 48 * s, 9 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Magma fissures
  ctx.strokeStyle = (isBreath || isMeteor) ? '#ef4444' : '#ea580c';
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.moveTo(cx - 40 * s, cy + 32 * s);
  ctx.lineTo(cx - 18 * s, cy + 35 * s);
  ctx.lineTo(cx + 8 * s, cy + 32 * s);
  ctx.lineTo(cx + 38 * s, cy + 36 * s);
  ctx.stroke();

  // Floating volcanic sparks & embers
  for (let i = 0; i < 6; i++) {
    const sparkX = cx + ((i * 16 - 40) + Math.sin(time * 3 + i) * 6) * s;
    const sparkY = cy + 24 * s - ((time * 24 + i * 14) % 60) * s;
    ctx.fillStyle = i % 2 === 0 ? '#fbbf24' : '#ef4444';
    ctx.fillRect(sparkX, sparkY, 2.5 * s, 2.5 * s);
  }
  ctx.restore();

  // B. Sinuous Barbed Tail
  ctx.save();
  ctx.strokeStyle = '#180709';
  ctx.lineWidth = 8 * s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 18 * s, cy + 12 * s);
  ctx.quadraticCurveTo(cx - 36 * s, cy + 16 * s, cx - 48 * s + tailSway * 0.5, cy + 24 * s);
  ctx.quadraticCurveTo(cx - 62 * s + tailSway, cy + 30 * s, cx - 74 * s + tailSway * 1.2, cy + 22 * s);
  ctx.stroke();

  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 4 * s;
  ctx.stroke();

  // Barbed tip
  const tipX = cx - 74 * s + tailSway * 1.2;
  const tipY = cy + 22 * s;
  ctx.fillStyle = '#140507';
  ctx.beginPath();
  ctx.moveTo(tipX, tipY - 8 * s);
  ctx.lineTo(tipX - 16 * s, tipY - 2 * s);
  ctx.lineTo(tipX - 22 * s, tipY + 12 * s);
  ctx.lineTo(tipX - 6 * s, tipY + 7 * s);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(tipX - 14 * s, tipY + 1 * s, 8 * s, 2 * s);
  ctx.restore();

  // C. Distant Background Wing
  ctx.save();
  ctx.fillStyle = '#22080a';
  ctx.beginPath();
  ctx.moveTo(cx - 10 * s, cy - 8 * s);
  ctx.lineTo(cx - 52 * s, cy - 38 * s - wingFlap * 0.8);
  ctx.lineTo(cx - 68 * s, cy - 28 * s - wingFlap * 0.8);
  ctx.lineTo(cx - 42 * s, cy + 8 * s);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // D. Muscular Hind Legs & Claws
  ctx.fillStyle = '#1c080b';
  ctx.fillRect(cx - 24 * s, cy + 12 * s, 14 * s, 20 * s);
  ctx.fillRect(cx + 8 * s, cy + 12 * s, 14 * s, 20 * s);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 27 * s, cy + 30 * s, 4 * s, 4 * s);
  ctx.fillRect(cx - 21 * s, cy + 30 * s, 4 * s, 4 * s);
  ctx.fillRect(cx + 7 * s, cy + 30 * s, 4 * s, 4 * s);
  ctx.fillRect(cx + 13 * s, cy + 30 * s, 4 * s, 4 * s);

  // E. Obsidian Torso & Molten Core Underbelly
  const torsoY = cy - 14 * s + breathe * 0.4;
  ctx.fillStyle = '#1c080b';
  ctx.beginPath();
  ctx.ellipse(cx - 4 * s, torsoY + 10 * s, 26 * s, 18 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Breathing molten underbelly
  ctx.save();
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = (isBreath ? 26 : 14);
  ctx.fillStyle = isBreath ? '#f97316' : '#ea580c';
  ctx.fillRect(cx - 14 * s, torsoY + 6 * s, 20 * s, 14 * s);
  ctx.fillStyle = isBreath ? '#ffffff' : '#fbbf24';
  ctx.fillRect(cx - 10 * s, torsoY + 9 * s, 12 * s, 8 * s);
  ctx.restore();

  // F. Foreground Articulated Wing
  ctx.save();
  ctx.translate(cx + 6 * s, cy - 8 * s);
  ctx.rotate(0.15 + wingFlap * 0.02);
  ctx.fillStyle = '#180709';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(24 * s, -34 * s - wingFlap);
  ctx.lineTo(54 * s, -44 * s - wingFlap);
  ctx.lineTo(34 * s, -14 * s);
  ctx.closePath();
  ctx.fill();

  // Webbing Membrane
  ctx.fillStyle = '#991b1b';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(24 * s, -34 * s - wingFlap);
  ctx.lineTo(54 * s, -44 * s - wingFlap);
  ctx.quadraticCurveTo(46 * s, -24 * s, 36 * s, -6 * s);
  ctx.quadraticCurveTo(24 * s, 6 * s, 0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1 * s;
  ctx.stroke();
  ctx.restore();

  // G. Horned Draconic Head & Jaws
  let headY = cy - 30 * s + breathe;
  if (isBreath) headY -= 6 * s; // Rears head back

  ctx.fillStyle = '#1c080b';
  ctx.fillRect(cx - 16 * s, headY, 32 * s, 18 * s);
  ctx.fillStyle = '#3b0d12';
  ctx.fillRect(cx - 14 * s, headY + 2 * s, 28 * s, 14 * s);

  // Horns
  ctx.fillStyle = '#0f0204';
  ctx.beginPath();
  ctx.moveTo(cx - 16 * s, headY);
  ctx.lineTo(cx - 32 * s, headY - 16 * s);
  ctx.lineTo(cx - 18 * s, headY - 4 * s);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx + 12 * s, headY);
  ctx.lineTo(cx + 28 * s, headY - 16 * s);
  ctx.lineTo(cx + 14 * s, headY - 4 * s);
  ctx.closePath();
  ctx.fill();

  // Eyes
  ctx.fillStyle = '#fde047';
  ctx.fillRect(cx - 10 * s, headY + 4 * s, 6 * s, 3 * s);
  ctx.fillRect(cx + 4 * s, headY + 4 * s, 6 * s, 3 * s);
  ctx.fillStyle = '#000000';
  ctx.fillRect(cx - 7 * s, headY + 4 * s, 2 * s, 3 * s);
  ctx.fillRect(cx + 7 * s, headY + 4 * s, 2 * s, 3 * s);

  // Maw & Fangs
  const mouthOpen = isBreath ? 14 * s : (isRoaring ? 9 * s : 5 * s);
  ctx.fillStyle = '#0f0204';
  ctx.fillRect(cx - 12 * s, headY + 12 * s, 24 * s, mouthOpen);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 10 * s, headY + 12 * s, 2 * s, 3 * s);
  ctx.fillRect(cx - 4 * s, headY + 12 * s, 2 * s, 3 * s);
  ctx.fillRect(cx + 2 * s, headY + 12 * s, 2 * s, 3 * s);
  ctx.fillRect(cx + 8 * s, headY + 12 * s, 2 * s, 3 * s);

  // H. Distinct Animations:
  // 1. Inferno Flamethrower Breath (Full torrent)
  if (isBreath && p >= 0.25 && p <= 0.85) {
    ctx.save();
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 24;

    // Outer flame cone
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(cx + 10 * s, headY + 14 * s);
    ctx.lineTo(cx + 120 * s, headY - 10 * s);
    ctx.lineTo(cx + 130 * s, headY + 48 * s);
    ctx.closePath();
    ctx.fill();

    // Inner fiery core
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(cx + 12 * s, headY + 15 * s);
    ctx.lineTo(cx + 95 * s, headY + 2 * s);
    ctx.lineTo(cx + 105 * s, headY + 36 * s);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx + 12 * s, headY + 16 * s, 25 * s, 10 * s);

    // Flying fire spark particles
    for (let f = 0; f < 8; f++) {
      const fx = cx + (25 + f * 12) * s;
      const fy = headY + (10 + Math.sin(time * 8 + f) * 16) * s;
      ctx.fillStyle = '#fde047';
      ctx.fillRect(fx, fy, 4 * s, 4 * s);
    }
    ctx.restore();
  }

  // 2. Magma Meteor Rain
  if (isMeteor && p >= 0.3 && p <= 0.85) {
    ctx.save();
    [-25, 5, 35].forEach((mX, idx) => {
      const dropP = Math.min(1, Math.max(0, (p - 0.3) / 0.5));
      const mY = -20 * s + dropP * (cy + 45 * s);
      // Meteor boulder
      ctx.shadowColor = '#ea580c';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#1c080b';
      ctx.beginPath();
      ctx.arc(cx + mX * s, mY, 7 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f97316';
      ctx.fillRect(cx + mX * s - 4 * s, mY - 4 * s, 8 * s, 8 * s);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(cx + mX * s - 2 * s, mY - 2 * s, 4 * s, 4 * s);

      // Tail
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
      ctx.lineWidth = 3 * s;
      ctx.beginPath();
      ctx.moveTo(cx + mX * s, mY);
      ctx.lineTo(cx + (mX - 10) * s, mY - 20 * s);
      ctx.stroke();
    });
    ctx.restore();
  }

  // 3. Wing Buffet Gale Arcs
  if (isBuffet && p >= 0.2 && p <= 0.8) {
    ctx.save();
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.8)';
    ctx.lineWidth = 3 * s;
    for (let w = 1; w <= 3; w++) {
      const gX = cx + (w * 24 - 10) * s;
      ctx.beginPath();
      ctx.arc(gX, cy - 5 * s, 28 * s, -0.4 * Math.PI, 0.4 * Math.PI);
      ctx.stroke();
    }
    ctx.restore();
  }
}

// -----------------------------------------------------------------------------
// 4. SKELETON KING (Stage 10 - Monarch of the Crypt)
// -----------------------------------------------------------------------------
function drawSkeletonKingProcedural(ctx, cx, cy, s, time, isRoaring, action = 'idle', p = 0) {
  const isCleave = action === 'cleave';
  const isSummon = action === 'summon';
  const isWrath = action === 'wrath' || isRoaring;

  const rattle = Math.sin(time * 3) * 1.5 * s;
  const floatMist = Math.sin(time * 2) * 3 * s;
  const crownHover = Math.sin(time * 2.5) * 2.5 * s;

  // A. Crypt Flagstones & Ground Mist
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 30 * s, 42 * s, 8 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
  ctx.beginPath();
  ctx.ellipse(cx + floatMist, cy + 28 * s, 44 * s, 6 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Fallen skull relic
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(cx - 30 * s, cy + 24 * s, 6 * s, 5 * s);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 29 * s, cy + 26 * s, 2 * s, 2 * s);
  ctx.restore();

  // B. Royal Velvet Imperial Mantle
  ctx.fillStyle = '#3b0764';
  ctx.beginPath();
  ctx.moveTo(cx - 18 * s, cy - 10 * s);
  ctx.quadraticCurveTo(cx - 32 * s - rattle, cy + 10 * s, cx - 26 * s, cy + 28 * s);
  ctx.lineTo(cx - 14 * s, cy + 26 * s);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx + 18 * s, cy - 10 * s);
  ctx.quadraticCurveTo(cx + 32 * s + rattle, cy + 10 * s, cx + 26 * s, cy + 28 * s);
  ctx.lineTo(cx + 14 * s, cy + 26 * s);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5 * s;
  ctx.stroke();

  // C. Weathered Bone Legs
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(cx - 8 * s, cy + 14 * s, 4 * s, 16 * s);
  ctx.fillRect(cx + 4 * s, cy + 14 * s, 4 * s, 16 * s);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(cx - 8 * s, cy + 20 * s, 4 * s, 2 * s);
  ctx.fillRect(cx + 4 * s, cy + 20 * s, 4 * s, 2 * s);

  // D. Skeletal Ribcage & Soul Flame Heart
  const spineY = cy - 8 * s;
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(cx - 2 * s, spineY, 4 * s, 22 * s);

  // Amber Heart Core
  ctx.save();
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = (isWrath ? 24 : 14);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(cx - 4 * s + rattle * 0.3, spineY + 4 * s, 8 * s, 8 * s);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(cx - 2 * s + rattle * 0.3, spineY + 6 * s, 4 * s, 4 * s);
  ctx.restore();

  // Ribs
  ctx.fillStyle = '#f8fafc';
  for (let r = 0; r < 4; r++) {
    const ry = spineY + r * 4.5 * s;
    const rw = (18 - r * 2.5) * s;
    ctx.fillRect(cx - rw / 2 + rattle * 0.2, ry, rw, 2 * s);
  }

  // Royal Golden Chain & Ruby Medallion
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 12 * s, spineY - 2 * s, 24 * s, 2 * s);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx - 3 * s, spineY - 1 * s, 6 * s, 5 * s);

  // E. Royal Crypt Greatsword
  ctx.save();
  let swordAngle = 0;
  let swordTransX = cx + 16 * s;
  let swordTransY = cy + 2 * s;

  if (isCleave) {
    if (p < 0.4) {
      // Windup overhead
      swordTransX = cx;
      swordTransY = cy - 22 * s;
      swordAngle = -2.1;
    } else if (p < 0.75) {
      // Smashed down
      swordTransX = cx + 6 * s;
      swordTransY = cy + 18 * s;
      swordAngle = 0.8;
    }
  }

  ctx.translate(swordTransX, swordTransY);
  ctx.rotate(swordAngle);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, -22 * s, 5 * s, 42 * s);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(1.5 * s, -18 * s, 2 * s, 32 * s);
  ctx.fillStyle = '#d97706';
  ctx.fillRect(-6 * s, -22 * s, 17 * s, 3.5 * s);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, -28 * s, 5 * s, 5 * s);
  ctx.restore();

  // F. Weathered Ivory Skull & Crown
  const headY = cy - 28 * s;
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 12 * s, headY, 24 * s, 18 * s);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(cx - 10 * s, headY + 1 * s, 20 * s, 4 * s);

  // Eye Sockets
  ctx.fillStyle = '#020617';
  ctx.fillRect(cx - 9 * s, headY + 5 * s, 6 * s, 6 * s);
  ctx.fillRect(cx + 3 * s, headY + 5 * s, 6 * s, 6 * s);

  // Burning Amber Eye Wisps
  ctx.save();
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 14;
  ctx.fillStyle = '#fde047';
  ctx.fillRect(cx - 7 * s, headY + 6 * s, 3 * s, 4 * s);
  ctx.fillRect(cx + 5 * s, headY + 6 * s, 3 * s, 4 * s);
  if (isWrath) {
    ctx.fillRect(cx - 8 * s, headY + 3 * s, 3 * s, 3 * s);
    ctx.fillRect(cx + 7 * s, headY + 3 * s, 3 * s, 3 * s);
  }
  ctx.restore();

  // Jaw
  const jawDrop = isWrath ? Math.sin(time * 18) * 3 * s + 3 * s : 0;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 8 * s, headY + 12 * s + jawDrop, 16 * s, 4 * s);
  ctx.fillStyle = '#f8fafc';
  for (let t = -7; t <= 5; t += 3) {
    ctx.fillRect(cx + t * s, headY + 12 * s + jawDrop, 2 * s, 2 * s);
  }
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(cx - 1 * s, headY + 12 * s + jawDrop, 2 * s, 2 * s);

  // 5-Pointed Ornate Gold Monarch Crown
  ctx.save();
  if (isWrath) {
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 25;
  }
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 13 * s, headY - 8 * s + crownHover, 26 * s, 8 * s);
  ctx.fillRect(cx - 13 * s, headY - 14 * s + crownHover, 5 * s, 6 * s);
  ctx.fillRect(cx - 5 * s, headY - 17 * s + crownHover, 4 * s, 9 * s);
  ctx.fillRect(cx + 2 * s, headY - 17 * s + crownHover, 4 * s, 9 * s);
  ctx.fillRect(cx + 8 * s, headY - 14 * s + crownHover, 5 * s, 6 * s);

  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx - 11 * s, headY - 6 * s + crownHover, 3 * s, 4 * s);
  ctx.fillRect(cx - 2 * s, headY - 7 * s + crownHover, 4 * s, 5 * s);
  ctx.fillRect(cx + 8 * s, headY - 6 * s + crownHover, 3 * s, 4 * s);
  ctx.restore();

  // G. Distinct Combat Animations:
  // 1. Necrotic Cleave Arc
  if (isCleave && p >= 0.4 && p <= 0.8) {
    ctx.save();
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 22;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6 * s;
    ctx.beginPath();
    ctx.arc(cx + 12 * s, cy + 18 * s, 52 * s, -0.6 * Math.PI, 0.4 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2.5 * s;
    ctx.stroke();
    ctx.restore();
  }

  // 2. Summon Archer Phantoms
  if (isSummon && p >= 0.25 && p <= 0.85) {
    [-42, 42].forEach((arcX) => {
      ctx.save();
      // Summoning circle
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5 * s;
      ctx.beginPath();
      ctx.ellipse(cx + arcX * s, cy + 28 * s, 16 * s, 5 * s, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Spectral Archer
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(cx + arcX * s - 4 * s, cy + 6 * s, 8 * s, 18 * s);
      ctx.fillRect(cx + arcX * s - 3 * s, cy, 6 * s, 6 * s); // head
      // Bow
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2 * s;
      ctx.beginPath();
      ctx.arc(cx + arcX * s + 6 * s, cy + 12 * s, 9 * s, -0.4 * Math.PI, 0.4 * Math.PI);
      ctx.stroke();
      ctx.restore();
    });
  }

  // 3. Monarch Wrath Orbiting Daggers
  if (isWrath) {
    ctx.save();
    for (let d = 0; d < 4; d++) {
      const dAngle = time * 5 + (d * Math.PI) / 2;
      const dx = cx + Math.cos(dAngle) * 36 * s;
      const dy = cy - 8 * s + Math.sin(dAngle) * 20 * s;
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 10;
      ctx.fillRect(dx - 2 * s, dy - 6 * s, 4 * s, 12 * s);
    }
    ctx.restore();
  }
}

// -----------------------------------------------------------------------------
// 5. SLIME KING (Stage 5 - Gelatinous Throne Monarch)
// -----------------------------------------------------------------------------
function drawSlimeKingProcedural(ctx, cx, cy, s, time, isRoaring, action = 'idle', p = 0) {
  const isSlam = action === 'slam';
  const isMitosis = action === 'mitosis';
  const isTantrum = action === 'tantrum' || isRoaring;

  const wobbleSpeed = isTantrum ? 24 : (isRoaring ? 6 : 3.5);
  let wobbleX = Math.sin(time * wobbleSpeed) * (isTantrum ? 9 : 4.5) * s;
  let wobbleY = Math.cos(time * wobbleSpeed) * (isTantrum ? 8 : 3.5) * s;
  const crownLag = Math.sin(time * wobbleSpeed - 0.4) * (isTantrum ? 8 : 3) * s;

  let bodyScaleY = 1;
  let bodyScaleX = 1;
  let bodyYOffset = 0;

  if (isSlam) {
    if (p < 0.28) {
      // Squash before jump
      bodyScaleY = 0.35;
      bodyScaleX = 1.45;
      bodyYOffset = 14 * s;
    } else if (p < 0.55) {
      // Leap high in the air off-screen
      const jumpP = (p - 0.28) / 0.27;
      bodyYOffset = -Math.sin(jumpP * Math.PI) * 90 * s;
      bodyScaleY = 1.4;
      bodyScaleX = 0.75;
    } else if (p < 0.8) {
      // Slam down
      bodyScaleY = 0.45;
      bodyScaleX = 1.4;
      bodyYOffset = 12 * s;
    }
  }

  // A. Purple Ground Puddle
  ctx.save();
  ctx.fillStyle = 'rgba(112, 26, 117, 0.45)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 22 * s, 38 * s + wobbleX, 9 * s - wobbleY * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Droplet splatters
  ctx.fillStyle = '#9333ea';
  ctx.beginPath();
  ctx.arc(cx - 34 * s, cy + 22 * s, 3 * s, 0, Math.PI * 2);
  ctx.arc(cx + 36 * s, cy + 21 * s, 4 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // B. Translucent Gelatinous Body
  ctx.save();
  ctx.shadowColor = '#c084fc';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#9333ea';

  const rx = (32 * s + wobbleX) * bodyScaleX;
  const ry = (26 * s - wobbleY) * bodyScaleY;
  const bodyY = cy + wobbleY * 0.5 + bodyYOffset;

  ctx.beginPath();
  ctx.moveTo(cx - rx * 1.05, bodyY + ry * 0.85);
  ctx.bezierCurveTo(cx - rx * 1.0, bodyY - ry * 0.4, cx - rx * 0.65, bodyY - ry * 1.0, cx, bodyY - ry * 1.0);
  ctx.bezierCurveTo(cx + rx * 0.65, bodyY - ry * 1.0, cx + rx * 1.0, bodyY - ry * 0.4, cx + rx * 1.05, bodyY + ry * 0.85);
  ctx.quadraticCurveTo(cx, bodyY + ry * 1.15, cx - rx * 1.05, bodyY + ry * 0.85);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // C. Inner Suspended Curiosities
  // Nucleus
  ctx.save();
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.ellipse(cx - 2 * s, bodyY + 4 * s, 14 * s * bodyScaleX, 11 * s * bodyScaleY, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f3e8ff';
  ctx.beginPath();
  ctx.arc(cx - 2 * s, bodyY + 4 * s, 5 * s, 0, Math.PI * 2);
  ctx.fill();

  // Gold coins
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(cx - 16 * s, bodyY + 8 * s, 5 * s, 4 * s, 0.4, 0, Math.PI * 2);
  ctx.ellipse(cx + 14 * s, bodyY + 11 * s, 4 * s, 3.5 * s, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // Adventurer skull
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(cx + 8 * s, bodyY - 4 * s, 7 * s, 6 * s);
  ctx.fillStyle = '#475569';
  ctx.fillRect(cx + 9 * s, bodyY - 2 * s, 2 * s, 2 * s);
  ctx.fillRect(cx + 12 * s, bodyY - 2 * s, 2 * s, 2 * s);
  ctx.restore();

  // D. Glossy Specular Highlights
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.beginPath();
  ctx.ellipse(cx + rx * 0.35, bodyY - ry * 0.65, rx * 0.35, ry * 0.2, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // E. Face
  const eyeY = bodyY - ry * 0.2;
  const eyeSize = 6 * s;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 13 * s, eyeY, eyeSize, eyeSize + 2 * s);
  ctx.fillRect(cx + 7 * s, eyeY, eyeSize, eyeSize + 2 * s);
  ctx.fillStyle = '#2e1065';
  ctx.fillRect(cx - 10 * s, eyeY + 2 * s, 3.5 * s, 4 * s);
  ctx.fillRect(cx + 9 * s, eyeY + 2 * s, 3.5 * s, 4 * s);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 11 * s, eyeY + 1 * s, 2 * s, 2 * s);
  ctx.fillRect(cx + 8 * s, eyeY + 1 * s, 2 * s, 2 * s);

  // F. Slime Crown
  const crownY = bodyY - ry - 10 * s;
  ctx.save();
  ctx.translate(cx + crownLag * 0.5, crownY);
  ctx.rotate(crownLag * 0.04);
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(-12 * s, -4 * s, 24 * s, 10 * s);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(-14 * s, 0, 28 * s, 7 * s);
  ctx.fillRect(-14 * s, -7 * s, 5 * s, 7 * s);
  ctx.fillRect(-6 * s, -11 * s, 4 * s, 11 * s);
  ctx.fillRect(-1 * s, -13 * s, 4 * s, 13 * s);
  ctx.fillRect(4 * s, -11 * s, 4 * s, 11 * s);
  ctx.fillRect(9 * s, -7 * s, 5 * s, 7 * s);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(-2 * s, 1 * s, 4 * s, 4 * s);
  ctx.restore();

  // G. Distinct Animations:
  // 1. Slime Slam Splatter Waves
  if (isSlam && p >= 0.55 && p <= 0.85) {
    ctx.save();
    ctx.fillStyle = '#c084fc';
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 15;
    for (let sp = 0; sp < 10; sp++) {
      const splatX = cx + (Math.sin(sp * 1.5) * 48) * s;
      const splatY = cy + 24 * s - Math.abs(Math.cos(sp * 2)) * 26 * s;
      ctx.beginPath();
      ctx.arc(splatX, splatY, 4 * s, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 2. Mitosis Mini Slimes
  if (isMitosis && p >= 0.25 && p <= 0.85) {
    [-40, 40].forEach((mX) => {
      const hopY = Math.abs(Math.sin(time * 8)) * 10 * s;
      ctx.save();
      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.ellipse(cx + mX * s, cy + 22 * s - hopY, 12 * s, 10 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      // Mini eyes
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx + mX * s - 4 * s, cy + 18 * s - hopY, 2 * s, 3 * s);
      ctx.fillRect(cx + mX * s + 2 * s, cy + 18 * s - hopY, 2 * s, 3 * s);
      // Mini crown
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(cx + mX * s - 5 * s, cy + 10 * s - hopY, 10 * s, 3 * s);
      ctx.restore();
    });
  }

  // 3. Tantrum Coin Shower
  if (isTantrum) {
    ctx.save();
    for (let c = 0; c < 5; c++) {
      const cAngle = time * 6 + c * 1.2;
      const cX = cx + Math.cos(cAngle) * 35 * s;
      const cY = bodyY + Math.sin(cAngle) * 22 * s;
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(cX, cY, 3.5 * s, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}
