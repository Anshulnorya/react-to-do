import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import React, { useState, useContext } from "react";
import { AuthContext } from '../App';
import { login } from "../api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const userData = await login({ email: username, password });
      const authToken = userData.data.token;
      console.log(authToken);
  
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='tdMainContainer'>
      <div>
        <h2>Welcome Back!</h2>
        <p className="tdParagraph">Please enter your Credentials</p>
      </div>
      <form onSubmit={handleLogin} className='tdForm'>
        {/* Username input */}
        <div className='tdUsernameDiv'>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
          />
        </div>
        {/* Password input */}
        <div className='tdPasswordDiv'>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button type="submit" className='tdLoginButton'>
            {loading ? <RingLoader css={override} size={40} color={"#36D7B7"} /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
