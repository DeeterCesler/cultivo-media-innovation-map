import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledOrganizationDetails = styled.div`
`;

const OrganizationDetails = ({ selectedOrganization }) => (
  <StyledOrganizationDetails>
    {selectedOrganization.name}
  </StyledOrganizationDetails>
);

OrganizationDetails.propTypes = {
  selectedOrganization: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default OrganizationDetails;
