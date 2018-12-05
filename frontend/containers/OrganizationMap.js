import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrganizationMapComponent from '../components/OrganizationMap';

import {
  fetchOrganizations as fetchOrganizationsAction,
  fetchOrganization as fetchOrganizationAction,
} from '../redux/actions/organization';

import OrganizationCategoryShape from '../shapes/OrganizationCategory';

class OrganizationMap extends Component {
  static propTypes = {
    organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchOrganizations: PropTypes.func.isRequired,
    selectOrganization: PropTypes.func.isRequired,
    selectedOrganization: PropTypes.object,
    selectedCategory: OrganizationCategoryShape,
    searchInputValue: PropTypes.string,
  }

  static defaultProps = {
    selectedOrganization: null,
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
      organizations, selectOrganization, selectedOrganization, selectedCategory, searchInputValue,
    } = this.props;
    let filteredOrganizations = organizations;
    if (selectedCategory) {
      filteredOrganizations = filteredOrganizations.filter(organization =>
        organization.innovationCategory.identifier === selectedCategory.identifier);
    }
    // If there is a search input value, add it to the filter
    if (searchInputValue) {
      filteredOrganizations = filteredOrganizations.filter(organization =>
        organization.name.toLowerCase().includes(searchInputValue));
    }
    // We only want to render the map properly when we're actually viewing organizations
    return (
      <OrganizationMapComponent
        selectedOrganization={selectedOrganization}
        organizations={filteredOrganizations}
        selectOrganization={selectOrganization}
        selectedCategory={selectedCategory}
      />
    );
  }
}

// The organization map must have all organizations that we wish to render on the map
const mapStateToProps = ({
  organization: {
    organizations, selectedOrganization, selectedCategory, searchInputValue,
  },
}) => ({
  organizations,
  selectedOrganization,
  selectedCategory,
  searchInputValue,
});

const mapDispatchToProps = {
  fetchOrganizations: fetchOrganizationsAction,
  selectOrganization: fetchOrganizationAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationMap);
