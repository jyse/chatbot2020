import React from "react";
import chatbotIcon from "./chatbotIcon.png";
import "./SideBarToggleButton.css";

const SideBarToggleButton = (props) => {
  return (
    <button className="toggle-button" onClick={props.click}>
      <div className="toggle-button__line" />
      <div className="toggle-button__line" />
      <div className="toggle-button__line" />
    </button>
  );
};

export default SideBarToggleButton;
