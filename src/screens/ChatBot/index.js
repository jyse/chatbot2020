import React from "react";
import ChatBotBubble from "../../components/ChatBotBubble";
import UserBubbleActive from "../../components/UserBubbleActive";
import UserBubbleFinished from "../../components/UserBubbleFinished";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";
import ChatBotBubblePieChart from "../../components/ChatBotBubblePieChart";
import ChatBotBubbleBarChart from "../../components/ChatBotBubbleBarChart";

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
  userData: [],
  barChartData: [],
};

class ChatBot extends React.Component {
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
              const currentUser = doc.data();
              this.setState({ currentUser });
              this.getUserDataForVisual(currentUser);
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
    let question_keys_answered_previously = {};

    firestore.collection("answers").add({
      userId: this.state.currentUser.userId,
      date: new Date().toLocaleDateString(),
      question: QUESTIONS[currentStep].key,
      answer: liveAnswer,
    });

    const updatedUserData = this.state.userData.map((item) => {
      const { x, y } = item;
      if (!Reflect.has(question_keys_answered_previously, x)) {
        question_keys_answered_previously[x] = true;
      }
      if (x === QUESTIONS[currentStep].key) {
        const count = parseInt(liveAnswer);
        console.log("updating", x, y, liveAnswer);
        if (Number.isInteger(count)) {
          return {
            x,
            y: y + count,
          };
        }
      }
      return item;
    });

    qas.push({
      question: QUESTIONS[currentStep].question,
      answer: liveAnswer,
    });

    if (
      !Reflect.has(
        question_keys_answered_previously,
        QUESTIONS[currentStep].key
      )
    ) {
      const count = parseInt(liveAnswer);

      updatedUserData.push({
        x: QUESTIONS[currentStep].key,
        y: Number.isInteger(count) ? count : 0,
      });
    }

    this.setState({
      qas,
      liveAnswer: "",
      userData: updatedUserData,
    });
  };

  nextStep = () => {
    let { currentStep } = this.state;

    currentStep = currentStep + 1;

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

  getUserDataForVisual = async (user) => {
    const userData = [];
    const barChartData = [];
    await firestore
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
          if (answerDoc.question == "revenue") {
            barChartData.push({
              x: answerDoc.date,
              y: answerDoc.answer,
            });
          }
        });
      });

    const totalPerQuestionsAnswered = userData.reduce((acc, { x, y }) => {
      if (!Reflect.has(acc, x)) acc[x] = 0;

      let count = parseInt(y);

      if (Number.isInteger(count)) {
        acc[x] += y;
      }
      return acc;
    }, {});

    const visualUserData = Object.entries(totalPerQuestionsAnswered).map(
      ([key, count]) => ({
        x: key,
        y: count,
      })
    );

    this.setState({
      userData: visualUserData,
      barChartData: barChartData,
    });
  };

  render() {
    const { liveAnswer, currentStep, qas, currentUser } = this.state;
    return (
      <div className="app container mx-auto flex justify-center">
        <div>
          <p>Hello {currentUser?.firstName} </p>
          {qas &&
            qas.map((qa, index) => (
              <div>
                <ChatBotBubble question={qa.question} />
                <UserBubbleFinished
                  finishedAnswer={qa.answer}
                  user={currentUser}
                />
              </div>
            ))}
          {currentStep < 5 && (
            <div>
              <ChatBotBubble question={QUESTIONS[currentStep].question} />
              <UserBubbleActive
                liveAnswer={liveAnswer}
                onCurrentAnswerChange={this.currentAnswerChange}
                onAnswer={this.onAnswer}
              />
            </div>
          )}
          {this.state.currentStep > 4 && (
            <ChatBotBubblePieChart userData={this.state.userData} />
          )}
          {this.state.currentStep > 4 && (
            <ChatBotBubbleBarChart data={this.state.barChartData} />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ChatBot);
