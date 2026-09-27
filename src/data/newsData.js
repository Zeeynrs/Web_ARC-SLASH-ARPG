// Authentic News, Patch Notes, and Announcements for ARC SLASH
export const NEWS_CATEGORIES = [
  'ALL',
  'UPDATES',
  'PATCH NOTES',
  'EVENTS',
  'DEVELOPMENT',
  'ANNOUNCEMENT'
];

export const NEWS_DATA = [
  {
    id: 'news-v1-4-deep-dark',
    slug: 'v1-4-deep-dark-and-warden-descent',
    title: 'Update v1.4: Descent into the Deep Dark & The Warden Unleashed',
    category: 'UPDATES',
    date: 'September 24, 2026',
    readTime: '4 min read',
    author: 'Lead Designer',
    featured: true,
    thumbnail: 'warden_update',
    excerpt: 'The deepest descent yet has been carved into the abyss. Stages 23 through 35 are now live, introducing the Deep Dark Biome, acoustic sculk hazards, and the terrifying Stage 35 Apex Boss: The Warden.',
    tags: ['Major Update', 'Deep Dark', 'Boss: Warden', 'Stages 23-35'],
    content: `
### The Dungeon Expands Into the Unknown

Beneath the smoldering chambers of the Lava Caverns lies a long-forgotten subterranean abyss known as the **Deep Dark Biome**. Overgrown with ancient sculk moss, echoing sensors, and petrified deepslate masonry, this new 13-stage expedition will push every hero to their absolute limits.

---

### What's New in Version 1.4:

#### 1. The Deep Dark Biome (Stages 23–35)
- **13 New Handcrafted Chambers**: Traverse from the *Ancient City Gates* (Stage 25) through the *Hall of Soul Lanterns* (Stage 34).
- **Acoustic Stealth & Vibration Mechanics**: Scurrying carelessly alerts nearby sculk shriekers. Move intentionally or face swarms of sculk crawlers!
- **Darkness Vignette**: The deep abyss suppresses ambient light, narrowing your field of vision unless lit by soul lanterns.

#### 2. Apex Boss: The Warden (Stage 35)
- **19,800 Max Health**: The beefiest titan yet recorded in Arc Slash history.
- **Acoustic Sonic Cataclysm**: A devastating, linear telegraph beam emitted directly from its glowing soul cage ribcage.
- **Blindness & Screen Tremor**: Slams the deepslate floor with raw kinetic energy, causing authentic screen-shake and disorientation.

#### 3. New Sculk & Abyssal Equipment
- **Abyssal Titan Cleaver** (Tier V Knight Greatsword): Smashes through monster shields.
- **Echo Resonance Catalyst** (Tier V Mage Staff): Converts mana bursts into sonic shockwaves.
- **Abyssal Soulfang** (Tier IV Assassin Daggers): Infused with sculk venom.
- **Warden Dreadplate** (Tier V Heavy Armor): Massive HP pool expansion.

> "Listen carefully to the echoes before taking your next step. The Warden remembers every sound."
    `
  },
  {
    id: 'news-event-floor-50-speedrun',
    slug: 'descent-to-floor-50-speedrun-challenge',
    title: 'Community Event: The Floor 50 Deep Dark Core Speedrun',
    category: 'EVENTS',
    date: 'September 20, 2026',
    readTime: '3 min read',
    author: 'Community Master',
    featured: false,
    thumbnail: 'event_speedrun',
    excerpt: 'Sharpen your blades and test your reflexes! The global community challenge to reach and defeat Stage 50 True Mirror Alter Ego is now officially underway with exclusive discord titles and bragging rights.',
    tags: ['Event', 'Speedrun', 'Floor 50', 'Leaderboards'],
    content: `
### Challenge the Void: Can You Reach Stage 50?

With the conclusion of the 50-stage labyrinth saga, we are inviting all veteran dungeon crawlers to participate in the **Descent to Floor 50 Speedrun Challenge**.

---

### Event Guidelines:
1. **Entry**: Play on any desktop or mobile browser via [https://arch-slash-arpg.netlify.app](https://arch-slash-arpg.netlify.app).
2. **Category**: Single-run clear from Stage 1 Cave Labyrinth to Stage 50 Deep Dark Core defeat.
3. **Roles**: Separate leaderboard divisions for **Knight**, **Mage**, and **Assassin**.
4. **Verification**: Screenshot your final Victory Screen displaying total run time, gold collected, and defeated boss tally.

### Featured Rewards:
- **Champion Title**: Permanent mention in upcoming game patch credits.
- **Grand Master Trophy**: In-game achievement unlock and badge display.
- **Hall of Legends**: Featured gameplay clip on the official promotional website.

Good luck, adventurers. May your parry timings remain flawless.
    `
  },
  {
    id: 'news-patch-1-3-2',
    slug: 'patch-notes-v1-3-2-alter-ego-balance',
    title: 'Patch Notes v1.3.2: Alter Ego Parry Timing & Mobile Polish',
    category: 'PATCH NOTES',
    date: 'September 15, 2026',
    readTime: '3 min read',
    author: 'Combat Systems Team',
    featured: false,
    thumbnail: 'patch_combat',
    excerpt: 'Detailed balance adjustments for Alter Ego parry riposte windows, improved mobile touch controls sensitivity, and audio synthesizer latency reduction across all browsers.',
    tags: ['Patch Notes', 'Combat Balance', 'Parry', 'Mobile Fixes'],
    content: `
### Combat Tuning & Balance Adjustments

In response to player feedback regarding the Stage 22 and Stage 50 Alter Ego encounters, we have deployed critical timing and telegraph adjustments to ensure fair, reaction-based gameplay.

---

### Combat & Boss Changes:
- **Alter Ego Parry Stance**:
  - Increased startup telegraph window from 25 frames to 35 frames.
  - Added high-visibility cyan text pop-up: \`PARRY STANCE! 🛡️⚡\`.
  - Added subtle trailing particles while parrying so players can clearly identify when it is safe to resume attacking.
  - Reduced damage reflection multiplier from 200% to 150% of incoming player damage.
- **The Warden**:
  - Sonic Cataclysm telegraph indicator now pulses with higher contrast on deepslate floors.
  - Knockback distance tuned to prevent getting pinned into corner walls.

### Mobile Gamepad & Responsive UX:
- **D-Pad Diagonal Input**: Enhanced touch boundary forgiveness on smaller smartphone screens.
- **Action Buttons**: Slightly increased tap hitboxes for Skill 1, 2, and 3 slots.
- **Haptic & Visual Feedback**: Added instantaneous active states for virtual buttons during multi-touch maneuvers.

### Performance & Web Audio:
- Replaced audio buffer allocations with reused synthesizer nodes, eliminating micro-stutters during frantic boss encounters.
    `
  },
  {
    id: 'news-dev-diary-audio-canvas',
    slug: 'dev-diary-8-procedural-audio-and-canvas-2d',
    title: 'Dev Diary #8: Zero-Asset Procedural Web Audio & Canvas 2D Engine',
    category: 'DEVELOPMENT',
    date: 'September 10, 2026',
    readTime: '5 min read',
    author: 'Engine Architect',
    featured: false,
    thumbnail: 'dev_audio',
    excerpt: 'How we engineered a complete 16-bit Action RPG in pure Vanilla HTML5 Canvas and Web Audio API without downloading a single external sprite texture or MP3 sound file.',
    tags: ['Architecture', 'Canvas 2D', 'Web Audio API', 'Optimization'],
    content: `
### The Philosophy of Zero-Asset Game Development

When we set out to build **ARC SLASH**, one of our primary design goals was immediate, frictionless access. No 500MB download screens, no asset loading spinners, and no dependency on fragile external asset CDNs.

---

### Procedural 16-Bit Sound Synthesis
Instead of downloading hundreds of compressed audio clips, every single sound effect in ARC SLASH is synthesized at runtime using the browser's native **Web Audio API**:
- **Sword Slashes**: Generated via rapid sawtooth oscillators ramping from 340Hz down to 75Hz within 120 milliseconds.
- **Explosions & Fireballs**: Procedural white-noise buffers filtered through resonant low-pass biquad filters.
- **Chimes & Coins**: Pure sine-wave intervals ramping into crystal-clear fifth harmonics.
- **Dungeon Ambience**: Dual low-frequency sine/triangle oscillators tuned to 55Hz and 82.4Hz creating hypnotic subterranean drones.

### 100% Mathematical Canvas Rendering
Every character, mob, wall texture, and hazard indicator is drawn using standard 2D canvas drawing commands:
\`\`\`javascript
ctx.fillRect(x, y, w, h);
ctx.arc(cx, cy, radius, startAngle, endAngle);
ctx.quadraticCurveTo(cpx, cpy, x, y);
\`\`\`
By enforcing \`image-rendering: pixelated\` and maintaining integer pixel coordinates, the game maintains crisp 16-bit retro arcade visual fidelity on any display scale from a 4K desktop monitor to a 6-inch mobile phone.
    `
  },
  {
    id: 'news-announcement-live-launch',
    slug: 'arc-slash-official-netlify-release',
    title: 'Announcement: ARC SLASH Live Production Deployment on Netlify',
    category: 'ANNOUNCEMENT',
    date: 'September 01, 2026',
    readTime: '2 min read',
    author: 'Studio Producer',
    featured: false,
    thumbnail: 'announcement_launch',
    excerpt: 'ARC SLASH is officially live and publicly playable worldwide on Netlify! Step into the dungeon now directly in your modern web browser with zero installation required.',
    tags: ['Launch', 'Production', 'Netlify', 'Play Now'],
    content: `
### ARC SLASH is Officially Live Worldwide!

We are thrilled to announce that **ARC SLASH** is now accessible to all players worldwide through its official production deployment:

👉 **Play Now**: [https://arch-slash-arpg.netlify.app](https://arch-slash-arpg.netlify.app)

### Highlights of the Release:
- **Zero Install**: Instant launch on Chrome, Firefox, Safari, and Edge.
- **Cross-Platform**: Seamless desktop keyboard/mouse controls and adaptive smartphone virtual gamepads.
- **50 Stages & 3 Distinct Classes**: Play as the steadfast Knight, the mystical Mage, or the agile Assassin.
- **Save Persistence**: Your unlocked achievements, gold, and settings persist safely in your browser’s \`localStorage\`.

Thank you to everyone who joined our closed alpha tests. The dungeon awaits your blade!
    `
  }
];
