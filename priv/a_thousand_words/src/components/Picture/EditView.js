import React from 'react';
import ParamsEncoder from '../../encoders/Picture/ParamsEncoder.js';

const deletePicture = (e, id, channel) => {
  e.preventDefault();
  channel.push("delete_picture", {id: id})
    .receive("ok", resp => {
      console.log("Deleted and received", resp)
    })
};

const updatePicture = (e, params, id, channel) => {
  e.preventDefault();
  let payload = {id: id, params: ParamsEncoder.encode(params)};
  channel.push("update_picture", payload)
    .receive("ok", resp => {
      console.log("picture updated, received", resp)
    })
}

const PictureEditView = ({params, channel}) => {
  console.log(params)
  return( 
    <div>
      <h3>{params.name}</h3>
      Edit Form
      <button onClick={e => deletePicture(e, params.id, channel)}>delete</button>
      <button onClick={e => updatePicture(e, params, params.id, channel)}>update</button>
    </div>
  )
};

export default PictureEditView;