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

export function formatURLFromLocation(location, language) {
  const base = language ? `/${language}` : '';
  return `${base}${location.pathname}${location.hash}${location.search}`;
}
