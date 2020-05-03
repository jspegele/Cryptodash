import React from 'react'
import styled from 'styled-components'
import Page from './Page'
import PriceGrid from './PriceGrid'
import CoinSpotlight from './CoinSpotlight'
import PriceChart from './PriceChart'

const ChartGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
  margin-top: 20px;
`

const DashboardPage = () => {
  return (
    <Page name="dashboard">
      <PriceGrid/>
      <ChartGrid>
        <CoinSpotlight />
        <PriceChart />
      </ChartGrid>
    </Page>
  )
}

export { DashboardPage as default }