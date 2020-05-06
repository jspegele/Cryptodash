import React from 'react'
import { connect } from 'react-redux'
import { FaCircleNotch } from 'react-icons/fa'
import selectCoins from '../selectors/coins'
import { editCoin } from '../actions/coins'
import { setTextFilter } from '../actions/filters'
import CoinTile from './CoinTile'
import Scroller from './Scroller'

class CoinIndexPage extends React.Component {
  handleTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }
  render() {
    return (
      <div className="content-container">
        <div className="index-header">
          <div></div>
          <input type="text" className="text-input" placeholder="Search coins" value={this.props.filters.text.searchText} onChange={this.handleTextChange} />
        </div>
        <div id="coin-list" className="index">
          <div className="table-header">
            <div className="text-center">#</div>
            <div>Coin</div>
            <div className="text-right">Price</div>
            <div className="text-right">Change</div>
            <div className="text-right">Market Cap</div>
            <div className="text-center">Favorite</div>
          </div>
          {this.props.coins.length === 0 ? (
            <div className="loading__notificaton">Loading coin data<FaCircleNotch size="2.4rem" className="fa-spin" /></div>
          ) : (this.props.visibleCoins && this.props.visibleCoins.length) > 0 ? (
            <>
              <Scroller sliceSize="25" >
                {
                this.props.visibleCoins
                  .map((coin, i) => (
                    <CoinTile key={coin.symbol} type={'full'} index={i} coin={coin} />
                  ))
                }
              </Scroller>
            </>
          ) : (
            <div className="loading__notificaton">No coins found</div>
          )}
        </div>
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
  editCoin: (symbol, updates) => dispatch(editCoin(symbol, updates)),
  setTextFilter: (text) => dispatch(setTextFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinIndexPage)
