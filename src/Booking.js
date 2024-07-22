import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from './context/CartContext';
import './Booking.css';

function Booking({ courses, instructors, sport, selectedInstructor }) {
  const { addToCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    startTime: '',
    endTime: '',
    course: courses[0],
    instructor: selectedInstructor || instructors[0],
    lanes: []
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      instructor: selectedInstructor || instructors[0],
    }));
  }, [selectedInstructor, instructors]);

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
    const duration = calculateDuration(formData.startTime, formData.endTime);
    const coursePrice = duration * 20;
    const lanePrices = formData.lanes.reduce((acc, lane) => acc + 5, 0); // Assuming each lane is $5
    const totalPrice = coursePrice + lanePrices;
    const product = {
      id: `${formData.date}-${formData.startTime}-${formData.endTime}`,
      type: 'booking',
      name: `${formData.course} with ${formData.instructor} on ${formData.date} from ${formData.startTime} to ${formData.endTime}`,
      price: totalPrice,
      quantity: 1,
      description: `Instructor: ${formData.instructor}, Duration: ${duration} hours, Lanes: ${formData.lanes.join(', ')}`,
    };
    addToCart(product);
    alert('Booking Confirmed');
  };

  const duration = calculateDuration(formData.startTime, formData.endTime);
  const coursePrice = duration * 20;
  const lanePrices = formData.lanes.reduce((acc, lane) => acc + 5, 0);
  const totalPrice = coursePrice + lanePrices;

  return (
    <div className="booking-container">
      <h2>Book an Individual {sport} Session</h2>
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
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
        <select
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          required
        >
          {instructors.map((instructor, index) => (
            <option key={index} value={instructor}>
              {instructor}
            </option>
          ))}
        </select>
        <div className="lanes-selection">
          <p>Select Lanes:</p>
          {['Lane 1', 'Lane 2', 'Lane 3'].map((lane, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name="lanes"
                value={lane}
                onChange={handleLaneChange}
              />
              {lane}
            </label>
          ))}
        </div>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default Booking;
