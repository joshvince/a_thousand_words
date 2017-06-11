import React from 'react';

const Picture = ({params}) => {
  return(
    <div>
      <div className="row">
        <div className="column">
          <h1>{params.name}</h1>
        </div>
      </div>
      <div className="row"> 
        <div className="column">
          <h3>{params.description}</h3>
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

export default Picture;