import React, { useState } from 'react';
import './RegistrationModal.css';

function RegistrationModal({ course, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(course, formData);
    onClose();
  };

  return (
    <div className="registration-modal">
      <div className="modal-content">
        <h2>Register for {course.title}</h2>
        <p>{course.description}</p>
        <p>Date: {course.date}</p>
        <p>Price: ${course.price}</p>
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
          <button type="submit">Register</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationModal;
