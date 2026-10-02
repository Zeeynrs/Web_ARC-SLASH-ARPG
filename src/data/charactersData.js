// Authentic Character Data from Parallel Dungeons Source Code
export const CHARACTERS_DATA = [
  {
    id: 'knight',
    name: 'Knight',
    title: 'Stalwart Guardian',
    role: 'Tank / Melee Juggernaut',
    icon: '⚔️',
    quote: 'My shield is the bulwark against which evil shatters.',
    desc: 'High defense, resilient armor, and wide sweeping arc slashes capable of clearing entire hordes in close combat.',
    themeColor: '#3b82f6',
    accentColor: '#60a5fa',
    bgGradients: 'from-blue-950/60 via-slate-900/80 to-[#080a0f]',
    stats: {
      hp: 120,
      maxHpDisplay: '120 / 120',
      shield: 60,
      damage: 24,
      speed: 2.4,
      ratings: { hp: 5, atk: 4, def: 5, spd: 3, mag: 2 }
    },
    abilities: [
      {
        id: 'skill_whirlwind',
        name: 'Whirlwind Slash',
        description: 'Spinning 360-degree blade tempest damaging all surrounding enemies in a 80px radius.',
        icon: '🌀',
        cooldown: '5.0s',
        damage: 45,
        type: 'Area of Effect (AOE)',
        color: '#f1c40f',
        unlock: 'Stage 1'
      },
      {
        id: 'skill_iron_bastion',
        name: 'Iron Bastion',
        description: 'Instantly restores 40 Armor points and grants an impenetrable barrier with increased mitigation.',
        icon: '🛡️',
        cooldown: '9.0s',
        damage: 0,
        type: 'Defensive Buff',
        color: '#00e5ff',
        unlock: 'Stage 3'
      },
      {
        id: 'skill_shield_bash',
        name: 'Shield Bash',
        description: 'Charges forward with an immovable steel bulwark, stunning foes and applying massive knockback.',
        icon: '🛡️💥',
        cooldown: '7.0s',
        damage: 60,
        type: 'Knockback / Stun',
        color: '#38bdf8',
        unlock: 'Stage 5'
      }
    ],
    equipment: [
      { name: 'Dragon Slayer Greatsword', tier: 'Tier IV', desc: 'Legendary forged blade bathed in ancient drake blood' },
      { name: 'Paladin Steel Plate', tier: 'Tier IV', desc: 'Impenetrable forged plate with reinforced pauldrons' },
      { name: 'Aegis Tower Shield', tier: 'Tier IV', desc: 'Towering shield that deflects colossal boss blows' }
    ],
    playstyle: [
      'Absorb punishing damage with high base Armor and Shield recharge',
      'Use Whirlwind Slash to eliminate clusters of dungeon slimes and skeletons',
      'Engage bosses head-on by timing Iron Bastion before heavy telegraph attacks'
    ]
  },
  {
    id: 'mage',
    name: 'Mage',
    title: 'Master of Arcana',
    role: 'Ranged Burst / Spellcaster',
    icon: '🔮',
    quote: 'The primal elements answer only to wisdom and focus.',
    desc: 'Hurls mystic magic bolts, devastating firestorms, and cosmic thunderbolts while manipulating recovery wards.',
    themeColor: '#a855f7',
    accentColor: '#c084fc',
    bgGradients: 'from-purple-950/60 via-slate-900/80 to-[#080a0f]',
    stats: {
      hp: 85,
      maxHpDisplay: '85 / 85',
      shield: 40,
      damage: 22,
      speed: 2.5,
      ratings: { hp: 3, atk: 5, def: 2, spd: 3, mag: 5 }
    },
    abilities: [
      {
        id: 'skill_fireball_blast',
        name: 'Infernal Fireball',
        description: 'Hurls a massive sphere of concentrated flame that detonates into an explosive 90px firestorm.',
        icon: '🔥',
        cooldown: '4.5s',
        damage: 50,
        type: 'Explosive AOE',
        color: '#ff5722',
        unlock: 'Stage 1'
      },
      {
        id: 'skill_radiant_heal',
        name: 'Radiant Heal',
        description: 'Channels restoration celestial light directly regenerating 60 HP to survive deadly dungeon traps.',
        icon: '💚',
        cooldown: '10.0s',
        damage: 0,
        type: 'Restoration',
        color: '#2ecc71',
        unlock: 'Stage 3'
      },
      {
        id: 'skill_arcane_storm',
        name: 'Cosmic Thunderstorm',
        description: 'Summons violent cosmic lightning bolts that simultaneously target up to 7 enemies across the chamber.',
        icon: '⚡',
        cooldown: '8.0s',
        damage: 65,
        type: 'Full Screen Burst',
        color: '#c084fc',
        unlock: 'Stage 5'
      }
    ],
    equipment: [
      { name: 'Celestial Star Wand', tier: 'Tier IV', desc: 'Crystalline staff channeling the pure radiance of cosmic astral dust' },
      { name: 'Archmage Robes', tier: 'Tier IV', desc: 'Woven with mana-conductive threads that accelerate spellcasting' },
      { name: 'Astral Focus Orb', tier: 'Tier IV', desc: 'Floating catalyst maintaining permanent mana shields' }
    ],
    playstyle: [
      'Maintain long range and use homing projectile steering to strike from safety',
      'Deploy Infernal Fireball into enemy spawn choke points',
      'Save Radiant Heal for clutch recoveries during high-floor boss encounters'
    ]
  },
  {
    id: 'assassin',
    name: 'Assassin',
    title: 'Lethal Phantom',
    role: 'Agile Infiltrator / Critical DPS',
    icon: '🗡️',
    quote: 'They will not hear my footsteps until the steel has already bitten.',
    desc: 'Unmatched movement velocity, phantom smoke evasion, radial poison daggers, and lethal critical strikes.',
    themeColor: '#10b981',
    accentColor: '#34d399',
    bgGradients: 'from-emerald-950/60 via-slate-900/80 to-[#080a0f]',
    stats: {
      hp: 95,
      maxHpDisplay: '95 / 95',
      shield: 45,
      damage: 18,
      speed: 3.1,
      ratings: { hp: 3, atk: 4, def: 3, spd: 5, mag: 3 }
    },
    abilities: [
      {
        id: 'skill_shadow_dash',
        name: 'Shadow Dash',
        description: 'Dashes forward with supersonic speed, slashing through every enemy in the traversal path with i-frames.',
        icon: '🗡️',
        cooldown: '4.0s',
        damage: 45,
        type: 'Dash / Pierce',
        color: '#10b981',
        unlock: 'Stage 1'
      },
      {
        id: 'skill_smoke_bomb',
        name: 'Phantom Smoke Bomb',
        description: 'Deploys an obsidian smoke cloud granting 3 seconds of complete invulnerability and huge sprint speed boost.',
        icon: '💨',
        cooldown: '9.0s',
        damage: 0,
        type: 'Stealth / Invulnerable',
        color: '#94a3b8',
        unlock: 'Stage 3'
      },
      {
        id: 'skill_poison_fan',
        name: 'Poison Dagger Fan',
        description: 'Fires 8 venom-soaked daggers outward in a complete 360-degree circle with continuous poison decay.',
        icon: '☠️',
        cooldown: '7.0s',
        damage: 30,
        type: 'Radial Poison Scatter',
        color: '#34d399',
        unlock: 'Stage 5'
      }
    ],
    equipment: [
      { name: 'Abyssal Soulfang', tier: 'Tier IV', desc: 'Twin daggers carved from dragon teeth dipped in toxic sculk venom' },
      { name: 'Nightstalker Garb', tier: 'Tier IV', desc: 'Ultra-light shadow leather dampening all footsteps and movement sounds' },
      { name: 'Phantom Cowl', tier: 'Tier IV', desc: 'Enchanted hood granting thermal vision and critical vulnerability spotting' }
    ],
    playstyle: [
      'Dart in and out of enemy threat ranges utilizing superior 3.1 base movement speed',
      'Blink through enemy attacks with Shadow Dash immunity frames',
      'Pop Phantom Smoke Bomb to escape lethal boss telegraph zones unharmed'
    ]
  }
];
