import React from 'react';

const EnvelopeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="27"
    viewBox="0 0 35 27"
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
      fill="none"
      fillRule="nonzero"
      stroke="inherit"
      d="M12.5 12.75L0 0h25L12.5 12.75zm0 2.125L7.292 9.562 0 17h25l-7.292-7.438-5.208 5.313zM18.75 8.5L25 14.875V2.125L18.75 8.5zM0 2.125v12.75L6.25 8.5 0 2.125z"
      filter="url(#a)"
      transform="translate(5 3)"
    />
  </svg>
);

export default EnvelopeIcon;
