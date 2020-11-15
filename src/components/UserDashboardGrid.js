import React, { useState, useEffect } from "react";
import "./UserDashboardGrid.css";
import MonthlyPieChart from "./MonthlyPieChart";
import YouTubeVideo from "./YouTubeVideo";
import { db } from "../firebase";
import { withRouter, Link } from "react-router-dom";
import { useStateValue } from "./../StateProvider";
import { v4 as uuidv4 } from "uuid";
import KanbanCards from "./KanbanCards";

function UserDashboardGrid() {
  const [numbersFilled, setNumbersFilled] = useState(false);
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const userId = user?.uid;

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(userId)
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
  }, [userId]);

  return (
    <div>
      {/* onClick={props.click} */}
      <div className="main-board">
        <div className="main-firstSection">
          <div className="main-firstSection-title">
            <h1>Today's numbers</h1>
          </div>
          <KanbanCards userId={userId} numbersFilled={numbersFilled} />

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
              <MonthlyPieChart userId={userId} />
            </div>
            <div className="main-headerRight" style={{ color: "black" }}>
              <h2> Sales tips based on your monthly numbers</h2>
              <h3>
                You should focus on your calls this week as your reach outs and
                connections are quite sufficient. Here are a few tips to jumps
                start your cold calls:
                <li>1. Research or Know Your Market</li>
                <li>2. Setup Your Mental Expectations BEFORE the call.</li>
                <li> 3. Understand Your Prospect </li>
                <li>4. Build Up the Trust By Talking</li>
                <li>5. Get started with a Question</li>
                <li> 6. Turn Pressure Points into Key topics.</li>
                <li>7. The KEY to sales is in the Discovery</li>
              </h3>
            </div>
          </div>
        )}
        <div className="main-cards">
          <div className="card">
            <h2> Video</h2>
            <YouTubeVideo youTubeId="dfyQ8P7gnVQ" />
          </div>
          <div className="card">
            <h2>Sales tip of the week</h2>
            <h4>Focus on providing service and the rest will come</h4>
          </div>
          <div className="card">
            <h2>Book tip</h2>
            <h4>Napoleon Hill: Outwitting the Devil</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(UserDashboardGrid);

// colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
// width={200}
// height={200}
// data=
// {[
//   { x: "Cats", y: 35 },
//   { x: "Dogs", y: 40 },
//   { x: "Birds", y: 55 },
//   { x: "Dino's", y: 20 },
// ]}
// />
