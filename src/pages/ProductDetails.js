import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import summaryApi from '../common';
import { ThreeDot } from 'react-loading-indicators';
import { FeatureProduct } from '../components/FeatureProduct';
import AddToCart from '../helper/AddToCart';
import Context from '../context';

export const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({
    productNAME: "",
    brandNAME: "",
    category: "",
    productIMAGES: [],
    description: "",
    price: "",
    sellingPRICE: "",
  });
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState();
  const [popupImage, setPopupImage] = useState(null); // New state for popup
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const { id } = useParams("id");
  const {fetchAddToCartCount} =useContext(Context);
  const fetchProduct = async () => {

    setLoading(true);
    try {
      const response = await fetch(summaryApi.product_details.url, {
        method: summaryApi.product_details.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success === true) {
        setProductDetails(data.data);
        setActiveImage(data?.data.productIMAGES[0]?.url);
      }
    } catch (err) {
      console.log("can't get the product details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0); // Scroll to the top of the page whenever id changes
  }, [id]);

  const handleImage = (url) => {
    setActiveImage(url);
  };

  const openPopup = (url) => {
    setPopupImage(url); // Set the image for the popup
  };

  const closePopup = () => {
    setPopupImage(null); // Close the popup
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();

    // Dispatch any necessary actions here

    // Call the AddToCart function directly
    await AddToCart(productId, quantity); // Pass the productId and quantity
    fetchAddToCartCount()
  };

  // Update quantity state when input changes
  const handleQuantityChange = (e) => {
    const value = Math.max(1, e.target.value); // Ensure quantity is at least 1
    setQuantity(value);
  };

  return (
    <div className='pt-8 md:pt-6 bg-slate-100'>
      {
        loading ? (
          <p className="h-screen flex justify-center items-center">
            <ThreeDot variant="bounce" color="#32cd32" size="medium" />
          </p>
        ) : (
          <div className="w-full mx-auto p-2">
            {/* Main Product Details */}
            <div className="flex flex-col lg:flex-row bg-white p-8 shadow-lg rounded-lg gap-12">

              {/* Left section: Product Images */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="w-full">
                  <img
                    src={activeImage}
                    alt={productDetails.productNAME}
                    className="rounded-lg object-contain w-full h-96 hover:shadow-xl transition-shadow duration-300 mix-blend-multiply"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                  {productDetails.productIMAGES.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Product Thumbnail ${index + 1}`}
                      onMouseEnter={() => handleImage(image.url)}
                      onClick={() => openPopup(image.url)} // Open popup on click
                      className="w-20 h-20 object-contain rounded-lg border hover:border-red-500 transition-border duration-300 cursor-pointer mix-blend-multiply"
                    />
                  ))}
                </div>
              </div>

              {/* Right section: Product Information */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h1 className="text-4xl font-bold text-gray-800">{productDetails.productNAME}</h1>
                <p className="text-gray-500 text-2xl"><span>Brand:</span> {productDetails.brandNAME}</p>
                <p className="text-gray-400 text-xl">{productDetails.category}</p>
                {/* Pricing section */}
                <div className="flex flex-row items-center space-x-4">
                  <span className="text-2xl font-bold text-red-500">₹{productDetails.sellingPRICE}</span>
                  <span className="text-xl line-through text-gray-400">₹{productDetails.price}</span>
                  <span className="text-xl text-green-500">
                    ({Math.round(((productDetails.price - productDetails.sellingPRICE) / productDetails.price) * 100)}% OFF)
                  </span>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-lg font-medium">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity} // Use state for value
                    onChange={handleQuantityChange} // Update state on change
                    className="w-20 border-gray-300 border rounded-lg px-4 py-2 text-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>

                {/* Buttons for Actions */}
                <div className="flex space-x-4">
                  <button className="bg-red-500 text-white font-semibold py-3 px-8 rounded-lg shadow hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                    onClick={(e) => handleAddToCart(e, productDetails._id)} // Use the productId and the quantity state
                  >
                    Add to Cart
                  </button>
                  <button className="bg-black text-white font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                    Buy it Now
                  </button>
                </div>

                {/* Offers section */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-xl mb-2">Offers Available</h3>
                  <p className="text-gray-600 text-sm">
                    🎁 Get an extra 5% discount on prepaid orders at checkout.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <span className='text-2xl font-bold'>Feature</span>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {productDetails.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Display all images below the main section */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-4 ">More Images</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {productDetails.productIMAGES.map((image, index) => (
                  <div key={index} className="relative bg-blend-multiply">
                    <img
                      src={image.url}
                      alt={`Product Image ${index + 1}`}
                      onClick={() => openPopup(image.url)} // Open popup on click
                      className="w-full h-[400px] bg-slate-50 p-4 mix-blend-multiply  rounded-lg object-contain shadow-md transition-shadow duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Popup for larger image view */}
            {popupImage && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                <div className="relative">
                  <img
                    src={popupImage}
                    alt="Popup Image"
                    className="max-w-full max-h-screen object-contain rounded-lg shadow-lg"
                  />
                  <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 text-white text-2xl bg-red-500 rounded-full p-2 hover:bg-red-600 transition duration-300"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      }
      <div>
        <h1 className="px-5 font-bold text-blue-600 text-2xl">Similar Products</h1>
        <FeatureProduct category={productDetails.category}></FeatureProduct>
      </div>
    </div>
  );
};
