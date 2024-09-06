import React, { useState, useEffect } from "react";
import axios from "axios";
import EquipmentModal from "../../../components/EquipmentModal";
import EditEquipment from "./EditEquipment";

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

const EquipmentList: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchEquipmentList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/equipment/all"
      );
      console.log("Fetched equipment:", response.data); // Log data for debugging
      setEquipmentList(response.data);
    } catch (error) {
      console.error("Error fetching equipment list:", error);
    }
  };

  useEffect(() => {
    fetchEquipmentList();
  }, []);

  const handleOpenModal = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleCloseModal = () => {
    setSelectedEquipment(null);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDelete = async (model: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/equipment/delete/${model}`);
      setEquipmentList((prevList) =>
        prevList.filter((item) => item.model !== model)
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>Equipment List</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {equipmentList.length > 0 ? (
          equipmentList.map((equipment) => (
            <div
              key={equipment.model}
              className='bg-white p-4 rounded-lg shadow-md'
            >
              <img
                src={equipment.imageUrl}
                alt={equipment.model}
                className='w-full h-32 object-cover mb-4 rounded-md'
              />
              <h2 className='text-xl font-semibold mb-2'>
                {equipment.brand} {equipment.model}
              </h2>
              <p className='text-gray-700 mb-2'>
                <strong>Price:</strong> ${equipment.pricePerDay} per day
              </p>
              <p className='text-gray-700 mb-2'>
                <strong>Condition:</strong> {equipment.condition}
              </p>
              <p className='text-gray-700 mb-2'>
                <strong>Location:</strong> {equipment.location}
              </p>
              <button
                onClick={() => handleOpenModal(equipment)}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
              >
                View Details
              </button>
              <button
                onClick={() => {
                  handleOpenModal(equipment);
                  handleEditClick();
                }}
                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(equipment.model)}
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2'
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No equipment available.</p>
        )}
      </div>
      {selectedEquipment &&
        (isEditing ? (
          <EditEquipment
            equipment={selectedEquipment}
            onClose={handleCloseModal}
            onUpdate={(updatedEquipment) => {
              setEquipmentList((prevList) =>
                prevList.map((item) =>
                  item.model === updatedEquipment.model
                    ? updatedEquipment
                    : item
                )
              );
              handleCloseModal();
            }}
          />
        ) : (
          <EquipmentModal
            equipment={selectedEquipment}
            onClose={handleCloseModal}
          />
        ))}
    </div>
  );
};

export default EquipmentList;
