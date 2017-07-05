import React, { Component } from 'react';
import PictureSummary from './PictureSummary.js';
import PictureEditView from './PictureEditView.js';

class PictureViewContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewMode: "summary"
    }
    this.changeViewState = this.changeViewState.bind(this);
  }
  changeViewState(newState){
    this.setState({
      viewMode: newState
    })
  }
  render() {
    let viewComponent;
    let button;
    switch (this.state.viewMode) {
      case "edit":
        viewComponent = <PictureEditView pictureParams={this.props.pictureParams} channel={this.props.channel} />
        button = <button onClick={e => this.changeViewState("summary")} > cancel editing</button>
        break;
      default:
        button = <button onClick={e => this.changeViewState("edit")} >edit</button>
        viewComponent = <PictureSummary pictureParams={this.props.pictureParams}/>
        break;
    }
    return (
      <div>
        {viewComponent}
        {button}
      </div>
    );
  }
}

export default PictureViewContainer;