import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './StatDashboard.css';

function StatDashboard(props) {
    const { state } = useLocation();

    const yearA = state['matchup'][0];
    const teamA = state['matchup'][1];
    const yearB = state['matchup'][2];
    const teamB = state['matchup'][3];

    const [data, setData] = useState({});
    const [rosterA, setRosterA] = useState([]);
    const [rosterB, setRosterB] = useState([]);
    const [sortConfigA, setSortConfigA] = useState({ key: null, direction: 'none', original: [] });
    const [sortConfigB, setSortConfigB] = useState({ key: null, direction: 'none', original: [] });

    useEffect(() => {
        fetch(`/get_rosters?year_a=${yearA}&team_a=${teamA}&year_b=${yearB}&team_b=${teamB}`)
        .then(response => response.json())
        .then(data => {
            setData(data);
            setRosterA(data['rosters'][0]);
            setRosterB(data['rosters'][1]);
            setSortConfigA({ key: null, direction: 'none', original: data['rosters'][0] });
            setSortConfigB({ key: null, direction: 'none', original: data['rosters'][1] });
        })
        .catch(error => { console.error('Error fetching data:', error); });
    }, [yearA, teamA, yearB, teamB]);

    const params = ['Ht', 'Jersey', 'Player', 'Kills', 'Errors', 'Total Attacks', 'Hit Pct', 'Assists', 'Aces',
        'SErr', 'Digs', 'RErr', 'Block Solos', 'Block Assists', 'BErr', 'PTS', 'BHE'];

    const sortData = (roster, key, direction) => {
        if (direction === 'none') {
            return roster;
        }
        return [...roster].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    const handleColumnClick = (team, param) => {
        if (team === 'A') {
            let direction = 'ascending';
            if (sortConfigA.key === param) {
                if (sortConfigA.direction === 'ascending') {
                    direction = 'descending';
                } else if (sortConfigA.direction === 'descending') {
                    direction = 'none';
                }
            }
            const sortedRoster = direction === 'none' ? sortConfigA.original : sortData(rosterA, param, direction);
            setSortConfigA({ key: param, direction: direction, original: sortConfigA.original });
            setRosterA(sortedRoster);
        } else {
            let direction = 'ascending';
            if (sortConfigB.key === param) {
                if (sortConfigB.direction === 'ascending') {
                    direction = 'descending';
                } else if (sortConfigB.direction === 'descending') {
                    direction = 'none';
                }
            }
            const sortedRoster = direction === 'none' ? sortConfigB.original : sortData(rosterB, param, direction);
            setSortConfigB({ key: param, direction: direction, original: sortConfigB.original });
            setRosterB(sortedRoster);
        }
    };

    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            <div className='dashboard-flex'>
            <div className='dashboard-dropdown-container'>
                <h2>{teamA} ({yearA})</h2>
                {data.rosters && (
                    <table className='dashboard-table'>
                        <thead>
                            <tr>
                                {params.map((param, index) => (
                                    <th
                                        key={index}
                                        className={sortConfigA.key === param ? 'sorted-column' : ''}
                                        onClick={() => handleColumnClick('A', param)}
                                    >
                                        {param}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rosterA.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {params.map((param, colIndex) => (
                                        <td key={colIndex} className={sortConfigA.key === param ? 'sorted-column' : ''}>
                                            {row[param]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <h2>{teamB} ({yearB})</h2>
                {data.rosters && (
                    <table className='dashboard-table'>
                        <thead>
                            <tr>
                                {params.map((param, index) => (
                                    <th
                                        key={index}
                                        className={sortConfigB.key === param ? 'sorted-column' : ''}
                                        onClick={() => handleColumnClick('B', param)}
                                    >
                                        {param}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rosterB.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {params.map((param, colIndex) => (
                                        <td key={colIndex} className={sortConfigB.key === param ? 'sorted-column' : ''}>
                                            {row[param]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
                {data.rosters && (
                    <Link className='link-dashboard' to="/matchup" state={state}>
                        <button className='matchup-button'>→</button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default StatDashboard;
