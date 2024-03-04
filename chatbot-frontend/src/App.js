import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    
    try {
      const response = await axios.post('http://localhost:5000/chat', { message: input });
      const botResponse = response.data.response;
      const updatedMessages = [...newMessages, { text: botResponse, isUser: false }];
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error sending message to backend:', error);
    }

    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="App">
      <h1>Chatbot</h1>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={msg.isUser ? 'user-message' : 'bot-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;


