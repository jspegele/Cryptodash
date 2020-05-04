import React from 'react'
import ReactHighcharts from 'react-highcharts'
import HighchartsConfig from '../charts/HighChartsConfig'
import HighchartsTheme from '../charts/HighchartsTheme'

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

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