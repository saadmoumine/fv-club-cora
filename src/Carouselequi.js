import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

function Carouselequi({ products, addToCart }) {
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
        {products.map((product, index) => (
          <div key={index} className="carousel-slide">
            <img src={process.env.PUBLIC_URL + product.src} alt={`Slide ${index + 1}`} className="carousel-image" />
            <div className="carousel-details">
              <h3 className="carousel-title">{product.name}</h3>
              <p className="carousel-description">{product.description}</p>
              <div className="carousel-footer">
                <span className="carousel-price">${Number(product.price).toFixed(2)}</span>
                <button onClick={() => addToCart(product)} className="add-to-cart-button">Add to Cart</button>
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

export default Carouselequi;
