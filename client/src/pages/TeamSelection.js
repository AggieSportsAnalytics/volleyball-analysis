import React from 'react';
import { useState } from 'react';
import DropdownMenu from '../components/DropdownMenu';
import {Link} from 'react-router-dom'
import './TeamSelection.css'

const TeamSelection = (props) => {
  const [team1, setTeam1] = useState([])
  const [team2, setTeam2] = useState([])

  const handleSetTeam1 = (value) => {
    setTeam1(value)
  }
  
  const handleSetTeam2 = (value) => {
    setTeam2(value)
  }

    return (
        <div className='selection-container'>
          <h1>Team Selection</h1>
          <div className='menu-container'>
            <DropdownMenu onSelect={handleSetTeam1} teamNo = {1}/>
            <DropdownMenu onSelect={handleSetTeam2} teamNo = {2}/>
          </div>  
          {team1.length !== 0 && team2.length !== 0 && (
              <Link to="/stat-dashboard" state={{matchup: team1.concat(team2)}}>
                <button className='dashboard-button'>Go to dashboard</button>
              </Link>
            )}
        </div>
    );
};

export default TeamSelection;
