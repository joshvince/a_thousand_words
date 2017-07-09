import React, { Component } from 'react';
import LocationSelector from '../../Map/LocationSelector.js';
import ParamsEncoder from '../../Encoders/Picture/ParamsEncoder.js';
import PictureChannel from '../../Socket/pictureChannel.js';
import './PictureCreator.css';

class PictureCreator extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      image: {},
      description: "",
      year: "",
      location: "unkown"
    }
    this.setLocation = this.setLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFileSelect = this.onFileSelect.bind(this);
    this.requiredFieldsPresent = this.requiredFieldsPresent.bind(this);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
  }
  handleInputChange(e){
    const target = e.target;
    const name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    //convert the year to an integer
    if (name === "year") {
      value = parseInt(value, 10)
    }
    this.setState({
      [name]: value
    })
  }
  onFileSelect(){
    // grab the file from the form
    let fileInput = document.getElementById("userImg");
    let file = fileInput.files[0];
    // create a new FileReader to handle the binary
    let reader = new FileReader();
    // on the load event, create a payload featuring the binary and add to the state
    reader.addEventListener("load", () => {
      let payload = {
        binary: reader.result.split(",", 2)[1],
        filename: file.name
      }
      this.setState({
        image: payload
      })
    }, false)
    reader.readAsDataURL(file)
  }
  requiredFieldsPresent(state){
    return state.name.length > 1 && state.year > 1801 && state.image.hasOwnProperty("filename");
  }
  handleCreateSubmit(e){
    console.log("fired create submit")
    e.preventDefault()
    var params = ParamsEncoder.encode(this.state)
    PictureChannel.createPicture(this.props.channel, params)
  }
  setLocation(locationParams){
    this.setState({
      location: locationParams
    })
  }
  render() {
    var ready = !this.requiredFieldsPresent(this.state)

    return (
      <div className="column" id="picture-creator">
        <h3>Create a new picture</h3>
        <form onSubmit={this.handleCreateSubmit}>
          <fieldset>
          <label htmlFor="image">Image *</label>
          <input id="userImg" type="file" name="image" accept="image/*" onChange={this.onFileSelect}/>  
          <label htmlFor="name">Name *</label>
          <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange}/>
          <label htmlFor="description">Description</label>
          <textarea type="text" value={this.state.description} name="description" onChange={this.handleInputChange}/>
          <label htmlFor="year">Year *</label>
          <input type="number" value={this.state.year} name="year" onChange={this.handleInputChange}/>
          <label htmlFor="location">Location</label>
          <LocationSelector onLocationChange={this.setLocation}/>
          <input id="submit-button" className="button-primary" type="submit" value="Create" disabled={ready}/>
          </fieldset>
        </form>   
      </div>
    );
  }
}

export default PictureCreator;