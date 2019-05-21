import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import OrganizationCategories from './OrganizationCategories';
import OrganizationDirectory from './OrganizationDirectory';
import SearchInput from './SearchInput';

import { OrganizationSidebar, OrganizationSidebarWrapper, OrganizationSidebarInner } from '../components/ui';

import OrganizationCategoryShape from '../shapes/OrganizationCategory';

const StyledSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const OrganizationSearchWrapper = ({
  searchInputValue,
  selectedCategory,
  selectedOrganization,
}) => (
  <OrganizationSidebarWrapper>
    <OrganizationSidebar>
      <OrganizationSidebarInner>
        <StyledSearchWrapper>
          <SearchInput />
          {(searchInputValue === '' && !selectedCategory && !selectedOrganization)
            && <OrganizationCategories />}
          {(searchInputValue !== '' || (selectedCategory && !selectedOrganization))
            && <OrganizationDirectory searchInputValue={searchInputValue} />}
        </StyledSearchWrapper>
      </OrganizationSidebarInner>
    </OrganizationSidebar>
  </OrganizationSidebarWrapper>
);

OrganizationSearchWrapper.propTypes = {
  selectedCategory: OrganizationCategoryShape,
  selectedOrganization: PropTypes.object,
  searchInputValue: PropTypes.string,
};

OrganizationSearchWrapper.defaultProps = {
  selectedCategory: null,
  selectedOrganization: null,
  searchInputValue: null,
};

const mapStateToProps = ({
  organization: { searchInputValue, selectedCategory, selectedOrganization },
}) => ({
  searchInputValue,
  selectedCategory,
  selectedOrganization,
});

export default connect(mapStateToProps)(OrganizationSearchWrapper);
