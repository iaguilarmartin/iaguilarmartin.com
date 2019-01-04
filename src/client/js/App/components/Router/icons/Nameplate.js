import React from 'react';

const NameplateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="31"
    viewBox="0 0 35 31"
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
      transform="translate(-13 -434)"
    >
      <path
        stroke="inherit"
        d="M40.917 439.143h-4.17c0 .008.003.015.003.022v1.025c0 1.33-.772 2.096-2.105 2.096h-8.289c-1.333 0-2.105-.766-2.105-2.096v-1.025l.002-.022h-4.17A2.09 2.09 0 0 0 18 441.238v14.667A2.09 2.09 0 0 0 20.083 458h20.834A2.09 2.09 0 0 0 43 455.905v-14.667a2.09 2.09 0 0 0-2.083-2.095zm-9.375 14.771c0 .522-.466.943-1.042.943h-8.333c-.576 0-1.042-.421-1.042-.943v-8.59c0-.52.466-.942 1.042-.942H30.5c.576 0 1.042.421 1.042.943v8.59z"
      />
      <path
        fill="inherit"
        d="M26.355 441.238h8.289c.574 0 1.063-.471 1.063-1.048v-1.025c0-.576-.49-1.07-1.063-1.07h-2.06v-.96c0-.576-.47-1.135-1.042-1.135h-2.084c-.573 0-1.041.56-1.041 1.136v.96h-2.062c-.574 0-1.063.494-1.063 1.069v1.025c0 .577.49 1.048 1.063 1.048zM30.354 452.719l-2.632-1.69v-.712c.382 0 .695-.663.695-1.048v-1.745c0-.822-.518-2.095-2.084-2.095-1.565 0-2.083 1.273-2.083 2.095v1.746c0 .385.313 1.048.695 1.048v.712l-2.632 1.69a.359.359 0 0 0-.146.27v.646c0 .096.078.175.174.175h7.986a.175.175 0 0 0 .174-.175v-.647a.365.365 0 0 0-.147-.27z"
      />
    </g>
  </svg>
);

export default NameplateIcon;
