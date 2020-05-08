import React from 'react'
import moment from 'moment'
import HighChart from './HighChart'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

class CoinChart extends React.Component {
  state = {
    symbol: '',
    coin: null,
    iterations: 7,
    interval: 1,
    units: 'days',
    currency: 'USD',  
    series: []
  }
  componentDidMount = () => {
    this.setState(() => ({ symbol: this.props.symbol }), () => this.fetchHistorical())
  }
  componentDidUpdate = () => {
    if (this.state.symbol !== this.props.symbol) {
      this.setState(() => ({
        symbol: this.props.symbol,
        series: []
      }), () => this.fetchHistorical())
    }
  }
  fetchHistorical = () => {
    this.historical([], this.state.iterations);
  }
  historical = (prices, iterations) => {
    const point = moment().subtract(this.state.interval * iterations, this.state.units)
    cc.priceHistorical(this.state.symbol, [this.state.currency], new Date(point))
      .then(price => {
        prices.push([point.valueOf(), price[this.state.currency]])
        if (iterations > 0) {
          this.historical(prices, iterations - 1)
        } else {
          this.setState(() => ({
            series: [{
              data: prices,
              showInLegend: false
            }]
          }))
        }
    })
  }
  changeChartSelect = (e) => {
    if (e.target.value === 'week') {
      this.setState(() => ({
        iterations: 7,
        interval: 1,
        units: 'days',  
        series: []
      }), () => this.fetchHistorical())
    } else if (e.target.value === 'month') {
      this.setState(() => ({
        iterations: 30,
        interval: 1,
        units: 'days',  
        series: []
      }), () => this.fetchHistorical())
    } else if (e.target.value === 'year') {
      this.setState(() => ({
        iterations: 73,
        interval: 5,
        units: 'days',  
        series: []
      }), () => this.fetchHistorical())
    }
    
  }
  render() {
    return (
      <HighChart title={this.props.title} series={this.state.series} changeChartSelect={this.changeChartSelect}></HighChart>
    )
  }
}

export default CoinChart