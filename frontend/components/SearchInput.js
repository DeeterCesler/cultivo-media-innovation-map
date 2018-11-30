import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from './ui/variables';
import { BackButton } from './ui';

import OrganizationCategoryShape from '../shapes/OrganizationCategory';

const StyledSearchInput = styled.div`
  border-bottom: solid 1px ${colors.snow};
  display: flex;
  margin-bottom: 8px;
  min-height: 40px;
  padding: 16px 0 24px 0;
  input {
    background-color: ${colors.snow};
    border: none;
    border-radius: 4px;
    color: ${colors.black};
    font-size: 16px;
    padding: 8px;
    width: calc(100% - 16px);
    &:focus {
      outline: none;
    }
  }
`;

const SearchInput = ({
  searchInputUpdate,
  searchInputValue,
  selectedCategory,
  deselectCategory,
}) => (
  <StyledSearchInput>
    <input
      placeholder="Search for a resource"
      value={searchInputValue}
      onChange={e => searchInputUpdate(e.target.value)}
    />
    
    {(searchInputValue || selectedCategory) && (
      <Fragment>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <BackButton onClick={deselectCategory}>
          Back
        </BackButton>
      </Fragment>
    )}
  </StyledSearchInput>
);

SearchInput.propTypes = {
  searchInputUpdate: PropTypes.func.isRequired,
  searchInputValue: PropTypes.string,
  selectedCategory: OrganizationCategoryShape,
  deselectCategory: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  selectedCategory: null,
  searchInputValue: '',
};

export default SearchInput;
