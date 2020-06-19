import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import colors from 'ui/shared/colors';
import fonts from 'ui/shared/fonts';

import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import { translate } from '../../i18n';

import ContactForm from './components/ContactForm';
import SocialLinks from './components/SocialLinks';
import Map from './components/Map';

const ContactPage = styled(Page)`
  display: flex;
  flex-direction: column;

  ${mediaQueries.lg(css`
    @media screen and (orientation: landscape) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  `)}
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;

  ${mediaQueries.lg(css`
    @media screen and (orientation: landscape) {
      width: 45%;
    }
  `)}
`;

const Paragraph = styled.p`
  margin: ${space.x4} 0 ${space.x3};
  line-height: 1.5;

  ${mediaQueries.md(css`
    margin: ${space.x7} 0 ${space.x4};
  `)}
`;

const SectionTitle = styled.h2`
  color: ${colors.greyLight};
  font-family: ${fonts.Obli};
  font-size: ${fonts.sizes.xl};
  margin: ${space.x3} 0 ${space.x2};

  ${mediaQueries.md(css`
    margin: ${space.x4} 0 ${space.x3};
    font-size: 2.4rem;
  `)}

  ${mediaQueries.lg(css`
    @media screen and (orientation: landscape) {
      margin-top: 0;
    }
  `)}
`;

const Location = styled.p`
  margin: ${space.x3} 0 ${space.x2};

  span {
    color: ${colors.beige};
    font-size: ${fonts.sizes.l};
  }

  ${mediaQueries.md(css`
    margin-top: ${space.x5};
  `)}
`;

const Contact = () => (
  <ContactPage>
    <Section>
      <PageTitle>{translate('contact_header_text')}</PageTitle>
      <Paragraph>{translate('contact_form_paragraph_text')}</Paragraph>
      <ContactForm />
    </Section>
    <Section>
      <SectionTitle>{translate('contact_social_section_header')}</SectionTitle>
      <SocialLinks />
      <Location>
        {translate('contact_map_currently_living_text')}{' '}
        <span>{translate('contact_map_currentt_address')}</span>
      </Location>
      <Map />
    </Section>
  </ContactPage>
);

export default Contact;
