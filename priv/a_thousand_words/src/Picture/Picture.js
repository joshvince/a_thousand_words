import React, { Component } from 'react';
import Modal from '../App/Modal/Modal.js';
import PictureDetails from './PictureDetails.js';

import './Picture.css';

class Picture extends Component {
  constructor(props){
    super(props);
    this.state = {
      reverse: false,
      dimensions: {
        height: 0,
        width: 0
      }
    }
    this.viewImageReverse = this.viewImageReverse.bind(this);
    this.viewImageFront = this.viewImageFront.bind(this);
  }
  viewImageReverse(e){
    e.stopPropagation();
    this.setState({
      reverse: true,
      dimensions:{
        height: this.imgNode.height,
        width: this.imgNode.width
      }
    })
  }
  viewImageFront(e){
    e.stopPropagation();
    this.setState({
      reverse: false
    })
  }
  render() {
    let front = (
      <img 
        src={this.props.picture.image} 
        alt={this.props.picture.name} 
        ref={(imgNode) => {this.imgNode = imgNode; }}
        onClick={e => this.viewImageReverse(e)}
      />
    );
    let rear = (
      <PictureDetails 
        picture={this.props.picture} 
        toggleView={this.viewImageFront}
        dimensions={this.state.dimensions}
      />
    );
    return (
      <Modal dismissAction={this.props.dismissAction} >
        {this.state.reverse ? rear : front}
      </Modal>
    );
  }
}

export default Picture;