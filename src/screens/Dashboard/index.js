import React, { Component } from "react";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";
import "./Dashboard.css";
import SideBarToggleButton from "../../components/SideBarToggleButton";
import SideNavigation from "../../components/SideNavigation";

const INITIAL_STATE = {
  currentUser: null,
  userData: [],
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return (
      <div>
        <div>
          <SideNavigation />
        </div>
        <div class="grid-container">
          <div class="header">
            <div>
              <SideBarToggleButton />
            </div>
            {/* //Hmm hier aparte component van maken? */}
            <div className="header__search">Search...</div>
            <div className="header__items">
              <a href="/">Account</a>
              <a href="/">Help</a>
            </div>
          </div>

          <main class="main">
            <div class="main-header">
              <div class="main-header__heading">Hello User</div>
              <div class="main-header__updates">
                <p> Konnichiwa</p>
              </div>
            </div>

            <div>
              <SideNavigation />
            </div>

            <div class="main-overview">
              <div class="overviewcard">
                <div class="overviewcard__icon">Overview</div>
                <div class="overviewcard__info">Card</div>
              </div>
              <div class="overviewcard">
                <div class="overviewcard__icon">Overview</div>
                <div class="overviewcard__info">Card</div>
              </div>
              <div class="overviewcard">
                <div class="overviewcard__icon">Overview</div>
                <div class="overviewcard__info">Card</div>
              </div>
              <div class="overviewcard">
                <div class="overviewcard__icon">Overview</div>
                <div class="overviewcard__info">Card</div>
              </div>
            </div>

            <div class="main-cards">
              <div class="card">Card</div>
              <div class="card">Card</div>
              <div class="card">Card</div>
            </div>
          </main>

          <footer class="footer">
            <div class="footer__copyright">&copy; 2018 MTH</div>
            <div class="footer__signature">Made with love by pure genius</div>
          </footer>
        </div>
      </div>
    );
  }
}
export default withRouter(Dashboard);

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
