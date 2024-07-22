import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [accountType, setAccountType] = useState('guest');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(formData.email, accountType);
      if (accountType === 'member') {
        navigate('/member-profile');
      } else if (accountType === 'instructor') {
        navigate('/instructor-profile');
      } else {
        navigate('/home');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="step-container">
        <h2>Login</h2>
        <div className="account-type-selection">
          <label>
            <input
              type="radio"
              name="accountType"
              value="guest"
              checked={accountType === 'guest'}
              onChange={handleAccountTypeChange}
            />
            Guest
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
              value="member"
              checked={accountType === 'member'}
              onChange={handleAccountTypeChange}
            />
            Member
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
              value="instructor"
              checked={accountType === 'instructor'}
              onChange={handleAccountTypeChange}
            />
            Instructor
          </label>
        </div>
        {accountType !== 'guest' && (
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <button type="submit" className="custom-button">Login</button>
          </form>
        )}
        {accountType === 'guest' && (
          <button onClick={() => navigate('/home')} className="custom-button">Continue as Guest</button>
        )}
      </div>
    </div>
  );
}

export default Login;
