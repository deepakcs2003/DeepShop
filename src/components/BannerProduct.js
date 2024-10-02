import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import imageMob1 from '../assest/banner/img1_mobile.jpg';
import imageMob2 from '../assest/banner/img2_mobile.webp';
import imageMob3 from '../assest/banner/img3_mobile.jpg';
import imageMob4 from '../assest/banner/img4_mobile.jpg';
import imageMob5 from '../assest/banner/img5_mobile.png';

import p1 from '../assest/banner/p1.jpg';
import p2 from '../assest/banner/p2.jpg';
import p3 from '../assest/banner/p3.jpg';
import p4 from '../assest/banner/p3.jpg';
import p5 from '../assest/banner/p5.jpg';
import { AllProducts } from '../pages/AllProducts';

const featuredProducts = [
  { id: 1, name: 'Mobile', img: p1 },
  { id: 2, name: 'Television', img: p2 },
  { id: 3, name: 'Watch', img: p3 },
  { id: 4, name: 'Processor', img: p4 },
  { id: 5, name: 'Keyboard', img: p5 }
];

const offersDesktop = [
  image1,
  image2,
  image3,
  image4,
  image5
];

const offersMobile = [
  imageMob1,
  imageMob2,
  imageMob3,
  imageMob4,
  imageMob5
];

const testimonials = [
  { id: 1, text: 'Great service and amazing products!', author: 'John Doe' },
  { id: 2, text: 'I love shopping here. Always a great experience!', author: 'Jane Smith' },
  { id: 3, text: 'The best online store I’ve used. Highly recommend!', author: 'Alice Johnson' },
];

export const BannerProduct = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust the breakpoint as needed

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === (isMobile ? offersMobile : offersDesktop).length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change the image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [isMobile]);

  const handlePrevClick = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? (isMobile ? offersMobile : offersDesktop).length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === (isMobile ? offersMobile : offersDesktop).length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentOffers = isMobile ? offersMobile : offersDesktop;

  return (
    <div className="relative w-full">
      {/* Banner Section */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        {currentOffers.map((offer, index) => (
          <img
            key={index}
            src={offer}
            alt={`Offer ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentBannerIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <button
          onClick={handlePrevClick}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition duration-300"
        >
          &#10094;
        </button>
        <button
          onClick={handleNextClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition duration-300"
        >
          &#10095;
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {currentOffers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentBannerIndex ? 'bg-white' : 'bg-gray-500'
              }`}
            ></button>
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Amazing Offers!</h1>
          <p className="text-sm md:text-lg mb-4">Don't miss out on our latest deals.</p>
          <button className="px-4 py-2 md:px-6 md:py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition duration-300">
            Shop Now
          </button>
        </div>
      </div>
      <div>
      </div>
      {/* Featured Products Section */}
      <section className="py-6 px-4 bg-gray-100">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Featured Products</h2>
        <div className="relative overflow-x-auto flex space-x-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
              style={{ width: '200px', minWidth: '200px' }} // Ensures consistent width
            >
              <img src={product.img} alt={product.name} className="w-full h-36 object-cover rounded-lg mb-2 mix-blend-multiply" />
              <p className="text-sm md:text-base font-semibold text-gray-800">{product.name}</p>
            </div>
          ))}
        </div>
      </section>
      <div>
      </div>
      {/* Testimonials Section */}
      {/* <section className="py-6 px-4 bg-white">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Customer Testimonials</h2>
        <div className="flex flex-col space-y-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <p className="text-sm md:text-lg italic text-gray-600">"{testimonial.text}"</p>
              <p className="mt-2 text-right font-semibold text-gray-800">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};
