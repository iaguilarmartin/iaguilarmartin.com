import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { space } from 'ui/shared/spacing';
import colors from 'ui/shared/colors';

import DotIcon from './DotIcon';

const List = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
`;

const Separator = styled.span`
  margin: 0 ${space.x1};
  line-height: 0;
`;

const DotsList = ({ items, renderItem, keyProperty, dotColor, dotSize }) => (
  <List>
    {items.map((item, index) => (
      <Fragment key={item[keyProperty]}>
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
  dotColor: colors.greyLight,
  dotSize: 5
};

DotsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItem: PropTypes.func.isRequired,
  keyProperty: PropTypes.string.isRequired,
  dotSize: PropTypes.number,
  dotColor: PropTypes.string
};

export default DotsList;
