import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Package, Equipment } from "../../../types/PackageTypes"; // Import the Package and Equipment interfaces

const PackageUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackageAndEquipment = async () => {
      try {
        // Fetch the package details
        const packageResponse = await axios.get<Package>(
          `http://localhost:5000/api/packages/${id}`
        );
        setPkg(packageResponse.data);

        // Fetch the equipment list
        const equipmentResponse = await axios.get<Equipment[]>(
          "http://localhost:5000/api/equipment/all"
        );
        setEquipmentList(equipmentResponse.data);

        // Initialize selected equipment based on the package
        setSelectedEquipment(packageResponse.data.equipment);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching package or equipment details:", error);
        setLoading(false);
      }
    };

    fetchPackageAndEquipment();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (pkg) {
      setPkg({
        ...pkg,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEquipmentChange = (equipment: Equipment) => {
    setSelectedEquipment((prev) =>
      prev.some((eq) => eq._id === equipment._id)
        ? prev.filter((eq) => eq._id !== equipment._id)
        : [...prev, equipment]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pkg) {
      try {
        await axios.put(`http://localhost:5000/api/packages/update/${id}`, {
          ...pkg,
          equipment: selectedEquipment,
        });
        navigate(`/package/${id}`); // Redirect to the package details page
      } catch (error) {
        console.error("Error updating package:", error);
      }
    }
  };

  return (
    <div className='p-6'>
      {loading ? (
        <p>Loading...</p>
      ) : pkg ? (
        <>
          <h1 className='text-3xl font-bold mb-4'>Update Package</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700'>Name</label>
              <input
                type='text'
                name='name'
                value={pkg.name}
                onChange={handleChange}
                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Price</label>
              <input
                type='number'
                name='price'
                value={pkg.price}
                onChange={handleChange}
                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
              />
            </div>
            <div className='mb-4'>
              <h2 className='text-xl font-semibold mb-2'>Select Equipment</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {equipmentList.map((eq) => (
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
                      <input
                        type='checkbox'
                        id={eq._id}
                        checked={selectedEquipment.some(
                          (e) => e._id === eq._id
                        )}
                        onChange={() => handleEquipmentChange(eq)}
                        className='mt-2'
                      />
                      <label
                        htmlFor={eq._id}
                        className='ml-2'
                      >
                        Select
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              type='submit'
              className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            >
              Update Package
            </button>
          </form>
        </>
      ) : (
        <p>Package not found</p>
      )}
    </div>
  );
};

export default PackageUpdate;
