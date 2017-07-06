import React from 'react';
import './Picture.css';

const PictureDetails = ({picture, toggleView, dimensions}) => {
  return (
    <div 
      onClick={e => toggleView(e)} 
      style={{width: dimensions.width, height: dimensions.height}}
      className="detailsModal"
    >
      <p className="title">{picture.name}</p>
      <p className="year">{picture.year}</p>
      <p>{picture.description}</p>
    </div>
  );
};

export default PictureDetails;