import React from 'react';

const Summary = ({params}) => {
  return(
    <div>
      <h3>{params.name}</h3>
      <p>{params.year}</p>
    </div>
  )
}

export default Summary;