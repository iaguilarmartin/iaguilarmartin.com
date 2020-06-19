import React from 'react';
import styled from '@emotion/styled';

import Input from '../Input';

const StykedInput = styled(Input)`
  resize: none;
`;

const TextArea = ({ ...htmlProps }) => (
  <StykedInput as="textarea" {...htmlProps} />
);

export default TextArea;
