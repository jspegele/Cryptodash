import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { FaCircleNotch, FaBitcoin, FaSync } from 'react-icons/fa'
import { setCoins, editCoin } from '../actions/coins'
import { setFavorites } from '../actions/favorites'
import { updatePriceInfo } from '../actions/price-info'
import { history } from '../routers/AppRouter'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)


// this.props.editCoin('BTCD', { price: 123.45 })

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prices: []
    }
  }
  componentDidMount = () => {
    if (this.props.favorites.length === 0) {
      history.push('/settings')
    }
  }
  componentDidUpdate = () => {
    if(!this.props.priceInfo.faves) {
      this.handleUpdatePrices()
    }
  }
  handleUpdatePrices = () => {
    this.updatePrices()
    this.props.updatePriceInfo({
      faves: true,
      favesLastUpdated: moment().valueOf()
    })
  }
  updatePrices = () => {
    const currency = 'USD';
    const favoriteSymbols = this.props.coins.filter(coin => this.props.favorites.includes(coin.symbol)).map(coin => coin.symbol)
    document.getElementById('refresh-prices-icon').classList.add('fa-spin')
    cc.priceFull(favoriteSymbols, [currency]).then(prices => {
      Object.keys(prices).forEach(i => {
        const self = this
        setTimeout(function() {
          // const coin = this.props.coins.find(({ symbol }) => symbol === i)
          self.props.editCoin(i, {
            price: prices[i][currency].PRICE,
            changeDay: prices[i][currency].CHANGEDAY
          })
          self.props.updatePriceInfo({
            faves: true,
            favesLastUpdated: moment().valueOf()
          })
          document.getElementById('refresh-prices-icon').classList.remove('fa-spin')
        }, 500);
      })
    }).catch(console.error)
  }
  render() {
    const favoriteCoins = this.props.coins.filter(coin => this.props.favorites.includes(coin.symbol))
    return (
      <div className='content-container'>
        <div className="updater">
          <div className="updater__last-updated">
            Last Updated:
            <span className="updater__time">
              {this.props.priceInfo.favesLastUpdated && moment(this.props.priceInfo.favesLastUpdated).format('HH:mm')}
            </span>
          </div>
          <button
            type="button"
            className="updater__button"
            onClick={this.updatePrices}
          >
            <FaSync size="1rem" id="refresh-prices-icon" />Refresh Prices
          </button>
        </div>
        <div className="fave-list">
          {favoriteCoins.length > 0 ? (
            favoriteCoins.map(coin => (
              <a className='fave-tile' key={coin.symbol} id={coin.symbol} title='View coin details' href={"/coin/"+coin.symbol}>
                <div className="fave-tile__name">
                  {coin.imageUrl ? (
                    <img src={`http://cryptocompare.com/${coin.imageUrl}`} alt="coin logo" />
                    ) : (
                      <FaBitcoin size="3.2rem" />
                    )}
                  {coin.name}
                  <span className="fave-tile__symbol">{coin.symbol}</span>
                </div>
                <div className="fave-tile__favorite">
                  {coin.price ? (
                    coin.changeDay > 0 ? (
                      <span className="green-text">${coin.price >= .01 ? coin.price.toFixed(2) : coin.price.toFixed(5)}</span>
                    ) : (
                      coin.changeDay < 0 ? (
                        <span className="red-text">${coin.price >= .01 ? coin.price.toFixed(2) : coin.price.toFixed(5)}</span>
                      ) : (
                        <span>${coin.price >= .01 ? coin.price.toFixed(2) : coin.price.toFixed(5)}</span>
                      )
                    )
                  ) : 'refresh'}
                </div>
              </a>
              )
            )
          ) : (
            <div className="loading__notificaton">Loading coin data<FaCircleNotch size="2.4rem" className="fa-spin" /></div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  coins: state.coins,
  favorites: state.favorites,
  priceInfo: state.priceInfo
})

const mapDispatchToProps = (dispatch, props) => ({
  setCoins: (coins) => dispatch(setCoins(coins)),
  editCoin: (symbol, updates) => dispatch(editCoin(symbol, updates)),
  setFavorites: (favorites) => dispatch(setFavorites(favorites)),
  updatePriceInfo: (lastUpdated) => dispatch(updatePriceInfo(lastUpdated))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
