import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import { OrganizationMapMarker, RealignMapMarker, RealignMapMarkerContainer } from './ui';

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

/**
 * DEFAULT_DU_COORDINATES
 *
 * Default coordinates that pertain to the location of central Denver.
 *
 * @type {{latitude: number, longitude: number}}
 */
const DEFAULT_DENVER_COORDINATES = {
  latitude: 39.748793,
  longitude: -104.994479,
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

  /**
   * changeCenterLocation()
   *
   * function
   *
   * Allows us to realign the map to a new center. Moves us to either Denver or DU.
   */
  changeCenterLocation = (newCenter) => {
    switch (newCenter) {
      case 'DU':
        this.setState(state => ({
          ...state,
          viewport: {
            ...state.viewport,
            ...DEFAULT_DU_COORDINATES,
            // Reset the zoom too
            zoom: DEFAULT_ZOOM,
          },
        }));
        break;
      case 'Denver':
        this.setState(state => ({
          ...state,
          viewport: {
            ...state.viewport,
            ...DEFAULT_DENVER_COORDINATES,
            // Reset the zoom too
            zoom: DEFAULT_ZOOM,
          },
        }));
        break;
      default:
        break;
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
        <RealignMapMarkerContainer>
          <RealignMapMarker onClick={() => this.changeCenterLocation('DU')}>
            View DU
          </RealignMapMarker>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RealignMapMarker onClick={() => this.changeCenterLocation('Denver')}>
            View Denver
          </RealignMapMarker>
        </RealignMapMarkerContainer>
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
