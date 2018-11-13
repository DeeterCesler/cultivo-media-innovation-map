import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrganizationMapComponent from '../components/OrganizationMap';

import {
  fetchOrganization as fetchOrganizationsAction,
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
  }

  static defaultProps = {
    selectedOrganization: null,
    selectedCategory: null,
  }

  componentDidMount = () => {
    // If we already have organizations, we don't need to refetch them
    if (this.props.organizations.length > 0) return;
    this.props.fetchOrganizations();
  }

  render = () => {
    const {
      organizations, selectOrganization, selectedOrganization, selectedCategory,
    } = this.props;
    let filteredOrganizations;
    if (selectedCategory) {
      filteredOrganizations = organizations.filter(organization =>
        organization.innovationCategory.identifier === selectedCategory.identifier);
    }
    // We only want to render the map properly when we're actually viewing organizations
    return (
      <OrganizationMapComponent
        selectedOrganization={selectedOrganization}
        organizations={filteredOrganizations || organizations}
        selectOrganization={selectOrganization}
      />
    );
  }
}

// The organization map must have all organizations that we wish to render on the map
const mapStateToProps = ({
  organization: { organizations, selectedOrganization, selectedCategory },
}) => ({
  organizations,
  selectedOrganization,
  selectedCategory,
});

const mapDispatchToProps = {
  fetchOrganizations: fetchOrganizationsAction,
  selectOrganization: fetchOrganizationAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationMap);
