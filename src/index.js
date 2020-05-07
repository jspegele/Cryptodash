import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { setCoins } from './actions/coins'
import { setFavorites } from './actions/favorites'
import * as serviceWorker from './serviceWorker'
import './styles/styles.scss'

const store = configureStore()

// populate favorites list
const favorites = JSON.parse(localStorage.getItem('cryptodashFavorites'))
if(favorites) {
  store.dispatch(setFavorites(favorites))
}

// populate coin list
const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)
let coins = []
let coinKeys = []
cc.coinList().then((coinList) => {
  coinKeys = Object.keys(coinList.Data)
  for (let i = 0; i < coinKeys.length; i++) {
    const coin = {
      'symbol': coinList.Data[coinKeys[i]].Symbol,
      'name': coinList.Data[coinKeys[i]].CoinName,
      'sortOrder': coinList.Data[coinKeys[i]].SortOrder,
      'imageUrl': coinList.Data[coinKeys[i]].ImageUrl,
      'isTrading': coinList.Data[coinKeys[i]].IsTrading,
      'price': 0,
      'changePctDay': 0,
      'mktCap': 0
    }
    coins.push(coin)
  }
  store.dispatch(setCoins(coins))
  // const processedData = fetchPrices([], [], coinKeys, coins, 'USD', 200, (processedData) => {
  //   // if (coins) { dispatch({ type: 'POPULATE_COINS', coins: processedData }) }
  //   console.log('processed', processedData)
  // })
}).catch(console.error)

const jsx = (
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
)

ReactDOM.render(jsx, document.getElementById('root'));

serviceWorker.unregister()
