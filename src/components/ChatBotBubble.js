import React from 'react';
import chatbotIcon from './chatbotIcon.png'

const dateMessage = new Date().toLocaleString();

const ChatBotBubble = props => {
  
    return (         
        <div className="ui small compact message" style={{background: 'white', marginTop: '10px', borderColor: 'black' }}>
            <div class="ui comments">
                <div class="comment">
                    <a class="avatar">
                    <img src={chatbotIcon} alt="Chatbot" />
                    </a>
                    <div class="content">
                        <a class="author">Chatbot2020 </a>
                    </div>
                </div>
                <div class="text" style={{paddingLeft: '50px', fontSize: '10px'}}>
                    {props.question}
                </div>
            </div>
        </div>
    );
};

export default ChatBotBubble;

