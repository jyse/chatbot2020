import React from 'react';
import ChatBotBubble from './ChatBotBubble';
import UserBubble from './UserBubble';

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
  answer: '',
  questionAsked: false,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

  }

  // handleAnswer = () => {
    // input
    // let {   
    //   currentStep,
    //   liveAnswer,
    //   answer,
    //   questionAsked,
    // } = this.state;

    // // processing
    // switch(currentStep) {
    //   case 0:
    //     answer = liveAnswer;
    //     questionAsked = true;
    //     break;
      // case 1:
      //   secondAnswer = liveAnswer;
      //   thirdQuestionAsked = true;
      //   break;
      // case 2:
      //   thirdAnswer = liveAnswer;
      //   fourthQuestionAsked = true;
      //   break;
      // case 3:
      //   fourthAnswer = liveAnswer;
      //   fifthQuestionAsked = true;
      //   break;
      // case 4:
      //   fifthAnswer = liveAnswer;
      //   sixthQuestionAsked = true;
      //   break;
    //   default:
    //     console.log("this must not happen HERE");
    // }
    // liveAnswer = '';
    
    // output
  //   this.setState({ 
  //     currentStep,
  //     liveAnswer,
  //     answer,
  //     questionAsked,
  //     // firstAnswer, 
  //     // secondAnswer,
  //     // thirdAnswer,
  //     // fourthAnswer,
  //     // fifthAnswer,
  //     // firstQuestionAsked,
  //     // secondQuestionAsked,
  //     // thirdQuestionAsked,
  //     // fourthQuestionAsked, 
  //     // fifthQuestionAsked, 
  //    });
  // }

  nextStep = () => {
    // input
    let { currentStep } = this.state;

    // process
    currentStep = currentStep + 1;

    // output
    this.setState({currentStep});
  }

  currentAnswerChange = (e) => {
    var liveAnswer = e.target.value;
    this.setState({liveAnswer});
  }

  onAnswer = (e) => {
    e.preventDefault();
    // this.handleAnswer();
    // this.nextStep();
  }

  getConversationBlocks = () => {
    let {   
      currentStep,
      liveAnswer,

      answer,
      questionAsked,    
    } = this.state;

    switch(currentStep) {
      case 0:
        answer = liveAnswer;
        nextQuestionAsking = true;
        break;
      // case 1:
      //   secondAnswer = liveAnswer;
      //   thirdQuestionAsked = true;
      //   break;
      // case 2:
      //   thirdAnswer = liveAnswer;
      //   fourthQuestionAsked = true;
      //   break;
      // case 3:
      //   fourthAnswer = liveAnswer;
      //   fifthQuestionAsked = true;
      //   break;
      // case 4:
      //   fifthAnswer = liveAnswer;
      //   sixthQuestionAsked = true;
      //   break;
      default:
        console.log("this must not happen HERE");
    }
    liveAnswer = '';

    return ( 
      <div>
        <div class="ui container" style={{ marginTop: '10px' }}>
          <ChatBotBubble question={QUESTIONS[currentStep].question} />
        </div>
        <div> 
          <div class="ui container" style={{ marginTop: '10px' }}>
            <UserBubble 
              finished={questionAsked}
              finishedAnswer={answer}
              hasButton={QUESTIONS[currentStep].button}
              liveAnswer={liveAnswer}
              onCurrentAnswerChange={this.currentAnswerChange}
              onAnswer={this.onAnswer}
            />
          </div>
        </div>
      </div>
    );
  };
    


  render() {
    const {
      currentStep,
      liveAnswer,
      answer, 
      questionAsked,
    } = this.state;
    console.log(this.state, 'what is in this.state');
    return (

      <div>
        <p>currentStep: {currentStep} </p>
        {this.getConversationBlocks({currentStep, liveAnswer, answer, questionAsked})}
      </div> 
        );
    }
}

export default App;





// { secondQuestionAsked &&
//   <div>
//     <div class="ui container" style={{ marginTop: '10px' }}>
//       <ChatBotBubble question={QUESTIONS[1].question} />
//     </div>
//     <div class="ui container" style={{ marginTop: '10px' }}>
//       <UserBubble 
//         finished={thirdQuestionAsked}
//         finishedAnswer={secondAnswer}
//         hasButton={QUESTIONS[1].button}
//         liveAnswer={liveAnswer}
//         onCurrentAnswerChange={this.currentAnswerChange}
//         onAnswer={this.onAnswer}
//       />
//     </div>
//  </div>
// }
// { thirdQuestionAsked &&
//   <div>
//     <div class="ui container" style={{ marginTop: '10px' }}>
//       <ChatBotBubble question={QUESTIONS[2].question} />
//     </div>
//     <div class="ui container" style={{ marginTop: '10px' }}>
//       <UserBubble 
//         finished={fourthQuestionAsked}
//         finishedAnswer={thirdAnswer}
//         hasButton={QUESTIONS[2].button}
//         liveAnswer={liveAnswer}
//         onCurrentAnswerChange={this.currentAnswerChange}
//         onAnswer={this.onAnswer}
//       />
//     </div>
//  </div>
// }
// { fourthQuestionAsked &&
//   <div>
//     <div class="ui container" style={{ marginTop: '10px' }}>
//       <ChatBotBubble question={QUESTIONS[3].question} />
//     </div>
//     <div class="ui container" style={{ marginTop: '10px' }}>
//       <UserBubble 
//         finished={fifthQuestionAsked}
//         finishedAnswer={fourthAnswer}
//         hasButton={QUESTIONS[3].button}
//         liveAnswer={liveAnswer}
//         onCurrentAnswerChange={this.currentAnswerChange}
//         onAnswer={this.onAnswer}
//       />
//     </div>
//  </div>
// } 
//  { fifthQuestionAsked &&
//   <div>
//     <div class="ui container" style={{ marginTop: '10px' }}>
//       <ChatBotBubble question={QUESTIONS[4].question} />
//     </div>
//     <div class="ui container" style={{ marginTop: '10px' }}>
//       <UserBubble 
//         finished={sixthQuestionAsked}
//         finishedAnswer={fourthAnswer}
//         hasButton={QUESTIONS[4].button}
//         liveAnswer={liveAnswer}
//         onCurrentAnswerChange={this.currentAnswerChange}
//         onAnswer={this.onAnswer}
//       />
//     </div>
//  </div>
// }        