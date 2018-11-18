import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchInputComponent from '../components/SearchInput';

import { updateSearchInput } from '../redux/actions/organization';

const SearchInput = ({ handleSearchInputChange }) => (
  <SearchInputComponent searchInputUpdate={handleSearchInputChange} />
);

SearchInput.propTypes = {
  handleSearchInputChange: PropTypes.func.isRequired,
};

export default connect(null, {
  handleSearchInputChange: updateSearchInput,
})(SearchInput);
