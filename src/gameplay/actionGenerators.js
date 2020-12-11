import shortid from 'shortid';
import { cards } from '../cards/cards';
import { createNewCard } from '../cards/createNewCard';
import { store } from '../stores/store';
import { actionKeys } from './actionKeys';
import { playFirstCardInRound } from './playFirstCardInRound';

export const actionGenerators = {
  // these functions mutate state and return actions.
  // actionKey = redux action key
  // payload = redux action payload
  // to be executed in <Battle>
  setCardPile: (state, player, pile) => ({
    actionKey: actionKeys[player][pile],
    payload: state[player][pile].getCardIds()
  }),
  addCardToStack: (state, cardId) => {
    state.stack.addCardToTop(cardId);
    return {
      actionKey: 'setStack',
      payload: state.stack.getCardIds()
    };
  },
  removeTopCardFromStack: (state) => {
    state.stack.removeTopCard();
    return {
      actionKey: 'setStack',
      payload: state.stack.getCardIds()
    };
  },
  addCard: (state, cardId, player, pile, index) => {
    // index = number|'top'|'random'
    if (pile === 'hand') {
      state[player][pile][index] = cardId;
    } else if (index === 'top') {
      state[player][pile].addCardToTop(cardId);
    } else if (index === 'random') {
      state[player][pile].addCardAtRandomIndex(cardId);
    }
    return {
      actionKey: actionKeys[player][pile],
      payload: state[player][pile].getCardIds()
    };
  },
  removeCard: (state, player, pile, index) => {
    // index = number|'top'
    if (!index && index !== 0) {
      return null;
    } else if (pile === 'hand') {
      state[player][pile][index] = null;
    } else if (index === 'top') {
      state[player][pile].removeTopCard();
    } else {
      state[player][pile].removeCardAtIndex(index);
    }
    return {
      actionKey: actionKeys[player][pile],
      payload: state[player][pile].getCardIds()
    };
  },
  setShields: (state, player, value) => {
    state[player].shields = value;
    return {
      actionKey: actionKeys[player].shields,
      payload: value
    };
  },
  setStats: (state, player, statBonuses) => {
    // statBonuses like { attack: 1, defense: 1 }
    Object.keys(statBonuses).forEach(stat => {
      state[player].statBonuses[stat] += statBonuses[stat];
    });
    return {
      actionKey: 'setStats',
      payload: {
        stats: { ...state[player].statBonuses },
        type: 'bonuses',
        player,
        operation: 'set'
      }
    };
  }
};

export const specialAbilityActionGenerators = {
  'Vampire': () => {
    const { enemyShields, yourShields } = store.getState().clashBattleStats;
    const renderActions = [[
      { actionKey: 'setEnemyShields', payload: 0 },
      { actionKey: 'setYourShields', payload: yourShields + enemyShields }
    ]];
    return renderActions;
  },
  'Ice Whelp': () => {
    const { enemyDiscard } = store.getState().clashBattleCards;
    const cardId = enemyDiscard[enemyDiscard.length - 1];
    if (!cardId) {
      return [];
    }
    const renderActions = [
      [
        { actionKey: 'setEnemyDiscard', payload: enemyDiscard.slice(0, enemyDiscard.length - 1) },
        { actionKey: 'setStack', payload: [cardId] }
      ],
      [],
      [
        { actionKey: 'setStack', payload: [] },
        {
          actionKey: 'addCardsToCollection',
          payload: createNewCard({
            ...cards[cardId],
            battleMutatedProperties: { attack: false, defense: false }
          })
        }
      ]
    ];
    return renderActions;
  },
  'Rogue': () => playFirstCardInRound(null, true),
  'Elementalist': () => {
    const { yourHand } = store.getState().clashBattleCards;
    const { specialAbilityBars } = store.getState().clashBattleStats;
    const element = specialAbilityBars % 2 === 0 ? 'fire' : 'frost';
    const targetCards = element === 'fire'
      ? ['Fire', 'Super Fire', 'Fire Spear', 'Warlock', 'The Evil Dragon Jr.']
      : ['Frost', 'Super Frost', 'Ice Whelp', 'Ice Blade', 'Ice Queen'];
    const newHand = yourHand.map((cardId, index) => {
      if (targetCards.includes(cards[cardId].name)) {
        const newCardId = createNewCard({
          ...cards[cardId],
          attack: cards[cardId].attack + 1,
          defense: cards[cardId].defense + 1,
          battleMutatedProperties: { attack: true, defense: true }
        }, `battle_${shortid.generate()}`);
        delete cards[cardId];
        return newCardId;
      } else {
        return cardId;
      }
    });
    const renderActions = [[{ actionKey: 'setYourHand', payload: newHand }]];
    return renderActions;
  }
};
