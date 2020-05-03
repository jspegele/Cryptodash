import React from 'react'
import styled from 'styled-components'
import DashContext from '../context/dash-context'
import PriceTile from './PriceTile'

const PriceGridStyled = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 40px;
`

const PriceGrid = () => {
  return (
    <DashContext.Consumer>
      {({ prices }) => (
        <PriceGridStyled>
          {prices.map((price, index) => (
            <PriceTile key={Object.keys(price)[0]} index={index} price={price} />
          ))}
        </PriceGridStyled>
      )}
    </DashContext.Consumer>
  )
}

export { PriceGrid as default }