import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="hero-section">
        <h1>About Us</h1>
        <p>Welcome to ClubCora! We are passionate about sports and fitness.</p>
      </div>
      <div className="content-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide high-quality sports training and facilities to our members. We believe in fostering a community where individuals can develop their athletic skills, stay healthy, and have fun.
        </p>
        <h2>Our Team</h2>
        <p>
          We have a diverse team of professional coaches and trainers who are dedicated to helping you achieve your fitness goals. Meet our team and find out more about their expertise and passion for sports.
        </p>
        <h2>Our Facilities</h2>
        <p>
          Our state-of-the-art facilities include swimming pools, tennis courts, football fields, and basketball courts. We ensure that our facilities are well-maintained and equipped with the latest gear to provide you with the best training environment.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
