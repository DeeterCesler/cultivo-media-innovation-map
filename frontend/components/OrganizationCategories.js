import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { OrganizationSidebar, OrganizationSidebarWrapper } from './ui';
import { colors } from './ui/variables';

const StyledOrganizationCategories = styled.div`
  height: 100%;
  overflow-y: scroll;
  h4 {
    color: ${colors.black};
    font-size: 20px;
    font-weight: 500;
    padding-top: 16px;
  }
`;

const StyledOrganizationCategoryItem = styled.div`
  cursor: pointer;
  padding: 16px 0;
  &:not(:last-child) {
    border-bottom: solid 1px #eee;
  }
  span {
    color: ${colors.gray};
    float: right;
  }
  h5 {
    color: ${colors.black};
    font-size: 16px;
    font-weight: 500;
  }
  p {
    color: ${colors.gray};
  }
`;

const OrganizationCategories = ({ categories, selectCategory }) => (
  <OrganizationSidebarWrapper>
    <OrganizationSidebar>
      <StyledOrganizationCategories>
        <h4>Categories</h4>
        <br />
        {categories && categories.map(category => (
          <StyledOrganizationCategoryItem onClick={() => selectCategory(category)} key={category}>
            <span>
              &rsaquo;
            </span>
            <h5>
              {category}
            </h5>
            <p>
              Lorem ipsum dolor sit amet
            </p>
          </StyledOrganizationCategoryItem>
        ))
        }
      </StyledOrganizationCategories>
    </OrganizationSidebar>
  </OrganizationSidebarWrapper>
);

OrganizationCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectCategory: PropTypes.func.isRequired,
};

export default OrganizationCategories;
