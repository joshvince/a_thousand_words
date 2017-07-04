import React, { Component } from 'react';
import FullModal from '../App/FullModal.js';

import './Picture.css';

class Picture extends Component {
  constructor(props){
    super(props);
    this.state = {
      reverse: false
    }
    this.toggleView = this.toggleView.bind(this);
  }
  toggleView(){
    console.log("Fired")
    let newState = !this.state.reverse
    console.log("new state ", newState)
    this.setState({
      reverse: newState
    })
  }
  //TODO: render a front and a reverse like a photo and change between them on click.
  render() {
    let frontContent = (
      <div className="imgContainer">
        <img src={this.props.picture.image} alt="cage"/>
      </div>
    )
    let rearContent = (
      <div>
        <div className="row">
          <div className="column">
            <h1>{this.props.picture.name}</h1>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h3>{this.props.picture.year}</h3>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <p>{this.props.picture.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="column">
            {this.props.button}
          </div>
        </div>  
      </div>
    )

    return (
      <FullModal dismissAction={this.props.dismissAction}>
        <div onClick={this.toggleView}>
          {this.state.reverse ? rearContent : frontContent}
        </div>
      </FullModal>
    );
  }
}

export default Picture;