

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './login.css'; // Import the CSS for styling

// const LoginComponent = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const validateEmail = (email) => {
//     // Simple email regex for basic validation
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const validatePassword = (password) => {
//     // Password must be at least 6 characters
//     return password.length >= 6;
//   };

//   const respondSubmit=()=>{
//     alert("Logged in Successfully");
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Reset errors
//     setEmailError('');
//     setPasswordError('');

//     // Validate email
//     if (!validateEmail(email)) {
//       setEmailError('Invalid email format');
//       return;
//     }

//     // Validate password
//     if (!validatePassword(password)) {
//       setPasswordError('Password must be at least 6 characters');
//       return;
//     }

//     // If everything is valid, you can proceed with login
//     console.log('Email:', email);
//     console.log('Password:', password);

    
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2>Login</h2>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="text"
//             name="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {emailError && <p className="error-message">{emailError}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {passwordError && <p className="error-message">{passwordError}</p>}
//         </div>
//         <button type="submit" className="btn-login" onClick={respondSubmit}>
//           Login
//         </button>
//         <p className="signup-link">
//           Don't have an account? <Link to="/signup">Sign Up</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginComponent;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS for styling

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate=useNavigate()

  const validateEmail = (email) => {
    // Simple email regex for basic validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 6 characters
    return password.length >= 6;
  };

  // const respondSubmit=()=>{
  //   alert("Logged in Successfully");
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    // If everything is valid, you can proceed with login
    console.log('Email:', email);
    console.log('Password:', password);

    navigate("./home")
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`eye-icon ${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button type="submit" className="btn-login" >
          Login
        </button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup.js">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginComponent;
