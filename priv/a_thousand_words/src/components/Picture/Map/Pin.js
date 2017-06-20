import React from 'react';
import './styles.css';

const Pin = ({picture, clickHandler}) => {
  return(
    <div className="pin" onClick={e => {clickHandler(picture)}}>
      
    </div>
  )
};

export default Pin;