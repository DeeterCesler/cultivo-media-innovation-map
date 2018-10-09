import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import ReactMapGL, { Marker } from 'react-map-gl';
import { OrganizationMapMarker } from './ui';

// We need to read the configuration from the next.config to properly render the map
const { publicRuntimeConfig } = getConfig();

export default class OrganizationMap extends Component {
  static propTypes = {
    organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectOrganization: PropTypes.func.isRequired,
    selectedOrganization: PropTypes.object,
  }

  static defaultProps = {
    selectedOrganization: null,
  }

  state = {
    viewport: {
      latitude: 39.676654,
      longitude: -104.962203,
      zoom: 14,
    },
  }

  componentDidMount = () => {
    this.setState(state => ({
      ...state,
      viewport: {
        ...state.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }));
  }

  render = () => {
    const { organizations, selectOrganization, selectedOrganization } = this.props;
    return (
      <ReactMapGL
        {...this.state.viewport}
        id="test"
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={publicRuntimeConfig.mapboxAccessToken}
      >
        {organizations && organizations.length > 0 && organizations.map(organization => (
          <Marker
            key={organization._id}
            latitude={organization.location.lat}
            longitude={organization.location.lng}
          >
            <OrganizationMapMarker
              onClick={() => selectOrganization(organization._id)}
              active={selectedOrganization && organization._id === selectedOrganization._id}
            >
              {/* The first two characters of the organization's name */}
              {organization.name.substring(0, 2)}
            </OrganizationMapMarker>
          </Marker>
        ))}
      </ReactMapGL>
    );
  }
}
