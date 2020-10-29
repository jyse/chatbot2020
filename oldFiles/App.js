import React, { useEffect } from "react";
import "../App.css";
import ChatBotBubble from "./ChatBotBubble";
import UserBubbleActive from "./UserBubbleActive";
import UserBubbleFinished from "./UserBubbleFinished";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";

const QUESTIONS = {
  0: {
    question: "How many potential clients did you contact today? Use numbers",
    buttonOn: true,
  },
  1: {
    question:
      "How many calls did you make today or reach outs through social media did you make today?",
    button: false,
  },
  2: {
    question:
      "How many appointments or conversations did you have where you discovered someone his or her wants and needs?",
    button: false,
  },
  3: {
    question: "How many pitches or offers did you present today?",
    button: false,
  },
  4: {
    question: "How many sales?",
    button: false,
  },
  5: {
    question: "How much did you make in sales?",
    button: false,
  },
};

const INITIAL_STATE = {
  error: "",
  currentStep: 0,
  liveAnswer: "",
  // once you identify user
  // liveDataStore get stuff into
  qas: [
    // contain data of last month
  ],

  // during process data gets added to qas
  // qas needs to be stored back into the database
  // then show visual Data from qas
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleAnswer = () => {
    // input
    let { currentStep, liveAnswer, qas } = this.state;

    qas.push({
      question: QUESTIONS[currentStep].question,
      answer: liveAnswer,
    });
    liveAnswer = "";

    this.setState({
      qas,
      liveAnswer,
    });
  };

  nextStep = () => {
    // input
    let { currentStep } = this.state;

    // process
    currentStep = currentStep + 1;

    // output
    this.setState({ currentStep });
  };

  currentAnswerChange = (e) => {
    var liveAnswer = e.target.value;
    this.setState({ liveAnswer });
  };

  onAnswer = (e) => {
    e.preventDefault();
    this.handleAnswer();
    this.nextStep();
  };

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     console.log("THE USER IS >>> ", authUser);
  //     if (authUser) {
  //       dispatch({
  //         type: "SET_USER",
  //         user: authUser,
  //       });
  //     } else {
  //       // the user is logged out
  //       dispatch({
  //         type: "SET_USER",
  //         user: null,
  //       });
  //     }
  //   });
  // }, []);

  render() {
    const { liveAnswer, currentStep, qas } = this.state;

    return (
      <div className="app">
        <Router>
          {/* <Route path="/login">
            <Login />
          </Route> */}
          <Switch>
            <Route path="/">
              <p>currentStep: {currentStep} </p>
              {qas &&
                qas.map((qa) => (
                  <div>
                    <ChatBotBubble question={qa.question} />
                    <UserBubbleFinished finishedAnswer={qa.answer} />
                  </div>
                ))}
              <ChatBotBubble question={QUESTIONS[currentStep].question} />
              <UserBubbleActive
                liveAnswer={liveAnswer}
                onCurrentAnswerChange={this.currentAnswerChange}
                onAnswer={this.onAnswer}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
/* .sidenav {
  grid-area: sidenav;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 240px;
  position: fixed;
  overflow-y: auto;
  transform: translateX(-245px);
  transition: all 0.6s ease-in-out;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  z-index: 2; /* Needs to sit above the hamburger menu icon */
/* background-color: #394263;
} */

/* .sidenav.active {
  transform: translateX(0);
} */

/* .sidenav__close-icon {
  position: absolute;
  visibility: visible;
  top: 8px;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  color: #ddd;
} */

/* .sidenav__list {
  padding: 0;
  margin-top: 85px;
  list-style-type: none;
} */

/* .sidenav__list-item {
  padding: 20px 20px 20px 40px;
  color: #ddd;
} */

/* .sidenav__list-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
} */
