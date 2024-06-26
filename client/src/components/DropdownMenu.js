import React from 'react'
import { useState, useEffect } from 'react';

function DropdownMenu({onSelect, teamNo}){
    const [yearDropdown, setYearDropdown] = useState('');
    const [showTeamDropdown, setShowTeamDropdown] = useState(false);
    const [teamDropdown, setTeamDropdown] = useState('');
    const [schools, setSchools] = useState([]);

    const handleYearDropdown = (event) => {
        setYearDropdown(event.target.value);
        setShowTeamDropdown(true);
    }

    const handleTeamDropdown = (event) => {
        setTeamDropdown(event.target.value);
        onSelect([yearDropdown, event.target.value]);
    }

    useEffect(() => {
        if (yearDropdown) {
            fetch(`/get_schools?year=${yearDropdown}`)
                .then(response => response.json())
                .then(data => setSchools(data))
                .catch(error => console.error('Error fetching schools:', error));
        }
    }, [yearDropdown]);

    return (
        <div className='dropdown-container'>
            <h2>Select year for {teamNo === "home" && (<span style={{color:"green"}}>home team</span>)}
                    {teamNo === "away" && (<span style={{color:"red"}}>away team</span>)}</h2>
            <select value={yearDropdown} onChange={handleYearDropdown}>
                <option value="" disabled></option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
            </select>

            <div className="teams-dropdown">
                {showTeamDropdown && (
                    <div className="teams-dropdown">
                    <h2>Select school for {teamNo === "home" && (<span style={{color:"green"}}>home team</span>)}
                    {teamNo === "away" && (<span style={{color:"red"}}>away team</span>)}</h2>
                    <select value={teamDropdown} onChange={handleTeamDropdown}>
                        <option value="" disabled>Select school</option>
                        {schools.map((school, index) => (
                            <option key={index} value={school}>{school}</option>
                        ))}
                    </select>
                </div>
                )}
            </div>

        </div>
    )
}

export default DropdownMenu;