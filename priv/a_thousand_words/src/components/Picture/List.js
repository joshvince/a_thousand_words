import React from 'react';
import {Link} from 'react-router-dom';
import Summary from './Summary.js';

const PictureList = ({list}) => {
  return(
    <div>
      {!list.length ? "" :
        list.map((pic, i) => {
          var url = `/pictures/${pic.id}`;
          return(
            <div className="row" key={i}>
              <div className="column">
                <Link to={url}>
                  <Summary params={pic} />
                </Link>
                
              </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default PictureList;