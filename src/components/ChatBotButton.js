import "./ChatBotButton.css";
import React from "react";
import ChatIcon from "@material-ui/icons/Chat";
function ChatBotButton() {
  return (
    <div className="chatbot-button-container">
      <button className="button">
        <ChatIcon />
      </button>
    </div>
  );
}

export default ChatBotButton;
