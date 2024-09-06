import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Equipment {
  type: string;
  category: string;
  brand: string;
  model: string;
  specifications: {
    power: string;
    frequencyResponse: string;
    channels: string;
    inputs: string[];
    outputs: string[];
    colorTemperature: string;
    beamAngle: string;
    weight: string;
    type: string;
    polarPattern: string;
    effects: string[];
  };
  pricePerDay: number;
  quantityAvailable: number;
  condition: string;
  location: string;
  imageUrl: string;
  description: string;
}

interface EditEquipmentProps {
  equipment: Equipment;
  onClose: () => void;
  onUpdate: (updatedEquipment: Equipment) => void;
}

const EditEquipment: React.FC<EditEquipmentProps> = ({
  equipment,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<Equipment>(equipment);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/equipment/update/${formData.model}`,
        formData
      );
      onUpdate(response.data);
      onClose(); // Close the modal after updating
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl'
        >
          &times;
        </button>
        <h2 className='text-2xl font-bold mb-4'>Edit Equipment</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block mb-2'>
              Brand
              <input
                type='text'
                name='brand'
                value={formData.brand}
                onChange={handleChange}
                className='mt-1 block w-full p-2 border border-gray-300 rounded'
              />
            </label>
            <label className='block mb-2'>
              Model
              <input
                type='text'
                name='model'
                value={formData.model}
                onChange={handleChange}
                className='mt-1 block w-full p-2 border border-gray-300 rounded'
                disabled
              />
            </label>
            <label className='block mb-2'>
              Price Per Day
              <input
                type='number'
                name='pricePerDay'
                value={formData.pricePerDay}
                onChange={handleChange}
                className='mt-1 block w-full p-2 border border-gray-300 rounded'
              />
            </label>
            <label className='block mb-2'>
              Condition
              <input
                type='text'
                name='condition'
                value={formData.condition}
                onChange={handleChange}
                className='mt-1 block w-full p-2 border border-gray-300 rounded'
              />
            </label>
            <label className='block mb-2'>
              Location
              <input
                type='text'
                name='location'
                value={formData.location}
                onChange={handleChange}
                className='mt-1 block w-full p-2 border border-gray-300 rounded'
              />
            </label>
            <label className='block mb-2'>
              Description
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='mt-1 block w-full p-2 border border-gray-300 rounded'
              />
            </label>
            {/* Add other fields as needed */}
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEquipment;
