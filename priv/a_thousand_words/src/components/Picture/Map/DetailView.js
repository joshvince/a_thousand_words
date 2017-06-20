import React from 'react';
import './styles.css';
import FullModal from '../../Modals/FullModal.js';
import CAGE from './cage.png';

const DetailView = ({picture, dismissAction}) => {
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
    </FullModal>
  )
}

export default DetailView;