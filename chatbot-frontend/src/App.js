
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ChatWeatherComponent from './chatweather.js';
// import LoginComponent from './login.js';
// import SignUpComponent from './signup.js';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <nav className="navbar">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link to="/" className="nav-link">
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/chatweather" className="nav-link">
//                 ChatWeather
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/login" className="nav-link">
//                 Login
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/signup" className="nav-link">
//                 Sign Up
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/chatweather" element={<ChatWeatherComponent />} />
//           <Route path="/login" element={<LoginComponent />} />
//           <Route path="/signup" element={<SignUpComponent />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// const Home = () => {
//   return (
//     <div>
//       <h2>Welcome to Travel Chatbot!</h2>
//       <p>Explore the world with our chatbot providing travel and weather information.</p>
//       </div>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatWeatherComponent from './chatweather.js';
import LoginComponent from './login.js';
import SignUpComponent from './signup.js';
import Home from './home.js';
import './App.css';
import icon from './assest/icon1.png'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
        <div className='navbar-icon'>
           <img src={icon} alt="Icon" className="navbar-icon" /> <h1>TravBot</h1>
        </div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chatweather" className="nav-link">
                ChatWeather
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatweather" element={<ChatWeatherComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;






