import React from 'react';
import wave from './img/Emoji.png';
import handshake from  './img/handshake.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='content'>
      <main>
        <div className='headings'>
          <h1>Hi <img src={wave} alt="wave" width={40} /></h1>
          <h1>Welcome to, CoAuthorly</h1>
          <p>Our Platform is an innovative collaborative writing tool designed to simplify and expedite the process of co-authoring documents. With its real-time UI update feature, CoAuthorly revolutionizes the way multiple authors work together on a shared project.</p>
        </div>
        <div className='buttons'>
          <Link to="/Login"><button className="cta login">Log In</button></Link>
          <Link to="/Register"><button className="cta register">Register Now!</button></Link>
        </div>
      </main>
      <figure>
        <div className='img-bg'><img alt='handshake' src={handshake} height={500}/></div>
        <div className='circle1'></div>
        <div className='circle2'></div>
      </figure>
      
      <footer>
        <p className='footertext'>© Team Syntax Sorcerers - 2023</p>
      </footer>
    </div>
  )
}

export default Header;