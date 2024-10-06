import React, { useContext, useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import summaryApi from '../common';
import { ThreeDot } from 'react-loading-indicators';
import { Link } from 'react-router-dom';
import { AddToCart } from '../helper/AddToCart';
import Context from '../context';
import { SkeletonCard } from '../helper/Skeleton';

export const FeatureProduct = ({ category }) => {
  console.log("category",category)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState({});
  const [visibleCount, setVisibleCount] = useState(10); 
  // Initial count of products to show
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
    setHoveredImageIndex((prevState) => ({ ...prevState, [productId]: 0 }));
    const interval = setInterval(() => {
      setHoveredImageIndex((prevState) => {
        const productImages = data.find((product) => product._id === productId)?.productIMAGES;
        const newIndex = (prevState[productId] || 0) + 1;
        return {
          ...prevState,
          [productId]: newIndex >= productImages.length ? 0 : newIndex,
        };
      });
    }, 2000);
    setHoveredImageIndex((prevState) => ({ ...prevState, [`${productId}-intervalId`]: interval }));
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

  // Function to handle the "View More" button click
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Increase the count by 6
  };
  
  const handleAddToCart = async (e, productId,quantity) => {
    e.preventDefault();
    // Call the AddToCart function directly
    await AddToCart(productId, quantity); // Pass the productId and quantity
    await fetchAddToCartCount()
  };
  return (
    <div className="relative w-full  px-4 py-10 bg-gray-100">
      {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
          ))}
      </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.slice(0, visibleCount).map((product) => (
            <div
              key={product._id}
              className="p-4"
              onMouseEnter={() => handleMouseEnter(product._id)}
              onMouseLeave={() => handleMouseLeave(product._id)}
            >
              <Link to={`/product-details/${product._id}`}>
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
                      <div className='flex flex-row justify-start text-center'>
                        <div className="flex items-center gap-2 flex-row justify-between bg-white p-2 rounded-lg shadow-md border border-gray-200 w-full">
                          <div className="flex flex-row gap-2 justify-center text-center">
                            <span className="text-xl font-bold text-black">
                              ₹{product.sellingPRICE}
                            </span>
                            <span className="line-through text-gray-500 text-sm text-center mt-1">
                              ₹{product?.price}
                            </span>
                          </div>
                          <div className="flex items-center ml-1">
                            <span className="bg-red-600 text-white font-thin rounded-full px-1 py-1 text-sm">
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
        </div>
      )}
      {data.length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleViewMore}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default FeatureProduct;
