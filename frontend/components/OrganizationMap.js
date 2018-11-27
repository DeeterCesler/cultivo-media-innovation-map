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

/**
 * DEFAULT_DU_COORDINATES
 *
 * Default coordinates that pertain to the location of DU's campus.
 *
 * @type {{latitude: number, longitude: number}}
 */
const DEFAULT_DU_COORDINATES = {
  latitude: 39.676654,
  longitude: -104.962203,
};

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
      ...DEFAULT_DU_COORDINATES,
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

  // Allows us to recenter the map on selectedOrganization click
  componentWillReceiveProps = (nextProps) => {
    // If the selected organization does not match the currently selected organization, we want to
    // change the center of the map
    if (this.props.selectedOrganization !== nextProps.selectedOrganization
      && nextProps.selectedOrganization && nextProps.selectedOrganization.location) {
      // Reset the center of the map
      this.setState(state => ({
        ...state,
        viewport: {
          ...state.viewport,
          latitude: nextProps.selectedOrganization.location.lat,
          longitude: nextProps.selectedOrganization.location.lng,
        },
      }));
    }
  }

  render = () => {
    const { organizations, selectOrganization, selectedOrganization } = this.props;
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
              onClick={() => selectOrganization(organization._id)}
              color={selectedOrganization && organization._id === selectedOrganization._id
                ? organization.innovationCategory.color : organization.innovationCategory.bgColor}
            >
              {/* The first two characters of the organization's name */}
              {selectedOrganization && organization._id === selectedOrganization._id
                ? <img src={`static/category_icons/${organization.innovationCategory.image}_white.svg`} alt={organization.innovationCategory.name} />
                : <img src={`static/category_icons/${organization.innovationCategory.image}.svg`} alt={organization.innovationCategory.name} />}
            </OrganizationMapMarker>
          </Marker>
        ))}
      </ReactMapGL>
    );
  }
}
