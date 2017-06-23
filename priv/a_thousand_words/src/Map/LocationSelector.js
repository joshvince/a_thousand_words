import React from 'react';
import GoogleMapReact from 'google-map-react';
import './LocationSelector.css';

const parseLocation = ({lat, lng}, clickHandler) => {
  clickHandler([lat,lng])
};

const LocationSelector = ({clickHandler}) => {
  return(
    <div id="mapContainer">
      <GoogleMapReact 
        id="map"
        apiKey={"AIzaSyC7ivn_jzMKgf2_LZhHPHxAknOPx_6F28Y"}
        defaultZoom={10}
        center={{lat: 50.82, lng: -0.38 }}
        options={{gestureHandling: 'greedy'}}
        onClick={e => { parseLocation(e, clickHandler) }} 
      />
    </div>
  );
};

export default LocationSelector;