import React from "react";
import ChatBotBubble from "../../components/ChatBotBubble";
import UserBubbleActive from "../../components/UserBubbleActive";
import UserBubbleFinished from "../../components/UserBubbleFinished";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";
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
  userData: [],
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

    qas.push({
      question: QUESTIONS[currentStep].question,
      answer: liveAnswer,
    });

    firestore.collection("answers").add({
      userId: this.state.currentUser.userId,
      date: new Date().toLocaleDateString(),
      question: QUESTIONS[currentStep].key,
      answer: liveAnswer,
    });

    let question_keys_answered_previously = {};

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

  getUserDataForVisual = async (user) => {
    const userData = [];
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
        });
      });
    // console.log(userData, " what is in userData");

    const totalQuestionsAnswered = userData.reduce((acc, { x, y }) => {
      // If we don't have the question key in the accumulator, then add it and set it to zero by default
      if (!Reflect.has(acc, x)) acc[x] = 0;
      // Cast the value to a number
      let count = parseInt(y);
      // If we have a valid number then we sum the question key value with the new count
      if (Number.isInteger(count)) {
        acc[x] += y;
      }
      // Return accumulator
      return acc;
    }, {});

    /*
      Convert an object like:

      {
        calls: 25,
        pitches: 50
      }

      to

      [
        {x: 'calls', y: 25},
        {x: 'pitches', y: 50}
      ]

      This is done for the victory pie chart

    */
    const visualUserData = Object.entries(totalQuestionsAnswered).map(
      ([key, count]) => ({
        x: key,
        y: count,
      })
    );

    this.setState({
      userData: visualUserData,
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
                <UserBubbleFinished finishedAnswer={qa.answer} />
                {this.state.currentStep > 2 && index > 2 && (
                  <ChatBotBubblePieChart userData={this.state.userData} />
                )}
              </div>
            ))}
          <ChatBotBubble question={QUESTIONS[currentStep].question} />
          <UserBubbleActive
            liveAnswer={liveAnswer}
            onCurrentAnswerChange={this.currentAnswerChange}
            onAnswer={this.onAnswer}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
