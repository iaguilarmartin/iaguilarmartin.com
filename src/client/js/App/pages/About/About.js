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
    <PageTitle>About me</PageTitle>
    <Photo />
    <Description>
      <p>
        Hello!, My name is Ivan, I’m a Senior Front-End Developer but I have
        also experience building native mobile applications and Back-end
        solutions using NodeJS.
      </p>
      <p>
        I was born in Bilbao (Spain) 34 years ago and lived there my whole life,
        but in February 2019 I moved to New York looking for new challenges.
      </p>
      <p>
        I completed my Computer Engineering Bachelor’s degree at Deusto
        University. I spent 9 years working for an IT company sited in Madrid
        and I was involved in awesome projects for big Spanish corporations like
        Movistar, Euskaltel or Canal de Isabel II. Over time I lost my
        motivation, so I decided to quit my job and started working exclusively
        as a Freelance. During my last job in Spain I was working remotely for a
        startup called Spotahome. There I enhance my career as a developer
        learning many new things and working within a super talented team.
      </p>
      <p>
        In addition to my work, I love being up to date with the latest
        technologies, traveling all over the world and, of course, I love
        spending time with my family.
      </p>
      <ButtonContainer>
        <Button url={getRoutePath('contact')}>Contact me</Button>
      </ButtonContainer>
    </Description>
  </AboutPage>
);

export default About;
