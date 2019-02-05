/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';

import colors from 'ui/shared/colors';
import fonts from 'ui/shared/fonts';
import { space } from 'ui/shared/spacing';
import Modal from 'ui/components/Modal';
import Image from 'ui/components/Image';
import DotsList from 'ui/components/DotsList';

import { getRoutePath } from '../../../components/Router';
import { getWorkById } from '../../../api/client';
import LanguageContext from '../../../i18n/language-context';
import { translate } from '../../../i18n';

const SectionTitle = styled.header`
  font-family: ${fonts.AndaleMono};
  font-size: ${fonts.sizes.l};
  color: ${colors.greyLight};
  text-transform: uppercase;
  margin: ${space.x5} 0 ${space.x2};
`;

const CompanyLogoImage = styled(Image)`
  width: 180px;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectName = styled.span`
  color: ${colors.beige};
  font-family: ${fonts.ArchivoBlack};
`;

const ProjectInfo = styled.span`
  color: ${colors.greyLight};
  font-family: ${fonts.Obli};
  margin: ${space.x075} 0 ${space.x025};
`;

const ProjectDescription = styled.p`
  line-height: 1.5;
  margin-bottom: ${space.x2};
`;

class WorkDetails extends Component {
  state = {
    work: null
  };

  componentDidMount() {
    const {
      match: {
        params: { experienceId }
      }
    } = this.props;
    this.loadWork(experienceId);
  }

  loadWork(experienceId) {
    this.setState({ work: getWorkById(experienceId) });
  }

  renderProject = (project, language) => (
    <Project>
      <ProjectName>{project.name[language]}</ProjectName>
      <ProjectInfo>
        // {project.period} - {project.client}
      </ProjectInfo>
      <ProjectDescription>{project.description[language]}</ProjectDescription>
    </Project>
  );

  render() {
    const { history } = this.props;
    const { work } = this.state;
    console.log(work);

    if (!work) return null;

    return (
      <LanguageContext.Consumer>
        {({ language }) => (
          <Modal
            title={work.companyName}
            isOpen
            onClose={() => history.push(getRoutePath('resume'))}
          >
            <CompanyLogoImage
              src={{
                x1: work.companyLogo.x1,
                x2: work.companyLogo.x2,
                x3: work.companyLogo.x3
              }}
              alt={translate(
                'resume_experience_iam_logo_alt',
                work.companyName
              )}
            />
            <SectionTitle>Featured projects</SectionTitle>
            <DotsList
              vertical
              dotSize={7}
              keyProperty="id"
              items={work.projects}
              renderItem={project => this.renderProject(project, language)}
            />
          </Modal>
        )}
      </LanguageContext.Consumer>
    );
  }
}

WorkDetails.defaultProps = {
  match: {
    params: {}
  },
  history: {
    push: () => {}
  }
};

WorkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default withRouter(WorkDetails);
