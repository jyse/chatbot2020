import React from 'react';
import ChatBotBubble from './ChatBotBubble';
import UserBubble from './UserBubble';



const onButtonClick = async message => {
  console.log(message, 'what is in message still?');
}
const configConvo = [
  'Did you take any action on sales?',  
  'How many potential new clients did you add to your list today? Use numbers', 
  'How many calls did you make today or reach outs through social media did you make today?',
  'How many appointments or conversations did you have where you discovered someone his or her wants and needs?', 
  'How many pitches or offers did you present today?',
  'How many sales?', 
  'How much did you make in sales?' 
];
 
  

class App extends React.Component {
  state = {
    firstQuestionAsked: true,
    firstQuestionAnswered: false,
    secondQuestionAsked: false,
    secondQuestionAnswered: false,
    thirdQuestionAsked: false,
    thirdQuestionAnswered: false,
    fourthQuestionAsked: false,
    fourthQuestionAnswered: false,    
    fifthQuestionAsked: false,
    fifthQuestionAnswered: false,
    sixtQuestionAsked: false,
    sixtQuestionAnswered: false,        
  }
  

  render() {
    const firstQuestion = this.state.firstQuestionAsked;
    configConvo.map(question => {
      if (this.state.firstQuestionAsked) {
        return (
          <div className="ui container" style={{ marginTop: '10px' }}>
            <ChatBotBubble configChatBotMsg={configConvo[0]}/>
          </div>
        );
      }
    });
  }
}
export default App;


// components in een array zetten en die achter elkaar laten zien? 
// based on hoe deze erin zijn gezet? maar het wordt pas opnieuw gerenderd met de verandering van state. 
// Man I'm so close! 
