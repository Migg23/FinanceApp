import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './RegisterPage.module.css';
import Navbar from '../homepages/Navbar';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState(''); // renamed for clarity
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordConf) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, passwordConf }), // don't send passwordConf to backend unless needed
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('username', data.user.username);
        console.log(localStorage)
        setMessage(`Success: ${data.status}`);
        navigate('/budget')
      } else {
        setMessage(`Error: ${data.status || "Registration failed"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error, try again");
    }
  };

  return (
    <>
    <Navbar/>
      <div className={style['register-container']}>
        <form className={style['register-form']} onSubmit={handleRegister}>
          <h2 className={style.title}>Register</h2>

          {message && <div className={style.message}>{message}</div>}

          <label htmlFor="username">Username</label>
          <input
            className={style.input}
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            className={style.input}
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="passwordConf">Confirm Password</label>
          <input
            className={style.input}
            type="password"
            id="passwordConf"
            placeholder="Confirm password"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
            required
          />

          <button type="submit" className={style.button}>Register</button>

        <p className={style.footer}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
     </>
  );
}

export default RegisterPage;
