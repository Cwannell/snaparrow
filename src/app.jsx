import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./routes/Home.jsx";
import Services from "./routes/Services.jsx";
import Contact from "./routes/Contact.jsx";
import Form from "./routes/Form.jsx";
export default function App() {
  return (
    <>
      <NavBar />
      <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}