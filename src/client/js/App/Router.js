import React from 'react';
import { Router, Switch, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './Home';

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
);

export default AppRouter;
