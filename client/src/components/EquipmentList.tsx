import React from "react";
import { Equipment, Package } from "../types/PackageTypes";

interface EquipmentListProps {
  selectedEquipment: Equipment[];
  availableEquipment: Equipment[];
  isEditing: boolean;
  setSelectedEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>;
  packageData: Package | null; // Ensure this matches the actual type
  updateAvailableEquipment: (
    selected: Equipment[],
    allEquipment: Equipment[]
  ) => void;
  calculateTotalPrice: (equipmentList: Equipment[]) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({
  selectedEquipment,
  availableEquipment,
  isEditing,
  setSelectedEquipment,
  packageData,
  updateAvailableEquipment,
  calculateTotalPrice,
}) => {
  const handleAddEquipment = (eq: Equipment, quantity: number) => {
    if (quantity <= eq.quantityAvailable) {
      setSelectedEquipment((prev) => {
        const existing = prev.find((item) => item._id === eq._id);
        const updated = existing
          ? prev.map((item) =>
              item._id === eq._id
                ? { ...item, quantity: item.quantityAvailable + quantity }
                : item
            )
          : [...prev, { ...eq, quantity }];

        calculateTotalPrice(updated);
        updateAvailableEquipment(updated, packageData!.equipment);
        return updated;
      });
    } else {
      alert("Cannot add more than the available quantity.");
    }
  };

  const handleRemoveEquipment = (eqId: string) => {
    setSelectedEquipment((prev) => {
      const updated = prev.filter((item) => item._id !== eqId);
      calculateTotalPrice(updated);
      updateAvailableEquipment(updated, packageData!.equipment);
      return updated;
    });
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Selected Equipment:</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6'>
        {selectedEquipment.map((eq) => (
          <div
            key={eq._id}
            className='border p-4'
          >
            <img
              src={eq.imageUrl}
              alt=''
            />
            <h3 className='text-xl'>
              {eq.brand} {eq.model}
            </h3>
            <h3>Price: ₱{eq.pricePerDay}</h3>
            {isEditing && (
              <button
                className='bg-red-500 text-white px-4 py-2 text-sm rounded-md'
                onClick={() => handleRemoveEquipment(eq._id)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <>
          <h2 className='text-xl font-semibold mb-4'>Available Equipment:</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6'>
            {availableEquipment.map((eq) => (
              <div
                key={eq._id}
                className='border p-4'
              >
                <img
                  src={eq.imageUrl}
                  alt=''
                />
                <h3>
                  {eq.brand} {eq.model}
                </h3>
                <button
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg text-sm'
                  onClick={() => handleAddEquipment(eq, 1)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EquipmentList;
