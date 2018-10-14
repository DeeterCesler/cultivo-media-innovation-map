import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import OrganizationMap from '../containers/OrganizationMap';
import OrganizationDirectory from '../containers/OrganizationDirectory';
import OrganizationDetails from '../containers/OrganizationDetails';

import Navbar from './Navbar';

const OrganizationPanelWrapper = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
`;

// Define the key we use to connect to the google maps API with
const GOOGLE_MAPS_API_KEY = 'AIzaSyDK1dBPOSUadOV-Y-pO1Ke-Yvxs_TYjsq4';

const App = ({ selectedOrganization }) => (
  <Fragment>
    <Navbar />
    <OrganizationMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100vh' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
    <OrganizationPanelWrapper>
      {!selectedOrganization && <OrganizationDirectory />}
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
