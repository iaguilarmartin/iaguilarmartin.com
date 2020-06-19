import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const isExternal = url =>
  url.startsWith('tel:') ||
  url.startsWith('http:') ||
  url.startsWith('https:') ||
  url.startsWith('mailto:');

const withLink = WrappedComponent => {
  const Component = ({ url, external, ...otherProps }) => (
    <WrappedComponent
      as={external || isExternal(url) ? 'a' : Link}
      to={url}
      href={url}
      {...otherProps}
    />
  );

  Component.defaultProps = {
    external: false
  };

  Component.propTypes = {
    url: PropTypes.string.isRequired,
    external: PropTypes.bool
  };

  return Component;
};

export default withLink;
