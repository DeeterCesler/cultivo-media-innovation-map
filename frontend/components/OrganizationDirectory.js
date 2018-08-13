import React from 'react'
import PropTypes from 'prop-types'

const OrganizationDirectory = ({ organizations, loading }) => (
  <div>
    {organizations &&
      organizations.map(organization => (
        <div key={organization._id}>
          <p>{organization.name}</p>
        </div>
      ))}
    {loading && <p>Currently loading...</p>}
  </div>
)

OrganizationDirectory.propTypes = {
  organizations: PropTypes.array
}

export default OrganizationDirectory
