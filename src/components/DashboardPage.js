import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { FaCircleNotch, FaBitcoin, FaSync, FaCaretUp, FaCaretDown, FaCaretLeft } from 'react-icons/fa'
import { setCoins, editCoin } from '../actions/coins'
import { setFavorites } from '../actions/favorites'
import { updatePriceInfo } from '../actions/price-info'
import { history } from '../routers/AppRouter'
import CoinChart from './CoinChart'
import CoinDetails from './CoinDetails'
import CoinNews from './CoinNews'
import { formatNumber } from '../utilities/numbers'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)


// this.props.editCoin('BTCD', { price: 123.45 })

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prices: [],
      currentFavorite: null
    }
    this.timer = null
  }
  componentDidMount = () => {
    if (this.props.favorites.length === 0) {
      history.push('/settings')
    } else {
      let currentFavorite = ''
      if (localStorage.getItem('cryptodashCurrentFavorite')) {
        currentFavorite = localStorage.getItem('cryptodashCurrentFavorite')
      } else {
        currentFavorite = this.props.favorites[0]
        localStorage.setItem('cryptodashCurrentFavorite', currentFavorite)
      }
      this.setState(() => ({ currentFavorite }))
    }
  }
  componentDidUpdate = () => {
    if(this.props.coins.length > 0 && !this.props.priceInfo.faves) {
      this.handleUpdatePrices()
    }
  }
  componentWillUnmount = () => {
    clearTimeout(this.timer)
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
        this.timer = setTimeout(function() {
          self.props.editCoin(i, {
            priceFetched: true,
            price: prices[i][currency].PRICE,
            changeDay: prices[i][currency].CHANGEDAY,
            changePctDay: prices[i][currency].CHANGEPCTDAY,
            mktCap: prices[i][currency].MKTCAP,
            totalVol24hr: prices[i][currency].VOLUMEDAY,
            supply: prices[i][currency].SUPPLY,
            high24hr: prices[i][currency].HIGH24HOUR,
            low24hr: prices[i][currency].LOW24HOUR
          })
          self.props.updatePriceInfo({
            faves: true,
            favesLastUpdated: moment().valueOf()
          })
          document.getElementById('refresh-prices-icon').classList.remove('fa-spin')
        }, 300);
      })
    }).catch(console.error)
  }
  handleCurrentFavorite = (e) => {
    const currentFavorite = e.target.id
    this.setState(() => ({ currentFavorite }))
    localStorage.setItem('cryptodashCurrentFavorite', currentFavorite)
  }
  render() {
    const favoriteCoins = this.props.coins.filter(coin => this.props.favorites.includes(coin.symbol))
    const currentCoin = favoriteCoins.filter(coin => coin.symbol === this.state.currentFavorite)[0]
    return (
      <div className='content-container'>
        <div className="dashboard">
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
              favoriteCoins.map(coin => {
                let tileClass = 'fave-tile'
                if (coin.symbol === this.state.currentFavorite) {
                  tileClass += ' fave-tile--currentFave'
                }
                return (
                  <button
                    type="button"
                    className={tileClass}
                    key={coin.symbol}
                    id={coin.symbol}
                    title='View coin details'
                    onClick={this.handleCurrentFavorite}
                  >
                    <div className="fave-tile__overview">
                      <div className="fave-tile__logo">
                        {coin.imageUrl ? (
                          <img src={`http://cryptocompare.com/${coin.imageUrl}`} alt="coin logo" />
                          ) : (
                            <FaBitcoin size="3.2rem" />
                        )}
                      </div>
                      <span className="fave-tile__name">{coin.name}</span>
                      <span className="fave-tile__symbol">{coin.symbol}</span>
                    </div>
                    <div className="fave-tile__price">
                      {coin.price ? (
                        coin.changeDay > 0 ? (
                          <span className="green-text">
                            <span className="light-text">$</span>
                            {coin.price >= .01 ? formatNumber(coin.price.toFixed(2)) : formatNumber(coin.price.toFixed(5))}
                            <FaCaretUp size="1.6rem" />
                          </span>
                        ) : (
                          coin.changeDay < 0 ? (
                            <span className="red-text">
                              <span className="light-text">$</span>
                              {coin.price >= .01 ? formatNumber(coin.price.toFixed(2)) : formatNumber(coin.price.toFixed(5))}
                              <FaCaretDown size="1.6rem" />
                            </span>
                          ) : (
                            <span>
                              <span className="light-text">$</span>
                              {coin.price >= .01 ? formatNumber(coin.price.toFixed(2)) : formatNumber(coin.price.toFixed(5))}
                              <FaCaretLeft size="1.6rem" />
                            </span>
                          )
                        )
                      ) : 'no data'}
                    </div>
                  </button>
                )
              }
              )
            ) : (
              <div className="loading__notificaton">Loading coin data<FaCircleNotch size="2.4rem" className="fa-spin" /></div>
            )}
          </div>
          {(favoriteCoins.length > 0 && this.state.currentFavorite) && 
            <div className="coin__chart">
              <CoinChart symbol={this.state.currentFavorite} title={favoriteCoins.filter(coin => coin.symbol === this.state.currentFavorite)[0].name} />
              <CoinDetails coin={currentCoin} />
            </div>
          }
          <div>
            <h2>Recent News</h2>
            {favoriteCoins.length > 0 && <CoinNews categories={this.props.favorites} showBody={true} results={10} />}
          </div>
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
