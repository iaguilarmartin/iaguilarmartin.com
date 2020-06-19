import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';

import backgroundImage from './background.svg';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url('${backgroundImage}');
  background-size: cover;
  min-height: 100vh;
  padding: ${space.x7} ${space.x1} ${space.x2};

  ${({ theme }) =>
    mediaQueries.md(css`
      margin-left: ${theme.menuWidth};
      padding: ${space.x8} ${space.x3} ${space.x3};
    `)}
`;

const Layout = ({ children }) => <LayoutWrapper>{children}</LayoutWrapper>;

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

export default Layout;
