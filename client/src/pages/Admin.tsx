// src/pages/Admin.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  const handleAddEquipment = () => {
    // Redirect to Add Equipment page
    navigate("/add-equipment");
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl'>
        <h1 className='text-3xl font-bold mb-4 text-gray-800'>Admin Page</h1>
        <p className='text-gray-700 mb-6'>
          Manage your bookings and settings here.
        </p>
        {/* Add additional admin functionality here */}
        <button
          onClick={handleAddEquipment}
          className='mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
        >
          Add Equipment
        </button>
        <button
          onClick={handleLogout}
          className='mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
