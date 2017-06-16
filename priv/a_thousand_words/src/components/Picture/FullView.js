import React from 'react';

const PictureFullView = ({params}) => {
    return (
      <div>
        <div className="row">
          <div className="column">
            <h3>{params.name}</h3>
          </div>
        </div>
        <div className="row"> 
          <div className="column">
            <p>{params.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <p>{params.year}</p>
          </div>
        </div>    
      </div>
    )

}

export default PictureFullView;