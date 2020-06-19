import React from 'react';

const LaptopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="34"
    viewBox="0 0 35 34"
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
    <g
      fill="none"
      fillRule="nonzero"
      filter="url(#a)"
      transform="translate(-13 -527)"
    >
      <path
        stroke="inherit"
        d="M39.875 531.043c0-.573-.469-1.043-1.042-1.043H22.167c-.573 0-1.042.47-1.042 1.043v12.522h18.75v-12.522zm-2.083 10.435H23.208v-9.391h14.584v9.391zm2.083 3.13h-18.75L18 551.914v1.044c0 .573.469 1.043 1.042 1.043h22.916c.573 0 1.042-.47 1.042-1.043v-1.044l-3.125-7.304zm-5.73 7.305h-7.29c-.288 0-.465-.226-.396-.506l.58-2.118a.7.7 0 0 1 .647-.506h5.625a.7.7 0 0 1 .647.506l.58 2.118c.072.28-.105.506-.392.506z"
      />
      <path d="M23.208 532.087h14.583v9.391H23.208z" opacity=".3" />
    </g>
  </svg>
);

export default LaptopIcon;
