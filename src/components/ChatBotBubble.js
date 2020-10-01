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
    const question = getConversation(props.configConvo);
     return (
        <div>
        <div className="ui message">
            <div className="header">
                Chatbot2020
            </div>
            <p> Hello there! Did you take any actions on sales today?</p>
                <button onClick={(e) => onButtonClick('Yes', props)} className="ui green basic button">Yes</button>
                <button onClick={(e) => onButtonClick('No', props)} className="ui red basic button" >No</button>
        </div>
        {/* <div className="ui message">
            <div className="header">
                Chatbot2020
            </div>
            <p> Question 2: {question}</p>
        </div>
        </div>          */}
    );
};

export default ChatBotBubble;