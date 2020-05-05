import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FaRegStar } from 'react-icons/fa'
import { history } from '../routers/AppRouter'
import CoinChart from './CoinChart'
const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

const CoinPage = (props) => {
  let prices = []
  for (let i = 0; i < 10; i++) {
    const histDate = moment().subtract(10-i, 'days').toDate()
    cc.priceHistorical([props.match.params.symbol], ['USD'], histDate).then(price => {
      prices[i] = {
        date: histDate,
        price
      }
      console.log(prices)
    })
  }
  
  const onFavorite = () => {

  }
  return (
    <div>
    {({ coins }) => {
      if(coins.length === 0) { 
        history.push('/')
      } else {
        const filterResults = coins.filter((coin) => coin.symbol === props.match.params.symbol)
        const coin = filterResults[0]
        return (
          <div className="content-container">
            <div className="coin">
              <div className="coin__header">
                <h1 className="coin__title">{coin.name}<span className="coin__symbol">({coin.symbol})</span></h1>
                <div className="coin__price"><span className="coin__currency">$</span>{coin.price.toFixed(2)}</div>
                <button type="button" className="coin__favorite" onClick="onFavorite"><FaRegStar size="2rem" />Add to Favorites</button>
              </div>
              <div className="coin__wrapper">
                <div className="coin__main">
                  <CoinChart coin={coin}></CoinChart>
                  <div className="coin__details">
                    <div>{coin.price}</div>
                    <div>{coin.mktCap}</div>
                  </div>
                </div>
                <div className="coin__aside">
                  <h3>{coin.name} News</h3>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }}
    </div>
  )
}

export default CoinPage