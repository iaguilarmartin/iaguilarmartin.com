import { css } from '@emotion/core';

export const ratios = {
  x1: 1,
  x2: 1.25,
  x3: 2.5
};

export const mediaQueries = Object.keys(ratios).reduce((result, ratio) => {
  // eslint-disable-next-line no-param-reassign
  result[ratio] = cls =>
    css`
      @media only screen and (min-device-pixel-ratio: ${ratios[ratio]}),
        only screen and (min-resolution: ${ratios[ratio]}dppx) {
        ${cls};
      }
    `;
  return result;
}, {});
