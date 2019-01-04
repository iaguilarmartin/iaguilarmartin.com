import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import routes, { defaultRoute } from './router-config';

const AppRouter = () => (
  <Switch>
    <Redirect exact from="/" to={defaultRoute.path} />
    {routes.map(({ name, component, path }) => (
      <Route key={name} path={path} component={component} />
    ))}
  </Switch>
);

export default AppRouter;
