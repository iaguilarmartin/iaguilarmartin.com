import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';

import { space, border } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import fonts from 'ui/shared/fonts';

export const buttonBorderRadius = {
  BOTH: 'both',
  RIGHT: 'right',
  LEFT: 'left',
  NONE: 'none'
};

const getBorderRadiusStyle = ({ borders }) => css`
  border-top-left-radius: ${borders === buttonBorderRadius.BOTH ||
  borders === buttonBorderRadius.LEFT
    ? border.radius
    : 0};
  border-bottom-left-radius: ${borders === buttonBorderRadius.BOTH ||
  borders === buttonBorderRadius.LEFT
    ? border.radius
    : 0};
  border-top-right-radius: ${borders === buttonBorderRadius.BOTH ||
  borders === buttonBorderRadius.RIGHT
    ? border.radius
    : 0};
  border-bottom-right-radius: ${borders === buttonBorderRadius.BOTH ||
  borders === buttonBorderRadius.RIGHT
    ? border.radius
    : 0};
`;

const getColorsStyle = ({ theme, inverted }) => css`
  color: ${inverted ? theme.primaryColor : theme.backgroundColor};

  &::before {
    background-color: ${inverted ? 'transparent' : theme.primaryColor};
    border: 1px solid ${inverted ? theme.primaryColor : 'transparent'};
  }

  &::after {
    background-color: ${inverted ? theme.primaryColor : 'transparent'};
    border: 1px solid ${inverted ? 'transparent' : theme.primaryColor};
  }

  &:hover {
    color: ${inverted ? theme.backgroundColor : theme.primaryColor};
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  padding: ${space.x125} ${space.x2};
  font-family: ${fonts.AndaleMono};
  font-size: ${fonts.sizes.m};
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.5s;
  position: relative;
  text-decoration: none;
  min-height: 40px;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};

  ${getColorsStyle};

  span {
    position: relative;
    z-index: 1;
  }

  ${mediaQueries.md(css`
    min-height: 48px;
    padding: ${space.x175} ${space.x3};
    font-size: ${fonts.sizes.l};
  `)};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    ${getBorderRadiusStyle};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.3s;
    transform: scale(1.2, 1.2);
    ${getBorderRadiusStyle};
  }

  &:hover {
    &::before {
      opacity: 0;
      transform: scale(0.5, 0.5);
    }

    &::after {
      opacity: 1;
      transform: scale(1, 1);
    }
  }

  &:active {
    transform: scaleY(0.95) translateY(8px);
  }
`;

const isExternal = url =>
  url.startsWith('tel:') ||
  url.startsWith('http:') ||
  url.startsWith('https:') ||
  url.startsWith('mailto:');

const Button = ({
  children,
  className,
  onClick,
  borders,
  inverted,
  url,
  ...htmlProps
}) =>
  url ? (
    <StyledButton
      as={isExternal(url) ? 'a' : Link}
      to={url}
      href={url}
      className={className}
      onClick={onClick}
      borders={borders}
      inverted={inverted ? 1 : 0}
      {...htmlProps}
    >
      <span>{children}</span>
    </StyledButton>
  ) : (
    <StyledButton
      borders={borders}
      className={className}
      onClick={onClick}
      inverted={inverted ? 1 : 0}
      {...htmlProps}
    >
      <span>{children}</span>
    </StyledButton>
  );

Button.defaultProps = {
  className: null,
  url: null,
  onClick: () => {},
  borders: buttonBorderRadius.BOTH,
  inverted: false,
  disabled: false
};

Button.propTypes = {
  borders: PropTypes.oneOf(
    Object.keys(buttonBorderRadius).map(key => buttonBorderRadius[key])
  ),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  url: PropTypes.string,
  inverted: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Button;
