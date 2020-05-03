import React from 'react'
import { FaRegStar } from 'react-icons/fa'

const CoinTile = ({ index, sortOrder, symbol, name, price, changeDay, changePctDay, mktCap, imgUrl }) => {
  return (
    <div className="coin-tile">
      <div className="coin-tile__order text-center">{index + 1}</div>
      <div className="coin-tile__name"><img src={imgUrl} alt="coin logo" />{name}<span className="coin-tile__symbol">{symbol}</span></div>
      <div className="coin-tile__price"><span>$</span><span>{price.toFixed(2)}</span></div>
      <div className="coin-tile__change">{changePctDay.toFixed(2)}%</div>
      <div className="coin-tile__cap">{(mktCap / 1000000000).toFixed(1)}B</div>
      <div className="coin-tile__favorite"><FaRegStar size="2.2rem" /></div>
    </div>
  )
}

export default CoinTile