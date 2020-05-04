// SET_FAVORITES
export const setFavorites = (favorites) => ({
  type: 'SET_FAVORITES',
  favorites
})

// ADD_FAVORITE
export const addFavorite = (favorite) => ({
  type: 'ADD_FAVORITE',
  favorite
})

// REMOVE_FAVORITE
export const removeFavorite = (favorite) => ({
  type: 'REMOVE_FAVORITE',
  favorite
})
