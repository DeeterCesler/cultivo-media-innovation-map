import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import OrganizationMap from '../containers/OrganizationMap';
import OrganizationDetails from '../containers/OrganizationDetails';
import OrganizationSearchWrapper from '../containers/OrganizationSearchWrapper';

import Navbar from './Navbar';

/**
 * OrganizationPanelWrapper
 *
 * Wrapper that handles the left section that holds info/directory/categories.
 */
const OrganizationPanelWrapper = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
`;

/**
 * DuLogo
 *
 * Used to absolutely position the DU logo in the bottom right corner.
 */
const DuLogo = styled.div`
  bottom: 20px;
  position: absolute;
  right: 20px;
  img {
    height: 40px;
  }
`;

const App = ({ selectedOrganization }) => (
  <Fragment>
    <Navbar />
    <OrganizationMap
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100vh' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
    <DuLogo>
      <img src="../static/du_logo.svg" alt="DU Logo" />
    </DuLogo>
    <OrganizationPanelWrapper>
      {!selectedOrganization && <OrganizationSearchWrapper />}
      {selectedOrganization && <OrganizationDetails />}
    </OrganizationPanelWrapper>
  </Fragment>
);

App.propTypes = {
  selectedOrganization: PropTypes.shape({
    name: PropTypes.string,
  }),
};

App.defaultProps = {
  selectedOrganization: null,
};

export default App;
