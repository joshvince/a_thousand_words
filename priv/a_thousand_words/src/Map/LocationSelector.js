import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from './Pin.js';

class LocationSelector extends Component {
  constructor(props){
    super(props)
    this.state = {
      pin: false,
      pinLat: null,
      pinLng: null
    }
    this.movePin = this.movePin.bind(this);
  }
  movePin({lat, lng}){
    this.setState({
      pin: true,
      pinLat: lat,
      pinLng: lng
    })
    this.props.onLocationChange([lat,lng]);
  }
  render() {
    let locationPin = this.state.pin ? <Pin lat={this.state.pinLat} lng={this.state.pinLng} /> : null
    return (
      <div id="mapContainer">
        <GoogleMapReact 
          id="map"
          apiKey={"AIzaSyC7ivn_jzMKgf2_LZhHPHxAknOPx_6F28Y"}
          defaultZoom={10}
          center={{lat: 50.82, lng: -0.38 }}
          options={{gestureHandling: 'greedy'}}
          onClick={e => { this.movePin(e) }} 
        >
        {locationPin}
        </GoogleMapReact>
      </div>
    );
  }
}

export default LocationSelector;
