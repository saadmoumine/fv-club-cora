import React, { useState } from 'react';
import './QuantityPopup.css';

function QuantityPopup({ product, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = () => {
    onConfirm(product, quantity);
  };

  const totalPrice = Number(product.price) * quantity;

  return (
    <div className="quantity-popup">
      <div className="popup-content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ${Number(product.price).toFixed(2)}</p>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <p>Total: ${totalPrice.toFixed(2)}</p>
        <div className="popup-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default QuantityPopup;
