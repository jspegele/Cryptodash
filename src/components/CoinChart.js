import React from 'react'
import ReactHighcharts from 'react-highcharts'
import HighchartsConfig from '../charts/HighChartsConfig'
import HighchartsTheme from '../charts/HighchartsTheme'

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

// series: [{
//   data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
//   pointStart: Date.UTC(2010, 0, 1),
//   pointInterval: 24 * 3600 * 1000 // one day
// }]

const CoinChart = () => {
  const series = [{
    name: 'Bitcoin',
    data: [8500, 8535, 8678, 8903, 8757, 8320, 8218, 8455, 8809, 8724, 8845, 8922, 8645]
  }]
  const fetchHistorical = (sym) => {
    
  }
  return (
    <div className="coin__chart">
      <ReactHighcharts config={HighchartsConfig(series)}/>
    </div>
  )
}

export default CoinChart