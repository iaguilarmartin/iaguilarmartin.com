import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Title = styled.h1``;

const PageTitle = ({ children, className }) => (
  <Title className={className}>{children}</Title>
);

PageTitle.defaultProps = {
  className: null
};

PageTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  className: PropTypes.string
};

export default PageTitle;
