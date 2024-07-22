import React, { useState, useContext } from 'react';
import { CartContext } from './context/CartContext';
import './Reservation.css';

function Reservation({ trainers, lanes, sport }) {
  const { addToCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    startTime: '',
    endTime: '',
    trainer: trainers[0],
    lanes: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLaneChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, lanes: [...formData.lanes, value] });
    } else {
      setFormData({ ...formData, lanes: formData.lanes.filter((lane) => lane !== value) });
    }
  };

  const calculateDuration = (start, end) => {
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const duration = (endTime - startTime) / 1000 / 60 / 60; // duration in hours
    return duration;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDateTime = new Date();
    const selectedDateTime = new Date(`${formData.date}T${formData.startTime}:00`);

    if (selectedDateTime < currentDateTime) {
      alert('Selected time is in the past. Please choose a future time.');
      return;
    }

    const duration = calculateDuration(formData.startTime, formData.endTime);
    const lanePrices = formData.lanes.reduce((acc, lane) => acc + 50, 0); // Assuming each lane is $50
    const totalPrice = duration * 20 + lanePrices;
    const product = {
      id: `${formData.date}-${formData.startTime}-${formData.endTime}-trainer`,
      type: 'reservation',
      name: `Reservation on ${formData.date} from ${formData.startTime} to ${formData.endTime}`,
      price: totalPrice,
      quantity: 1,
      description: `Trainer: ${formData.trainer}, Duration: ${duration} hours, Lanes: ${formData.lanes.join(', ')}`,
    };
    addToCart(product);
    alert('Reservation Confirmed');
  };

  const duration = calculateDuration(formData.startTime, formData.endTime);
  const lanePrices = formData.lanes.reduce((acc, lane) => acc + 50, 0);
  const totalPrice = duration * 20 + lanePrices;

  return (
    <div className="reservation-container">
      <h2>Reserve a {sport} Facility</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
        <select
          name="trainer"
          value={formData.trainer}
          onChange={handleChange}
          required
        >
          {trainers.map((trainer, index) => (
            <option key={index} value={trainer}>
              {trainer}
            </option>
          ))}
        </select>
        <div className="lanes-selection">
          <p>Select Lanes:</p>
          {lanes.map((lane, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name="lanes"
                value={lane.name}
                onChange={handleLaneChange}
              />
              {lane.name} + ${lane.price}
            </label>
          ))}
        </div>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button type="submit">Reserve Now</button>
      </form>
    </div>
  );
}

export default Reservation;
