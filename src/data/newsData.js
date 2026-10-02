// Authentic News, Patch Notes, and Announcements synchronized with GitHub Commits
// Repositories: Zeeynrs/ARC-SLASH-ARPG and Zeeynrs/Web_ARC-SLASH-ARPG

export const NEWS_CATEGORIES = [
  'ALL',
  'UPDATES',
  'PATCH NOTES',
  'DEVELOPMENT',
  'ANNOUNCEMENT'
];

export const NEWS_DATA = [
  {
    id: 'commit-b96bcf2-balancing',
    slug: 'patch-notes-combat-balancing-stat-scaling',
    title: 'Patch Notes: Combat Damage Rebalancing & Stat Scaling',
    category: 'PATCH NOTES',
    date: 'September 28, 2026',
    readTime: '3 min read',
    author: 'Zeeynrs',
    featured: true,
    commitHash: 'b96bcf2',
    commitFullSha: 'b96bcf2a307b9ad8ff052a9dc819f7432a4277eb',
    commitRepo: 'Zeeynrs/ARC-SLASH-ARPG',
    commitUrl: 'https://github.com/Zeeynrs/ARC-SLASH-ARPG/commit/b96bcf2a307b9ad8ff052a9dc819f7432a4277eb',
    commitMessage: 'BALANCING',
    excerpt: 'Combat system balance adjustments targeting player base attack curves, defense mitigation formulas, and mob health pools in js/combat.js.',
    tags: ['Balancing', 'Combat System', 'js/combat.js', 'Scaling'],
    content: `
### Combat System Rebalancing & Stat Scaling

Following extensive playtesting across the deeper dungeon chambers, we have deployed critical balance tuning in \`js/combat.js\` to guarantee fair and responsive combat.

---

### Key Combat Balance Changes:
- **Player Damage Calculations**:
  - Re-normalized attack multipliers across Knight broadsword swings, Mage arcana bursts, and Assassin rapid critical strikes.
  - Adjusted damage scaling coefficients to ensure equipment upgrades feel rewarding and impactful through Stages 25 to 50.
- **Armor & Defense Mitigation**:
  - Fine-tuned defense mitigation curves so tank builds maintain meaningful survivability against apex bosses without trivializing encounters.
- **Automated Regression Verification**:
  - Expanded assertions in \`tests/test_game_systems.js\` to ensure zero regression in damage formulas and hitbox boundaries across all 3 character classes.

> "A balanced blade cuts truer than raw numbers alone."
    `
  },
  {
    id: 'commit-a73ff19-intro-arsenal-trailer',
    slug: 'web-update-intro-model-paginated-arsenal-sealed-trailer',
    title: 'Web Showcase v1.1: Intro Character Overhaul, Paginated Arsenal & Sealed Retro CRT Trailer',
    category: 'UPDATES',
    date: 'September 27, 2026',
    readTime: '4 min read',
    author: 'Zeeynrs',
    featured: false,
    commitHash: 'a73ff19',
    commitFullSha: 'a73ff194de2059bb60eeabfcf7549730521dc650',
    commitRepo: 'Zeeynrs/Web_ARC-SLASH-ARPG',
    commitUrl: 'https://github.com/Zeeynrs/Web_ARC-SLASH-ARPG/commit/a73ff194de2059bb60eeabfcf7549730521dc650',
    commitMessage: 'feat: enhance intro character model, add collapsible/paginated arsenal, and seal trailer section',
    excerpt: 'Major visual and UX upgrades to the promotional portal: procedural knight intro model, collapsible paginated arsenal encyclopedia, and sealed CRT trailer playback reel.',
    tags: ['Intro Cutscene', 'Arsenal Encyclopedia', 'Trailer Section', 'Pixel Art'],
    content: `
### Major Promotional Portal Enhancement

This update brings substantive visual fidelity and UX improvements to the Parallel Dungeons web showcase portal, elevating the user experience for competition showcase.

---

### Highlights of This Release:
- **High-Fidelity Opening Cutscene**:
  - Re-engineered the Knight character model in \`OpeningCutscene.jsx\` with pixel-perfect shading, dynamic sword glint reflection, and torch illumination.
- **Collapsible & Paginated Arsenal Encyclopedia**:
  - Added expandable category drawers for all 6 equipment slots (Weapons, Armor, Helmets, Shields, Boots, Capes).
  - Added responsive pagination controls (6 items per page) to smoothly browse over 100+ items without visual clutter.
- **Sealed Retro CRT Trailer**:
  - Upgraded \`TrailerSection.jsx\` with an authentic 16-bit arcade TV chassis, scanline flicker effects, and real-time Canvas 2D gameplay reel playback.
- **Renderer Performance**:
  - Optimized pixel rendering routines in \`src/utils/pixelRenderer.js\` for smoother frame rates across low-power mobile devices.
    `
  },
  {
    id: 'commit-2ca4b6f-attribution-credits',
    slug: 'announcement-copyright-disclaimers-attribution-credits',
    title: 'Announcement: Copyright Disclaimers & Attribution Credits',
    category: 'ANNOUNCEMENT',
    date: 'September 27, 2026',
    readTime: '2 min read',
    author: 'Zeeynrs',
    featured: false,
    commitHash: '2ca4b6f',
    commitFullSha: '2ca4b6fa6d04adbb5fc86ffc746d4250eb77df30',
    commitRepo: 'Zeeynrs/ARC-SLASH-ARPG',
    commitUrl: 'https://github.com/Zeeynrs/ARC-SLASH-ARPG/commit/2ca4b6fa6d04adbb5fc86ffc746d4250eb77df30',
    commitMessage: 'docs: add copyright disclaimers and Minecraft attribution credits',
    excerpt: 'Formal documentation and attribution notices added to the repository regarding Deep Dark biome aesthetics and Warden acoustic boss mechanics.',
    tags: ['Documentation', 'Attribution', 'Minecraft Lore', 'Open Source'],
    content: `
### Attribution Notices & Aesthetic Inspiration Credits

We have updated repository documentation to formally recognize the creative inspirations behind selected dungeon biomes and boss mechanics.

---

### Disclaimers & Attribution:
- **Aesthetic Inspirations**:
  - The Deep Dark biome (Stages 23–35) and The Warden apex boss encounter are artistic homages inspired by the Deep Dark and Warden designs from Minecraft (Mojang Studios / Microsoft Corporation).
- **Independent Implementation**:
  - All sprites, combat scripts, procedural Canvas 2D algorithms, and Web Audio synthesis routines in Parallel Dungeons are 100% custom-written and original code.
- **Open Source Licensing**:
  - Parallel Dungeons is distributed under the GNU General Public License v3.0 (GPL-3.0) for educational and non-commercial game development purposes.
    `
  },
  {
    id: 'commit-fe226e2-deploy-workflow',
    slug: 'devops-automated-github-pages-actions-deploy-workflow',
    title: 'DevOps: Automated CI/CD GitHub Pages Deployment via GitHub Actions',
    category: 'DEVELOPMENT',
    date: 'September 27, 2026',
    readTime: '3 min read',
    author: 'Zeeynrs',
    featured: false,
    commitHash: 'fe226e2',
    commitFullSha: 'fe226e24cf813def2b082c5bb39f7944a9b2a8a6',
    commitRepo: 'Zeeynrs/Web_ARC-SLASH-ARPG',
    commitUrl: 'https://github.com/Zeeynrs/Web_ARC-SLASH-ARPG/commit/fe226e24cf813def2b082c5bb39f7944a9b2a8a6',
    commitMessage: 'Enhance deploy workflow to push to gh-pages branch',
    excerpt: 'Configured automated GitHub Actions workflow to build and push production Vite bundles directly to the gh-pages branch with .nojekyll support.',
    tags: ['CI/CD', 'GitHub Actions', 'GitHub Pages', 'DevOps'],
    content: `
### Continuous Integration & Automated GitHub Pages Deployment

We configured and enhanced automated deployment for the Parallel Dungeons web showcase using GitHub Actions to enable automated continuous delivery.

---

### Workflow Architecture:
- **Automated Workflow (\`.github/workflows/deploy.yml\`)**:
  - Triggers on every push to the \`main\` branch.
  - Installs Node.js dependencies, runs Vite production build (\`npm run build\`), and pushes the \`dist/\` directory to the \`gh-pages\` branch via \`JamesIves/github-pages-deploy-action\`.
- **Public \`.nojekyll\` Integration**:
  - Added \`.nojekyll\` to the \`public/\` directory ensuring GitHub Pages' default Jekyll engine does not suppress Vite assets in directories starting with underscores.
- **Base Path Routing**:
  - Updated \`vite.config.js\` to ensure all asset URLs correctly resolve on GitHub Pages sub-paths.
    `
  },
  {
    id: 'commit-494d9ad-regen-dragon-boss',
    slug: 'boss-update-ancient-dragon-full-hp-regen-enrage',
    title: 'Boss Encounter: Ancient Dragon Full HP Regeneration & Enraged Phase 2',
    category: 'UPDATES',
    date: 'September 26, 2026',
    readTime: '3 min read',
    author: 'Zeeynrs',
    featured: false,
    commitHash: '494d9ad',
    commitFullSha: '494d9ad22fcf8db4f4b83e477f93da6440f4a913',
    commitRepo: 'Zeeynrs/ARC-SLASH-ARPG',
    commitUrl: 'https://github.com/Zeeynrs/ARC-SLASH-ARPG/commit/494d9ad22fcf8db4f4b83e477f93da6440f4a913',
    commitMessage: 'REGEN FULL HP DRAGON BOSS',
    excerpt: 'Stage 21-22 Apex Encounter overhaul: The Ancient Dragon now channels primal flames upon reaching 0 HP, regenerating to full health with intensified attacks.',
    tags: ['Boss: Ancient Dragon', 'Phase 2', 'HP Regen', 'Enrage Mode'],
    content: `
### Boss Mechanics: The Ancient Dragon Awakens Phase 2

The Stage 21-22 boss encounter in the Lava Caverns has been reworked to provide a thrilling mid-game challenge with an authentic two-phase encounter.

---

### Boss Mechanics Breakdown:
- **Primal Flame Rebirth**:
  - When the Ancient Dragon's health bar is initially depleted, it triggers an invulnerable roar animation and regenerates back to 100% maximum HP.
- **Enrage Attack Patterns**:
  - Increased projectile velocity for infernal fireballs.
  - Flame breath cooldown decreased by 25%.
  - Visual aura shifts into a glowing crimson rage tint.
- **Technical Implementation**:
  - Implemented state tracking in \`js/combat.js\` and \`js/main.js\`.
  - Added full test coverage in \`tests/test_new_features.js\`.
    `
  },
  {
    id: 'commit-137fb19-rekeybind-settings',
    slug: 'update-custom-desktop-keybinds-audio-settings-polish',
    title: 'Update: Custom Desktop Keybinds System & Audio Synth Optimization',
    category: 'UPDATES',
    date: 'September 26, 2026',
    readTime: '4 min read',
    author: 'Zeeynrs',
    featured: false,
    commitHash: '137fb19',
    commitFullSha: '137fb19136269d4784e08776e0a92d8353bd188a',
    commitRepo: 'Zeeynrs/ARC-SLASH-ARPG',
    commitUrl: 'https://github.com/Zeeynrs/ARC-SLASH-ARPG/commit/137fb19136269d4784e08776e0a92d8353bd188a',
    commitMessage: 'FIX REKEYBIND AND SETTINGS',
    excerpt: 'Full desktop control remapping for movement, attacks, dodging, and skills. Optimized Web Audio synthesizer node pooling for zero-latency audio.',
    tags: ['Keybindings', 'Settings', 'Web Audio API', 'Input System'],
    content: `
### Desktop Control Rebinding & Audio Pipeline Overhaul

Players can now fully customize keyboard controls to match their personal playstyles, paired with substantial audio performance optimizations.

---

### What's New:
- **Custom Desktop Keybinding System**:
  - Rebindable actions for Move Up/Down/Left/Right, Attack, Dodge/Dash, Skill 1, 2, 3, Shop, Pause, Restart, and Interact.
  - Dual-key support (e.g. WASD and Arrow Keys simultaneously supported).
  - Saved preferences automatically persist in browser \`localStorage\`.
- **Dynamic HUD Feedback**:
  - Keybind labels on the in-game HUD dynamically reflect user custom key mappings.
- **Audio Synthesizer Node Pooling**:
  - Overhauled oscillator and gain node lifecycle in \`js/audio.js\` to eliminate audio thread garbage collection pauses.
    `
  },
  {
    id: 'commit-a44e2bd-engine-tickrate-iframes',
    slug: 'engine-architecture-60fps-tickrate-iframes-dash-mob-ai',
    title: 'Engine Architecture: 60 FPS Fixed Tickrate, i-Frames Dash & Mob AI',
    category: 'DEVELOPMENT',
    date: 'September 26, 2026',
    readTime: '5 min read',
    author: 'Zeeynrs',
    featured: false,
    commitHash: 'a44e2bd',
    commitFullSha: 'a44e2bd266a654ba3ea18c27ee350eb281657938',
    commitRepo: 'Zeeynrs/ARC-SLASH-ARPG',
    commitUrl: 'https://github.com/Zeeynrs/ARC-SLASH-ARPG/commit/a44e2bd266a654ba3ea18c27ee350eb281657938',
    commitMessage: 'UPDATE MAP TICKRATE IFRAMES ART AND AI',
    excerpt: 'Major engine upgrade introducing invulnerability frames during player dashes, 60 FPS fixed tickrate physics, safe chamber spawning, and slime puddle hazards.',
    tags: ['Engine', 'i-Frames', '60 FPS Tickrate', 'Mob AI', 'Safe Spawn'],
    content: `
### Fundamental Engine Architecture Upgrade

A massive low-level engine overhaul addressing game loop timing, player mobility, and dungeon generation fairness.

---

### Core Architectural Features:
- **60 FPS Fixed Engine Tickrate**:
  - Physics and collision calculations now run on a deterministic fixed delta-time step, guaranteeing identical game feel across 60Hz, 120Hz, and 144Hz displays.
- **Invulnerability Frames (i-Frames) Dash**:
  - Introduced \`player.iFrames\` and \`startPlayerDodge()\`. Dashing through enemy attacks and telegraph zones now grants brief invulnerability.
- **Safe Spawn Corridor**:
  - Chamber generation algorithm now enforces a safe radius around entrance doors, preventing unfair instant mob damage on room transitions.
- **Environmental Hazards**:
  - Added procedural slime puddles in \`js/mobs.js\` that apply temporary movement deceleration.
- **AI Tracking & Species Sizing**:
  - Optimized monster pathfinding around walls and calibrated physical sprite bounding boxes for Dragon (52px), Zombie (24px), and Skeleton (22px).
    `
  },
  {
    id: 'commit-81bd787-mobile-ui-overhaul',
    slug: 'patch-notes-mobile-ui-redesign-touch-controls-ergo',
    title: 'Patch Notes: Mobile UI Redesign & Touch Controls Overhaul',
    category: 'PATCH NOTES',
    date: 'September 26, 2026',
    readTime: '3 min read',
    author: 'Zeeynrs',
    featured: false,
    commitHash: '81bd787',
    commitFullSha: '81bd787d1680dd19cf77134e4043415c62dd355f',
    commitRepo: 'Zeeynrs/ARC-SLASH-ARPG',
    commitUrl: 'https://github.com/Zeeynrs/ARC-SLASH-ARPG/commit/81bd787d1680dd19cf77134e4043415c62dd355f',
    commitMessage: 'feat(ui): convert mobile utility bar to vertical column with pixel art icons',
    excerpt: 'Redesigned mobile UI layout with a vertical utility sidebar, enlarged touch hitboxes, removed blue tap highlights, and resolved achievement pagination bugs.',
    tags: ['Mobile UI', 'Touch Controls', 'Utility Bar', 'Bug Fixes'],
    content: `
### Mobile UX Refinements & Touch Ergonomics

Following mobile device testing, we restructured the mobile gamepad overlay for enhanced precision and thumb ergonomics.

---

### Changes & Bug Fixes:
- **Vertical Utility Bar**:
  - Replaced crowded horizontal top bars with an ergonomic vertical sidebar containing pixel-art action icons.
- **Enlarged Touch Hitboxes**:
  - Virtual joystick and ability action buttons enlarged by 20% to prevent dropped inputs during rapid boss battles.
- **Bug Fixes**:
  - Fixed pause menu achievement hitbox overlaps.
  - Resolved mobile double-tap bug where pagination buttons skipped directly from Page 1 to Page 3.
  - Removed WebKit tap highlight blue rectangular glow (\`-webkit-tap-highlight-color: transparent\`).
    `
  },
  {
    id: 'commit-0e1cd38-early-balancing',
    slug: 'patch-notes-early-combat-mob-scaling-balancing',
    title: 'Patch Notes: Early Combat & Mob Scaling Tuning',
    category: 'PATCH NOTES',
    date: 'September 24, 2026',
    readTime: '3 min read',
    author: 'Zeeynrs',
    featured: false,
    commitHash: '0e1cd38',
    commitFullSha: '0e1cd385e1e20c1079ab11c1a014070c1b3cfc5d',
    commitRepo: 'Zeeynrs/ARC-SLASH-ARPG',
    commitUrl: 'https://github.com/Zeeynrs/ARC-SLASH-ARPG/commit/0e1cd385e1e20c1079ab11c1a014070c1b3cfc5d',
    commitMessage: 'BALANCING',
    excerpt: 'Balance tuning targeting Stages 1 through 20: mob HP adjustments, slime damage scaling, and gold drop rates in the early dungeon floors.',
    tags: ['Balancing', 'Mob Stats', 'Early Game', 'Shop Economy'],
    content: `
### Early Dungeon Balance Tuning

To ensure a smooth difficulty progression curve for new adventurers, we re-tuned base stats and reward economics across Stages 1–20.

---

### Adjustments:
- **Stages 1–10 (Slime Dungeon)**:
  - Reduced toxic slime projectile velocity.
  - Adjusted Slime King leap stun recovery duration.
- **Stages 11–20 (Ancient Crypt)**:
  - Skeleton archer arrow hitbox narrowed by 15% to allow cleaner dodge rolls.
  - Zombie swarm health scaled down to reward crowd-control spell usage.
- **Gold & Economy**:
  - Increased early stage gold drops to allow purchasing basic equipment prior to the first boss fight.
    `
  },
  {
    id: 'commit-1e80264-initial-launch',
    slug: 'announcement-parallel-dungeons-official-release-web-portal',
    title: 'Announcement: Parallel Dungeons Retro 16-Bit Web ARPG Official Launch',
    category: 'ANNOUNCEMENT',
    date: 'September 23, 2026',
    readTime: '3 min read',
    author: 'Zeeynrs',
    featured: false,
    commitHash: '1e80264',
    commitFullSha: '1e802648d18849ecb41b7977c0cb9517007ada88',
    commitRepo: 'Zeeynrs/ARC-SLASH-ARPG',
    commitUrl: 'https://github.com/Zeeynrs/ARC-SLASH-ARPG/commit/1e802648d18849ecb41b7977c0cb9517007ada88',
    commitMessage: 'Release 🎮',
    excerpt: 'Official release of Parallel Dungeons! A zero-asset 16-bit retro dark fantasy ARPG built in vanilla HTML5 Canvas 2D and Web Audio API with 50 floors and 3 classes.',
    tags: ['Launch', '50 Stages', '3 Classes', 'Zero Asset Engine'],
    content: `
### Welcome to Parallel Dungeons

We are excited to announce the official release of **Parallel Dungeons**, a retro 16-bit dark fantasy Action RPG engineered entirely in modern web technologies.

---

### Core Pillars:
- **Zero External Assets**:
  - Every sprite, tile, weapon, and particle effect is drawn procedurally using mathematical Canvas 2D routines.
  - Every sound effect, ambient subterranean drone, and combat slash is synthesized in real time via the native browser Web Audio API.
- **50 Handcrafted Labyrinth Floors**:
  - Traverse 5 distinct biomes: Slime Dungeon, Ancient Crypt, Lava Cavern, Deep Dark Biome, and Deep Dark Core.
- **3 Playable Character Classes**:
  - Knight (Stalwart Guardian - Melee/Tank)
  - Mage (Master of Arcana - Ranged Burst)
  - Assassin (Lethal Phantom - Critical DPS)
- **Instant Browser Play**:
  - No client download, no plugins, and cross-platform desktop and mobile support.
    `
  }
];
