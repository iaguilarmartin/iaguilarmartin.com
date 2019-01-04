import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';

import App from './App';

const history = createBrowserHistory();

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;
