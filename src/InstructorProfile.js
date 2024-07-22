import React from 'react';
import Progress from './Progress';
import Program from './Program';
import Goals from './Goals';

function InstructorProfile() {
  return (
    <div className="profile-container">
      <h1>Instructor Profile</h1>
      <p>Welcome to your profile page, Instructor!</p>
      <p>Here you can update your information, view your classes, and more.</p>
        <h2>User Profile</h2>
        <div className="profile-section">
          <Progress />
        </div>
        <div className="profile-section">
          <Program />
        </div>
        <div className="profile-section">
          <Goals />
        </div>
      </div>
  );
}

export default InstructorProfile;
