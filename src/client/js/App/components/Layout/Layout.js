import React from 'react';
import styled from '@emotion/styled';

import backgroundImage from './background.svg';

const LayoutWrapper = styled.div`
  background: url('${backgroundImage}');
  background-size: cover;
  height: 100%;
  margin-left: ${({ theme }) => theme.menuWidth};
`;

const Layout = ({ children }) => <LayoutWrapper>{children}</LayoutWrapper>;

export default Layout;
