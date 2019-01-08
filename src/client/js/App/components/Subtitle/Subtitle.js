import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { mediaQueries } from 'ui/shared/breakpoints';
import fonts from 'ui/shared/fonts';
import colors from 'ui/shared/colors';

const H2 = styled.h2`
  font-size: ${fonts.sizes.s};
  color: ${colors.greyLight};
  font-family: ${fonts.Obli};

  ${mediaQueries.md(css`
    font-size: ${fonts.sizes.l};
  `)}

  ${mediaQueries.xl(css`
    font-size: ${fonts.sizes.xxl};
  `)}
`;

const Subtitle = ({ children, className }) => (
  <H2 className={className}>
    {'// '}
    {children}
  </H2>
);

Subtitle.defaultProps = {
  className: null
};

Subtitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  className: PropTypes.string
};

export default Subtitle;
