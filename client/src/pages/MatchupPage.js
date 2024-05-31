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

    useEffect(() => {
        fetch(`/get_win_prediction?year_a=${yearA}&team_a=${teamA}&year_b=${yearB}&team_b=${teamB}`)
        .then(response => response.json())
        .then(data => {
            setWinPrediction(data['win-prediction'])
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
        // { id: 'sets', title: 'Forecasted Num of Sets', content: 'Short description of Box 4', details: 'Detailed information about Box 4.' },
        // { id: 'defensive', title: 'Defensive Insights', content: 'Short description of Box 5', details: 'Detailed information about Box 5.' },
        // { id: 'away-team', title: 'Away Team Tips', content: 'Short description of Box 6', details: 'Detailed information about Box 6.' },
    ];

    const handleBoxClick = (boxId) => {
        setExpandedBox(boxId);
    };

    const handleBackClick = () => {
        setExpandedBox(null);
    };

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
                                    <div className='winner-box'>
                                    </div>
                                )}
                            </>
                        )} 

                        {expandedBox !== box.id && (
                            <div className='min-box'>
                                <>
                                    <h4>{winPrediction} is the result</h4>
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
