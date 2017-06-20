import React from 'react';
import './styles.css';

const FullModal = ({dismissAction, children}) => {
  return(
    // Modals can be dismissed by clicking outside, but not when you click inside
    <div className="modalContainer" onClick={e => {dismissAction()}}>
      <div className="modal" onClick={e => {e.stopPropagation()}}>
        <div className="row">
          <div className="column buttonContainer">
            <div className="float-right dismissButton" onClick={e => {dismissAction()}}>
              close
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            {children}
          </div>
        </div>       
      </div>
    </div>
  );
};

export default FullModal;