import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
// import Cookies from 'js-cookie';  // Make sure to install js-cookie package

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const context=useContext(Context)
  const handleLogOut = async () => {
    try {
      const response = await fetch(summaryApi.logout_user.url, {
        method: summaryApi.logout_user.method,
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        // Clear client-side cookies and session storage
        // Cookies.remove('token');  // Replace 'token' with the actual cookie name
        localStorage.clear();
        sessionStorage.clear();
        
        toast.success(data.message);
        dispatch(setUserDetails(null));
        setIsProfileOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
    context.fetchAddToCartCount();
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !profileRef.current.contains(event.target)
    ) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="top-0 left-0 w-full z-50 bg-white shadow-md h-18 fixed ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3">
        {/* Logo Section */}
        <div className="flex items-center w-full md:w-auto">
          <Link to="/" className="flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0HE99ddny-TJWSiHDFBhsOmucNVm_sPfreQ&s"
              className="h-14 w-14 rounded-full"
              alt="Logo"
            />
            <h1 className="text-gray-800 text-2xl font-bold ml-4">ShopMate</h1>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <div className="relative flex items-center w-full max-w-md mx-auto border border-gray-300 rounded-full bg-gray-100 focus-within:bg-white transition-all">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-2 pl-4 pr-14 text-gray-700 placeholder-gray-500 bg-transparent rounded-full focus:outline-none"
            />
            <button className="absolute right-0 top-0 bottom-0 bg-gradient-to-r from-red-400 to-red-600 text-white h-full w-12 rounded-full flex items-center justify-center shadow-lg hover:from-red-500 hover:to-red-700 transition-colors">
              <IoIosSearch className="text-lg" />
            </button>
          </div>
        </div>

        {/* Icons and User Info */}
        <div className="flex items-center gap-7 mt-4 md:mt-0 relative">
          {user && user._id ? (
            <div
              ref={profileRef}
              className="relative flex items-center gap-3 text-gray-700 text-2xl cursor-pointer hover:text-gray-900 transition-colors duration-300"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              {user.uploadPic ? (
                <img
                  src={user.uploadPic}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white rounded-full">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              {isProfileOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-14 w-64 bg-white border border-gray-300 shadow-lg rounded-lg z-10"
                >
                  <div className="p-4">
                    <p className="text-gray-800 font-medium text-lg">Welcome back, {user.name}</p>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>
                  <div className="p-4 border-t border-gray-200  md:block">
                    <Link to="/admin-panel/all-products">
                      <p className="text-gray-700 hover:text-gray-900">Admin Panel</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <FaUserAlt />
            </Link>
          )}

          {/* Cart Icon */}
          <Link to="/cart">
          <div className="relative text-gray-700 text-2xl cursor-pointer hover:text-gray-900 transition-colors duration-300">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {context.cartProductCount}
            </span>
          </div>
          </Link>
       

          {/* Login/Logout Button */}
          <div className="relative text-gray-700 text-lg cursor-pointer hover:text-gray-900 transition-colors duration-300">
            {user ? (
              <button
                onClick={handleLogOut}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
