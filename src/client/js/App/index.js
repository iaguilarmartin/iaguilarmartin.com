import React from 'react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import globalStyles from 'ui/shared/global';
import theme from 'ui/shared/theme';

import Layout from './components/Layout';
import Menu from './components/Menu';
import Home from './Home';

const App = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <Layout>
      <Menu />
      <Home />
    </Layout>
  </ThemeProvider>
);

export default App;
