import React, { Component } from 'react';
import PictureSummary from './PictureSummary.js';
import PictureChannel from '../Socket/pictureChannel.js';

class PictureEditView extends Component {
  constructor(props){
    super(props)

    this.deletePicture = this.deletePicture.bind(this);
  }
  deletePicture(){
    PictureChannel.deletePicture(this.props.channel, this.props.pictureParams)
  }
  render() {
    return (
      <div>
        <PictureSummary pictureParams={this.props.pictureParams} />
        <button onClick={this.deletePicture}>delete</button>
      </div>
    );
  }
}

export default PictureEditView;