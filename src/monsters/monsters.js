import { keyBy } from 'lodash';

// tier 1: waves 1, 2, 3
// tier 2: wave 4, 5, 6
// tier 3: wave 7, 8, 9

const monstersTier1 = [
  {
    name: 'Minotaur',
    image: 'minotaur',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: [
      'Minotaur'
    ]
  },
  {
    name: 'Slime',
    image: 'basic_slime',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: []
  },
  {
    name: 'Fire Slime',
    image: 'fire_slime',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: [
      'Fire',
      'Fire'
    ]
  },
  {
    name: 'Tentacle Monster',
    image: 'tentacles',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: [
      'Tentacles',
      'Tentacles'
    ]
  }
];

const monstersTier2 = [
  {
    name: 'Jello Slime',
    image: 'slime_potion',
    stats: { attack: 0, magic: 0, defense: 1 },
    deck: [
      'Jello Slime',
      'Shield',
      'Shield',
      'Healing Potion'
    ]
  },
  {
    name: 'Demonic Slime',
    image: 'demonic_slime',
    stats: { attack: 1, magic: 0, defense: 0 },
    deck: [
      'Vampire',
      'Minotaur',
      'Orc Blade',
      'Mace',
      'Mace'
    ]
  },
  {
    name: 'Warlock',
    image: 'crazy_mage',
    stats: { attack: 0, magic: 1, defense: 0 },
    deck: [
      'Warlock',
      'Fire',
      'Fire',
      'Candy Corn'
    ]
  },
  {
    name: 'Mermaid',
    image: 'mermaid',
    stats: { attack: 0, magic: 1, defense: 0 },
    deck: [
      'Mermaid',
      'Mermaid',
      'Magic Scroll',
      'Magic Scroll',
      'Mage'
    ]
  },
  {
    name: 'Hobgoblin',
    image: 'hobgoblin',
    stats: { attack: 1, magic: 0, defense: 0 },
    deck: [
      'Hobgoblin',
      'Falchion',
      'Falchion',
      'Falchion'
    ]
  }
];

const monstersTier3 = [
  {
    name: 'Ice Queen',
    image: 'ice_queen',
    stats: { attack: 1, magic: 0, defense: 1 },
    deck: [
      'Ice Queen',
      'Ice Blade',
      'Ice Blade',
      'Healing Blade',
      'Shield'
    ]
  },
  {
    name: 'Mimic',
    image: 'mimic',
    stats: { attack: 0, magic: 1, defense: 1 },
    deck: [
      'Mimic',
      'Tentacles',
      'Tentacles',
      'Candy Corn',
      'Fire',
      'Shield',
      'Shield'
    ]
  },
  {
    name: 'Ice Whelp',
    image: 'ice_whelp',
    stats: { attack: 2, magic: 0, defense: 0 },
    deck: [
      'Ice Queen',
      'Ice Whelp',
      'Ice Whelp',
      'Ice Blade',
      'Shield'
    ]
  },
  {
    name: 'Vine Slime',
    image: 'vine_slime',
    stats: { attack: 1, magic: 1, defense: 0 },
    deck: [
      'Jello Slime',
      'Jello Slime',
      'Tentacles',
      'Tentacles',
      'Tentacles',
      'Candy Corn',
      'Shield',
      'Frost'
    ]
  }
];

const _eventMonsters = [
  {
    name: 'Treasure Slime',
    image: 'treasure_slime_monster',
    stats: { attack: 0, magic: 1, defense: 0 },
    deck: [
      'Jello Slime',
      'Tentacles',
      'Tentacles',
      'Tentacles',
      'Fire',
      'Candy Corn'
    ]
  },
  {
    name: 'Catherine the Great',
    image: 'catherine_the_great',
    stats: { attack: 2, magic: 0, defense: 1 },
    deck: [
      'Catherine the Great',
      'Shield',
      'Longsword',
      'Orc Blade'
    ]
  },
  {
    name: 'Dragon',
    image: 'fire_dragon',
    stats: { attack: 2, magic: 2, defense: 2 },
    deck: [
      'Fire Dragon',
      'Fire Spear',
      'Fire',
      'Super Fire',
    ]
  }
];

for (let i = 0; i < monstersTier1.length; i++) {
  monstersTier1[i].tier = 1;
  monstersTier1[i].type = 'wave';
  monstersTier1[i].isElite = false;
}
for (let i = 0; i < monstersTier2.length; i++) {
  monstersTier2[i].tier = 2;
  monstersTier2[i].type = 'wave';
  monstersTier2[i].isElite = false;
}
for (let i = 0; i < monstersTier3.length; i++) {
  monstersTier3[i].tier = 3;
  monstersTier3[i].type = 'wave';
  monstersTier3[i].isElite = false;
}
for (let i = 0; i < _eventMonsters.length; i++) {
  _eventMonsters[i].tier = 1;
  _eventMonsters[i].type = 'event';
  _eventMonsters[i].isElite = false;
}

export const monstersByTier = {
  1: monstersTier1,
  2: monstersTier2,
  3: monstersTier3
};

export const eventMonsters = keyBy(_eventMonsters, 'name');
