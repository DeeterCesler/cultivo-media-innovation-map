import PropTypes from 'prop-types';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});
