import React from 'react';
import ChatBotBubble from './ChatBotBubble';
import UserBubble from './UserBubble';

class App extends React.Component{
  state = {
    userMessage: null,
  };

  onButtonClick = async message => {
    this.setState({
      userMessage: message, 
    });
  }

  
  render() {

      return (
        <div className="ui container" style={{ marginTop: '10px' }}>
            <ChatBotBubble onClick={this.onButtonClick} configConvo={this.state.userMessage} />
        </div>
      );
    }
  }
export default App;
