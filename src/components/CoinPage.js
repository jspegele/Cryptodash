import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegStar } from 'react-icons/fa'

const CoinPage = (props) => {
  return (
    <div className="coin-details">
      <div>{props.match.params.id}</div>
    </div>
  )
}

export default CoinPage