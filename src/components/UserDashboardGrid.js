import React, { useState, useEffect } from "react";
import "./UserDashboardGrid.css";
import MonthlyPieChart from "./MonthlyPieChart";
import YouTubeVideo from "./YouTubeVideo";
import { db } from "../firebase";
import { withRouter, Link } from "react-router-dom";
import { useStateValue } from "./../StateProvider";
import { v4 as uuidv4 } from "uuid";
import KanbanCards from "./KanbanCards";
import ChatBotButton from "./ChatBotButton";
import ChatBot from "./../screens/ChatBot";
import moment from "moment";
import { CompareSharp } from "@material-ui/icons";

function UserDashboardGrid(props) {
  const [dailyMessages, setDailyMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [numbersFilled, setNumbersFilled] = useState(false);
  const { click } = props;
  const userId = user?.uid;
  const [chatBotOpen, setShowChat] = useState(true);

  const chatBotPopUp = () => {
    setShowChat((openState) => !openState);
  };

  useEffect(() => {
    if (!userId) return;
    (async () => {
      let dailyMessages = [];

      let start = moment()
        .subtract(moment().startOf("day").fromNow())
        .startOf("day")
        .toString();

      // get messages since midnight (start of the day)

      let now = new Date();
      console.log(now, "what is in now?");
      let startOfDay = now.setHours(0, 0, 0, 0);
      let newStart = new Date(startOfDay);
      console.log(newStart, "what is in newStart");

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

      // console.log(start, "what is in start?");
      // console.log(new Date(Date.now() - 12 * 60 * 60 * 1000), "new Date style");

      // console.log(moment().startOf("day").fromNow());
      // console.log(dailyMessages, "what is in dailyMessages");
      // console.log("hello userdashbaord");
      if (dailyMessages.length > 0) {
        setNumbersFilled(true);
      } else {
        setNumbersFilled(false);
      }

      setDailyMessages(dailyMessages);
    })();
  }, [userId]);

  console.log(dailyMessages.length, "what is in dailyMessages LEngth");
  console.log(numbersFilled, "numbersFilled");
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
          <ChatBot />
        </div>
      ) : null}
    </div>
  );
}

export default withRouter(UserDashboardGrid);
