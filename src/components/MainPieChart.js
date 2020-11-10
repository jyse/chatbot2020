import React from "react";
import ChatBotBubble from "../../components/ChatBotBubble";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";
import ChatBotBubblePieChart from "../../components/ChatBotBubblePieChart";
import ChatBotBubbleBarChart from "../../components/ChatBotBubbleBarChart";

class MainPieChart extends React.Component {
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


    }

export default withRouter(MainPieChart);


