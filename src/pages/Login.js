import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {fetchAddToCartCount,userdetails} = useContext(Context);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handler function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Handler function for input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(summaryApi.signIn.url, {
        credentials: "include", // Include cookies in request
        method: summaryApi.signIn.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData),
      });

      const dataApi = await response.json();
      console.log("dataapi in login page of frontend",dataApi);
      if (dataApi.success) {
        toast.success(dataApi.message);
        // Store the token in localStorage
        // console.log("dataof login Api",dataApi.data);
        localStorage.setItem('token', dataApi.token); // Assuming the token is in data.token
        navigate('/');
        userdetails();
        fetchAddToCartCount();
        // console.log("generalContext contains", generalContext.userdetails());
      } else {
        toast.error(dataApi.message);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.error(err);
    }
  };
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div className="m-10 bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center animate-fadeIn">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg pr-12"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
            </button>
            <Link to={'/forgot_password'} className='underline text-red-500 mt-4'>
              Forgot password?
            </Link>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account? <Link to="/sign-up" className="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-300">Sign Up</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
