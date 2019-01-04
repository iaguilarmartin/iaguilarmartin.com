import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import theme from '../../shared/theme';
import { animatedHover } from '../../shared/mixins';

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  color: ${props => props.color};
  stroke: ${props => props.color};
  fill: ${props => props.color};
  padding: 0;

  ${props => animatedHover(props.hovercolor)};
`;

const TextButton = ({ color, hoverColor, children, onClick, ...htmlProps }) => (
  <Button
    color={color}
    hovercolor={hoverColor}
    onClick={onClick}
    {...htmlProps}
  >
    {children}
  </Button>
);

TextButton.defaultProps = {
  color: theme.secondaryColor,
  hoverColor: theme.primaryColor,
  onClick: () => {}
};

TextButton.propTypes = {
  /** Default color for the text of the button */
  color: PropTypes.string,
  /** Color to be displayed when mouse is over the button */
  hoverColor: PropTypes.string,
  /** Text button content. */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array
  ]).isRequired,
  /** Function that is called when the button is clicked. */
  onClick: PropTypes.func
};

export default TextButton;
