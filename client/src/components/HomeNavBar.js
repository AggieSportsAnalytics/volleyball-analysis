import React from 'react';
import { Link } from 'react-router-dom';

function HomeNavBar(){

    return (
        <>
        <Link to="/about">
            <button>About the team</button>
        </Link>
        <Link to="/rankings">
            <button>Rankings</button>
        </Link>
        </>
    )
}

export default HomeNavBar;