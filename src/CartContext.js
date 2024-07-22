import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product, quantity) => {
    setCart([...cart, { ...product, quantity }]);
  };

  const updateBookingStatus = (id, status) => {
    setBookings(bookings.map(booking => booking.id === id ? { ...booking, status } : booking));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const confirmPurchase = () => {
    if (user && user.role === 'member') {
      cart.forEach(item => {
        if (item.type === 'booking') {
          setBookings(prevBookings => [...prevBookings, { ...item, status: 'not started' }]);
        } else if (item.type === 'reservation') {
          setReservations(prevReservations => [...prevReservations, item]);
        } else {
          setPurchases(prevPurchases => [...prevPurchases, item]);
        }
      });
      clearCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        bookings,
        reservations,
        purchases,
        user,
        setUser,
        addToCart,
        updateBookingStatus,
        removeFromCart,
        clearCart,
        confirmPurchase
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
