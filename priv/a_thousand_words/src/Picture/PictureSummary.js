import React from 'react';

const PictureSummary = ({pictureParams}) => {
  return(
    <div>
      <div>{pictureParams.name}</div>
      <div>{pictureParams.year}</div>
    </div>

  )
};

export default PictureSummary;

