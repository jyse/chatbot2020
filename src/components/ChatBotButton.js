import "./ChatBotButton.css";
import React from "react";
import ChatIcon from "@material-ui/icons/Chat";
function ChatBotButton(props) {
  return (
    <div className="chatbot-button-container">
      <button className="button" onClick={props.onClick}>
        <ChatIcon />
      </button>
    </div>
  );
}

export default ChatBotButton;
