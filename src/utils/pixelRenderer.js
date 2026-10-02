// Procedural 16-Bit Pixel Art Renderer for Parallel Dungeons
// Faithful to the mathematical Canvas 2D routines in Parallel Dungeons (ARC-SLASH-ARPG)

/**
 * Draw a Hero (Knight, Mage, Assassin) with animated idle/attack states
 */
export function drawHeroCanvas(ctx, role, width, height, options = {}) {
  const {
    time = Date.now() * 0.005,
    isAttacking = false,
    facing = 'right',
    scale = 3,
    hasGlow = true
  } = options;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.imageSmoothingEnabled = false;

  // Center coordinate
  const cx = width / 2;
  const cy = height / 2 + 10;
  const pw = 20 * scale;
  const ph = 24 * scale;
  const px = cx - pw / 2;
  const py = cy - ph / 2;

  // Contact Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + ph / 2 + 2, pw * 0.55, 6 * scale * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Subtle role aura glow
  if (hasGlow) {
    const pulse = Math.sin(time * 2) * 0.15 + 0.25;
    const glowColor = role === 'mage' ? 'rgba(168, 85, 247, ' : role === 'assassin' ? 'rgba(16, 185, 129, ' : 'rgba(59, 130, 246, ';
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, pw * 1.2);
    grad.addColorStop(0, glowColor + pulse + ')');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, pw * 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  if (role === 'mage') {
    drawMageProcedural(ctx, px, py, pw, ph, scale, time, isAttacking, facing);
  } else if (role === 'assassin') {
    drawAssassinProcedural(ctx, px, py, pw, ph, scale, time, isAttacking, facing);
  } else {
    drawKnightProcedural(ctx, px, py, pw, ph, scale, time, isAttacking, facing);
  }

  ctx.restore();
}

// 1. KNIGHT
function drawKnightProcedural(ctx, px, py, pw, ph, s, time, isAttacking, facing) {
  const wave = Math.sin(time) * 3 * s;
  const headY = py - 4 * s;

  // Flowing Crimson Cape
  ctx.fillStyle = '#7f1d1d';
  ctx.beginPath();
  if (facing === 'left') {
    ctx.moveTo(px + pw - 4 * s, py + 8 * s);
    ctx.quadraticCurveTo(px + pw + 13 * s + wave, py + ph / 2, px + pw + 9 * s + wave * 0.5, py + ph + 6 * s);
    ctx.lineTo(px + pw - 6 * s, py + ph + 3 * s);
  } else {
    ctx.moveTo(px + 4 * s, py + 8 * s);
    ctx.quadraticCurveTo(px - 13 * s - wave, py + ph / 2, px - 9 * s - wave * 0.5, py + ph + 6 * s);
    ctx.lineTo(px + 6 * s, py + ph + 3 * s);
  }
  ctx.closePath();
  ctx.fill();

  // Cape highlight & golden trim
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.2 * s;
  ctx.stroke();

  // Armored Sabatons (Boots)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 3 * s, py + ph - 6 * s, 6 * s, 6 * s);
  ctx.fillRect(px + pw - 9 * s, py + ph - 6 * s, 6 * s, 6 * s);
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 4 * s, py + ph - 6 * s, 4 * s, 3 * s);
  ctx.fillRect(px + pw - 8 * s, py + ph - 6 * s, 4 * s, 3 * s);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px + 4 * s, py + ph - 3 * s, 4 * s, 1.5 * s);
  ctx.fillRect(px + pw - 8 * s, py + ph - 3 * s, 4 * s, 1.5 * s);

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

  // Left Arm & Kite Shield
  const sx = facing === 'left' ? px + pw - 4 * s : px - 5 * s;
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

  // Glowing Cyan Eye Slits with Bloom
  const eyeX = facing === 'left' ? px + 4 * s : px + 10 * s;
  ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.fillRect(eyeX - 1 * s, headY + 5 * s, 6 * s, 4 * s);
  ctx.fillStyle = '#00e5ff';
  ctx.fillRect(eyeX, headY + 6 * s, 4 * s, 2 * s);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(eyeX + 1 * s, headY + 6.5 * s, 2 * s, 1 * s);

  // Sword Blade
  ctx.save();
  const swordX = facing === 'left' ? px + 2 * s : px + pw - 2 * s;
  const swordY = py + 12 * s;
  ctx.translate(swordX, swordY);
  const swordRot = isAttacking ? (facing === 'left' ? -1.2 : 1.2) : (facing === 'left' ? -0.4 : 0.4);
  ctx.rotate(swordRot);

  // Blade steel with edge gleam
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, -2.5 * s, 25 * s, 5 * s);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(1 * s, -1.5 * s, 22 * s, 3 * s);
  ctx.fillStyle = '#00e5ff'; // Runic fuller
  ctx.fillRect(3 * s, -1 * s, 17 * s, 2 * s);
  ctx.fillStyle = '#ffffff'; // Pulsing rune core
  const runePulseX = (Math.sin(time * 4) * 0.5 + 0.5) * 12 * s + 3 * s;
  ctx.fillRect(runePulseX, -0.5 * s, 3 * s, 1 * s);

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
}

