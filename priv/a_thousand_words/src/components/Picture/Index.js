import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Picture from './Picture.js';
import PictureList from './List.js';
import PictureFormHandler from './FormHandler.js';

class PictureIndex extends Component {
  constructor(props){
    super(props)
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
          pictureList: resp.pictures
        })
      })
      .receive("error", resp => {
        console.log(`received: ${JSON.stringify(resp)}`)
      })
    this.state ={
      pictureList: [],
      channel: channel
    }
  }
  findById(id, picList){
    picList.find((pic) => {
      return pic.hasOwnProperty("id") && pic.id === id
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
        </div>
          <Route exact path="/pictures/all" render={(props) => { return <PictureList list={this.state.pictureList} /> }} />
          <Route 
            exact path="/pictures/new" 
            render={(props) => { 
              return <PictureFormHandler action="create" channel={this.state.channel} /> 
            }} 
          />
          {/*TODO: 
            - EDIT ROUTE 
            - DELETE ROUTE
          */}
      </div>
    );
  }
}

export default PictureIndex;