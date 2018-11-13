import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchOrganizations as fetchOrganizationsAction,
  fetchOrganization as fetchOrganizationAction,
  deselectCategory as deselectCategoryAction,
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
    deselectCategory: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selectedCategory: null,
  }

  componentDidMount = () => {
    // If we already have organizations, we don't need to refetch them
    if (this.props.organizations.length > 0) return;
    this.props.fetchOrganizations();
  }

  render = () => {
    const {
      organizations, loading, selectOrganization, selectedCategory, deselectCategory,
    } = this.props;
    let filteredOrganizations;
    if (selectedCategory) {
      filteredOrganizations = organizations.filter(organization =>
        organization.innovationCategory.identifier === selectedCategory.identifier);
    }
    return (
      <OrganizationDirectoryComponent
        organizations={filteredOrganizations || organizations}
        loading={loading}
        selectOrganization={selectOrganization}
        selectedCategory={selectedCategory}
        deselectCategory={deselectCategory}
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
  deselectCategory: deselectCategoryAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationDirectory);
