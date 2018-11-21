import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import { OrganizationMapMarker } from './ui';

// We need to read the configuration from the next.config to properly render the map
const { publicRuntimeConfig } = getConfig();

/**
 * DEFAULT_ZOOM
 *
 * The default amount of zoom we want to use when the map renders.
 *
 * @type {number}
 */
const DEFAULT_ZOOM = 14;

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
      zoom: DEFAULT_ZOOM,
    },
  }

  componentDidMount = () => {
    this.setState(state => ({
      ...state,
      viewport: {
        ...state.viewport,
        width: window.innerWidth,
        // We want to set the height of the map to the window height minus the height of the nav
        height: window.innerHeight - 60,
      },
    }));
  }

  /**
   * selectOrg()
   *
   * function
   *
   * Selects a single organization. This does two things:
   * 1. Recenters the map on the organization.
   * 2. Sends a redux action to select an organization.
   */
  selectOrg = (organization) => {
    this.setState(state => ({
      ...state,
      viewport: {
        ...state.viewport,
        latitude: organization.location.lat,
        longitude: organization.location.lng,
        zoom: DEFAULT_ZOOM,
      },
    }));
    this.props.selectOrganization(organization._id);
  }

  render = () => {
    const { organizations, selectedOrganization } = this.props;
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={publicRuntimeConfig.mapboxAccessToken}
      >
        <div style={{ position: 'absolute', right: 20, top: 20 }}>
          <NavigationControl onViewportChange={viewport => this.setState({ viewport })} />
        </div>
        {organizations && organizations.length > 0 && organizations.map(organization => (
          <Marker
            key={organization._id}
            latitude={organization.location.lat}
            longitude={organization.location.lng}
          >
            <OrganizationMapMarker
              onClick={() => this.selectOrg(organization)}
              color={selectedOrganization && organization._id === selectedOrganization._id
                ? organization.innovationCategory.color : organization.innovationCategory.bgColor}
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
