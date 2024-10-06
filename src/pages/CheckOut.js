import React from 'react';
import { FaCcVisa, FaCcMastercard, FaGooglePay, FaPlus, FaMinus } from 'react-icons/fa';
import { SiPaytm, SiPhonepe } from 'react-icons/si';
import { SummaryCart } from '../components/SummaryCart';
import { commonCountries } from '../helper/Option';
import { useSelector } from 'react-redux';

const productList = [
    { id: 1, name: "Product 1", quantity: 2, price: 29.99 },
    { id: 2, name: "Product 2", quantity: 1, price: 19.99 },
    { id: 3, name: "Product 3", quantity: 1, price: 39.99 },
];


export const CheckOut = () => {
    return (
        <div className="w-screen h-full flex justify-center items-center bg-gradient-to-br from-pink-100 via-blue-50 to-purple-200 py-10">
            <div className='w-full h-full flex-row mx-16 md:flex'>
                <div className=' m-3 md:mx-12 md:mt-3'>
                    <SummaryCart></SummaryCart>
                </div>
                <div className="bg-white rounded-3xl shadow-lg w-[95%] sm:w-[90%] md:w-[70%] lg:w-[50%] p-4 m-3 sm:p-8">
                    {/* Shipping Information */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Shipping Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">First Name*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="Roshani" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">Last Name*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="Perera" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">Address Line 1*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="no 149/2, barandana" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">Address Line 2</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="hindogolla" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">City*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="Colombo" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">State/Province*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="Western" />
                            </div>
                            <div>
                            <label className="block mb-2 font-medium text-gray-600">Country*</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300">
                                    <option> Select Country</option>
                                    {
                                        commonCountries.map((option)=>(
                                            <option
                                            value={option.value} 
                                            key={option.id}>
                                                {option.label}
                                            </option>
                                        ))

                                    }
                                    
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">Zip Code*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="60034" />
                            </div>
                        </div>
                    </div>

                    {/* Billing Information */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Billing Information</h2>
                        <div className="flex items-center mb-6">
                            <input type="checkbox" className="mr-3 focus:ring-purple-500" defaultChecked />
                            <label className="text-gray-600">Same as the shipping details</label>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">First Name*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="Roshani" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">Last Name*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="Perera" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">Address Line 1*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="no 149/2, barandana" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">Address Line 2</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="hindogolla" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">City*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="Colombo" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">State/Province*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="Western" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">Country*</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300">
                                    <option> Select Country</option>
                                    {
                                        commonCountries.map((option)=>(
                                            <option
                                            value={option.value} 
                                            key={option.id}>
                                                {option.label}
                                            </option>
                                        ))

                                    }
                                    
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-600">Zip Code*</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="60034" />
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Payment Information</h2>
                        <div className="space-y-4">
                            {/* Credit Card Option */}
                            <div>
                                <input type="radio" name="payment" className="mr-3" />
                                <label className="font-medium text-gray-600">Credit Card</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-600">Cardholder Name*</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="Roshani Perera" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-600">Card Number*</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="XXXX-XXXX-XXXX-XXXX" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-600">Expiry Date*</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="MM/YY" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-600">CVV*</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="123" />
                                    </div>
                                </div>
                            </div>

                            {/* UPI Payment Option */}
                            <div>
                                <input type="radio" name="payment" className="mr-3" />
                                <label className="font-medium text-gray-600">UPI Payment</label>
                                <div className="grid grid-cols-1 gap-6 mt-2">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-600">UPI ID*</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="example@upi" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-600">Mobile Number*</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-purple-500 transition duration-300" placeholder="Your mobile number" />
                                    </div>
                                </div>
                            </div>

                            {/* Digital Wallets */}
                            <div className=''>
                                <h3 className="font-medium text-gray-600 mt-4  ">Digital Wallets</h3>
                                <div className="flex items-center space-x-2 mt-2 justify-between">
                                    <div className="flex items-center space-x-2 mt-2 justify-between">
                                        <input type="radio" name="payment" className="mr-2" />
                                        <FaGooglePay className="text-gray-600 text-xl md:text-4xl" />
                                        <label className="font-medium text-gray-600  text-xs md:text-lg">Google Pay</label>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2 justify-between">
                                        <input type="radio" name="payment" className="mr-2" />
                                        <SiPaytm className="text-gray-600 text-xl md:text-4xl" />
                                        <label className="font-medium text-gray-600 text-xs md:text-lg">Paytm</label>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2 justify-between">
                                        <input type="radio" name="payment" className="mr-2" />
                                        <SiPhonepe className="text-gray-600 text-xl md:text-xl" />
                                        <label className="font-medium text-gray-600 ml-1  text-xs md:text-lg">PhonePe</label>
                                    </div>
                                </div>
                            </div>

                            {/* Cash on Delivery Option */}
                            <div>
                                <input type="radio" name="payment" className="mr-3" />
                                <label className="font-medium text-gray-600">Cash on Delivery</label>
                            </div>

                            {/* Bank Transfer Option */}
                            <div>
                                <input type="radio" name="payment" className="mr-3" />
                                <label className="font-medium text-gray-600">Bank Transfer</label>
                            </div>
                        </div>
                    </div>
                    {/* Place Order Button */}
                    {/* Terms & Place Order */}
                    <div className="flex items-center mb-4">
                        <input type="checkbox" className="w-4 h-4 text-blue-500 rounded focus:ring-blue-400 focus:ring-opacity-25" />
                        <label className="ml-2 text-sm text-gray-600">
                            I agree to the <span className="text-blue-500 underline">Terms & Conditions</span> and{' '}
                            <span className="text-blue-500 underline">Privacy Policy</span>.
                        </label>
                    </div>
                    <div className="text-center">
                        <button className="w-full p-4 bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-lg shadow-lg hover:bg-gradient-to-l focus:ring focus:ring-purple-300 transition duration-300">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
