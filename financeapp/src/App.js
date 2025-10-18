import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/homepages/Navbar';
import HomePage from './components/homepages/Homepage';
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('./components/loginpages/LoginPage'));

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
