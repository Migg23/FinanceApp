import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import HomePage from './components/homepages/Homepage';
import { lazy, Suspense } from 'react';
import RegisterPage from './components/loginpages/RegisterPage';

const LoginPage = lazy(() => import('./components/loginpages/LoginPage'));

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading Login...</div>}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<div>Loading Register...</div>}>
              <RegisterPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
