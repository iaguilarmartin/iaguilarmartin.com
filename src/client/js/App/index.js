import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { getCurrentLanguage } from './i18n';
import App from './App';

const AppWithRouter = () => {
  const language = getCurrentLanguage();

  return (
    <BrowserRouter basename={language}>
      <App language={language} />
    </BrowserRouter>
  );
};

export default AppWithRouter;
