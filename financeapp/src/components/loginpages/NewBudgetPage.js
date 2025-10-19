import './LoginPageCSS.css';
import { useState } from 'react';

function NewBudgetPage() {
  const [salary, setSalary] = useState('');
  const [rent, setRent] = useState('');
  const [monthlyPay, setMonthlyPayment] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salary, rent, monthlyPay }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Store you data:", data);
      } else {
        console.error("Data not stored:", data.status || response.status);
      }
    } catch (error) {
      console.error("Error during calculate:", error);
    }
  };  // <-- make sure this semicolon is here

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label htmlFor="Salary">Salary</label>
        <input
          type="text"
          id="salary"
          placeholder="Enter your yearly salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <label htmlFor="rent">Rent</label>
        <input
          type="rent"
          id="rent"
          placeholder="Enter your rent"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          required
        />

        <label htmlFor="monthlyPay">Monthly Payment</label>
        <input
          type="monthlyPay"
          id="monthlyPay"
          placeholder="Enter your monthly expenses"
          value={monthlyPay}
          onChange={(e) => setMonthlyPayment(e.target.value)}
          required
        />

        <button type="submit">Calculate</button>
      </form>
    </div>
  );
}

export default NewBudgetPage;
