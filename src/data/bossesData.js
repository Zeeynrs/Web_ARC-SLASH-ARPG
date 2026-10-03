// Authentic Boss Codex from Parallel Dungeons Game Source
export const BOSSES_DATA = [
  {
    id: 'warden',
    name: 'The Warden',
    title: 'Apex Ancient Titan',
    stage: 'Stage 35 (Ancient City Sanctuary)',
    hp: 19800,
    speed: 0.95,
    species: 'warden',
    threat: 'S+ APEX TITAN',
    themeColor: '#06b6d4',
    accentColor: '#22d3ee',
    bgGradient: 'from-cyan-950/70 via-slate-900/90 to-[#080a0f]',
    dungeon: 'Deep Dark Biome (Ancient City)',
    quote: 'The echoes of the deep silence all who dare tread into the sanctuary.',
    desc: 'Awakened from subterranean petrification beneath thousands of metric tons of deepslate. The Warden lacks physical eyesight, navigating entirely via acoustic sound vibrations, soul scent, and sculk resonance.',
    mechanics: [
      {
        name: 'Acoustic Sonic Cataclysm',
        type: 'Linear Telegraph Hazard',
        desc: 'Charges a concentrated acoustic sonic beam within its chest ribcage. After a 1.2s telegraph line, fires a piercing shockwave that deals 80+ pure damage and penetrates shields.',
        icon: '🔊'
      },
      {
        name: 'Sculk Slam & Radial Quake',
        type: 'Melee Heavy Smash',
        desc: 'Slams both massive fists into the ground, inflicting devastating close-range trauma and triggering an expanding circular shockwave.',
        icon: '💥'
      },
      {
        name: 'Pulsing Soul Cage Heartbeat',
        type: 'Enrage Trigger',
        desc: 'Below 50% HP, the souls imprisoned in its ribcage illuminate in frantic turquoise rhythm, doubling movement speed and telegraph frequencies.',
        icon: '💙'
      },
      {
        name: 'Acoustic Darkness Roar',
        type: 'Screen Debuff',
        desc: 'Emits a room-shaking roar that causes screen shake and darkens the ambient perimeter, obscuring oncoming hazards.',
        icon: '🌑'
      }
    ],
    strategy: [
      'Maintain perimeter positioning; do not remain stationary in front of the chest',
      'Watch for the cyan linear telegraph hazard on the floor and dash perpendicular to dodge the Sonic Boom',
      'Time invulnerability frames (Smoke Bomb / Dash) precisely as the chest blast detonates',
      'Use high-tier elemental weapons or homing arcane bolts to deal sustained damage while retreating'
    ],
    drops: [
      'Sculk Heart Relic',
      'Abyssal Titan Plate (Tier V)',
      'Echo Shard Catalyst',
      '1,500 Gold Coins'
    ],
    actions: [
      { id: 'sonic', name: 'Sonic Cataclysm', icon: '🔊', badge: 'BEAM', desc: 'Charges ribcage and fires a piercing horizontal acoustic sonic beam with shockwaves.' },
      { id: 'slam', name: 'Sculk Quake Slam', icon: '💥', badge: 'SMASH', desc: 'Slams both stone fists down, shattering the floor with rising sculk crystals.' },
      { id: 'roar', name: 'Darkness Roar', icon: '💙', badge: 'ROAR', desc: 'Unhinges jaws with frantic soul palpitations and room-shaking acoustic soundwaves.' }
    ]
  },
  {
    id: 'alter_ego',
    name: 'Alter Ego / Apex Mirror',
    title: 'Corrupted Dark Nemesis',
    stage: 'Stage 22 (Sanctuary) & Stage 50 (Void Core)',
    hp: 28800,
    speed: 1.25,
    species: 'alter_ego',
    threat: 'SSS NIGHTMARE',
    themeColor: '#a855f7',
    accentColor: '#ec4899',
    bgGradient: 'from-purple-950/70 via-slate-900/90 to-[#080a0f]',
    dungeon: 'The Deep Dark Core & Mirror Sanctuary',
    quote: 'I am everything you sought to become in the dark, and everything you fear.',
    desc: 'A sentient dark mirror entity born from the hero’s own reflection. Alter Ego possesses the exact identical class kit (Knight, Mage, or Assassin) but amplified with corrupted void energy and lethal counter-strike AI.',
    mechanics: [
      {
        name: 'Parry Stance & Riposte Counter',
        type: 'Active Defense / Lethal Counter',
        desc: 'Enters a focused defensive stance with cyan/violet shield aura. If the player attacks during parry, Alter Ego instantly executes a PARRY RIPOSTE reflecting 150% damage back.',
        icon: '🛡️⚡'
      },
      {
        name: 'Shadow Mirror Dash',
        type: 'Phase Evasion',
        desc: 'Teleports behind the player with zero startup delay, leaving exploding dark mirages in the wake of the blink.',
        icon: '🗡️'
      },
      {
        name: 'Corrupted Class Ultimate',
        type: 'Role Reversal Burst',
        desc: 'Mirrors the player’s chosen role: Knight unleashes Void Whirlwind, Mage summons Dark Comet Storm, Assassin launches 16 Poison Daggers.',
        icon: '🌀'
      },
      {
        name: 'Stage 50 Apex Mirror Shatter',
        type: 'Void Climax',
        desc: 'At Stage 50, summons two shadowy illusion duplicates that mimic attack patterns while the true boss channels an unavoidable void vortex.',
        icon: '🪞'
      }
    ],
    strategy: [
      'NEVER swing your weapon when the floating text "PARRY STANCE!" appears; wait for the 0.6s stance window to expire',
      'Bait out its forward thrusts, sidestep, and retaliate from the flanks',
      'Save burst skills for immediately after it finishes an attack recovery cycle',
      'Keep your shield topped off with Iron Bastion or Radiant Heal to survive stray ripostes'
    ],
    drops: [
      'True Mirror Shard',
      'Voidwalker Edge (Tier V Abyssal)',
      'Shadow Crown of Reflection',
      '3,000 Gold Coins'
    ],
    actions: [
      { id: 'parry', name: 'Parry Riposte', icon: '🛡️⚡', badge: 'COUNTER', desc: 'Forms an octagonal runic barrier that flashes into a lethal counter-thrust.' },
      { id: 'slash', name: 'Void Cross-Slash', icon: '🗡️', badge: 'SLASH', desc: 'Phases through dimensional rifts leaving dual magenta/violet crescent slashes.' },
      { id: 'clones', name: 'Mirror Shatter', icon: '🪞', badge: 'CLONES', desc: 'Splits into twin shadowy clones channelling dark void vortex comets.' }
    ]
  },
  {
    id: 'ancient_dragon',
    name: 'Ancient Dragon',
    title: 'Sovereign of the Molten Core',
    stage: 'Stage 21 (Dragon’s Lair)',
    hp: 2200,
    speed: 0.85,
    species: 'dragon',
    threat: 'S HIGH DRAGON',
    themeColor: '#ef4444',
    accentColor: '#f97316',
    bgGradient: 'from-red-950/70 via-slate-900/90 to-[#080a0f]',
    dungeon: 'Lava Cavern (Molten Abyss)',
    quote: 'The primordial fire was burning before these dungeons were carved from stone.',
    desc: 'An ancient winged wyrm nesting in the volcanic caldera. Its obsidian-scaled hide repels low-tier steel, and its fiery maw can incinerate entire chambers in seconds.',
    mechanics: [
      {
        name: 'Inferno Flamethrower Breath',
        type: 'Cone Fire Hazard',
        desc: 'Sweeps an intense stream of draconic fire across a 120-degree arc in front of its jaw, igniting the floor.',
        icon: '🔥'
      },
      {
        name: 'Magma Meteor Barrage',
        type: 'Targeted Ground Explosions',
        desc: 'Calls down 5 volcanic boulders that shatter on impact, spawning lingering magma pools.',
        icon: '☄️'
      },
      {
        name: 'Draconic Wing Buffet',
        type: 'Radial Knockback',
        desc: 'Beats its massive wings to push the player into surrounding lava rivers while reflecting ranged bolts.',
        icon: '🌪️'
      }
    ],
    strategy: [
      'Attack the dragon’s hind legs and tail to avoid the lethal frontal fire breath',
      'Equip Dragon Slayer or Ice Saber for elemental damage bonus',
      'Stay off glowing red magma floor tiles to prevent burning damage over time'
    ],
    drops: [
      'Dragon Scale Mail (Tier IV)',
      'Dragon Tooth Dagger',
      'Fire Drake Crest',
      '800 Gold Coins'
    ],
    actions: [
      { id: 'breath', name: 'Inferno Breath', icon: '🔥', badge: 'FIRE', desc: 'Rears back and spews a raging torrent of draconic fire and flying molten sparks.' },
      { id: 'meteor', name: 'Magma Meteors', icon: '☄️', badge: 'METEOR', desc: 'Calls down fiery volcanic boulders that explode into lingering magma pools.' },
      { id: 'buffet', name: 'Wing Buffet', icon: '🌪️', badge: 'GALE', desc: 'Beats colossal wings forward, blasting sweeping fire-wind shockwave arcs.' }
    ]
  },
  {
    id: 'skeleton_king',
    name: 'Skeleton King',
    title: 'Monarch of the Catacombs',
    stage: 'Stage 20 (Skeleton King’s Catacomb)',
    hp: 720,
    speed: 0.85,
    species: 'skeleton',
    threat: 'A UNDEAD LORD',
    themeColor: '#f59e0b',
    accentColor: '#fbbf24',
    bgGradient: 'from-amber-950/70 via-slate-900/90 to-[#080a0f]',
    dungeon: 'Ancient Crypt',
    quote: 'Bury your blades in the dirt, mortal; this tomb belongs to the forgotten crown.',
    desc: 'The decayed remains of an ancient king buried with royal insignia. He commands legions of skeletal snipers and wields a spectral broadsword with bone-shattering force.',
    mechanics: [
      {
        name: 'Necrotic Sword Cleave',
        type: 'Wide Frontal Slash',
        desc: 'Performs a sweeping two-handed greatsword swing that covers half the arena.',
        icon: '⚔️'
      },
      {
        name: 'Archer Phalanx Summon',
        type: 'Minion Spawn',
        desc: 'Raises 3 skeleton archers on the perimeter that coordinate sniper crossfire.',
        icon: '🏹'
      }
    ],
    strategy: [
      'Immediately eliminate the summoned skeleton archers before refocusing the King',
      'Dodge roll through his slow greatsword windup'
    ],
    drops: [
      'Ancient Bone Scythe',
      'King’s Jeweled Signet',
      'Catacomb Key',
      '400 Gold Coins'
    ],
    actions: [
      { id: 'cleave', name: 'Necrotic Cleave', icon: '⚔️', badge: 'CLEAVE', desc: 'Two-handed greatsword overhead smash with golden ground fractures and shockwaves.' },
      { id: 'summon', name: 'Summon Archers', icon: '🏹', badge: 'SUMMON', desc: 'Summons two spectral catacomb archers on flanks with glowing phantom bows.' },
      { id: 'wrath', name: 'Monarch Wrath', icon: '👑', badge: 'WRATH', desc: 'Crown flares with radiant amber halo, laughing chattering jaw, and orbiting bone daggers.' }
    ]
  },
  {
    id: 'slime_king',
    name: 'Slime King',
    title: 'Gelatinous Throne Monarch',
    stage: 'Stage 10 (Slime King’s Throne Room)',
    hp: 540,
    speed: 0.8,
    species: 'slime',
    threat: 'B MINI-BOSS',
    themeColor: '#9b59b6',
    accentColor: '#c084fc',
    bgGradient: 'from-purple-950/70 via-slate-900/90 to-[#080a0f]',
    dungeon: 'Slime Dungeon',
    quote: 'Gloop... rumble... splat!',
    desc: 'A massive purple slime crown-bearer that has absorbed countless adventurers and gold coins. When struck, gelatinous fragments split off into independent attacking minions.',
    mechanics: [
      {
        name: 'Colossal Body Slam',
        type: 'Leap Impact',
        desc: 'Leaps high into the air and crashes down, creating a shockwave of toxic slime.',
        icon: '🟣'
      },
      {
        name: 'Gelatinous Division',
        type: 'Mitosis Split',
        desc: 'At 50% HP, spawns 4 miniature toxic slimes while maintaining its own core.',
        icon: '🧪'
      }
    ],
    strategy: [
      'Use AOE skills (Whirlwind Slash / Fireball) to eradicate the mini-slimes quickly',
      'Keep moving in a circular route to avoid landing shockwaves'
    ],
    drops: [
      'Royal Slime Crown',
      'Sticky Slime Shield',
      '200 Gold Coins'
    ],
    actions: [
      { id: 'slam', name: 'Colossal Slam', icon: '🟣', badge: 'SLAM', desc: 'Squashes flat, launches high into the air, and crashes down with giant slime splashes.' },
      { id: 'mitosis', name: 'Mitosis Split', icon: '🧪', badge: 'SPLIT', desc: 'Divides mass into 2 bouncy royal mini-slimes hopping happily on both sides.' },
      { id: 'tantrum', name: 'Crown Tantrum', icon: '👑', badge: 'BOUNCE', desc: 'Wild high-speed gelatinous wobble, spinning crown, and flying bubble coins.' }
    ]
  }
];
