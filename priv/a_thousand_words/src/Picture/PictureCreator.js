import React, { Component } from 'react';
import LocationSelector from '../Map/LocationSelector.js';
import ParamsEncoder from '../Encoders/Picture/ParamsEncoder.js';
import PictureChannel from '../Socket/pictureChannel.js';

class PictureCreator extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      description: "",
      year: "",
      location: "unkown"
    }
    this.setLocation = this.setLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
  requiredFieldsPresent(name, year){
    return name.length > 1 && year > 1801;
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
    var ready = !this.requiredFieldsPresent(this.state.name, this.state.year)
    return (
      <div className="column">
        <h3>Create a new picture</h3>
        <form onSubmit={this.handleCreateSubmit}>
          <fieldset>
          <label htmlFor="name">Name *</label>
          <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange}/>
          <label htmlFor="description">Description</label>
          <textarea type="text" value={this.state.description} name="description" onChange={this.handleInputChange}/>
          <label htmlFor="year">Year *</label>
          <input type="number" value={this.state.year} name="year" onChange={this.handleInputChange}/>
          <label htmlFor="location">Co-ordinates</label>
          <LocationSelector onLocationChange={this.setLocation}/>
          <input className="button-primary" type="submit" value="Submit" disabled={ready}/>
          </fieldset>
        </form>   
      </div>
    );
  }
}

export default PictureCreator;