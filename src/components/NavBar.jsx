import { Link } from "react-router-dom";
import "./navbar.css";
export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link brand">SnapArrow</Link>
      <Link to="/services" className="nav-link">Services</Link>
      <Link to="/form" className="nav-link">Contact</Link>
    </nav>
  );
}
