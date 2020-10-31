import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../src/firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div class>
      <p>Konnichiwa Login!</p>
    </div>
    // <div className='login'>
    //     <Link to='/'>
    //         <img
    //             className="login__logo"
    //             src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
    //         />
    //     </Link>

    //     <div className='login__container'>
    //         <h1>Sign-in</h1>

    //         <form>
    //             <h5>E-mail</h5>
    //             <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

    //             <h5>Password</h5>
    //             <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

    //             <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
    //         </form>

    //         <p>
    //             By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
    //             see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
    //         </p>

    //         <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
    //     </div>
    // </div>
  );
}
export default Login;

// Old CSS
/* .menu-icon {
  position: fixed; /* Needs to stay visible for all mobile scrolling */
/* display: flex;
  top: 5px;
  left: 10px;
  align-items: center;
  justify-content: center;
  background-color: #dadae3;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  padding: 12px; */
/* } */
*/

// .toolbar__ .sidenav {
//   grid-area: sidenav;
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   width: 240px;
//   position: fixed;
//   overflow-y: auto;
//   transform: translateX(-245px);
//   transition: all 0.6s ease-in-out;
//   box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
//   z-index: 2; /* Needs to sit above the hamburger menu icon */
//   background-color: #394263;
// }

// .sidenav.active {
//   transform: translateX(0);
// }

// .sidenav__close-icon {
//   position: absolute;
//   visibility: visible;
//   top: 8px;
//   right: 12px;
//   cursor: pointer;
//   font-size: 20px;
//   color: #ddd;
// }

// .sidenav__list {
//   padding: 0;
//   margin-top: 85px;
//   list-style-type: none;
// }

// .sidenav__list-item {
//   padding: 20px 20px 20px 40px;
//   color: #ddd;
// }

// .sidenav__list-item:hover {
//   background-color: rgba(255, 255, 255, 0.2);
//   cursor: pointer;
// }/* Non-mobile styles, 750px breakpoint */
/* @media only screen and (min-width: 46.875em) {
  /* Show the sidenav */
  /* .grid-container {
    grid-template-columns: 240px 1fr;
    grid-template-areas:
      " header"
      " main"
      "sidenav footer";
  } */

  /* .sidenav {
    position: relative;
    transform: translateX(0);
  } */

  /* .sidenav__close-icon {
    visibility: hidden;
  }
} */ 

/* Medium screens breakpoint (1050px) */
/* @media only screen and (min-width: 65.625em) {
  /* Break out main cards into two columns */
  /* .main-cards {
    column-count: 2;
  }
} */ 



{
  /* <aside class="sidenav">
          <div class="sidenav__close-icon">
            <i class="fas fa-times sidenav__brand-close"></i>
          </div>
          <ul class="sidenav__list">
            <li class="sidenav__list-item">Item One</li>
            <li class="sidenav__list-item">Item Two</li>
            <li class="sidenav__list-item">Item Three</li>
            <li class="sidenav__list-item">Item Four</li>
            <li class="sidenav__list-item">Item Five</li>
          </ul>
        </aside>
 */
}

// const INITIAL_STATE = {
//   userData: [],
// };

// class Main extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = INITIAL_STATE;
//   }

//   componentDidMount = () => {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         const userDocument = firestore
//           .collection("users")
//           .where("userId", "==", user.uid)
//           .get()
//           .then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//               const currentUser = doc.data();
//               this.setState({ currentUser });
//               this.getUserDataForVisual(currentUser);
//             });
//           });
//       } else {
//         this.setState({ currentUser: null });
//         this.props.history.push("/login");
//       }
//     });
//   };

//   getUserDataForVisual = async (user) => {
//     const userData = [];
//     const barChartData = [];
//     await firestore
//       .collection("answers")
//       .where("userId", "==", user.userId)
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((document) => {
//           const answerDoc = document.data();
//           userData.push({
//             x: answerDoc.question,
//             y: parseInt(answerDoc.answer),
//           });
//           if (answerDoc.question == "revenue") {
//             barChartData.push({
//               x: answerDoc.date,
//               y: answerDoc.answer,
//             });
//           }
//         });
//       });

//     const totalPerQuestionsAnswered = userData.reduce((acc, { x, y }) => {
//       if (!Reflect.has(acc, x)) acc[x] = 0;

//       let count = parseInt(y);

//       if (Number.isInteger(count)) {
//         acc[x] += y;
//       }
//       return acc;
//     }, {});

//     const visualUserData = Object.entries(totalPerQuestionsAnswered).map(
//       ([key, count]) => ({
//         x: key,
//         y: count,
//       })
//     );

//     this.setState({
//       userData: visualUserData,
//     });
//   };

//   render() {
//     const { currentUser } = this.state;
//     return (
//       <div className="app container mx-auto flex justify-center">
//         <div>
//           <p>Hello {currentUser?.firstName} </p>
//           <ChatBotBubblePieChart userData={this.state.userData} />
//         </div>
//       </div>
//     );
//   }
// }
// export default withRouter(Main);
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
