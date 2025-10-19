import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';



import HomePage from './components/homepages/Homepage';
import { lazy, Suspense } from 'react';
import RegisterPage from './components/loginpages/RegisterPage';
import CreateBudgetPage from './components/loginpages/CreateBudgetP';

import DashBoard from './components/homepages/Dashboard';
import { UserProvider } from './components/loginpages/UserContext';

const LoginPage = lazy(() => import('./components/loginpages/LoginPage'));
const DashPage = lazy(() => import('./components/homepages/Dashboard'));
 
function App() {
  return (
    <UserProvider>
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
            <Suspense fallback={<div>Loading Dashboard...Wait</div>}>
              <DashBoard />
            </Suspense>
          }
        />
        
         <Route
          path="/cbp"
          element={
            <Suspense fallback={<div>Loading Dashboard...Wait</div>}>
              <CreateBudgetPage />
            </Suspense>
          }
        />

      </Routes>
    </Router>

    </UserProvider>
  );
}

export default App;
