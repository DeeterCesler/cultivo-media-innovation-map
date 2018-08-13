import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { OrganizationSidebar, OrganizationSidebarWrapper } from './ui/OrganizationSidebar';

import { colors } from './ui/variables';

const OrganizationsList = styled.div`
  height: 100%;
  overflow-y: scroll;
  .organization-list-item {
    cursor: pointer;
    padding: 16px 0;
    &:not(:last-child) {
      border-bottom: solid 1px #eee;
    }
    p {
      color: ${colors.black};
    }
    small {
      color: ${colors.gray};
    }
  }
`;

const OrganizationDirectory = ({
  organizations,
  loading,
  selectOrganization,
}) => (
  <OrganizationSidebarWrapper>
    <OrganizationSidebar>
      <OrganizationsList>
        {organizations
          && organizations.map(organization => (
            <div
              key={organization._id} // eslint-disable-line
              onClick={() => selectOrganization(organization)}
              className="organization-list-item"
            >
              <p>
                {organization.name}
              </p>
              <small>
                {organization.duAffiliation}
              </small>
            </div>
          ))}
      </OrganizationsList>
      {loading && (
      <p>
        Currently loading...
      </p>
      )}
    </OrganizationSidebar>
  </OrganizationSidebarWrapper>
);

OrganizationDirectory.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  selectOrganization: PropTypes.func.isRequired,
};

OrganizationDirectory.defaultProps = {
  organizations: [],
};

export default OrganizationDirectory;
