import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchOrganizations as fetchOrganizationsAction,
  selectOrganization as selectOrganizationAction,
} from '../redux/actions/organization';

import OrganizationDirectoryComponent from '../components/OrganizationDirectory';

class OrganizationDirectory extends Component {
  static propTypes = {
    organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchOrganizations: PropTypes.func.isRequired,
    selectOrganization: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  componentDidMount = () => {
    this.props.fetchOrganizations();
  }

  render = () => {
    const { organizations, loading, selectOrganization } = this.props;
    return (
      <OrganizationDirectoryComponent
        organizations={organizations}
        loading={loading}
        selectOrganization={selectOrganization}
      />
    );
  }
}

const mapStateToProps = ({ organization: { organizations, loading } }) => ({
  organizations,
  loading,
});

const mapDispatchToProps = {
  fetchOrganizations: fetchOrganizationsAction,
  selectOrganization: selectOrganizationAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationDirectory);
