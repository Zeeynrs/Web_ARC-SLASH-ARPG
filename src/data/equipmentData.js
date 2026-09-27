// Authentic Equipment Database from ARC SLASH Game Source
export const EQUIPMENT_CATEGORIES = [
  { id: 'all', label: 'All Gear', icon: '🎒' },
  { id: 'weapon', label: 'Weapons', icon: '⚔️' },
  { id: 'armor', label: 'Armor', icon: '🛡️' },
  { id: 'helmet', label: 'Helmets', icon: '🪖' },
  { id: 'shield', label: 'Shields / Orbs', icon: '🛡️' },
  { id: 'boots', label: 'Boots', icon: '🥾' },
  { id: 'cape', label: 'Capes / Cloaks', icon: '🧣' }
];

export const EQUIPMENT_TIERS = [
  { tier: 1, label: 'Tier I (Starter)', color: '#94a3b8', border: '#475569' },
  { tier: 2, label: 'Tier II (Reforged)', color: '#38bdf8', border: '#0284c7' },
  { tier: 3, label: 'Tier III (Enchanted)', color: '#a855f7', border: '#7c3aed' },
  { tier: 4, label: 'Tier IV (Legendary)', color: '#f59e0b', border: '#d97706' },
  { tier: 5, label: 'Tier V (God-Tier Behemoth)', color: '#06b6d4', border: '#0891b2' }
];

