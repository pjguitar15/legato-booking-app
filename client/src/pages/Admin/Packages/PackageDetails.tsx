// src/pages/PackageDetails.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Package } from "../../../types/PackageTypes"; // Import the Package interface

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<Package | null>(null); // Use the Package type
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get<Package>(
          `http://localhost:5000/api/packages/${id}`
        );
        setPkg(response.data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackage();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/packages/delete/${id}`);
      navigate("/packages"); // Redirect to package list after deletion
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const handleUpdate = () => {
    navigate(`/package/edit/${id}`); // Redirect to the update page
  };

  return (
    <div className='p-6'>
      {pkg ? (
        <>
          <h1 className='text-3xl font-bold mb-4'>{pkg.name}</h1>
          <p className='text-gray-700'>Price: ${pkg.price.toFixed(2)}</p>
          <h2 className='text-xl font-semibold mb-2'>Included Equipment</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {pkg.equipment.map((eq) => (
              <div
                key={eq._id}
                className='border border-gray-300 rounded-lg overflow-hidden shadow-md'
              >
                <img
                  src={eq.imageUrl}
                  alt={`${eq.brand} ${eq.model}`}
                  className='w-full h-48 object-cover'
                />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold'>
                    {eq.brand} {eq.model}
                  </h3>
                  {eq.description && (
                    <p className='text-gray-600'>{eq.description}</p>
                  )}
                  {eq.type && <p className='text-gray-600'>Type: {eq.type}</p>}
                  {eq.price && (
                    <p className='text-gray-600'>
                      Price: ${eq.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleUpdate}
            className='mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          >
            Edit Package
          </button>
          <button
            onClick={handleDelete}
            className='mt-4 ml-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
          >
            Delete Package
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PackageDetails;
