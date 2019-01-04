import React from 'react';

const BriefcaseIcon = () => (
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
    <path
      fill="none"
      fillRule="nonzero"
      stroke="inherit"
      d="M9.09 3.429H6.819c0-1.89 1.53-3.429 3.41-3.429h4.545c1.88 0 3.409 1.538 3.409 3.429h-2.273c0-.631-.51-1.143-1.136-1.143h-4.546a1.14 1.14 0 0 0-1.136 1.143zm5.683 13.142a.57.57 0 0 1-.568.572h-3.41a.57.57 0 0 1-.568-.572v-1.284L0 12.715v9A2.286 2.286 0 0 0 2.273 24h20.454A2.286 2.286 0 0 0 25 21.714v-8.999l-10.227 2.572v1.284zm7.954-12H2.273A2.286 2.286 0 0 0 0 6.857v3.856l10.227 2.572v-.142a.57.57 0 0 1 .568-.572h3.41a.57.57 0 0 1 .568.572v.142L25 10.713V6.857a2.286 2.286 0 0 0-2.273-2.286z"
      filter="url(#a)"
      transform="translate(5 3)"
    />
  </svg>
);

export default BriefcaseIcon;
