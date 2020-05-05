export const setFavorites = (favorites) => ({
  type: 'SET_FAVORITES',
  favorites
})

export const addFavorite = (favorite) => ({
  type: 'ADD_FAVORITE',
  favorite
})

export const removeFavorite = (favorite) => ({
  type: 'REMOVE_FAVORITE',
  favorite
})
