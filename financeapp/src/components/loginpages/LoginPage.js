import './LoginPageCSS.css';
import { useState } from 'react';

/**
 * Author: Eder Martinez
 * Holds constant for setUsername and password as empty strings
 * 
 * @returns death
 */
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <div className="login-options">
          <a href="#signup">Sign Up</a>
          <a href="#forgot">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
