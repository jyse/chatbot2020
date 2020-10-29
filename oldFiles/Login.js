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
