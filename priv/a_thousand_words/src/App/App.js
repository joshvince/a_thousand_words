// Import dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'milligram';

// Import components and styles
import Nav from './Nav/Nav.js';
import PictureMap from '../Map/PictureMap.js';
import PictureCreator from '../Picture/PictureCreator.js';
import PictureList from '../Picture/PictureList.js';
import './App.css';

// Import other helper modules
import PictureChannel from '../Socket/pictureChannel.js';
import PicParamsDecoder from '../Encoders/Picture/ParamsDecoder.js';

class App extends Component {
  constructor(props){
    super(props)
    let channel = PictureChannel.join(this.props.socket)
    this.state = {
      channel: channel,
      pictureList: []
    }
  }
  componentDidMount(){
    PictureChannel.listPictures(this.state.channel)
      .then(pics => {
        let decodedPics = pics.map((pic) => { return PicParamsDecoder.decode(pic)})
        this.setState({pictureList: decodedPics})
    })
    // any updates from the channel will trigger a re-render of every child component for now...
    this.state.channel.on("picture_created", resp => {
      console.log("received picture created message", resp)
      this.setState({
        pictureList: resp.pictures
      })
    })
    this.state.channel.on("picture_deleted", resp => {
      console.log("received picture deleted message", resp)
      this.setState({
        pictureList: resp.pictures
      })
    })
    this.state.channel.on("picture_updated", resp => {
      console.log("received picture updated message", resp)
      this.setState({
        pictureList: resp.pictures
      })
    })
  }
  render() {
    return (
      <Router>
        <div id="appContainer">
          <Route path="/" component={Nav}/>
          <div className="container" id="contentContainer">
            <Route 
              exact path="/pictures" 
              render={(props) => { return <PictureMap pictureList={this.state.pictureList} />}}
            />
            <Route 
              exact path="/pictures/new"
              render={(props) => { return <PictureCreator channel={this.state.channel} />}}
            />
            <Route 
              exact path="/pictures/edit"
              render={(props) => { return <PictureList list={this.state.pictureList} channel={this.state.channel}/>}}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
