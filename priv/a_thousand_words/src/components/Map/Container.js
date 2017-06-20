import React, { Component } from 'react';

import Map from './Map.js';
import './styles.css';

class MapContainer extends Component {
  constructor(props){
    super(props)
    let channel = this.props.socket.channel("artifacts:picture", {})
    this.state ={
      pictureList: [],
      channel: channel
    }
    // Join the channel
    channel.join()
      .receive("ok", resp => { 
        console.log("Joined successfully", resp) 
      })
      .receive("error", resp => { console.log("Unable to join", resp) })
    // grab the pictures from the channel
    channel.push("list_pictures")
      .receive("ok", resp => {
        console.log("received", resp)
        this.setState({
          pictureList: resp.pictures
        })
      })
      .receive("error", resp => {
        console.log(`received: ${JSON.stringify(resp)}`)
      })
  }
  render() {
    return (
      <div className="row">
        <div className="column">
          <Map pictures={this.state.pictureList} />
        </div>
        
      </div>
    );
  }
}

export default MapContainer;