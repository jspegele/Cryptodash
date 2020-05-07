import React from 'react'
import { formatNumber } from '../utilities/numbers'

const CoinDetails = (props) => {
  return (
    <div className="coin__details">
      <div className="details__datapoint">
        <div className="datapoint__header">
          High (24hr)
        </div>
        <div className="datapoint__data">
          ${props.coin.high24hr && (
            props.coin.high24hr > .01 ? (
              formatNumber(props.coin.high24hr.toFixed(2))
            ) : (
              props.coin.high24hr.toFixed(5)
            )
          )}
        </div>
      </div>
      <div className="details__datapoint">
        <div className="datapoint__header">
          Low (24hr)
        </div>
        <div className="datapoint__data">
          ${props.coin.low24hr && (
            props.coin.low24hr > .01 ? (
              formatNumber(props.coin.low24hr.toFixed(2))
            ) : (
              props.coin.low24hr.toFixed(5)
            )
          )}
        </div>
      </div>
      <div className="details__datapoint">
        <div className="datapoint__header">
          Volume (24hr)
        </div>
        <div className="datapoint__data">
          {props.coin.totalVol24hr > 1000000000 ? (
            <span>{(props.coin.totalVol24hr / 1000000000).toFixed(1)}B</span>
          ) : (
            props.coin.totalVol24hr > 1000000 ? (
              <span>{(props.coin.totalVol24hr / 1000000).toFixed(1)}M</span>
            ) : (
              props.coin.totalVol24hr && (
                props.coin.totalVol24hr > .01 ? (
                  formatNumber(props.coin.totalVol24hr.toFixed(2))
                ) : (
                  props.coin.totalVol24hr.toFixed(5)
                )
              )
            )
          )}
        </div>
      </div>
      <div className="details__datapoint">
        <div className="datapoint__header">
          Market Cap
        </div>
        <div className="datapoint__data">
          ${props.coin.mktCap > 1000000000 ? (
            <span>{(props.coin.mktCap / 1000000000).toFixed(1)}B</span>
          ) : (
            props.coin.mktCap > 1000000 ? (
              <span>{(props.coin.mktCap / 1000000).toFixed(1)}M</span>
            ) : (
              formatNumber(props.coin.mktCap)
            )
          )}
        </div>
      </div>
      <div className="details__datapoint">
        <div className="datapoint__header">
          Supply
        </div>
        <div className="datapoint__data">
          {props.coin.supply > 1000000000 ? (
            <span>{(props.coin.supply / 1000000000).toFixed(1)}B</span>
          ) : (
            props.coin.supply > 1000000 ? (
              <span>{(props.coin.supply / 1000000).toFixed(1)}M</span>
            ) : (
              formatNumber(props.coin.supply)
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default CoinDetails
