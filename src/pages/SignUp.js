import React, { useState } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import axios from 'axios'; // Import axios for making API calls
import summaryApi from '../common';
import { toast } from 'react-toastify';

function SignUp() {
    // nevigation
    const nevigate=useNavigate()
    // State to manage password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // State to manage sign up form data
    const [signUpData, setSignUpData] = useState({
        uploadPic: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // State to handle the image preview
    const [imagePreview, setImagePreview] = useState("");

    // State to handle form submission status
    const [formStatus, setFormStatus] = useState(null);

    // Function to toggle password visibility
    const togglePasswordVisibility = (setter) => {
        setter((prev) => !prev);
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { id, value, type, files } = e.target;
    
        if (type === 'file') {
            const file = files && files[0]; // Check if 'files' is defined and contains at least one file
            if (file) {
                // console.log("file data name", file.name); // Safely access file.name here
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSignUpData(prev => ({
                        ...prev,
                        [id]: file.name, // Save the file name
                    }));
                    setImagePreview(reader.result); // Show image preview
                };
                reader.readAsDataURL(file); // Read the file as a Data URL
            } else {
                console.log("No file selected");
            }
        } else {
            setSignUpData(prev => ({
                ...prev,
                [id]: value // For non-file inputs, update the state as usual
            }));
        }
    };
    // Handle image delete
    const handleDeleteImage = () => {
        setSignUpData(prev => ({
            ...prev,
            uploadPic: ""
        }));
        setImagePreview("");
        document.getElementById('uploadPic').value = ""; // Clear file input
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(signUpData.password!==signUpData.confirmPassword){
            toast.error("password mismatch");
            return console.log("password and confirm password is different please enter same")
        }
        // Create a new FormData object
       const dataResponse =await fetch(summaryApi.signUp.url,{
         method:summaryApi.signUp.method,
         headers:{
            "content-type":"application/json"
         },
         body:JSON.stringify(signUpData)
       })
       const data= await dataResponse.json();
       console.log("data",data);
       if(data.success===true){
          toast.success(data.message);
          nevigate("/")
       }else{
        toast.error(data.message);
        nevigate("/login")
       }
       if(data.error){
        toast.error(data.message);
       }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
            <div className="m-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                    {imagePreview ? (
                        <div className="relative">
                            <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover" />
                            <button
                                type="button"
                                onClick={handleDeleteImage}
                                className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                                <FaTrash className="text-lg" />
                            </button>
                        </div>
                    ) : (
                        <FaUserCircle className="text-6xl text-gray-400" />
                    )}
                </div>

                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Picture Upload */}
                    <div>
                        <label htmlFor="uploadPic" className="block text-gray-700 text-sm font-medium mb-1">Upload Profile Picture</label>
                        <input
                            type="file"
                            id="uploadPic"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg"
                        />
                    </div>

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={signUpData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={signUpData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            value={signUpData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg pr-12"
                        />
                        {/* Toggle Password Visibility Button */}
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility(setShowPassword)}
                            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                        </button>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            value={signUpData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg pr-12"
                        />
                        {/* Toggle Confirm Password Visibility Button */}
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500"
                        >
                            {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 transform hover:scale-105"
                    >
                        Sign Up
                    </button>

                    {/* Form Status */}
                    {formStatus && (
                        <div className={`mt-4 p-4 ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-md`}>
                            {formStatus.message}
                        </div>
                    )}
                </form>

                {/* Login Link */}
                <p className="mt-4 text-center text-gray-600 text-sm">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-300">Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
