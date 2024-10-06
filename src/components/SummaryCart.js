import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCart } from '../store/cartSlice';

export const SummaryCart = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItems); // Access cart items

  console.log("cartItem", cartItem);

  const calculateSubTotal = () => {
    return cartItem.reduce((total, product) => total + product.sellingPrice * product.quantity, 0).toFixed(2);
  };

  const subTotal = parseFloat(calculateSubTotal());
  const discount = (subTotal * 0.1).toFixed(2);
  const tax = (subTotal * 0.02).toFixed(2); // Assuming a fixed tax
  const total = (subTotal - discount + parseFloat(tax)).toFixed(2);

  const handleDelete = (id) => {
    dispatch(removeFromCart(id)); // Dispatch remove action
  };

  const handleIncrement = (productId) => {
    dispatch(updateCart({ id: productId, quantityChange: 1 })); // Increment quantity
  };

  const handleDecrement = (productId) => {
    dispatch(updateCart({ id: productId, quantityChange: -1 })); // Decrement quantity
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-4 rounded-3xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg">
        <span className="bg-white p-2 rounded-full mr-2 shadow-md">
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M9 3v12m6-12v6" />
          </svg>
        </span>
        Order Summary
      </h2>

      {/* Product Items */}
      <div className="mb-4">
        {cartItem.length > 0 ? (
          cartItem.map((product) => (
            <div
              key={product.id}
              className="flex items-center relative justify-between mb-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <button
                onClick={() => handleDelete(product.productId)} // Dispatch remove action
                className="bg-red-200 p-2 absolute top-[-12px] left-[-6px] rounded-full text-red-500 hover:bg-red-300 hover:text-red-700 transition duration-300"
              >
                <FaTrash /> {/* Add delete icon */}
              </button>
              <img
                src={product.images && product.images.length > 0 ? product.images[0].url : 'placeholder-image-url'}
                alt={product.productName}
                className="w-16 h-16 rounded-full shadow-md"
              />
              <div className="flex-grow mx-3 text-sm md:text-base">
                <h3 className="font-normal text-blue-800">{product.productName}</h3>
                <h4 className='font-bold text-sm'>{product.brandName}</h4>
              </div>
              <div className="flex-col justify-center items-center space-x-4 space-y-2">
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handleDecrement(product.productId)} // Decrement quantity
                    className="bg-gray-200 p-2 rounded-full text-gray-500 hover:bg-blue-200 hover:text-blue-500 transition duration-300"
                  >
                    <FaMinus />
                  </button>
                  <span className="font-semibold text-lg text-gray-700">{product.quantity}</span>
                  <button
                    onClick={() => handleIncrement(product.productId)} // Increment quantity
                    className="bg-gray-200 p-2 rounded-full text-gray-500 hover:bg-blue-200 hover:text-blue-500 transition duration-300"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="font-semibold text-blue-900 text-lg">
                  ₹{(product.sellingPrice * product.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        )}
      </div>

      {/* Promo Code Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Promo Code"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <button className="w-full mt-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
          Apply Coupon
        </button>
      </div>

      {/* Price Breakdown */}
      <div className="text-gray-700 space-y-3 mb-4">
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span>₹{subTotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>10%(₹{discount})</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>2%   ₹{tax}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-blue-900">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
};
