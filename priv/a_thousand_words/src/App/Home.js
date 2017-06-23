import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return(
    <div>
      <div className="row">
        <div className="column">
          <h1>A Thousand Words</h1>
        </div>
      </div>
      <div className="row">
        <Link to="/pictures"><h2>Pictures</h2></Link>
      </div>
    </div>

  )
  
}

export default Home;