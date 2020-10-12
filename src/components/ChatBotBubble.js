import React from "react";
import chatbotIcon from "./chatbotIcon.png";

const ChatBotBubble = (props) => {
  return (
    <div
      className="ui small compact message"
      style={{ background: "white", marginTop: "10px", borderColor: "black" }}
    >
      <div className="ui comments">
        <div className="comment">
          <a className="avatar">
            <img src={chatbotIcon} alt="Chatbot" />
          </a>
          <div className="content">
            <a className="author">Chatbot2020 </a>
          </div>
        </div>
        <div className="text" style={{ paddingLeft: "50px", fontSize: "10px" }}>
          {props.question}
        </div>
      </div>
    </div>
  );
};

export default ChatBotBubble;
