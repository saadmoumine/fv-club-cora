import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message Sent!');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="contactus-container">
      <header className="contactus-header">
        <h1>Contact Us</h1>
        <p>We would love to hear from you!</p>
      </header>

      <section className="contactus-section">
        <h2>Get in Touch</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <section className="contactus-section">
        <h2>Our Location</h2>
        <p>123 Fitness Ave, Workout City, WF 12345</p>
        <iframe
          title="ClubCora Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.6876449357825!2d144.96323251529517!3d-37.812000979751936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43a2b3e0c7%3A0x204d7e2718a1c2b3!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1602562441911!5m2!1sen!2sau"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
}

export default ContactUs;
