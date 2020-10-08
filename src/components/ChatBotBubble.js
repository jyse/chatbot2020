import React from 'react';

const ChatBotBubble = props => {
   
    return (         
        <div className="ui message" style={{ marginTop: '10px' }}>
            <div className="header">
                Chatbot2020
            </div>
        <p>Question: {props.question}</p>
        </div>
    );
};

export default ChatBotBubble;

