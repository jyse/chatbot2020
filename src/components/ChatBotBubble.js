import React from 'react';

const ChatBotBubble = props => {
    console.log(props, 'what is in props here?');
    
    return (         
        <div class="ui message" style={{ marginTop: '10px' }}>
            <div class="header">
                Chatbot2020
            </div>
        <p>Question: {props.question}</p>
        </div>
    );
};

export default ChatBotBubble;

