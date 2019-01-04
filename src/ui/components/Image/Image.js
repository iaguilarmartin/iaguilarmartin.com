import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const formatSrcset = (x2, x3) => {
  if (!x2 && !x3) return undefined;

  const srcsets = [];
  if (x2) {
    srcsets.push(`${x2} 2x`);
  }

  if (x3) {
    srcsets.push(`${x3} 3x`);
  }

  return srcsets.join(', ');
};

const Img = styled.img`
  ${({ height, width }) => css`
    height: ${height};
    width: ${width};
  `}
`;

const Image = ({ src, alt, height, width, src2x, src3x, className }) => (
  <Img
    height={height}
    width={width}
    src={src}
    alt={alt}
    srcSet={formatSrcset(src2x, src3x)}
    className={className}
  />
);

Image.defaultProps = {
  height: 'auto',
  width: 'auto',
  src2x: null,
  src3x: null,
  className: null
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  src2x: PropTypes.string,
  src3x: PropTypes.string,
  className: PropTypes.string
};

export default Image;
