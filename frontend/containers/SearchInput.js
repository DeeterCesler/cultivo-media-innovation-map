import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchInputComponent from '../components/SearchInput';

import {
  updateSearchInput,
  deselectCategory as deselectCategoryAction,
} from '../redux/actions/organization';

import OrganizationCategoryShape from '../shapes/OrganizationCategory';

const SearchInput = ({
  handleSearchInputChange,
  searchInputValue,
  selectedCategory,
  deselectCategory,
}) => (
  <SearchInputComponent
    searchInputUpdate={handleSearchInputChange}
    searchInputValue={searchInputValue}
    deselectCategory={deselectCategory}
    selectedCategory={selectedCategory}
  />
);

SearchInput.propTypes = {
  handleSearchInputChange: PropTypes.func.isRequired,
  searchInputValue: PropTypes.string,
  deselectCategory: PropTypes.func.isRequired,
  selectedCategory: OrganizationCategoryShape,
};

SearchInput.defaultProps = {
  selectedCategory: null,
  searchInputValue: '',
};

const mapStateToProps = ({ organization: { searchInputValue, selectedCategory } }) => ({
  searchInputValue,
  selectedCategory,
});

const mapDispatchToProps = {
  handleSearchInputChange: updateSearchInput,
  deselectCategory: deselectCategoryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
