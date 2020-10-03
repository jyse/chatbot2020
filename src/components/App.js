import React from 'react';
import ChatBotBubble from './ChatBotBubble';
import UserBubble from './UserBubble';



// const onButtonClick = async message => {
//   console.log(message, 'what is in message still?');
// }

// const getQuestionKey = (key, question) => {
//   const questions = {
//     0: {
//         question: 'How many potential new clients did you add to your list today? Use numbers',
//         buttonOn: true,
//        },
//     1: {
//       question: 'How many calls did you make today or reach outs through social media did you make today?',
//       button: false,
//        },
//     2: {
//       question: 'How many appointments or conversations did you have where you discovered someone his or her wants and needs?',
//       button: false,
//       },
//     3: {
//       question: 'How many pitches or offers did you present today?',
//       button: false,
//       },
//     4: {
//       question: 'How many sales?',
//       button: false,
//       },
//     5:{ 
//       question: 'How much did you make in sales?',
//       button: false,
//     }
//   };
//   return questions[key][question];
// }
 
// // shit it doesn't make any sense to also put the button property in there because the function can only give one thing back. 
// // otherwise it needs to be extracted again. 

// class App extends React.Component {
//   state = {
//     firstQuestionAsked: true,
//     firstQuestionAnswered: true,
//     secondQuestionAsked: false,
//     secondQuestionAnswered: false,
//     thirdQuestionAsked: false,
//     thirdQuestionAnswered: false,
//     fourthQuestionAsked: false,
//     fourthQuestionAnswered: false,    
//     fifthQuestionAsked: false,
//     fifthQuestionAnswered: false,
//     sixtQuestionAsked: false,
//     sixtQuestionAnswered: false,        
//   }
  

//   render() {
//     // how to overcome this thing with the if-statements? 
//       if (this.state.firstQuestionAsked) {
//         return (
//           <div className="ui container" style={{ marginTop: '10px' }}>
//             <ChatBotBubble configChatBotMsg={getQuestionKey(0, 'question')} />
//           </div>
//         );
//       }
//       if (this.state.firstQuestionAsked && this.state.firstQuestionAnswered) {
//         return <UserBubble />
//       }

//       return <p> 'hello dear me!' </p>
//   }
// }
// export default App;


// components in een array zetten en die achter elkaar laten zien? 
// based on hoe deze erin zijn gezet? maar het wordt pas opnieuw gerenderd met de verandering van state. 
// Man I'm so close! 

const QUESTIONS = {
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
}

const INITIAL_STATE = {
  error: '',
  currentStep: 0,
  liveAnswer: '',

  firstAnswer: '',
  secondAnswer: '',
  thirdAnswer: '',
  fourthAnswer: '',
  fifthAnswer: '',

  firstQuestionAsked: true,
  secondQuestionAsked: false,
  thirdQuestionAsked: false,
  fourthQuestionAsked: false,
  fifthQuestionAsked: false,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleAnswer = this.handleAnswer.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.currentAnswerChange = this.currentAnswerChange.bind(this);
    this.onAnswer = this.onAnswer.bind(this);
  }

  handleAnswer() {
    // input
    let {   
      currentStep,
      liveAnswer,

      firstAnswer, 
      secondAnswer,
      thirdAnswer,
      fourthAnswer,
      fifthAnswer,

      firstQuestionAsked,
      secondQuestionAsked,
      thirdQuestionAsked,
      fourthQuestionAsked,
      fifthQuestionAsked,
    } = this.state;

    // processing
    switch(currentStep) {
      case 0:
        firstAnswer = liveAnswer;
        secondQuestionAsked = true;
        break;
      case 1:
        secondAnswer = liveAnswer;
        thirdQuestionAsked = true;
        break;
      case 2:
        thirdAnswer = liveAnswer;
        fourthQuestionAsked = true;
        break;
      case 3:
        fourthAnswer = liveAnswer;
        fifthQuestionAsked = true;
        break;
      case 4:
        fifthAnswer = liveAnswer;
        // sixthQuestionAsked = true;
        break;
      default:
        console.log("this must not happen HERE");
    }
    liveAnswer = '';
    
    // output
    this.setState({ 
      currentStep,
      liveAnswer,
      firstAnswer, 
      secondAnswer,
      thirdAnswer,
      fourthAnswer,
      fifthAnswer,
      firstQuestionAsked,
      secondQuestionAsked,
      thirdQuestionAsked,
      fourthQuestionAsked, 
      fifthQuestionAsked, 
     });
  }

  nextStep() {
    // input
    let { currentStep } = this.state;

    // process
    currentStep = currentStep + 1;

    // output
    this.setState({currentStep});
  }

  currentAnswerChange(e) {
    var liveAnswer = e.target.value;
    this.setState({liveAnswer});
  }

  onAnswer(e) {
    e.preventDefault();
    this.handleAnswer();
    this.nextStep();
  }

  render() {
    const {
      currentStep,
      liveAnswer,
      firstQuestionAsked,
      secondQuestionAsked,
      thirdQuestionAsked,
      fourthQuestionAsked,   
      firstAnswer, 
      secondAnswer,
      thirdAnswer,
    } = this.state;

    return (

      <div>
        <p>currentStep: {currentStep} </p>
        { firstQuestionAsked &&
          <div>
            <div className="ui container" style={{ marginTop: '10px' }}>
              <ChatBotBubble question={QUESTIONS[0].question} />
            </div>
            <div className="ui container" style={{ marginTop: '10px' }}>
              <UserBubble 
                finished={secondQuestionAsked}
                finishedAnswer={firstAnswer}
                hasButton={QUESTIONS[0].button}
                liveAnswer={liveAnswer}
                onCurrentAnswerChange={this.currentAnswerChange}
                onAnswer={this.onAnswer}
              />
            </div>
         </div>
        }
        { secondQuestionAsked &&
          <div>
            <div className="ui container" style={{ marginTop: '10px' }}>
              <ChatBotBubble question={QUESTIONS[1].question} />
            </div>
            <div className="ui container" style={{ marginTop: '10px' }}>
              <UserBubble 
                finished={thirdQuestionAsked}
                finishedAnswer={secondAnswer}
                hasButton={QUESTIONS[1].button}
                liveAnswer={liveAnswer}
                onCurrentAnswerChange={this.currentAnswerChange}
                onAnswer={this.onAnswer}
              />
            </div>
         </div>
        }
        { thirdQuestionAsked &&
          <div>
            <div className="ui container" style={{ marginTop: '10px' }}>
              <ChatBotBubble question={QUESTIONS[2].question} />
            </div>
            <div className="ui container" style={{ marginTop: '10px' }}>
              <UserBubble 
                finished={fourthQuestionAsked}
                finishedAnswer={thirdAnswer}
                hasButton={QUESTIONS[2].button}
                liveAnswer={liveAnswer}
                onCurrentAnswerChange={this.currentAnswerChange}
                onAnswer={this.onAnswer}
              />
            </div>
         </div>
        }
      </div>
        );
    }
}

export default App;