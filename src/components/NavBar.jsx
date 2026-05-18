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

// import { useRef, useState } from 'react';
// import './Navbar.css'; // Styles below

// export default function Navbar() {
//   const navbarRef = useRef(null);
//   const [cursorX, setCursorX] = useState(null);

//   const handleMouseMove = (e) => {
//     const navbar = navbarRef.current;
//     const rect = navbar.getBoundingClientRect();
//     // Calculate X position relative to navbar (0 = left edge)
//     setCursorX(e.clientX - rect.left);
//   };

//   const handleMouseLeave = () => setCursorX(null);

//   return (
//     <nav
//       ref={navbarRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       className="navbar"
//     >
//       {/* Slider follows cursor */}
//       {cursorX !== null && (
//         <div
//           className="slider"
//           style={{
//             left: `${cursorX}px`,
//             transform: `translateX(-50%)` // Centers slider under cursor
//           }}
//         />
//       )}

//       {/* Your nav items (example structure) */}
//       <div className="nav-links">
//         <a href="#">Home</a>
//         <a href="#">About</a>
//         <a href="#">Services</a>
//         <a href="#">Contact</a>
//       </div>
//     </nav>
//   );
// }