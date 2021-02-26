import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { FaCircleNotch, FaCaretDown, FaCaretUp, FaCaretRight, FaSync } from 'react-icons/fa'
import selectCoins from '../selectors/coins'
import { setCoins } from '../actions/coins'
import { updatePriceInfo } from '../actions/price-info'
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

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

class CoinIndexPage extends React.Component {
  state = {
    sort: ''
  }
  componentDidMount = () => {
    if(!this.props.priceInfo.all && this.props.coins.length > 0) {
      this.fetchCoins()
    }
    this._ismounted = true;
  }
  componentDidUpdate = () => {
    if(!this.props.priceInfo.all && this.props.coins.length > 0) {
      this.fetchCoins()
    }
  }
  componentWillUnmount() {
     this._ismounted = false;
     this.props.setTextFilter('')
  }
  updatePrices = () => {
    document.getElementById('refresh-prices-icon').classList.add('fa-spin')
    this.fetchCoins()
  }
  fetchCoins = () => {
    const coins = this.props.coins
    const coinKeys = []
    for(let i = 0; i < coins.length; i++) {
      coinKeys.push(coins[i].symbol)
    }
    this.fetchPrices([], [], [...coinKeys], [...coins], 100, 'USD')
  }
  fetchPrices = (processedKeys, processedCoins, remainingKeys, remainingData, spliceSize, currency) => {
    const keysSplice = remainingKeys.splice(0,spliceSize)
    const dataSplice = remainingData.splice(0,spliceSize)
    console.log(keysSplice)
    
    cc.priceFull(keysSplice, [currency]).then((prices) => {
      for(let i = 0; i < keysSplice.length; i++) {
        let price = null, changeDay = null, changePctDay = null, mktCap = null, imgUrl = null, totalVol24hr = null, supply = null, high24hr = null, low24hr = null;
        if(prices[keysSplice[i]]) {
          price = prices[keysSplice[i]][currency].PRICE
          changeDay = prices[keysSplice[i]][currency].CHANGEDAY
          changePctDay = prices[keysSplice[i]][currency].CHANGEPCTDAY
          mktCap = prices[keysSplice[i]][currency].MKTCAP
          totalVol24hr = prices[keysSplice[i]][currency].VOLUMEDAY
          supply = prices[keysSplice[i]][currency].SUPPLY
          high24hr = prices[keysSplice[i]][currency].HIGH24HOUR
          low24hr = prices[keysSplice[i]][currency].LOW24HOUR
        } else {
          price = 0
          changeDay = 0
          changePctDay = 0
          mktCap = 0
          totalVol24hr = 0
          supply = 0
          high24hr = 0
          low24hr = 0
        }
        dataSplice[i] = {
          ...dataSplice[i],
          price,
          changeDay,
          changePctDay,
          mktCap,
          totalVol24hr,
          supply,
          high24hr,
          low24hr,
          imgUrl
        }
      }
      processedKeys = processedKeys.concat(keysSplice)
      processedCoins = processedCoins.concat(dataSplice)
      if(remainingData.length > 0) {
        this.fetchPrices(processedKeys, processedCoins, remainingKeys, remainingData, spliceSize, currency)
      } else {
        this.props.setCoins(processedCoins)
        this.props.sortByMktCapDesc()
        this.props.updatePriceInfo({
          all: true,
          allLastUpdated: moment().valueOf()
        })
        if (this._ismounted) {
          this.setState(() => ({
            pricesLoaded: true,
            sort: 'mktCapDesc'
          }))
          document.getElementById('refresh-prices-icon').classList.remove('fa-spin')
        }
        return
      }
        
    }).catch(console.error)
  }
  handleTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }
  handleNameSort = () => {
    if(this.state.sort === 'nameAsc') {
      this.props.sortByNameDesc()
      this.setState(() => ({ sort: 'nameDesc' }))
    } else {
      this.props.sortByNameAsc()
      this.setState(() => ({ sort: 'nameAsc' }))
    }
  }
  handlePriceSort = () => {
    if(this.state.sort === 'priceDesc') {
      this.props.sortByPriceAsc()
      this.setState(() => ({ sort: 'priceAsc' }))
    } else {
      this.props.sortByPriceDesc()
      this.setState(() => ({ sort: 'priceDesc' }))
    }
  }
  handleChangeSort = () => {
    if(this.state.sort === 'changeDesc') {
      this.props.sortByChangeAsc()
      this.setState(() => ({ sort: 'changeAsc' }))
    } else {
      this.props.sortByChangeDesc()
      this.setState(() => ({ sort: 'changeDesc' }))
    }
  }
  handleMktCapSort = () => {
    if(this.state.sort === 'mktCapDesc') {
      this.props.sortByMktCapAsc()
      this.setState(() => ({ sort: 'mktCapAsc' }))
    } else {
      this.props.sortByMktCapDesc()
      this.setState(() => ({ sort: 'mktCapDesc' }))
    }
  }
  render() {
    return (
      <div className="content-container">
        <div className="index-header">

        {/* LOAD CURRENT TEXT FILTER INTO SEARCH BAR WHEN RETURNING TO PAGE */}

          <input type="text" className="text-input" placeholder="Search coins" value={this.props.filters.text} onChange={this.handleTextChange} />
          <div className="updater">
            <div className="updater__last-updated">
              Last Updated:
              <span className="updater__time">
                {this.props.priceInfo.allLastUpdated && moment(this.props.priceInfo.allLastUpdated).format('HH:mm')}
              </span>
            </div>
            <button
              type="button"
              className="updater__button"
              onClick={this.updatePrices}
            >
              <FaSync size="1rem" id="refresh-prices-icon" />Refresh Prices
            </button>
          </div>
        </div>
        <div id="coin-list" className="index">
          <div className="table-header show-for-desktop">
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
          {(this.props.coins.length === 0 || !this.props.priceInfo.all) ? (
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
  filters: state.filters,
  priceInfo: state.priceInfo
})

const mapDispatchToProps = (dispatch) => ({
  setCoins: (coins) => dispatch(setCoins(coins)),
  updatePriceInfo: (lastUpdated) => dispatch(updatePriceInfo(lastUpdated)),
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByNameAsc: () => dispatch(sortByNameAsc()),
  sortByNameDesc: () => dispatch(sortByNameDesc()),
  sortByMktCapAsc: () => dispatch(sortByMktCapAsc()),
  sortByMktCapDesc: () => dispatch(sortByMktCapDesc()),
  sortByPriceAsc: () => dispatch(sortByPriceAsc()),
  sortByPriceDesc: () => dispatch(sortByPriceDesc()),
  sortByChangeAsc: () => dispatch(sortByChangeAsc()),
  sortByChangeDesc: () => dispatch(sortByChangeDesc())
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinIndexPage)
