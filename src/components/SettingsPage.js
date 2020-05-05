import React from 'react'
import { connect } from 'react-redux'
import { FaCircleNotch } from 'react-icons/fa'
import selectCoins from '../selectors/coins'
import { editCoin } from '../actions/coins'
import { addFavorite, removeFavorite } from '../actions/favorites'
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
    cc.price(symbol, [currency]).then(price => {
      console.log(price[currency])
      this.props.editCoin(symbol, { price: price[currency] })
    }).catch(console.error)
  }
  render() {
    const favoriteCoins = this.props.coins.filter(coin => this.props.favorites.includes(coin.symbol))
    let tileType = 'more'
    if (this.props.favorites.length >= 12) {
      tileType = 'disabled'
    }
    return (
      <div className="content-container">
        {this.firstVisit ? (
          <h1>Hello. Pick your favorite coins to populate your dashboard.</h1>
        ) : (
          <div>
            <h2>Your favorite coins</h2>
            <FavoriteCoins coins={favoriteCoins} clickEvent={this.handleRemoveFavorite} tileType='favorite' />
            <h2>Add up to 12 favorites</h2>
          </div>
        )}
        {(this.props.coins && this.props.coins.length) > 0 ? (
          <Scroller className="fave-list fave-list--more" sliceSize="25" >
            {
            this.props.coins
              .filter(coin => !this.props.favorites.includes(coin.symbol))
              .map(coin => (
                <FavoriteTile key={coin.symbol} coin={coin} clickEvent={this.handleAddFavorite} tileType={tileType} />
              ))
            }
          </Scroller>
        ) : (
          <div className="loading__notificaton">Loading coin data<FaCircleNotch size="2.4rem" className="fa-spin" /></div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  coins: selectCoins(state.coins, state.filters),
  favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (favorite) => dispatch(addFavorite(favorite)),
  removeFavorite: (favorite) => dispatch(removeFavorite(favorite)),
  editCoin: (symbol, updates) => dispatch(editCoin(symbol, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
