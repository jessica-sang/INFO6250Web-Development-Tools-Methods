import React, { useState } from 'react';

function Chat({ state, onLogout, onSubmitMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitMessage(message);
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="logout-container">
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
      <div className="users-container">
        {Object.keys(state.users).map(user => (
          <div key={user} className={state.users[user].loginStatus ? 'online-user' : 'offline-user'}>
            {user}
          </div>
        ))}
      </div>
      <div className="messages-container">
        {state.messages.map((msg, index) => (
          <div key={index} className="one-message-container">
            <div className="username">{msg.username}</div>
            <div>{msg.message}</div>
          </div>
        ))}
      </div>
      <div className="send-message-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="message-input"
            placeholder="Enter message here"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
