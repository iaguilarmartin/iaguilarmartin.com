import React from 'react';

const NewspaperIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="32"
    viewBox="0 0 35 32"
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
      d="M9.5 10h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5zM25 19c0 1.654-1.346 3-3 3H3c-1.654 0-3-1.346-3-3V1a1 1 0 0 1 1-1h17a1 1 0 0 1 1 1v18c0 .552.449 1 1 1h2c.551 0 1-.448 1-1V4h-1v14.75a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v16zM3 20h14.184A2.966 2.966 0 0 1 17 19V2H2v17c0 .552.449 1 1 1zM14.5 6h-2a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5zm0 4h-2a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5zm0 4h-10a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5zm0 4h-10a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5z"
      filter="url(#a)"
      transform="translate(5 3)"
    />
  </svg>
);

export default NewspaperIcon;
