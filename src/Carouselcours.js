import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

function Carouselcours({ courses, onRegister }) {
  const sliderRef = React.useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
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
    centerPadding: '40px', // Adjust padding for spacing
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
            <img src={course.src} alt={`Slide ${index + 1}`} className="carousel-image" />
            <div className="carousel-details">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Date: {course.date}</p>
              <div className="carousel-footer">
                <span className="carousel-price">${course.price}</span>
                <button className="add-to-cart-button" onClick={() => onRegister(course)}>
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
    </div>
  );
}

export default Carouselcours;
