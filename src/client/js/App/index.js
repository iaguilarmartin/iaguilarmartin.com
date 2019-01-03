import React from 'react';
import { Global } from '@emotion/core';

import globalStyles from 'ui/shared/global';

const App = () => (
  <>
    <Global styles={globalStyles} />
    <div>
      <h1>Hola mundo!</h1>
    </div>
  </>
);

export default App;
