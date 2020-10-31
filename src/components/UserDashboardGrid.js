import React from "react";
import chatbotIcon from "./chatbotIcon.png";
import "./UserDashboardGrid.css";

const UserDashboardGrid = (props) => {
  console.log(props, "what is in props here? user brack drop");
  return (
    <div className="grid-container" onClick={props.click}>
      <main class="main-screen">
        <div class="main-header">
          <div class="main-header__heading">Hello User</div>
          <div class="main-header__updates">
            <p> Konnichiwa </p>
          </div>
        </div>
        <div></div>
        <div class="main-overview">
          <div class="overviewcard">
            <div class="overviewcard__icon">Overview</div>
            <div class="overviewcard__info">Card</div>
          </div>
          <div class="overviewcard">
            <div class="overviewcard__icon">Overview</div>
            <div class="overviewcard__info">Card</div>
          </div>
          <div class="overviewcard">
            <div class="overviewcard__icon">Overview</div>
            <div class="overviewcard__info">Card</div>
          </div>
          <div class="overviewcard">
            <div class="overviewcard__icon">Overview</div>
            <div class="overviewcard__info">Card</div>
          </div>
        </div>

        <div class="main-cards">
          <div class="card">Card</div>
          <div class="card">Card</div>
          <div class="card">Card</div>
        </div>
      </main>
    </div>
  );
};
export default UserDashboardGrid;
