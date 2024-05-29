import React from 'react';
import {Link} from 'react-router-dom'
import HomeNavBar from '../components/HomeNavBar';

const HomePage = () => {
  return (
    <>
      <HomeNavBar />
      <h1>VolleyViz</h1>
      <Link to="/team-selection">
                <button>Start</button>
            </Link>
    </>
  );
};

export default HomePage;
