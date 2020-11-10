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
          {/* <main className="main-screen"> */}
          <div className="main-header">
            <div className="main-header__heading">
              <MonthlySalesPieChart />
            </div>
            <div className="main-header__updates">
              <p> Past month: </p>
            </div>
          </div>
          <div className="main-overview">
            <div className="overviewcard">
              <div className="overviewcard__icon">
                <SixMonthLineChart />
              </div>
              <div className="overviewcard__info">Card</div>
            </div>
            <div className="overviewcard">
              <div className="overviewcard__icon">
                <LastTwentyClientList />
              </div>
              <div className="overviewcard__info">Card</div>
            </div>
            <div className="overviewcard">
              <div className="overviewcard__icon">
                <DailySalesTipper />
              </div>
              <div className="overviewcard__info">Card</div>
            </div>
            <div className="overviewcard">
              <div className="overviewcard__icon">
                <Forum />
              </div>
              <div className="overviewcard__info">Card</div>
            </div>
          </div>

          <div className="main-cards">
            <div className="card">
              <MonthlyClientPieChart />
            </div>
            <div className="card">Card</div>
            <div className="card">Card</div>
          </div>
          {/* </main> */}
        </div>
      </div>
    );
  }
}
export default withRouter(UserDashboardGrid);
