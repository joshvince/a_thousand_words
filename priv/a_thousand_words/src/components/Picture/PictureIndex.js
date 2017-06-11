import React, { Component } from 'react';
import Picture from './Picture.js';

class PictureIndex extends Component {
  constructor(props){
    super(props)
    this.state ={
      pictures: []
    }
    let channel = this.props.socket.channel("artifacts:picture", {})
    channel.join()
      .receive("ok", resp => { 
        console.log("Joined successfully", resp) 
      })
      .receive("error", resp => { console.log("Unable to join", resp) })
    channel.push("list_pictures")
      .receive("ok", resp => {
        console.log("received", resp)
        this.setState({
          pictures: resp.pictures
        })
      })
      .receive("error", resp => {
        console.log(`received: ${JSON.stringify(resp)}`)
      })
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="column">
            <h1>Pictures</h1>
          </div>
        </div>
        <div className="row">
          {this.state.pictures.map((picture, i) => {
            return( <Picture params={picture} key={i} /> )
          })}
        </div>
      </div>
      
    );
  }
}

export default PictureIndex;