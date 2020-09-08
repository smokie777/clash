import { controller } from '../controller';

// for coding simplicity, stats can only go up (can't lose stats). (may change in the future)
const initialState = {
  // persisted variables
  yourName: controller.yourName || '',
  yourImage: controller.yourImage || '',
  yourStats: { attack: 0, magic: 0, defense: 0 },
  yourStatBonuses: { attack: 0, magic: 0, defense: 0 },

  // will be reset before each fight
  enemyName: '',
  enemyImage: '',
  enemyStats: { attack: 0, magic: 0, defense: 0 },
  enemyStatBonuses: { attack: 0, magic: 0, defense: 0 },
  enemyType: null,
  isEnemyElite: false,
  enemyShields: 0,
  yourShields: 0,
  winner: null,
  winnerImage: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYER':
      return {
        ...state,
        yourName: action.payload.name,
        yourImage: action.payload.image
      };
    case 'SET_ENEMY':
      return {
        ...state,
        enemyName: action.payload.name,
        enemyImage: action.payload.image,
        enemyType: action.payload.type,
        isEnemyElite: action.payload.isEnemyElite
      };
    case 'SET_YOUR_SHIELDS':
      return {
        ...state,
        yourShields: action.payload
      };
    case 'SET_ENEMY_SHIELDS':
      return {
        ...state,
        enemyShields: action.payload
      };
    case 'SET_STATS': {
      const {
        stats, // { attack, magic, defense } Number|undefined
        type, // 'stats'|'bonuses'
        player, // 'you'|'enemy'
        operation // 'set'|'adjust'
      } = action.payload;
      const { attack, magic, defense } = stats;
      const key = `${player === 'you' ? 'your' : 'enemy'}${type === 'stats' ? 'Stats' : 'StatBonuses'}`;
      
      return {
        ...state,
        [key]: {
          attack: typeof attack === 'number'
            ? operation === 'set' ? attack : state[key].attack + attack
            : state[key].attack,
          magic: typeof magic === 'number'
            ? operation === 'set' ? magic : state[key].magic + magic
            : state[key].magic,
          defense: typeof defense === 'number'
            ? operation === 'set' ? defense : state[key].defense + defense
            : state[key].defense
        },
      };
    }
    case 'SET_WINNER':
      return {
        ...state,
        winner: action.payload,
        winnerImage: action.payload === state.yourName ? state.yourImage : state.enemyImage
      };
    case 'SET_BATTLE_INITIAL_STATE':
      return {
        ...state,
        yourShields: 0,
        enemyShields: 0,
        winner: null,
        winnerImage: null
      };
    case 'START_NEW_DAY':
      return {
        ...state,
        yourStatBonuses: { attack: 0, magic: 0, defense: 0 },
        enemyStatBonuses: { attack: 0, magic: 0, defense: 0 },
      };
    default:
      return state;
  }
};
