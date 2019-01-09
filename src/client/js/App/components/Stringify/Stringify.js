import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { mediaQueries } from 'ui/shared/breakpoints';
import fonts from 'ui/shared/fonts';
import colors from 'ui/shared/colors';

export const side = {
  START: 'start',
  END: 'end',
  BOTH: 'both'
};

const Content = styled.div`
  font-size: ${fonts.sizes.xl};
  font-family: ${fonts.AndaleMono};

  ${mediaQueries.md(css`
    font-size: ${fonts.sizes.xxxl};
  `)}

  ${mediaQueries.lg(css`
    font-size: ${fonts.sizes.xxxxl};
  `)}
`;

const Bracket = styled.span`
  color: ${colors.petrol};
  visibility: ${({ invisible }) => (invisible ? 'hidden' : 'visible')};
`;

const Accent = styled.span`
  color: ${colors.blueLight};
  visibility: ${({ invisible }) => (invisible ? 'hidden' : 'visible')};
`;

const Stringify = ({ children, className, sides }) => (
  <Content className={className}>
    <Bracket invisible={sides === side.END}>{'{'}</Bracket>
    <Accent invisible={sides === side.END}>`</Accent>
    {children}
    <Accent invisible={sides === side.START}>`</Accent>
    <Bracket invisible={sides === side.START}>{'}'}</Bracket>
  </Content>
);

Stringify.defaultProps = {
  className: null,
  sides: side.BOTH
};

Stringify.propTypes = {
  sides: PropTypes.oneOf(Object.keys(side).map(k => side[k])),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array
  ]).isRequired,
  className: PropTypes.string
};

export default Stringify;
