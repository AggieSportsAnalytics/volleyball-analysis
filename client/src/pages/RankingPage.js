import React from 'react';
import {useState} from 'react';

function RankingPage(){
    const [year, setYear] = useState('');
    const [existsYear, setExistsYear] = useState(false);

    const handleSetYear = (event) => {
        setYear(event.target.value);
        setExistsYear(true);
    }

    return (
        <>
        <h1>Select year</h1>
        <select value={year} onChange={handleSetYear}>
            <option value="" disabled>Select Year</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
        </select>
        </>
    )
    
}

export default RankingPage;