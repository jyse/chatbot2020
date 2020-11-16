import React, { useState, useEffect } from "react";
import "./UserDashboardGrid.css";
import MonthlyPieChart from "./MonthlyPieChart";
import YouTubeVideo from "./YouTubeVideo";
import { db } from "../firebase";
import { withRouter, Link } from "react-router-dom";
import { useStateValue } from "./../StateProvider";
import KanbanCards from "./KanbanCards";
import ChatBotButton from "./ChatBotButton";
import ChatBot from "./../screens/ChatBot";
import moment from "moment";

function UserDashboardGrid(props) {
  console.log(props, "what is in props");
  const [dailyMessages, setDailyMessages] = useState([]);
  const [{ user }] = useStateValue();
  const [numbersFilled, setNumbersFilled] = useState(false);
  const { click } = props;
  const userId = user?.uid;
  const [chatBotOpen, setShowChat] = useState(false);

  const chatBotPopUp = () => {
    setShowChat((openState) => !openState);
  };

  useEffect(() => {
    if (!userId) return;
    (async () => {
      let dailyMessages = [];

      let now = new Date();
      let startOfDay = now.setHours(0, 0, 0, 0);
      let newStart = new Date(startOfDay);

      const messagesSnapshot = await db
        .collection("users")
        .doc(userId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .where("timestamp", ">", newStart)
        .get();

      messagesSnapshot.forEach((snap) => {
        const data = snap.data();
        dailyMessages.push(data);
      });

      setNumbersFilled(dailyMessages.length > 0);

      setDailyMessages(dailyMessages);
    })();
  }, [userId]);

  return (
    <div>
      <div className="main-board" onClick={click}>
        <div className="main-firstSection">
          <div className="main-firstSection-title">
            <h1>Today's numbers</h1>
          </div>
          <KanbanCards userId={userId} />

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
      <div className="btn">
        <ChatBotButton onClick={chatBotPopUp} />
      </div>
      {chatBotOpen ? (
        <div className="chatbot-popup">
          <div className="chatbot-popup-content">
            <ChatBot />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default withRouter(UserDashboardGrid);
