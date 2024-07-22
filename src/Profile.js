import React from 'react';
import './Profile.css';
import Progress from './Progress';
import Program from './Program';
import Goals from './Goals';
import Header from './header';
import Footer from './Footer';

function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-content">
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
    </div>
  );
}

export default Profile;
