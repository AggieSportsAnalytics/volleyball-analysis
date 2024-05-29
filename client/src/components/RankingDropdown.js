import React from 'react'
import { useState, useEffect } from 'react';

function RankingDropdown(){
    const [year, setYear] = useState('');
    const [hasYear, setHasYear] = useState(false);
    const [param, setParam] = useState('');
    const [rankings, setRankings] = useState([]);
     
    const params = ['Kills', 'Errors', 'Total Attacks', 'Hit Pct', 'Assists', 'Aces',
        'SErr', 'Digs', 'RErr', 'Block Solos', 'Block Assists', 'BErr', 'PTS',
        'BHE']

    const handleYearDropdown = (event) => {
        setYear(event.target.value);
        setHasYear(true);
    }

    const handleTeamDropdown = (event) => {
        setParam(event.target.value);
    }

    useEffect(() => {
        if(param && year){
            fetch(`/get_rankings?year=${year}&param=${param}`)
            .then(response => response.json())
            .then(data => setRankings(data['rankings']))
            .catch(error => console.error('there is error: ', error));
        }
    }, [year, param])



    return (
        <>
            <h1>Select year</h1>
            <select value={year} onChange={handleYearDropdown}>
                <option value="" disabled></option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
            </select>


            {hasYear && (
                <div className="teams-dropdown">
                    <h2>Select Team Statistic</h2>
                    <select value={param} onChange={handleTeamDropdown}>
                        <option value="" disabled></option>
                        {params.map((p, index) => (
                            <option key={index} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
            )}
            
            {rankings.length > 0 && (
                <div>
                    <h2>Rankings</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Team</th>
                                <th>{param}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankings.map((ranking, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td> {/* Rank is the index + 1 */}
                                    <td>{ranking[1]}</td> {/* Team */}
                                    <td>{ranking[0]}</td> {/* Value */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


        </>
    )
}

export default RankingDropdown;