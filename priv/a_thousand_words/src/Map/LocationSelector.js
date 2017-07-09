import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from './Pin.js';
import './LocationSelector.css';
import googleMapStyles from './MapStyles.json';

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
    let locationPin = this.state.pin ? 
        <Pin 
          lat={this.state.pinLat} 
          lng={this.state.pinLng} 
          clickHandler={e => {return null}}
        /> : 
        null
    return (
      <div id="mapContainer">
        <GoogleMapReact 
          id="map"
          bootstrapURLKeys={{
            key: "AIzaSyC7ivn_jzMKgf2_LZhHPHxAknOPx_6F28Y"
          }}          
          defaultZoom={7}
          center={{lat: 50.82, lng: -0.38 }}
          options={{gestureHandling: 'greedy', styles: googleMapStyles}}
          onClick={e => { this.movePin(e) }} 
        >
        {locationPin}
        </GoogleMapReact>
      </div>
    );
  }
}

export default LocationSelector;
