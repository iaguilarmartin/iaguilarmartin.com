import { css } from '@emotion/core';

import normalize from './normalize';
import defaultTheme from './theme';

export const getThemeValue = (theme, property) =>
  (theme && theme[property]) || defaultTheme[property];

export default ({ theme }) => css`
  ${normalize};
  ${getThemeValue(theme, 'fontFaces')};

  html {
    box-sizing: border-box;
    font-size: ${getThemeValue(theme, 'fontBase')};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    font-family: ${getThemeValue(theme, 'fontFamily')};
    font-size: ${getThemeValue(theme, 'fontSize')};
    color: ${getThemeValue(theme, 'fontColor')};
    fill: ${getThemeValue(theme, 'fontColor')};
    background-color: ${getThemeValue(theme, 'backgroundColor')};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul {
    margin: 0;
    padding: 0;
  }
`;
