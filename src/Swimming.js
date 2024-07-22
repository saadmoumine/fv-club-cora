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

const swimmingProducts = [
  {
    id: 1,
    src: 'https://via.placeholder.com/800x400?text=Swimming+1',
    name: 'Swimming Goggles',
    description: 'High-quality swimming goggles for clear vision underwater.',
    price: 25.99,
  },
  {
    id: 2,
    src: 'https://via.placeholder.com/800x400?text=Swimming+2',
    name: 'Swimming Cap',
    description: 'Comfortable and durable swimming cap.',
    price: 10.99,
  },
  {
    id: 3,
    src: 'https://via.placeholder.com/800x400?text=Swimming+3',
    name: 'Swim Fins',
    description: 'Enhance your swimming experience with these swim fins.',
    price: 29.99,
  },
  // Add more products as needed
];

const swimmingteam = [
  {
    src: 'https://via.placeholder.com/800x400?text=Swimming+1',
    title: 'Michael Phelps',
    description: 'American competitive swimmer.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Swimming+2',
    title: 'Katie Ledecky',
    description: 'American competitive swimmer.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Swimming+3',
    title: 'Ryan Lochte',
    description: 'American competitive swimmer.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Swimming+4',
    title: 'Missy Franklin',
    description: 'American-Canadian competitive swimmer.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Swimming+5',
    title: 'Caeleb Dressel',
    description: 'American competitive swimmer.',
    price: '$price',
  },
];

const swimmingcours = [
  {
    src: 'https://via.placeholder.com/800x400?text=Swimming+1',
    title: 'Beginner Swimming',
    description: 'Introduction to swimming for beginners.',
    date: '2024-08-01',
    price: 50,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Swimming+2',
    title: 'Intermediate Swimming',
    description: 'Intermediate level swimming skills.',
    date: '2024-08-08',
    price: 75,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Swimming+3',
    title: 'Advanced Swimming',
    description: 'Advanced swimming techniques and strategies.',
    date: '2024-08-15',
    price: 100,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Swimming+4',
    title: 'Swim to Fit',
    description: 'Improve your fitness with swimming.',
    date: '2024-08-22',
    price: 60,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Swimming+5',
    title: 'Water Aerobics',
    description: 'Aerobic exercises in the water.',
    date: '2024-08-29',
    price: 80,
  },
];

const swimmingCourses = [
  'Beginner Swimming',
  'Intermediate Swimming',
  'Advanced Swimming',
  'Swim to Fit',
  'Water Aerobics'
];

const swimmingInstructors = [
  'Michael Phelps',
  'Katie Ledecky',
  'Ryan Lochte',
  'Missy Franklin',
  'Caeleb Dressel'
];

const swimmingLanes = [
  { name: 'Lane 1', price: 50 },
  { name: 'Lane 2', price: 50 },
  { name: 'Lane 3', price: 50 }
];

function Swimming() {
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
        <ActivitySection title="Swimming" imageUrl="https://via.placeholder.com/800x400?" />
        <h2>Equipments</h2>
        <Carouselequi products={swimmingProducts} addToCart={handleAddToCart} />
        <h2>Our team</h2>
        <Carouselteam images={swimmingteam} onBookNow={handleBookNow} />
        <h2>Classes</h2>
        <Carouselcours courses={swimmingcours} onRegister={handleRegister} />
        <div ref={bookingRef}>
          <Booking courses={swimmingCourses} instructors={swimmingInstructors} sport="Swimming" selectedInstructor={selectedInstructor} />
        </div>
        <Reservation trainers={swimmingInstructors} lanes={swimmingLanes} sport="Swimming" />
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

export default Swimming;
