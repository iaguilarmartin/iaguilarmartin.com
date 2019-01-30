import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';

import { space, border } from 'ui/shared/spacing';
import { mediaQueries } from 'ui/shared/breakpoints';
import fonts from 'ui/shared/fonts';
import colors from 'ui/shared/colors';

import Spinner from '../Spinner';

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

const getColor = ({ theme, disabled, loading }) => {
  if (disabled || loading) {
    return colors.greyDisabled;
  }

  return theme.primaryColor;
};

const getColorsStyle = props => {
  const { theme, inverted } = props;
  const color = getColor(props);

  return css`
    color: ${inverted ? color : theme.backgroundColor};

    &::before {
      background-color: ${inverted ? 'transparent' : color};
      border: 1px solid ${inverted ? color : 'transparent'};
    }

    &::after {
      background-color: ${inverted ? color : 'transparent'};
      border: 1px solid ${inverted ? 'transparent' : color};
    }

    &:hover {
      color: ${inverted ? theme.backgroundColor : color};
    }
  `;
};

const ButtonSpinner = styled(Spinner)`
  margin-right: 10px;
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

  ${({ disabled, loading }) =>
    (disabled || loading) &&
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

const ButtonText = styled.span`
  display: flex;
  align-items: center;
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
  loading,
  ...htmlProps
}) => {
  let buttonProps = {
    borders,
    className,
    onClick,
    loading,
    inverted,
    ...htmlProps
  };

  if (url) {
    buttonProps = {
      as: isExternal(url) ? 'a' : Link,
      to: url,
      href: url,
      ...buttonProps
    };
  }

  return (
    <StyledButton {...buttonProps}>
      <ButtonText>
        {loading && <ButtonSpinner size={space.x25} />}
        {children}
      </ButtonText>
    </StyledButton>
  );
};

Button.defaultProps = {
  className: null,
  url: null,
  onClick: () => {},
  borders: buttonBorderRadius.BOTH,
  inverted: false,
  loading: false,
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
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Button;
