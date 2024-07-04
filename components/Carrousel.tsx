import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }: any) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
  };

  return (
    <Slider {...settings}>
      {images.map((image: any, index: number) => (
        <div
          key={index}
          className="py-5 carousel-image-wrapper h-100 overflow-hidden"
        >
          <img
            src={image}
            alt={`Slide ${index}`}
            style={{ maxHeight: "800px" }}
            className="w-full h-full object-cover rounded-lg transform scale-100"
          />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
