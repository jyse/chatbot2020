import React, { useState, useEffect } from "react";
import "./UserDashboardGrid.css";
import { VictoryPie } from "victory";
import { db } from "../firebase";
import { withRouter, Link } from "react-router-dom";

import { useStateValue } from "./../StateProvider";
import { v4 as uuidv4 } from "uuid";

// NOT filled chatbot in today - welcome state
// Filled chatbot in today - number state

// list
// Todays numbers - 5 cards - welcome state everything zero, others filled in
// monthly result - welcome state not visible, otherwise filled in
// videos of the week / sales tip / Quote - welcome state visible, filled in also visible but below everything;

function UserDashboardGrid() {
  const [numbersFilled, setNumbersFilled] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          const messages = snapshot.docs.map((doc) => {
            let data = doc.data();
            if (!Reflect.has(data, "id")) {
              data.id = uuidv4();
            }
            return data;
          });
          setMessages(messages);
        });
    }
  }, [user.uid]);

  return (
    <div>
      {/* onClick={props.click} */}
      <div className="main-board">
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
            <h1>
              <Link to={`/chatbot/${user?.uid}`}>
                If you haven't put in your numbers, please let the chatbot help
                you here!
              </Link>
            </h1>
          </div>
        </div>
        {numbersFilled && (
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
            <div className="main-headerRight" style={{ color: "black" }}>
              <h2> Sales tips based on your monthly numbers</h2>
              <p> </p>
            </div>
          </div>
        )}
        <div className="main-cards">
          <div className="card">
            <h1> Video</h1>
          </div>
          <div className="card">Sales tip of the week</div>
          <div className="card">Book tip</div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(UserDashboardGrid);
