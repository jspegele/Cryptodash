import React from 'react'
import { FaCircleNotch } from 'react-icons/fa'
import ReactHighcharts from 'react-highcharts'
import HighchartsConfig from '../charts/HighChartsConfig'
import { HighChartsDefaultTheme, HighChartsMobileTheme } from '../charts/HighchartsTheme'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

class HighChart extends React.Component {
  render() {
    let chartsTheme = HighChartsDefaultTheme
    let chartHeight = 500
    let yAxisVisible = true
    let chartMargin = undefined
    if (window.innerWidth < 720) {
      chartHeight = 300
      yAxisVisible = false
      chartsTheme = HighChartsMobileTheme
      chartMargin = [0, 10, 50, 10]
    }
    ReactHighcharts.Highcharts.setOptions(chartsTheme);
    return (
      <>
        {this.props.series.length > 0 ? (
          <div className="chart">
            <select
              className="chart__select"
              defaultValue={"week"}
              onChange={this.props.changeChartSelect}
            >
              <option value="week">1W</option>
              <option value="month">1M</option>
              <option value="year">1Y</option>
            </select>
            <ReactHighcharts config={HighchartsConfig(this.props.series, this.props.title, chartHeight, yAxisVisible, chartMargin )}/>
          </div>
        ) : (
          <div className="chart chart--centered">
            <div className="loading__notificaton">Loading chart data<FaCircleNotch size="2.4rem" className="fa-spin" /></div>
          </div>
        )}
      </>
    )
  }
}

export default HighChart