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
    src: '/images/Basketballb.jpg',
    name: 'Basketball',
    description: 'Official size and weight basketball for professional games.',
    price: 29.99,
  },
  {
    id: 2,
    src: '/images/Basketball Hoop.webp',
    name: 'Basketball Hoop',
    description: 'Durable and adjustable basketball hoop for indoor and outdoor use.',
    price: 199.99,
  },
  {
    id: 3,
    src: '/images/Basketball Net.jpg',
    name: 'Basketball Net',
    description: 'Heavy-duty basketball net compatible with most standard hoops.',
    price: 12.99,
  },
  {
    id: 4,
    src: '/images/Basketball Shoes.jpg',
    name: 'Basketball Shoes',
    description: 'High-performance basketball shoes with excellent grip and support.',
    price: 99.99,
  },
  {
    id: 5,
    src: '/images/Basketball Jersey.jpg',
    name: 'Basketball Jersey',
    description: 'Breathable and lightweight basketball jersey for maximum comfort.',
    price: 49.99,
  },
  // Add more products as needed
];


const basketballteam = [
  {
    src: '/images/avatar-male.png',
    title: 'Coach John Doe',
    description: 'Experienced coach with a background in professional basketball.',
    price: 50,
  },
  {
    src: '/images/avatar-female.png',
    title: 'Coach Jane Smith',
    description: 'Former college basketball star and expert in defensive strategies.',
    price: 45,
  },
  {
    src: '/images/avatar-male.png',
    title: 'Coach Mike Johnson',
    description: 'Specializes in shooting techniques and offensive plays.',
    price: 55,
  },
  {
    src: '/images/avatar-female.png',
    title: 'Coach Emily Williams',
    description: 'Youth basketball coach with a focus on skill development.',
    price: 40,
  },
  {
    src: '/images/avatar-male.png',
    title: 'Coach David Brown',
    description: 'Fitness trainer and basketball conditioning specialist.',
    price: 60,
  },
];


const basketballcours = [
  {
    src: '/images/Beginner Basketball.jpg',
    title: 'Beginner Basketball',
    description: 'Introduction to basketball for beginners.',
    date: '2024-08-01',
    price: 50,
  },
  {
    src: '/images/Intermediate Basketball.jpg',
    title: 'Intermediate Basketball',
    description: 'Enhance your skills with intermediate level techniques and drills.',
    date: '2024-08-15',
    price: 75,
  },
  {
    src: '/images/Advanced Basketball.jpg',
    title: 'Advanced Basketball',
    description: 'Master advanced techniques and strategies for competitive play.',
    date: '2024-09-01',
    price: 100,
  },
  {
    src: '/images/Basketball Fitness.webp',
    title: 'Basketball Fitness',
    description: 'Improve your fitness level with basketball-specific workouts.',
    date: '2024-09-15',
    price: 60,
  },
  {
    src: '/images/Tactical Basketball.jpg',
    title: 'Tactical Basketball',
    description: 'Learn the tactical aspects of basketball, including game strategies.',
    date: '2024-10-01',
    price: 80,
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
  'John Doe',
  'Jane Smith',
  'Mike Johnson',
  'Emily Williams',
  'David Brown'
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
       <ActivitySection title="Basketball" imageUrl="/images/basketpage.jpg" />
        <h2>Equipments</h2>
        <Carouselequi products={basketballProducts} addToCart={handleAddToCart} />
        <h2>Our team</h2>
        <Carouselteam images={basketballteam} onBookNow={handleBookNow} />
        <h2>Classes</h2>
        <Carouselcours courses={basketballcours} onRegister={handleRegister} />
        <Booking courses={basketballCourses} instructors={basketballInstructors} sport="Basketball" ref={bookingRef} selectedInstructor={selectedInstructor} />
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
