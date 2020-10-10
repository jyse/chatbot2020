import React, { useEffect } from "react";
import ChatBotBubble from "../../components/ChatBotBubble";
import UserBubbleActive from "../../components/UserBubbleActive";
import UserBubbleFinished from "../../components/UserBubbleFinished";
import Login from "../Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

class Main extends React.Component {
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

  render() {
    const { liveAnswer, currentStep, qas } = this.state;

    return (
      <div className="app">
        <p>currentStep: Konnichiwa </p>
        {/* {qas &&
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
        /> */}
      </div>
    );
  }
}

export default Main;
