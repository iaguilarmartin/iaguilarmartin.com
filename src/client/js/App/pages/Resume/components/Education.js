import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import colors from 'ui/shared/colors';
import fonts from 'ui/shared/fonts';
import { space } from 'ui/shared/spacing';

const Title = styled.strong`
  display: block;
  color: ${colors.beige};
  font-size: ${fonts.sizes.l};
  font-family: ${fonts.ArchivoBlack};
  letter-spacing: 1.5px;
  font-weight: normal;
  margin-bottom: ${space.x05};
`;

const Education = ({ title, period, institution }) => (
  <div>
    <Title>{title}</Title>
    {period}: {institution}
  </div>
);

Education.propTypes = {
  title: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  institution: PropTypes.string.isRequired
};

export default Education;
