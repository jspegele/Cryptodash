import React from 'react'
import styled from 'styled-components'
import DashContext from '../context/dash-context'
import CoinTile from './CoinTile'

const CoinGridStyled = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  margin-top: 40px;
`

const CoinGrid = ({ topSection }) => {
  const getCoinsToDisplay = (coinList, topSection, favorites, filterCoins) => (
    topSection ? favorites : getLowerSectionCoins(filterCoins) ||
    Object.keys(coinList).slice(0, 100)
  )
  const getLowerSectionCoins = (filteredCoins) => {
    return (filteredCoins && Object.keys(filteredCoins))
  }
  return (
    <DashContext.Consumer>
      {({ coinList, favorites, filteredCoins }) => (
        <CoinGridStyled>
          { getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map((coinKey) => (
            <CoinTile key={coinKey} coinKey={coinKey} topSection={topSection} />
          )) }
        </CoinGridStyled>
      )}
    </DashContext.Consumer>
  )
}

export { CoinGrid as default, CoinGridStyled }