// 2. MAGE
function drawMageProcedural(ctx, px, py, pw, ph, s, time, isAttacking, facing) {
  const wave = Math.sin(time) * 2.5 * s;
  const headY = py - 4 * s;

  // Astral Robe Back
  ctx.fillStyle = '#4c1d95';
  ctx.beginPath();
  ctx.moveTo(px + 2 * s, py + 8 * s);
  ctx.quadraticCurveTo(px - 5 * s + wave, py + ph + 8 * s, px + 2 * s, py + ph + 9 * s);
  ctx.lineTo(px + pw - 2 * s, py + ph + 9 * s);
  ctx.quadraticCurveTo(px + pw + 5 * s - wave, py + ph + 8 * s, px + pw - 2 * s, py + 8 * s);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#c084fc';
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

  // Floating Mana Orb (offhand)
  const orbX = facing === 'left' ? px + pw + 3 * s : px - 6 * s;
  const orbY = py + 10 * s + Math.sin(time * 3) * 3 * s;
  ctx.fillStyle = '#a855f7';
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

  // Glowing Purple Eyes
  ctx.fillStyle = '#c084fc';
  if (facing === 'left') {
    ctx.fillRect(px + 4 * s, headY + 5 * s, 3 * s, 2 * s);
  } else {
    ctx.fillRect(px + 10 * s, headY + 5 * s, 3 * s, 2 * s);
  }

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
  ctx.rotate(isAttacking ? (facing === 'left' ? -0.8 : 0.8) : (facing === 'left' ? -0.3 : 0.3));

  // Wood shaft
  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, -18 * s, 2.5 * s, 30 * s);
  // Crystal Headpiece
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.arc(1.25 * s, -20 * s, 5 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fdf4ff';
  ctx.beginPath();
  ctx.arc(1.25 * s, -20 * s, 2 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// 3. ASSASSIN
function drawAssassinProcedural(ctx, px, py, pw, ph, s, time, isAttacking, facing) {
  const wave = Math.sin(time) * 3 * s;
  const headY = py - 4 * s;

  // Agile Scarf / Shadow Cloak
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  if (facing === 'left') {
    ctx.moveTo(px + pw - 2 * s, py + 6 * s);
    ctx.quadraticCurveTo(px + pw + 14 * s + wave, py + 12 * s, px + pw + 9 * s, py + ph + 4 * s);
    ctx.lineTo(px + pw - 4 * s, py + ph - 2 * s);
  } else {
    ctx.moveTo(px + 2 * s, py + 6 * s);
    ctx.quadraticCurveTo(px - 14 * s - wave, py + 12 * s, px - 9 * s, py + ph + 4 * s);
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

  // Glowing Emerald Eyes
  ctx.fillStyle = '#34d399';
  if (facing === 'left') {
    ctx.fillRect(px + 4 * s, headY + 5 * s, 4 * s, 2 * s);
  } else {
    ctx.fillRect(px + 10 * s, headY + 5 * s, 4 * s, 2 * s);
  }

  // Dual Daggers
  ctx.save();
  const d1X = facing === 'left' ? px + 2 * s : px + pw - 2 * s;
  const d1Y = py + 12 * s;
  ctx.translate(d1X, d1Y);
  ctx.rotate(isAttacking ? (facing === 'left' ? -1.3 : 1.3) : (facing === 'left' ? -0.5 : 0.5));

  // Dagger 1
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, -1.5 * s, 14 * s, 3 * s);
  ctx.fillStyle = '#10b981';
  ctx.fillRect(2 * s, -0.5 * s, 10 * s, 1 * s);
  ctx.fillStyle = '#09090b';
  ctx.fillRect(-3 * s, -1 * s, 3 * s, 2 * s);

  ctx.restore();

  // Dagger 2 in offhand
  ctx.save();
  const d2X = facing === 'left' ? px + pw - 3 * s : px + 3 * s;
  const d2Y = py + 14 * s;
  ctx.translate(d2X, d2Y);
  ctx.rotate(facing === 'left' ? 0.4 : -0.4);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, -1.5 * s, 11 * s, 3 * s);
  ctx.fillStyle = '#09090b';
  ctx.fillRect(-2 * s, -1 * s, 2 * s, 2 * s);
  ctx.restore();
}

/**
 * Draw Boss Sprite (Warden, Alter Ego, Ancient Dragon, Skeleton King, Slime King)
 * High-fidelity 16-bit procedural canvas rendering with dynamic lighting, animations, and roar states.
 */
export function drawBossCanvas(ctx, bossId, width, height, options = {}) {
  const { time = Date.now() * 0.005, scale = 2.4, isRoaring = false } = options;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.imageSmoothingEnabled = false;

  const cx = width / 2;
  const cy = height / 2 + 15;

  if (bossId === 'warden') {
    drawWardenProcedural(ctx, cx, cy, scale * 1.05, time, isRoaring);
  } else if (bossId === 'alter_ego') {
    drawAlterEgoProcedural(ctx, cx, cy, scale * 1.0, time, isRoaring);
  } else if (bossId === 'ancient_dragon') {
    drawDragonProcedural(ctx, cx, cy, scale * 1.0, time, isRoaring);
  } else if (bossId === 'skeleton_king') {
    drawSkeletonKingProcedural(ctx, cx, cy, scale * 1.05, time, isRoaring);
  } else {
    drawSlimeKingProcedural(ctx, cx, cy, scale * 1.15, time, isRoaring);
  }

  ctx.restore();
}

// -----------------------------------------------------------------------------
// 1. THE WARDEN (Stage 35 - Apex Titan of the Deep Dark)
// -----------------------------------------------------------------------------
function drawWardenProcedural(ctx, cx, cy, s, time, isRoaring) {
  const breathe = Math.sin(time * 2.5) * 2 * s;
  const heartRate = isRoaring ? 16 : 6;
  const heartBeat = (Math.sin(time * heartRate) + 1) * 0.5;
  const hornVibe = Math.sin(time * 16) * (isRoaring ? 3.5 : 1.5) * s;

  // A. Deepslate Crater & Glowing Sculk Fissures
  ctx.save();
  ctx.fillStyle = 'rgba(2, 6, 23, 0.75)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 34 * s, 42 * s, 10 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glowing cyan sculk fractures on the floor
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.5 * s;
  ctx.beginPath();
  ctx.moveTo(cx - 36 * s, cy + 34 * s);
  ctx.lineTo(cx - 18 * s, cy + 37 * s);
  ctx.lineTo(cx, cy + 35 * s);
  ctx.lineTo(cx + 22 * s, cy + 38 * s);
  ctx.lineTo(cx + 38 * s, cy + 33 * s);
  ctx.stroke();

  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 1 * s;
  ctx.beginPath();
  ctx.moveTo(cx - 12 * s, cy + 36 * s);
  ctx.lineTo(cx - 6 * s, cy + 42 * s);
  ctx.moveTo(cx + 10 * s, cy + 36 * s);
  ctx.lineTo(cx + 18 * s, cy + 41 * s);
  ctx.stroke();

  // Acoustic Shockwave Rings (if roaring or periodic heartbeat)
  if (isRoaring || heartBeat > 0.8) {
    const ringRadius = ((time * 35) % 65) * s;
    const ringAlpha = Math.max(0, 1 - ringRadius / (65 * s));
    ctx.strokeStyle = `rgba(34, 211, 238, ${ringAlpha * 0.7})`;
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.arc(cx, cy - 8 * s + breathe * 0.5, ringRadius, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // B. Massive Deepslate Legs & Hoof Talons
  ctx.fillStyle = '#06131f';
  ctx.fillRect(cx - 20 * s, cy + 12 * s, 14 * s, 22 * s);
  ctx.fillRect(cx + 6 * s, cy + 12 * s, 14 * s, 22 * s);

  // Muscular plate shading
  ctx.fillStyle = '#092237';
  ctx.fillRect(cx - 18 * s, cy + 14 * s, 10 * s, 16 * s);
  ctx.fillRect(cx + 8 * s, cy + 14 * s, 10 * s, 16 * s);

  // Sculk growth on knees & shins
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

  // Chiseled rock shoulder boulders
  ctx.fillStyle = '#0b1f33';
  ctx.fillRect(cx - 29 * s, torsoY + 1 * s, 8 * s, 14 * s);
  ctx.fillRect(cx + 21 * s, torsoY + 1 * s, 8 * s, 14 * s);
  ctx.fillStyle = '#0891b2';
  ctx.fillRect(cx - 28 * s, torsoY + 2 * s, 4 * s, 3 * s);
  ctx.fillRect(cx + 24 * s, torsoY + 2 * s, 4 * s, 3 * s);

  // D. Exposed Sculk Soul Ribcage & Beating Soul Core
  const ribY = torsoY + 8 * s;
  // Recessed cavity shadow
  ctx.fillStyle = '#020617';
  ctx.fillRect(cx - 16 * s, ribY - 2 * s, 32 * s, 22 * s);

  // Glowing bioluminescent soul center
  ctx.save();
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 18 * heartBeat * (isRoaring ? 1.5 : 1);
  ctx.fillStyle = `rgba(6, 182, 212, ${0.75 + heartBeat * 0.25})`;
  ctx.fillRect(cx - 10 * s, ribY + 2 * s, 20 * s, 14 * s);
  ctx.fillStyle = '#ecfeff';
  ctx.fillRect(cx - 5 * s, ribY + 5 * s, 10 * s, 8 * s);

  // Floating trapped soul wisps inside chest
  const s1X = cx + Math.sin(time * 4) * 5 * s;
  const s1Y = ribY + 6 * s + Math.cos(time * 3) * 2 * s;
  ctx.fillStyle = '#a5f3fc';
  ctx.fillRect(s1X - 2 * s, s1Y, 4 * s, 4 * s);
  ctx.restore();

  // Heavy sculpted deepslate ribs overlapping soul cavity
  ctx.fillStyle = '#0f2942';
  for (let r = 0; r < 4; r++) {
    const ry = ribY + r * 5 * s;
    const rw = (28 - r * 3) * s;
    ctx.fillRect(cx - rw / 2, ry, rw, 2.5 * s);
    // Rib highlights & edges
    ctx.fillStyle = '#164e63';
    ctx.fillRect(cx - rw / 2, ry, rw, 1 * s);
    ctx.fillStyle = '#0f2942';
  }

  // E. Massive Heavy Arms & Cyan Claws
  const armSwing = Math.sin(time * 3) * 3 * s;
  // Left Arm
  ctx.fillStyle = '#071626';
  ctx.fillRect(cx - 36 * s, torsoY + 4 * s + armSwing, 11 * s, 26 * s);
  ctx.fillStyle = '#0e7490';
  ctx.fillRect(cx - 38 * s, torsoY + 22 * s + armSwing, 13 * s, 12 * s);
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(cx - 38 * s, torsoY + 33 * s + armSwing, 3 * s, 5 * s);
  ctx.fillRect(cx - 33 * s, torsoY + 34 * s + armSwing, 3 * s, 5 * s);
  ctx.fillRect(cx - 28 * s, torsoY + 33 * s + armSwing, 3 * s, 5 * s);

  // Right Arm
  ctx.fillStyle = '#071626';
  ctx.fillRect(cx + 25 * s, torsoY + 4 * s - armSwing, 11 * s, 26 * s);
  ctx.fillStyle = '#0e7490';
  ctx.fillRect(cx + 25 * s, torsoY + 22 * s - armSwing, 13 * s, 12 * s);
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(cx + 26 * s, torsoY + 33 * s - armSwing, 3 * s, 5 * s);
  ctx.fillRect(cx + 31 * s, torsoY + 34 * s - armSwing, 3 * s, 5 * s);
  ctx.fillRect(cx + 36 * s, torsoY + 33 * s - armSwing, 3 * s, 5 * s);

  // F. Eyeless Monolith Head & Horrific Sculk Maw
  const headY = cy - 44 * s + breathe;
  ctx.fillStyle = '#0a1d30';
  ctx.fillRect(cx - 18 * s, headY, 36 * s, 23 * s);
  ctx.fillStyle = '#040e1a';
  ctx.fillRect(cx - 16 * s, headY + 2 * s, 32 * s, 19 * s);

  // Chiseled brow ridge
  ctx.fillStyle = '#0f2d4a';
  ctx.fillRect(cx - 17 * s, headY + 4 * s, 34 * s, 3 * s);

  // Gaping cavernous mouth cavity
  const mouthOpen = isRoaring ? 12 * s : 7 * s;
  ctx.fillStyle = '#020617';
  ctx.fillRect(cx - 13 * s, headY + 11 * s, 26 * s, mouthOpen);

  // Dual rows of bioluminescent sharp sculk teeth
  ctx.fillStyle = '#22d3ee';
  for (let t = -11; t <= 9; t += 4) {
    ctx.fillRect(cx + t * s, headY + 11 * s, 2 * s, 3 * s);
    ctx.fillRect(cx + t * s, headY + 11 * s + mouthOpen - 3 * s, 2 * s, 3 * s);
  }

  // Cyan soul breath vapor puffing from mouth
  if (isRoaring || Math.sin(time * 3) > 0.2) {
    ctx.fillStyle = 'rgba(34, 211, 238, 0.35)';
    ctx.fillRect(cx - 6 * s, headY + 13 * s + mouthOpen, 12 * s, 4 * s);
  }

  // G. Resonating Branching Sculk Horns
  // Left Horn
  ctx.fillStyle = '#071d2e';
  ctx.fillRect(cx - 25 * s + hornVibe, headY - 10 * s, 8 * s, 13 * s);
  ctx.fillRect(cx - 31 * s + hornVibe, headY - 18 * s, 8 * s, 10 * s);
  ctx.fillRect(cx - 37 * s + hornVibe, headY - 26 * s, 7 * s, 9 * s);
  // Left Horn Sensor Nodes (Cyan Glow)
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
  // Right Horn Sensor Nodes
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
function drawAlterEgoProcedural(ctx, cx, cy, s, time, isRoaring) {
  const pulse = Math.sin(time * 3) * 4 * s;
  const floatY = Math.sin(time * 2.5) * 3 * s;
  const glitch = isRoaring ? (Math.random() - 0.5) * 6 * s : Math.sin(time * 12) * 1.5 * s;

  // A. Swirling Corrupted Void Rift Vortex
  ctx.save();
  const vGrad = ctx.createRadialGradient(cx, cy + 24 * s, 4 * s, cx, cy + 24 * s, 34 * s);
  vGrad.addColorStop(0, 'rgba(88, 28, 135, 0.85)');
  vGrad.addColorStop(0.5, 'rgba(30, 10, 60, 0.7)');
  vGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = vGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 24 * s, 32 * s + pulse, 9 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spiral void tendrils
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 1.5 * s;
  for (let i = 0; i < 3; i++) {
    const angle = time * 2 + (i * Math.PI * 2) / 3;
    const ax = cx + Math.cos(angle) * (20 * s + pulse * 0.5);
    const ay = cy + 24 * s + Math.sin(angle) * 6 * s;
    ctx.beginPath();
    ctx.moveTo(cx, cy + 24 * s);
    ctx.quadraticCurveTo(ax, ay - 4 * s, ax + 5 * s, ay);
    ctx.stroke();
  }
  ctx.restore();

  // B. Apex Mirror Chromatic Glitch Phantom (Stage 50 True Mirror effect)
  if (isRoaring || Math.sin(time * 4) > 0.3) {
    ctx.save();
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(cx - 14 * s - 4 * s, cy - 14 * s + floatY, 26 * s, 30 * s);
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(cx - 14 * s + 4 * s, cy - 14 * s + floatY, 26 * s, 30 * s);
    ctx.restore();
  }

  // C. Flowing Tattered Shadow Cape (Billowing in the void wind)
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

  // E. Corrupted Plate Armor & Crimson Core Sash
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 12 * s + glitch * 0.3, cy - 10 * s + floatY, 24 * s, 24 * s);
  ctx.fillStyle = '#180828';
  ctx.fillRect(cx - 10 * s + glitch * 0.3, cy - 8 * s + floatY, 20 * s, 20 * s);

  // Neon violet rune chasuble lines
  ctx.fillStyle = '#c084fc';
  ctx.fillRect(cx - 2 * s, cy - 8 * s + floatY, 4 * s, 16 * s);
  ctx.fillStyle = '#f43f5e'; // Crimson Core buckle
  ctx.fillRect(cx - 4 * s, cy + 6 * s + floatY, 8 * s, 4 * s);

  // F. Abyssal Cowl & Piercing Heterochromatic Stare
  const headY = cy - 28 * s + floatY;
  ctx.fillStyle = '#09090b';
  ctx.beginPath();
  ctx.ellipse(cx + glitch * 0.5, headY + 8 * s, 14 * s, 11 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cowl front opening (pitch black void)
  ctx.fillStyle = '#020617';
  ctx.fillRect(cx - 10 * s, headY + 5 * s, 20 * s, 9 * s);

  // Left Eye: Piercing Cyan (#22d3ee)
  ctx.save();
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(cx - 7 * s, headY + 7 * s, 4.5 * s, 3 * s);
  // Left eye trail wisp
  ctx.fillRect(cx - 9 * s, headY + 5 * s, 2 * s, 2 * s);
  ctx.restore();

  // Right Eye: Blazing Magenta (#f43f5e)
  ctx.save();
  ctx.shadowColor = '#f43f5e';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(cx + 2.5 * s, headY + 7 * s, 4.5 * s, 3 * s);
  // Right eye trail wisp
  ctx.fillRect(cx + 7 * s, headY + 5 * s, 2 * s, 2 * s);
  ctx.restore();

  // G. Wielding The Corrupted Void Greatblade
  ctx.save();
  const swordX = cx + 18 * s;
  const swordY = cy + floatY;
  ctx.translate(swordX, swordY);
  ctx.rotate(0.35 + Math.sin(time * 2.5) * 0.1);

  // Obsidian Blade Core
  ctx.fillStyle = '#0f0217';
  ctx.fillRect(0, -32 * s, 6 * s, 42 * s);
  // Glowing Violet Inscription
  ctx.fillStyle = '#c084fc';
  ctx.fillRect(1.5 * s, -28 * s, 3 * s, 34 * s);
  // Hot pink / magenta razor edge
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(5 * s, -30 * s, 2 * s, 38 * s);
  // Jagged Barb Spine
  ctx.fillStyle = '#0f0217';
  ctx.beginPath();
  ctx.moveTo(0, -24 * s);
  ctx.lineTo(-6 * s, -20 * s);
  ctx.lineTo(0, -16 * s);
  ctx.closePath();
  ctx.fill();

  // Crossguard & Ruby Pommel
  ctx.fillStyle = '#a855f7';
  ctx.fillRect(-6 * s, 8 * s, 18 * s, 4 * s);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(1 * s, 14 * s, 4 * s, 4 * s);
  ctx.restore();
}

// -----------------------------------------------------------------------------
// 3. ANCIENT DRAGON (Stage 20 - Sovereign of the Molten Core)
// -----------------------------------------------------------------------------
function drawDragonProcedural(ctx, cx, cy, s, time, isRoaring) {
  const breathe = Math.sin(time * 2.2) * 2.5 * s;
  const wingSpeed = isRoaring ? 7 : 4;
  const wingFlap = Math.sin(time * wingSpeed) * (isRoaring ? 14 : 9) * s;
  const tailSway = Math.sin(time * 3) * 8 * s;

  // A. Volcanic Basalt Perch & Floating Embers
  ctx.save();
  ctx.fillStyle = 'rgba(15, 6, 8, 0.75)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 32 * s, 46 * s, 9 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Molten magma fissures in the ground
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.moveTo(cx - 38 * s, cy + 32 * s);
  ctx.lineTo(cx - 18 * s, cy + 35 * s);
  ctx.lineTo(cx + 8 * s, cy + 32 * s);
  ctx.lineTo(cx + 36 * s, cy + 36 * s);
  ctx.stroke();

  // Floating volcanic sparks & embers
  for (let i = 0; i < 5; i++) {
    const sparkX = cx + ((i * 18 - 36) + Math.sin(time * 3 + i) * 6) * s;
    const sparkY = cy + 24 * s - ((time * 22 + i * 16) % 55) * s;
    ctx.fillStyle = i % 2 === 0 ? '#fbbf24' : '#ef4444';
    ctx.fillRect(sparkX, sparkY, 2 * s, 2 * s);
  }
  ctx.restore();

  // B. Sinuous Barbed Tail with Scythe Blade Tip
  ctx.save();
  ctx.strokeStyle = '#180709';
  ctx.lineWidth = 8 * s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 18 * s, cy + 12 * s);
  ctx.quadraticCurveTo(cx - 36 * s, cy + 16 * s, cx - 48 * s + tailSway * 0.5, cy + 24 * s);
  ctx.quadraticCurveTo(cx - 62 * s + tailSway, cy + 30 * s, cx - 74 * s + tailSway * 1.2, cy + 22 * s);
  ctx.stroke();

  // Crimson scale core on tail
  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 4 * s;
  ctx.stroke();

  // Dorsal spikes along tail
  for (let sp = 1; sp <= 3; sp++) {
    const spX = cx - 22 * s - sp * 14 * s + tailSway * (sp / 4);
    const spY = cy + 14 * s + sp * 4 * s;
    ctx.fillStyle = '#0f0204';
    ctx.beginPath();
    ctx.moveTo(spX - 2 * s, spY);
    ctx.lineTo(spX - 5 * s, spY - 9 * s);
    ctx.lineTo(spX + 3 * s, spY);
    ctx.closePath();
    ctx.fill();
  }

  // Barbed volcanic scythe tip
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
  // Razor sharp ivory talons
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 27 * s, cy + 30 * s, 4 * s, 4 * s);
  ctx.fillRect(cx - 21 * s, cy + 30 * s, 4 * s, 4 * s);
  ctx.fillRect(cx + 7 * s, cy + 30 * s, 4 * s, 4 * s);
  ctx.fillRect(cx + 13 * s, cy + 30 * s, 4 * s, 4 * s);

  // E. Armored Obsidian Torso & Molten Core Underbelly
  const torsoY = cy - 14 * s + breathe * 0.4;
  ctx.fillStyle = '#1c080b';
  ctx.beginPath();
  ctx.ellipse(cx - 4 * s, torsoY + 10 * s, 26 * s, 18 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Breathing molten underbelly
  ctx.save();
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 14;
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(cx - 14 * s, torsoY + 6 * s, 20 * s, 14 * s);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(cx - 10 * s, torsoY + 9 * s, 12 * s, 8 * s);
  ctx.restore();

  // Segmented obsidian scale ridges
  ctx.fillStyle = '#3b0d12';
  for (let sc = 0; sc < 3; sc++) {
    ctx.fillRect(cx - 16 * s, torsoY + 4 * s + sc * 5 * s, 24 * s, 2 * s);
  }

  // F. Foreground Articulated Wing
  ctx.save();
  ctx.translate(cx + 6 * s, cy - 8 * s);
  ctx.rotate(0.15 + wingFlap * 0.02);
  // Wing bone struts
  ctx.fillStyle = '#180709';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(24 * s, -34 * s - wingFlap);
  ctx.lineTo(54 * s, -44 * s - wingFlap);
  ctx.lineTo(34 * s, -14 * s);
  ctx.closePath();
  ctx.fill();

  // Tattered Crimson Webbing Membrane
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

  // G. Horned Draconic Head & Fiery Maw
  const headY = cy - 30 * s + breathe;
  ctx.fillStyle = '#1c080b';
  ctx.fillRect(cx - 16 * s, headY, 32 * s, 18 * s);
  ctx.fillStyle = '#3b0d12';
  ctx.fillRect(cx - 14 * s, headY + 2 * s, 28 * s, 14 * s);

  // Backward Sweeping Obsidian Horns
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

  // Burning Golden Reptile Eyes
  ctx.fillStyle = '#fde047';
  ctx.fillRect(cx - 10 * s, headY + 4 * s, 6 * s, 3 * s);
  ctx.fillRect(cx + 4 * s, headY + 4 * s, 6 * s, 3 * s);
  ctx.fillStyle = '#000000'; // Slit pupil
  ctx.fillRect(cx - 7 * s, headY + 4 * s, 2 * s, 3 * s);
  ctx.fillRect(cx + 7 * s, headY + 4 * s, 2 * s, 3 * s);

  // Jaws & Razor Fangs
  ctx.fillStyle = '#0f0204';
  ctx.fillRect(cx - 12 * s, headY + 12 * s, 24 * s, isRoaring ? 9 * s : 5 * s);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 10 * s, headY + 12 * s, 2 * s, 3 * s);
  ctx.fillRect(cx - 4 * s, headY + 12 * s, 2 * s, 3 * s);
  ctx.fillRect(cx + 2 * s, headY + 12 * s, 2 * s, 3 * s);
  ctx.fillRect(cx + 8 * s, headY + 12 * s, 2 * s, 3 * s);

  // Breathing Fire / Roaring Inferno Stream
  if (isRoaring || Math.sin(time * 3) > 0.4) {
    ctx.save();
    ctx.shadowColor = '#ff6d00';
    ctx.shadowBlur = 18;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(cx - 6 * s, headY + 14 * s);
    ctx.lineTo(cx - 24 * s, headY + 32 * s);
    ctx.lineTo(cx + 24 * s, headY + 32 * s);
    ctx.lineTo(cx + 6 * s, headY + 14 * s);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(cx - 4 * s, headY + 15 * s, 8 * s, 10 * s);
    ctx.restore();
  }
}

// -----------------------------------------------------------------------------
// 4. SKELETON KING (Stage 10 - Monarch of the Crypt)
// -----------------------------------------------------------------------------
function drawSkeletonKingProcedural(ctx, cx, cy, s, time, isRoaring) {
  const rattle = Math.sin(time * 3) * 1.5 * s;
  const floatMist = Math.sin(time * 2) * 3 * s;

  // A. Crypt Flagstones & Ethereal Mist
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 30 * s, 38 * s, 8 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Swirling tomb amber ground mist
  ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
  ctx.beginPath();
  ctx.ellipse(cx + floatMist, cy + 28 * s, 42 * s, 6 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Fallen ancient skull relic on floor
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

  // Golden Ermine Border Trim on Mantle
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5 * s;
  ctx.stroke();

  // C. Weathered Bone Legs & Clavicle
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(cx - 8 * s, cy + 14 * s, 4 * s, 16 * s);
  ctx.fillRect(cx + 4 * s, cy + 14 * s, 4 * s, 16 * s);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(cx - 8 * s, cy + 20 * s, 4 * s, 2 * s); // Knee
  ctx.fillRect(cx + 4 * s, cy + 20 * s, 4 * s, 2 * s);

  // D. Intricate Skeletal Ribcage & Necromantic Soul Flame
  const spineY = cy - 8 * s;
  ctx.fillStyle = '#94a3b8'; // Vertebrae
  ctx.fillRect(cx - 2 * s, spineY, 4 * s, 22 * s);

  // Pulsing Amber Soul Heart inside the ribs
  ctx.save();
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 14 * (isRoaring ? 1.6 : 1);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(cx - 4 * s + rattle * 0.3, spineY + 4 * s, 8 * s, 8 * s);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(cx - 2 * s + rattle * 0.3, spineY + 6 * s, 4 * s, 4 * s);
  ctx.restore();

  // Sculpted Bone Ribs
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

  // E. Royal Crypt Greatsword (Resting into stone floor)
  ctx.save();
  const swordX = cx + 16 * s + rattle * 0.5;
  const swordY = cy + 2 * s;
  ctx.translate(swordX, swordY);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, -22 * s, 5 * s, 42 * s);
  ctx.fillStyle = '#fbbf24'; // Glowing Necromantic Runes
  ctx.fillRect(1.5 * s, -18 * s, 2 * s, 32 * s);
  // Crossguard
  ctx.fillStyle = '#d97706';
  ctx.fillRect(-6 * s, -22 * s, 17 * s, 3.5 * s);
  ctx.fillStyle = '#f8fafc'; // Skull Pommel
  ctx.fillRect(0, -28 * s, 5 * s, 5 * s);
  ctx.restore();

  // F. Weathered Ivory Monarch Skull
  const headY = cy - 28 * s;
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 12 * s, headY, 24 * s, 18 * s);
  ctx.fillStyle = '#cbd5e1'; // Cranial shading
  ctx.fillRect(cx - 10 * s, headY + 1 * s, 20 * s, 4 * s);

  // Hollow Eye Sockets with Ethereal Spectral Flames
  ctx.fillStyle = '#020617';
  ctx.fillRect(cx - 9 * s, headY + 5 * s, 6 * s, 6 * s);
  ctx.fillRect(cx + 3 * s, headY + 5 * s, 6 * s, 6 * s);

  // Burning Amber Eye Wisps
  ctx.save();
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#fde047';
  ctx.fillRect(cx - 7 * s, headY + 6 * s, 3 * s, 4 * s);
  ctx.fillRect(cx + 5 * s, headY + 6 * s, 3 * s, 4 * s);
  if (isRoaring) {
    ctx.fillRect(cx - 8 * s, headY + 3 * s, 2 * s, 2 * s);
    ctx.fillRect(cx + 7 * s, headY + 3 * s, 2 * s, 2 * s);
  }
  ctx.restore();

  // Grinning Jaw with Inlaid Gold Molar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 8 * s, headY + 12 * s, 16 * s, 4 * s);
  ctx.fillStyle = '#f8fafc';
  for (let t = -7; t <= 5; t += 3) {
    ctx.fillRect(cx + t * s, headY + 12 * s, 2 * s, 2 * s);
  }
  ctx.fillStyle = '#fbbf24'; // Gold tooth
  ctx.fillRect(cx - 1 * s, headY + 12 * s, 2 * s, 2 * s);

  // G. 5-Pointed Ornate Gold Monarch Crown
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 13 * s, headY - 8 * s, 26 * s, 8 * s);
  // Crown points
  ctx.fillRect(cx - 13 * s, headY - 14 * s, 5 * s, 6 * s);
  ctx.fillRect(cx - 5 * s, headY - 17 * s, 4 * s, 9 * s);
  ctx.fillRect(cx + 2 * s, headY - 17 * s, 4 * s, 9 * s);
  ctx.fillRect(cx + 8 * s, headY - 14 * s, 5 * s, 6 * s);

  // Inlaid Royal Rubies
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx - 11 * s, headY - 6 * s, 3 * s, 4 * s);
  ctx.fillRect(cx - 2 * s, headY - 7 * s, 4 * s, 5 * s);
  ctx.fillRect(cx + 8 * s, headY - 6 * s, 3 * s, 4 * s);
}

