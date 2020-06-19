import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { withRouter } from 'react-router';

import globalStyles from 'ui/shared/global';
import theme from 'ui/shared/theme';
import Menu from 'ui/components/Menu';

import { languages, setCurrentLanguage } from './i18n';
import Layout from './components/Layout';
import MenuLogo from './components/MenuLogo';
import Router, { routes } from './components/Router';
import LanguageSelector from './components/LanguageSelector';
import languageContext from './i18n/language-context';
import { formatURLFromLocation } from './libs/url-utils';

const handleSelectLanguage = (language, location) => {
  setCurrentLanguage(language);
  window.location.replace(formatURLFromLocation(location, language));
};

const menuRoutes = routes.filter(route => route.inMenu);

const App = ({ language, location }) => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <languageContext.Provider value={{ language }}>
      <Layout>
        <Menu
          routes={menuRoutes}
          renderLogo={isMenuExpanded => (
            <MenuLogo isMenuExpanded={isMenuExpanded} />
          )}
        />
        <LanguageSelector
          languages={languages}
          onSelectLanguage={lang => handleSelectLanguage(lang, location)}
        />
        <Router languages={languages} currentLanguage={language} />
      </Layout>
    </languageContext.Provider>
  </ThemeProvider>
);

App.propTypes = {
  language: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    hash: PropTypes.string,
    search: PropTypes.string
  }).isRequired
};

export default withRouter(App);
