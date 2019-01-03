import React from 'react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import globalStyles from 'ui/shared/global';
import theme from 'ui/shared/theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <div>
      <h1>Hola mundo!</h1>
    </div>
  </ThemeProvider>
);

export default App;
