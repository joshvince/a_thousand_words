import React, { Component } from 'react';
import PictureFullView from './FullView.js';
import PictureEditView from './EditView.js';

class PictureContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      mode: "view"
    }
    this.changeViewState = this.changeViewState.bind(this);
  }
  changeViewState(newState){
    this.setState({
      mode: newState
    })
  }
  decodeParams(params){

  }
  render() {
    let comp;
    let button;
    switch (this.state.mode) {
      case "view":
        comp = <PictureFullView params={this.props.params} />
        button = <button onClick={e => this.changeViewState("edit")} >edit</button>
        break;
      case "edit":
        comp = <PictureEditView params={this.props.params} channel={this.props.channel} />
        button = <button onClick={e => this.changeViewState("view")} > cancel editing</button>
        break;
      default:
        comp = <PictureFullView params={this.props.params} />
        button = <button onClick={e => this.changeViewState("edit")} >edit</button>
        break;
    }

    return (
      <div>
        {comp}
        {button}
      </div>
    );
  }
}

export default PictureContainer;
