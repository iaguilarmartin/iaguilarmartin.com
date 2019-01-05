import Cookies from 'js-cookie';

/* eslint-disable global-require */
export const languages = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'es',
    name: 'Español'
  }
];

const translations = languages.reduce((result, { code }) => {
  // eslint-disable-next-line import/no-dynamic-require, no-param-reassign
  result[code] = require(`./languages/${code}.json`);
  return result;
}, {});

const LANGUAGE_COOKIE_NAME = 'currentLanguage';
const DEFAULT_LANGUAGE = 'en';

export const getCurrentLanguage = () =>
  Cookies.get(LANGUAGE_COOKIE_NAME) || DEFAULT_LANGUAGE;

export const setCurrentLanguage = language =>
  Cookies.set(LANGUAGE_COOKIE_NAME, language);

const getTranslation = (textKey, language) =>
  translations[language] && translations[language][textKey];

export const translate = (textKey, language) => {
  const lang = language || getCurrentLanguage();
  return (
    getTranslation(textKey, lang) ||
    getTranslation(textKey, DEFAULT_LANGUAGE) ||
    textKey
  );
};
