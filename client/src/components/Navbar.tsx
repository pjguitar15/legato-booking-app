import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => (
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
        <Link
          to='/admin'
          className='text-white hover:underline'
        >
          Admin
        </Link>
      </div>
      {/* Contact Button */}
      <Link to='/contact'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          Contact Us
        </button>
      </Link>
    </div>
  </nav>
);

export default Navbar;
