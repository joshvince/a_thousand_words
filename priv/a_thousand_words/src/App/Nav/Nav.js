import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';

const Nav = () => {
  return (
    <div id="nav-container">
      <Link to="/pictures" id="logo">
        1000
      </Link>
      <div id="nav-menu">

        <div>
          <Link to="/pictures">
            Map
          </Link>
        </div>
        <div>
          <Link to="/pictures/new">
            Add
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;