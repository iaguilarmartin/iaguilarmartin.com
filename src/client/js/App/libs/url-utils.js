import queryString from 'query-string';

import { scrollToTop } from 'src/client/js/App/libs/scroll';

export function getQueryParamValue(location, param) {
  return queryString.parse(location.search)[param];
}

export function reload(location, history, params) {
  const query = {
    ...queryString.parse(location.search),
    ...params
  };
  history.push(`${location.pathname}?${queryString.stringify(query)}`);
  scrollToTop();
}

const equivalentLanguagePaths = [
  {
    en: '/receiptprinter',
    es: '/receiptprinter-es'
  }
];

export function formatURLFromLocation(location, language) {
  const base = language ? `/${language}` : '';
  const equivalentPath = equivalentLanguagePaths.find(equivalentLanguagePath =>
    Object.keys(equivalentLanguagePath).some(
      lang =>
        lang !== language && equivalentLanguagePath[lang] === location.pathname
    )
  );
  const pathname = equivalentPath
    ? equivalentPath[language]
    : location.pathname;
  return `${base}${pathname}${location.hash}${location.search}`;
}
