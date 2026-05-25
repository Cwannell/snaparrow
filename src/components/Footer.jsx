export default function Footer() {
  return (
    <footer className="Footer" style={{ padding: "2rem", textAlign: "center", opacity: 0.7 }}>
      © {new Date().getFullYear()} SnapArrow 
    </footer>
  );
}