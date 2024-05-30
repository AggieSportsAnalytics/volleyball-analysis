import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavBar from '../components/HomeNavBar';
import Logo from '../graphics/Logo';
import './HomePage.css';
import HomeBackground from '../graphics/HomeBackground'

const HomePage = () => {
  return (
    <div className='home-container'>
      <HomeNavBar />
      <div className='home-content'>
        <h1 className='home-title'>VolleyViz</h1>
        <h2 className='home-subtitle'>A Statistical Simulator</h2>
        <Logo className='home-logo' />
        <Link to="/team-selection">
          <button className='start-button'>START</button>
        </Link>
      </div>
      <div className='outline-shape'>
        <HomeBackground />
      </div>
    </div>
  );
};

export default HomePage;
