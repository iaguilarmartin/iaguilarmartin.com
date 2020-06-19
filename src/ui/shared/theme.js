import colors from './colors';
import fonts from './fonts';

const defaultTheme = {
  fontBase: fonts.sizes.base,
  fontSize: fonts.sizes.m,
  fontFamily: fonts.ArchitectsDaughter,
  fontColor: colors.white,
  fontFaces: fonts.faces,
  backgroundColor: colors.greyBg,
  primaryColor: colors.gold,
  secondaryColor: colors.blueLight,
  disabledColor: colors.greyBgLines,
  menuBgColor: colors.blackMenu,
  menuIconColor: colors.greyLight,
  menuWidth: '60px',
  articlesTitleColor: colors.beige,
  articlesTitleFontFamily: fonts.ArchivoBlack
};

export const themed = Object.keys(defaultTheme).reduce((result, property) => {
  // eslint-disable-next-line no-param-reassign
  result[property] = ({ theme }) =>
    (theme && theme[property]) || defaultTheme[property];

  return result;
}, {});

export default defaultTheme;
