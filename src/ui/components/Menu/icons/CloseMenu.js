import React from 'react';
import PropTypes from 'prop-types';

const MenuIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <defs>
      <filter
        id="a"
        width="101.7%"
        height="101.4%"
        x="-.9%"
        y="-.5%"
        filterUnits="objectBoundingBox"
      >
        <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="2"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
        />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      fill={color}
      fillRule="nonzero"
      d="M17.154 13.153l7.342-7.432a.76.76 0 0 0 0-1.06l-3.098-3.136a.737.737 0 0 0-1.046 0l-7.345 7.433-7.35-7.437a.737.737 0 0 0-1.046 0L1.513 4.658a.758.758 0 0 0 0 1.06l7.348 7.436-7.345 7.434a.761.761 0 0 0 0 1.06l3.098 3.135a.74.74 0 0 0 1.048 0l7.345-7.433 7.34 7.429c.287.29.76.29 1.047 0l3.1-3.137a.763.763 0 0 0 0-1.06l-7.34-7.43z"
      filter="url(#a)"
      transform="translate(3 1)"
    />
  </svg>
);

MenuIcon.defaultProps = {
  color: 'inherit'
};

MenuIcon.propTypes = {
  color: PropTypes.string
};

export default MenuIcon;
