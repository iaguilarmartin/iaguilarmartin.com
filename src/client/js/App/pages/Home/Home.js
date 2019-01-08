import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { mediaQueries } from 'ui/shared/breakpoints';
import { space } from 'ui/shared/spacing';
import colors from 'ui/shared/colors';
import fonts from 'ui/shared/fonts';
import DotsList from 'ui/components/DotsList';

import Page from '../../components/Page';
import Subtitle from '../../components/Subtitle';
import Stringify, { side } from '../../components/Stringify';

import HomeLogo from './components/HomeLogo';

const HomePage = styled(Page)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  text-align: center;
  margin-bottom: ${space.x2};
`;

const Title = styled.span`
  font-family: ${fonts.ArchitectsDaughter};
  font-size: ${fonts.sizes.xl};

  ${mediaQueries.md(css`
    font-size: ${fonts.sizes.xxxl};
  `)}

  ${mediaQueries.xl(css`
    font-size: ${fonts.sizes.xxxxl};
  `)}
`;

const Highlight = styled.span`
  color: ${colors.beige};
`;

const specialities = [
  {
    id: 1,
    name: 'Front-End'
  },
  {
    id: 2,
    name: 'NodeJS'
  },
  {
    id: 3,
    name: 'Mobile'
  }
];

const renderSpeciality = item => <span>{item.name}</span>;

const Home = () => {
  return (
    <HomePage hideBackground>
      <HomeLogo />
      <H1>
        <Stringify sides={side.START}>
          <Title>
            Welcome!, I’m <Highlight>Ivan</Highlight>
          </Title>
        </Stringify>
        <Stringify sides={side.END}>
          <Title>I’m a full-stack developer</Title>
        </Stringify>
      </H1>
      <Subtitle>
        <DotsList
          items={specialities}
          renderItem={renderSpeciality}
          dotSize={7}
        />
      </Subtitle>
    </HomePage>
  );
};

export default Home;
