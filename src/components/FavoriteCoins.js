import React from 'react'
import { FaCircleNotch } from 'react-icons/fa'
import FavoriteTile from './FavoriteTile'

const FavoriteCoins = (props) => (
  <div>
    <div className="fave-list">
      {props.coins.length > 0 ? (
        props.coins.map(coin => 
          <FavoriteTile key={coin.symbol} coin={coin} clickEvent={props.clickEvent} tileType={props.tileType} />
        )
      ) : (
        <div className="loading__notificaton">Loading coin data<FaCircleNotch size="2.4rem" className="fa-spin" /></div>
      )}
    </div>
  </div>
)

export default FavoriteCoins
