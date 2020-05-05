import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import coinsReducer from '../reducers/coins'
import filtersReducer from '../reducers/filters'
import favoritesReducer from '../reducers/favorites'
import priceInfoReducer from '../reducers/price-info'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Store creation

export default () => {
  const store = createStore(
    combineReducers({
      coins: coinsReducer,
      filters: filtersReducer,
      favorites: favoritesReducer,
      priceInfo: priceInfoReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store;
}
