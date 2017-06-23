import React from 'react';
import PictureViewContainer from './PictureViewContainer.js';

const PictureList = ({list, channel}) => {
  return(
    <div>
      {!list.length ? "nothing here" : 
        list.map((pic, i) => {
          return(
            <div className="row" key={i}>
              <div className="column">
                <PictureViewContainer pictureParams={pic} channel={channel}/>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default PictureList;