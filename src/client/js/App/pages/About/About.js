import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import colors from 'ui/shared/colors';
import Button from 'ui/components/Button';

import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import { getRoutePath } from '../../components/Router';
import { translate } from '../../i18n';

import personalPhoto from './images/DSC02987.jpg';

const AboutPage = styled(Page)`
  display: flex;
  flex-direction: column;

  ${mediaQueries.xl(css`
    justify-content: center;
  `)}
`;

const Description = styled.section`
  p {
    line-height: 1.9;
    margin-bottom: ${space.x15};
  }

  ${mediaQueries.xl(css`
    width: 60%;
    margin-top: ${space.x3};
    padding-right: ${space.x7};
  `)}
`;

const Photo = styled.div`
  width: 100%;
  height: 190px;
  box-shadow: 0 2px 4px 0 ${colors.blackMenu};
  background: url(${personalPhoto});
  background-size: cover;
  background-position: center;
  margin: ${space.x3} 0;
  flex-shrink: 0;

  ${mediaQueries.md(css`
    margin: ${space.x4} 0;
    height: 250px;
  `)}

  ${mediaQueries.xl(css`
    width: 40%;
    height: 90%;
    position: absolute;
    right: ${space.x3};
    max-height: 734px;
    margin: 0;
  `)}
`;

const ButtonContainer = styled.div`
  margin: ${space.x3} 0 ${space.x1};
  width: 100%;
  text-align: center;

  ${mediaQueries.md(css`
    margin-top: ${space.x5};
  `)}
`;

const About = () => (
  <AboutPage>
    <PageTitle>{translate('about_header_text')}</PageTitle>
    <Photo />
    <Description>
      <p>{translate('about_paragraph_1_text')}</p>
      <p>{translate('about_paragraph_2_text')}</p>
      <p>{translate('about_paragraph_3_text')}</p>
      <p>{translate('about_paragraph_4_text')}</p>
      <ButtonContainer>
        <Button url={getRoutePath('contact')}>
          {translate('about_contact_button_text')}
        </Button>
      </ButtonContainer>
    </Description>
  </AboutPage>
);

export default About;
