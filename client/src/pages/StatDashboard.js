import React from 'react';
import StatDashboardComponent from '../components/StatDashboard';
import { useLocation } from 'react-router-dom';

function StatDashboard(props){
    const { state } = useLocation();

    console.log(state['matchup'])

    return (
        <div>
            <StatDashboardComponent />
        </div>
    );
};

export default StatDashboard;
