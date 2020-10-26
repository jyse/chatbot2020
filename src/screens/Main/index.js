import React, { Component } from "react";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";
import ChatBotBubblePieChart from "../../components/ChatBotBubblePieChart";

const Main = () => {
  return (
    <div>
      <button class="ui button">ChatBot</button>
    </div>
  );
};

export default withRouter(Main);
