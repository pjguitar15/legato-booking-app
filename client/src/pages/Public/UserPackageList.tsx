// src/pages/UserPackageList.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Package, Equipment } from "../../types/PackageTypes"; // Import the Package and Equipment interfaces

const UserPackageList: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get<Package[]>(
          "http://localhost:5000/api/packages/all"
        );
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>Available Packages</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className='border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white'
          >
            <div className='p-4'>
              <h3 className='text-lg font-semibold'>{pkg.name}</h3>
              <p className='text-gray-700 text-xl font-semibold'>
                Price: ${pkg.price.toFixed(2)}
              </p>
              <h4 className='text-md font-semibold mt-4'>
                Included Equipment:
              </h4>
              <ul className='list-disc ml-5 mt-2'>
                {pkg.equipment.map((eq: Equipment) => (
                  <li
                    key={eq._id}
                    className='mb-2'
                  >
                    <p className='font-semibold'>
                      {eq.brand} {eq.model}
                    </p>
                    {eq.description && <p>{eq.description}</p>}
                    {eq.price && <p>Price: ${eq.price.toFixed(2)}</p>}
                    {eq.type && <p>Type: {eq.type}</p>}
                  </li>
                ))}
              </ul>
              <Link
                to={`/package/${pkg._id}`}
                className='text-blue-500 hover:underline mt-4 block'
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPackageList;
