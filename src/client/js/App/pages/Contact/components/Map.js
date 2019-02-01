import React from 'react';
import styled from '@emotion/styled';

import colors from 'ui/shared/colors';

const MapContainer = styled.div`
  position: relative;
  padding-bottom: 80%;
  height: 0;
  max-width: 100%;
  box-shadow: 0 2px 4px 0 ${colors.blackMenu};

  iframe,
  object,
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  small {
    position: absolute;
    z-index: 40;
    bottom: 0;
    margin-bottom: -15px;
  }
`;

const Map = () => (
  <MapContainer>
    <iframe
      width="100%"
      height="400"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      title="Bilbao"
      src="//iaguilarmartin.maps.arcgis.com/apps/Embed/index.html?webmap=a499502afa104d52b366fe3d660d9f8b&extent=-74.1637,40.6622,-73.7764,40.8671&zoom=true&previewImage=false&scale=false&disable_scroll=true&theme=dark&marker=-73.986;40.756;;;data%3Aimage%2Fsvg%2Bxml%2C%253Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'40'%20height%3D'40'%20viewBox%3D'0%200%2030%2040'%253E%253Cpath%20fill%3D'%2523AE982E'%20fill-rule%3D'nonzero'%20d%3D'M29.474%2015.174c0%202.84-.592%205.929-2.345%208.71-5.283%208.202-11.97%2015.731-11.97%2015.731s-7.687-7.264-12.597-15.88C1.33%2021.047.526%2018.2.526%2015.35.526%207.34%207.004.385%2015%20.385c7.996.001%2014.474%206.78%2014.474%2014.789zm-5.69-.586a8.65%208.65%200%200%200-8.653-8.655%208.652%208.652%200%200%200-8.654%208.655%208.651%208.651%200%200%200%208.654%208.652%208.651%208.651%200%200%200%208.653-8.652z'%2F%253E%253C%2Fsvg%253E%250A;"
    />
  </MapContainer>
);

export default Map;
