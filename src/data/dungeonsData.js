// Authentic Dungeon Biomes and Stage Progression from Parallel Dungeons
export const DUNGEONS_DATA = [
  {
    id: 'slime_dungeon',
    name: 'Slime Dungeon',
    subTitle: 'Cave Labyrinth & Toxic Pits',
    stages: 'Stages 01 — 10',
    depth: 'Depths 100m — 500m',
    threat: '★☆☆☆☆',
    threatLevel: 'Novice',
    themeColor: '#2ecc71',
    accentColor: '#4ade80',
    bgColor: '#06170d',
    borderColor: '#166534',
    desc: 'A damp, subterranean network of stone corridors infested with acidic slimes and toxic residue. Novice adventurers must learn to navigate tight choke points and manage hazard puddles.',
    environment: 'Carved cobblestone, glowing emerald lichen, toxic slime pools, flickering wooden torches, narrow labyrinthine stone walls.',
    enemies: [
      { name: 'Normal Slime', desc: 'Standard green slime that bounces directly toward players' },
      { name: 'Toxic Slime', desc: 'Poisonous slime leaving lingering damage residue' },
      { name: 'Speed Slime', desc: 'Fast blue slime darting aggressively between walls' },
      { name: 'Slime Captain', desc: 'Mini-boss of Stage 5, tough gelatinous commander' }
    ],
    boss: {
      name: 'Slime King',
      stage: 'Stage 10',
      title: 'Gelatinous Throne Monarch',
      hp: 540,
      desc: 'A colossal purple slime lord that splits into toxic mini-slimes and unleashes radial slime splashes.'
    },
    traps: 'Toxic slime spills, narrow wall dead-ends, multi-directional mob ambushes.'
  },
  {
    id: 'ancient_crypt',
    name: 'Ancient Crypt',
    subTitle: 'Catacombs & Tomb of the Warlord',
    stages: 'Stages 11 — 20',
    depth: 'Depths 600m — 1,200m',
    threat: '★★☆☆☆',
    threatLevel: 'Dangerous',
    themeColor: '#9b59b6',
    accentColor: '#c084fc',
    bgColor: '#140c1c',
    borderColor: '#6b21a8',
    desc: 'Ancient forgotten mausoleums where fallen legionnaires and restless souls wander in eternal servitude. Necrotic magic fills the air and arrow traps guard forbidden crypts.',
    environment: 'Cold granite masonry, cracked stone sarcophagi, soul candles, spectral dust, ancient iron portcullises.',
    enemies: [
      { name: 'Zombie Soldier', desc: 'Heavily armored shambling zombie with high endurance' },
      { name: 'Skeleton Archer', desc: 'Ranged skeleton firing sniper arrows with predictive aim' },
      { name: 'Shadow Wraith', desc: 'Fast floating phantom passing through wall corners' },
      { name: 'Zombie Warlord', desc: 'Mini-boss of Stage 15 wielding a rusted iron cleaver' }
    ],
    boss: {
      name: 'Skeleton King',
      stage: 'Stage 20',
      title: 'Monarch of the Catacombs',
      hp: 720,
      desc: 'Wields a necrotic broadsword, summons bone phalanxes, and barrages the battlefield with piercing arrow volleys.'
    },
    traps: 'Ranged arrow corridors, decaying floor grates, skeleton ambushes.'
  },
  {
    id: 'lava_cavern',
    name: 'Lava Cavern',
    subTitle: "Molten Abyss & Dragon's Lair",
    stages: 'Stages 21 — 22',
    depth: 'Depths 1,300m — 1,800m',
    threat: '★★★☆☆',
    threatLevel: 'Lethal',
    themeColor: '#f97316',
    accentColor: '#fb923c',
    bgColor: '#1c0d05',
    borderColor: '#9a3412',
    desc: 'The geothermal depths beneath the crust. Rivers of bubbling magma divide the stone platforms, and ancient draconic beasts guard the gateway to the deep abyss.',
    environment: 'Basalt pillars, roaring magma channels, molten lava geysers, searing ash clouds, scorched obsidian stone.',
    enemies: [
      { name: 'Magma Wyrm', desc: 'Burrowing serpent spouting fire blasts' },
      { name: 'Flame Elemental', desc: 'Living fireball with explosive death rattle' },
      { name: 'Ancient Dragon', desc: 'Colossal Stage 21 Boss spewing devastating flamethrower torrents' }
    ],
    boss: {
      name: 'Sanctuary Alter Ego',
      stage: 'Stage 22',
      title: 'Dark Reflection Nemesis',
      hp: 8438,
      desc: 'The player’s dark shadow twin. Capable of parrying attacks, counter-riposting, and unleashing mirror class abilities.'
    },
    traps: 'Magma rivers causing continuous fire ticks, exploding volcanic debris.'
  },
  {
    id: 'deep_dark',
    name: 'Deep Dark Biome',
    subTitle: 'Ancient City & Sculk Ruins',
    stages: 'Stages 23 — 35',
    depth: 'Depths 1,900m — 3,200m',
    threat: '★★★★☆',
    threatLevel: 'Catastrophic',
    themeColor: '#06b6d4',
    accentColor: '#22d3ee',
    bgColor: '#04121a',
    borderColor: '#0e7490',
    desc: 'A petrified civilization overgrown by organic sculk vines and soul moss. Complete darkness envelops the ruins, and any loud footsteps awaken ancient horrors that hunt by acoustic vibration.',
    environment: 'Deepslate tiles, sculk moss carpets, bioluminescent soul lanterns, echo chambers, pulsing shrieker horns.',
    enemies: [
      { name: 'Sculk Crawler', desc: 'Skittering sculk creature swarming rapidly from dark corners' },
      { name: 'Sculk Zombie', desc: 'Corrupted undead infused with sculk tendrils' },
      { name: 'Sculk Phantom', desc: 'Gliding shadow beast dive-bombing from cavern ceilings' },
      { name: 'Sculk Titan', desc: 'Mini-boss of Stage 30, colossal sculk-plated juggernaut' }
    ],
    boss: {
      name: 'The Warden',
      stage: 'Stage 35',
      title: 'Apex Ancient Titan',
      hp: 19800,
      desc: 'An eyeless titan of terrifying strength. Features a beating soul cage in its chest, brutal ground slams, and the Acoustic Sonic Cataclysm beam.'
    },
    traps: 'Darkness blindness vignettes, acoustic vibration triggers, sculk screechers.'
  },
  {
    id: 'abyssal_core',
    name: 'Deep Dark Core',
    subTitle: 'The Abyssal Chasm & Void Core',
    stages: 'Stages 36 — 50',
    depth: 'Depths 3,300m — 5,000m (Ultimate)',
    threat: '★★★★★',
    threatLevel: 'Apex Nightmare',
    themeColor: '#6366f1',
    accentColor: '#818cf8',
    bgColor: '#09081a',
    borderColor: '#4338ca',
    desc: 'Beyond the Warden lies the abyss where space and reflection shatter into infinite mirrors. The ultimate 50th floor tests the limits of any warrior seeking the final truth of the dungeon.',
    environment: 'Floating void shards, shattered mirror portals, cosmic null space, pulsating dark matter, rift distortions.',
    enemies: [
      { name: 'Soul Colossus', desc: 'Stage 40 Mini-Boss animated by thousands of entrapped souls' },
      { name: 'Shadow Doppelganger', desc: 'Stage 45 Clone mimicking player movement vectors' },
      { name: 'Void Apparitions', desc: 'Ethereal horrors phase-shifting across the room' }
    ],
    boss: {
      name: 'True Mirror / Apex Alter Ego',
      stage: 'Stage 50',
      title: 'The Final Climax',
      hp: 28800,
      desc: 'The ultimate boss of Parallel Dungeons. S-Tier AI with instant parry ripostes, void cataclysms, multi-shadow illusions, and enrage phase.'
    },
    traps: 'Mirror hall illusions, void vortex pulls, dimensional rift collapse.'
  }
];
