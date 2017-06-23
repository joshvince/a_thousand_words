import React from 'react';
import PictureViewContainer from './PictureViewContainer.js';

const PictureList = ({list}) => {
  return(
    <div>
      {!list.length ? "nothing here" : 
        list.map((pic, i) => {
          return(
            <div className="row">
              <div className="column">
                <PictureViewContainer pictureParams={pic} />
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default PictureList;