import React from "react";
import { Link } from "react-router-dom";
import { Package, Equipment } from "../../types/PackageTypes";

interface PackageModalProps {
  packageData: Package;
  onClose: () => void;
}

const PackageModal: React.FC<PackageModalProps> = ({
  packageData,
  onClose,
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      {/* Background Overlay */}
      <div
        className='fixed inset-0 bg-gray-600 opacity-50'
        onClick={onClose}
        aria-hidden='true'
      ></div>

      {/* Modal Content */}
      <div className='relative bg-white rounded-lg overflow-hidden shadow-lg w-11/12 sm:w-3/4 md:w-1/2 z-10'>
        <div className='p-6'>
          <h3 className='text-xl font-semibold mb-4'>{packageData.name}</h3>
          <p className='text-gray-700 text-xl font-semibold'>
            Price: ${packageData.price.toFixed(2)}
          </p>
          <h4 className='text-md font-semibold mt-4'>Included Equipment:</h4>
          <ul className='list-disc ml-5 mt-2'>
            {packageData.equipment.map((eq: Equipment) => (
              <li
                key={eq._id}
                className='mb-2'
              >
                <p className='font-semibold'>
                  {eq.brand} {eq.model}
                </p>
                {eq.description && <p>{eq.description}</p>}
                {eq.pricePerDay && <p>Price: ${eq.pricePerDay.toFixed(2)}</p>}
                {eq.type && <p>Type: {eq.type}</p>}
              </li>
            ))}
          </ul>
          <div className='mt-6 flex justify-end'>
            <Link
              to={`/booking/${packageData._id}`} // Adjust the route as needed
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Book This Package
            </Link>
            <button
              onClick={onClose}
              className='ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
