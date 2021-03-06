import React, { useState } from "react";
import "./SignUp.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import gurlogo from "../../assets/images/gurlogo.png";
import { db } from "../../firebase";

function SignUp() {
  const history = useHistory();
  const [company, setCompany] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password
        if (auth) {
          db.collection("users").add({
            userId: auth.user.uid,
            company: company,
            firstName: firstName,
            lastName: lastName,
          });
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" alt="loginLogo" src={gurlogo} />
      </Link>

      <div className="login__container">
        <h1>Sign up</h1>
        <form>
          <h5>Company</h5>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <h5>First name</h5>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <h5>Last name</h5>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={register}
            className="login__signInButton"
          >
            Sign up
          </button>
        </form>
        <p>
          By signing up you agree to the Get Uncommon Results Conditions of Use
          & Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          onClick={() => history.push("/login")}
          className="login__registerButton"
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default SignUp;
