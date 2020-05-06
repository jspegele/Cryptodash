import React from 'react'
import { connect } from 'react-redux'
import { FaRegStar, FaCircleNotch, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { addFavorite, removeFavorite } from '../actions/favorites'
import CoinChart from './CoinChart'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

class CoinPage extends React.Component {
  state = {
    coin: null
  }
  componentDidMount = () => {
    if (this.props.coins.length > 0 && !this.state.coin) {
      const symbol = this.props.match.params.symbol
      this.fetchCoin(symbol)
    }
  }
  componentDidUpdate = () => {
    if (this.props.coins.length > 0 && !this.state.coin) {
      const symbol = this.props.match.params.symbol
      this.fetchCoin(symbol)
    }
  }
  fetchCoin = (symbol) => {
    const coin = this.props.coins.find(coin => coin.symbol === symbol)
    console.log(coin)
    this.setState(() => ({ coin }))
  }
  render() {
    const coin = this.state.coin
    return (
      <div className="content-container">
        {coin ? (
          <div class="grid-container">
            <div class="coin__header">
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
                    <span className="green-text"><FaArrowUp size="2rem" />{coin.changePctDay.toFixed(2)}<span className="light-text">%</span></span>
                  ) : (
                    coin.changePctDay < 0 ? (
                      <span className="red-text"><FaArrowDown size="2rem" />{coin.changePctDay.toFixed(2) * -1}<span className="light-text">%</span></span>
                    ) : (
                      <span>{coin.changePctDay.toFixed(2)}<span className="light-text">%</span></span>
                    )
                  )}
                </div>
              </div>
            </div>
            <div class="coin__favorite">
              <button type="button" className="add-favorite" onClick="onFavorite"><FaRegStar size="2.4rem" />Add to Favorites</button>
            </div>
            <div class="coin__chart">
              <CoinChart coin={coin}></CoinChart>
              <div className="chartn__details">
                
              </div>
            </div>
            <div class="coin__aside">
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
  removeFavorite: (favorite) => dispatch(removeFavorite(favorite))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinPage)
