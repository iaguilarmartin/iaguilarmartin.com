import { css } from '@emotion/core';

import normalize from './normalize';
import fonts from './fonts';
import colors from './colors';

export default css`
  ${normalize};
  ${fonts.faces};

  html {
    box-sizing: border-box;
    font-size: ${fonts.sizes.base};
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
    font-family: ${fonts.ArchitectsDaughter};
    font-size: ${fonts.sizes.m};
    color: ${colors.white};
    fill: ${colors.white};
    background-color: ${colors.greyBg};
  }

  p {
    margin: 0;
  }
`;
