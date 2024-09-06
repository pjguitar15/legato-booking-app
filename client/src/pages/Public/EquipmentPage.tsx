// EquipmentPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Equipment } from "../../types/PackageTypes";

const EquipmentPage: React.FC = () => {
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const response = await axios.get<Equipment[]>(
          "http://localhost:5000/api/equipment/all"
        );
        setEquipmentData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch equipment data");
        setLoading(false);
      }
    };

    fetchEquipmentData();
  }, []);

  const filteredEquipment =
    filter === "All"
      ? equipmentData
      : equipmentData.filter((item) => item.type === filter);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='p-4'>
      {/* Filter Section */}
      <div className='mb-4'>
        <label
          htmlFor='equipment-filter'
          className='block text-lg font-semibold mb-2'
        >
          Filter by Type:
        </label>
        <select
          id='equipment-filter'
          value={filter}
          onChange={handleFilterChange}
          className='p-2 border border-gray-300 rounded'
        >
          <option value='All'>All</option>
          <option value='Mixer'>Mixer</option>
          <option value='Drumset'>Drumset</option>
          <option value='Speakers'>Speakers</option>
          <option value='Microphone'>Microphone</option>
          <option value='PAR Light'>PAR Light</option>
          <option value='Guitar Amplifier'>Guitar Amplifier</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Equipment Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {filteredEquipment.map((item, index) => (
          <div
            key={index}
            className='border border-gray-300 rounded-lg shadow-md flex'
          >
            <img
              src={item.imageUrl}
              alt={item.brand}
              className='w-1/3 h-auto object-cover rounded-l-lg'
            />
            <div className='p-4 w-2/3'>
              <h2 className='text-xl font-semibold mb-2'>{item.brand}</h2>
              <p className='text-lg font-medium text-gray-700 mb-2'>
                Rental Price: ₱{item.pricePerDay}
              </p>
              <p className='text-gray-600'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentPage;
