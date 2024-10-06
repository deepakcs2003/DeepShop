import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaUsers, FaBox } from 'react-icons/fa';
import ROLE from '../common/role';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 pt-4 bg-gray-100">
        {/* Header for Desktop and Mobile */}
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between fixed w-full z-30">
          <div className="flex items-center">
            {user?.uploadPic ? (
              <img
                src={user.uploadPic}
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover mr-4"
              />
            ) : (
              <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white rounded-full text-xl mr-4">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <p className="text-sm">{user?.name}</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-6">
            <Link to="all-users" className="flex items-center text-gray-200 hover:bg-gray-700 px-2 py-2 rounded">
              <FaUsers className="mr-2" /> All Users
            </Link>
            <Link to="all-products" className="flex items-center text-gray-200 hover:bg-gray-700 px-2 py-2 rounded">
              <FaBox className="mr-2" /> All Products
            </Link>
          </nav>
        </header>

        {/* Outlet for rendering nested routes */}
        <main className="mt-16">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminPanel;
