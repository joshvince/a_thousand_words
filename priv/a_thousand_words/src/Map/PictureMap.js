import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from './Pin.js';
import Picture from '../Picture/Picture.js';
import './PictureMap.css';

class PictureMap extends Component {
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
  clicker({x, y, lat, lng, event}){
    console.log(lat, lng)
  }
  render() {
    let activePicture = (this.state.pictureActive) ? 
      <Picture picture={this.state.activePicture} dismissAction={this.removeActivePicture} button={null}/> 
      : null
    return(
      <div>
        {activePicture}
        <div id="mapContainer">
          <GoogleMapReact 
            id="map"
            bootstrapURLKeys={{
              key: "AIzaSyC7ivn_jzMKgf2_LZhHPHxAknOPx_6F28Y"
            }}
            defaultZoom={10}
            center={{lat: 50.82, lng: -0.38 }}
            onClick={this.clicker} 
          >
            {this.props.pictureList.map((pic, i)=> {
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

export default PictureMap;