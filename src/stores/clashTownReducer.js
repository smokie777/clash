import { genMonsterWaves } from '../monsters/genMonsterWaves';
import { genMonsterGoldReward } from '../monsters/genMonsterGoldReward';
import { genTownActions } from '../components/town/genTownActions';
import { genPurchasableCards } from '../components/town/genPurchasableCards';
import { controller } from '../controller';

const genInitialState = () => {
  const monsterWaves = genMonsterWaves();
  return {
    energy: controller.energy || 0,
    day: controller.day || 1,
    monsterWaves,
    dailyMonsterGoldReward: genMonsterGoldReward(
      monsterWaves[(controller.day || 1) - 1],
      false,
      controller.day || 1
    ),
    townActions: genTownActions(),
    purchasableCards: [],
    completedTownActions: {},
    feed: [
      'Welcome to town!',
      'You are too tired from your long journey to do anything else today.'
    ]
  };
};
const initialState = genInitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADJUST_PLAYER_ENERGY':
      return {
        ...state,
        energy: Math.max(0, Math.min(10, state.energy + action.payload))
      };
    case 'START_NEW_DAY': {
      const newDay = state.day + 1;
      return {
        ...state,
        energy: 10,
        day: newDay,
        canDoRandomEvent: true,
        dailyMonsterGoldReward: genMonsterGoldReward(
          state.monsterWaves[newDay - 1],
          [3, 6, 9].includes(newDay),
          newDay
        ),
        townActions: genTownActions(),
        completedTownActions: {},
        feed: [
          'It\'s a new day.',
          action.payload.feedInitialMessage,
          [3, 6].includes(newDay) && 'Tonight, a boss enemy will attack!',
          newDay === 9 && 'Tonight, the final boss will attack!'
        ].filter(Boolean)
      };
    }
    case 'ADD_TOWN_FEED_TEXT': {
      const newFeed = [...state.feed];
      if (typeof action.payload === 'string') {
        newFeed.push(action.payload);
      } else {
        action.payload.forEach(text => {
          newFeed.push(text);
        });
      }
      return {
        ...state,
        feed: newFeed
      };
    }
    case 'SET_TOWN_ACTION_COMPLETED':
      return {
        ...state,
        completedTownActions: {
          ...state.completedTownActions,
          [action.payload]: true
        }
      };
    case 'SET_TOWN_PURCHASABLE_CARDS':
      return {
        ...state,
        purchasableCards: genPurchasableCards(action.payload)
      };
    case 'RESET_GAME':
      return genInitialState();
    default:
      return state;
  }
};
