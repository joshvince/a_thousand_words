import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'milligram';

import Home from './components/Home/Home.js';
import PictureIndex from './components/Picture/Index.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Home}/>
          <Route path="/pictures" render={(props) => { return <PictureIndex socket={this.props.socket} />}}/>
        </div>
      </Router>
    );
  }
}

export default App;
