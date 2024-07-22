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

const basketballProducts = [
  {
    id: 1,
    src: 'https://via.placeholder.com/800x400?text=Basketball+1',
    name: 'Swimming Goggles',
    description: 'High-quality swimming goggles for clear vision underwater.',
    price: 25.99,
  },
  {
    id: 2,
    src: 'https://via.placeholder.com/800x400?text=Basketball+1',
    name: 'Swimming Cap',
    description: 'Comfortable and durable swimming cap.',
    price: 10.99,
  },
  {
    id: 3,
    src: 'https://via.placeholder.com/800x400?text=Basketball+1',
    name: 'Swim Fins',
    description: 'Enhance your swimming experience with these swim fins.',
    price: 29.99,
  },
  // Add more products as needed
];

const basketballteam = [
  {
    src: 'https://via.placeholder.com/800x400?text=Basketball+1',
    title: 'title',
    description: 'description',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Basketball+2',
    title: 'title',
    description: 'description',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Basketball+3',
    title: 'title',
    description: 'description',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Basketball+4',
    title: 'title',
    description: 'description',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Basketball+5',
    title: 'title',
    description: 'description',
    price: '$price',
  },
];

const basketballcours = [
  {
    src: 'https://via.placeholder.com/800x400?text=Basketball+1',
    title: 'Beginner Basketball',
    description: 'Introduction to basketball for beginners.',
    date: '2024-08-01',
    price: 50,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Basketball+1',
    title: 'Beginner Basketball',
    description: 'Introduction to basketball for beginners.',
    date: '2024-08-01',
    price: 50,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Basketball+1',
    title: 'Beginner Basketball',
    description: 'Introduction to basketball for beginners.',
    date: '2024-08-01',
    price: 50,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Basketball+1',
    title: 'Beginner Basketball',
    description: 'Introduction to basketball for beginners.',
    date: '2024-08-01',
    price: 50,
  },
  // Add more courses as needed
];

const basketballCourses = [
  'Beginner Basketball',
  'Intermediate Basketball',
  'Advanced Basketball',
  'Basketball Fitness',
  'Tactical Basketball'
];

const basketballInstructors = [
  'Michael Jordan',
  'LeBron James',
  'Kobe Bryant',
  'Shaquille O\'Neal',
  'Stephen Curry'
];

const basketballLanes = [
  { name: 'Court 1', price: 80 },
  { name: 'Court 2', price: 80 },
  { name: 'Court 3', price: 80 }
];

function Basketball() {
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
        <ActivitySection title="Basketball" imageUrl="https://via.placeholder.com/800x400?" />
        <h2>Equipments</h2>
        <Carouselequi products={basketballProducts} addToCart={handleAddToCart} />
        <h2>Our team</h2>
        <Carouselteam images={basketballteam} onBookNow={handleBookNow} />
        <Carouselcours courses={basketballcours} onRegister={handleRegister} />
        <Booking courses={basketballCourses} instructors={basketballInstructors} sport="Basketball" />
        <Reservation trainers={basketballInstructors} lanes={basketballLanes} sport="Basketball" />
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

export default Basketball;
