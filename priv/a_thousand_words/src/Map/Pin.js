import React from 'react';
import './Pin.css';

const Pin = ({picture, clickHandler}) => {
  return(
    <div className="pin" onClick={e => {clickHandler(picture)}}>
      
    </div>
  )
};

export default Pin;