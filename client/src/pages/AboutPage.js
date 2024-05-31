import React from 'react';
import './AboutPage.css';
import ankitaImage from './ankita.png';
import nikhilImage from './nikhil.png';
import akshayImage from './akshay.png';
import laurenImage from './lauren.png';
import rubaImage from './ruba.png';
import arnavImage from './arnav.jpeg';

function AboutPage() {
    return (
        <div className="team-container">
            <div className="team-header">Meet the Team</div>
            <div className="member-row">
                <div className="team-member">
                    <img src={arnavImage} alt="Arnav Akula" />
                    <div className="member-info">
                        <div className="member-name">Arnav Akula</div>
                        <div className="member-desc">Project Manager</div>
                    </div>
                </div>
                <div className="team-member">
                    <img src={rubaImage} alt="Ruba Thekkath" />
                    <div className="member-info">
                        <div className="member-name">Ruba Thekkath</div>
                        <div className="member-desc">Web Developer</div>
                    </div>
                </div>
                <div className="team-member">
                    <img src={ankitaImage} alt="Ankita Khatri" />
                    <div className="member-info">
                        <div className="member-name">Ankita Khatri</div>
                        <div className="member-desc">Data Analyst</div>
                    </div>
                </div>
            </div>
            <div className="member-row">
                <div className="team-member">
                    <img src={nikhilImage} alt="Nikhil Karthikeyan" />
                    <div className="member-info">
                        <div className="member-name">Nikhil Karthikeyan</div>
                        <div className="member-desc">Data Analyst</div>
                    </div>
                </div>
                <div className="team-member">
                    <img src={laurenImage} alt="Lauren Lee" />
                    <div className="member-info">
                        <div className="member-name">Lauren Lee</div>
                        <div className="member-desc">Business & Media</div>
                    </div>
                </div>
                <div className="team-member">
                    <img src={akshayImage} alt="Akshay Raj" />
                    <div className="member-info">
                        <div className="member-name">Akshay Raj</div>
                        <div className="member-desc">Business & Media</div>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
