import React, { useState, useEffect } from 'react';
import './MatchupPage.css';
import { useLocation } from 'react-router-dom'

function MatchupPage(props) {
    const { state } = useLocation();
    const [expandedBox, setExpandedBox] = useState(null);

    //store matchup data info
    const yearA = state['matchup'][0];
    const teamA = state['matchup'][1];
    const yearB = state['matchup'][2];
    const teamB = state['matchup'][3];

    const [winPrediction, setWinPrediction] = useState(-1);
    const [statPred, setStatPred] = useState({});
    const [pScore, setPScore] = useState('');

    useEffect(() => {
        fetch(`/get_win_prediction?year_a=${yearA}&team_a=${teamA}&year_b=${yearB}&team_b=${teamB}`)
        .then(response => response.json())
        .then(data => {
            setWinPrediction(data['win-prediction']);
            setPScore(data['score']);
        })
        .catch(error => { console.error('Error fetching data:', error); });
    }, [yearA, teamA, yearB, teamB]);
    
    useEffect(() => {
        fetch(`/get_discrete_var_prediction?year_a=${yearA}&team_a=${teamA}&year_b=${yearB}&team_b=${teamB}`)
        .then(response => response.json())
        .then(data => {
            data['prediction']['Block Solos'] = (data['prediction']['Block Solos'] + data['prediction']['Kills'] - data['prediction']['Assists'])/4;
            data['prediction']['Digs'] = data['prediction']['Block Solos'] * 5;
            setStatPred(data['prediction']);
        })
        .catch(error => { console.error('Error fetching data:', error); });
    }, [yearA, teamA, yearB, teamB]);

    //fetch request to get predictions
    //write to result variable in the format below


    const temp = {'winner': ['UC Davis', 2018, 'home'], 'loser': ['UC Davis', 2019, 'away']}

    const boxes = [
        { id: 'winner', title: 'Predicted Result', content: 'Short description of Box 1', details: 'Detailed information about Box 1.' },
        { id: 'offensive', title: 'Offensive + Defensive Insights', content: 'Short description of Box 2', details: 'Detailed information about Box 2.' },
        { id: 'home-team', title: 'Personalized Advice', content: 'Short description of Box 3', details: 'Detailed information about Box 3.' },
    ];

    const handleBoxClick = (boxId) => {
        setExpandedBox(boxId);
    };

    const handleBackClick = () => {
        setExpandedBox(null);
    };

    const offBox = ['Assists', 'Kills', 'Block Solos',  'Digs']

    return (
        <div className='matchup-container'>
            <h1>Matchup</h1>
            <div className={`result-grid ${expandedBox ? 'expanded' : ''}`}>
                {boxes.map((box) => (
                    <div
                        key={box.id}
                        className={`box ${expandedBox === box.id ? 'expanded' : expandedBox ? 'hidden' : ''}`}
                        onClick={() => !expandedBox && handleBoxClick(box.id)}
                    >
                        {expandedBox === box.id && (
                            <>
                                <button className='back-button' onClick={handleBackClick}>←</button>

                                {box.id === 'winner' && (
                                    <div className='result-box'>
                                        <div className='result-box-internal'>
                                            <h4>The winner is ... </h4>
                                            {winPrediction == 1 && (
                                                <>
                                                    <h4 className='big-team'>{teamA} ({yearA})</h4>
                                                    <h4><span style={{color:'green'}}>(Home team)</span></h4>
                                                 </>
                                            )}
                                            {winPrediction == 0 && (
                                                <>
                                                    <h4 className='big-team'>{teamB} ({yearB})</h4>
                                                    <h4><span style={{color:'red'}}>(Away team)</span></h4>
                                                </>
                                            )}
                                        </div>
                                        <div className='vl' />
                                        <div className='result-box-internal'>
                                            <h4> We expect the game to go </h4>
                                            <h4 class='big-num'>{statPred['Sets'] > (5 - statPred['Sets']) ? statPred['Sets'] : 5 - statPred['Sets']}</h4>
                                            <h4>Sets</h4>
                                        </div>
                                        <div>
                                            {winPrediction === 1 && (
                                                <h4></h4>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                {box.id === 'offensive' && (
                                    <div className='stat-box'>
                                        <h4>We expect the statline for {winPrediction == 1 && (
                                                <>
                                                {teamA} ({yearA})
                                                </>
                                            )}
                                            {winPrediction == 0 && (
                                                <>
                                                {teamB} ({yearB})
                                                </>
                                            )} to be</h4>
                                        <div className='stat-box-display'>
                                            {Object.keys(statPred).map((key, index) => (
                                                <div className='stat-box-internal'>
                                                    <p className='big-num'>{statPred[key]}</p>
                                                    <p>{key}</p>
                                                    
                                                </div>
                                            ))}
                                        </div>
                                        <h4>which is <span style={{fontSize: '2rem'}}>{pScore}%</span> better than their opponent </h4>
                                    </div>
                                )}

                                {box.id === 'home-team' && (
                                    <div className='winner-box'>
                                        home-team
                                    </div>
                                )}
                            </>
                        )} 

                        {expandedBox !== box.id && (
                            <div className='min-box'>
                                <>
                                    <h4>{box.title}</h4>
                                </>
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MatchupPage;
