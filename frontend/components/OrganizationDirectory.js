import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledOrganizationDirectory = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  height: 100%;
  padding: 8px 24px;
  width: 100%;
`;

const StyledOrganizationDirectoryWrapper = styled.div`
  height: calc(100vh - 96px);
  padding: 40px;
  width: 360px;
`;

const OrganizationsList = styled.div`
  height: 100%;
  overflow-y: scroll;
  .organization-list-item {
    cursor: pointer;
    padding: 16px 0;
    &:not(:last-child) {
      border-bottom: solid 1px #eee;
    }
  }
`;

const OrganizationDirectory = ({
  organizations,
  loading,
  selectOrganization,
}) => (
  <StyledOrganizationDirectoryWrapper>
    <StyledOrganizationDirectory>
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
    </StyledOrganizationDirectory>
  </StyledOrganizationDirectoryWrapper>
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
