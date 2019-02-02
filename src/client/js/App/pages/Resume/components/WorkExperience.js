import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { mediaQueries, breakpoints } from 'ui/shared/breakpoints';
import { space } from 'ui/shared/spacing';
import Image from 'ui/components/Image';
import TextButton from 'ui/components/TextButton';

import withLink from '../../../components/withLink';
import { getRoutePath } from '../../../components/Router';
import { translate } from '../../../i18n';

import timeline from './images/work-experience.svg';
import timelineLandscape from './images/work-experience-landscape.svg';
import sahLogo from './images/sah-logo.svg';
import minsaitLogo from './images/logo-minsait.png';
import minsaitLogo2x from './images/logo-minsait@2x.png';
import minsaitLogo3x from './images/logo-minsait@3x.png';
import eptisaLogo from './images/eptisa-logo.png';
import eptisaLogo2x from './images/eptisa-logo@2x.png';
import eptisaLogo3x from './images/eptisa-logo@3x.png';
import iamLogo from './images/iaguilarmartin-logo.png';
import iamLogo2x from './images/iaguilarmartin-logo@2x.png';
import iamLogo3x from './images/iaguilarmartin-logo@3x.png';

const Container = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: ${space.x2};
  overflow: hidden;

  ${mediaQueries.md(css`
    overflow: inherit;
    margin-top: 7rem;
    margin-bottom: 9.6rem;
  `)}

  ${mediaQueries.xl(css`
    margin-top: 0;
    margin-right: 10.4rem;
  `)}
`;

const SAHLogoImage = styled(Image)`
  position: absolute;
  bottom: 48px;
  transform: scale(0.65) translate(-${space.x3});

  ${mediaQueries.md(css`
    transform: scale(0.9) translate(-11.5rem, -5.5rem);
  `)}

  ${mediaQueries.xl(css`
    transform: none;
  `)}
`;

const IAMLogoImage = styled(Image)`
  position: absolute;
  bottom: 184px;
  width: 79px;
  height: 68px;
  transform: scale(0.9) translate(-9.4rem);

  ${mediaQueries.md(css`
    transform: translate(29rem, 26rem);
  `)}

  ${mediaQueries.xl(css`
    transform: none;
  `)}
`;

const MinsaitLogoImage = styled(Image)`
  position: absolute;
  bottom: 84px;
  width: 64px;
  height: 22px;
  transform: scale(0.9) translate(0.4rem);

  ${mediaQueries.md(css`
    transform: translate(-17.8rem, -1.2rem);
  `)}

  ${mediaQueries.xl(css`
    transform: none;
  `)}
`;

const EptisaLogoImage = styled(Image)`
  position: absolute;
  top: 20px;
  height: 41px;
  width: 104px;
  transform: scale(0.8) translate(-0.4rem);

  ${mediaQueries.md(css`
    transform: translate(-45rem, -7rem);
  `)}

  ${mediaQueries.xl(css`
    transform: none;
  `)}
`;

const TimelineImage = styled(Image)`
  ${mediaQueries.xl(css`
    margin: 0 1.4rem 0 9rem;
  `)}
`;

const LinkButton = withLink(TextButton);

const WorkExperience = () => (
  <Container>
    <LinkButton url={getRoutePath('experience', { experienceId: 'freelance' })}>
      <IAMLogoImage
        src={{
          x1: iamLogo,
          x2: iamLogo2x,
          x3: iamLogo3x
        }}
        alt={translate('resume_experience_iam_logo_alt')}
      />
    </LinkButton>
    <TimelineImage
      src={[
        {
          srcSet: timeline
        },
        {
          srcSet: timeline,
          mediaQuery: breakpoints.xl
        },
        {
          srcSet: timelineLandscape,
          mediaQuery: breakpoints.md
        }
      ]}
      alt={translate('resume_experience_timeline_alt')}
    />
    <LinkButton url={getRoutePath('experience', { experienceId: 'spotahome' })}>
      <SAHLogoImage
        src={sahLogo}
        alt={translate('resume_experience_sah_logo_alt')}
      />
    </LinkButton>
    <LinkButton url={getRoutePath('experience', { experienceId: 'minsait' })}>
      <MinsaitLogoImage
        src={{
          x1: minsaitLogo,
          x2: minsaitLogo2x,
          x3: minsaitLogo3x
        }}
        alt={translate('resume_experience_minsait_logo_alt')}
      />
    </LinkButton>
    <LinkButton url={getRoutePath('experience', { experienceId: 'eptisa' })}>
      <EptisaLogoImage
        src={{
          x1: eptisaLogo,
          x2: eptisaLogo2x,
          x3: eptisaLogo3x
        }}
        alt={translate('resume_experience_eptisa_logo_alt')}
      />
    </LinkButton>
  </Container>
);

export default WorkExperience;
