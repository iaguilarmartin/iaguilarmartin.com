import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import fonts from 'ui/shared/fonts';
import { mediaQueries } from 'ui/shared/breakpoints';
import { themed } from 'ui/shared/theme';

import Stringify from '../Stringify';

const Title = styled.h1`
  font-size: ${fonts.sizes.xxl};
  font-family: ${fonts.DisolveLight};
  display: inline-block;
  color: ${themed.secondaryColor};

  ${mediaQueries.md(css`
    font-size: ${fonts.sizes.xxxxl};
  `)}

  ::first-letter {
    color: ${themed.primaryColor};
  }
`;

const PageTitle = ({ children, className }) => (
  <Stringify>
    <Title className={className}>{children}</Title>
  </Stringify>
);

PageTitle.defaultProps = {
  className: null
};

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default PageTitle;
