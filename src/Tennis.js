import React, { useContext, useState, useRef } from 'react';
import { CartContext } from './context/CartContext';
import './App.css';
import './Sport.css';
import Carouselequi from './Carouselequi';
import Carouselteam from './Carouselteam';
import Carouselcours from './Carouselcours';
import ActivitySection from './ActivitySection';
import Booking from './Booking';
import Reservation from './Reservation';
import QuantityPopup from './QuantityPopup';
import RegistrationModal from './RegistrationModal';

const tennisProducts = [
  {
    id: 1,
    src: 'https://via.placeholder.com/800x400?text=Tennis+1',
    name: 'Tennis Racket',
    description: 'High-quality tennis racket for competitive play.',
    price: 120.99,
  },
  {
    id: 2,
    src: 'https://via.placeholder.com/800x400?text=Tennis+2',
    name: 'Tennis Balls',
    description: 'Pack of 3 high-quality tennis balls.',
    price: 15.99,
  },
  {
    id: 3,
    src: 'https://via.placeholder.com/800x400?text=Tennis+3',
    name: 'Tennis Shoes',
    description: 'Comfortable and durable tennis shoes.',
    price: 79.99,
  },
  // Add more products as needed
];

const tennisteam = [
  {
    src: 'https://via.placeholder.com/800x400?text=Tennis+1',
    title: 'Roger Federer',
    description: 'Swiss professional tennis player.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Tennis+2',
    title: 'Serena Williams',
    description: 'American professional tennis player.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Tennis+3',
    title: 'Rafael Nadal',
    description: 'Spanish professional tennis player.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Tennis+4',
    title: 'Novak Djokovic',
    description: 'Serbian professional tennis player.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Tennis+5',
    title: 'Naomi Osaka',
    description: 'Japanese professional tennis player.',
    price: '$price',
  },
];

const tenniscours = [
  {
    src: 'https://via.placeholder.com/800x400?text=Tennis+1',
    title: 'Beginner Tennis',
    description: 'Introduction to tennis for beginners.',
    date: '2024-08-01',
    price: 50,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Tennis+2',
    title: 'Intermediate Tennis',
    description: 'Intermediate level tennis skills.',
    date: '2024-08-08',
    price: 75,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Tennis+3',
    title: 'Advanced Tennis',
    description: 'Advanced tennis techniques and strategies.',
    date: '2024-08-15',
    price: 100,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Tennis+4',
    title: 'Tennis Fitness',
    description: 'Improve your fitness for tennis.',
    date: '2024-08-22',
    price: 60,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Tennis+5',
    title: 'Tactical Tennis',
    description: 'Learn tactical tennis strategies.',
    date: '2024-08-29',
    price: 80,
  },
];

const tennisCourses = [
  'Beginner Tennis',
  'Intermediate Tennis',
  'Advanced Tennis',
  'Tennis Fitness',
  'Tactical Tennis'
];

const tennisInstructors = [
  'Roger Federer',
  'Serena Williams',
  'Rafael Nadal',
  'Novak Djokovic',
  'Naomi Osaka'
];

const tennisLanes = [
  { name: 'Court 1', price: 100 },
  { name: 'Court 2', price: 100 },
  { name: 'Court 3', price: 100 }
];

function Tennis() {
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const bookingRef = useRef(null);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const handleConfirmPopup = (product, quantity) => {
    if (window.confirm(`Do you want to add ${quantity} of ${product.title} to the cart?`)) {
      addToCart(product, quantity);
    }
    setSelectedProduct(null);
  };

  const handleBookNow = (instructor) => {
    setSelectedInstructor(instructor);
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegister = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseRegistration = () => {
    setSelectedCourse(null);
  };

  const handleConfirmRegistration = (course, formData) => {
    const product = {
      id: `${course.date}-${course.title}`,
      type: 'course',
      name: `${course.title} on ${course.date}`,
      price: course.price,
      quantity: 1,
      description: `Course: ${course.title}, Date: ${course.date}, Attendee: ${formData.name}, Email: ${formData.email}`,
    };
    addToCart(product);
    alert('Registration Confirmed');
  };

  return (
    <div className="Sport">
      <div className="content">
        <ActivitySection title="Tennis" imageUrl="https://via.placeholder.com/800x400?" />
        <h2>Equipments</h2>
        <Carouselequi products={tennisProducts} addToCart={handleAddToCart} />
        <h2>Our team</h2>
        <Carouselteam images={tennisteam} onBookNow={handleBookNow} />
        <h2>Classes</h2>
        <Carouselcours courses={tenniscours} onRegister={handleRegister} />
        <div ref={bookingRef}>
          <Booking courses={tennisCourses} instructors={tennisInstructors} sport="Tennis" selectedInstructor={selectedInstructor} />
        </div>
        <Reservation trainers={tennisInstructors} lanes={tennisLanes} sport="Tennis" />
      </div>
      {selectedProduct && (
        <QuantityPopup
          product={selectedProduct}
          onClose={handleClosePopup}
          onConfirm={handleConfirmPopup}
        />
      )}
      {selectedCourse && (
        <RegistrationModal
          course={selectedCourse}
          onClose={handleCloseRegistration}
          onConfirm={handleConfirmRegistration}
        />
      )}
    </div>
  );
}

export default Tennis;
