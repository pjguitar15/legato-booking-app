import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Package, Equipment } from "../../types/PackageTypes";

const BookingStepOne: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [availableEquipment, setAvailableEquipment] = useState<Equipment[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(15000); // Start with base price of 15,000
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the package data
        const packageResponse = await axios.get<Package>(
          `http://localhost:5000/api/packages/${packageId}`
        );
        setPackageData(packageResponse.data);

        // Fetch all equipment data
        const equipmentResponse = await axios.get<Equipment[]>(
          "http://localhost:5000/api/equipment/all"
        );

        // Initialize selected equipment and available equipment
        const initialEquipment = localStorage.getItem(
          `custom-package-${packageId}`
        )
          ? JSON.parse(localStorage.getItem(`custom-package-${packageId}`)!)
          : packageResponse.data.equipment;

        setSelectedEquipment(initialEquipment);
        updateAvailableEquipment(initialEquipment, equipmentResponse.data);

        calculateTotalPrice(initialEquipment);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [packageId]);

  useEffect(() => {
    if (packageData) {
      // Fetch all equipment data to update available equipment list
      axios
        .get<Equipment[]>("http://localhost:5000/api/equipment/all")
        .then((response) => {
          updateAvailableEquipment(selectedEquipment, response.data);
        });
    }
  }, [selectedEquipment, packageData]);

  const calculateTotalPrice = (equipmentList: Equipment[]) => {
    const basePrice = 15000;
    const addedPrice = equipmentList.reduce(
      (sum, eq) => sum + (eq.pricePerDay || 0) * (eq.quantityAvailable || 1),
      0
    );
    setTotalPrice(basePrice + addedPrice);
  };

  const updateAvailableEquipment = (
    selected: Equipment[],
    allEquipment: Equipment[]
  ) => {
    const selectedIds = new Set(selected.map((eq) => eq._id));
    const available = allEquipment.filter((eq) => !selectedIds.has(eq._id));
    setAvailableEquipment(available);
  };

  const handleAddEquipment = (eq: Equipment, quantity: number) => {
    if (quantity <= eq.quantityAvailable) {
      setSelectedEquipment((prev) => {
        const existing = prev.find((item) => item._id === eq._id);
        const updated = existing
          ? prev.map((item) =>
              item._id === eq._id
                ? { ...item, quantity: item.quantityAvailable! + quantity }
                : item
            )
          : [...prev, { ...eq, quantity }];

        calculateTotalPrice(updated);
        // Remove added item from available list
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
      const removedItem = packageData?.equipment.find((eq) => eq._id === eqId);
      if (removedItem) {
        // Adjust total price for the removed item
        setTotalPrice(
          (prevPrice) => prevPrice - removedItem.pricePerDay! * 0.15
        );
        // Add removed item back to available list
        updateAvailableEquipment(updated, packageData!.equipment);
      }
      calculateTotalPrice(updated);
      return updated;
    });
  };

  const handleQuantityChange = (eqId: string, quantity: number) => {
    setSelectedEquipment((prev) => {
      return prev.map((item) =>
        item._id === eqId
          ? { ...item, quantity: Math.min(quantity, item.quantityAvailable) } // Restrict quantity to quantityAvailable
          : item
      );
    });
  };

  const handleCustomize = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem(
      `custom-package-${packageId}`,
      JSON.stringify(selectedEquipment)
    );
    setIsEditing(false);
  };

  const handleProceed = () => {
    // Logic to proceed to the next step
  };

  if (!packageData) return <div>Loading...</div>;

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>Package: {packageData.name}</h1>
      <h2 className='text-xl font-semibold mb-4'>Included Equipment:</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6'>
        {selectedEquipment.map((eq) => (
          <div
            key={eq._id}
            className='border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white p-4'
          >
            <img
              src={eq.imageUrl}
              alt={eq.brand}
              className='w-full h-32 object-cover mb-4'
            />
            <h3 className='text-lg font-semibold mb-2'>
              {eq.brand} {eq.model}
            </h3>
            <p className='text-gray-700'>{eq.description}</p>
            <p className='text-gray-900 font-semibold'>
              Price: ${eq.pricePerDay?.toFixed(2)}
            </p>
            <p className='text-gray-600'>Type: {eq.type}</p>
            {isEditing && (
              <>
                <button
                  onClick={() => handleRemoveEquipment(eq._id)}
                  className='bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-600'
                >
                  Remove
                </button>
                <input
                  type='number'
                  value={eq.quantityAvailable || 1}
                  onChange={(e) =>
                    handleQuantityChange(eq._id, parseInt(e.target.value))
                  }
                  min='1'
                  max={eq.quantityAvailable} // Limit input to quantityAvailable
                  className='border border-gray-300 rounded px-2 py-1 mt-2'
                />
              </>
            )}
          </div>
        ))}
      </div>

      <h2 className='text-xl font-semibold mb-4'>Available Equipment:</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6'>
        {availableEquipment.map((eq) => (
          <div
            key={eq._id}
            className='border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white p-4'
          >
            <img
              src={eq.imageUrl}
              alt={eq.brand}
              className='w-full h-32 object-cover mb-4'
            />
            <h3 className='text-lg font-semibold mb-2'>
              {eq.brand} {eq.model}
            </h3>
            <p className='text-gray-700'>{eq.description}</p>
            <p className='text-gray-900 font-semibold'>
              Price: ${eq.pricePerDay?.toFixed(2)}
            </p>
            <p className='text-gray-600'>Type: {eq.type}</p>
            {isEditing && (
              <button
                onClick={() => handleAddEquipment(eq, 1)} // Default quantity of 1 when adding
                className='bg-blue-500 text-white px-3 py-1 mt-2 rounded hover:bg-blue-600'
              >
                Add
              </button>
            )}
          </div>
        ))}
      </div>

      <h3 className='text-xl font-semibold mb-4'>
        Total Price: ${totalPrice.toFixed(2)}
      </h3>
      <div className='mt-6 flex justify-between'>
        {!isEditing ? (
          <button
            onClick={handleCustomize}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Customize
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
            >
              Cancel
            </button>
          </>
        )}
        <button
          onClick={handleProceed}
          className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600'
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BookingStepOne;
