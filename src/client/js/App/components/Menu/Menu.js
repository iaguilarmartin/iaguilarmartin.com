import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const MenuWrapper = styled.section`
  ${({ theme }) => css`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${theme.menuWidth};
    background-color: ${theme.menuBgColor};
  `}
`;

const Menu = () => <MenuWrapper />;

export default Menu;
