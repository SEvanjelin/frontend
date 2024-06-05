import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    if (!email.includes('@')) {
      setEmailError('Invalid email format');
      return;
    }
    console.log('Form submitted');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <style>
        {`
          body {
            background-color: #000;
            color: #fff;
          }
        `}
      </style>
      <div
        style={{
          width: '400px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <center><h1>Login</h1></center>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#34cc54',
                color: '#000',
              }}
            />
            {emailError && <p style={{ color: '#ff4444', marginTop: '5px' }}>{emailError}</p>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#34cc54',
                color: '#000',
              }}
            />
            {passwordError && <p style={{ color: '#ff4444', marginTop: '5px' }}>{passwordError}</p>}
          </div>
          <center><button
            type="submit"
            style={{
              display: 'block',
              width: '80px',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#34cc54',
              color: '#000',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Login
          </button></center>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#34cc54', cursor: 'pointer' }}>SignUp</Link>
      </div>
      </div>
    </div>
  );
};

export default Login;
