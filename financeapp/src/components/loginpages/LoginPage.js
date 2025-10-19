import style from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
      } else {
        console.error("Login failed:", data.status || response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className={style['login-container']}>
      <form className={style['login-form']} onSubmit={handleLogin}>
        <h2>Login</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={style.input}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={style.input}
        />

        <button type="submit" className={style.button}>Login</button>

        <div className={style['login-options']}>
          <Link to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
