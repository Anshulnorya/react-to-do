
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { AuthContext } from '../App';
import { login, register } from "../api";
import { useNavigate } from "react-router-dom";
import './Login.css';

// TextInput component
const TextInput = ({ type, value, onChange, placeholder, required }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};


const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;


const Login = () => {

  const { setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // State variables for registration
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // React Router hook for navigation
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await login({ email: username, password });
      const authToken = userData.data.token;

      // Store the token in localStorage
      localStorage.setItem('authToken', authToken);

      setToken(authToken);
      setError("");
      navigate('/todos');
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Event handler for registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);

    try {
      const userData = await register({
        name: registerUsername,
        email: registerEmail,
        password: registerPassword,
      });

      // Store the token in localStorage
      localStorage.setItem('authToken', userData.data.token);

   
      setUsername('');
      setPassword('');
      setRegisterUsername('');
      setRegisterEmail('');
      setRegisterPassword('');

      navigate('/todos');
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Registration error:", error.response.data);
        setError(error.response.data.message); 
      } else {
        setError('Registration failed. Please try again.');
        console.error('Registration error:', error);
      }
    } finally {
      setRegisterLoading(false);
    }
  };

  // Function to switch between login and registration forms
  const switchForm = () => {
    setIsRegistering(!isRegistering);
    setError(''); 
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="tdMainContainerBody">
      <div className='tdMainContainer'>
      <div>
        <h2>{isRegistering ? 'Register Here !' : 'Welcome Back !'}</h2>
        <p className="tdParagraph">{isRegistering ? 'Please enter your new credentials' : 'Please enter your Credentials'}</p>
      </div>
      <form onSubmit={isRegistering ? handleRegister : handleLogin} className='tdForm'>
        {/* Username input */}
        <div className='tdUsernameDiv'>
          <TextInput
            type="text"
            value={isRegistering ? registerUsername : username}
            onChange={isRegistering ? (e) => setRegisterUsername(e.target.value) : (e) => setUsername(e.target.value)}
            placeholder='Username'
            required
          />
        </div>

        {/* Email input for registration */}
        {isRegistering && (
          <div className='tdEmailDiv'>
            <TextInput
              type='email'
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>
        )}

        {/* Password input */}
        <div className='tdPasswordDiv'>
          <div style={{ position: 'relative' }}>
            <TextInput
              type={showPassword ? "text" : "password"}
              value={isRegistering ? registerPassword : password}
              onChange={isRegistering ? (e) => setRegisterPassword(e.target.value) : (e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
            {/* Eye icon for password visibility toggle */}
            <div className='eye-icon' onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </div>
          </div>
        </div>

        {/* Error message display */}
        {error && <p style={{ color: "red", margin: "0px" }}>{error}</p>}

        {/* Login button with loading spinner */}
        <div className='tdButtonDiv'>
          <button type='submit' className='tdLoginButton'>
            {isRegistering ? (
              registerLoading ? (
                <RingLoader css={override} size={40} color={'#36D7B7'} />
              ) : (
                'Register'
              )
            ) : loading ? (
              <RingLoader css={override} size={40} color={'#36D7B7'} />
            ) : (
              'Login'
            )}
          </button>

          {/* Switch between login and registration forms */}
          {isRegistering ? (
            <p className='tdParagraph' onClick={switchForm}>
              Already have an account? Login here.
            </p>
          ) : (
            <p className='tdParagraph' onClick={switchForm}>
              Don't have an account? Register here.
            </p>
          )}
        </div>
      </form>
    </div>

    </div>  );
};
export default Login;
