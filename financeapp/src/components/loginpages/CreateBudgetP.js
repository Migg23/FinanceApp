import { useState, useContext } from 'react';
import style from './LoginPage.module.css'; 
import { useLocation } from 'react-router-dom';


function CreateBudgetP() {
  const [yearlySalary, setYearlySalary] = useState('');
  const [rent, setRent] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');

  
  const location = useLocation();
  const username = location.state?.username;
  const handleCreateBud = async (e) => {


    e.preventDefault();


    console.log("Username is:: "+username);
    
    if (!username) {
        alert('Please log in first');
        return;
    }

    try {
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            yearlySalary: Number(yearlySalary),
            rent: Number(rent),
            monthlyExpenses: Number(monthlyExpenses),}),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Added data:", data);
      } else {
        console.error("Data failed:", data.status || response.status);
      }
    } catch (error) {
      console.error("Error during calculating:", error);
    }
  };

  return (
    <div className={style['login-container']}>
      <form className={style['login-form']} onSubmit={handleCreateBud}>
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
  );
}

export default CreateBudgetP;