import React from 'react';
import { GoogleMap } from 'react-google-maps';

const OrganizationMap = () => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 39.676654, lng: -104.962203 }}
  />
);

export default OrganizationMap;
