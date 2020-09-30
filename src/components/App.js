import React from 'react';
import ChatBotBubble from './ChatBotBubble';
import UserBubble from './UserBubble';

class App extends React.Component{
  state = {userMessage: ''};

  onButtonClick = async message => {
    this.setState({userMessage: message});
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <ChatBotBubble onClick={this.onButtonClick}/>
        <UserBubble message={this.state.userMessage}/>
      </div>
    );
  }
}

export default App;
