import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Image from 'ui/components/Image';
import { space } from 'ui/shared/spacing';
import { mediaQueries, breakpoints } from 'ui/shared/breakpoints';

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

  ${({ isMenuExpanded }) =>
    mediaQueries.md(css`
      height: ${isMenuExpanded ? '71px' : '64px'};
      width: ${isMenuExpanded ? '80px' : '18px'};
    `)};
`;

const MenuLogo = ({ isMenuExpanded }) => (
  <picture>
    <source
      media={`(min-width: ${breakpoints.md}px)`}
      srcSet={`
        ${isMenuExpanded ? fullLogoImage : logoImage},
        ${isMenuExpanded ? fullLogoImage2x : logoImage2x} 2x,
        ${isMenuExpanded ? fullLogoImage3x : logoImage3x} 3x
      `}
    />
    <StyledImage
      alt=""
      isMenuExpanded={isMenuExpanded}
      src={fullLogoImage}
      src2x={fullLogoImage2x}
      src3x={fullLogoImage3x}
    />
  </picture>
);

MenuLogo.defaultProps = {
  isMenuExpanded: false
};

MenuLogo.propTypes = {
  isMenuExpanded: PropTypes.bool
};

export default MenuLogo;
