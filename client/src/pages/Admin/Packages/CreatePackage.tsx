// src/pages/CreatePackage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Equipment {
  _id: string;
  brand: string;
  model: string;
  imageUrl: string;
  description?: string; // Add any additional fields you need
  type?: string;
  price?: number;
}

const CreatePackage: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get<Equipment[]>(
          "http://localhost:5000/api/equipment/all"
        );
        setEquipmentList(response.data);
      } catch (error) {
        console.error("Error fetching equipment list:", error);
      }
    };

    fetchEquipment();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/packages/create", {
        name,
        price,
        equipment: selectedEquipment,
      });
      navigate("/admin"); // Redirect to admin page after creation
    } catch (error) {
      console.error("Error creating package:", error);
    }
  };

  const handleEquipmentChange = (equipment: Equipment) => {
    setSelectedEquipment((prev) =>
      prev.some((eq) => eq._id === equipment._id)
        ? prev.filter((eq) => eq._id !== equipment._id)
        : [...prev, equipment]
    );
  };

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>Create Package</h1>
      <div className='mb-4'>
        <label className='block mb-2'>
          Package Name
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='mt-1 block w-full p-2 border border-gray-300 rounded'
          />
        </label>
        <label className='block mb-2'>
          Price
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className='mt-1 block w-full p-2 border border-gray-300 rounded'
          />
        </label>
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
                  checked={selectedEquipment.some((e) => e._id === eq._id)}
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
        onClick={handleSubmit}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Create Package
      </button>
    </div>
  );
};

export default CreatePackage;
