import React from 'react';
import { Link } from 'react-router-dom';
import ActivitySection from './ActivitySection';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="content">
      <h1 className="header-title">Welcome to Club Cora</h1>
      <p className="header-subtitle">Explore a variety of activities and services designed to keep you active and entertained.</p>
      <div className="activity-wrapper">
        <Link to="/swimming">
          <ActivitySection title="Swimming" imageUrl="/images/swimming.jpg" />
        </Link>
      </div>
      <div className="activity-wrapper">
        <Link to="/basketball">
          <ActivitySection title="Basketball" imageUrl="/images/basketball.jpg" />
        </Link>
      </div>
      <div className="activity-wrapper">
        <Link to="/football">
          <ActivitySection title="Football" imageUrl="/images/football.webp" />
        </Link>
      </div>
      <div className="activity-wrapper">
        <Link to="/tennis">
          <ActivitySection title="Tennis" imageUrl="/images/tennis.jpg" />
        </Link>
      </div>
    </div>
  );
}

export default Home;
