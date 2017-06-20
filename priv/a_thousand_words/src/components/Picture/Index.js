import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import PictureList from './List.js';
import PictureFormHandler from './FormHandler.js';

class PictureIndex extends Component {
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
    // List the pictures initially
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

    // reload the list of pictures if something gets deleted or updated
    channel.on("picture_deleted", resp => {
      console.log("received picture deleted message", resp)
      this.setState({
        pictureList: resp.pictures
      })
    })
    channel.on("picture_updated", resp => {
      console.log("received picture updated message", resp)
      this.setState({
        pictureList: resp.pictures
      })
    })
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="column">
            <Link to="/pictures"><h1>Pictures</h1></Link>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <Link to="/pictures/new">Create a new picture</Link>
          </div>
          <div className="column">
            <Link to="/pictures/all">See all pictures</Link>
          </div>
          <div className="column">
            <Link to="/pictures/map">View the map</Link>
          </div>
        </div>
          <Route 
            exact path="/pictures/all" 
            render={(props) => { 
              return <PictureList list={this.state.pictureList} channel={this.state.channel}/> 
            }} 
          />
          <Route 
            exact path="/pictures/new" 
            render={(props) => { 
              return <PictureFormHandler action="create" channel={this.state.channel} /> 
            }} 
          />
      </div>
    );
  }
}

export default PictureIndex;