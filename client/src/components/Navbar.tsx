import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const token = localStorage.getItem("token");
  const isAdmin = !!token; // Modify this condition to properly check for admin role.
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo or Home Link */}
        <Link
          to='/'
          className='text-white text-xl font-bold hover:underline'
        >
          Home
        </Link>
        {/* Navigation Links */}
        <div className='space-x-4'>
          {!token ? (
            <>
              <Link
                to='/login'
                className='text-white hover:underline'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='text-white hover:underline'
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {isAdmin && (
                <>
                  <Link
                    to='/admin'
                    className='text-white hover:underline'
                  >
                    Admin
                  </Link>
                  <Link
                    to='/add-equipment'
                    className='text-white hover:underline'
                  >
                    Add Equipment
                  </Link>
                  <Link
                    to='/equipment-list'
                    className='text-white hover:underline'
                  >
                    Equipment List
                  </Link>
                  <Link
                    to='/create-package'
                    className='text-white hover:underline'
                  >
                    Create Package
                  </Link>
                  <Link
                    to='/packages' // Add this line
                    className='text-white hover:underline'
                  >
                    Package List
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
