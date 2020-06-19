import { format as dfnsFormat } from 'date-fns';
import es from 'date-fns/locale/es';
import en from 'date-fns/locale/en';

function getLocaleFromLanguage(language) {
  switch (language) {
    case 'es':
      return { locale: es };
    case 'en':
      return { locale: en };
    default:
      return undefined;
  }
}

// eslint-disable-next-line import/prefer-default-export
export function format(date, dateFormat, language) {
  const locale = getLocaleFromLanguage(language);
  return dfnsFormat(date, dateFormat, locale);
}
