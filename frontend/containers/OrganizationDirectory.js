import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchOrganizations } from '../redux/actions/organization'

import OrganizationDirectoryComponent from '../components/OrganizationDirectory'

class OrganizationDirectory extends Component {
  static propTypes = {
    organizations: PropTypes.array,
    fetchOrganizations: PropTypes.func,
    loading: PropTypes.bool
  }

  componentDidMount = () => {
    this.props.fetchOrganizations()
  }

  render = () => {
    const { organizations, loading } = this.props
    return (
      <OrganizationDirectoryComponent
        organizations={organizations}
        loading={loading}
      />
    )
  }
}

const mapStateToProps = ({ organization: { organizations, loading } }) => ({
  organizations,
  loading
})

const mapDispatchToProps = {
  fetchOrganizations
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationDirectory)
