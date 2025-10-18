import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/homepages/Navbar';
import HomePage from './components/homepages/Homepage';
import LoginPage from './components/loginpages/LoginPage.js';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
    </Router>
    

   


  );
}

export default App;
