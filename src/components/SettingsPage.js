import React from 'react'
import { connect } from 'react-redux'
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
  componentDidUpdate = () => {
    const json = JSON.stringify(this.props.favorites)
    localStorage.setItem('cryptodashFavorites', json)
  }
  handleAddFavorite = (e) => {
    this.props.addFavorite(e.target.id)
    this.fetchPrice(e.target.id)
  }
  handleRemoveFavorite = (e) => {
    this.props.removeFavorite(e.target.id)
  }
  fetchPrice = (symbol) => {
    const currency = 'USD';
    cc.priceFull(symbol, [currency]).then(price => {
      this.props.editCoin(symbol, {
        price: price[symbol][currency].PRICE,
        changeDay: price[symbol][currency].CHANGEDAY,
        changePctDay: price[symbol][currency].CHANGEPCTDAY,
        mktCap: price[symbol][currency].MKTCAP
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
        {/* <div className="loading__notificaton">Loading coin data<FaCircleNotch size="2.4rem" className="fa-spin" /></div> */}
        {this.firstVisit ? (
          <h1>Hello. Pick your favorite coins to populate your dashboard.</h1>
        ) : (
          <>
            <h2>Your favorite coins</h2>
            <FavoriteCoins coins={favoriteCoins} clickEvent={this.handleRemoveFavorite} tileType='favorite' />
          </>
        )}
        <div className="index-header">
          <h2>Add up to 12 favorites</h2>
          <input type="text" className="text-input" placeholder="Search coins" value={this.props.filters.text.searchText} onChange={this.handleTextChange} />
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
