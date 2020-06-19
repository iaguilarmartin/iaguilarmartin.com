import { css } from '@emotion/core';

import ArchitectsDaughterFont from '../resources/ArchitectsDaughter-Regular.ttf';
import ArchivoBlackFont from '../resources/ArchivoBlack-Regular.ttf';
import AndaleMonoFont from '../resources/Andale Mono.ttf';
import DisolveLightFont from '../resources/Disolve_light.ttf';
import DisolveFont from '../resources/Disolve_regular.ttf';
import ObliFont from '../resources/Obli.otf';

const base = 10;

// Font sizes
const sizes = {
  base: `${base}px`,
  xxs: '1rem',
  xs: '1.2rem',
  s: '1.4rem',
  m: '1.6rem',
  l: '1.8rem',
  xl: '2rem',
  xxl: '3rem',
  xxxl: '3.6rem',
  xxxxl: '4.8rem',
  xxxxxl: '5.2rem'
};

// Font names
const names = {
  Disolve: "'Disolve Regular'",
  DisolveLight: "'Disolve Light'",
  Obli: "'Obli'",
  ArchivoBlack: "'ArchivoBlack Regular'",
  AndaleMono: "'Andale Mono'",
  ArchitectsDaughter: "'ArchitectsDaughter Regular'"
};

// Font faces
const faces = css`
  @font-face {
    font-family: ${names.AndaleMono};
    src: url('${AndaleMonoFont}') format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: ${names.ArchitectsDaughter};
    src: url('${ArchitectsDaughterFont}') format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: ${names.ArchivoBlack};
    src: url('${ArchivoBlackFont}') format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: ${names.DisolveLight};
    src: url('${DisolveLightFont}') format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: ${names.Disolve};
    src: url('${DisolveFont}') format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: ${names.Obli};
    src: url('${ObliFont}') format('opentype');
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
