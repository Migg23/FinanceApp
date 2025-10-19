import style from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../homepages/Navbar';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //navigate
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
        localStorage.setItem("username", data.user.username)
        navigate('/dash'); 
      } else {
        console.error("Login failed:", data.status || response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <Navbar />
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
    </>
  );
}

export default LoginPage;
