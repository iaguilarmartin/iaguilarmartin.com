import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router';

import { scrollToTop } from '../../libs/scroll';
import { formatURLFromLocation } from '../../libs/url-utils';

import routes, { defaultRoute } from './router-config';

class AppRouter extends Component {
  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(() => {
      scrollToTop(false);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { languages, currentLanguage } = this.props;

    return (
      <Switch>
        <Redirect exact from="/" to={defaultRoute.path} />
        {languages.map(({ code }) => (
          <Route
            key={code}
            path={`/${code}`}
            render={({ location }) => {
              if (code !== currentLanguage) {
                window.location.replace(
                  formatURLFromLocation({
                    ...location,
                    pathname: location.pathname.replace(
                      `/${code}/`,
                      `/${currentLanguage}/`
                    )
                  })
                );
              }

              return null;
            }}
          />
        ))}
        {routes.map(({ name, component, path, exact }) => (
          <Route key={name} path={path} exact={exact} component={component} />
        ))}
        <Route
          render={({ location }) => {
            const legacyURL = `http://iaguilarmartin.com${location.pathname}${
              location.hash
            }${location.search}`;
            window.location = legacyURL;
            return null;
          }}
        />
      </Switch>
    );
  }
}

AppRouter.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired
  }).isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  currentLanguage: PropTypes.string.isRequired
};

export default withRouter(AppRouter);
