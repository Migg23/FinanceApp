import { Link } from 'react-router-dom';
import './Navbar.css';
/**
 * Author: Eder Martinez
 * Navbar on the top. see the css file for editing
 * 
 * @returns 
 */



function Navbar() {
  return (
  <header className="header">
      <div className="logo">Budget Boss</div>
      <nav className="nav">
        <Link to="/login">Login/Sign up</Link>
      </nav>
    </header>
  );
}

export default Navbar;
