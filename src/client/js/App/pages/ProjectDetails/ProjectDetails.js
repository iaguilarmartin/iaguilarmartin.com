import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import LanguageContext from '../../i18n/language-context';
import Page from '../../components/Page';
import { getProjectById } from '../../api/client';

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

    return (
      <Page>
        <LanguageContext.Consumer>
          {({ language }) => <h1>ProjectDetails {language}</h1>}
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
