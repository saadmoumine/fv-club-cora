import React, { useContext } from 'react';
import Progress from './Progress';
import Goals from './Goals';
import { CartContext } from './context/CartContext';
import './MemberProfile.css';

function MemberProfile() {
  const { bookings = [], reservations = [], purchases = [], updateBookingStatus } = useContext(CartContext);

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
    <div className="profile-container">
      <h1>Member Profile</h1>
      <p>Welcome to your profile page, Member!</p>
      <p>Here you can update your information, view your activities, and more.</p>
      
      <div className="profile-section">
        <Progress 
          bookings={bookings}
          handleStart={handleStart}
          handleFinish={handleFinish}
          handleDelete={handleDelete}
        />
      </div>

      <h2>Individual Classes Booked</h2>
      <div className="profile-section">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} className="profile-card">
              <h3>{booking.name}</h3>
              <p>{booking.description}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))
        ) : (
          <p>No classes booked.</p>
        )}
      </div>

      <h2>Facilities Reserved</h2>
      <div className="profile-section">
        {reservations.length > 0 ? (
          reservations.map((reservation, index) => (
            <div key={index} className="profile-card">
              <h3>{reservation.name}</h3>
              <p>{reservation.description}</p>
              <p>Total: ${reservation.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No facilities reserved.</p>
        )}
      </div>

      <h2>Purchases</h2>
      <div className="profile-section">
        {purchases.length > 0 ? (
          purchases.map((purchase, index) => (
            <div key={index} className="profile-card">
              <h3>{purchase.name}</h3>
              <p>{purchase.description}</p>
              <p>Total: ${purchase.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No purchases made.</p>
        )}
      </div>
    </div>
  );
}

export default MemberProfile;
