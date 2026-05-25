import "./home.css";
import heroImage from "../components/img/sa.png";
export default function Home() {
  return (
    <div className="landing">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Turn Your Vision Into a High‑Performing Website</h1>
          <p>
            SnapArrow builds fast, modern, conversion‑focused websites for
            businesses and creators. Launch with confidence and stand out online.
          </p>
          <div className="hero-cta">
            <a href="/form" className="cta-primary">Get in Touch</a>
            <a href="/services" className="cta-secondary">View Services</a>
            <a href="/services" className="cta-primary">Take our Quiz</a>
          </div>
        </div>
        <div
  className="hero-graphic"
  style={{ backgroundImage: `url(${heroImage})`, height:"600px", }}
></div>
      </section>
      <section className="banner"></section>
      {/* FEATURES */}
      <section className="features">
        <h2>Why Choose SnapArrow?</h2>
          <div className="feature-grid">
  <div className="feature-row-3">
    <div className="feature-item">
      <h3>Modern & Responsive</h3>
      <p>Your site looks great on every device and screen size.</p>
      </div>
    <div className="feature-item">
<h3>SEO‑Ready</h3>
    <p>Built with structured content and optimized page speed.</p>
    </div>
    <div className="feature-item">
<h3>Performance Focused</h3>
  <p>Fast load times for better engagement and higher rankings.</p>
    </div>
  </div>
  <div className="feature-row-2">
    <div className="feature-item">
<h3>Custom Design</h3>
    <p>Tailored layouts that fit your brand and audience.</p>
    </div>
    <div className="feature-item">
<h3>Custom Design</h3>
    <p>Tailored layouts that fit your brand and audience.</p>
    </div>
  </div>
</div>
      </section>
      {/* TESTIMONIALS */}
     <section className="testimonials">
  <h2>Client Feedback</h2>
  <div className="carousel-track">
    {/* ORIGINAL SET */}
    <div className="testimonial">
      <p>“SnapArrow rebuilt our entire website and our conversions doubled.”</p>
      <span>— Luna Harper, eCommerce Owner</span>
    </div>
    <div className="testimonial">
      <p>“Professional, fast, and the design quality is amazing.”</p>
      <span>— Michael Reyes, Agency Lead</span>
    </div>
    <div className="testimonial">
      <p>“A seamless experience from planning to launch. Highly recommended.”</p>
      <span>— Sofia Grant, Consultant</span>
    </div>
    {/* DUPLICATE SET FOR LOOP */}
    <div className="testimonial">
      <p>“SnapArrow rebuilt our entire website and our conversions doubled.”</p>
      <span>— Luna Harper, eCommerce Owner</span>
    </div>
    <div className="testimonial">
      <p>“Professional, fast, and the design quality is amazing.”</p>
      <span>— Michael Reyes, Agency Lead</span>
    </div>
    <div className="testimonial">
      <p>“A seamless experience from planning to launch. Highly recommended.”</p>
      <span>— Sofia Grant, Consultant</span>
    </div>
  </div>
</section>
      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>Ready to Press Start?</h2>
        <p>Tell us what you want to build and we’ll take it from there.</p>
        <a href="/form" className="cta-primary big">Get in Touch</a>
      </section>
    </div>
  );
}