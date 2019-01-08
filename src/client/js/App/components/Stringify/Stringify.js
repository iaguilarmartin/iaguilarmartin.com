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

  ${mediaQueries.xl(css`
    font-size: ${fonts.sizes.xxxxl};
  `)}
`;

const Bracket = styled.span`
  color: ${colors.petrol};
`;

const Accent = styled.span`
  color: ${colors.blueLight};
`;

const Stringify = ({ children, className, sides }) => (
  <Content className={className}>
    {(sides === side.START || sides === side.BOTH) && (
      <>
        <Bracket>{'{'}</Bracket>
        <Accent>`</Accent>
      </>
    )}
    {children}
    {(sides === side.END || sides === side.BOTH) && (
      <>
        <Accent>`</Accent>
        <Bracket>{'}'}</Bracket>
      </>
    )}
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
