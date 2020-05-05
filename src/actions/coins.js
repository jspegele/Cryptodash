export const setCoins = (coins) => ({
  type: 'SET_COINS',
  coins
})

export const editCoin = (symbol, updates) => ({
  type: 'EDIT_COIN',
  symbol,
  updates
})
