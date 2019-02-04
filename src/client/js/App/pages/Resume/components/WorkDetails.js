import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';

import colors from 'ui/shared/colors';
import fonts from 'ui/shared/fonts';
import { space } from 'ui/shared/spacing';
import Modal from 'ui/components/Modal';

import { getRoutePath } from '../../../components/Router';

const SectionTitle = styled.header`
  font-family: ${fonts.AndaleMono};
  font-size: ${fonts.sizes.l};
  color: ${colors.greyLight};
  text-transform: uppercase;
  margin-bottom: ${space.x2};
`;

const WorkDetails = ({ history }) => (
  <Modal
    title="Prueba"
    isOpen
    onClose={() => history.push(getRoutePath('resume'))}
  >
    asdfa
    <SectionTitle>Featured projects</SectionTitle>
  </Modal>
);

WorkDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(WorkDetails);
