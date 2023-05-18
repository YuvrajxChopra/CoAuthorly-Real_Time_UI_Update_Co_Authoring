import React, { useState } from "react";
import Header from "./header";
import Navbar from "./navbar";
import './homepage.css';
import MeetTeam from "./team";
import AboutUs from "./about";
import ContactUs from "./contact";

function HomePage() {
  const [activeComponent, setActiveComponent] = useState("header");
  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <Header />
      case "team":
        return <MeetTeam />;
      case "about":
        return < AboutUs />;
      case "contact":
        return <ContactUs />;
      default: {
        setActiveComponent("home");
        return <Header />;
      }
    }
  };
  return (
    <div className="HomePage">
      <Navbar setActiveComponent={setActiveComponent} />
      {renderComponent()}
    </div>
  );

}

export default HomePage;
