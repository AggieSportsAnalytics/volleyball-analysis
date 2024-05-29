import React from 'react';
import StatDashboardComponent from '../components/StatDashboard';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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


    return (
        <>
            <StatDashboardComponent />
            <h2>{teamA} ({yearA})</h2>
            {Object.keys(data).length === 1 &&(
                <table>
                <thead>
                    <tr>
                        {Object.keys(rosterA[0]).map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rosterA.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            <h2>{teamB} ({yearB})</h2>
            {Object.keys(data).length === 1 &&(
                <table>
                <thead>
                    <tr>
                        {Object.keys(rosterB[0]).map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rosterB.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            {Object.keys(data).length === 1 && (
                <Link to="/matchup" state={ state }>
                    <button>View Matchup</button>
                </Link>
            )}
        </>
    );

};

export default StatDashboard;
