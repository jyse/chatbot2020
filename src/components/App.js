import React from 'react';
import ChatBotBubble from './ChatBotBubble';
import UserBubble from './UserBubble';



const onButtonClick = async message => {
    this.setState({
      userMessage: message, 
    });
  }

  
const App = () => {
  const configConvo = [
    'Did you take any action on sales?',  
    'How many potential new clients did you add to your list today? Use numbers', 
    'How many calls did you make today or reach outs through social media did you make today?',
    'How many appointments or conversations did you have where you discovered someone his or her wants and needs?', 
    'How many pitches or offers did you present today?',
    'How many sales?', 
    'How much did you make in sales?' 
  ];
    return (
        <div className="ui container" style={{ marginTop: '10px' }}>
          {configConvo.map(question => (
              <ChatBotBubble onClick={onButtonClick} configChatBotMsg={question}/>
          ))}
        </div>
    );
}
export default App;
