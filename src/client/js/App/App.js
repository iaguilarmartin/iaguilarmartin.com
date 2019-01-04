import React from 'react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import globalStyles from 'ui/shared/global';
import theme from 'ui/shared/theme';
import Menu from 'ui/components/Menu';

import Layout from './components/Layout';
import MenuLogo from './components/MenuLogo';
import Router, { routes } from './components/Router';

const App = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <Layout>
      <Menu
        routes={routes}
        renderLogo={isMenuExpanded => (
          <MenuLogo isMenuExpanded={isMenuExpanded} />
        )}
      />
      <Router />
    </Layout>
  </ThemeProvider>
);

export default App;
