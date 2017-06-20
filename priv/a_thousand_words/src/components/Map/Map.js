import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from '../Picture/Map/Pin.js';
import DetailView from '../Picture/Map/DetailView.js';
import './styles.css';

class Map extends Component {
  constructor(props){
    super(props)
    this.state = {
      pictureActive: false,
      activePicture: {}
    }
    this.setActivePicture = this.setActivePicture.bind(this);
    this.removeActivePicture = this.removeActivePicture.bind(this);
  }
  setActivePicture(picture){
    this.setState({
      pictureActive: true,
      activePicture: picture
    })
  }
  removeActivePicture(){
    this.setState({
      pictureActive: false,
      activePicture: {}
    })
  }
  render() {
    let activePicture = (this.state.pictureActive) ? 
      <DetailView picture={this.state.activePicture} dismissAction={this.removeActivePicture}/> : null
    return(
      <div>
        {activePicture}
        <div id="mapContainer">
          <GoogleMapReact 
            id="map"
            apiKey={"AIzaSyC7ivn_jzMKgf2_LZhHPHxAknOPx_6F28Y"}
            defaultZoom={13}
            defaultCenter={{lat: 50.82, lng: -0.38 }} 
          >
            {this.props.pictures.map((pic, i)=> {
              return(
                <Pin 
                picture={pic} 
                lat={pic.location.coordinates[0]} 
                lng={pic.location.coordinates[1]} 
                key={i} 
                clickHandler={this.setActivePicture}
                />);
            })}
            
          </GoogleMapReact>
        </div> 
      </div>
   
    );
  }
}

export default Map;