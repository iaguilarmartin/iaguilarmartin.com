import React from 'react';
import PropTypes from 'prop-types';

const DotIcon = ({ color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
  >
    <circle
      cx={170 + size / 2}
      cy={14 + size / 2}
      r={size / 2}
      fill={color}
      fillRule="evenodd"
      transform="translate(-170 -14)"
    />
  </svg>
);

DotIcon.defaultProps = {
  color: 'inherit',
  size: 7
};

DotIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
};

export default DotIcon;
