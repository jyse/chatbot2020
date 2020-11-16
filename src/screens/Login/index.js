import React from "react";
import "./Login.css";
import { db, auth, provider } from "../../firebase";
import gurlogo from "./gurlogo.png";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const signIn = async () => {
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        var isNewUser = result.additionalUserInfo.isNewUser;
        if (isNewUser) {
          const { uid } = result.user;
          db.collection("users").doc(uid).set({
            userId: result.user.uid,
            name: result.user.displayName,
          });
        }
      })
      .catch((error) => alert(error.message));
  };

  return user ? (
    <Redirect to={`/board/${user.uid}`} />
  ) : (
    <div className="login">
      <div className="login__container">
        <img src={gurlogo} alt="" />
        <div className="login__text">
          <h1> Welcome! </h1>
        </div>
        <Button onClick={signIn}>Login with Google</Button>
        <p className="login__disclaimer">
          By signing-in you agree to the Get Uncommon results Conditions of Use
          & Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
      </div>
    </div>
  );
}

export default Login;
