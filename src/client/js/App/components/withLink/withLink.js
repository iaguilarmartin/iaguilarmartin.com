import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const isExternal = url =>
  url.startsWith('tel:') ||
  url.startsWith('http:') ||
  url.startsWith('https:') ||
  url.startsWith('mailto:');

const withLink = WrappedComponent => {
  const Component = ({ url, external, blankOnExternal, ...otherProps }) => {
    const externalLink = external || isExternal(url);
    return (
      <WrappedComponent
        as={externalLink ? 'a' : Link}
        to={url}
        href={url}
        target={externalLink && blankOnExternal ? '_blank' : undefined}
        {...otherProps}
      />
    );
  };

  Component.defaultProps = {
    external: false,
    blankOnExternal: false
  };

  Component.propTypes = {
    url: PropTypes.string.isRequired,
    external: PropTypes.bool,
    blankOnExternal: PropTypes.bool
  };

  return Component;
};

export default withLink;
