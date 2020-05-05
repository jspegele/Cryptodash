const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVORITES':
      return action.favorites
    case 'ADD_FAVORITE':
      return [
        ...state,
        action.favorite
      ]
    case 'REMOVE_FAVORITE':
      return state.filter((favorite) => favorite !== action.favorite)
    default:
      return state
  }
}

export { favoritesReducer as default }
