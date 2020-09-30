import React from 'react';

class ChatBotBubble extends React.Component {

    onButtonClick = event => {
        this.props.onClick(event);
    };


    render() {
        return (
            <div className="ui message">
            <div className="header">
                Chatbot2020
            </div>
            <p> Hello there! Did you take any actions on sales today?</p>
                <button onClick={(e) => this.onButtonClick('Yes!')} className="ui green basic button">Yes</button>
                <button onClick={(e) => this.onButtonClick('No')} className="ui red basic button" >No</button>
            </div>
        );
    }   
};

export default ChatBotBubble;