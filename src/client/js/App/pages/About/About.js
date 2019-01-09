import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';

const AboutPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const About = () => (
  <AboutPage>
    <PageTitle>About me</PageTitle>
  </AboutPage>
);

export default About;
