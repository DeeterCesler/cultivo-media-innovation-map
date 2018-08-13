import React from 'react';
import PropTypes from 'prop-types';

import OrganizationDirectory from '../containers/OrganizationDirectory';
import OrganizationDetails from '../containers/OrganizationDetails';

const App = ({ selectedOrganization }) => (
  <div style={{ height: '100%', width: '100%' }}>
    {!selectedOrganization && <OrganizationDirectory />}
    {selectedOrganization && <OrganizationDetails />}
  </div>
);

App.propTypes = {
  selectedOrganization: PropTypes.func,
};

App.defaultProps = {
  selectedOrganization: null,
};

export default App;
