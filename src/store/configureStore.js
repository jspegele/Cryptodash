import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import coinsReducer from '../reducers/coins'
import filtersReducer from '../reducers/filters'
import favoritesReducer from '../reducers/favorites'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Store creation

export default () => {
  const store = createStore(
    combineReducers({
      coins: coinsReducer,
      filters: filtersReducer,
      favorites: favoritesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store;
}
