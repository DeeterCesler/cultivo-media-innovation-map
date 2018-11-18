import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from './ui/variables';

const StyledSearchInput = styled.div`
  border-bottom: solid 1px ${colors.snow};
  margin-bottom: 8px;
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

const SearchInput = ({ searchInputUpdate }) => (
  <StyledSearchInput>
    <input placeholder="Search for a resource" onChange={e => searchInputUpdate(e.target.value)} />
  </StyledSearchInput>
);

SearchInput.propTypes = {
  searchInputUpdate: PropTypes.func.isRequired,
};

export default SearchInput;
