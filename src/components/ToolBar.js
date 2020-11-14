import React from "react";
import "./SideBarToggleButton.css";
import SideBarToggleButton from "../components/SideBarToggleButton";

const ToolBar = (props) => {
  return (
    <div className="header">
      <div className="header__toggle-button">
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
