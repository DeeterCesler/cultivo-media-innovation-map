import React from 'react'
import PropTypes from 'prop-types'

const OrganizationDirectory = ({ organizations, loading }) => (
  <div>
    {organizations &&
      organizations.map(organization => <p>{organization.name}</p>)}
    {loading && <p>Currently loading...</p>}
  </div>
)

OrganizationDirectory.propTypes = {
  organizations: PropTypes.array
}

export default OrganizationDirectory
