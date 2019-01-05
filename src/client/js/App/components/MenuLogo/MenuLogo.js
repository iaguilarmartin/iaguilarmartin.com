import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Image from 'ui/components/Image';
import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';

import logoImage from './images/i-logo.png';
import logoImage2x from './images/i-logo@2x.png';
import logoImage3x from './images/i-logo@3x.png';
import fullLogoImage from './images/logo-vertical.png';
import fullLogoImage2x from './images/logo-vertical@2x.png';
import fullLogoImage3x from './images/logo-vertical@3x.png';

const StyledImage = styled(Image)`
  margin: ${space.x05};
  height: 107px;
  width: 123px;

  ${({ isMenuExpanded }) => css`
    ${mediaQueries.md(`
      height: ${isMenuExpanded ? '71px' : '64px'};
      width: ${isMenuExpanded ? '80px' : '18px'};
    `)};
  `}
`;

const MenuLogo = ({ isMenuExpanded }) => (
  <StyledImage
    alt=""
    isMenuExpanded={isMenuExpanded}
    src={isMenuExpanded ? fullLogoImage : logoImage}
    src2x={isMenuExpanded ? fullLogoImage2x : logoImage2x}
    src3x={isMenuExpanded ? fullLogoImage3x : logoImage3x}
  />
);

MenuLogo.defaultProps = {
  isMenuExpanded: false
};

MenuLogo.propTypes = {
  isMenuExpanded: PropTypes.bool
};

export default MenuLogo;
