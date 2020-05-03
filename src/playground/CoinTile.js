import React from 'react'
import DashContext from '../context/dash-context'
import { SelectableTile, DeletableTile, DisabledTile } from './Tile'
import CoinHeaderGrid from './CoinHeaderGrid'
import CoinImage from './CoinImage'

const CoinTile = ({ coinKey, topSection }) => {
  const clickCoinHandler = (topSection, coinKey, addCoin, removeCoin) => (
    topSection ? () => {
      removeCoin(coinKey)
    } : () => {
      addCoin(coinKey)
    }
  )
  return (
    <DashContext.Consumer>
      {({ coinList, addCoin, removeCoin, isInFavorites }) => {
        let coin = coinList[coinKey];
        const TileClass = topSection ? DeletableTile : (
          isInFavorites(coinKey) ? DisabledTile : SelectableTile
        )

        return (
          <TileClass
            onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin) }
          >
            <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol} topSection={topSection} />
            <CoinImage coin={coin} />
          </TileClass>
        )
      }}
    </DashContext.Consumer>
  )
}

export { CoinTile as default }