import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { mediaQueries } from 'ui/shared/breakpoints';

const PageWrapper = styled.main`
  height: 100%;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 4px;

  ${mediaQueries.xl(css`
    max-height: 812px;
  `)}
`;

const Page = ({ children, hideBackground, className }) => (
  <PageWrapper
    className={className}
    bgColor={hideBackground ? 'transparent' : 'rgba(50, 51, 50, 0.6)'}
  >
    {children}
  </PageWrapper>
);

Page.defaultProps = {
  hideBackground: false,
  className: null
};

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  hideBackground: PropTypes.bool,
  className: PropTypes.string
};

export default Page;
