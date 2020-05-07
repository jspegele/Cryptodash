import React from 'react'
import { FaCircleNotch } from 'react-icons/fa'
import ReactHighcharts from 'react-highcharts'
import HighchartsConfig from '../charts/HighChartsConfig'
import HighchartsTheme from '../charts/HighchartsTheme'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

class HighChart extends React.Component {
  render() {
    return (
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
        {this.props.series.length > 0 ? (
          <ReactHighcharts config={HighchartsConfig(this.props.series, this.props.title)}/>
        ) : (
          <div className="loading__notificaton">Loading chart data<FaCircleNotch size="2.4rem" className="fa-spin" /></div>
        )}
      </div>
    )
  }
}

export default HighChart