import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import HomePage from './components/homepages/Homepage';
import RegisterPage from './components/loginpages/RegisterPage';

//lazy load where needed 
const LoginPage = lazy(() => import('./components/loginpages/LoginPage'));
const Dashboard = lazy(() => import('./components/homepages/Dashboard'));
const CreateBudgetPage = lazy(() => import('./components/loginpages/CreateBudgetPage'));

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

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <Dashboard />
            </Suspense>
          }
        />

        <Route
          path="/budget"
          element={
            <Suspense fallback={<div>Loading Budget Calculator...</div>}>
              <CreateBudgetPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
