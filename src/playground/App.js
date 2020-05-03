import React from 'react';
import { AppProvider } from './AppProvider'
import AppBar from './AppBar'
import Content from './Content'
import DashboardPage from './DashboardPage'
import SettingsPage from './SettingsPage'

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <AppProvider>
          <AppBar />
          <Content>
            <DashboardPage />
            <SettingsPage />
          </Content>
        </AppProvider>
      </div>
    )
  }
}

export default App;
