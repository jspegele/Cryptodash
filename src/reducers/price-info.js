const defaultState = {
  all: false,
  allLastUpdated: null,
  faves: false,
  favesLastUpdated: null
}

const priceInfoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PRICE_INFO':
      return action.priceInfo
    case 'UPDATE_PRICE_INFO':
      return {
        ...state,
        ...action.updates
      }
    default:
      return state
  }
}

export { priceInfoReducer as default }
