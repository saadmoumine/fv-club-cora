import React, { useContext } from 'react';
import { CartContext } from './context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, clearCart, user, confirmPurchase } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmPurchase = () => {
    if (user && user.role === 'member') {
      confirmPurchase();
      navigate('/profile');
    } else {
      alert('Please log in as a member to confirm the purchase.');
      navigate('/login');
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img src={process.env.PUBLIC_URL + item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>${Number(item.price).toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total Price: ${total.toFixed(2)}</h3>
            <div className="cart-buttons">
              <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
              <button className="confirm-purchase-button" onClick={handleConfirmPurchase}>Confirm Purchase</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
