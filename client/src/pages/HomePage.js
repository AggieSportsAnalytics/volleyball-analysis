import React from 'react';
import HomePageComponent from '../components/HomePage';
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
      <div>
          <HomePageComponent />
          <Link to="/team-selection">
                <button>Start</button>
            </Link>
      </div>
  );
};

export default HomePage;
