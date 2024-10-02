import React, { useContext, useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from '../common';
import AddToCart from '../helper/AddToCart';
import { Link } from 'react-router-dom';
import Context from '../context';

export const Cart = () => {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 0.00;
  const token = localStorage.getItem('token');
  const {fetchAddToCartCount,cartProductCount} =useContext(Context);


  useEffect(() => {
    fetchCartItems();
  }, [cartProductCount]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(summaryApi.all_cart_item.url, {
        method: summaryApi.all_cart_item.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
      });
      const data = await response.json();
      
      // Avoid duplicates
      const cartItems = data?.cartItems || [];
      setItems(cartItems);
      
      // Calculate subtotal and total quantity
      const newSubtotal = calculateSubtotal(cartItems);

      // Update subtotal
      setSubtotal(newSubtotal);
      
      // Dispatch Redux actions once
      

    } catch (err) {
      toast.error('Error fetching cart items');
    }
  };

  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const increaseQuantity = async (item) => {
    await AddToCart(item.productId, 1);
    fetchAddToCartCount()
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity > 1) {
      await AddToCart(item.productId, -1);
      fetchAddToCartCount()
    } else {
      deleteItem(item.productId);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await fetch(summaryApi.delete_item.url, {
        method: summaryApi.delete_item.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId: itemId })
      });
    } catch (err) {
      toast.error('Error removing item from cart');
    }
    fetchAddToCartCount()
  };

  const totalItems = items.length;
  const totalPrice = subtotal + shippingCost;

  return (
    <div className="flex flex-col items-center py-8 px-4 md:px-0 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-11/12">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-2/3 md:px-10 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Shopping Cart</h2>
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 flex-col md:flex-row justify-between items-center py-4 border-b border-gray-200">
                <img src={item.images[0].url} alt={item.name} className="w-24 h-24 object-contain rounded-md mb-4 md:mb-0" />
                <div className="flex-1 text-center md:text-left pl-4">
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                  <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                  <h3 className="text-lg font-semibold text-gray-800">{item.brandName}</h3>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0 gap-1">
                  <button onClick={() => decreaseQuantity(item)} className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-lg transition duration-200">
                    <FaMinus />
                  </button>
                  <span className="font-semibold text-gray-700">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item)} className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-lg transition duration-200">
                    <FaPlus />
                  </button>
                </div>
                <p className="text-lg font-semibold mt-4 md:mt-0 text-gray-700">₹{item.price.toFixed(2)}</p>
                <button onClick={() => deleteItem(item.productId)} className="text-gray-500 hover:text-red-600 transition duration-200 mt-4 md:mt-0">
                  <FaTrashAlt />
                </button>
              </div>
            ))}
            <Link to="/" className="text-coral-600 mt-6 inline-block hover:underline">
              <FaArrowLeft className="inline-block mr-2" /> Back to shop
            </Link>
          </div>

          <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Summary</h2>
            <div className="flex justify-between mb-4">
              <p className="text-gray-600">Items ({totalItems})</p>
              <p className="font-semibold text-gray-800">₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-4 gap-3">
              <p className="text-gray-600">Shipping</p>
              <select className="bg-white border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-coral-600">
                <option>Standard Delivery</option>
                <option>Cash on Delivery</option>
                <option>Pay by UPI</option>
              </select>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-gray-600">Promo Code</p>
              <input type="text" placeholder="Enter your code" className="bg-white border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-coral-600" />
            </div>
            <div className="flex justify-between mt-4 border-t border-gray-200 pt-4">
              <p className="text-lg font-semibold text-gray-800">Total Price</p>
              <p className="text-lg font-semibold text-gray-800">₹{totalPrice.toFixed(2)}</p>
            </div>
            <button className="w-full bg-green-600 text-white p-4 rounded-lg mt-6 hover:bg-coral-700 transition duration-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
