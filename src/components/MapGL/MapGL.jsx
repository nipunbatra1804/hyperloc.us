import React, { Component } from "react";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class MapGL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 1.3521,
        longitude: 103.8198,
        zoom: 10
      },
      historicSites: {
        sites: []
      },
      popupInfo: null
    };
  }
  _updateViewport = viewport => {
    this.setState({ viewport });
  };
  _renderMarker = (item, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={item.geometry.coordinates[0]}
        latitude={item.geometry.coordinates[1]}
      />
    );
  };

  render() {
    const { sites } = this.state.historicSites;
    return (
      <ReactMapGL
        {...this.state.viewport}
        height={600}
        width={550}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_API_KEY}`}
      >
        {sites.map(this._renderMarker)}
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>
      </ReactMapGL>
    );
  }
}
