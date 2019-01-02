import { css } from '@emotion/core';

export const animatedHover = color => css`
  transition: color 0.25s ease-out, opacity 0.25s ease-out,
    background-color 0.25s ease-out, box-shadow 0.25s ease-out,
    fill 0.25s ease-out, text-shadow 0.25s ease-out,
    -webkit-box-shadow 0.25s ease-out;

  &:hover {
    color: ${color};
    fill: ${color};
  }
`;

export const square = size => css`
  height: ${size};
  width: ${size};
`;
