import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { space } from '../../shared/spacing';
import colors from '../../shared/colors';

import DotIcon from './DotIcon';

const List = styled.ul`
  display: inline-flex;
  list-style: none;
  align-items: center;
`;

export const Separator = styled.span`
  margin: 0 ${space.x1};
  line-height: 0;
`;

const DotsList = ({
  items,
  renderItem,
  keyProperty,
  dotColor,
  dotSize,
  className
}) => (
  <List className={className}>
    {items.map((item, index) => (
      <Fragment key={keyProperty ? item[keyProperty] : item}>
        {index > 0 && (
          <Separator>
            <DotIcon size={dotSize} color={dotColor} />
          </Separator>
        )}
        <li>{renderItem(item)}</li>
      </Fragment>
    ))}
  </List>
);

DotsList.defaultProps = {
  keyProperty: null,
  className: null,
  dotColor: colors.greyLight,
  dotSize: 5
};

DotsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
  keyProperty: PropTypes.string,
  className: PropTypes.string,
  dotSize: PropTypes.number,
  dotColor: PropTypes.string
};

export default DotsList;
