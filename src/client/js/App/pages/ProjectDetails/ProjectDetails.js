import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { themed } from 'ui/shared/theme';
import fonts from 'ui/shared/fonts';
import { space } from 'ui/shared/spacing';
import colors from 'ui/shared/colors';
import { mediaQueries } from 'ui/shared/breakpoints';
import Image from 'ui/components/Image';
import Button from 'ui/components/Button';

import LanguageContext from '../../i18n/language-context';
import Page from '../../components/Page';
import { getProjectById } from '../../api/client';

const Title = styled.h2`
  color: ${themed.articlesTitleColor};
  font-family: ${themed.articlesTitleFontFamily};
  font-size: ${fonts.sizes.xxxl};
  letter-spacing: 0.5px;
  margin-bottom: ${space.x05};
`;

const Subtitle = styled.h3`
  color: ${colors.greyLight};
  font-family: ${fonts.Obli};
  font-size: ${fonts.sizes.l};
  letter-spacing: 1px;
`;

const ProjectInfo = styled.section`
  display: flex;
  flex-direction: column;
  margin: ${space.x3} 0 ${space.x5};

  ${mediaQueries.lg(css`
    flex-direction: row;
    flex-wrap: wrap;
  `)};
`;

const ProjectImage = styled(Image)`
  width: 100%;
  margin-bottom: ${space.x2};

  ${mediaQueries.lg(css`
    margin-bottom: 0;
    width: 48%;
    height: 48%;
  `)}
`;

const DescriptionContainer = styled.div`
  margin: ${space.x3} 0 ${space.x4};
  width: 100%;

  ${mediaQueries.lg(css`
    width: 52%;
    padding-left: ${space.x4};
    margin-top: 0;
  `)}
`;

const SectionTitle = styled.header`
  font-family: ${fonts.AndaleMono};
  font-size: ${fonts.sizes.m};
  color: ${colors.greyLight};
  text-transform: uppercase;
  margin-bottom: ${space.x2};
`;

const Paragraph = styled.p`
  line-height: 1.5;
  margin-bottom: ${space.x2};
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: ${space.x25};
  flex-wrap: wrap;
`;

const WebLink = styled(Button)`
  margin-right: ${space.x15};
`;

const AppStoreLink = styled.a`
  display: inline-block;
  overflow: hidden;
  background: url('//linkmaker.itunes.apple.com/assets/shared/badges/es-mx/appstore-lrg.svg')
    no-repeat;
  width: 162px;
  height: 48px;
  background-size: contain;
`;

const GooglePlayLink = styled.a`
  img {
    height: 72px;
    margin-top: ${space.x05};
  }
`;

const TechnicalSheet = styled.section`
  ${mediaQueries.lg(css`
    width: 48%;
  `)}
`;

const Resources = styled.section`
  ${mediaQueries.lg(css`
    width: 52%;
    padding-left: ${space.x4};
  `)}
`;

class ProjectDetails extends Component {
  state = {
    project: null
  };

  componentDidMount() {
    const {
      match: {
        params: { projectId }
      }
    } = this.props;
    this.getProject(projectId);
  }

  getProject(id) {
    this.setState({
      project: getProjectById(id)
    });
  }

  render() {
    const { project } = this.state;
    if (!project) return null;

    const { name, subtitle, image, description, resources } = project;

    return (
      <Page>
        <LanguageContext.Consumer>
          {({ language }) => (
            <>
              <Title>{name[language]}</Title>
              <Subtitle>
                {'// '}
                {subtitle[language]}
              </Subtitle>
              <ProjectInfo>
                <ProjectImage src={image} alt={name[language]} />
                <DescriptionContainer>
                  <SectionTitle>About this project</SectionTitle>
                  {description[language]
                    .split('\n\n')
                    .map((paragraph, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Paragraph key={index}>{paragraph}</Paragraph>
                    ))}
                  <ButtonsContainer>
                    {resources.web && (
                      <WebLink url={resources.web[language]}>
                        Visit website
                      </WebLink>
                    )}
                    {resources.AppStore && (
                      <AppStoreLink href={resources.AppStore[language]} />
                    )}
                    {resources.GooglePlay && (
                      <GooglePlayLink href={resources.GooglePlay[language]}>
                        <img
                          src="https://play.google.com/intl/en_us/badges/images/generic/es_badge_web_generic.png"
                          alt="Disponible en Google Play"
                        />
                      </GooglePlayLink>
                    )}
                  </ButtonsContainer>
                </DescriptionContainer>
                <TechnicalSheet>
                  <SectionTitle>Technical sheet</SectionTitle>
                </TechnicalSheet>
                <Resources>
                  <SectionTitle>Resources</SectionTitle>
                </Resources>
              </ProjectInfo>
            </>
          )}
        </LanguageContext.Consumer>
      </Page>
    );
  }
}

ProjectDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired
};

export default withRouter(ProjectDetails);
