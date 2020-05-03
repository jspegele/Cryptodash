import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import CoinIndexPage from '../components/CoinIndexPage'
import SettingsPage from '../components/SettingsPage'
import Header from '../components/Header'

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Header />
    <Switch>
      <Route path="/" component={CoinIndexPage} exact={true} />
      <Route path="/settings" component={SettingsPage} />
    </Switch>
  </Router>
);

export default AppRouter;
