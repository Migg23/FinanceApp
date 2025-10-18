import './LoginPageCSS.css';
import { useState, useEffect } from 'react';

/**
 * Author: Eder Martinez
 * Holds constant for setUsername and password as empty strings
 * 
 * @returns death
 */
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

//   useEffect(() => {
//     const FetchData = async () => {
//       try{
//         const response = await fetch('http://localhost:5000/login')
//         const data = await response.json()

//         setUsername(data.username)
//         setPassword(data.password)
//       }
//       catch(ex) {
//         alert("Does not work" + ex)
//       }
//   }
//   FetchData()
// }, []);

const handleLogin = async (e) => {
  e.preventDefault(); // stop page reload on submit

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        Username: username, 
        Password: password, }),
    });

    const data = await response.json();
    console.log("login response:", data)

    if (response.ok) {
      alert('Login successful!');
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    alert('Error logging in: ' + error);
  }
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
