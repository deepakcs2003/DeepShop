import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import summaryApi from '../common';
import { toast } from 'react-toastify';

export const ChangeUserRole = ({ name, email, role, userId, onClose ,callFun}) => {
  const [userRole, setUserRole] = useState(role);

  const changeHandler = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(summaryApi.update_user.url, {
        method: summaryApi.update_user.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          role: userRole,
          userId
        })
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose(); 
        callFun(); 
      } else {
        toast.error(responseData.message || 'Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('An error occurred while updating the user role.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="block ml-auto">
          <IoMdClose size={24} onClick={onClose} className="cursor-pointer" />
        </div>          

        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Change User Role</h1>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Name:</span> {name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Email:</span> {email}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
            Select Role:
          </label>
          <select
            value={userRole}
            onChange={changeHandler} 
            className="block w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>{el}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300" onClick={updateUserRole}>
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
