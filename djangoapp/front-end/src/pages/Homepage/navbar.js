import React, { useState } from 'react';
import logo from './img/logoCA.png';
import { Link } from "react-router-dom";

function Navbar({setActiveComponent }) {
  const [activeItem, setActiveItem] = useState(null);
  const handleClick = (componentName) => {
    setActiveComponent(componentName);
    setActiveItem(componentName);
  };
  return (
    <div>
        <Link to="/"><img alt='logo' src={logo} className='logo' height={100}/></Link>
      <nav>
        <ul>
          <li onClick={() => handleClick("home")} className={activeItem === "home" ? "active" : ""}>Home</li>
          <li onClick={() => handleClick("team")} className={activeItem === "team" ? "active" : ""}>Meet Team</li>
          <li onClick={() => handleClick("about")} className={activeItem === "about" ? "active" : ""}>About Us</li>
          <li onClick={() => handleClick("contact")} className={activeItem === "contact" ? "active" : ""}>Contact Us</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;