import React from 'react';
import PictureContainer from './Container.js';
import ParamsDecoder from '../../encoders/Picture/ParamsDecoder.js';

const PictureList = ({list, channel}) => {
  return(
    <div>
      {!list.length ? "no pictures here" :
        list.map((pic, i) => {
          let picParams = ParamsDecoder.decode(pic)
          return(
            <div className="row" key={i}>
              <div className="column">
                <PictureContainer params={picParams} channel={channel} />
              </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default PictureList;