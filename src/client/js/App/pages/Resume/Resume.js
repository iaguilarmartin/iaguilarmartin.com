import React, { Component } from 'react';
import styled from '@emotion/styled';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import colors from 'ui/shared/colors';
import fonts from 'ui/shared/fonts';
import DotsList from 'ui/components/DotsList';

import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import { translate } from '../../i18n';
import LanguageContext from '../../i18n/language-context';
import { getEducation as requestEducation } from '../../api/client';

import Education from './components/Education';

const SectionTitle = styled.header`
  font-family: ${fonts.AndaleMono};
  font-size: ${fonts.sizes.l};
  color: ${colors.greyLight};
  text-transform: uppercase;
  margin-bottom: ${space.x2};
`;

const Section = styled.section`
  margin-top: ${space.x4};
`;

class Resume extends Component {
  state = {
    education: []
  };

  componentDidMount() {
    this.getEducation();
  }

  getEducation() {
    this.setState({ education: requestEducation() });
  }

  renderEducation = (education, language) => (
    <Education
      title={education.title[language]}
      period={education.period}
      institution={education.institution[language]}
    />
  );

  render() {
    const { education } = this.state;
    const { language } = this.context;

    return (
      <Page>
        <PageTitle>{translate('resume_header_text')}</PageTitle>
        <Section>
          <SectionTitle>Education</SectionTitle>
          <DotsList
            vertical
            items={education}
            keyProperty="id"
            renderItem={item => this.renderEducation(item, language)}
          />
        </Section>
        <Section>
          <SectionTitle>Work experience</SectionTitle>
        </Section>
        <Section>
          <SectionTitle>Technical skills</SectionTitle>
        </Section>
      </Page>
    );
  }
}

Resume.contextType = LanguageContext;

export default Resume;
