/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';

import { mediaQueries } from 'ui/shared/breakpoints';
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
import { format } from '../../../libs/dates';

const SectionTitle = styled.header`
  font-family: ${fonts.AndaleMono};
  font-size: ${fonts.sizes.l};
  color: ${colors.greyLight};
  text-transform: uppercase;
  margin: ${space.x3} 0 ${space.x25};

  ${mediaQueries.md(css`
    margin: ${space.x5} 0 ${space.x35};
  `)}
`;

const CompanyLogoImage = styled(Image)`
  width: 180px;
  align-self: center;
  margin-bottom: ${space.x25};

  ${mediaQueries.md(css`
    margin-bottom: 0;
  `)}
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueries.md(css`
    align-items: center;
    flex-direction: row;
  `)}
`;

const WorkDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${space.x15} 0;

  ${mediaQueries.md(css`
    margin: ${space.x1} 0 ${space.x1} ${space.x5};
    flex-direction: row;
  `)}

  span {
    font-family: ${fonts.Obli};
    font-size: ${fonts.sizes.l};
    color: ${colors.greyLight};
    margin-bottom: ${space.x025};
    text-transform: uppercase;

    ${mediaQueries.md(css`
      margin-right: ${space.x15};
      margin-bottom: 0;
    `)}
  }
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

  renderProject = (project, language) => (
    <Project>
      <ProjectName>{project.name[language]}</ProjectName>
      <ProjectInfo>
        // {project.period} - {project.client}
      </ProjectInfo>
      <ProjectDescription>{project.description[language]}</ProjectDescription>
    </Project>
  );

  formatPeriod = (period, language) => {
    const dateFormat = 'MMMM YYYY';
    const from = format(new Date(period.from), dateFormat, language);

    let to = translate('work_present_period');
    if (period.to) {
      to = format(new Date(period.to), dateFormat, language);
    }

    return `${from} - ${to}`;
  };

  loadWork(experienceId) {
    this.setState({ work: getWorkById(experienceId) });
  }

  render() {
    const { history } = this.props;
    const { work } = this.state;

    if (!work) return null;

    const { companyName, companyLogo, position, period, projects } = work;

    return (
      <LanguageContext.Consumer>
        {({ language }) => (
          <Modal
            title={companyName}
            isOpen
            onClose={() => history.push(getRoutePath('resume'))}
          >
            <CompanyInfo>
              <CompanyLogoImage
                src={{
                  x1: companyLogo.x1,
                  x2: companyLogo.x2,
                  x3: companyLogo.x3
                }}
                alt={translate('work_company_logo_alt', companyName)}
              />
              <div>
                <WorkDescription>
                  <span>{translate('work_position_text')}:</span>
                  {position[language]}
                </WorkDescription>
                <WorkDescription>
                  <span>{translate('work_period_text')}:</span>
                  {this.formatPeriod(period, language)}
                </WorkDescription>
              </div>
            </CompanyInfo>
            <SectionTitle>
              {translate('work_featured_projects_text')}
            </SectionTitle>
            <DotsList
              vertical
              dotSize={7}
              keyProperty="id"
              items={projects}
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
