# ⚔️ ARC SLASH — Immersive Pixel-Art Promotional Website

> **Official Promotional Showcase, Lore Codex, News & Interactive Experience Website** for the retro 16-bit dark fantasy ARPG game **ARC SLASH**.
> 
> Created for the Web Development Competition with the theme:  
> **"Immersive Gaming Experience Through Web Technology"**

🎮 **Live Game URL**: [https://arch-slash-arpg.netlify.app](https://arch-slash-arpg.netlify.app)

---

## 🌟 Key Features & Architectural Highlights

### 1. 🎬 Cinematic 6-Scene Pixel-Art Opening Cutscene
- **Scene 1 (The Void)**: *"THE DUNGEON REMEMBERS..."* with ambient stardust and subterranean audio drone.
- **Scene 2 (The Torch)**: Flickering pixel-art torch igniting the darkness with procedural fire embers and smoke particles.
- **Scene 3 (The Corridor)**: Parallax 3D perspective dungeon hallway with cobblestone masonry and floating dust.
- **Scene 4 (The Silhouette)**: The Knight advancing toward the screen with light reflecting off the broadsword.
- **Scene 5 (Title Reveal)**: High-impact ARC SLASH logo reveal and dark fantasy typography.
- **Scene 6 (Interactive Gate)**: `[ ENTER THE DUNGEON ]` button with tactile hover audio, screen flash, and descent transition.
- **Skip & Replay**: Instant `[ SKIP ]` button with `localStorage` persistence and in-menu `[ REPLAY INTRO ]` feature.

### 2. 🛡️ Interactive Character Showcase & Codex Wiki
- **3 Playable Classes**:
  - **Knight** (*Stalwart Guardian* — Tank / Melee Juggernaut)
  - **Mage** (*Master of Arcana* — Ranged Burst / Spellcaster)
  - **Assassin** (*Lethal Phantom* — Agile Infiltrator / Critical DPS)
- **Live Canvas 2D Sprites**: Faithfully drawn via procedural mathematical routines matching original game source code (`js/draw/player-render.js`).
- **Interactive Ability Simulator**: Click any ability (*Whirlwind Slash*, *Infernal Fireball*, *Shadow Dash*, *Iron Bastion*, etc.) to watch the sprite animate and trigger authentic synthesizer sound effects.
- **Animated RPG Stat Bars**: HP, ATK, DEF, SPD, MAG.

### 3. 🗺️ 50-Floor Vertical Labyrinth Dungeon Map
- **5 Progressive Biomes**:
  1. *Slime Dungeon / Cave Labyrinth* (Stages 1–10, Boss: Slime King)
  2. *Ancient Crypt & Catacombs* (Stages 11–20, Boss: Skeleton King & Zombie Warlord)
  3. *Lava Cavern & Dragon's Lair* (Stages 21–22, Boss: Ancient Dragon & Sanctuary Alter Ego)
  4. *Deep Dark Biome & Ancient City* (Stages 23–35, Boss: The Warden)
  5. *Deep Dark Core & Abyssal Chasm* (Stages 36–50, Ultimate Climax: True Mirror / Apex Alter Ego)
- **Interactive Node Inspection**: Click any floor node to open the detailed `DungeonModal` containing geography, key enemies, and hazards.

### 4. 👹 Boss Codex & Bestiary
- Detailed combat profiles for **The Warden** (19,800 HP), **Alter Ego / Apex Mirror** (28,800 HP), **Ancient Dragon** (2,200 HP), **Skeleton King** (720 HP), and **Slime King** (540 HP).
- Animated procedural boss canvas models.
- Interactive **"PROVOKE ROAR"** audio trigger causing authentic visceral screen-shake.
- Attack indicators: *Acoustic Sonic Cataclysm*, *Parry Stance & Riposte*, *Inferno Breath*, etc.
- Survival strategies and codex harvest drops.

### 5. 🛡️ Arsenal & Equipment Encyclopedia
- 6 Categories: **Weapons**, **Armor**, **Helmets**, **Shields**, **Boots**, **Capes**.
- Filters by Class Role (**All**, **Knight**, **Mage**, **Assassin**) and live search.
- Interactive item inspection window with stat breakdown, shop gold valuation, and promotional `[ EQUIP ITEM ]` toggle.

### 6. 📜 News, Chronicles & Patch Notes
- Filterable archives: `[ALL]`, `[UPDATES]`, `[PATCH NOTES]`, `[EVENTS]`, `[DEVELOPMENT]`, `[ANNOUNCEMENT]`.
- Rich journal reader modal with authentic update history covering v1.4 *Deep Dark & Warden Descent*, v1.3.2 combat balance, and procedural audio architecture.

### 7. 📺 Official Trailer & 60 FPS Canvas Demo Reel
- Custom 16-bit arcade TV monitor frame with custom retro playback controls.
- Built-in real-time Canvas 2D gameplay simulator demo reel showcasing Slime Dungeon melee, Warden Sonic Cataclysm dodging, and Floor 50 Alter Ego climax.

### 8. 🔊 Procedural Web Audio API Synthesizer
- 100% zero-asset sound engine synthesizing audio in real-time using native browser oscillators:
  - Sword Slashes, Hits, Shield Buffs, Radiant Heals, Explosions, Boss Roars, Coins, and Achievement Fanfares.
  - Subterranean 55Hz ambient drone.
- Full volume and toggle persistence.

### 9. 🕹️ Easter Eggs & In-Universe Settings
- **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) awakens divine arcade power with secret trophy modal!
- **Emblem Secrets**: Repeatedly clicking the ARC SLASH logo unlocks secret dialogue.
- **Hidden Wall Torch**: Interactive torch in footer.
- **Settings Modal**: Audio controls, volume slider, CRT scanlines toggle, screen shake toggle, custom cursor, and reduced motion accessibility.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 + Custom 16-Bit Pixel Art CSS System
- **Rendering**: HTML5 Canvas 2D (Procedural mathematical sprites)
- **Audio**: Web Audio API Synthesizer Engine
- **Typography**: Google Fonts (*Press Start 2P*, *Outfit*, *VT323*)

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build
npm run preview
```

Open `http://localhost:3000` (or the port specified by Vite) in your web browser.
>>>>>>> def4641 (Initial commit: Arc Slash ARPG website)
