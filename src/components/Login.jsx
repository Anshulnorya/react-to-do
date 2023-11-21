import React, { useState } from 'react';
import './Login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const isEmailValid = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Password validation: at least 6 characters, one uppercase, one lowercase
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Validate email
    if (!isEmailValid(username)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password
    if (!isPasswordValid(password)) {
      setError('Password must be at least 6 characters with at least one uppercase and one lowercase character.');
      return;
    }

    // Perform authentication logic here (e.g., API call, check credentials)
    // For simplicity, let's assume a hardcoded username and password
    if (username === 'demo@example.com' && password === 'Password123') {
      console.log('Login successful!');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='tdMainContainer'>
     <div>
     <h2>Welcome Back !</h2>
      <p className='tdParagraph'>Please enter your Credentials</p>
     </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin} className='tdForm'>
        <div className='tdUsernameDiv'>
          {/* <label htmlFor="username">Username (Email):</label> */}
          <input
            type="text"
            id="username"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='tdPasswordDiv'>
          <div style={{ display: 'flex' }}>
          {/* <label htmlFor="password">Password:</label> */}
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            
          
          </div>
        </div>
        <div className='tdButtonDiv'>
          <button type="submit">Login</button>
          <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
