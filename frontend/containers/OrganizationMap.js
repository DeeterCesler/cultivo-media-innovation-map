import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrganizationMapComponent from '../components/OrganizationMap';

import {
  fetchOrganization as fetchOrganizationsAction,
  fetchOrganization as fetchOrganizationAction,
} from '../redux/actions/organization';

class OrganizationMap extends Component {
  static propTypes = {
    organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchOrganizations: PropTypes.func.isRequired,
    selectOrganization: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    // If we already have organizations, we don't need to refetch them
    if (this.props.organizations.length > 0) return;
    this.props.fetchOrganizations();
  }

  render = () => {
    const { organizations, selectOrganization } = this.props;
    return (
      <OrganizationMapComponent
        organizations={organizations}
        selectOrganization={selectOrganization}
      />
    );
  }
}

// The organization map must have all organizations that we wish to render on the map
const mapStateToProps = ({ organization: { organizations } }) => ({
  organizations,
});

const mapDispatchToProps = {
  fetchOrganizations: fetchOrganizationsAction,
  selectOrganization: fetchOrganizationAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationMap);
