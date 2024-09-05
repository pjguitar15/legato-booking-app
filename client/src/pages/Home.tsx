import React from "react";

const Home: React.FC = () => (
  <div className='flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6'>
    <div className='text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl'>
      <h1 className='text-4xl font-bold mb-4 text-gray-800'>Home Page</h1>
      <p className='text-lg text-gray-600'>
        Welcome to the Sounds and Lights Booking App!
      </p>
      {/* Add additional content or features here */}
    </div>
  </div>
);

export default Home;
