import React, { useEffect, useState } from 'react';
import summaryApi from '../common';
import { MdEdit } from "react-icons/md";
import { ChangeUserRole } from '../components/ChangeUserRole';

export const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(10);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [userUpdatedData, setUserUpdateData] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(summaryApi.alluser.url, {
        method: summaryApi.alluser.method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAllUsers(data.data || []);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const loadMoreUsers = () => {
    setVisibleUsers(prevVisibleUsers => prevVisibleUsers + 10);
  };

  return (
    <div className="hidden lg:block p-4 bg-gray-50">
      <header className="bg-blue-600 text-white p-4 mb-6 rounded-md shadow-md text-center">
        <h1 className="text-xl font-bold">All Users</h1>
      </header>

      {/* User List */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-xs md:text-sm">
              <th className="py-2 px-4 border-b">Sr. No.</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm table-body-padding pl-10">
            {allUsers.slice(0, visibleUsers).map((user, index) => (
              <tr key={user._id || user.id} className="text-gray-700">
                {/* Log the user object to check structure */}
                {console.log("User Object:", user)}
                <td className="py-2 px-12 border-b">{index + 1}</td>
                <td className="py-2 px-12 border-b">{user.name}</td>
                <td className="py-2 px-12 border-b">{user.email}</td>
                <td className="py-2 px-12 border-b">{user.role}</td>
                <td className="py-2 px-12 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-12 border-b">
                  <button
                    className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                    onClick={() => {
                      setUserUpdateData({
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        _id: user._id || user.id // Use either _id or id depending on what is available
                      });
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Render ChangeUserRole component when the modal is open */}
        {openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={userUpdatedData.name}
            email={userUpdatedData.email}
            role={userUpdatedData.role}
            userId={userUpdatedData._id}
             // Correctly pass _id (user's ID)
             callFun={fetchUserData}
          />
        )}
      </div>

      {/* Load More button */}
      {visibleUsers < allUsers.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreUsers}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
