import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  CardTableRow,
  CardTableRowHead,
  CardTableRowSub,
} from 'du-board-design-system';

import {
  CircleLetter,
  Flex,
  Grow,
  Heading,
  OrganizationSidebar,
  OrganizationSidebarWrapper,
} from './ui';

import { colors } from './ui/variables';

const StyledOrganizationDetails = styled.div`
  padding: 16px 0;
`;

const StyledOrganizationDetailsHeader = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px 8px 0 0;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 120px;
  justify-content: flex-end;
  margin: -24px;
  padding: 24px;
  h4 {
    font-size: 20px;
    font-weight: 500;
  }
  p {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const SelectedOrganizationDetailsContent = styled.div`
  padding-top: 48px;
  p {
    color: ${colors.black};
  }
  a {
    color: ${colors.blue};
    text-decoration: none;
    &:hover {
      opacity: .7;
    }
  }
`;

const OrganizationContact = styled.div`
  h5 {
    color: ${colors.black};
    font-size: 16px;
    font-weight: 500;
  }
  p {
    color: ${colors.gray};
    font-size: 16px;
  }
`;

const OrganizationDetails = ({ selectedOrganization, deselectOrganization }) => (
  <OrganizationSidebarWrapper>
    <OrganizationSidebar>
      <StyledOrganizationDetails>
        <StyledOrganizationDetailsHeader>
          <p onClick={deselectOrganization}>
            Close
          </p>
          <h4>
            {selectedOrganization.name}
          </h4>
          <p>
            {selectedOrganization.physicalLocation}
          </p>
        </StyledOrganizationDetailsHeader>
        <SelectedOrganizationDetailsContent>
          <p>
            {selectedOrganization.description}
          </p>
          <br />
          <br />
          <Heading>
            Contact
          </Heading>
          <Flex center>
            <CircleLetter>
              HK
            </CircleLetter>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <OrganizationContact>
              <h5>
                {selectedOrganization.pointOfContact}
              </h5>
              <p>
                {selectedOrganization.pointOfContactEmail}
              </p>
            </OrganizationContact>
          </Flex>
          <br />
          <br />
          <Heading>
            Details
          </Heading>
          <div>
            <CardTableRow>
              <CardTableRowSub>
                Website
              </CardTableRowSub>
              <Grow />
              <CardTableRowHead>
                <a href={selectedOrganization.website} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </CardTableRowHead>
            </CardTableRow>
            <CardTableRow>
              <CardTableRowSub>
                DU Affiliation
              </CardTableRowSub>
              <Grow />
              <CardTableRowHead>
                {selectedOrganization.duAffiliation}
              </CardTableRowHead>
            </CardTableRow>
          </div>
          <br />
          <br />
          <Heading>
            Innovation Description
          </Heading>
          <p>
            {selectedOrganization.innovationDescription}
          </p>
        </SelectedOrganizationDetailsContent>
      </StyledOrganizationDetails>
    </OrganizationSidebar>
  </OrganizationSidebarWrapper>
);

OrganizationDetails.propTypes = {
  selectedOrganization: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  deselectOrganization: PropTypes.func.isRequired,
};

export default OrganizationDetails;
