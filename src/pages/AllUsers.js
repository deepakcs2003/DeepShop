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
    <div className="p-4 bg-gray-50">
      <header className="bg-blue-600 text-white p-4 mb-6 rounded-md shadow-md text-center">
        <h1 className="text-xl font-bold">All Users</h1>
      </header>

      <div className="overflow-x-auto lg:overflow-hidden">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
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
          <tbody className="text-sm">
            {allUsers.slice(0, visibleUsers).map((user, index) => (
              <tr key={user._id || user.id} className="text-gray-700 hover:bg-gray-100">
                <td className="py-2 px-4 border-b" data-label="Sr. No.">{index + 1}</td>
                <td className="py-2 px-4 border-b" data-label="Name">{user.name}</td>
                <td className="py-2 px-4 border-b" data-label="Email">{user.email}</td>
                <td className="py-2 px-4 border-b" data-label="Role">{user.role}</td>
                <td className="py-2 px-4 border-b" data-label="Created At">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-colors'
                    onClick={() => {
                      setUserUpdateData({
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        _id: user._id || user.id
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

        {openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={userUpdatedData.name}
            email={userUpdatedData.email}
            role={userUpdatedData.role}
            userId={userUpdatedData._id}
            callFun={fetchUserData}
          />
        )}
      </div>

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
      <style jsx>{`
  /* Styling for large screens */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }

  thead th {
    background-color: #f3f4f6;
    color: #333;
    padding: 12px;
    font-weight: bold;
  }

  /* Styling for mobile view (max-width: 768px) */
  @media (max-width: 768px) {
    table, thead, tbody, th, td, tr {
      display: block;
      width: 100%;
    }

    thead {
      display: none; /* Hide the table headers */
    }

    tr {
      margin-bottom: 16px;
      border-bottom: 1px solid #ddd;
    }

    td {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      text-align: left;
      position: relative;
      border: none;
      border-bottom: 1px solid #ddd;
    }

    td::before {
      content: attr(data-label); /* Show the label before each data */
      flex-basis: 30%; /* Adjust this for label width */
      font-weight: bold;
      color: #6b7280;
    }

    td:last-child {
      text-align: center;
      border-bottom: none;
    }
  }
`}</style>

    </div>
    
  );
};
