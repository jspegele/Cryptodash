import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DashboardPage from '../components/DashboardPage'
import CoinIndexPage from '../components/CoinIndexPage'
import SettingsPage from '../components/SettingsPage'
import CoinPage from '../components/CoinPage'

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Header />
    <Switch>
      <Route path="/" component={DashboardPage} exact={true} />
      <Route path="/coins" component={CoinIndexPage} />
      <Route path="/coin/:symbol" component={CoinPage} />
      <Route path="/settings" component={SettingsPage} />
    </Switch>
    <Footer />
  </Router>
);

export default AppRouter;
