import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

export const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Desktop and Mobile */}
      <aside
        className={`lg:w-64 bg-gray-800 text-white p-6 lg:relative lg:pt-16 fixed lg:static z-30 lg:block transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="text-center mb-6">
          {/* Sidebar User Info */}
          {user?.uploadPic ? (
            <img
              src={user.uploadPic}
              alt="User Avatar"
              className="h-20 w-20 rounded-full mx-auto object-cover"
            />
          ) : (
            <div className="h-16 w-16 flex items-center justify-center bg-blue-500 text-white rounded-full mx-auto text-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="mt-4 text-sm text-gray-400">Role: {user?.role}</p>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="space-y-4 flex flex-col">
          <Link to="all-users" className="block text-gray-200 hover:bg-gray-700 px-4 py-2 rounded">
            All Users
          </Link>
          <Link to="all-products" className="block text-gray-200 hover:bg-gray-700 px-4 py-2 rounded">
            All Products
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
