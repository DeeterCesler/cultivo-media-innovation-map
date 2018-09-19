import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { OrganizationMapMarker } from './ui';

export default class OrganizationMap extends Component {
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

  render = () => (
    <ReactMapGL
      {...this.state.viewport}
      id="test"
      onViewportChange={viewport => this.setState({ viewport })}
    >
      <Marker latitude={39.676654} longitude={-104.962203}>
        <OrganizationMapMarker onClick={console.log('test1')}>
          En
        </OrganizationMapMarker>
      </Marker>
    </ReactMapGL>
  )
}
