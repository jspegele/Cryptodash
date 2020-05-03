import React from 'react';
import styled, { css } from 'styled-components'

const CoinImage = styled.img`
  height: 50px;
  ${props => props.spotlight && css`
    display: block;
    height: 200px;
    margin: 0 auto;
  `}
`

export default ({coin, spotlight}) => (
  <CoinImage
  spotlight={spotlight}
    alt={coin.CoinSymbol}
    src={`http://cryptocompare.com/${
      coin.ImageUrl
      }`}
  />
)
