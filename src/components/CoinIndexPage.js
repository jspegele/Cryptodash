import React from 'react'
import { FaCircleNotch } from 'react-icons/fa'
import CoinTile from './CoinTile'

class DashboardPage extends React.Component {
  state ={
    sliceSize: 50,
    nextCoinIndex: 0,
    loading: false
  }
  componentDidMount = () => {
    document.addEventListener('scroll', this.trackScrolling);
  }
  componentDidUpdate = () => {
    document.addEventListener('scroll', this.trackScrolling);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  trackScrolling = () => {
    const wrappedElement = document.getElementById('coin-list');
    if (this.isBottom(wrappedElement)) {
      this.setState(() => ({ loading: true }))
      document.removeEventListener('scroll', this.trackScrolling);
      const self = this;
      setTimeout(function() {
        self.setState(() => ({
          nextCoinIndex: self.state.nextCoinIndex + self.state.sliceSize,
          loading: false
        }))
      }, 2000);
    }
  }
  render() {
    return (
      <div id="coin-list" className="index">
        <div className="index__header">
          <div className="text-center">#</div>
          <div>Coin</div>
          <div className="text-right">Price</div>
          <div className="text-right">Change</div>
          <div className="text-right">Market Cap</div>
          <div className="text-center">Favorite</div>
        </div>
        <div>
          {({ coins }) => (
            coins.length > 0 ? (
              coins.slice(0, (this.state.nextCoinIndex + this.state.sliceSize - 1)).map((coin, index) => (
                <CoinTile key={coin.symbol} type={'full'} index={index} coin={coin} />
              ))
            ) : (
              <div className="loading__notificaton">Loading coin data<FaCircleNotch size="2.4rem" className="fa-spin" /></div>
            )
          )}
        </div>
        {this.state.loading && <div className="loading__notificaton">Fetching more coins<FaCircleNotch size="2.4rem" className="fa-spin" /></div>}
      </div>
    )
  }
}

export default DashboardPage;
