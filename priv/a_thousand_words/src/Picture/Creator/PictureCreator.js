import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PictureCreatorForm from './PictureCreatorForm.js';
import Picture from '../Picture.js';
import PictureChannel from '../../Socket/pictureChannel.js';
import PictureParamsDecoder from '../../Encoders/Picture/ParamsDecoder.js';
import './PictureCreator.css';

class PictureCreator extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayForm: true,
      isModalVisible: false,
      activePicture: null
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
    this.resetView = this.resetView.bind(this);
  }
  handleFormSubmit(formParams){
    PictureChannel.createPicture(this.props.channel, formParams)
      .then(createdPicture => {
        this.setState({
          displayForm: false,
          isModalVisible: true,
          activePicture: PictureParamsDecoder.decode(createdPicture)
        })
      })
      .catch(err => {
        console.log("ERROR CREATING PICTURE!")
        this.setState({
          displayForm: true,
          activePicture: null
        })
      })
  }
  dismissModal(){
    this.setState({
      isModalVisible: false
    })
  }
  resetView(){
    this.setState({
      displayForm: true,
      activePicture: null      
    })
  }
  render() {
    let modal = this.state.isModalVisible ? <Picture dismissAction={this.dismissModal} picture={this.state.activePicture} /> : null
    let view = this.state.displayForm ? 
      <PictureCreatorForm submissionHandler={this.handleFormSubmit} /> :
      <div>
        {modal}
        <Link to="/pictures"><h3>View the map</h3></Link>
        <h3 onClick={this.resetView}>Create another picture</h3>
      </div>
    return (
      <div className="column" id="picture-creator">
        {view}
      </div>
    );
  }
}

export default PictureCreator;