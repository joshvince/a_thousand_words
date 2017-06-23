import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return(      
    <div>
      <div className="row">
        <div className="column">
          <Link to="/pictures"><h1>A Thousand Words</h1></Link>
        </div>
      </div>      
      <div className="row">
        <div className="column">
          <Link to="/pictures">View the map</Link>
        </div>
        <div className="column">
          <Link to="/pictures/new">Create a new picture</Link>
        </div>
        <div className="column">
          <Link to="/pictures/all">See all pictures</Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;

