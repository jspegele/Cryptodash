import React, { useEffect, useReducer } from 'react'
import coinsReducer from '../reducers/coins'


const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

const fetchPrices = (processedKeys, processedCoins, remainingKeys, remainingCoins, currency, spliceSize, callback) => {
  // console.log('remainingCoins',remainingCoins)
  const keysSplice = remainingKeys.splice(0,spliceSize)
  const coinsSplice = remainingCoins.splice(0,spliceSize)
  // console.log('firstsplice', keysSplice)
  // console.log('firstsplice', coinsSplice)
  cc.priceFull(keysSplice, [currency]).then((prices) => {
    // console.log('prices', prices)
    for(let i = 0; i < keysSplice.length; i++) {
      let conversionSym = null, price = null, changeDay = null, changePctDay = null, mktCap = null, imgUrl = null;
      if(prices[keysSplice[i]]) {
        conversionSym = prices[keysSplice[i]][currency].CONVERSIONSYMBOL
        price = prices[keysSplice[i]][currency].PRICE
        changeDay = prices[keysSplice[i]][currency].CHANGEDAY
        changePctDay = prices[keysSplice[i]][currency].CHANGEPCTDAY
        mktCap = prices[keysSplice[i]][currency].MKTCAP
        imgUrl = `http://cryptocompare.com/${prices[keysSplice[i]][currency].IMAGEURL}`
      }
      coinsSplice[i] = {
        ...coinsSplice[i],
        price,
        changeDay,
        changePctDay,
        mktCap,
        imgUrl,
        conversionSym
      }
    }
    processedKeys = processedKeys.concat(keysSplice)
    processedCoins = processedCoins.concat(coinsSplice)
    if(remainingCoins.length > 0) {
      fetchPrices(processedKeys, processedCoins, remainingKeys, remainingCoins, 'USD', spliceSize, callback)
    } else {
      callback(sortCoinsByMktCap(processedCoins))
    }
      
  }).catch(console.error)
}
const sortCoinsByPrice= (coinData) => {
  return coinData.sort((a, b) => b.price - a.price)
}
const sortCoinsByMktCap = (coinData) => {
  return coinData.sort((a, b) => b.mktCap - a.mktCap)
}

const App = () => {
  const [coins, dispatch] = useReducer(coinsReducer, [])

  useEffect(() => {
    let coins = []
    let coinKeys = []
    // fetch coin list
    cc.coinList().then((coinList) => {
      coinKeys = Object.keys(coinList.Data)
      for (let i = 0; i < coinKeys.length; i++) {
        const coin = {
          'symbol': coinList.Data[coinKeys[i]].Symbol,
          'name': coinList.Data[coinKeys[i]].CoinName,
          'sortOrder': coinList.Data[coinKeys[i]].SortOrder,
          'image': coinList.Data[coinKeys[i]].ImageUrl,
          'isTrading': coinList.Data[coinKeys[i]].IsTrading
        }
        coins.push(coin)
      }
      const processedData = fetchPrices([], [], coinKeys, coins, 'USD', 200, (processedData) => {
        if (coins) { dispatch({ type: 'POPULATE_COINS', coins: processedData }) }
        // console.log('processed', processedData)
      })
      // console.log('key', coinKeys)
      // console.log('coins', coins)
    }).catch(console.error)

  }, [])

  return (
      <div className="wrapper">
        <AppRouter />
      </div>
  )
}

export default App