import React from 'react';
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <h1>VolleyViz</h1>
      <Link to="/team-selection">
                <button>Start</button>
            </Link>
    </>
  );
};

export default HomePage;
