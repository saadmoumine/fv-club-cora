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

const footballProducts = [
  {
    id: 1,
    src: 'https://via.placeholder.com/800x400?text=Football+1',
    name: 'Football Goggles',
    description: 'High-quality football goggles for clear vision.',
    price: 25.99,
  },
  {
    id: 2,
    src: 'https://via.placeholder.com/800x400?text=Football+2',
    name: 'Football Cap',
    description: 'Comfortable and durable football cap.',
    price: 10.99,
  },
  {
    id: 3,
    src: 'https://via.placeholder.com/800x400?text=Football+3',
    name: 'Football Shoes',
    description: 'High-quality football shoes for better performance.',
    price: 29.99,
  },
  // Add more products as needed
];

const footballteam = [
  {
    src: 'https://via.placeholder.com/800x400?text=Football+1',
    title: 'David Beckham',
    description: 'World-renowned football player.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Football+2',
    title: 'Lionel Messi',
    description: 'Argentine professional footballer.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Football+3',
    title: 'Cristiano Ronaldo',
    description: 'Portuguese professional footballer.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Football+4',
    title: 'Pele Santos',
    description: 'Brazilian retired professional footballer.',
    price: '$price',
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Football+5',
    title: 'Diego Maradona',
    description: 'Argentine football manager and retired professional footballer.',
    price: '$price',
  },
];

const footballcours = [
  {
    src: 'https://via.placeholder.com/800x400?text=Football+1',
    title: 'Beginner Football',
    description: 'Introduction to football for beginners.',
    date: '2024-08-01',
    price: 50,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Football+2',
    title: 'Intermediate Football',
    description: 'Intermediate level football skills.',
    date: '2024-08-08',
    price: 75,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Football+4',
    title: 'Football Fitness',
    description: 'Improve your fitness for football.',
    date: '2024-08-22',
    price: 60,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Football+5',
    title: 'Tactical Football',
    description: 'Learn tactical football strategies.',
    date: '2024-08-29',
    price: 80,
  },
  {
    src: 'https://via.placeholder.com/800x400?text=Football+3',
    title: 'Advanced Football',
    description: 'Advanced football techniques and strategies.',
    date: '2024-08-15',
    price: 100,
  },
];

const footballCourses = [
  'Beginner Football',
  'Intermediate Football',
  'Advanced Football',
  'Football Fitness',
  'Tactical Football'
];

const footballInstructors = [
  'David Beckham',
  'Lionel Messi',
  'Cristiano Ronaldo',
  'Pele Santos',
  'Diego Maradona'
];

const footballLanes = [
  { name: 'Pitch 1', price: 100 },
  { name: 'Pitch 2', price: 100 },
  { name: 'Pitch 3', price: 100 }
];

function Football() {
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
        <ActivitySection title="Football" imageUrl="https://via.placeholder.com/800x400?" />
        <h2>Equipments</h2>
        <Carouselequi products={footballProducts} addToCart={handleAddToCart} />
        <h2>Our team</h2>
        <Carouselteam images={footballteam} onBookNow={handleBookNow} />
        <h2>Classes</h2>
        <Carouselcours courses={footballcours} onRegister={handleRegister} />
        <div ref={bookingRef}>
          <Booking courses={footballCourses} instructors={footballInstructors} sport="Football" selectedInstructor={selectedInstructor} />
        </div>
        <Reservation trainers={footballInstructors} lanes={footballLanes} sport="Football" />
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

export default Football;
