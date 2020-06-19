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
  font-size: ${fonts.sizes.xxl};
  font-family: ${fonts.AndaleMono};
  display: flex;

  ${mediaQueries.md(css`
    font-size: ${fonts.sizes.xxxxl};
  `)}
`;

const Bracket = styled.span`
  color: ${colors.petrol};
  visibility: ${({ invisible }) => (invisible ? 'hidden' : 'visible')};
  align-self: ${({ end }) => (end ? 'flex-end' : 'flex-start')};
`;

const Accent = styled.span`
  color: ${colors.blueLight};
  visibility: ${({ invisible }) => (invisible ? 'hidden' : 'visible')};
  align-self: ${({ end }) => (end ? 'flex-end' : 'flex-start')};
`;

const Stringify = ({ children, className, sides }) => (
  <Content className={className}>
    <Bracket invisible={sides === side.END}>{'{'}</Bracket>
    <Accent invisible={sides === side.END}>`</Accent>
    {children}
    <Accent end={1} invisible={sides === side.START}>
      `
    </Accent>
    <Bracket end={1} invisible={sides === side.START}>
      {'}'}
    </Bracket>
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
