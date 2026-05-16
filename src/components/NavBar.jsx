import { Link } from "react-router-dom";
import "./navbar.css"
import heroImage from "./img/sa.png";
export default function NavBar() {
  return (
    <nav style={{ padding: "1rem 2rem", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: "1.5rem", fontWeight: "bold" }}>
        SnapArrow
      </Link>
      <Link to="/services" style={{ marginRight: "1rem" }}>Services</Link>
      <Link to="/form" style={{ marginRight: "1rem" }}>Contact</Link>
    </nav>
  );
}