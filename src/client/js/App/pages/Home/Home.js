import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { mediaQueries, breakpoints } from 'ui/shared/breakpoints';
import { space } from 'ui/shared/spacing';

import Page from '../../components/Page';

import HomeLogo from './components/HomeLogo';

const HomePage = styled(Page)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home = () => (
  <HomePage hideBackground>
    <HomeLogo />
    <h1>Home</h1>
  </HomePage>
);

export default Home;
