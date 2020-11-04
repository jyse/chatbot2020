import React from "react";
import "./UserDashboardGrid.css";
import MonthlyClientPieChart from "../components/MonthlyClientPieChart";
import MonthlySalesPieChart from "../components/MonthlySalesPieChart";
import SixMonthLineChart from "../components/SixMonthLineChart";
import LastTwentyClientList from "../components/LastTwentyClientList";
import DailySalesTipper from "../components/DailySalesTipper";
import Forum from "../components/Forum";

import { auth, firestore } from "../firebase";
import { withRouter } from "react-router-dom";

const INITIAL_STATE = {
  currentUser: "",
  monthlySalesData: [],
  monthlyClientData: [],
};

class UserDashboardGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    let props = this.props;
    return (
      <div>
        <div className="grid-container" onClick={props.click}>
          <main class="main-screen">
            <div class="main-header">
              <div class="main-header__heading">
                <MonthlySalesPieChart />
                <MonthlyClientPieChart />
              </div>
              <div class="main-header__updates">
                <p> Past month: </p>
              </div>
            </div>
            <div class="main-overview">
              <div class="overviewcard">
                <div class="overviewcard__icon">
                  <SixMonthLineChart />
                </div>
                <div class="overviewcard__info">Card</div>
              </div>
              <div class="overviewcard">
                <div class="overviewcard__icon">
                  <LastTwentyClientList />
                </div>
                <div class="overviewcard__info">Card</div>
              </div>
              <div class="overviewcard">
                <div class="overviewcard__icon">
                  <DailySalesTipper />
                </div>
                <div class="overviewcard__info">Card</div>
              </div>
              <div class="overviewcard">
                <div class="overviewcard__icon">
                  <Forum />
                </div>
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
      </div>
    );
  }
}
export default withRouter(UserDashboardGrid);
