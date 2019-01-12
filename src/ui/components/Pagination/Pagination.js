import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import fonts from '../../shared/fonts';
import TextButton from '../TextButton';

import RightArrowIcon from './icons/RightArrow';
import LeftArrowIcon from './icons/LeftArrow';

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: ${fonts.sizes.l};
`;

const Pagination = ({ currentPage, totalPages, onPageChange, text }) => (
  <Container>
    <TextButton
      disabled={currentPage <= 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      <LeftArrowIcon />
    </TextButton>
    {text}
    <TextButton
      disabled={currentPage >= totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      <RightArrowIcon />
    </TextButton>
  </Container>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default Pagination;
