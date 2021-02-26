import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaCircleNotch } from 'react-icons/fa'
import selectCoins from '../selectors/coins'
import { editCoin } from '../actions/coins'
import { addFavorite, removeFavorite } from '../actions/favorites'
import { setTextFilter } from '../actions/filters'
import FavoriteCoins from './FavoriteCoins'
import FavoriteTile from './FavoriteTile'
import Scroller from './Scroller'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

export class SettingsPage extends React.Component {
  state = {
    firstVisit: true
  }
  componentDidMount = () => {
    if (this.props.favorites.length > 0) {
      this.setState(() => ({ firstVisit: false }))
    }
  }
  componentDidUpdate = () => {
    const json = JSON.stringify(this.props.favorites)
    localStorage.setItem('cryptodashFavorites', json)
  }
  componentWillUnmount = () => {
    this.props.setTextFilter('')
  }
  handleAddFavorite = (e) => {
    this.props.addFavorite(e.target.id)
    this.fetchPrice(e.target.id)
  }
  handleRemoveFavorite = (e) => {
    this.props.removeFavorite(e.target.id)
    if(e.target.id === localStorage.getItem('cryptodashCurrentFavorite')) {
      localStorage.removeItem('cryptodashCurrentFavorite')
    }
  }
  fetchPrice = (symbol) => {
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
  handleTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }
  render() {
    const favoriteCoins = this.props.coins.filter(coin => this.props.favorites.includes(coin.symbol))
    let tileType = 'more'
    if (this.props.favorites.length >= 12) {
      tileType = 'disabled'
    }
    return (
      <div className="content-container">
        {this.state.firstVisit ? (
          <h1>Hello. Pick your favorite coins to populate your dashboard.</h1>
        ) : (
          <>
            <h1>Your favorite coins</h1>
          </>
        )}
        {favoriteCoins.length > 0 && <h4 className="dash-link"><Link to="/">Go to you dashboard now &raquo;</Link></h4>}
        <FavoriteCoins coins={favoriteCoins} clickEvent={this.handleRemoveFavorite} tileType='favorite' />
        <div className="index-header">
          <input type="text" className="text-input" placeholder="Search coins" value={this.props.filters.text} onChange={this.handleTextChange} />
          <h2>Add up to 12 favorites</h2>
        </div>
        {this.props.coins.length === 0 ? (
          <div className="loading__notificaton">Loading coin data<FaCircleNotch size="2.4rem" className="fa-spin" /></div>
        ) : (this.props.visibleCoins && this.props.visibleCoins.length) > 0 ? (
          <>
            <Scroller className="fave-list fave-list--more" sliceSize="25" >
              {
              this.props.visibleCoins
                .filter(coin => !this.props.favorites.includes(coin.symbol))
                .map(coin => (
                  <FavoriteTile key={coin.symbol} coin={coin} clickEvent={this.handleAddFavorite} tileType={tileType} />
                ))
              }
            </Scroller>
          </>
        ) : (
          <div className="loading__notificaton">No coins found</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  coins: state.coins,
  visibleCoins: selectCoins(state.coins, state.filters),
  favorites: state.favorites,
  filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (favorite) => dispatch(addFavorite(favorite)),
  removeFavorite: (favorite) => dispatch(removeFavorite(favorite)),
  editCoin: (symbol, updates) => dispatch(editCoin(symbol, updates)),
  setTextFilter: (text) => dispatch(setTextFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
