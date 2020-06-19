import PropTypes from 'prop-types';

import srcSetShape from './srcSet';

export default PropTypes.shape({
  mediaQuery: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  srcSet: PropTypes.oneOfType([PropTypes.string, srcSetShape]).isRequired
});
