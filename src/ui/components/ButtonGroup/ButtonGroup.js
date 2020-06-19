import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Button, { buttonBorderRadius } from '../Button';
import fonts from '../../shared/fonts';
import { mediaQueries } from '../../shared/breakpoints';
import { space } from '../../shared/spacing';

const StyledButton = styled(Button)`
  font-family: ${fonts.ArchitectsDaughter};
  text-transform: uppercase;
  font-size: ${fonts.sizes.xs};
  padding-right: ${space.x1};
  padding-left: ${space.x1};

  ${mediaQueries.md(css`
    min-height: 40px;
    font-size: ${fonts.sizes.m};
  `)};
`;

const bordersFromIndex = (index, length) => {
  if (index === 0) return buttonBorderRadius.LEFT;
  if (index === length - 1) return buttonBorderRadius.RIGHT;

  return buttonBorderRadius.NONE;
};

const ButtonGroup = ({ activeButton, buttons, className, onActiveChange }) => (
  <div className={className}>
    {buttons.map(({ name, text }, index) => (
      <StyledButton
        key={name}
        inverted={activeButton !== name}
        disabled={activeButton === name}
        onClick={() => onActiveChange(name)}
        borders={bordersFromIndex(index, buttons.length)}
      >
        {text}
      </StyledButton>
    ))}
  </div>
);

ButtonGroup.defaultProps = {
  className: null,
  onActiveChange: () => {}
};

ButtonGroup.propTypes = {
  activeButton: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  className: PropTypes.string,
  onActiveChange: PropTypes.func
};

export default ButtonGroup;