export const EQUIPMENT_DATA = [
  {
    "id": "weapon_rusty_sword",
    "role": "knight",
    "name": "Rusty Broadsword",
    "category": "weapon",
    "tier": 1,
    "price": 0,
    "stats": {
      "atkBonus": 0
    },
    "description": "A worn and rusted starter sword.",
    "lore": "Nicked edges and brown oxidation, yet still sharp enough to slay novice slimes.",
    "accentColor": "#94a3b8",
    "spriteType": "sword"
  },
  {
    "id": "weapon_iron_sword",
    "role": "knight",
    "name": "Forged Iron Sword",
    "category": "weapon",
    "tier": 1,
    "price": 150,
    "stats": {
      "atkBonus": 10
    },
    "description": "A sharp and sturdy tempered iron blade.",
    "lore": "Hammered on the anvils of the surface blacksmiths with dependable balance.",
    "accentColor": "#e2e8f0",
    "spriteType": "sword"
  },
  {
    "id": "weapon_flame_blade",
    "role": "knight",
    "name": "Blazing Fire Blade",
    "category": "weapon",
    "tier": 2,
    "price": 450,
    "stats": {
      "atkBonus": 24
    },
    "description": "Engulfed in eternal flames that incinerate foes.",
    "lore": "Quenched in the magma veins of the 21st floor, embers rise with every swing.",
    "accentColor": "#ef4444",
    "spriteType": "sword_fire"
  },
  {
    "id": "weapon_ice_saber",
    "role": "knight",
    "name": "Ancient Frost Saber",
    "category": "weapon",
    "tier": 2,
    "price": 450,
    "stats": {
      "atkBonus": 20,
      "speedBonus": 0.2
    },
    "description": "A crystalline ice blade that chills enemies.",
    "lore": "Carved from glacial stalactites deep within subterranean ice grottos.",
    "accentColor": "#00e5ff",
    "spriteType": "sword_ice"
  },
  {
    "id": "weapon_shadow_katana",
    "role": "knight",
    "name": "Shadow Greatsword",
    "category": "weapon",
    "tier": 3,
    "price": 1100,
    "stats": {
      "atkBonus": 40,
      "speedBonus": 0.3
    },
    "description": "A massive greatsword bathed in dark energy.",
    "lore": "Its weightless obsidian blade cuts through matter without resistance.",
    "accentColor": "#a855f7",
    "spriteType": "sword_shadow"
  },
  {
    "id": "weapon_dragon_slayer",
    "role": "knight",
    "name": "Dragon Slayer",
    "category": "weapon",
    "tier": 4,
    "price": 2600,
    "stats": {
      "atkBonus": 75,
      "maxHpBonus": 30
    },
    "description": "A legendary greatsword forged to fell dragon kings.",
    "lore": "The crossguard is bathed in molten crimson lacquer and bears draconic heraldry.",
    "accentColor": "#fbbf24",
    "spriteType": "sword_dragon"
  },
  {
    "id": "weapon_christmas_tree",
    "role": "knight",
    "name": "Xmas Tree Broadsword",
    "category": "weapon",
    "tier": 4,
    "price": 3200,
    "stats": {
      "atkBonus": 88,
      "maxHpBonus": 45,
      "defBonus": 10
    },
    "description": "An exclusive Christmas pine blade with a shining gold star. Roulette exclusive!",
    "lore": "A festive holiday pine tree turned into a blunt instrument of cheer and devastation!",
    "accentColor": "#22c55e",
    "spriteType": "weapon",
    "isExclusive": true
  },
  {
    "id": "weapon_sculk_greatsword",
    "role": "knight",
    "name": "Sculk Abyssal Greatsword",
    "category": "weapon",
    "tier": 5,
    "price": 4400,
    "stats": {
      "atkBonus": 135,
      "maxHpBonus": 60,
      "defBonus": 12
    },
    "description": "A colossal blade carved from hardened deepslate infused with living sculk veins and warden souls.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#00f5d4",
    "spriteType": "weapon",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "weapon_titan_breaker",
    "role": "knight",
    "name": "Titan-Breaker Colossus Sword",
    "category": "weapon",
    "tier": 4,
    "price": 3400,
    "stats": {
      "atkBonus": 125,
      "maxHpBonus": 65,
      "defBonus": 12
    },
    "description": "A massive serrated broadsword forged from meteoric core, engineered to shatter boss armor.",
    "lore": "A colossal warhammer forged from deepslate boulders capable of pulverizing titan shields.",
    "accentColor": "#f59e0b",
    "spriteType": "weapon",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "weapon_godslayer_excalibur",
    "role": "knight",
    "name": "Divine Godslayer Excalibur",
    "category": "weapon",
    "tier": 5,
    "price": 5800,
    "stats": {
      "atkBonus": 195,
      "maxHpBonus": 130,
      "defBonus": 24
    },
    "description": "The sacred blade of champions, radiating blinding solar brilliance that slays immortal behemoths.",
    "lore": "The legendary solar blade that cleaves ancient titans in twain with radiant sunfire.",
    "accentColor": "#fbbf24",
    "spriteType": "weapon",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "armor_cloth",
    "role": "knight",
    "name": "Squire Tunic",
    "category": "armor",
    "tier": 1,
    "price": 0,
    "stats": {
      "defBonus": 0
    },
    "description": "Basic cloth protection for novice knights.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "armor"
  },
  {
    "id": "armor_chainmail",
    "role": "knight",
    "name": "Steel Chainmail",
    "category": "armor",
    "tier": 1,
    "price": 180,
    "stats": {
      "defBonus": 3,
      "maxHpBonus": 15
    },
    "description": "Interlocking steel rings offering reliable defense.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "armor"
  },
  {
    "id": "armor_knight_plate",
    "role": "knight",
    "name": "Knight Plate Armor",
    "category": "armor",
    "tier": 2,
    "price": 480,
    "stats": {
      "defBonus": 8,
      "maxHpBonus": 30
    },
    "description": "Heavy steel plate worn by the royal vanguard.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#38bdf8",
    "spriteType": "armor"
  },
  {
    "id": "armor_dark_plate",
    "role": "knight",
    "name": "Dark Steel Plate",
    "category": "armor",
    "tier": 3,
    "price": 1250,
    "stats": {
      "defBonus": 16,
      "maxHpBonus": 50
    },
    "description": "Armor inlaid with curse-warding obsidian.",
    "lore": "Infused with elemental conduits that amplify combat reflexes in the catacombs.",
    "accentColor": "#a855f7",
    "spriteType": "armor"
  },
  {
    "id": "armor_dragon_scale",
    "role": "knight",
    "name": "Elder Dragonscale Armor",
    "category": "armor",
    "tier": 4,
    "price": 2800,
    "stats": {
      "defBonus": 26,
      "maxHpBonus": 90
    },
    "description": "Forged from ancient dragon scales impervious to magma.",
    "lore": "Completely immune to scorching heat and reduces projectile damage significantly.",
    "accentColor": "#dc2626",
    "spriteType": "armor"
  },
  {
    "id": "armor_sculk_plate",
    "role": "knight",
    "name": "Sculk Warden Carapace",
    "category": "armor",
    "tier": 5,
    "price": 4600,
    "stats": {
      "defBonus": 38,
      "maxHpBonus": 120,
      "maxShieldBonus": 70
    },
    "description": "Impenetrable reinforced abyssal plate forged from ancient warden ribs and pulsing sculk catalyst.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "armor",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "armor_colossus_bastion",
    "role": "knight",
    "name": "Colossus Bastion Plate",
    "category": "armor",
    "tier": 4,
    "price": 3600,
    "stats": {
      "defBonus": 42,
      "maxHpBonus": 160,
      "maxShieldBonus": 40
    },
    "description": "Reinforced plate armor that shrugs off catastrophic boss impacts.",
    "lore": "Impenetrable plate armor forged to withstand the brutal blows of Floor 35 guardians.",
    "accentColor": "#f59e0b",
    "spriteType": "armor",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "armor_celestial_divine_cuirass",
    "role": "knight",
    "name": "Celestial Divine Cuirass",
    "category": "armor",
    "tier": 5,
    "price": 6200,
    "stats": {
      "defBonus": 62,
      "maxHpBonus": 250,
      "maxShieldBonus": 85
    },
    "description": "Impenetrable star-forged armor blessed by seraphim to grant immortal vitality.",
    "lore": "Blessed by astral light, absorbing even the most cataclysmic blows from ancient guardians.",
    "accentColor": "#fde047",
    "spriteType": "armor",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "helmet_basic",
    "role": "knight",
    "name": "Knight Iron Helm",
    "category": "helmet",
    "tier": 1,
    "price": 0,
    "stats": {
      "defBonus": 0
    },
    "description": "Standard iron helmet adorned with a red plume.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "helmet"
  },
  {
    "id": "helmet_viking",
    "role": "knight",
    "name": "Horned War Helmet",
    "category": "helmet",
    "tier": 2,
    "price": 360,
    "stats": {
      "defBonus": 5,
      "atkBonus": 10
    },
    "description": "A fierce horned helm worn by fearless warriors.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#38bdf8",
    "spriteType": "helmet"
  },
  {
    "id": "helmet_royal",
    "role": "knight",
    "name": "King's Crowned Helm",
    "category": "helmet",
    "tier": 3,
    "price": 950,
    "stats": {
      "defBonus": 10,
      "maxHpBonus": 25
    },
    "description": "Sapphire-inlaid helm crowned with royal gold ornaments.",
    "lore": "Infused with elemental conduits that amplify combat reflexes in the catacombs.",
    "accentColor": "#a855f7",
    "spriteType": "helmet"
  },
  {
    "id": "helmet_dragon_helm",
    "role": "knight",
    "name": "Blazing Dragon Visor",
    "category": "helmet",
    "tier": 4,
    "price": 2100,
    "stats": {
      "defBonus": 18,
      "atkBonus": 10
    },
    "description": "Carved in the visage of a dragon with glowing golden eyes.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#f59e0b",
    "spriteType": "helmet"
  },
  {
    "id": "helmet_sculk_warden_helm",
    "role": "knight",
    "name": "Warden Horned Greathelm",
    "category": "helmet",
    "tier": 5,
    "price": 3500,
    "stats": {
      "defBonus": 18,
      "maxHpBonus": 65,
      "maxShieldBonus": 40,
      "atkBonus": 10
    },
    "description": "A faceless dread helm adorned with vibrating sonic sensors that detect vibrations in the pitch dark.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "helmet",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "helmet_titan_crown",
    "role": "knight",
    "name": "Titan King Warcrown",
    "category": "helmet",
    "tier": 4,
    "price": 2700,
    "stats": {
      "defBonus": 25,
      "maxHpBonus": 80,
      "atkBonus": 20
    },
    "description": "Crown of ancient titan conquerors, inspiring relentless martial wrath.",
    "lore": "A heavy crested helm forged in the deepslate mines, granting fearless vision.",
    "accentColor": "#f59e0b",
    "spriteType": "helmet",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "helmet_valkyrie_warcrest",
    "role": "knight",
    "name": "Valkyrie Solar Warcrest",
    "category": "helmet",
    "tier": 5,
    "price": 4600,
    "stats": {
      "defBonus": 38,
      "maxHpBonus": 140,
      "atkBonus": 32,
      "maxShieldBonus": 50
    },
    "description": "A radiant golden winged helm forged for champions who face god-level threats.",
    "lore": "Adorned with the wings of ancient battle maidens, granting unmatched battle focus.",
    "accentColor": "#fde047",
    "spriteType": "helmet",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "shield_wooden",
    "role": "knight",
    "name": "Round Wooden Shield",
    "category": "shield",
    "tier": 1,
    "price": 0,
    "stats": {
      "maxShieldBonus": 0
    },
    "description": "A wooden shield emblazoned with a golden cross.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "shield"
  },
  {
    "id": "shield_iron_kite",
    "role": "knight",
    "name": "Steel Kite Shield",
    "category": "shield",
    "tier": 2,
    "price": 350,
    "stats": {
      "maxShieldBonus": 25,
      "defBonus": 3
    },
    "description": "A pointed steel shield built to deflect spears and arrows.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#38bdf8",
    "spriteType": "shield"
  },
  {
    "id": "shield_crystal",
    "role": "knight",
    "name": "Azure Crystal Aegis",
    "category": "shield",
    "tier": 3,
    "price": 1000,
    "stats": {
      "maxShieldBonus": 55,
      "defBonus": 8
    },
    "description": "A crystalline shield projecting an arcane barrier.",
    "lore": "Infused with elemental conduits that amplify combat reflexes in the catacombs.",
    "accentColor": "#00e5ff",
    "spriteType": "shield"
  },
  {
    "id": "shield_dragon_aegis",
    "role": "knight",
    "name": "Dragonbone Aegis",
    "category": "shield",
    "tier": 4,
    "price": 2300,
    "stats": {
      "maxShieldBonus": 85,
      "defBonus": 15
    },
    "description": "A legendary shield set with an unblinking dragon eye.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#ff6d00",
    "spriteType": "shield"
  },
  {
    "id": "shield_sculk_bulwark",
    "role": "knight",
    "name": "Sculk Abyssal Bulwark",
    "category": "shield",
    "tier": 5,
    "price": 3700,
    "stats": {
      "maxShieldBonus": 130,
      "defBonus": 25,
      "maxHpBonus": 45
    },
    "description": "A towering barrier carved of bedded sculk shrieker core, dampening incoming physical shockwaves.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#00f5d4",
    "spriteType": "shield",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "shield_bastion_fortress",
    "role": "knight",
    "name": "Fortress Bastion Tower Shield",
    "category": "shield",
    "tier": 4,
    "price": 2900,
    "stats": {
      "maxShieldBonus": 175,
      "defBonus": 22,
      "atkBonus": 18
    },
    "description": "A massive tower shield built to absorb devastating boss shockwaves.",
    "lore": "A tower shield the size of a castle portcullis that deflects crushing quakes.",
    "accentColor": "#f59e0b",
    "spriteType": "shield",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "shield_aegis_of_the_gods",
    "role": "knight",
    "name": "Aegis of the Immortals",
    "category": "shield",
    "tier": 5,
    "price": 4900,
    "stats": {
      "maxShieldBonus": 270,
      "defBonus": 38,
      "atkBonus": 30,
      "maxHpBonus": 70
    },
    "description": "Legendary divine buckler that turns aside even god-shattering impacts.",
    "lore": "An impenetrable bulwark that reflects the wrath of gods and titans alike.",
    "accentColor": "#38bdf8",
    "spriteType": "shield",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "boots_leather",
    "role": "knight",
    "name": "Leather Boots",
    "category": "boots",
    "tier": 1,
    "price": 0,
    "stats": {
      "speedBonus": 0
    },
    "description": "Comfortable standard leather travel boots.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "boots"
  },
  {
    "id": "boots_swift",
    "role": "knight",
    "name": "Emerald Stride Boots",
    "category": "boots",
    "tier": 2,
    "price": 320,
    "stats": {
      "speedBonus": 0.5
    },
    "description": "Agile boots plated with polished emerald.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#38bdf8",
    "spriteType": "boots"
  },
  {
    "id": "boots_shadow_step",
    "role": "knight",
    "name": "Shadowstep Greaves",
    "category": "boots",
    "tier": 3,
    "price": 900,
    "stats": {
      "speedBonus": 0.9,
      "defBonus": 4
    },
    "description": "Obsidian-plated greaves that muffle all footsteps.",
    "lore": "Infused with elemental conduits that amplify combat reflexes in the catacombs.",
    "accentColor": "#a855f7",
    "spriteType": "boots"
  },
  {
    "id": "boots_dragon_stride",
    "role": "knight",
    "name": "Dragon Knight Treads",
    "category": "boots",
    "tier": 4,
    "price": 1800,
    "stats": {
      "speedBonus": 1.2,
      "atkBonus": 15
    },
    "description": "Dragon-claw boots granting powerful thrust and speed.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#f59e0b",
    "spriteType": "boots"
  },
  {
    "id": "boots_sculk_stompers",
    "role": "knight",
    "name": "Deepslate Warden Stompers",
    "category": "boots",
    "tier": 5,
    "price": 3000,
    "stats": {
      "speedBonus": 0.75,
      "defBonus": 14,
      "maxHpBonus": 50
    },
    "description": "Heavy greaves that crush the cavern floor while muting the wearers steps to subterranean predators.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "boots",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "boots_war_striders",
    "role": "knight",
    "name": "Titan War Striders",
    "category": "boots",
    "tier": 4,
    "price": 2300,
    "stats": {
      "speedBonus": 0.8,
      "defBonus": 18,
      "maxHpBonus": 60,
      "maxShieldBonus": 45
    },
    "description": "Heavy plated sabatons with pneumatic pistons to maintain high combat mobility.",
    "lore": "Armored greaves that anchor the wearer firmly against explosive shockwaves.",
    "accentColor": "#f59e0b",
    "spriteType": "boots",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "boots_paladin_crusaders",
    "role": "knight",
    "name": "Paladin Crusade Sabatons",
    "category": "boots",
    "tier": 5,
    "price": 3900,
    "stats": {
      "speedBonus": 1.1,
      "defBonus": 28,
      "maxHpBonus": 110,
      "maxShieldBonus": 80,
      "atkBonus": 20
    },
    "description": "Golden crusade boots that allow the knight to dance around boss telegraphs.",
    "lore": "Boots blessed on holy altars that stride undaunted across boiling magma and abyssal fissures.",
    "accentColor": "#fde047",
    "spriteType": "boots",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "cape_crimson",
    "role": "knight",
    "name": "Crimson Hero Cloak",
    "category": "cape",
    "tier": 1,
    "price": 0,
    "stats": {},
    "description": "A flowing crimson cape symbolizing knightly valor.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "cape"
  },
  {
    "id": "cape_royal_blue",
    "role": "knight",
    "name": "Royal Blue Mantle",
    "category": "cape",
    "tier": 2,
    "price": 280,
    "stats": {
      "defBonus": 3,
      "maxHpBonus": 15
    },
    "description": "A deep ocean-blue mantle embroidered with fine gold thread.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#38bdf8",
    "spriteType": "cape"
  },
  {
    "id": "cape_dragon_wings",
    "role": "knight",
    "name": "Dragon Wing Mantle",
    "category": "cape",
    "tier": 4,
    "price": 2000,
    "stats": {
      "atkBonus": 25,
      "defBonus": 10,
      "speedBonus": 0.3
    },
    "description": "A flaming dragon-wing cape shedding ember particles.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#f59e0b",
    "spriteType": "cape"
  },
  {
    "id": "cape_sculk_soul_mantle",
    "role": "knight",
    "name": "Sculk Soul-Eater Mantle",
    "category": "cape",
    "tier": 5,
    "price": 3300,
    "stats": {
      "atkBonus": 40,
      "defBonus": 14,
      "maxHpBonus": 55,
      "maxShieldBonus": 35
    },
    "description": "A billowing cloak woven from crystallized soul tendrils, feeding energy back into the bearer.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "cape",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "cape_warlord_banner",
    "role": "knight",
    "name": "Grand Warlord Banner Mantle",
    "category": "cape",
    "tier": 4,
    "price": 2500,
    "stats": {
      "atkBonus": 35,
      "defBonus": 18,
      "maxHpBonus": 90
    },
    "description": "A majestic heraldic war-banner cloak worn by kings who conquered ancient dragons.",
    "lore": "A fraying war banner draped as a cloak, inspiring terror in subterranean beasts.",
    "accentColor": "#f59e0b",
    "spriteType": "cape",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "cape_radiant_solar_wings",
    "role": "knight",
    "name": "Wings of the Solar Sovereign",
    "category": "cape",
    "tier": 5,
    "price": 4300,
    "stats": {
      "atkBonus": 55,
      "defBonus": 30,
      "maxHpBonus": 140,
      "maxShieldBonus": 70,
      "speedBonus": 0.3
    },
    "description": "Golden radiant wings woven of pure stellar energy, warding off death itself.",
    "lore": "Woven from celestial sunbeams, fluttering with blinding majesty in the abyss.",
    "accentColor": "#fde047",
    "spriteType": "cape",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "weapon_apprentice_wand",
    "role": "mage",
    "name": "Apprentice Wand",
    "category": "weapon",
    "tier": 1,
    "price": 0,
    "stats": {
      "atkBonus": 0
    },
    "description": "A wooden focus wand for channeling basic spells.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#a855f7",
    "spriteType": "weapon"
  },
  {
    "id": "weapon_crystal_wand",
    "role": "mage",
    "name": "Sapphire Crystal Wand",
    "category": "weapon",
    "tier": 1,
    "price": 150,
    "stats": {
      "atkBonus": 12,
      "maxShieldBonus": 10
    },
    "description": "Topped with a mana-absorbing sapphire crystal.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#00e5ff",
    "spriteType": "weapon"
  },
  {
    "id": "weapon_fire_staff",
    "role": "mage",
    "name": "Inferno Staff",
    "category": "weapon",
    "tier": 2,
    "price": 450,
    "stats": {
      "atkBonus": 28
    },
    "description": "Calls down searing meteor embers upon foes.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#ff3d00",
    "spriteType": "weapon"
  },
  {
    "id": "weapon_thunder_staff",
    "role": "mage",
    "name": "Thunderbolt Staff",
    "category": "weapon",
    "tier": 3,
    "price": 1100,
    "stats": {
      "atkBonus": 45,
      "speedBonus": 0.3
    },
    "description": "Pulses with high-voltage electricity that shatters stone.",
    "lore": "Infused with elemental conduits that amplify combat reflexes in the catacombs.",
    "accentColor": "#facc15",
    "spriteType": "weapon"
  },
  {
    "id": "weapon_cosmic_archstaff",
    "role": "mage",
    "name": "Cosmic Archstaff",
    "category": "weapon",
    "tier": 4,
    "price": 2600,
    "stats": {
      "atkBonus": 80,
      "maxHpBonus": 25
    },
    "description": "A mythical weapon wielded by Archmages of time and space.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#e879f9",
    "spriteType": "weapon"
  },
  {
    "id": "weapon_frost_snow_staff",
    "role": "mage",
    "name": "Eternal Snow Staff",
    "category": "weapon",
    "tier": 4,
    "price": 3200,
    "stats": {
      "atkBonus": 92,
      "maxShieldBonus": 45,
      "speedBonus": 0.3
    },
    "description": "Permafrost crystal staff that fires piercing frost snowballs! Roulette exclusive!",
    "lore": "Permafrost crystal staff that fires piercing frost snowballs from the secret roulette chambers.",
    "accentColor": "#00e5ff",
    "spriteType": "weapon",
    "isExclusive": true
  },
  {
    "id": "weapon_sculk_abyssal_staff",
    "role": "mage",
    "name": "Sculk Abyssal Sonic Staff",
    "category": "weapon",
    "tier": 5,
    "price": 4400,
    "stats": {
      "atkBonus": 145,
      "maxShieldBonus": 85,
      "maxHpBonus": 40
    },
    "description": "Mounted with a pulsating Shrieker core, firing lethal concentrated sonic soul-bursts.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#00f5d4",
    "spriteType": "weapon",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "weapon_solar_annihilator",
    "role": "mage",
    "name": "Solar Flare Annihilator Staff",
    "category": "weapon",
    "tier": 4,
    "price": 3400,
    "stats": {
      "atkBonus": 135,
      "maxShieldBonus": 55,
      "defBonus": 12
    },
    "description": "Channels thermonuclear solar flares that burn straight through boss defenses.",
    "lore": "A golden staff channeling solar flares hot enough to melt obsidian gate bars.",
    "accentColor": "#ff6d00",
    "spriteType": "weapon",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "weapon_singularity_void_orb_staff",
    "role": "mage",
    "name": "Staff of the Void Singularity",
    "category": "weapon",
    "tier": 5,
    "price": 5800,
    "stats": {
      "atkBonus": 205,
      "maxShieldBonus": 110,
      "defBonus": 22,
      "maxHpBonus": 60
    },
    "description": "Houses a miniature black hole singularity at its crown, crushing boss matter into oblivion.",
    "lore": "Harnesses an imprisoned black hole singularity at its apex, distorting space-time.",
    "accentColor": "#a855f7",
    "spriteType": "weapon",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "armor_apprentice_robe",
    "role": "mage",
    "name": "Apprentice Silk Robe",
    "category": "armor",
    "tier": 1,
    "price": 0,
    "stats": {
      "defBonus": 0
    },
    "description": "A simple woven robe worn by academy initiates.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "armor"
  },
  {
    "id": "armor_mystic_robe",
    "role": "mage",
    "name": "Mystic Weave Robe",
    "category": "armor",
    "tier": 2,
    "price": 480,
    "stats": {
      "defBonus": 6,
      "maxShieldBonus": 30
    },
    "description": "Woven with protective wards against hostile incantations.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#38bdf8",
    "spriteType": "armor"
  },
  {
    "id": "armor_elemental_robe",
    "role": "mage",
    "name": "Elemental Sovereign Robe",
    "category": "armor",
    "tier": 3,
    "price": 1250,
    "stats": {
      "defBonus": 12,
      "maxHpBonus": 35,
      "atkBonus": 16
    },
    "description": "Vibrates with primordial fire, water, and wind power.",
    "lore": "Infused with elemental conduits that amplify combat reflexes in the catacombs.",
    "accentColor": "#a855f7",
    "spriteType": "armor"
  },
  {
    "id": "armor_archmage_vestment",
    "role": "mage",
    "name": "Eternal Archmage Vestments",
    "category": "armor",
    "tier": 4,
    "price": 2800,
    "stats": {
      "defBonus": 22,
      "maxHpBonus": 70,
      "maxShieldBonus": 50
    },
    "description": "Legendary vestments retrieved from the highest spire.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#f59e0b",
    "spriteType": "armor"
  },
  {
    "id": "armor_sculk_void_robe",
    "role": "mage",
    "name": "Sculk Voidweaver Robe",
    "category": "armor",
    "tier": 5,
    "price": 4600,
    "stats": {
      "defBonus": 28,
      "maxShieldBonus": 140,
      "maxHpBonus": 80
    },
    "description": "Silken abyssal fabric entwined with living sculk veins that absorb hostile arcane impacts.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "armor",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "armor_archon_astral_vestment",
    "role": "mage",
    "name": "Vestment of the Astral Archon",
    "category": "armor",
    "tier": 4,
    "price": 3600,
    "stats": {
      "defBonus": 36,
      "maxHpBonus": 130,
      "maxShieldBonus": 110,
      "atkBonus": 26
    },
    "description": "Woven from compressed nebula dust to form an impenetrable arcane barrier.",
    "lore": "Robes woven with living constellations that flicker with mystical protection.",
    "accentColor": "#f59e0b",
    "spriteType": "armor",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "armor_chrono_god_robe",
    "role": "mage",
    "name": "Chrono Sovereign God-Robe",
    "category": "armor",
    "tier": 5,
    "price": 6200,
    "stats": {
      "defBonus": 54,
      "maxHpBonus": 210,
      "maxShieldBonus": 180,
      "atkBonus": 48
    },
    "description": "Manipulates time dilation around the wearer, softening incoming boss strikes to a whisper.",
    "lore": "Radiates divine primordial authority from the Deep Dark. Slays immortal behemoths with ease.",
    "accentColor": "#fde047",
    "spriteType": "armor",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "helmet_wizard_hat",
    "role": "mage",
    "name": "Pointed Wizard Hat",
    "category": "helmet",
    "tier": 1,
    "price": 0,
    "stats": {
      "defBonus": 0
    },
    "description": "Traditional pointed hat of the academy scholars.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "helmet"
  },
  {
    "id": "helmet_mystic_cowl",
    "role": "mage",
    "name": "Indigo Mist Cowl",
    "category": "helmet",
    "tier": 2,
    "price": 360,
    "stats": {
      "defBonus": 4,
      "maxShieldBonus": 20
    },
    "description": "A shrouded cowl warding off psychic assaults.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#38bdf8",
    "spriteType": "helmet"
  },
  {
    "id": "helmet_astral_crown",
    "role": "mage",
    "name": "Astral Star Tiara",
    "category": "helmet",
    "tier": 4,
    "price": 2100,
    "stats": {
      "defBonus": 15,
      "atkBonus": 28
    },
    "description": "A floating tiara crowned with brilliant diamonds.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#f59e0b",
    "spriteType": "helmet"
  },
  {
    "id": "helmet_sculk_sensor_crown",
    "role": "mage",
    "name": "Sculk Sensor Crown",
    "category": "helmet",
    "tier": 5,
    "price": 3500,
    "stats": {
      "atkBonus": 48,
      "maxShieldBonus": 80,
      "defBonus": 12
    },
    "description": "A circlet of twitching tendril sensors that magnifies spell resonance across infinite dark caverns.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "helmet",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "helmet_solar_corona_diadem",
    "role": "mage",
    "name": "Diadem of the Solar Corona",
    "category": "helmet",
    "tier": 4,
    "price": 2700,
    "stats": {
      "defBonus": 22,
      "maxShieldBonus": 75,
      "atkBonus": 26,
      "maxHpBonus": 40
    },
    "description": "A fiery crown radiating high-temperature plasma to shield the caster mind.",
    "lore": "Crown radiating solar flares that blind foes who look directly at the archmage.",
    "accentColor": "#f59e0b",
    "spriteType": "helmet",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "helmet_crown_of_supernova",
    "role": "mage",
    "name": "Supernova Sovereign Crown",
    "category": "helmet",
    "tier": 5,
    "price": 4600,
    "stats": {
      "defBonus": 36,
      "maxShieldBonus": 135,
      "atkBonus": 42,
      "maxHpBonus": 80
    },
    "description": "A cosmic diadem surging with the destructive energy of an exploding supernova.",
    "lore": "Radiates divine primordial authority from the Deep Dark. Slays immortal behemoths with ease.",
    "accentColor": "#fde047",
    "spriteType": "helmet",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "shield_magic_orb",
    "role": "mage",
    "name": "Novice Crystal Orb",
    "category": "shield",
    "tier": 1,
    "price": 0,
    "stats": {
      "maxShieldBonus": 0
    },
    "description": "A focusing orb generating a protective arcane barrier.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#6366f1",
    "spriteType": "shield"
  },
  {
    "id": "shield_ancient_grimoire",
    "role": "mage",
    "name": "Ancient Grimoire",
    "category": "shield",
    "tier": 2,
    "price": 350,
    "stats": {
      "maxShieldBonus": 30,
      "atkBonus": 5
    },
    "description": "A floating ancient spellbook warding its bearer.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#d946ef",
    "spriteType": "shield"
  },
  {
    "id": "shield_cosmic_nova_orb",
    "role": "mage",
    "name": "Cosmic Nova Relic",
    "category": "shield",
    "tier": 4,
    "price": 2300,
    "stats": {
      "maxShieldBonus": 80,
      "atkBonus": 14,
      "defBonus": 8
    },
    "description": "A miniature singularity relic swallowing incoming attacks.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#0ea5e9",
    "spriteType": "shield"
  },
  {
    "id": "shield_sculk_soul_orb",
    "role": "mage",
    "name": "Sculk Resonance Soul Orb",
    "category": "shield",
    "tier": 5,
    "price": 3700,
    "stats": {
      "maxShieldBonus": 160,
      "defBonus": 20,
      "atkBonus": 14
    },
    "description": "An echoing sphere of trapped souls spinning in harmonic balance, generating impenetrable barriers.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#22d3ee",
    "spriteType": "shield",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "shield_supernova_barrier",
    "role": "mage",
    "name": "Supernova Resonance Orb",
    "category": "shield",
    "tier": 4,
    "price": 2900,
    "stats": {
      "maxShieldBonus": 190,
      "defBonus": 20,
      "atkBonus": 25
    },
    "description": "An orbiting miniature star that absorbs massive boss spells and unleashes shockwave ripples.",
    "lore": "A miniature stellar orb that incinerates oncoming arrows into harmless ash.",
    "accentColor": "#ff6d00",
    "spriteType": "shield",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "shield_omniscient_void_matrix",
    "role": "mage",
    "name": "Matrix of the Void Architect",
    "category": "shield",
    "tier": 5,
    "price": 4900,
    "stats": {
      "maxShieldBonus": 285,
      "defBonus": 34,
      "atkBonus": 45,
      "maxHpBonus": 60
    },
    "description": "An ancient artifact that creates a dimensional singularity barrier around the mage.",
    "lore": "A swirling barrier of pure dimensional calculations that nullifies incoming attacks.",
    "accentColor": "#a855f7",
    "spriteType": "shield",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "boots_cloth_shoes",
    "role": "mage",
    "name": "Silken Slippers",
    "category": "boots",
    "tier": 1,
    "price": 0,
    "stats": {
      "speedBonus": 0
    },
    "description": "Weightless footwear ensuring silent incantations.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "boots"
  },
  {
    "id": "boots_dimension_stride",
    "role": "mage",
    "name": "Dimensional Striders",
    "category": "boots",
    "tier": 3,
    "price": 900,
    "stats": {
      "speedBonus": 1,
      "maxShieldBonus": 20
    },
    "description": "Boots enabling micro-teleportation with every stride.",
    "lore": "Infused with elemental conduits that amplify combat reflexes in the catacombs.",
    "accentColor": "#a855f7",
    "spriteType": "boots"
  },
  {
    "id": "boots_sculk_echo_treads",
    "role": "mage",
    "name": "Sculk Echo Treads",
    "category": "boots",
    "tier": 5,
    "price": 3000,
    "stats": {
      "speedBonus": 0.85,
      "maxShieldBonus": 65,
      "defBonus": 10
    },
    "description": "Footwear that converts footsteps into silent vibrations, allowing swift movement without aggroing creatures.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "boots",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "boots_aether_gliders",
    "role": "mage",
    "name": "Aetherial Glider Slippers",
    "category": "boots",
    "tier": 4,
    "price": 2300,
    "stats": {
      "speedBonus": 1.1,
      "maxShieldBonus": 65,
      "defBonus": 15,
      "atkBonus": 16
    },
    "description": "Enables frictionless floating across hazardous boss arenas and telegraph zones.",
    "lore": "Slippers that tread upon ripples in the aether, leaving shimmering trails.",
    "accentColor": "#f59e0b",
    "spriteType": "boots",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "boots_astral_warp_walkers",
    "role": "mage",
    "name": "Astral Warp Striders",
    "category": "boots",
    "tier": 5,
    "price": 3900,
    "stats": {
      "speedBonus": 1.45,
      "maxShieldBonus": 120,
      "defBonus": 26,
      "atkBonus": 30,
      "maxHpBonus": 60
    },
    "description": "Phase-shifts the mage across space, making boss telegraph avoidance effortless.",
    "lore": "Radiates divine primordial authority from the Deep Dark. Slays immortal behemoths with ease.",
    "accentColor": "#fde047",
    "spriteType": "boots",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "cape_mystic_cloak",
    "role": "mage",
    "name": "Violet Astral Cloak",
    "category": "cape",
    "tier": 1,
    "price": 0,
    "stats": {},
    "description": "A billowing cloak scented with mystical incense.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "cape"
  },
  {
    "id": "cape_eternal_nebula",
    "role": "mage",
    "name": "Eternal Nebula Shawl",
    "category": "cape",
    "tier": 4,
    "price": 2000,
    "stats": {
      "defBonus": 10,
      "atkBonus": 28,
      "maxShieldBonus": 40
    },
    "description": "Glows with the swirling starlight of falling nebulae.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#f59e0b",
    "spriteType": "cape"
  },
  {
    "id": "cape_sculk_tendril_cloak",
    "role": "mage",
    "name": "Sculk Tendril Cloak",
    "category": "cape",
    "tier": 5,
    "price": 3300,
    "stats": {
      "atkBonus": 50,
      "maxShieldBonus": 75,
      "defBonus": 12
    },
    "description": "Tendrils of deep sculk ripple across this mantle, continuously humming with high-frequency soul power.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "cape",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "cape_celestial_aurora",
    "role": "mage",
    "name": "Aurora Borealis Shroud",
    "category": "cape",
    "tier": 4,
    "price": 2500,
    "stats": {
      "atkBonus": 38,
      "defBonus": 18,
      "maxShieldBonus": 85,
      "maxHpBonus": 45
    },
    "description": "A flowing cape of prismatic astral lights that reflects enemy projectiles.",
    "lore": "Flows like the northern sky lights, shimmering with restorative mana tides.",
    "accentColor": "#f59e0b",
    "spriteType": "cape",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "cape_singularity_infinite_shroud",
    "role": "mage",
    "name": "Singularity Infinite Shroud",
    "category": "cape",
    "tier": 5,
    "price": 4300,
    "stats": {
      "atkBonus": 62,
      "defBonus": 30,
      "maxShieldBonus": 150,
      "maxHpBonus": 85,
      "speedBonus": 0.3
    },
    "description": "A mantle woven of raw event horizon ribbons, amplifying all spell destructive potency.",
    "lore": "A mantle woven from the event horizon of a collapsing star.",
    "accentColor": "#fde047",
    "spriteType": "cape",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "weapon_twin_daggers",
    "role": "assassin",
    "name": "Rusty Twin Daggers",
    "category": "weapon",
    "tier": 1,
    "price": 0,
    "stats": {
      "atkBonus": 0
    },
    "description": "A pair of weathered daggers favored by novice rogues.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#64748b",
    "spriteType": "weapon"
  },
  {
    "id": "weapon_steel_stilettos",
    "role": "assassin",
    "name": "Black Steel Stilettos",
    "category": "weapon",
    "tier": 1,
    "price": 150,
    "stats": {
      "atkBonus": 10,
      "speedBonus": 0.2
    },
    "description": "Slender, piercing daggers crafted to slip between armor plates.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "weapon"
  },
  {
    "id": "weapon_venom_fang",
    "role": "assassin",
    "name": "Venomous Viper Fang",
    "category": "weapon",
    "tier": 2,
    "price": 450,
    "stats": {
      "atkBonus": 26,
      "speedBonus": 0.3
    },
    "description": "Coated in deadly viper venom that weakens prey.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#10b981",
    "spriteType": "weapon"
  },
  {
    "id": "weapon_shadow_claws",
    "role": "assassin",
    "name": "Phantom Shadow Claws",
    "category": "weapon",
    "tier": 3,
    "price": 1100,
    "stats": {
      "atkBonus": 45,
      "speedBonus": 0.5
    },
    "description": "Lethal claws that slice through the dark without a sound.",
    "lore": "Infused with elemental conduits that amplify combat reflexes in the catacombs.",
    "accentColor": "#818cf8",
    "spriteType": "weapon"
  },
  {
    "id": "weapon_phantom_deathblades",
    "role": "assassin",
    "name": "Phantom Deathblades",
    "category": "weapon",
    "tier": 4,
    "price": 2600,
    "stats": {
      "atkBonus": 78,
      "speedBonus": 0.8
    },
    "description": "Executioner blades forged in the deepest abyss.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#ef4444",
    "spriteType": "weapon"
  },
  {
    "id": "weapon_candy_cane_daggers",
    "role": "assassin",
    "name": "Candy Cane Daggers",
    "category": "weapon",
    "tier": 4,
    "price": 3200,
    "stats": {
      "atkBonus": 90,
      "speedBonus": 0.9,
      "defBonus": 6
    },
    "description": "Pointed red-and-white striped festive daggers with sweet lethal sparks! Roulette exclusive!",
    "lore": "Razor-sharp peppermint confectioneries that deliver surprisingly lethal sugar-coated strikes.",
    "accentColor": "#ff1744",
    "spriteType": "weapon",
    "isExclusive": true
  },
  {
    "id": "weapon_sculk_soul_daggers",
    "role": "assassin",
    "name": "Sculk Silent Twin Daggers",
    "category": "weapon",
    "tier": 5,
    "price": 4400,
    "stats": {
      "atkBonus": 140,
      "speedBonus": 0.95,
      "defBonus": 10
    },
    "description": "Double daggers made from petrified deepslate dipped in sculk venom, striking with absolute silence.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#00f5d4",
    "spriteType": "weapon",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "weapon_eclipse_twin_scythes",
    "role": "assassin",
    "name": "Eclipse Dread Twin Scythes",
    "category": "weapon",
    "tier": 4,
    "price": 3400,
    "stats": {
      "atkBonus": 130,
      "speedBonus": 0.95,
      "defBonus": 14,
      "maxHpBonus": 45
    },
    "description": "Curved crescent blades bathed in eclipse shadow that bypass tough boss carapaces.",
    "lore": "Twin scythes that cut through flesh and shadows in equal measure.",
    "accentColor": "#f43f5e",
    "spriteType": "weapon",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "weapon_god_slayer_daggers",
    "role": "assassin",
    "name": "God-Slayer Abyssal Fangs",
    "category": "weapon",
    "tier": 5,
    "price": 5800,
    "stats": {
      "atkBonus": 200,
      "speedBonus": 1.35,
      "defBonus": 22,
      "maxHpBonus": 85
    },
    "description": "Twin daggers forged from primordial venom glands capable of felling colossal deities in seconds.",
    "lore": "Forged in the heart of the void abyss; shadows cling to their razor edges like hungry phantoms.",
    "accentColor": "#10b981",
    "spriteType": "weapon",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "armor_leather_vest",
    "role": "assassin",
    "name": "Light Leather Vest",
    "category": "armor",
    "tier": 1,
    "price": 0,
    "stats": {
      "defBonus": 0
    },
    "description": "Flexible leather vest tailored for maximum agility.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "armor"
  },
  {
    "id": "armor_night_stalker",
    "role": "assassin",
    "name": "Nightstalker Garb",
    "category": "armor",
    "tier": 2,
    "price": 480,
    "stats": {
      "defBonus": 5,
      "speedBonus": 0.3,
      "maxHpBonus": 20
    },
    "description": "Carbon-weave leather treated to absorb all reflected light.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#38bdf8",
    "spriteType": "armor"
  },
  {
    "id": "armor_phantom_suit",
    "role": "assassin",
    "name": "Phantom Shadowsuit",
    "category": "armor",
    "tier": 4,
    "price": 2800,
    "stats": {
      "defBonus": 18,
      "atkBonus": 28,
      "speedBonus": 0.6,
      "maxHpBonus": 60
    },
    "description": "Conceals the heartbeat and physical silhouette of its wearer.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#f59e0b",
    "spriteType": "armor"
  },
  {
    "id": "armor_sculk_stalker_vest",
    "role": "assassin",
    "name": "Sculk Stalker Stealthsuit",
    "category": "armor",
    "tier": 5,
    "price": 4600,
    "stats": {
      "defBonus": 28,
      "speedBonus": 0.8,
      "maxHpBonus": 90,
      "maxShieldBonus": 55
    },
    "description": "Lightweight chitinous armor that dampens all auditory and visual footprint in pitch darkness.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "armor",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "armor_dread_shadow_carapace",
    "role": "assassin",
    "name": "Dread Shadow Phantom Garb",
    "category": "armor",
    "tier": 4,
    "price": 3600,
    "stats": {
      "defBonus": 38,
      "maxHpBonus": 150,
      "maxShieldBonus": 65,
      "atkBonus": 32,
      "speedBonus": 0.6
    },
    "description": "Flexible shadowweave weave that absorbs crushing blows and converts them into kinetic speed.",
    "lore": "A chitinous shadow vestment that absorbs ambient light, rendering the wearer invisible.",
    "accentColor": "#f59e0b",
    "spriteType": "armor",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "armor_abyssal_reaper_shroud",
    "role": "assassin",
    "name": "Abyssal Reaper Exoskeleton",
    "category": "armor",
    "tier": 5,
    "price": 6200,
    "stats": {
      "defBonus": 56,
      "maxHpBonus": 230,
      "maxShieldBonus": 120,
      "atkBonus": 55,
      "speedBonus": 0.9
    },
    "description": "Biomechanical chitin of the void reaper that provides unmatched defense without slowing movement.",
    "lore": "Imbued with the quiet chill of death itself, muffling all sound and motion.",
    "accentColor": "#fde047",
    "spriteType": "armor",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "helmet_ninja_mask",
    "role": "assassin",
    "name": "Shadow Shinobi Mask",
    "category": "helmet",
    "tier": 1,
    "price": 0,
    "stats": {
      "defBonus": 0
    },
    "description": "A black face-covering revealing only piercing eyes.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "helmet"
  },
  {
    "id": "helmet_shadow_hood",
    "role": "assassin",
    "name": "Dark Night Hood",
    "category": "helmet",
    "tier": 2,
    "price": 360,
    "stats": {
      "defBonus": 4,
      "speedBonus": 0.2
    },
    "description": "A shadowy hood obscuring the outline of the head.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#38bdf8",
    "spriteType": "helmet"
  },
  {
    "id": "helmet_reaper_mask",
    "role": "assassin",
    "name": "Grim Reaper Mask",
    "category": "helmet",
    "tier": 4,
    "price": 2100,
    "stats": {
      "defBonus": 14,
      "atkBonus": 24,
      "speedBonus": 0.4
    },
    "description": "A blood-etched skull mask radiating sheer dread.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#f59e0b",
    "spriteType": "helmet"
  },
  {
    "id": "helmet_sculk_blindfold_mask",
    "role": "assassin",
    "name": "Sculk Blind Hunter Mask",
    "category": "helmet",
    "tier": 5,
    "price": 3500,
    "stats": {
      "atkBonus": 50,
      "speedBonus": 0.5,
      "defBonus": 14
    },
    "description": "Replaces normal sight with sculk-echolocation, pinpointing enemy weaknesses instantly in combat.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "helmet",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "helmet_phantom_executioner_cowl",
    "role": "assassin",
    "name": "Executioner Phantom Cowl",
    "category": "helmet",
    "tier": 4,
    "price": 2700,
    "stats": {
      "defBonus": 24,
      "maxHpBonus": 75,
      "atkBonus": 30,
      "speedBonus": 0.4
    },
    "description": "Cowl inscribed with assassination marks, revealing boss weak points.",
    "lore": "A terrifying cowl worn by ancient guild executioners in the crypts.",
    "accentColor": "#f59e0b",
    "spriteType": "helmet",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "helmet_crown_of_the_abyss",
    "role": "assassin",
    "name": "Crown of the Abyssal Assassin",
    "category": "helmet",
    "tier": 5,
    "price": 4600,
    "stats": {
      "defBonus": 38,
      "maxHpBonus": 125,
      "atkBonus": 52,
      "speedBonus": 0.6,
      "maxShieldBonus": 45
    },
    "description": "Spiked obsidian mask that grants true supernatural executioner instincts.",
    "lore": "Resting heavily upon the brow, it whispers forgotten prophecies of the deepslate catacombs.",
    "accentColor": "#fde047",
    "spriteType": "helmet",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "shield_parrying_dagger",
    "role": "assassin",
    "name": "Left Parrying Dagger",
    "category": "shield",
    "tier": 1,
    "price": 0,
    "stats": {
      "maxShieldBonus": 0
    },
    "description": "An off-hand dagger designed to deflect enemy strikes.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "shield"
  },
  {
    "id": "shield_steel_shuriken",
    "role": "assassin",
    "name": "Steel Deflector Shuriken",
    "category": "shield",
    "tier": 2,
    "price": 350,
    "stats": {
      "maxShieldBonus": 20,
      "atkBonus": 6
    },
    "description": "A heavy bladed star used to parry and riposte.",
    "lore": "Reforged and reinforced with hardened steel and subterranean minerals.",
    "accentColor": "#38bdf8",
    "spriteType": "shield"
  },
  {
    "id": "shield_shadow_guard",
    "role": "assassin",
    "name": "Phantom Claw Aegis",
    "category": "shield",
    "tier": 4,
    "price": 2300,
    "stats": {
      "maxShieldBonus": 75,
      "atkBonus": 12,
      "defBonus": 8
    },
    "description": "Armguard fitted with curved razor claws for high deflection.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#ef4444",
    "spriteType": "shield"
  },
  {
    "id": "shield_sculk_sonic_claw",
    "role": "assassin",
    "name": "Sculk Sonic Deflector Claw",
    "category": "shield",
    "tier": 5,
    "price": 3700,
    "stats": {
      "maxShieldBonus": 95,
      "defBonus": 22,
      "speedBonus": 0.45,
      "atkBonus": 14
    },
    "description": "Armguard equipped with vibrating sculk blades capable of parrying strikes and discharging sonic bursts.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#00f5d4",
    "spriteType": "shield",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "shield_void_parry_buckler",
    "role": "assassin",
    "name": "Void Deflector Buckler",
    "category": "shield",
    "tier": 4,
    "price": 2900,
    "stats": {
      "maxShieldBonus": 180,
      "defBonus": 22,
      "atkBonus": 30,
      "speedBonus": 0.4
    },
    "description": "A razor-edged parrying buckler designed to counter heavy boss swings.",
    "lore": "A quick parry buckler that deflects weapon swings with void shockwaves.",
    "accentColor": "#ef4444",
    "spriteType": "shield",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "shield_eclipse_death_matrix",
    "role": "assassin",
    "name": "Eclipse Phantom Death-Matrix",
    "category": "shield",
    "tier": 5,
    "price": 4900,
    "stats": {
      "maxShieldBonus": 260,
      "defBonus": 36,
      "atkBonus": 50,
      "speedBonus": 0.7,
      "maxHpBonus": 55
    },
    "description": "Floating array of nanoblade deflectors that completely dissipates boss shockwaves.",
    "lore": "A pitch-black kinetic disc that swallows hostile strikes into the void.",
    "accentColor": "#10b981",
    "spriteType": "shield",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "boots_ninja_tabi",
    "role": "assassin",
    "name": "Silent Tabi Boots",
    "category": "boots",
    "tier": 1,
    "price": 0,
    "stats": {
      "speedBonus": 0
    },
    "description": "Soft-soled traditional split-toe footwear for silent movement.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "boots"
  },
  {
    "id": "boots_lightning_striders",
    "role": "assassin",
    "name": "Lightning Striders",
    "category": "boots",
    "tier": 3,
    "price": 900,
    "stats": {
      "speedBonus": 1.3,
      "atkBonus": 12
    },
    "description": "Agile boots moving fast as midnight lightning.",
    "lore": "Infused with elemental conduits that amplify combat reflexes in the catacombs.",
    "accentColor": "#a855f7",
    "spriteType": "boots"
  },
  {
    "id": "boots_sculk_silent_tabi",
    "role": "assassin",
    "name": "Sculk Shadow Tabi",
    "category": "boots",
    "tier": 5,
    "price": 3000,
    "stats": {
      "speedBonus": 1.2,
      "defBonus": 12,
      "maxHpBonus": 45
    },
    "description": "Split-toe stealth boots layered with sound-absorbing sculk moss, giving unmatched dash speeds.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "boots",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "boots_ghost_treads",
    "role": "assassin",
    "name": "Ghost Whisper Treads",
    "category": "boots",
    "tier": 4,
    "price": 2300,
    "stats": {
      "speedBonus": 1.45,
      "defBonus": 16,
      "maxHpBonus": 55,
      "maxShieldBonus": 40,
      "atkBonus": 20
    },
    "description": "Lightweight shadow boots allowing instantaneous dodging of boss attack telegraphs.",
    "lore": "Silent leather wraps that leave no footprints on dust, stone, or blood.",
    "accentColor": "#f59e0b",
    "spriteType": "boots",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "boots_abyssal_dimension_dashes",
    "role": "assassin",
    "name": "Abyssal Voidwalkers",
    "category": "boots",
    "tier": 5,
    "price": 3900,
    "stats": {
      "speedBonus": 1.85,
      "defBonus": 26,
      "maxHpBonus": 90,
      "maxShieldBonus": 75,
      "atkBonus": 38
    },
    "description": "Treads that step through folded shadows, granting unmatched agility in boss encounters.",
    "lore": "Transports the wearer a split second across dimensions with each rapid sprint.",
    "accentColor": "#fde047",
    "spriteType": "boots",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  },
  {
    "id": "cape_shadow_mantle",
    "role": "assassin",
    "name": "Shadow Mist Mantle",
    "category": "cape",
    "tier": 1,
    "price": 0,
    "stats": {},
    "description": "A pitch-black mantle that dissolves into the shadows.",
    "lore": "Standard adventurers issue, dependable enough to survive the initial dungeon chambers.",
    "accentColor": "#94a3b8",
    "spriteType": "cape"
  },
  {
    "id": "cape_blood_specter",
    "role": "assassin",
    "name": "Blood Specter Cloak",
    "category": "cape",
    "tier": 4,
    "price": 2000,
    "stats": {
      "defBonus": 8,
      "atkBonus": 26,
      "speedBonus": 0.6
    },
    "description": "A ragged cloak drenched in crimson phantom mist.",
    "lore": "A legendary artifact forged for heroic divers venturing into perilous boss chambers.",
    "accentColor": "#f59e0b",
    "spriteType": "cape"
  },
  {
    "id": "cape_sculk_shadow_shroud",
    "role": "assassin",
    "name": "Sculk Shadow Shroud",
    "category": "cape",
    "tier": 5,
    "price": 3300,
    "stats": {
      "atkBonus": 50,
      "speedBonus": 0.5,
      "maxHpBonus": 50
    },
    "description": "A smoky veil forged from condensed soul darkness that billows silently with eerie cyan luminescence.",
    "lore": "Discovered within the ancient city ruins of the Deep Dark biome past Floor 23.",
    "accentColor": "#06b6d4",
    "spriteType": "cape",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "cape_void_reaper_shroud",
    "role": "assassin",
    "name": "Void Reaper Phantom Cloak",
    "category": "cape",
    "tier": 4,
    "price": 2500,
    "stats": {
      "atkBonus": 42,
      "defBonus": 18,
      "maxHpBonus": 75,
      "speedBonus": 0.5
    },
    "description": "A ragged cloak that dissipates into dark smoke, confounding enemy boss targeting.",
    "lore": "Tattered dark veil that whips violently as the assassin dashes between shadows.",
    "accentColor": "#f59e0b",
    "spriteType": "cape",
    "minStage": 23,
    "biomeName": "DEEP DARK"
  },
  {
    "id": "cape_deathshade_god_mantle",
    "role": "assassin",
    "name": "Deathshade God-Mantle",
    "category": "cape",
    "tier": 5,
    "price": 4300,
    "stats": {
      "atkBonus": 68,
      "defBonus": 30,
      "maxHpBonus": 130,
      "maxShieldBonus": 65,
      "speedBonus": 0.8
    },
    "description": "A flowing shroud infused with the spirits of assassinated demigods, granting lethality to every strike.",
    "lore": "A shifting cloak of solid shadows that blinds onlookers in absolute darkness.",
    "accentColor": "#fde047",
    "spriteType": "cape",
    "minStage": 23,
    "biomeName": "DEEP DARK",
    "isGodTier": true
  }
];
