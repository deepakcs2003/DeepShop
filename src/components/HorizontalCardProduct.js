import React, { useContext, useEffect, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { BsCart3 } from 'react-icons/bs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import summaryApi from '../common';
import { ThreeDot } from 'react-loading-indicators';
import { Link } from 'react-router-dom';
import {AddToCart} from "../helper/AddToCart";
import Context from '../context';

// Custom arrow components for previous and next navigation
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
    onClick={onClick}
  >
    <MdArrowForwardIos className="text-white text-xl" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
    onClick={onClick}
  >
    <MdArrowBackIos className="text-white text-xl" />
  </div>
);

export const HorizontalCardProduct = ({ category }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState({});
  const {fetchAddToCartCount} = useContext(Context);

  const categoryProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(summaryApi.category_wise_product.url, {
        method: summaryApi.category_wise_product.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }),
      });

      const result = await response.json();
      setLoading(false);
      setData(result.data);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    categoryProduct();
  }, [category]);

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
    const interval = setInterval(() => {
      setHoveredImageIndex((prevState) => {
        const newIndex = (prevState[productId] || 0) + 1;
        const productImages = data.find((product) => product._id === productId).productIMAGES;

        return {
          ...prevState,
          [productId]: newIndex >= productImages.length ? 0 : newIndex,
        };
      });
    }, 2000);
    setHoveredImageIndex((prevState) => ({ ...prevState, [productId]: 0 }));
    setHoveredImageIndex((prevState) => ({
      ...prevState,
      [`${productId}-intervalId`]: interval,
    }));
  };

  const handleMouseLeave = (productId) => {
    setHoveredProductId(null);
    const intervalId = hoveredImageIndex[`${productId}-intervalId`];
    clearInterval(intervalId);
    setHoveredImageIndex((prevState) => {
      const newState = { ...prevState };
      delete newState[`${productId}-intervalId`];
      return newState;
    });
  };
  const handleAddToCart = async(e, productId, quantity) => {
    e.preventDefault();
    
    // Dispatch the action to Redux to add the product to cart
    await AddToCart(productId, quantity); // Pass the productId, quantity, and token
    await fetchAddToCartCount();
  };

  return (
    <div className="relative w-full px-4 py-10">
      <h1 className="px-5 font-bold text-blue-600 text-2xl">Popular's {category}</h1>
      {loading ? (
        <p className="text-center">
          <ThreeDot variant="bounce" color="#32cd32" size="medium" />
        </p>
      ) : (
        <Slider {...settings}>
          {data.map((product) => (
            <div
              key={product._id}
              className="p-4"
              onMouseEnter={() => handleMouseEnter(product._id)}
              onMouseLeave={() => handleMouseLeave(product._id)}
            >
              <Link to={`/product-details/${product._id}`} >
                <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 w-full bg-white hover:shadow-2xl">
                  <div className="relative">
                    <img
                      src={
                        product.productIMAGES?.[
                          hoveredProductId === product._id
                            ? hoveredImageIndex[product._id]
                            : 0
                        ]?.url || '/default-image.jpg'
                      }
                      alt={product.productNAME}
                      className="w-full h-32 object-contain rounded-t-lg pt-2 cursor-pointer transition-all ease-out"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                      {product.productNAME}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      <strong>Brand:</strong> {product.brandNAME}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p className="text-gray-700 text-sm mt-2 mb-2 truncate">
                      {product.description}
                    </p>
                    <div className="flex justify-between flex-col gap-2">
                      <div className='flex flex-row justify-start text-center '>
                        <div className="flex items-center gap-2 flex-row justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200 w-full">
                          <div className="flex flex-row gap-2 justify-center text-center">
                            <span className="text-xl font-bold text-black">
                              ₹{product.sellingPRICE}
                            </span>
                            <span className="line-through text-gray-500 text-sm text-center mt-1">
                              ₹{product?.price}
                            </span>
                          </div>

                          <div className="flex items-center ml-1">
                            <span className="bg-red-600 text-white font-normal rounded-full px-3 py-1 text-sm">
                              {Math.round(((product.price - product.sellingPRICE) / product.price) * 100)}% OFF
                            </span>
                          </div>
                        </div>

                      </div>
                      <button className="bg-blue-600 text-white py-2 px-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 transition duration-300 ease-in-out"
                        onClick={(e) =>handleAddToCart(e, product._id, 1)}
                        >
                        Add to Cart
                        <BsCart3 className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>

            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};
