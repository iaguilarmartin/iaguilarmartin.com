import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { mediaQueries } from 'ui/shared/breakpoints';
import { space } from 'ui/shared/spacing';
import colors from 'ui/shared/colors';
import fonts from 'ui/shared/fonts';
import DotsList from 'ui/components/DotsList';
import Button from 'ui/components/Button';

import Page from '../../components/Page';
import Subtitle from '../../components/Subtitle';
import Stringify, { side } from '../../components/Stringify';
import { getRoutePath } from '../../components/Router';
import { translate } from '../../i18n';
import withLink from '../../components/withLink';

import HomeLogo from './components/HomeLogo';

const HomePage = styled(Page)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const StyledStringify = styled(Stringify)`
  display: block;
`;

const H1 = styled.h1`
  text-align: center;
  margin-bottom: ${space.x2};
`;

const Title = styled.span`
  font-family: ${fonts.ArchitectsDaughter};
  font-size: ${fonts.sizes.l};

  ${mediaQueries.md(css`
    font-size: ${fonts.sizes.xxxl};
  `)}

  ${mediaQueries.lg(css`
    font-size: ${fonts.sizes.xxxxl};
  `)}
`;

const Highlight = styled.span`
  color: ${colors.beige};
`;

const StyledButton = styled(Button)`
  margin-top: ${space.x5};

  ${mediaQueries.md(css`
    margin-top: ${space.x9};
  `)}
`;

const SpecialitiesList = styled(DotsList)`
  display: inline-flex;
`;

const specialities = [
  {
    id: 1,
    name: translate('home_subtitle_frontend_text')
  },
  {
    id: 2,
    name: translate('home_subtitle_node_text')
  },
  {
    id: 3,
    name: translate('home_subtitle_mobile_text')
  }
];

const renderSpeciality = item => <span>{item.name}</span>;

const ViewMoreButton = withLink(StyledButton);

const Home = () => (
  <HomePage hideBackground>
    <HomeLogo />
    <H1>
      <StyledStringify sides={side.START}>
        <Title>
          {translate('home_title_welcome_text')} <Highlight>Ivan</Highlight>
        </Title>
      </StyledStringify>
      <StyledStringify sides={side.END}>
        <Title>{translate('home_title_developer_text')}</Title>
      </StyledStringify>
    </H1>
    <Subtitle>
      <SpecialitiesList
        keyProperty="id"
        items={specialities}
        renderItem={renderSpeciality}
      />
    </Subtitle>
    <ViewMoreButton url={getRoutePath('about')}>
      {translate('home_button_text')}
    </ViewMoreButton>
  </HomePage>
);

export default Home;
