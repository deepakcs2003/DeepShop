import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/banner1.jpg';
import image2 from '../assest/banner/banner3.jpg';
import image3 from '../assest/banner/banner4.jpg';
import image4 from '../assest/banner/banner8.jpg';
import image5 from '../assest/banner/banner9.jpg';

const offersDesktop = [
  image1,
  image2,
  image3,
  image4,
  image5
];

export const BannerProduct = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === offersDesktop.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change the image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handlePrevClick = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? offersDesktop.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === offersDesktop.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full">
      {/* Banner Section */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        {offersDesktop.map((offer, index) => (
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
          {offersDesktop.map((_, index) => (
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
    </div>
  );
};
