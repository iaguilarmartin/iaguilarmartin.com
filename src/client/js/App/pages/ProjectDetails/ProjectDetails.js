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
import DotsList from 'ui/components/DotsList';
import TextButton from 'ui/components/TextButton';

import LanguageContext from '../../i18n/language-context';
import Page from '../../components/Page';
import { getProjectById } from '../../api/client';
import { translate } from '../../i18n';

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

  ${mediaQueries.md(css`
    flex-direction: row;
    flex-wrap: wrap;
  `)};
`;

const ProjectImage = styled(Image)`
  width: 100%;
  margin-bottom: ${space.x2};

  ${mediaQueries.xl(css`
    margin-bottom: ${space.x4};
    width: 48%;
    height: 48%;
  `)}
`;

const DescriptionContainer = styled.div`
  margin: ${space.x3} 0 ${space.x4};
  width: 100%;

  ${mediaQueries.xl(css`
    margin-top: 0;
    width: 52%;
    padding-left: ${space.x4};
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
  background: url('${({ link }) => link}') no-repeat;
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
  ${mediaQueries.md(css`
    width: 48%;
  `)}
`;

const Resources = styled.section`
  margin-top: ${space.x3};

  ${mediaQueries.md(css`
    margin-top: 0;
    width: 52%;
    padding-left: ${space.x4};
  `)}
`;

const ResourceLink = styled(TextButton)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const formatResources = (resources, additionalResourcesKeys, language) =>
  additionalResourcesKeys.map(key => ({
    id: key,
    [key]: resources[key][language]
  }));

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

  renderTechnology = item => item;

  renderResource = item => {
    const resource = { ...item };
    delete resource.id;

    const [resourceType] = Object.keys(resource);
    const [resourceURL] = Object.values(resource);

    const getLinkComponent = (url, text) => (
      <ResourceLink as="a" href={url} target="_blank">
        {text}
      </ResourceLink>
    );

    return (
      <span>
        {translate(`project_details_resources_${resourceType}_start`)}{' '}
        {getLinkComponent(
          resourceURL,
          translate(`project_details_resources_${resourceType}_text`)
        )}{' '}
        {translate(`project_details_resources_${resourceType}_end`)}
      </span>
    );
  };

  render() {
    const { project } = this.state;
    if (!project) return null;

    const {
      name,
      subtitle,
      image,
      description,
      resources,
      technologies
    } = project;

    const additionalResources = Object.keys(resources).filter(
      key => !['web', 'AppStore', 'GooglePlay'].includes(key)
    );

    return (
      <Page>
        <LanguageContext.Consumer>
          {({ language }) => (
            <>
              <Title>{name[language]}</Title>
              {subtitle && (
                <Subtitle>
                  {'// '}
                  {subtitle[language]}
                </Subtitle>
              )}
              <ProjectInfo>
                <ProjectImage src={image} alt={name[language]} />
                <DescriptionContainer>
                  <SectionTitle>
                    {translate('project_details_about-section_title')}
                  </SectionTitle>
                  {description[language]
                    .split('\n\n')
                    .map((paragraph, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Paragraph key={index}>{paragraph}</Paragraph>
                    ))}
                  <ButtonsContainer>
                    {resources.web && (
                      <WebLink url={resources.web[language]}>
                        {translate('project_details_web_button_text')}
                      </WebLink>
                    )}
                    {resources.AppStore && (
                      <AppStoreLink
                        href={resources.AppStore[language]}
                        link={translate('project_details_apple_button_url')}
                      />
                    )}
                    {resources.GooglePlay && (
                      <GooglePlayLink href={resources.GooglePlay[language]}>
                        <img
                          src={translate('project_details_google_button_url')}
                          alt={translate('project_details_google_button_text')}
                        />
                      </GooglePlayLink>
                    )}
                  </ButtonsContainer>
                </DescriptionContainer>
                <TechnicalSheet>
                  <SectionTitle>
                    {translate('project_details_technical-sheet-section_title')}
                  </SectionTitle>
                  <DotsList
                    vertical
                    items={technologies.map(technology => technology[language])}
                    renderItem={this.renderTechnology}
                  />
                </TechnicalSheet>
                {additionalResources.length > 0 && (
                  <Resources>
                    <SectionTitle>
                      {translate('project_details_resources-section_title')}
                    </SectionTitle>
                    <DotsList
                      keyProperty="id"
                      vertical
                      items={formatResources(
                        resources,
                        additionalResources,
                        language
                      )}
                      renderItem={this.renderResource}
                    />
                  </Resources>
                )}
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
