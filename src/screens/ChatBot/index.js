import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import ChatBotBubble from "../../components/ChatBotBubble";
import { auth, db } from "../../firebase";
import { withRouter } from "react-router-dom";
// import ChatBotBubblePieChart from "../../components/ChatBotBubblePieChart";
// import ChatBotBubbleBarChart from "../../components/ChatBotBubbleBarChart";
import "./ChatBot.css";
import chatbotIcon from "../../components/chatbotIcon.png";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import { VictoryPie, VictoryLabel } from "victory";

function ChatBot() {
  const [liveAnswer, setLiveAnswer] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const { userId } = useParams();
  const [{ user }, dispatch] = useStateValue();
  const chatBodyRef = useRef(null);

  const QUESTIONS = {
    0: {
      question:
        "1. How many potential clients did you contact today? Use numbers ",
      key: "potentialClients",
      buttonOn: true,
    },
    1: {
      question:
        "2. How many calls or reach outs through social media did you make today? Use numbers",
      key: "calls",
      button: false,
    },
    2: {
      question:
        "3. How many appointments for discovery about your client's needs did you have? Use numbers",
      key: "appointments",
      button: false,
    },
    3: {
      question:
        "4. How many pitches or offers did you present today? Use numbers",
      key: "pitches",
      button: false,
    },
    4: {
      question: "5. How many sales?",
      key: "sales",
      button: false,
    },
    5: {
      question: "6. How much did you make in sales?",
      key: "revenue",
      button: false,
    },
  };

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
    console.log(messages, "what is in messages?");
  }, [user.uid]);

  const nextStep = () => {
    setCurrentStep((currentStep) => currentStep + 1);
  };

  useLayoutEffect(() => {
    console.log("in use layout effect", messages, chatBodyRef);
    chatBodyRef.current.scrollTo(0, chatBodyRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = (e) => {
    /*
      TODO:
    [ ] Add a isSending flag, so you can display a loader/spinner and
    */
    e.preventDefault();
    console.log(currentStep, "what is currentStep?");
    const answer = {
      id: uuidv4(),
      answer: liveAnswer,
      question: QUESTIONS[currentStep].question,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection("users").doc(user.uid).collection("messages").add(answer);
    setMessages((messages) => [...messages, answer]);
    setLiveAnswer("");
    nextStep();
  };

  /*

  TODO: scroll to the bottom of the chat after loading messages
    Might need to use the useLayoutEffect for that
  */

  console.log({ messages });

  const chatboxQuestion = QUESTIONS[currentStep]?.question;

  return (
    <div className="chat">
      <div className="chat__mainblock">
        <div className="chat__header">
          <img src={chatbotIcon} alt="Chatbot" />
          <div className="chat__headerInfo">
            <p>Hello {user.displayName}! </p>
          </div>
          <div className="chat__headerRight">
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div
          className="chat__body"
          ref={(refEl) => (chatBodyRef.current = refEl)}
        >
          {messages.map((message) => (
            <>
              {message.question ? (
                <div
                  key={`${message.id}-question`}
                  className="chat__message chat__chatbot"
                >
                  <span className="chat__name">ChatBot</span>
                  <p>{message.question}</p>
                  <span className="chat__timestamp"></span>
                </div>
              ) : null}
              {message.answer ? (
                <p
                  key={message.id}
                  className={`chat__message ${
                    message.name === user.displayName && "chat__receiver"
                  }`}
                >
                  <span className="chat__name">{message.name}</span>
                  {message.answer}
                  <span className="chat__timestamp">
                    {new Date(message.timestamp?.toDate?.()).toUTCString()}
                  </span>
                </p>
              ) : null}
            </>
          ))}
          {currentStep < 6 && chatboxQuestion ? (
            <div className="chat__message chat__chatbot">
              <span className="chat__name">ChatBot</span>
              <p>{chatboxQuestion}</p>
              <span className="chat__timestamp">Today at 08:00PM</span>
            </div>
          ) : (
            <div className="chat__message chat__chatbot">
              <span className="chat__name">ChatBot</span>
              <p>You're done! This is your summary for today!</p>
              <VictoryPie
                colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                width={250}
                height={250}
                data={[
                  { x: "Cats", y: 35 },
                  { x: "Dogs", y: 40 },
                  { x: "Birds", y: 55 },
                  { x: "Dino's", y: 20 },
                ]}
              />
              <p> Keep up the good work! </p>
              <span className="chat__timestamp">Time now</span>
            </div>
          )}
        </div>
        <div className="chat__footer">
          {currentStep < 6 ? (
            <form>
              <input
                value={liveAnswer}
                onChange={(e) => setLiveAnswer(e.target.value)}
                placeholder="Type your numbers and press Enter"
                type="text"
              />
              <button onClick={sendMessage} type="submit">
                Send
              </button>
            </form>
          ) : (
            <p> Thank you! </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(ChatBot);
