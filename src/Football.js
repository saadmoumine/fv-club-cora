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
    src: '/images/Soccer Ball.jpg',
    name: 'Soccer Ball',
    description: 'Official size and weight soccer ball for professional games.',
    price: 29.99,
  },
  {
    id: 2,
    src: '/images/Soccer Cleats.webp',
    name: 'Soccer Cleats',
    description: 'High-quality soccer cleats for better performance.',
    price: 79.99,
  },
  {
    id: 3,
    src: '/images/Shin Guards.jpg',
    name: 'Shin Guards',
    description: 'Durable shin guards for maximum protection.',
    price: 19.99,
  },
  {
    id: 4,
    src: '/images/Goalkeeper Gloves.jpg',
    name: 'Goalkeeper Gloves',
    description: 'Professional goalkeeper gloves with excellent grip.',
    price: 39.99,
  },
  // Add more products as needed
];


const footballteam = [
  {
    src: '/images/avatar-male.png',
    title: 'David Beckham',
    description: 'World-renowned football player.',
    price: 20,
  },
  {
    src: '/images/avatar-male.png',
    title: 'Lionel Messi',
    description: 'Argentine professional footballer.',
    price: 20,
  },
  {
    src: '/images/avatar-male.png',
    title: 'Cristiano Ronaldo',
    description: 'Portuguese professional footballer.',
    price: 20,
  },
  {
    src: '/images/avatar-male.png',
    title: 'Pele Santos',
    description: 'Brazilian retired professional footballer.',
    price: 20,
  },
  {
    src: '/images/avatar-male.png',
    title: 'Diego Maradona',
    description: 'Argentine football manager and retired professional footballer.',
    price: 20,
  },
];

const footballcours = [
  {
    src: '/images/Beginner Football.webp',
    title: 'Beginner Football',
    description: 'Introduction to football for beginners.',
    date: '2024-08-01',
    price: 50,
  },
  {
    src: '/images/Intermediate Football.jpg',
    title: 'Intermediate Football',
    description: 'Intermediate level football skills.',
    date: '2024-08-08',
    price: 75,
  },
  {
    src: '/images/Football Fitness.webp',
    title: 'Football Fitness',
    description: 'Improve your fitness for football.',
    date: '2024-08-22',
    price: 60,
  },
  {
    src: '/images/Tactical Football.jpg',
    title: 'Tactical Football',
    description: 'Learn tactical football strategies.',
    date: '2024-08-29',
    price: 80,
  },
  {
    src: '/images/Advanced Football.jpg',
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
        <ActivitySection title="Football" imageUrl="/images/soccerpage.jpg" />
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
