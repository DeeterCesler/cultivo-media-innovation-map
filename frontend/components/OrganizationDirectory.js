import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { OrganizationSidebar, OrganizationSidebarWrapper } from './ui/OrganizationSidebar';

import { colors } from './ui/variables';
import { BackButton } from './ui';

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

const SelectedCategoryHeader = styled.div`
  color: ${colors.black};
  font-size: 16px;
  padding: 16px 0;
  b {
    color: ${colors.blue};
  }
  span {
    color: ${colors.gray};
    cursor: pointer;
    float: right;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const OrganizationDirectory = ({
  organizations,
  loading,
  selectOrganization,
  selectedCategory,
  deselectCategory,
}) => (
  <OrganizationSidebarWrapper>
    <OrganizationSidebar>
      <OrganizationsList>
        <SelectedCategoryHeader>
          Selected Category:
          <b>
            &nbsp;
            {selectedCategory}
          </b>
          <BackButton onClick={deselectCategory}>
            Back
          </BackButton>
        </SelectedCategoryHeader>
        {organizations
          && organizations.map(organization => (
            <div
              key={organization._id} // eslint-disable-line
              onClick={() => selectOrganization(organization._id)}
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
  selectedCategory: PropTypes.string.isRequired,
  deselectCategory: PropTypes.func.isRequired,
};

OrganizationDirectory.defaultProps = {
  organizations: [],
};

export default OrganizationDirectory;
