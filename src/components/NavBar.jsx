import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "./img/sa.png"; // adjust path if needed
export default function NavBar() {
  return (
    <nav className="navbar">
      <input id="nav-toggle" type="checkbox" className="nav-toggle" />
      <label htmlFor="nav-toggle" className="nav-logo-label" aria-label="Open menu"></label>
      <Link to="/" className="nav-logo" aria-label="Go to homepage">
        <img src={logo} alt="SnapArrow logo" />
      </Link>
      <div className="nav-dropdown">
  <Link to="/about">About</Link>
  <Link to="/services">Services</Link>
  <Link to="/form">Contact</Link>
  <Link to="/appointments">Appointments</Link>
</div>
      <Link to="/about" className="nav-link" aria-label="Go to about page">About</Link>
      <Link to="/services" className="nav-link" aria-label="Go to services page">Services</Link>
      <Link to="/form" className="nav-link" aria-label="Go to contact page">Contact</Link>
      <Link to="/appointments" className="nav-link" aria-label="Go to appointments page">Appointments</Link>
      <Link to="/" className="nav-link brand" aria-label="Go to homepage">SnapArrow</Link>
    </nav>
  );
}