const coinsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_COINS':
      return action.coins
    case 'ADD_COIN':
      return [
        ...state,
        action.coin
      ]
    case 'EDIT_COIN':
      return state.map((coin) => {
        if(coin.symbol === action.symbol) {
          return {
            ...coin,
            ...action.updates
          }
        } else {
          return coin;
        }
      });
    default:
      return state
  }
}

export { coinsReducer as default }
