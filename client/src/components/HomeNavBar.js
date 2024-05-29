import React from 'react';
import { Link } from 'react-router-dom';

function HomeNavBar() {
  return (
    <nav className="home-nav-bar">
    <Link to="/rankings" className="nav-link">RANKINGS</Link>
      <Link to="/about" className="nav-link">ABOUT</Link>
    </nav>
  );
}

export default HomeNavBar;
