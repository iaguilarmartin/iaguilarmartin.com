import { css } from '@emotion/core';

const base = 10;

// Font sizes
const sizes = {
  base: `${base}px`,
  xxs: '1rem',
  xs: '1.2rem',
  s: '1.4rem',
  m: '1.6rem',
  l: '1.7rem',
  xl: '2rem',
  xxl: '2.4rem',
  xxxl: '2.8rem',
  xxxxl: '5.6rem'
};

// Font names
const names = {
  Gotham: "'Gotham Book'",
  GothamLight: "'Gotham Light'",
  GothamMedium: "'Gotham Medium'",
  GothamBold: "'Gotham Bold'",
  GothamLightItalic: "'Gotham Light Italic'",
  Spotahome: "'Spotahome Family Regular'"
};

// Font faces
const faces = css`
  @font-face {
    font-family: ${names.GothamLight};
    src: url('/fonts/Gotham-Light.eot');
    src: url('/fonts/Gotham-Light.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Gotham-Light.woff') format('woff'),
      url('/fonts/Gotham-Light.ttf') format('truetype'),
      url('/fonts/Gotham-Light.svg#6a327a217ddd10461b1acdc4d224fee0')
        format('svg');
    font-style: normal;
    font-weight: 200;
  }

  @font-face {
    font-family: ${names.Gotham};
    src: url('/fonts/Gotham-Book.eot');
    src: url('/fonts/Gotham-Book.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Gotham-Book.woff') format('woff'),
      url('/fonts/Gotham-Book.ttf') format('truetype'),
      url('/fonts/Gotham-Book.svg#7510147900d23fa3ad697e74bf146ea2')
        format('svg');
    font-style: normal;
    font-weight: 400;
  }

  @font-face {
    font-family: ${names.GothamMedium};
    src: url('/fonts/Gotham-Medium.eot');
    src: url('/fonts/Gotham-Medium.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Gotham-Medium.woff') format('woff'),
      url('/fonts/Gotham-Medium.ttf') format('truetype'),
      url('/fonts/Gotham-Medium.svg#7510147900d23fa3ad697e74bf146ea2')
        format('svg');
    font-style: normal;
    font-weight: 600;
  }

  @font-face {
    font-family: ${names.GothamBold};
    src: url('/fonts/Gotham-Bold.eot');
    src: url('/fonts/Gotham-Bold.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Gotham-Bold.woff') format('woff'),
      url('/fonts/Gotham-Bold.ttf') format('truetype'),
      url('/fonts/Gotham-Bold.svg#6a327a217ddd10461b1acdc4d224fee0')
        format('svg');
    font-style: normal;
    font-weight: 700;
  }

  @font-face {
    font-family: ${names.GothamLightItalic};
    src: url('/fonts/Gotham-LightItalic.eot');
    src: url('/fonts/Gotham-LightItalic.eot?#iefix') format('embedded-opentype'),
      url('/fonts/Gotham-LightItalic.woff') format('woff'),
      url('/fonts/Gotham-LightItalic.ttf') format('truetype'),
      url('/fonts/Gotham-LightItalic.svg#aabee2733b9e804ef6d288e82f81e260')
        format('svg');
    font-style: italic;
    font-weight: 200;
  }

  @font-face {
    font-family: ${names.Spotahome};
    src: url('/fonts/spotahome-family-Regular.ttf') format('truetype');
    font-style: normal;
    font-weight: normal;
  }
`;

const fonts = {
  sizes,
  faces,
  ...names
};

export default fonts;
