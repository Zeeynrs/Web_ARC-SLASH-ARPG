// Procedural Web Audio API Sound Synthesizer for ARC SLASH
// Inspired by original ARC-SLASH audio engine, expanded with dungeon ambience & UI feedback

let audioCtx = null;
let sfxEnabled = true;
let musicEnabled = true;
let masterVolume = 0.75;
let ambientGain = null;
let ambientOsc1 = null;
let ambientOsc2 = null;
let ambientFilter = null;
let isAmbientPlaying = false;

// Load persisted settings
try {
  if (typeof localStorage !== 'undefined') {
    const savedSfx = localStorage.getItem('arc_slash_sfx');
    if (savedSfx !== null) sfxEnabled = savedSfx === 'true';

    const savedMusic = localStorage.getItem('arc_slash_music');
    if (savedMusic !== null) musicEnabled = savedMusic === 'true';

    const savedVol = localStorage.getItem('arc_slash_master_volume');
    if (savedVol !== null) {
      const v = parseFloat(savedVol);
      if (!isNaN(v) && v >= 0 && v <= 1) masterVolume = v;
    }
  }
} catch (e) {
  console.warn('Storage unavailable', e);
}

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSfxEnabled(val) {
  sfxEnabled = !!val;
  try {
    localStorage.setItem('arc_slash_sfx', String(sfxEnabled));
  } catch (e) {}
}

export function getSfxEnabled() {
  return sfxEnabled;
}

export function setMusicEnabled(val) {
  musicEnabled = !!val;
  try {
    localStorage.setItem('arc_slash_music', String(musicEnabled));
  } catch (e) {}
  if (!musicEnabled) {
    stopAmbientDungeon();
  } else {
    startAmbientDungeon();
  }
}

export function getMusicEnabled() {
  return musicEnabled;
}

export function setMasterVolume(val) {
  masterVolume = Math.max(0, Math.min(1, Math.round(val * 100) / 100));
  try {
    localStorage.setItem('arc_slash_master_volume', String(masterVolume));
  } catch (e) {}
  if (ambientGain && audioCtx) {
    try {
      ambientGain.gain.setValueAtTime(masterVolume * 0.18, audioCtx.currentTime);
    } catch (e) {}
  }
}

export function getMasterVolume() {
  return masterVolume;
}

// Helper to create an output node with volume
function getMasterNode(ctx) {
  const gain = ctx.createGain();
  gain.gain.value = masterVolume;
  gain.connect(ctx.destination);
  return gain;
}

// 1. Slash sound
export function playSlash() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(340, now);
  osc.frequency.exponentialRampToValueAtTime(75, now + 0.12);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.12);
}

// 2. Hit / Impact sound
export function playHit() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(170, now);
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.09);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.09);
}

// 3. UI Hover (Subtle high-pitch click)
export function playUiHover() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(950, now + 0.03);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.03);
}

// 4. UI Click (Retro confirm beep)
export function playUiClick() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.setValueAtTime(880, now + 0.04);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.09);
}

// 5. Skill activation
export function playSkill() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(580, now);
  osc.frequency.exponentialRampToValueAtTime(1280, now + 0.16);

  gain.gain.setValueAtTime(0.26, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.2);

  // Sparkle harmonic
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(880, now + 0.04);
  osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.2);
  gain2.gain.setValueAtTime(0.14, now + 0.04);
  gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
  osc2.connect(gain2);
  gain2.connect(master);
  osc2.start(now + 0.04);
  osc2.stop(now + 0.22);
}

// 6. Shield buff / Bastion
export function playShield() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(500, now);
  osc.frequency.linearRampToValueAtTime(1150, now + 0.18);

  gain.gain.setValueAtTime(0.24, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.22);
}

// 7. Heal / Holy magic
export function playHeal() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(920, now + 0.24);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.25);
}

// 8. Explosion / Fireball
export function playExplosion() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const bufferSize = ctx.sampleRate * 0.3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(900, now);
  filter.frequency.exponentialRampToValueAtTime(70, now + 0.3);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.38, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  noise.start(now);
}

// 9. Boss Roar / Sonic Boom (Warden pulse)
export function playBossRoar() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  // Deep rumble oscillator
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(90, now);
  osc.frequency.exponentialRampToValueAtTime(35, now + 0.45);

  gain.gain.setValueAtTime(0.45, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.45);
}

// 10. Coin / Gold pickup
export function playCoin() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(987.77, now);
  osc.frequency.setValueAtTime(1318.51, now + 0.06);

  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.18);
}

// 11. Achievement fanfare
export function playAchievement() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.06);
    gain.gain.setValueAtTime(0.2, now + idx * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.3);

    osc.connect(gain);
    gain.connect(master);
    osc.start(now + idx * 0.06);
    osc.stop(now + idx * 0.06 + 0.3);
  });
}

// 12. Ambient Dungeon Drone (Mysterious deep atmosphere)
export function startAmbientDungeon() {
  if (!musicEnabled || isAmbientPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    isAmbientPlaying = true;
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(masterVolume * 0.14, ctx.currentTime + 3);

    ambientFilter = ctx.createBiquadFilter();
    ambientFilter.type = 'lowpass';
    ambientFilter.frequency.value = 220;

    ambientOsc1 = ctx.createOscillator();
    ambientOsc1.type = 'sine';
    ambientOsc1.frequency.value = 55; // Deep A1 note

    ambientOsc2 = ctx.createOscillator();
    ambientOsc2.type = 'triangle';
    ambientOsc2.frequency.value = 82.41; // E2 fifth harmonic

    ambientOsc1.connect(ambientFilter);
    ambientOsc2.connect(ambientFilter);
    ambientFilter.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
  } catch (e) {
    console.warn('Ambient error', e);
  }
}

export function stopAmbientDungeon() {
  if (!isAmbientPlaying) return;
  const ctx = getAudioContext();
  if (ctx && ambientGain) {
    try {
      ambientGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1);
      setTimeout(() => {
        try {
          if (ambientOsc1) ambientOsc1.stop();
          if (ambientOsc2) ambientOsc2.stop();
          isAmbientPlaying = false;
        } catch (e) {}
      }, 1100);
    } catch (e) {
      isAmbientPlaying = false;
    }
  } else {
    isAmbientPlaying = false;
  }
}
