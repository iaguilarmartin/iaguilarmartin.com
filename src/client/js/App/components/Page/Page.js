import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { mediaQueries } from 'ui/shared/breakpoints';

const PageWrapper = styled.main`
  height: 100%;
  background-color: rgba(50, 51, 50, 0.6);
  border-radius: 4px;

  ${mediaQueries.xl(css`
    max-height: 812px;
  `)}
`;

const Page = ({ children }) => <PageWrapper>{children}</PageWrapper>;

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

export default Page;