// -----------------------------------------------------------------------------
// 5. SLIME KING (Stage 5 - Gelatinous Throne Monarch)
// -----------------------------------------------------------------------------
function drawSlimeKingProcedural(ctx, cx, cy, s, time, isRoaring) {
  const wobbleSpeed = isRoaring ? 6 : 3.5;
  const wobbleX = Math.sin(time * wobbleSpeed) * (isRoaring ? 8 : 4.5) * s;
  const wobbleY = Math.cos(time * wobbleSpeed) * (isRoaring ? 7 : 3.5) * s;
  const crownLag = Math.sin(time * wobbleSpeed - 0.4) * 3 * s;

  // A. Viscous Purple Ground Puddle & Ripples
  ctx.save();
  ctx.fillStyle = 'rgba(112, 26, 117, 0.4)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 22 * s, 36 * s + wobbleX, 9 * s - wobbleY * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Droplet splatters on floor
  ctx.fillStyle = '#9333ea';
  ctx.beginPath();
  ctx.arc(cx - 34 * s, cy + 22 * s, 3 * s, 0, Math.PI * 2);
  ctx.arc(cx + 36 * s, cy + 21 * s, 4 * s, 0, Math.PI * 2);
  ctx.arc(cx - 22 * s, cy + 26 * s, 2 * s, 0, Math.PI * 2);
  ctx.arc(cx + 24 * s, cy + 26 * s, 3 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // B. Translucent Gelatinous Outer Body
  ctx.save();
  ctx.shadowColor = '#c084fc';
  ctx.shadowBlur = 16 * (isRoaring ? 1.5 : 1);
  ctx.fillStyle = '#9333ea';

  const rx = 32 * s + wobbleX;
  const ry = 26 * s - wobbleY;
  const bodyY = cy + wobbleY * 0.5;

  ctx.beginPath();
  ctx.moveTo(cx - rx * 1.05, bodyY + ry * 0.85);
  ctx.bezierCurveTo(cx - rx * 1.0, bodyY - ry * 0.4, cx - rx * 0.65, bodyY - ry * 1.0, cx, bodyY - ry * 1.0);
  ctx.bezierCurveTo(cx + rx * 0.65, bodyY - ry * 1.0, cx + rx * 1.0, bodyY - ry * 0.4, cx + rx * 1.05, bodyY + ry * 0.85);
  ctx.quadraticCurveTo(cx, bodyY + ry * 1.15, cx - rx * 1.05, bodyY + ry * 0.85);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // C. Inner Curiosities Suspended in Gelatin (Skull, Coins, Nucleus)
  // 1. Pulsing Nucleus Orb
  ctx.save();
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.ellipse(cx - 2 * s, bodyY + 4 * s, 14 * s, 11 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f3e8ff';
  ctx.beginPath();
  ctx.arc(cx - 2 * s, bodyY + 4 * s, 5 * s, 0, Math.PI * 2);
  ctx.fill();

  // 2. Trapped Swallowed Gold Coins
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(cx - 16 * s, bodyY + 8 * s, 5 * s, 4 * s, 0.4, 0, Math.PI * 2);
  ctx.ellipse(cx + 14 * s, bodyY + 11 * s, 4 * s, 3.5 * s, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fde68a';
  ctx.fillRect(cx - 17 * s, bodyY + 7 * s, 2 * s, 2 * s);

  // 3. Trapped Adventurer Ivory Skull
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(cx + 8 * s, bodyY - 4 * s, 7 * s, 6 * s);
  ctx.fillStyle = '#475569';
  ctx.fillRect(cx + 9 * s, bodyY - 2 * s, 2 * s, 2 * s);
  ctx.fillRect(cx + 12 * s, bodyY - 2 * s, 2 * s, 2 * s);
  ctx.restore();

  // D. 3D Glossy Specular Highlights & Internal Bubbles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.beginPath();
  ctx.ellipse(cx + rx * 0.35, bodyY - ry * 0.65, rx * 0.35, ry * 0.2, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Bubbles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.arc(cx - rx * 0.45, bodyY - ry * 0.3, 2.5 * s, 0, Math.PI * 2);
  ctx.arc(cx + rx * 0.55, bodyY - ry * 0.1, 2 * s, 0, Math.PI * 2);
  ctx.arc(cx - rx * 0.6, bodyY + ry * 0.3, 3 * s, 0, Math.PI * 2);
  ctx.fill();

  // E. Expressive Monarch Slime Face
  const eyeY = bodyY - ry * 0.2;
  const eyeSize = 6 * s;
  // White eyeball bases
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 13 * s, eyeY, eyeSize, eyeSize + 2 * s);
  ctx.fillRect(cx + 7 * s, eyeY, eyeSize, eyeSize + 2 * s);
  // Dark Purple pupils
  ctx.fillStyle = '#2e1065';
  ctx.fillRect(cx - 10 * s, eyeY + 2 * s, 3.5 * s, 4 * s);
  ctx.fillRect(cx + 9 * s, eyeY + 2 * s, 3.5 * s, 4 * s);
  // Eye glints
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 11 * s, eyeY + 1 * s, 2 * s, 2 * s);
  ctx.fillRect(cx + 8 * s, eyeY + 1 * s, 2 * s, 2 * s);

  // Smirking Monarch Mouth
  ctx.fillStyle = '#3b0764';
  ctx.beginPath();
  ctx.moveTo(cx - 6 * s, eyeY + 11 * s);
  ctx.quadraticCurveTo(cx, eyeY + 14 * s, cx + 6 * s, eyeY + 10 * s);
  ctx.lineWidth = 2 * s;
  ctx.stroke();

  // F. 5-Pointed Ornate Gold Slime Crown (Wobbling with inertia lag)
  const crownY = bodyY - ry - 10 * s;
  ctx.save();
  ctx.translate(cx + crownLag * 0.5, crownY);
  ctx.rotate(crownLag * 0.04);

  // Red velvet inner cap
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(-12 * s, -4 * s, 24 * s, 10 * s);

  // Solid gold crown rim
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(-14 * s, 0, 28 * s, 7 * s);

  // 5 Crown Points
  ctx.fillRect(-14 * s, -7 * s, 5 * s, 7 * s);
  ctx.fillRect(-6 * s, -11 * s, 4 * s, 11 * s);
  ctx.fillRect(-1 * s, -13 * s, 4 * s, 13 * s); // Highest center point
  ctx.fillRect(4 * s, -11 * s, 4 * s, 11 * s);
  ctx.fillRect(9 * s, -7 * s, 5 * s, 7 * s);

  // Polished gold highlights
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-13 * s, 1 * s, 26 * s, 2 * s);

  // Central gleaming ruby
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(-2 * s, 1 * s, 4 * s, 4 * s);
  ctx.fillStyle = '#fecaca';
  ctx.fillRect(-1 * s, 1.5 * s, 1.5 * s, 1.5 * s);
  ctx.restore();
}
