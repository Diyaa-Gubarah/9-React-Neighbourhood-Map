import React, {Component} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import Icon from './Icon.js'


const mapStyle = {
  position: 'absolute',
  top: 0,
  right: 0
};

export default class Map extends Component {

  render() {
    return (
      <MapGL
        {...this.props.viewport}
        role="application"
        onError ={() => alert("check your mapbox Access Token")}
        onViewportChange={this.props._updateViewport}
        style={mapStyle}
        width= {this.props.isOpen ? '70%': '100%'}
        height= '100%'
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
        >
            {this.props.positions.map((position,i) =>
              (<Marker
                  key={i}
                  longitude={position.geometry.coordinates[0]}
                  latitude={position.geometry.coordinates[1]}
                >
                   <Icon
                     onClick = {() => this.props.getSelectedLocation(position.geometry.coordinates,position.place_name)}
                     iconClass={this.props.iconClass}
                   />
              </Marker>))
            }
      </MapGL>
    );
  }
}
