import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
