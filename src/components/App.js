import React from 'react';
import ChatBotBubble from './ChatBotBubble';
import UserBubble from './UserBubble';



const onButtonClick = async message => {
  console.log(message, 'what is in message still?');
}

const getQuestionKey = (key, question) => {
  const questions = {
    0: {
        question: 'How many potential new clients did you add to your list today? Use numbers',
        buttonOn: true,
       },
    1: {
      question: 'How many calls did you make today or reach outs through social media did you make today?',
      button: false,
       },
    2: {
      question: 'How many appointments or conversations did you have where you discovered someone his or her wants and needs?',
      button: false,
      },
    3: {
      question: 'How many pitches or offers did you present today?',
      button: false,
      },
    4: {
      question: 'How many sales?',
      button: false,
      },
    5:{ 
      question: 'How much did you make in sales?',
      button: false,
    }
  };
  return questions[key][question];
}
 
// shit it doesn't make any sense to also put the button property in there because the function can only give one thing back. 
// otherwise it needs to be extracted again. 

class App extends React.Component {
  state = {
    firstQuestionAsked: true,
    firstQuestionAnswered: true,
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
    // how to overcome this thing with the if-statements? 
      if (this.state.firstQuestionAsked) {
        return (
          <div className="ui container" style={{ marginTop: '10px' }}>
            <ChatBotBubble configChatBotMsg={getQuestionKey(0, 'question')} />
          </div>
        );
      }
      if (this.state.firstQuestionAsked && this.state.firstQuestionAnswered) {
        return <UserBubble />
      }

      return <p> 'hello dear me!' </p>
  }
}
export default App;


// components in een array zetten en die achter elkaar laten zien? 
// based on hoe deze erin zijn gezet? maar het wordt pas opnieuw gerenderd met de verandering van state. 
// Man I'm so close! 
