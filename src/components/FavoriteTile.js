import React from 'react'
import { FaBitcoin, FaPlus, FaTrash, FaAngleDoubleRight } from 'react-icons/fa'

const FavoriteTile = (props) => {
  let altText = ''
  let faveClassName = 'fave-tile'

  if (props.tileType === 'dashboard') {
    altText = 'View coin details'
  } else if (props.tileType === 'favorite') {
    altText = 'Remove from Favorites'
    faveClassName += ' fave-tile--remove'
  } else if (props.tileType === 'more') {
    altText = 'Add to Favorites'
    faveClassName += ' fave-tile--add'
  } else if (props.tileType === 'disabled') {
    altText = ''
    faveClassName += ' fave-tile--disabled'
  }

  return (
    <button type="button" className={faveClassName} id={props.coin.symbol} onClick={props.clickEvent} title={altText}>
      <div className="fave-tile__overview">
        <div className="fave-tile__logo">
          {props.coin.imageUrl ? (
            <img src={`http://cryptocompare.com/${props.coin.imageUrl}`} alt="coin logo" />
          ) : (
            <FaBitcoin size="3.2rem" />
          )}
        </div>
        <span className="fave-tile__name">{props.coin.name}</span>
        <span className="fave-tile__symbol">{props.coin.symbol}</span>
      </div>
      {props.tileType === 'favorite' ? (
        <div className="fave-tile__price"><FaTrash size="2rem" /></div>
      ) : (
        props.tileType === 'more' ? (
          <div className="fave-tile__price"><FaPlus size="2rem" /></div>
        ) : (
          <div className="fave-tile__price"><FaAngleDoubleRight size="2rem" /></div>
        )
      )}
    </button>
  )
}

export default FavoriteTile