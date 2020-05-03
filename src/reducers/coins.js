const coinsReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_COINS':
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
            ...coin, // spread out original expense
            ...action.updates  // spread out updates and override existing vals
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