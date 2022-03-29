import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { mediaQueries } from 'ui/shared/breakpoints';
import { space } from 'ui/shared/spacing';

const PageWrapper = styled.main`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 4px;
  padding: ${space.x25} ${space.x15};
  position: relative;
  flex-grow: 1;

  ${mediaQueries.md(css`
    padding: ${space.x4} ${space.x3};
  `)}

  ${mediaQueries.xl(css`
    padding: ${space.x4} ${space.x5};
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
