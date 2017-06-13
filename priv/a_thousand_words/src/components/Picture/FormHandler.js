import React from 'react';
import PictureForm from './Form.js';

const PictureFormHandler = ({action, channel}) => {
  return <div className="row"> <PictureForm action={action} channel={channel} /></div>
}

export default PictureFormHandler;