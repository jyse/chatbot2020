import React from 'react';
import ChatBotBubble from './ChatBotBubble';
import UserBubble from './UserBubble';

class App extends React.Component{
  state = {
    userMessage: '',
    firstQuestionAsked: true,
    firstQuestionAnswered: false,
  };



  onButtonClick = async message => {
    console.log(message,'is message coming here?');
    console.log(this.state.firstQuestionAnswered);
    this.setState({
      userMessage: message, 
      firstQuestionAnswered: true
    });
    console.log(this.state.firstQuestionAnswered,'what is firstQuestionAnswered?');
  }

  render() {
      if (this.state.firstQuestionAsked) {
        return (
          <div className="ui container" style={{ marginTop: '10px' }}>
            <ChatBotBubble onClick={this.onButtonClick}/>
          </div>
        )
      }
      if (this.state.firstQuestionAnswered) {
        return (
          <div className="ui container" style={{ marginTop: '10px' }}>
            <UserBubble message={this.state.userMessage}/>
          </div>
        )
      }
  }
}

export default App;
