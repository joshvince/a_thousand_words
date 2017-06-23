import React from 'react';
import './Picture.css';
import FullModal from '../App/FullModal.js';
import CAGE from './cage.png';

const Picture = ({picture, button, dismissAction}) => {
  return(
    <FullModal dismissAction={dismissAction}>
      <div className="row">
        <div className="column imgContainer">
          <img src={CAGE} alt="cage"/>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <h1>{picture.name}</h1>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <h3>{picture.year}</h3>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <p>{picture.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="column">
          {button}
        </div>
      </div>          
    </FullModal>
  )
}

export default Picture;