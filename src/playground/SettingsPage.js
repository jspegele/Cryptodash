import React from 'react'
import Welcome from './Welcome'
import ConfirmButton from './ConfirmButton'
import Page from './Page'
import CoinGrid from './CoinGrid'
import Search from './Search'

const SettingsPage = () => {
  return (
    <Page name="settings">
      <Welcome />
      <CoinGrid topSection />
      <ConfirmButton />
      <Search />
      <CoinGrid />
    </Page>
  )
}

export { SettingsPage as default }