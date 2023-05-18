import React from 'react';
import './homepage.css';
import wave from './img/Emoji.png';

function AboutUs() {
    return (
        <div className='about-us-container'>
            <div className='headings'>
                <div className='headingsX'>
                <h1>Hi <img src={wave} alt="wave" width={40} /></h1>
                <h1>This is CoAuthorly!</h1>
                <p>Our Platform is an innovative collaborative writing tool designed to simplify and expedite the process of co-authoring documents. With its real-time UI update feature, CoAuthorly revolutionizes the way multiple authors work together on a shared project.</p>
            </div>
            </div>
        </div>
    );
}

export default AboutUs;