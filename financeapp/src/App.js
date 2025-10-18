import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import HomePage from './components/homepages/Homepage';
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('./components/loginpages/LoginPage'));
const DashPage = lazy(() => import('./components/homepages/Dashboard'));

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
        <Route path='/dash' element={
          <Suspense fallback={<div>Loading...</div>}><DashPage/></Suspense>
        } />

      </Routes>
    </Router>
  );
}

export default App;
