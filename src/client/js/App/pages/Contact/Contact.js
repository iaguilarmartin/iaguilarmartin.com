/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import colors from 'ui/shared/colors';
import fonts from 'ui/shared/fonts';

import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';

import ContactForm from './components/ContactForm';
import SocialLinks from './components/SocialLinks';

const ContactPage = styled(Page)`
  display: flex;
  flex-direction: column;

  ${mediaQueries.xl(css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `)}
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;

  ${mediaQueries.xl(css`
    width: 45%;
  `)}
`;

const Paragraph = styled.p`
  margin: ${space.x7} 0 ${space.x4};
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  color: ${colors.greyLight};
  font-family: ${fonts.Obli};
  font-size: ${fonts.sizes.xxl};
  margin-bottom: ${space.x3};
`;

const Contact = () => (
  <ContactPage>
    <Section>
      <PageTitle>Contact me</PageTitle>
      <Paragraph>
        If you have any doubt about me or if you are interested on hiring me
        please drop me a line using the form below:
      </Paragraph>
      <ContactForm />
    </Section>
    <Section>
      <SectionTitle>// You can also find me on:</SectionTitle>
      <SocialLinks />
    </Section>
  </ContactPage>
);

export default Contact;
