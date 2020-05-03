import React from 'react';
import styled from 'styled-components'
import { Tile } from './Tile'
import DashContext from '../context/dash-context'
import CoinImage from './CoinImage'

const SpotlightName = styled.h2`
  text-align: center;
`

const CoinSpotlight = () => (
  <DashContext.Consumer>
    {({ currentFavorite, coinList }) => (
      <Tile>
        <SpotlightName>{coinList[currentFavorite].CoinName}</SpotlightName>
        <CoinImage spotlight coin={coinList[currentFavorite]} />
      </Tile>
    )}
  </DashContext.Consumer>
)

export { CoinSpotlight as default}