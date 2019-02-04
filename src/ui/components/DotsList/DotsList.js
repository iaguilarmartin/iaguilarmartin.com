import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { space } from '../../shared/spacing';
import colors from '../../shared/colors';

import DotIcon from './DotIcon';

export const Separator = styled.span`
  margin: 0 ${space.x1};
  line-height: 0;

  ${({ vertical }) =>
    vertical &&
    css`
      align-self: flex-start;
      margin-top: ${space.x1};
    `};
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;

  ${({ vertical }) =>
    vertical &&
    css`
      align-items: flex-start;
      flex-direction: column;
    `};
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;

  ${({ vertical }) =>
    vertical &&
    css`
      margin-bottom: ${space.x1};
    `};
`;

const DotsList = ({
  items,
  renderItem,
  keyProperty,
  dotColor,
  dotSize,
  className,
  vertical
}) => (
  <List className={className} vertical={vertical ? 1 : 0}>
    {items.map((item, index) => (
      <Fragment key={keyProperty ? item[keyProperty] : item}>
        <ListItem vertical={vertical ? 1 : 0}>
          <Separator
            hidden={index === 0 && !vertical}
            vertical={vertical ? 1 : 0}
          >
            <DotIcon size={dotSize} color={dotColor} />
          </Separator>
          {renderItem(item)}
        </ListItem>
      </Fragment>
    ))}
  </List>
);

DotsList.defaultProps = {
  keyProperty: null,
  className: null,
  dotColor: colors.greyLight,
  dotSize: 5,
  vertical: false
};

DotsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
  keyProperty: PropTypes.string,
  className: PropTypes.string,
  dotSize: PropTypes.number,
  vertical: PropTypes.bool,
  dotColor: PropTypes.string
};

export default DotsList;
