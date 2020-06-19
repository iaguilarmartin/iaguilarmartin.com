import Cookies from 'js-cookie';

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
  // eslint-disable-next-line import/no-dynamic-require, no-param-reassign, global-require
  result[code] = require(`./languages/${code}.json`);
  return result;
}, {});

const LANGUAGE_COOKIE_NAME = 'currentLanguage';
export const DEFAULT_LANGUAGE = 'en';

export const getCurrentLanguage = () =>
  Cookies.get(LANGUAGE_COOKIE_NAME) || DEFAULT_LANGUAGE;

export const setCurrentLanguage = language =>
  Cookies.set(LANGUAGE_COOKIE_NAME, language);

const getTranslation = (textKey, language) =>
  translations[language] && translations[language][textKey];

export const translateInto = (textKey, language, ...params) => {
  const lang = language || getCurrentLanguage();
  let translatedText =
    getTranslation(textKey, lang) ||
    getTranslation(textKey, DEFAULT_LANGUAGE) ||
    textKey;

  params.forEach((param, index) => {
    translatedText = translatedText.replace(`{${index}}`, param);
  });

  return translatedText;
};

export const translate = (textKey, ...params) =>
  translateInto(textKey, null, ...params);
