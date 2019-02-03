import React, { Component } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Route } from 'react-router-dom';

import { space } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import colors from 'ui/shared/colors';
import fonts from 'ui/shared/fonts';
import DotsList from 'ui/components/DotsList';
import Button from 'ui/components/Button';
import Image from 'ui/components/Image';

import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import { translate } from '../../i18n';
import LanguageContext from '../../i18n/language-context';
import withLink from '../../components/withLink';
import { getRoutePath } from '../../components/Router';
import { getEducation as requestEducation } from '../../api/client';

import Education from './components/Education';
import WorkExperience from './components/WorkExperience';

import bubbles from './images/bubbles.png';
import bubbles2x from './images/bubbles@2x.png';
import bubbles3x from './images/bubbles@3x.png';
import WorkDetails from './components/WorkDetails';

const TitleSeparator = styled.br`
  ${mediaQueries.sm(css`
    display: none;
  `)}
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueries.xl(css`
    flex-direction: row;
  `)}
`;

const SectionTitle = styled.header`
  font-family: ${fonts.AndaleMono};
  font-size: ${fonts.sizes.l};
  color: ${colors.greyLight};
  text-transform: uppercase;
  margin-bottom: ${space.x2};
`;

const LeftColumn = styled.div`
  ${mediaQueries.xl(css`
    width: 40%;
  `)}
`;

const RightColumn = styled.div`
  ${mediaQueries.xl(css`
    width: 60%;
  `)}
`;

const Section = styled.section`
  margin-top: ${space.x4};
`;

const Tip = styled.p`
  font-size: ${fonts.sizes.s};
  color: ${colors.greyLight};
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkillsImage = styled(Image)`
  width: 100%;
  max-width: 596px;
`;

const DownloadResumeButton = styled(withLink(Button))`
  margin-top: ${space.x6};
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
      <>
        <Page>
          <PageTitle>
            {translate('resume_header_start_text')} <TitleSeparator />
            {translate('resume_header_end_text')}
          </PageTitle>
          <PageContent>
            <LeftColumn>
              <Section>
                <SectionTitle>
                  {translate('resume_education_section_title')}
                </SectionTitle>
                <DotsList
                  vertical
                  items={education}
                  keyProperty="id"
                  renderItem={item => this.renderEducation(item, language)}
                />
              </Section>
              <Section>
                <SectionTitle>
                  {translate('resume_experience_section_title')}
                </SectionTitle>
                <WorkExperience />
                <Tip>
                  * {translate('resume_experince_section_click_advice_text')}
                </Tip>
              </Section>
            </LeftColumn>
            <RightColumn>
              <Section>
                <SectionTitle>
                  {translate('resume_skills_section_title')}
                </SectionTitle>
                <SkillsContainer>
                  <SkillsImage
                    src={{
                      x1: bubbles,
                      x2: bubbles2x,
                      x3: bubbles3x
                    }}
                    alt={translate('resume_skills_bubbles_image_alt')}
                  />
                  <DownloadResumeButton
                    target="_blank"
                    url={translate('resume_skills_download-resume_button_url')}
                  >
                    {translate('resume_skills_download-resume_button_text')}
                  </DownloadResumeButton>
                </SkillsContainer>
              </Section>
            </RightColumn>
          </PageContent>
        </Page>
        <Route
          exact
          path={`${getRoutePath('resume')}/:experienceId`}
          component={WorkDetails}
        />
      </>
    );
  }
}

Resume.contextType = LanguageContext;

export default Resume;
