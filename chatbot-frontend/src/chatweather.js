

// import React, { useState } from 'react';
// import axios from 'axios';
// import { BiSend } from 'react-icons/bi'; 
// import './chat.css'

// const ChatWeatherComponent = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [location, setLocation] = useState('');

//   const sendMessage = async (messageText) => {
//     const newMessages = [...messages, { text: messageText, isUser: true }];
//     setMessages(newMessages);

//     try {
//       const response = await axios.post('http://localhost:5000/chat', { message: messageText });
//       const botResponse = response.data.response;
//       const updatedMessages = [...newMessages, { text: botResponse, isUser: false }];
//       setMessages(updatedMessages);
//     } catch (error) {
//       console.error('Error sending message to backend:', error);
//     }
//   };

//   const handleChatInput = (e) => {
//     setInput(e.target.value);
//   };

//   const handleWeatherInput = (e) => {
//     setLocation(e.target.value);
//   };

//   const getWeather = async () => {
//     const newMessages = [...messages, { text: `Weather in ${location}`, isUser: true }];
//     setMessages(newMessages);

//     try {
//       const response = await axios.post('http://localhost:5000/weather', { location });
//       const weatherResponse = response.data.response;
//       const updatedMessages = [...newMessages, { text: weatherResponse, isUser: false }];
//       setMessages(updatedMessages);
//     } catch (error) {
//       console.error('Error fetching weather:', error);
//       const errorMessage = 'Weather data not available.';
//       const updatedMessages = [...newMessages, { text: errorMessage, isUser: false }];
//       setMessages(updatedMessages);
//     }

//     setLocation('');
//   };

//   const handleChatSubmit = (e) => {
//     e.preventDefault();
//     sendMessage(input);
//     setInput('');
//   };

//   const handleWeatherSubmit = (e) => {
//     e.preventDefault();
//     getWeather();
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="chat-container">
//             {messages.map((msg, index) => (
//               <div key={index} className={msg.isUser ? 'user-message' : 'bot-message'}>
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="input-container">
//             <form onSubmit={handleChatSubmit} className="d-flex">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter your message"
//                 value={input}
//                 onChange={handleChatInput}
//               />
//               <button type="submit" className="btn btn-primary ms-2"><BiSend /></button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWeatherComponent;


import React, { useState } from 'react';
import axios from 'axios';
import { BiSend } from 'react-icons/bi'; 
import './chat.css';

const ChatWeatherComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [location, setLocation] = useState('');

  const sendMessage = async (messageText) => {
    const newMessages = [...messages, { text: messageText, isUser: true }];
    setMessages(newMessages);

    try {
      const response = await axios.post('http://localhost:5000/chat', { message: messageText });
      const botResponse = response.data.response;
      const updatedMessages = [...newMessages, { text: botResponse, isUser: false }];
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error sending message to backend:', error);
    }
  };

  const handleChatInput = (e) => {
    setInput(e.target.value);
  };

  const handleWeatherInput = (e) => {
    setLocation(e.target.value);
  };

  const getWeather = async () => {
    const newMessages = [...messages, { text: `Weather in ${location}`, isUser: true }];
    setMessages(newMessages);

    try {
      const response = await axios.post('http://localhost:5000/weather', { location });
      const weatherResponse = response.data.response;
      const updatedMessages = [...newMessages, { text: weatherResponse, isUser: false }];
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error fetching weather:', error);
      const errorMessage = 'Weather data not available.';
      const updatedMessages = [...newMessages, { text: errorMessage, isUser: false }];
      setMessages(updatedMessages);
    }

    setLocation('');
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  const handleWeatherSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <div className="container">
      <div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="chat-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}>
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
          </div>
          {/* </div> */}
          <div className="input-container">
            <form onSubmit={handleChatSubmit} className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your message"
                value={input}
                onChange={handleChatInput}
              />
              <button type="submit" className="btn btn-primary ms-2"><BiSend /></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ChatWeatherComponent;



