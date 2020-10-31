import React from "react";
import chatbotIcon from "./chatbotIcon.png";
import "./SideBarToggleButton.css";
import SideBarToggleButton from "../components/SideBarToggleButton";

const ToolBar = (props) => {
  console.log(props, "what is in props");
  return (
    <div class="header">
      <div classname="header__toggle-button">
        <SideBarToggleButton click={props.sideNavToggleClickHandler} />
      </div>
      <div className="header__items">
        <a href="/">Account</a>
        <a href="/">Help</a>
      </div>
    </div>
  );
};
export default ToolBar;
