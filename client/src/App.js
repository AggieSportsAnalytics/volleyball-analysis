import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TeamSelection from './pages/TeamSelection';
import StatDashboard from './pages/StatDashboard';
import MatchupPage from './pages/MatchupPage';
import RankingPage from './pages/RankingPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>} />
                <Route path="rankings" element={<RankingPage/>} />
                <Route path="team-selection" element={<TeamSelection/>} />
                <Route path="stat-dashboard" element={<StatDashboard/>} />
                
            </Routes>
        </BrowserRouter>
    );
};

export default App;
