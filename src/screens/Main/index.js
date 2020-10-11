import React, { useEffect } from "react";
import ChatBotBubble from "../../components/ChatBotBubble";
import UserBubbleActive from "../../components/UserBubbleActive";
import UserBubbleFinished from "../../components/UserBubbleFinished";
import { auth, firestore } from "../../firebase";
import { Link, useHistory, withRouter } from "react-router-dom";
import ChatBotBubblePieChart from "../../components/ChatBotBubblePieChart";

const QUESTIONS = {
  0: {
    question: "How many potential clients did you contact today? Use numbers ",
    key: "potentialClients",
    buttonOn: true,
  },
  1: {
    question:
      "How many calls or reach outs through social media did you make today? Use numbers",
    key: "calls",
    button: false,
  },
  2: {
    question:
      "How many appointments for discovery about your client's needs did you have? Use numbers",
    key: "appointments",
    button: false,
  },
  3: {
    question: "How many pitches or offers did you present today? Use numbers",
    key: "pitches",
    button: false,
  },
  4: {
    question: "How many sales?",
    key: "sales",
    button: false,
  },
  5: {
    question: "How much did you make in sales?",
    key: "revenue",
    button: false,
  },
};

const INITIAL_STATE = {
  error: "",
  currentStep: 0,
  liveAnswer: "",
  qas: [],
  currentUser: null,
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocument = firestore
          .collection("users")
          .where("userId", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.setState({ currentUser: doc.data() });
            });
          });
      } else {
        this.setState({ currentUser: null });
        this.props.history.push("/login");
      }
    });
  };

  handleAnswer = () => {
    // input
    let { currentStep, liveAnswer, qas } = this.state;

    qas.push({
      question: QUESTIONS[currentStep].question,
      answer: liveAnswer,
    });

    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    firestore.collection("answers").add({
      userId: this.state.currentUser.userId,
      date: new Date().toLocaleDateString(),
      question: QUESTIONS[currentStep].key,
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
    const regex = /^[0-9\b]+$/;
    if (e.target.value == "" || regex.test(e.target.value)) {
      this.setState({ liveAnswer: e.target.value });
    }
  };

  onAnswer = (e) => {
    e.preventDefault();
    this.handleAnswer();
    this.nextStep();
  };

  getUserDataForVisual = (user) => {
    const userData = [];
    firestore
      .collection("answers")
      .where("userId", "==", user.userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          const answerDoc = document.data();
          userData.push({
            x: answerDoc.question,
            y: parseInt(answerDoc.answer),
          });
        });
      });
    return userData;
  };

  render() {
    const { liveAnswer, currentStep, qas, currentUser } = this.state;
    return (
      <div className="app">
        <p>Hello {currentUser?.firstName} </p>
        {qas &&
          qas.map((qa) => (
            <div>
              <ChatBotBubble question={qa.question} />
              <UserBubbleFinished finishedAnswer={qa.answer} />
              <ChatBotBubblePieChart
                piechart={this.getUserDataForVisual(currentUser)}
              />
            </div>
          ))}
        <ChatBotBubble question={QUESTIONS[currentStep].question} />
        <UserBubbleActive
          liveAnswer={liveAnswer}
          onCurrentAnswerChange={this.currentAnswerChange}
          onAnswer={this.onAnswer}
        />
      </div>
    );
  }
}

export default withRouter(Main);
