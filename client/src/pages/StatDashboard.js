import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './StatDashboard.css'

function StatDashboard(props){
    const { state } = useLocation();

    const yearA = state['matchup'][0]
    const teamA = state['matchup'][1]
    const yearB = state['matchup'][2]
    const teamB = state['matchup'][3]

    const [data, setData] = useState({});
    const [rosterA, setRosterA] = useState([])
    const [rosterB, setRosterB] = useState([])


    useEffect(() => {
        fetch(`/get_rosters?year_a=${yearA}&team_a=${teamA}&year_b=${yearB}&team_b=${teamB}`)
        .then(response => response.json())
        .then(data => {
            setData(data);
            setRosterA(data['rosters'][0]);
            setRosterB(data['rosters'][1]);
        })
        .catch(error => {console.error('Error fetching graph:', error);});
    }, [yearA, teamA, yearB, teamB]);

    const params = ['Ht', 'Jersey', 'Player', 'Kills', 'Errors', 'Total Attacks', 'Hit Pct', 'Assists', 'Aces',
        'SErr', 'Digs', 'RErr', 'Block Solos', 'Block Assists', 'BErr', 'PTS',
        'BHE'];



        return (
            <div className='dashboard-container'>
                <div className='dashboard-dropdown-container'>
                <h1>Dashboard</h1> 
                <h2>{teamA} ({yearA})</h2>
                {Object.keys(data).length === 1 && (
                    <table className='dashboard-table'>
                        <thead>
                            <tr>
                                {params.map((param, index) => (
                                    <th key={index}>{param}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rosterA.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {params.map((param, colIndex) => (
                                        <td key={colIndex}>{row[param]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <h2>{teamB} ({yearB})</h2>
                {Object.keys(data).length === 1 && (
                    <table className='dashboard-table'>
                        <thead>
                            <tr>
                                {params.map((param, index) => (
                                    <th key={index}>{param}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rosterB.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {params.map((param, colIndex) => (
                                        <td key={colIndex}>{row[param]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {Object.keys(data).length === 1 && (
                    <Link to="/matchup" state={state}>
                        <button className='matchup-button'>View Matchup</button>
                    </Link>
                )}
                </div>
            </div>
        );
        

};

export default StatDashboard;
