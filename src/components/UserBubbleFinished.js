import { removeUndefinedProps } from "@material-ui/data-grid";
import React from "react";
import userIcon from "./userIcon.png";

const UserBubbleFinished = (props) => {
  return (
    <div className="chat-message-answer">
      <div
        className="ui small compact message "
        style={{ background: "white", marginTop: "10px", borderColor: "black" }}
      >
        <div className="ui comments">
          <div className="comment">
            <a className="avatar">
              <img src={userIcon} alt="userIcon" />
            </a>
            <div className="content">
              <a className="author">{props.user.firstName}</a>
            </div>
          </div>
          <div className="text" style={{ fontSize: "10px" }}>
            {props.finishedAnswer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBubbleFinished;
