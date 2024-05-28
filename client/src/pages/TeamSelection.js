import React from 'react';
import { useState } from 'react';
import TeamSelectionComponent from '../components/TeamSelection';
import DropdownMenu from '../components/DropdownMenu';
import {Link} from 'react-router-dom'

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
        <div>
            <TeamSelectionComponent />
            <DropdownMenu onSelect={handleSetTeam1}/>
            <DropdownMenu onSelect={handleSetTeam2}/>
            {team1.length !== 0 && team2.length !== 0 && (
              <Link to="/stat-dashboard" state={{matchup: team1.concat(team2)}}>
              <button>Go to stats dashboard</button>
            </Link>
            )}
        </div>
    );
};

export default TeamSelection;
