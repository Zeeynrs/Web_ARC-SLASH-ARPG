// Procedural Web Audio API Sound Synthesizer for Parallel Dungeons
// Inspired by original Parallel Dungeons audio engine, expanded with dungeon ambience & UI feedback

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
    const savedSfx = localStorage.getItem('parallel_dungeons_sfx') || localStorage.getItem('arc_slash_sfx');
    if (savedSfx !== null) sfxEnabled = savedSfx === 'true';

    const savedMusic = localStorage.getItem('parallel_dungeons_music') || localStorage.getItem('arc_slash_music');
    if (savedMusic !== null) musicEnabled = savedMusic === 'true';

    const savedVol = localStorage.getItem('parallel_dungeons_master_volume') || localStorage.getItem('arc_slash_master_volume');
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
    localStorage.setItem('parallel_dungeons_sfx', String(sfxEnabled));
  } catch (e) {}
}

export function getSfxEnabled() {
  return sfxEnabled;
}

export function setMusicEnabled(val) {
  musicEnabled = !!val;
  try {
    localStorage.setItem('parallel_dungeons_music', String(musicEnabled));
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
    localStorage.setItem('parallel_dungeons_master_volume', String(masterVolume));
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

// 9b. Dynamic Procedural Boss Action Audio Synthesizer
export function playBossActionSound(bossId, actionId) {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  try {
    if (bossId === 'warden') {
      if (actionId === 'sonic') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(540, now + 0.22);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.65);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.setValueAtTime(0.55, now + 0.22);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.65);
      } else if (actionId === 'slam') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.45);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.45);
      } else {
        playBossRoar();
      }
    } else if (bossId === 'alter_ego') {
      if (actionId === 'parry') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(880, now);
        osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
        osc1.frequency.exponentialRampToValueAtTime(440, now + 0.35);
        osc2.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(master);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.35);
      } else if (actionId === 'slash') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.22);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.22);
      } else {
        [320, 480, 640].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.35);
          gain.gain.setValueAtTime(0.18, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.connect(gain);
          gain.connect(master);
          osc.start(now + idx * 0.05);
          osc.stop(now + 0.35);
        });
      }
    } else if (bossId === 'ancient_dragon') {
      if (actionId === 'breath') {
        const bufferSize = Math.floor(ctx.sampleRate * 0.6);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.linearRampToValueAtTime(1200, now + 0.25);
        filter.frequency.linearRampToValueAtTime(400, now + 0.6);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        noise.start(now);
      } else if (actionId === 'meteor') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.4);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.45);
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } else if (bossId === 'skeleton_king') {
      if (actionId === 'cleave') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.38);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.38);
      } else if (actionId === 'summon') {
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.22, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
          osc.connect(gain);
          gain.connect(master);
          osc.start(now + idx * 0.08);
          osc.stop(now + 0.45);
        });
      } else {
        for (let i = 0; i < 4; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(180 + i * 40, now + i * 0.06);
          gain.gain.setValueAtTime(0.2, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.08);
          osc.connect(gain);
          gain.connect(master);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.08);
        }
      }
    } else {
      if (actionId === 'slam') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (actionId === 'mitosis') {
        [320, 520, 680].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + idx * 0.1 + 0.1);
          gain.gain.setValueAtTime(0.3, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.1);
          osc.connect(gain);
          gain.connect(master);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.1);
        });
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(320, now + 0.1);
        osc.frequency.linearRampToValueAtTime(240, now + 0.2);
        osc.frequency.linearRampToValueAtTime(300, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    }
  } catch (err) {
    playBossRoar();
  }
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

// 13. Cinematic Torch ignite whoosh
export function playTorchIgnite() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  // Noise swoosh
  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(180, now);
  filter.frequency.exponentialRampToValueAtTime(800, now + 0.12);
  filter.frequency.exponentialRampToValueAtTime(220, now + 0.38);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.35, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  noise.start(now);
}

// 14. Metallic Sword Draw / Unsheathe ring
export function playSwordDraw() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  // High metallic ringing resonance
  const freqs = [1420, 2180, 2840];
  freqs.forEach((f, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, now);
    osc.frequency.exponentialRampToValueAtTime(f * 1.08, now + 0.05);

    gain.gain.setValueAtTime(0.18 / (idx + 1), now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.45);
  });
}

// 15. Cinematic Title Brass Braam / Dramatic Sting
export function playDramaticSting() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  // Sub bass saw braam
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'sawtooth';
  osc1.frequency.setValueAtTime(65.41, now); // C2
  osc2.frequency.setValueAtTime(65.41 * 1.5, now); // G2 fifth

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(140, now);
  filter.frequency.exponentialRampToValueAtTime(650, now + 0.15);
  filter.frequency.exponentialRampToValueAtTime(90, now + 1.2);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.42, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 1.2);
  osc2.stop(now + 1.2);
}

// 16. Eerie Abyss Warden Growl
export function playMonsterGrowl() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(80, now);
  osc.frequency.exponentialRampToValueAtTime(32, now + 0.6);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(350, now);
  filter.frequency.exponentialRampToValueAtTime(110, now + 0.6);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.linearRampToValueAtTime(0.38, now + 0.12);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  osc.start(now);
  osc.stop(now + 0.6);
}

// 17. Dynamic Combo Hit with ascending pitch
export function playComboHit(combo = 1) {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = getMasterNode(ctx);

  const pitchMultiplier = 1 + Math.min(combo, 12) * 0.06;

  // Slash saw
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(360 * pitchMultiplier, now);
  osc.frequency.exponentialRampToValueAtTime(85, now + 0.1);

  gain.gain.setValueAtTime(0.28, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.1);

  // Impact thump
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.type = 'triangle';
  thump.frequency.setValueAtTime(160 * pitchMultiplier, now);
  thump.frequency.exponentialRampToValueAtTime(40, now + 0.08);

  thumpGain.gain.setValueAtTime(0.32, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

  thump.connect(thumpGain);
  thumpGain.connect(master);
  thump.start(now);
  thump.stop(now + 0.08);
}

