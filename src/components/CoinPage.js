import React from 'react'
import { connect } from 'react-redux'
import { FaStar, FaRegStar, FaCircleNotch, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { editCoin } from '../actions/coins'
import { addFavorite, removeFavorite } from '../actions/favorites'
import CoinChart from './CoinChart'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

class CoinPage extends React.Component {
  componentDidMount = () => {
    if (this.props.coins.length > 0) {
      this.fetchCoinPrice(this.props.match.params.symbol)
    }
  }
  componentDidUpdate = () => {
    if (this.props.coins.length > 0) {
      this.fetchCoinPrice(this.props.match.params.symbol)
    }
  }
  fetchCoinPrice = (symbol) => {
    const coin = this.props.coins.find(coin => coin.symbol === symbol)
    if (!coin.hasOwnProperty('changeDay')) {
      const currency = 'USD';
      cc.priceFull(symbol, [currency]).then(price => {
        this.props.editCoin(symbol, {
          price: price[symbol][currency].PRICE,
          changeDay: price[symbol][currency].CHANGEDAY,
          changePctDay: price[symbol][currency].CHANGEPCTDAY,
          mktCap: price[symbol][currency].MKTCAP,
          totalVol24hr: price[symbol][currency].VOLUMEDAY,
          supply: price[symbol][currency].SUPPLY,
          high24hr: price[symbol][currency].HIGH24HOUR,
          low24hr: price[symbol][currency].LOW24HOUR
        })
      }).catch(console.error)
    }
  }
  onAddFavorite = (e) => {
    this.props.addFavorite(e.target.id)
  }
  onRemoveFavorite = (e) => {
    this.props.removeFavorite(e.target.id)
  }
  render() {
    const coin = this.props.coins.find(coin => coin.symbol === this.props.match.params.symbol)
    return (
      <div className="content-container">
        {coin ? (
          <div className="grid-container">
            <div className="coin__header">
              <div className="coin__info">
                <div className="coin__title">
                  <div className="coin__logo">
                    <img src={`http://cryptocompare.com/${coin.imageUrl}`} alt="coin logo" />
                  </div>
                  <h1>{coin.name}</h1>
                  <span className="coin__symbol">({coin.symbol})</span>
                </div>
              </div>
              <div className="coin__price">
                <span className="light-text">$</span>
                {coin.price > .01 ? (
                  coin.price.toFixed(2)
                ) : (
                  coin.price.toFixed(5)
                )}
                <div className="coin__change">
                  {coin.changePctDay > 0 ? (
                    <span className="green-text"><FaArrowUp size="1.4rem" />{coin.changePctDay.toFixed(2)}<span className="light-text">%</span></span>
                  ) : (
                    coin.changePctDay < 0 ? (
                      <span className="red-text"><FaArrowDown size="1.4rem" />{coin.changePctDay.toFixed(2) * -1}<span className="light-text">%</span></span>
                    ) : (
                      <span>{coin.changePctDay.toFixed(2)}<span className="light-text">%</span></span>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="coin__favorite">
              {this.props.favorites.includes(coin.symbol) ? (
                <button type="button" className="add-favorite" id={coin.symbol} onClick={this.onRemoveFavorite}><FaStar size="2.4rem" />Remove Favorite</button>
              ) : (
                <button type="button" className="add-favorite" id={coin.symbol} onClick={this.onAddFavorite}><FaRegStar size="2.4rem" />Add to Favorites</button>
              )}
            </div>
            <div className="coin__chart">
              <CoinChart symbol={coin.symbol} title={coin.name} />
              <div className="coin__details">
                <div className="details__datapoint">
                  <div className="datapoint__header">
                    High (24hr)
                  </div>
                  <div className="datapoint__data">
                    ${coin.high24hr && (
                      coin.high24hr > .01 ? (
                        coin.high24hr.toFixed(2)
                      ) : (
                        coin.high24hr.toFixed(5)
                      )
                    )}
                  </div>
                </div>
                <div className="details__datapoint">
                  <div className="datapoint__header">
                    Low (24hr)
                  </div>
                  <div className="datapoint__data">
                    ${coin.low24hr && (
                      coin.low24hr > .01 ? (
                        coin.low24hr.toFixed(2)
                      ) : (
                        coin.low24hr.toFixed(5)
                      )
                    )}
                  </div>
                </div>
                <div className="details__datapoint">
                  <div className="datapoint__header">
                    Volume (24hr)
                  </div>
                  <div className="datapoint__data">
                    {coin.totalVol24hr && (
                      coin.totalVol24hr > .01 ? (
                        coin.totalVol24hr.toFixed(2)
                      ) : (
                        coin.totalVol24hr.toFixed(5)
                      )
                    )}
                  </div>
                </div>
                <div className="details__datapoint">
                  <div className="datapoint__header">
                    Market Cap
                  </div>
                  <div className="datapoint__data">
                    ${coin.mktCap > 1000000000 ? (
                      <span>{(coin.mktCap / 1000000000).toFixed(1)}B</span>
                    ) : (
                      coin.mktCap > 1000000 ? (
                        <span>{(coin.mktCap / 1000000).toFixed(1)}M</span>
                      ) : (
                        coin.mktCap
                      )
                    )}
                  </div>
                </div>
                <div className="details__datapoint">
                  <div className="datapoint__header">
                    Supply
                  </div>
                  <div className="datapoint__data">
                    {coin.supply > 1000000000 ? (
                      <span>{(coin.supply / 1000000000).toFixed(1)}B</span>
                    ) : (
                      coin.supply > 1000000 ? (
                        <span>{(coin.supply / 1000000).toFixed(1)}M</span>
                      ) : (
                        coin.supply
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="coin__aside">
              <h3>{coin.name} News</h3>
            </div>
          </div>
        ) : (
          <div className="loading__notificaton">Loading coin data<FaCircleNotch size="2.4rem" className="fa-spin" /></div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  coins: state.coins,
  favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (favorite) => dispatch(addFavorite(favorite)),
  removeFavorite: (favorite) => dispatch(removeFavorite(favorite)),
  editCoin: (symbol, updates) => dispatch(editCoin(symbol, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinPage)
