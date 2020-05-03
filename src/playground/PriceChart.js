import React from 'react'
import ReactHighcharts from 'react-highcharts'
import { Tile } from './Tile'
import DashContext from '../context/dash-context'
import HighchartsConfig from './HighChartsConfig'
import HighchartsTheme from './HighchartsTheme'
import ChartSelect from './ChartSelect'

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default function(){
  return (
    <DashContext.Consumer>
      {({ historical, changeChartSelect }) => {
        return (
          <Tile>
            <ChartSelect
              defaultValue={"months"}
              onChange={(e) => changeChartSelect(e.target.value)}
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </ChartSelect>
            {historical ?
              <ReactHighcharts config={HighchartsConfig(historical)}/>
              : <div> Loading Historical Data </div>
            }
          </Tile>
        )
      }
      }
    </DashContext.Consumer>
  )
}
