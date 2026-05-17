import "./services.css";
export default function Services() {
  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <p className="intro">
        SnapArrow delivers high‑quality, modern websites designed to convert and grow your online presence.
      </p>
      <div className="service-grid">
        <div className="service-card">
          <h3>Landing Page</h3>
          <p>Clean, fast loading, and designed to capture attention instantly.</p>
        </div>
        <div className="service-card">
          <h3>Business Website</h3>
          <p>A complete multi‑page site with SEO‑ready content and smart navigation.</p>
        </div>
        <div className="service-card">
          <h3>Custom Development</h3>
          <p>Tailored features, integrations, and optimized user experiences.</p>
        </div>
      </div>
       <div className="quiz-container">
        <div className="service-card">
          <h3>Take Our Quiz</h3>
          <h5>Fill in the form below and tell us all about the do's and dont's for your home online.</h5>
        </div>
       
      </div>
      <div className="services-cta">
        <a href="/form">Get in Touch</a>
      </div>
    </div>
  );
}