import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import gurlogo from "./gurlogo.png";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/chatbot");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <Link to="/chatbot">
        <img className="login__logo" alt="chatBotLogo" src={gurlogo} />
      </Link>

      <div className="login__container">
        <h1>Log in</h1>

        <form>
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
            onClick={signIn}
            className="login__signInButton"
          >
            Login
          </button>
        </form>

        <p>
          By signing-in you agree to the Get Uncommon results Conditions of Use
          & Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          onClick={() => history.push("/signup")}
          className="login__registerButton"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
export default Login;
