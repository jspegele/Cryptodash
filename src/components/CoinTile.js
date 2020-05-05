import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegStar } from 'react-icons/fa'

const CoinTile = (props) => {
  return (
    <Link className="coin-tile" to={`/coin/${props.coin.symbol}`}>
      <div className="coin-tile__order text-center">{props.index + 1}</div>
      <div className="coin-tile__name">
        <img src={`http://cryptocompare.com/${props.coin.imageUrl}`} alt="coin logo" />
        {props.coin.name}
        <span className="coin-tile__symbol">{props.coin.symbol}</span>
      </div>
      <div className="coin-tile__price">
        <span>
          {props.coin.price && (
            props.coin.changeDay > 0 ? (
              <span className="green-text">${props.coin.price >= .01 ? props.coin.price.toFixed(2) : props.coin.price.toFixed(5)}</span>
            ) : (
              props.coin.changeDay < 0 ? (
                <span className="red-text">${props.coin.price >= .01 ? props.coin.price.toFixed(2) : props.coin.price.toFixed(5)}</span>
              ) : (
                <span>${props.coin.price >= .01 ? (
                  props.coin.price.toFixed(2)
                ) : (
                  props.coin.price >= .000001 ? (
                    props.coin.price.toFixed(5)
                  ) : (
                    props.coin.price.toFixed(8)
                  )
                )}</span>
              )
            )
          )}
        </span>
      </div>
      <div className="coin-tile__change">{props.coin.changePctDay && <span>{props.coin.changePctDay.toFixed(2)}%</span>}</div>
      <div className="coin-tile__cap">{props.coin.mktCap && <span>{(props.coin.mktCap / 1000000000).toFixed(1)}B</span>}</div>
      <div className="coin-tile__favorite"><FaRegStar size="2.2rem" /></div>
    </Link>
  )
}

export default CoinTile