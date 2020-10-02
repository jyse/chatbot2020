import React from 'react';

const onButtonClick = (event, props) => {
    console.log(event, 'what is in event?');
    props.onClick(event);
};

const getConversation = (configConvo) => {
    const conversation = {
        Yes: 'hell yeahh',
        No: 'hell noo'
    }
    return conversation[configConvo];
}

const ChatBotBubble = props => {
    console.log(props, 'what is in props here?');
    
    return (
        <div>
        <div className="ui message">
            <div className="header">
                Chatbot2020
            </div>
            <p> Question: {props.configChatBotMsg}</p>
        </div>
        </div>         
    );
};

export default ChatBotBubble;