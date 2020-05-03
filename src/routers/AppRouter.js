import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Header from '../components/Header'
import CoinIndexPage from '../components/CoinIndexPage'
import SettingsPage from '../components/SettingsPage'
import CoinPage from '../components/CoinPage'

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Header />
    <Switch>
      <Route path="/" component={CoinIndexPage} exact={true} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/coin/:id" component={CoinPage} />
    </Switch>
  </Router>
);

export default AppRouter;
