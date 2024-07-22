import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { CartContext } from './context/CartContext';

function SignUp() {
  const { setUser } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountType: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    membershipID: '',
    instructorID: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (formData.accountType === 'guest') {
      setUser({ email: formData.email, role: formData.accountType });
      navigate('/home');
    } else {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }
    if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character";
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
      setUser({ email: formData.email, role: formData.accountType });
      if (formData.accountType === 'member') {
        navigate('/member-profile');
      } else if (formData.accountType === 'instructor') {
        navigate('/instructor-profile');
      }
    }
  };

  return (
    <div className="sign-up-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
      {step === 1 && (
        <div className="step-container">
          <h2>Select Account Type</h2>
          <div className="account-type-selection">
            <label>
              <input
                type="radio"
                name="accountType"
                value="guest"
                checked={formData.accountType === 'guest'}
                onChange={handleChange}
              />
              Guest
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="member"
                checked={formData.accountType === 'member'}
                onChange={handleChange}
              />
              Member
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="instructor"
                checked={formData.accountType === 'instructor'}
                onChange={handleChange}
              />
              Instructor
            </label>
          </div>
          <button onClick={nextStep} disabled={!formData.accountType} className="custom-button">Next</button>
        </div>
      )}
      {step === 2 && formData.accountType === 'member' && (
        <div className="step-container">
          <h2>Member Details</h2>
          <input
            type="text"
            name="membershipID"
            placeholder="Membership ID"
            value={formData.membershipID}
            onChange={handleChange}
            required
          />
          <div className="steps-buttons">
            <button type="button" onClick={previousStep} className="custom-button">Back</button>
            <button onClick={nextStep} className="custom-button">Next</button>
          </div>
        </div>
      )}
      {step === 2 && formData.accountType === 'instructor' && (
        <div className="step-container">
          <h2>Instructor Details</h2>
          <input
            type="text"
            name="instructorID"
            placeholder="Instructor ID"
            value={formData.instructorID}
            onChange={handleChange}
            required
          />
          <div className="steps-buttons">
            <button type="button" onClick={previousStep} className="custom-button">Back</button>
            <button onClick={nextStep} className="custom-button">Next</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="step-container">
          <h2>Sign Up</h2>
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          <div className="steps-buttons">
            <button type="button" onClick={previousStep} className="custom-button">Back</button>
            <button type="submit" className="custom-button">Sign Up</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignUp;
