import React from "react";
import chatbotIcon from "./chatbotIcon.png";
import "./SideNavigation.css";

const SideNavigation = (props) => {
  let sideNavClasses = "side-nav";
  if (props.show) {
    sideNavClasses = "side-nav open";
  }
  return (
    <nav className={sideNavClasses}>
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
