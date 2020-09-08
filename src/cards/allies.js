import { createCard } from './createCard';

export const allies = [
  {
    name: 'Swordsman',
    image: 'soldier',
    rarity: 'common',
    attack: 3,
    defense: 1
  },
  {
    name: 'Spearman',
    image: 'red_spear_guy',
    rarity: 'common',
    attack: 2,
    defense: 2
  },
  {
    name: 'Recruiter',
    image: 'shop_girl',
    rarity: 'common',
    attack: 0,
    defense: 2,
    customEffect: true,
    customDescription: 'Play a random ally from your discard pile, then banish it.'
  },
  {
    name: 'Paladin',
    image: 'paladin',
    rarity: 'common',
    attack: 2,
    defense: 1,
    shuffleCardCopiesIntoYourPiles: [{ card: 'Healing Blade', pile: 'deck' }],
    customDescription: 'Shuffle a copy of Healing Blade into your deck.'
  },
  {
    name: 'Mermaid',
    image: 'mermaid',
    rarity: 'uncommon',
    attack: 0,
    defense: 4,
    heal: 5,
    healEnemy: 1
  },
  {
    name: 'Ice Whelp',
    image: 'ice_whelp',
    rarity: 'uncommon',
    attack: 3,
    defense: 1,
    playCopiesOfCards: ['Frost'],
    customDescription: 'Play a copy of Frost.'
  },
  {
    name: 'Hobgoblin',
    image: 'hobgoblin',
    rarity: 'uncommon',
    attack: 2,
    defense: 0,
    playCopiesOfCards: ['Falchion'],
    customDescription: 'Play a copy of Falchion.'
  },
  {
    name: 'Brawler',
    image: 'brawler',
    rarity: 'uncommon',
    attack: 3,
    defense: 2,
    customEffect: true,
    customDescription: 'Shuffle a copy of a random non-legendary attack into your deck.'
  },
  {
    name: 'Warlock',
    image: 'crazy_mage',
    rarity: 'uncommon',
    attack: 0,
    defense: 0,
    playCopiesOfCards: ['Fire', 'Fire'],
    customDescription: 'Play 2 copies of Fire.'
  },
  {
    name: 'Mimic',
    image: 'mimic',
    rarity: 'uncommon',
    attack: 2,
    defense: 2,
    playCopiesOfCards: ['Tentacles', 'Tentacles'],
    customDescription: 'Play 2 copies of Tentacles.'
  },
  {
    name: 'Apothecary',
    image: 'alchemist',
    rarity: 'uncommon',
    attack: 0,
    defense: 3,
    customEffect: true,
    onDiscard: {
      customEffect: true
    },
    triggerDiscardOnPlay: true,
    customDescription: 'Shuffle a random potion from your banish into your deck.'
  },
  {
    name: 'Minotaur',
    image: 'minotaur',
    rarity: 'rare',
    attack: 0,
    defense: 0,
    customEffect: true,
    customDescription: 'Play 2 random attacks from your discard, then banish them.'
  },
  {
    name: 'Mage',
    image: 'mage',
    rarity: 'rare',
    attack: 0,
    defense: 0,
    customEffect: true,
    customDescription: 'Play 2 random magic attacks from your discard, then banish them.'
  },
  {
    name: 'Vampire',
    image: 'vampire',
    rarity: 'rare',
    attack: 4,
    defense: 1,
    damageSelf: 1,
    banishes: true,
    dealsBanishingDamage: true
  },
  {
    name: 'Cryopyromancer',
    image: 'cryopyromancer',
    rarity: 'rare',
    attack: 1,
    defense: 1,
    shuffleCardCopiesIntoOpponentsPiles: [
      { card: 'Burn', pile: 'deck' },
      { card: 'Burn', pile: 'deck' },
    ],
    playCopiesOfCards: ['Frost'],
    customDescription: 'Play a copy of Frost. Shuffle 2 copies of Burn into your opponent\'s deck.'
  },
  {
    name: 'Fire Dragon',
    image: 'fire_dragon',
    rarity: 'legendary',
    attack: 6,
    defense: 6,
    onDiscard: {
      playCopiesOfCards: ['Super Fire']
    },
    triggerDiscardOnPlay: true,
    customDescription: 'Play a copy of Super Fire.'
  },
  {
    name: 'Catherine the Great',
    image: 'catherine_the_great',
    rarity: 'legendary',
    attack: 5,
    defense: 7,
    onDiscard: {
      playCopiesOfCards: ['Healing Blade']
    },
    triggerDiscardOnPlay: true,
    customDescription: 'Play a copy of Healing Blade.'
  },
  {
    name: 'Ice Queen',
    image: 'ice_queen',
    rarity: 'legendary',
    attack: 4,
    defense: 8,
    onDiscard: {
      playCopiesOfCards: ['Ice Blade']
    },
    triggerDiscardOnPlay: true,
    customDescription: 'Play a copy of Ice Blade.'
  }
].map(card => createCard({
  ...card,
  type: 'ally'
}));
