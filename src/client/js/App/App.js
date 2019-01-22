import React from 'react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import globalStyles from 'ui/shared/global';
import theme from 'ui/shared/theme';
import Menu from 'ui/components/Menu';

import { languages, getCurrentLanguage, setCurrentLanguage } from './i18n';
import Layout from './components/Layout';
import MenuLogo from './components/MenuLogo';
import Router, { routes } from './components/Router';
import LanguageSelector from './components/LanguageSelector';
import languageContext from './i18n/language-context';

const handleSelectLanguage = language => {
  setCurrentLanguage(language);
  window.location.reload();
};

const menuRoutes = routes.filter(route => route.inMenu);

const App = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <languageContext.Provider value={{ language: getCurrentLanguage() }}>
      <Layout>
        <Menu
          routes={menuRoutes}
          renderLogo={isMenuExpanded => (
            <MenuLogo isMenuExpanded={isMenuExpanded} />
          )}
        />
        <LanguageSelector
          languages={languages}
          onSelectLanguage={handleSelectLanguage}
        />
        <Router />
      </Layout>
    </languageContext.Provider>
  </ThemeProvider>
);

export default App;
