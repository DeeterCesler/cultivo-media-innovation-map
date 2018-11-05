import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchCategories as fetchCategoriesAction,
  selectCategory as selectCategoryAction,
} from '../redux/actions/organization';

import OrganizationCategoriesComponent from '../components/OrganizationCategories';

class OrganizationCategories extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    fetchCategories: PropTypes.func.isRequired,
    selectCategory: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  componentDidMount = () => {
    // If we already have categories, we don't need to refetch them
    if (this.props.categories.length > 0) return;
    this.props.fetchCategories();
  }

  render = () => {
    const { categories, loading, selectCategory } = this.props;
    return (
      <OrganizationCategoriesComponent
        categories={categories}
        loading={loading}
        selectCategory={selectCategory}
      />
    );
  }
}

const mapStateToProps = ({ organization: { categories, loading } }) => ({
  categories,
  loading,
});

const mapDispatchToProps = {
  fetchCategories: fetchCategoriesAction,
  selectCategory: selectCategoryAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationCategories);
