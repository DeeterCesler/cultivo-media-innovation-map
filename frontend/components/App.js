import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import OrganizationMap from '../containers/OrganizationMap';
import OrganizationDirectory from '../containers/OrganizationDirectory';
import OrganizationDetails from '../containers/OrganizationDetails';
import OrganizationCategories from '../containers/OrganizationCategories';

import Navbar from './Navbar';
import OrganizationCategoryShape from '../shapes/OrganizationCategory';

const OrganizationPanelWrapper = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
`;

// Define the key we use to connect to the google maps API with
const GOOGLE_MAPS_API_KEY = 'AIzaSyDK1dBPOSUadOV-Y-pO1Ke-Yvxs_TYjsq4';

const App = ({ selectedOrganization, selectedCategory }) => (
  <Fragment>
    <Navbar />
    <OrganizationMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100vh' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
    <OrganizationPanelWrapper>
      {!selectedCategory && <OrganizationCategories />}
      {selectedCategory && !selectedOrganization && <OrganizationDirectory />}
      {selectedOrganization && <OrganizationDetails />}
    </OrganizationPanelWrapper>
  </Fragment>
);

App.propTypes = {
  selectedOrganization: PropTypes.shape({
    name: PropTypes.string,
  }),
  selectedCategory: OrganizationCategoryShape,
};

App.defaultProps = {
  selectedOrganization: null,
  selectedCategory: null,
};

export default App;
