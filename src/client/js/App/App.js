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

const currentLanguage = getCurrentLanguage();

const handleSelectLanguage = language => {
  setCurrentLanguage(language);
  window.location.reload();
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <Layout>
      <Menu
        routes={routes}
        renderLogo={isMenuExpanded => (
          <MenuLogo isMenuExpanded={isMenuExpanded} />
        )}
        renderLogoOnMobile={() => <MenuLogo isMenuExpanded />}
      />
      <LanguageSelector
        languages={languages}
        onSelectLanguage={handleSelectLanguage}
        selectedLanguage={currentLanguage}
      />
      <Router />
    </Layout>
  </ThemeProvider>
);

export default App;
