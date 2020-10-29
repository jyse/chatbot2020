import React from "react";
import chatbotIcon from "./chatbotIcon.png";
import "./SideNavigation.css";

const SideNavigation = (props) => {
  return (
    <nav className="side-drawer">
      <ul>
        <li>
          <a href="/">Overview</a>
        </li>
        <li>
          <a href="/">ChatBot</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
