import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchOrganizations as fetchOrganizationsAction,
  fetchOrganization as fetchOrganizationAction,
} from '../redux/actions/organization';

import OrganizationDirectoryComponent from '../components/OrganizationDirectory';
import OrganizationCategoryShape from '../shapes/OrganizationCategory';

class OrganizationDirectory extends Component {
  static propTypes = {
    organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchOrganizations: PropTypes.func.isRequired,
    selectOrganization: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    selectedCategory: OrganizationCategoryShape,
    searchInputValue: PropTypes.string,
  }

  static defaultProps = {
    selectedCategory: null,
    searchInputValue: null,
  }

  componentDidMount = () => {
    // If we already have organizations, we don't need to refetch them
    if (this.props.organizations.length > 0) return;
    this.props.fetchOrganizations();
  }

  render = () => {
    const {
      organizations,
      loading,
      selectOrganization,
      selectedCategory,
      searchInputValue,
    } = this.props;
    // We assign an empty array of filters that we push into as necessary
    let filteredOrganizations = organizations;
    // If there is a search input value, add it to the filter
    if (searchInputValue) {
      filteredOrganizations = filteredOrganizations.filter(organization =>
        organization.name.toLowerCase().includes(searchInputValue));

      return (
        <OrganizationDirectoryComponent
          organizations={filteredOrganizations}
          loading={loading}
          selectOrganization={selectOrganization}
        />
      );
    }

    // If there is a selected category, add it to the filter
    if (selectedCategory) {
      filteredOrganizations = filteredOrganizations.filter(organization =>
        organization.innovationCategory.identifier === selectedCategory.identifier);
    }
    return (
      <OrganizationDirectoryComponent
        organizations={filteredOrganizations}
        loading={loading}
        selectOrganization={selectOrganization}
        selectedCategory={selectedCategory}
      />
    );
  }
}

const mapStateToProps = ({ organization: { organizations, loading, selectedCategory } }) => ({
  organizations,
  loading,
  selectedCategory,
});

const mapDispatchToProps = {
  fetchOrganizations: fetchOrganizationsAction,
  selectOrganization: fetchOrganizationAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationDirectory);
