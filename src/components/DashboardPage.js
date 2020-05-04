import React from 'react'
import { connect } from 'react-redux'
import { setCoins } from '../actions/coins'
import { setFavorites } from '../actions/favorites'
import { history } from '../routers/AppRouter'
import FavoriteCoins from './FavoriteCoins'


export const DashboardPage = (props) => {
  if (props.favorites.length === 0) {
    history.push('/settings')
  }
  const favoriteCoins = props.coins.filter(coin => props.favorites.includes(coin.symbol))
  const handleOpenCoinPage = (e) => {
    history.push(`/coin/${e.target.id}`)
  }
  return (
    <div>
      <FavoriteCoins coins={favoriteCoins} clickEvent={handleOpenCoinPage} tileType='dashboard' />
    </div>
  )
}

const mapStateToProps = (state) => ({
  coins: state.coins,
  favorites: state.favorites
})

const mapDispatchToProps = (dispatch, props) => ({
  setCoins: (coins) => dispatch(setCoins(coins)),
  setFavorites: (favorites) => dispatch(setFavorites(favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
