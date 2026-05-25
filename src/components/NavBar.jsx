import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "./img/sa.png"; // adjust path if needed
export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" aria-label="Go to homepage">
        <img src={logo} alt="SnapArrow logo" />
      </Link>
      <Link to="/about" className="nav-link" aria-label="Go to about page">About</Link>
      <Link to="/services" className="nav-link" aria-label="Go to services page">Services</Link>
      <Link to="/form" className="nav-link" aria-label="Go to contact page">Contact</Link>
      <Link to="/" className="nav-link brand" aria-label="Go to homepage">SnapArrow</Link>
    </nav>
  );
}