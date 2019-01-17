import React from 'react';
import PropTypes from 'prop-types';

import Image from 'ui/components/Image';

const Project = ({ image, name }) => (
  <article>
    <Image width="100%" alt={name} src={image} />
  </article>
);

Project.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Project;
