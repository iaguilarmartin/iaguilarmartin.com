import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ClassNames, css } from '@emotion/core';
import { NavLink } from 'react-router-dom';

import TextButton from '../TextButton';

import fonts from '../../shared/fonts';
import { space } from '../../shared/spacing';
import { mediaQueries } from '../../shared/breakpoints';
import { themed } from '../../shared/theme';
import routeShape from '../../shapes/route';

import OpenMenuIcon from './icons/OpenMenu';
import CloseMenuIcon from './icons/CloseMenu';

const MenuWrapper = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: ${themed.menuBgColor};
  z-index: 10;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: ${({ expanded }) => (expanded ? '100%' : 0)};
  transition: width 0.5s ease-out;

  ${({ theme, expanded }) =>
    mediaQueries.md(
      css`
        width: auto;
        max-width: ${expanded ? '200px' : theme.menuWidth};
        transition: max-width 0.5s ease-out;
      `
    )};
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-left: ${space.x15};

  a:not(:last-of-type) {
    margin-bottom: ${space.x05};
  }
`;

const NavigationItem = styled(TextButton)`
  display: flex;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }

  svg {
    flex-shrink: 0;
  }
`;

const NavigationItemLabel = styled.span`
  margin: 0 ${space.x3} 0 ${space.x25};
  transition: opacity 0.5s ease-out;
  font-size: ${fonts.sizes.xl};
  opacity: 1;

  ${({ visible }) =>
    mediaQueries.md(css`
      opacity: ${visible ? 1 : 0};
    `)};
`;

const MenuButton = styled(TextButton)`
  position: absolute;
  top: ${space.x2};
  right: ${space.x2};
  fill: ${themed.menuIconColor};

  ${mediaQueries.md(css`
    left: ${space.x2};
  `)}
`;

const OutsideMenuButton = styled(TextButton)`
  position: absolute;
  top: ${space.x2};
  left: ${space.x2};
  fill: ${themed.menuIconColor};

  ${mediaQueries.md(css`
    display: none;
  `)}
`;

const Logo = styled.span`
  position: absolute;
  left: ${space.x2};
  top: ${space.x2};

  ${mediaQueries.md(css`
    top: auto;
    bottom: ${space.x2};
  `)}
`;

class Menu extends Component {
  state = {
    expanded: false
  };

  handleMenuButtonClick = () =>
    this.setState(({ expanded }) => ({
      expanded: !expanded
    }));

  handleNavigationItemClick = () => this.setState({ expanded: false });

  render() {
    const { renderLogo, routes } = this.props;
    const { expanded } = this.state;

    return (
      <>
        <OutsideMenuButton onClick={this.handleMenuButtonClick}>
          <OpenMenuIcon />
        </OutsideMenuButton>
        <MenuWrapper expanded={expanded}>
          <ClassNames>
            {({ css: localCss, theme }) => (
              <>
                <MenuButton onClick={this.handleMenuButtonClick}>
                  {expanded ? <CloseMenuIcon /> : <OpenMenuIcon />}
                </MenuButton>
                <Navigation>
                  {routes.map(({ icon, path, label, name, exact }) => (
                    <NavigationItem
                      as={NavLink}
                      key={name}
                      to={path}
                      exact={exact || path === '/'}
                      onClick={this.handleNavigationItemClick}
                      activeClassName={localCss`
                      stroke: ${theme.primaryColor} !important;
                      fill: ${theme.primaryColor} !important;
                      color: ${theme.primaryColor} !important;
                    `}
                    >
                      {icon()}
                      <NavigationItemLabel visible={expanded}>
                        {label}
                      </NavigationItemLabel>
                    </NavigationItem>
                  ))}
                </Navigation>
                {renderLogo && <Logo>{renderLogo(expanded)}</Logo>}
              </>
            )}
          </ClassNames>
        </MenuWrapper>
      </>
    );
  }
}

Menu.defaultProps = {
  renderLogo: null
};

Menu.propTypes = {
  renderLogo: PropTypes.func,
  routes: PropTypes.arrayOf(routeShape).isRequired
};

export default Menu;
