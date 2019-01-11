import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';

import { space, border } from 'ui/shared/spacing';
import { themed } from 'ui/shared/theme';
import { mediaQueries } from 'ui/shared/breakpoints';
import fonts from 'ui/shared/fonts';

const StyledButton = styled.button`
  background-color: transparent;
  padding: ${space.x125} ${space.x2};
  color: ${themed.backgroundColor};
  font-family: ${fonts.AndaleMono};
  font-size: ${fonts.sizes.md};
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.5s;
  position: relative;
  text-decoration: none;
  min-height: 40px;

  span {
    position: relative;
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
    background-color: ${themed.primaryColor};
    border-radius: ${border.radius};
    transition: all 0.3s;
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
    border: 1px solid ${themed.primaryColor};
    border-radius: ${border.radius};
    transform: scale(1.2, 1.2);
  }

  &:hover {
    color: ${themed.primaryColor};

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

const Button = ({ children, className, onClick, url, ...htmlProps }) =>
  url ? (
    <StyledButton
      as={isExternal(url) ? 'a' : Link}
      to={url}
      href={url}
      className={className}
      onClick={onClick}
      {...htmlProps}
    >
      <span>{children}</span>
    </StyledButton>
  ) : (
    <StyledButton className={className} onClick={onClick} {...htmlProps}>
      <span>{children}</span>
    </StyledButton>
  );

Button.defaultProps = {
  className: null,
  url: null,
  onClick: () => {}
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  url: PropTypes.string
};

export default Button;
