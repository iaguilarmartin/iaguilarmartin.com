import React from 'react';
import PropTypes from 'prop-types';

const MenuIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="21"
    viewBox="0 0 26 21"
  >
    <path
      fill={color}
      fillRule="nonzero"
      d="M0 4.083c0 .321.266.584.59.584h24.82c.324 0 .59-.263.59-.584v-3.5A.589.589 0 0 0 25.41 0H.59A.589.589 0 0 0 0 .583v3.5zm0 8.167c0 .32.266.583.59.583h24.82c.324 0 .59-.262.59-.583v-3.5a.589.589 0 0 0-.59-.583H.59A.589.589 0 0 0 0 8.75v3.5zm0 8.167c0 .32.266.583.59.583h24.82c.324 0 .59-.262.59-.583v-3.5a.589.589 0 0 0-.59-.584H.59a.589.589 0 0 0-.59.584v3.5z"
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
