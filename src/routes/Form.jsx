import { useState } from "react";
import "./form.css";
export default function Contact() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  function handleChange(e) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  }
  function validate() {
    const newErrors = {};
    if (!fields.name.trim()) newErrors.name = "Name is required.";
    if (!fields.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!fields.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
    } else {
      setErrors({});
      console.log("Form submitted:", fields);
      alert("Message sent!");
    }
  }
  return (
    <div className="contact-page">
      {/* CONTACT HEADER SECTION */}
      {/* <h1>Contact</h1> */}
      {/* CONTACT FORM SECTION */}
      
      <form className="contact-form" onSubmit={handleSubmit}>
      <h1>Send a Message</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            className={errors.name ? "invalid" : ""}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            className={errors.email ? "invalid" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            rows="4"
            value={fields.message}
            onChange={handleChange}
            className={errors.message ? "invalid" : ""}
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <button type="submit" className="btn-primary">Send Message</button>
      </form>
       {/* CONTACT HEADER SECTION */}
      <div className="alt-email">
      <p>
        Alternatively you can email us at <strong>hello@snaparrow.co.uk</strong> to get a quote.
      </p>
      <p>
        Or tell us more about your project and we’ll guide you through the next steps.
      </p></div>
    </div>
  );
}