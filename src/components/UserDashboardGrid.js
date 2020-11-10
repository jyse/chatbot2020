import React from "react";
import "./UserDashboardGrid.css";
// import MonthlyClientPieChart from "../components/MonthlyClientPieChart";
// import MonthlySalesPieChart from "../components/MonthlySalesPieChart";
// import SixMonthLineChart from "../components/SixMonthLineChart";
// import LastTwentyClientList from "../components/LastTwentyClientList";
// import DailySalesTipper from "../components/DailySalesTipper";
// import Forum from "../components/Forum";
import { VictoryPie, VictoryChart, VictoryTheme, VictoryBar } from "victory";
import { Link } from "react-router-dom";
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
        <div className="main-board" onClick={props.click}>
          <div className="main-firstSection">
            <div className="main-firstSection-title">
              <h1>Today's numbers</h1>
            </div>
            <div className="main-overview">
              <div
                className="overviewcard"
                style={{ backgroundColor: "#F0AB3A" }}
              >
                <div className="overviewcard__icon">
                  <h1> Potential Clients</h1>
                </div>
                <div className="overviewcard__info">
                  <h1>23</h1>
                </div>
              </div>
              <div
                className="overviewcard"
                style={{ backgroundColor: "#9AC2C5" }}
              >
                <div className="overviewcard__icon">
                  <h1>Calls</h1>
                </div>
                <div className="overviewcard__info">
                  <h1>15</h1>
                </div>
              </div>
              <div
                className="overviewcard"
                style={{ backgroundColor: "#CDE7BE" }}
              >
                <div className="overviewcard__icon">
                  <h1>Appointments</h1>
                </div>
                <div className="overviewcard__info">
                  <h1>5</h1>
                </div>
              </div>
              <div
                className="overviewcard"
                style={{ backgroundColor: "#AA7DCE" }}
              >
                <div className="overviewcard__icon">
                  <h1>Pitches</h1>
                </div>
                <div className="overviewcard__info">
                  <h1>2</h1>
                </div>
              </div>
              <div
                className="overviewcard"
                style={{ backgroundColor: "#7E7F9A" }}
              >
                <div className="overviewcard__icon">
                  <h1>Sales made</h1>
                </div>
                <div className="overviewcard__info">
                  <h1>1</h1>
                </div>
              </div>
            </div>
            <div className="main-firstSection-end">
              {/* <Link to={`/chatbot/${id}`}> */}
              <h1>
                If you haven't put in your numbers, please let the chatbot help
                you here!
              </h1>
              {/* </Link> */}
            </div>
          </div>

          <div className="main-header">
            <div className="main-headerLeft">
              <h2> Past month's results </h2>
              <VictoryPie
                colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                width={200}
                height={200}
                data={[
                  { x: "Cats", y: 35 },
                  { x: "Dogs", y: 40 },
                  { x: "Birds", y: 55 },
                  { x: "Dino's", y: 20 },
                ]}
              />
            </div>
            <div className="main-headerRight">
              <h2> Sales tips based on your monthly numbers</h2>
              <p> </p>
            </div>
          </div>

          <div className="main-cards">
            <div className="card">
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 15 }}
              >
                <VictoryBar
                  barRatio={0.8}
                  style={{
                    data: { fill: "#c43a31" },
                  }}
                  data={[
                    { x: "Cats", y: 35 },
                    { x: "Dogs", y: 40 },
                    { x: "Birds", y: 55 },
                    { x: "Dino's", y: 20 },
                  ]}
                />
              </VictoryChart>
            </div>
            <div className="card">Card</div>
            <div className="card">Card</div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(UserDashboardGrid);
