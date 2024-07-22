import React, { useContext } from 'react';
import { CartContext } from './context/CartContext';

function Progress() {
  const { progress, updateBookingStatus, removeFromProgress } = useContext(CartContext);

  const handleStart = (course) => {
    updateBookingStatus(course.id, 'in progress');
  };

  const handleFinish = (course) => {
    updateBookingStatus(course.id, 'finished');
  };

  const handleDelete = (course) => {
    removeFromProgress(course.id);
  };

  const getStatusButton = (course) => {
    if (course.status === 'not started') {
      return <button onClick={() => handleStart(course)}>Start</button>;
    } else if (course.status === 'in progress') {
      return <button onClick={() => handleFinish(course)}>Finish</button>;
    } else if (course.status === 'finished') {
      return <button onClick={() => handleDelete(course)}>Delete</button>;
    }
  };

  return (
    <div>
      <h2>Course Progress</h2>
      <div className="profile-section">
        {progress.length > 0 ? (
          progress.map((course, index) => (
            <div key={index} className="profile-card">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>Status: {course.status}</p>
              {getStatusButton(course)}
            </div>
          ))
        ) : (
          <p>No courses registered.</p>
        )}
      </div>
    </div>
  );
}

export default Progress;
