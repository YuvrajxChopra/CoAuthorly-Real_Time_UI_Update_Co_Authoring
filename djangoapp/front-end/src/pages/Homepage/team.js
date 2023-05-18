import React from 'react';
import './homepage.css';
import imagepage from './img/me.jpg';

function MeetTeam() {
    return (
            <div className="meet-team">
                <h1>Meet Our Team</h1>
                <div className="team-members">
                    <div className="team-member">
                        <img src={imagepage} alt="Team Member 1" />
                        <p className='MemberName'> Yuvraj Chopra</p>
                        <p className='MemberDesc'>Team Syntax Sorcerers</p>
                    </div>
                    <div className="team-member">
                        <img src={imagepage} alt="Team Member 2" />
                        <p className='MemberName'>Tushar</p>
                        <p className='MemberDesc'>Team Syntax Sorcerers</p>
                    </div>
                    <div className="team-member">
                        <img src={imagepage} alt="Team Member 3" />
                        <p className='MemberName'>Sayan Maity</p>
                        <p className='MemberDesc'>Team Syntax Sorcerers</p>
                    </div>
                </div>
            </div>
    );
}

export default MeetTeam;