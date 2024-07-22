import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [progress, setProgress] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id && item.type === product.type);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.type === product.type ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id, type) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id || item.type !== type));
  };

  const clearCart = () => {
    setCart([]);
  };

  const confirmPurchase = () => {
    cart.forEach((item) => {
      if (item.type === 'booking') {
        setBookings((prevBookings) => [...prevBookings, { ...item, status: 'not started' }]);
      } else if (item.type === 'reservation') {
        setReservations((prevReservations) => [...prevReservations, item]);
      } else if (item.type === 'course') {
        setProgress((prevProgress) => [...prevProgress, { ...item, status: 'not started' }]);
      } else {
        setPurchases((prevPurchases) => [...prevPurchases, item]);
      }
    });
    clearCart();
  };

  const updateBookingStatus = (id, status) => {
    setBookings((prevBookings) => prevBookings.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
    setProgress((prevProgress) => prevProgress.map((course) => (course.id === id ? { ...course, status } : course)));
  };

  const removeFromProgress = (id) => {
    setProgress((prevProgress) => prevProgress.filter((course) => course.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        confirmPurchase,
        bookings,
        reservations,
        purchases,
        progress,
        updateBookingStatus,
        removeFromProgress,
        user,
        setUser
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
