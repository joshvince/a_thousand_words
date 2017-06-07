import React, { Component } from 'react';
import Hello from './Hello.js';

import 'milligram';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      world: null
    }
    let channel = this.props.socket.channel("hello:world", {name: "Josh"})
    // We now have a phoenix channel we can join.
    channel.join()
      .receive("ok", resp => { 
        console.log("Joined successfully", resp) 
        this.setState({
          world: resp
        })
      })
      .receive("error", resp => { console.log("Unable to join", resp) })
    // channels take .on(msg, resp()) events 
    // channels can also be pushed to with .push(msg, payload)
    // this.props.channel.on("ping", resp => {
    //   console.log("received a ping")
    // })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <Hello world={this.state.world}/>
        </div>
      </div>
    );
  }
}

export default App;
