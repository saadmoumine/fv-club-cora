import React, { useContext } from 'react';
import { CartContext } from './context/CartContext';

function Progress() {
  const { bookings, updateBookingStatus } = useContext(CartContext);

  if (!bookings || bookings.length === 0) {
    return <p>No classes booked.</p>;
  }

  const handleStart = (booking) => {
    updateBookingStatus(booking.id, 'in progress');
  };

  const handleFinish = (booking) => {
    updateBookingStatus(booking.id, 'finished');
  };

  const handleDelete = (booking) => {
    updateBookingStatus(booking.id, 'deleted');
  };

  return (
    <div className="progress-container">
      <h2>Class Progress</h2>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div key={index} className="progress-card">
            <h3>{booking.name}</h3>
            <p>{booking.description}</p>
            <p>Status: {booking.status}</p>
            <button onClick={() => handleStart(booking)}>Start</button>
            <button onClick={() => handleFinish(booking)}>Finish</button>
            <button onClick={() => handleDelete(booking)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No classes booked.</p>
      )}
    </div>
  );
}

export default Progress;
