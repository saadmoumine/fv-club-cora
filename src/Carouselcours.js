import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

function Carouselcours({ courses, onRegister }) {
  const sliderRef = React.useRef(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', date: '' });

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const handleRegisterNow = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleConfirmRegistration = () => {
    onRegister(selectedCourse, userInfo);
    handleCloseModal();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '40px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '20px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '10px',
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <button className="prev-button" onClick={previous}>
        &lt;
      </button>
      <Slider ref={sliderRef} {...settings}>
        {courses.map((course, index) => (
          <div key={index} className="carousel-slide">
            <img src={process.env.PUBLIC_URL+course.src} alt={`Slide ${index + 1}`} className="carousel-image" />
            <div className="carousel-details">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Date: {course.date}</p>
              <div className="carousel-footer">
                <span className="carousel-price">${course.price}</span>
                <button className="add-to-cart-button" onClick={() => handleRegisterNow(course)}>
                  Register now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <button className="next-button" onClick={next}>
        &gt;
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Register for {selectedCourse.title}</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userInfo.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={userInfo.date}
                onChange={handleChange}
                required
              />
            </form>
            <button onClick={handleConfirmRegistration}>Confirm</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carouselcours;
