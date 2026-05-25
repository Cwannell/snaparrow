import "./about.css";
export default function About() {
  return (
    <div className="about-page">
      <h1>About SnapArrow</h1>

      <p className="intro">
        SnapArrow builds fast, modern, conversion‑focused websites designed to
        make your brand stand out and your customers take action.
      </p>

      <div className="about-grid">
        <div className="about-card">
          <h3>Who We Are</h3>
          <p>
            A small, focused studio that cares about clean design, sharp
            messaging, and websites that actually move the needle for your
            business.
          </p>
        </div>

        <div className="about-card">
          <h3>How We Work</h3>
          <p>
            We start by understanding your goals, audience, and must‑haves, then
            design and build a focused experience around them.
          </p>
        </div>

        <div className="about-card">
          <h3>What You Get</h3>
          <p>
            A site that’s fast, secure, mobile‑ready, and easy to grow with —
            plus clear communication from first call to launch.
          </p>
        </div>
      </div>

      <div className="about-highlight">
        <div className="about-card">
          <h3>Why It Matters</h3>
          <h5>
            Your website is often your first impression. We make sure it feels
            intentional, on‑brand, and built to convert.
          </h5>
        </div>
      </div>

      <div className="about-cta">
        <a href="/form">Tell Us About Your Project</a>
      </div>
    </div>
  );
}
