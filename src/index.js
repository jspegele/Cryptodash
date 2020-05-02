import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DashboardPage from './components/DashboardPage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <DashboardPage />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
