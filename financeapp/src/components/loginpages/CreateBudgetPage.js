import style from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../homepages/Navbar';

function CreateBudgetPage() {
  const [yearlySalary, setYearlySalary] = useState('');
  const [rent, setRent] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem('username');
    
    if (!username) {
        alert('Please log in first');
        return;
    }

    try {
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            yearlySalary: yearlySalary,
            rent: rent,
            monthlyExpenses: monthlyExpenses,
            username: localStorage.getItem("username")}),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Added data:", data);
        localStorage.setItem("username", username)
        navigate('/dash')
      } else {
        console.error("Data failed:", data.status || response.status);
      }
    } catch (error) {
      console.error("Error during calculating:", error);
    }
  };

  return (
    <>
    <Navbar />
    <div className={style['login-container']}>
      <form className={style['login-form']} onSubmit={handleLogin}>
        <h2>New Budget</h2>

        <label htmlFor="yearlySalary">Yearly Salary</label>
        <input
          type="number"
          id="yearlySalary"
          placeholder="Enter your yearly salary"
          value={yearlySalary}
          onChange={(e) => setYearlySalary(e.target.value)}
          required
          className={style.input}
        />

        <label htmlFor="rent">Rent</label>
        <input
          type="number"
          id="rent"
          placeholder="Enter your monthly rent"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          required
          className={style.input}
        />

        <label htmlFor="monthlyExpenses">Monthly Expenses</label>
        <input
          type="number"
          id="monthlyExpenses"
          placeholder="Enter your monthly expenses"
          value={monthlyExpenses}
          onChange={(e) => setMonthlyExpenses(e.target.value)}
          required
          className={style.input}
        />

        <button type="submit" className={style.button}>Calculate</button>
      </form>
    </div>
    </>
  );
}

export default CreateBudgetPage;
