import React from 'react'
import moment from 'moment'
import ReactHighcharts from 'react-highcharts'
import HighchartsConfig from '../charts/HighChartsConfig'
import HighchartsTheme from '../charts/HighchartsTheme'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

// series: [{
//   data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
//   pointStart: Date.UTC(2010, 0, 1),
//   pointInterval: 24 * 3600 * 1000 // one day
// }]

class CoinChart extends React.Component {
  state = {
    tickInterval: 24 * 3600 * 1000,
    iterations: 10,
    units: 'days',
    currency: 'USD',  
    series: ''
  }
  componentDidMount = () => {
    // moment().subtract(10, 'days').valueOf()
    
    // cc.priceHistorical('BTC', [this.state.currency], new Date(moment().subtract(10, 'days')))
    //   .then(price => {
    //     console.log(price[this.state.currency])
    // })
  
    // this.setState(() => ({
    //   series: [{
    //     name: 'Bitcoin',
    //     data: [8500, 8535, 8678, 8903, 8757, 8320, 8218, 8455, 8809, 8724, 8845, 8922, 8645],
    //     pointStart: this.state.start,
    //     pointInterval: this.state.tickInterval
    //   }]
    // }))
    this.fetchHistorical()

  }
  fetchHistorical = () => {
    this.historical([], this.state.iterations - 1);
  }
  historical = (prices, iterations) => {
    const point = moment().subtract(iterations, this.state.units)
    cc.priceHistorical('BTC', [this.state.currency], new Date(point))
      .then(price => {
        prices.push(price[this.state.currency])
        if (iterations > 0) {
          this.historical(prices, iterations - 1)
        } else {
          console.log('prices', prices)
          this.setState(() => ({
            series: [{
              name: 'Bitcoin',
              data: prices,
              pointStart: moment().subtract(this.state.iterations, this.state.units).valueOf(),
              pointInterval: this.state.tickInterval
            }]
          }))
        }
    })
  }
  render() {
    return (
      <div className="coin__chart">
        <ReactHighcharts config={HighchartsConfig(this.state.series)}/>
      </div>
    )
  }
}

export default CoinChart