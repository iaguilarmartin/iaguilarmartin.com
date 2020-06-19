import React from 'react';
import styled from '@emotion/styled';

import colors from '../../shared/colors';
import fonts from '../../shared/fonts';
import { space } from '../../shared/spacing';

const StyledInput = styled.input`
  width: 100%;
  background-color: ${colors.blackMenu};
  border: none;
  padding: ${space.x2};
  font-family: ${fonts.AndaleMono};
  color: ${colors.white};

  &:focus {
    outline: 1px solid ${colors.petrol};
  }
`;

const Input = ({ ...htmlProps }) => <StyledInput {...htmlProps} />;

export default Input;
