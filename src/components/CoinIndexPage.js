import React, { useContext } from 'react'
import CoinsContext from '../context/coins-context'
import CoinTile from './CoinTile'

class DashboardPage extends React.Component {
  render() {
    return (
      <div id="coin-list" className="index">
        <div className="index-header">
          <div className="text-center">#</div>
          <div>Coin</div>
          <div className="text-right">Price</div>
          <div className="text-right">Change</div>
          <div className="text-right">Market Cap</div>
          <div className="text-center">Favorite</div>
        </div>
        <CoinsContext.Consumer>
          {({ coins }) => (
            coins.length > 0 ? (
              coins.slice(0, 50).map((coin, index) => (
                <CoinTile key={coin.symbol} index={index} coin={coin} />
              ))
            ) : (
              <div>Loading coin data...</div>
            )
          )}
        </CoinsContext.Consumer>
      </div>
    )
  }
}

export default DashboardPage;
