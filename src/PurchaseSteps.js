import React, { useState, useContext } from 'react';
import { CartContext } from './context/CartContext';
import './PurchaseSteps.css';

function PurchaseSteps() {
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    deliveryOption: 'pickup',
    paymentOption: 'online',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const { cart, confirmPurchase } = useContext(CartContext);

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const handleConfirmPurchase = () => {
    if (validateStep(2)) {
      confirmPurchase();
      alert('Purchase Confirmed!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (shippingInfo.deliveryOption === 'delivery') {
        if (
          !shippingInfo.name ||
          !shippingInfo.address ||
          !shippingInfo.city ||
          !shippingInfo.state ||
          !shippingInfo.zip ||
          !shippingInfo.country
        ) {
          alert('Please fill in all required fields for delivery.');
          return false;
        }
      }
      if (shippingInfo.paymentOption === 'online') {
        if (
          !shippingInfo.cardNumber ||
          !shippingInfo.expiryDate ||
          !shippingInfo.cvv
        ) {
          alert('Please fill in all required payment fields.');
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className="purchase-steps">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 2) * 100}%` }}></div>
      </div>
      <div className="steps-content">
        {step === 1 && <Step1 cart={cart} shippingInfo={shippingInfo} handleChange={handleChange} />}
        {step === 2 && <Step2 cart={cart} shippingInfo={shippingInfo} />}
      </div>
      <div className="steps-buttons">
        {step > 1 && <button onClick={previousStep}>Back</button>}
        {step < 2 && <button onClick={nextStep}>Next</button>}
        {step === 2 && <button onClick={handleConfirmPurchase}>Confirm Purchase</button>}
      </div>
    </div>
  );
}

function Step1({ cart, shippingInfo, handleChange }) {
  return (
    <div>
      <h3>Step 1: Enter Shipping and Payment Information</h3>
      <form>
        <h4>Pick up or Delivery:</h4>
        <div className="delivery-option">
          <label>
            <input
              type="radio"
              name="deliveryOption"
              value="pickup"
              checked={shippingInfo.deliveryOption === 'pickup'}
              onChange={handleChange}
            />
            Pick Up at the Club
          </label>
          <label>
            <input
              type="radio"
              name="deliveryOption"
              value="delivery"
              checked={shippingInfo.deliveryOption === 'delivery'}
              onChange={handleChange}
            />
            Delivery
          </label>
        </div>

        {shippingInfo.deliveryOption === 'delivery' && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={shippingInfo.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingInfo.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={shippingInfo.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={shippingInfo.zip}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingInfo.country}
              onChange={handleChange}
              required
            />
          </>
        )}

        <h4>Payment Method:</h4>
        <div className="payment-option">
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="online"
              checked={shippingInfo.paymentOption === 'online'}
              onChange={handleChange}
            />
            Pay Online
          </label>
          {shippingInfo.deliveryOption === 'pickup' && (
            <label>
              <input
                type="radio"
              name="paymentOption"
                value="register"
                checked={shippingInfo.paymentOption === 'register'}
                onChange={handleChange}
              />
              Pay at the Register
            </label>
          )}
        </div>

        {shippingInfo.paymentOption === 'online' && (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={shippingInfo.cardNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={shippingInfo.expiryDate}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={shippingInfo.cvv}
              onChange={handleChange}
              required
            />
          </>
        )}

        <h4>Items in Cart:</h4>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={process.env.PUBLIC_URL + item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

function Step2({ cart, shippingInfo }) {
  return (
    <div>
      <h3>Step 2: Review and Confirm</h3>
      <h4>Shipping Information:</h4>
      <p>Name: {shippingInfo.name}</p>
      {shippingInfo.deliveryOption === 'delivery' && (
        <>
          <p>Address: {shippingInfo.address}</p>
          <p>City: {shippingInfo.city}</p>
          <p>State: {shippingInfo.state}</p>
          <p>Zip Code: {shippingInfo.zip}</p>
          <p>Country: {shippingInfo.country}</p>
        </>
      )}
      <p>Delivery Option: {shippingInfo.deliveryOption === 'pickup' ? 'Pick Up at the Club' : 'Delivery'}</p>
      <p>Payment Option: {shippingInfo.paymentOption === 'online' ? 'Pay Online' : 'Pay at the Register'}</p>

      {shippingInfo.paymentOption === 'online' && (
        <>
          <h4>Payment Information:</h4>
          <p>Card Number: **** **** **** {shippingInfo.cardNumber.slice(-4)}</p>
          <p>Expiry Date: {shippingInfo.expiryDate}</p>
        </>
      )}

      <h4>Items in Cart:</h4>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <img src={process.env.PUBLIC_URL + item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PurchaseSteps;
