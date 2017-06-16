import React, { Component } from 'react';
import ParamsEncoder from '../../encoders/Picture/ParamsEncoder.js';

class PictureForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      description: "",
      year: "",
      location: "unkown"
    }
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
    e.preventDefault()
    var params = ParamsEncoder.encode(this.state)
    this.props.channel.push("create_picture", {params: params})
      .receive("ok", resp => {
        console.log(resp)
      })
  }
  render() {
    var ready = !this.requiredFieldsPresent(this.state.name, this.state.year)
    return(
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
          <label htmlFor="location">Co-Ordinates</label>
          <select value={this.state.location} name="location" onChange={this.handleInputChange}>
            <option value="unknown">Unknown</option>
            <option value="-0.3835451602935791,50.82964541856058">Lavington Road</option>
            <option value="-0.3796827793121338,50.82412213350127">South Farm Road</option>
            <option value="-0.3965163230895996,50.825389497165254">Terringes Avenue</option>
          </select>
          <input className="button-primary" type="submit" value="Submit" disabled={ready}/>
          </fieldset>
        </form>   
      </div>
    );
  }
}

export default PictureForm;