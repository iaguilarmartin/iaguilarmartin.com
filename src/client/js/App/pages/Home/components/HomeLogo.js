import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Image from 'ui/components/Image';
import { mediaQueries, breakpoints } from 'ui/shared/breakpoints';
import { space } from 'ui/shared/spacing';

import desktopLogo from '../images/logo-desktop.png';
import desktopLogo2x from '../images/logo-desktop@2x.png';
import desktopLogo3x from '../images/logo-desktop@3x.png';

import tabletLogo from '../images/logo-tablet.png';
import tabletLogo2x from '../images/logo-tablet@2x.png';
import tabletLogo3x from '../images/logo-tablet@3x.png';

import mobileLogo from '../images/logo-mobile.png';
import mobileLogo2x from '../images/logo-mobile@2x.png';
import mobileLogo3x from '../images/logo-mobile@3x.png';

const Logo = styled(Image)`
  margin-bottom: ${space.x3};
  height: 84px;
  width: 243px;

  ${mediaQueries.md(css`
    margin-bottom: ${space.x6};
    height: 129px;
    width: 377px;
  `)};

  ${mediaQueries.lg(css`
    margin-bottom: ${space.x8};
    height: 169px;
    width: 492px;
  `)};
`;

const HomeLogo = () => (
  <Logo
    alt=""
    src={[
      {
        srcSet: {
          x1: mobileLogo,
          x2: mobileLogo2x,
          x3: mobileLogo3x
        }
      },
      {
        mediaQuery: breakpoints.md,
        srcSet: {
          x1: tabletLogo,
          x2: tabletLogo2x,
          x3: tabletLogo3x
        }
      },
      {
        mediaQuery: breakpoints.lg,
        srcSet: {
          x1: desktopLogo,
          x2: desktopLogo2x,
          x3: desktopLogo3x
        }
      }
    ]}
  />
);

export default HomeLogo;
