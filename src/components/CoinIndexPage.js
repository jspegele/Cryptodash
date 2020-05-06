import React from 'react'
import { connect } from 'react-redux'
import { FaCircleNotch, FaCaretUp, FaCaretDown, FaCaretRight } from 'react-icons/fa'
import selectCoins from '../selectors/coins'
import { editCoin } from '../actions/coins'
import {
  setTextFilter,
  sortByNameAsc,
  sortByNameDesc,
  sortByMktCapAsc,
  sortByMktCapDesc,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByChangeAsc,
  sortByChangeDesc
} from '../actions/filters'
import CoinTile from './CoinTile'
import Scroller from './Scroller'

class CoinIndexPage extends React.Component {
  state = {
    sort: ''
  }
  handleTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }
  handleNameSort = () => {
    if(this.state.sort === 'nameAsc') {
      this.props.sortByNameDesc()
      this.setState(() => ({ sort: 'nameDesc'}))
    } else {
      this.props.sortByNameAsc()
      this.setState(() => ({ sort: 'nameAsc'}))
    }
  }
  handlePriceSort = () => {
    if(this.state.sort === 'priceAsc') {
      this.props.sortByPriceDesc()
      this.setState(() => ({ sort: 'priceDesc'}))
    } else {
      this.props.sortByPriceAsc()
      this.setState(() => ({ sort: 'priceAsc'}))
    }
  }
  handleChangeSort = () => {
    if(this.state.sort === 'changeAsc') {
      this.props.sortByChangeDesc()
      this.setState(() => ({ sort: 'changeDesc'}))
    } else {
      this.props.sortByChangeAsc()
      this.setState(() => ({ sort: 'changeAsc'}))
    }
  }
  handleMktCapSort = () => {
    if(this.state.sort === 'mktCapAsc') {
      this.props.sortByMktCapDesc()
      this.setState(() => ({ sort: 'mktCapDesc'}))
    } else {
      this.props.sortByMktCapAsc()
      this.setState(() => ({ sort: 'mktCapAsc'}))
    }
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
            <div className="table_header__sort" onClick={this.handleNameSort}>
              {this.state.sort === 'nameAsc' ? (
                <FaCaretUp size="1.8rem" />
              ) : (
                this.state.sort === 'nameDesc' ? (
                  <FaCaretDown size="1.8rem" />
                ) : (
                  <FaCaretRight size="1.8rem" />
                )
              )}
              Coin
            </div>
            <div className="table_header__sort table_header__sort--right" onClick={this.handlePriceSort}>
              {this.state.sort === 'priceAsc' ? (
                <FaCaretUp size="1.8rem" />
              ) : (
                this.state.sort === 'priceDesc' ? (
                  <FaCaretDown size="1.8rem" />
                ) : (
                  <FaCaretRight size="1.8rem" />
                )
              )}
              Price
            </div>
            <div className="table_header__sort table_header__sort--right" onClick={this.handleChangeSort}>
              {this.state.sort === 'changeAsc' ? (
                <FaCaretUp size="1.8rem" />
              ) : (
                this.state.sort === 'changeDesc' ? (
                  <FaCaretDown size="1.8rem" />
                ) : (
                  <FaCaretRight size="1.8rem" />
                )
              )}
              Change
            </div>
            <div className="table_header__sort table_header__sort--right" onClick={this.handleMktCapSort}>
              {this.state.sort === 'mktCapAsc' ? (
                <FaCaretUp size="1.8rem" />
              ) : (
                this.state.sort === 'mktCapDesc' ? (
                  <FaCaretDown size="1.8rem" />
                ) : (
                  <FaCaretRight size="1.8rem" />
                )
              )}
              Market Cap
            </div>
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
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByNameAsc: (text) => dispatch(sortByNameAsc()),
  sortByNameDesc: (text) => dispatch(sortByNameDesc()),
  sortByMktCapAsc: (text) => dispatch(sortByMktCapAsc()),
  sortByMktCapDesc: (text) => dispatch(sortByMktCapDesc()),
  sortByPriceAsc: (text) => dispatch(sortByPriceAsc()),
  sortByPriceDesc: (text) => dispatch(sortByPriceDesc()),
  sortByChangeAsc: (text) => dispatch(sortByChangeAsc()),
  sortByChangeDesc: (text) => dispatch(sortByChangeDesc())
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinIndexPage)







