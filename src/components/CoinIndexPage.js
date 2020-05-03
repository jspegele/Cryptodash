import React from 'react'
import CoinTile from './CoinTile'
const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

// export const top100 = ['BTC','ETH','XRP','USDT','BCH','BSV','LTC','BNB','EOS','XTZ','XLM','LINK','ADA','XMR','TRX','LEO','CRO','HT','ETC','DASH','USDC','NEO','HEDG','ATOM','MIOTA','ZEC','XEM','MKR','OKB','ONT','DOGE','FTT','BAT','VET','PAX','DGB','BTG','BUSD','HBAR','DCR','QTUM','LSK','ALGO','ICX','SNX','ZRX','TUSD','RVN','KNC','REP','THETA','ENJ','ZB','HYN','WAVES','BCD','DAI','OMG','NRG','HIVE','MONA','SC','DX','NANO','MCO','DGD','KCS','SNT','BTM','HOT','STEEM','CKB','QNT','KMD','ZIL','AABC','NEXO','BTT','REN','SEELE','MATIC','BTS','LEND','LUNA','ZEN','NMR','HC','VSYS','MANA','DATA','XVG','UBT','MAID','IOST','GNT','STX','PAXG','XZC','ELF','WAXP'];

class DashboardPage extends React.Component {
  state = {
    coinKeys: null,
    coinData: null,
    currency: 'USD',
    sortedCoinData: null
  }
  componentDidMount = () => {
    this.fetchCoins()
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
      console.log('list bottom reached');
      document.removeEventListener('scroll', this.trackScrolling);
    }
  }
  fetchCoins = () => {
    let coinData = []
    cc.coinList().then((coinList) => {
      const coinKeys = Object.keys(coinList.Data)
      for (let i = 0; i < coinKeys.length; i++) {
        const coin = {
          'symbol': coinList.Data[coinKeys[i]].Symbol,
          'name': coinList.Data[coinKeys[i]].CoinName,
          'sortOrder': coinList.Data[coinKeys[i]].SortOrder,
          'image': coinList.Data[coinKeys[i]].ImageUrl,
          'isTrading': coinList.Data[coinKeys[i]].IsTrading
        }
        coinData.push(coin)
      }
      this.setState(() => ({ coinKeys, coinData }), () => this.fetchPrices([], [], [...this.state.coinKeys], [...this.state.coinData], 200))
    }).catch(console.error)
  }
  fetchPrices = (processedKeys, processedData, remainingKeys, remainingData, spliceSize) => {
    const keysSplice = remainingKeys.splice(0,spliceSize)
    const dataSplice = remainingData.splice(0,spliceSize)

    cc.priceFull(keysSplice, [this.state.currency]).then((prices) => {
      for(let i = 0; i < keysSplice.length; i++) {
        let price = null, changeDay = null, changePctDay = null, mktCap = null, imgUrl = null;
        if(prices[keysSplice[i]]) {
          price = prices[keysSplice[i]][this.state.currency].PRICE
          changeDay = prices[keysSplice[i]][this.state.currency].CHANGEDAY
          changePctDay = prices[keysSplice[i]][this.state.currency].CHANGEPCTDAY
          mktCap = prices[keysSplice[i]][this.state.currency].MKTCAP
          imgUrl = `http://cryptocompare.com/${prices[keysSplice[i]][this.state.currency].IMAGEURL}`
        }
        dataSplice[i] = {
          ...dataSplice[i],
          price,
          changeDay,
          changePctDay,
          mktCap,
          imgUrl
        }
      }
      processedKeys = processedKeys.concat(keysSplice)
      processedData = processedData.concat(dataSplice)
      if(remainingData.length > 0) {
        this.fetchPrices(processedKeys, processedData, remainingKeys, remainingData, spliceSize)
      } else {
        this.setState(() => ({ sortedCoinData: this.sortCoinsByMktCap(processedData) }))
        return
      }
        
    }).catch(console.error)
  }
  sortCoinsByPrice= (coinData) => {
    return coinData.sort((a, b) => b.price - a.price)
  }
  sortCoinsByMktCap = (coinData) => {
    return coinData.sort((a, b) => b.mktCap - a.mktCap)
  }
  render() {
    return (
      <div id="coin-list">
        <h1>Top 100 Coins</h1>
        <div className="index-header">
          <div className="text-center">#</div>
          <div>Coin</div>
          <div className="text-right">Price</div>
          <div className="text-right">Change</div>
          <div className="text-right">Market Cap</div>
          <div className="text-center">Favorite</div>
        </div>
        {
          this.state.sortedCoinData ? (
            this.state.sortedCoinData.slice(0, 100).map((coin, index) => (
              <CoinTile key={coin.symbol} index={index} {...coin} />
            ))
          ) : (
            <div>Loading coin data...</div>
          )
        }
      </div>
    )
  }
}

export default DashboardPage;
