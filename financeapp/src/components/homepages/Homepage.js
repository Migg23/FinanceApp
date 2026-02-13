import React from "react";
import Navbar from './Navbar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const images = [
    'https://img.spoonacular.com/recipes/654515-312x231.jpg',
    'https://img.spoonacular.com/recipes/639512-312x231.png',
    'https://img.spoonacular.com/recipes/654515-312x231.jpg',
  ];

  return (
    <>
      <Navbar /> 
      <div className="home">
        <h1>Budget Buddy</h1>
        <p>Start saving money and finding meals that fit within your budget!</p>

        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HomePage;