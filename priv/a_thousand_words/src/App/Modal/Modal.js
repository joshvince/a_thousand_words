import React from 'react';
import './Modal.css';

const Modal = ({dismissAction, children}) => {
  return (
    <div className="modalBackdrop" onClick={e => dismissAction()}>
      {children}
    </div>
  );
};

export default Modal;