import React from 'react';
import { Link } from 'react-router-dom';
import ActivitySection from './ActivitySection';
import './Activities.css'; 

function Activities() {
  return (
    <div className="content">
      <h1 className="header-title">Welcome to Activities</h1>
      <p className="header-subtitle">Explore a variety of sports and services designed to keep you active and entertained.</p>
      <div className="activity-wrapper">
        <Link to="/swimming">
          <ActivitySection title="Swimming" imageUrl="/images/Poolpage.jpg" />
        </Link>
      </div>
      <div className="activity-wrapper">
        <Link to="/basketball">
          <ActivitySection title="Basketball" imageUrl="/images/basketpage.jpg" />
        </Link>
      </div>
      <div className="activity-wrapper">
        <Link to="/football">
          <ActivitySection title="Football" imageUrl="/images/soccerpage.jpg" />
        </Link>
      </div>
      <div className="activity-wrapper">
        <Link to="/tennis">
          <ActivitySection title="Tennis" imageUrl="/images/Tennispage.jpg" />
        </Link>
      </div>
    </div>
  );
}

export default Activities;
