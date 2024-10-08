import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Package, Equipment } from "../../types/PackageTypes";
import EquipmentList from "../../components/EquipmentList";
import TotalPrice from "../../components/TotalPrice";
import ActionButtons from "../../components/ActionButtons";
import { useBookingContext } from "../../context/BookingContext";

const BookingStepOne: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const [availableEquipment, setAvailableEquipment] = useState<Equipment[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isCustomized, setIsCustomized] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    selectedEquipment,
    setSelectedEquipment,
    packageData,
    setPackageData,
  } = useBookingContext();
  const navigate = useNavigate();

  // Calculate total price
  const calculateTotalPrice = useCallback(
    (equipmentList: Equipment[], basePrice: number) => {
      if (!packageData) return;

      const defaultEquipmentIds = new Set(
        packageData.equipment.map((eq) => eq._id)
      );

      const additionalPrice = equipmentList.reduce((sum, eq) => {
        if (!defaultEquipmentIds.has(eq._id)) {
          return sum + (eq.pricePerDay || 0);
        }
        return sum;
      }, 0);

      setIsCustomized(additionalPrice > 0);
      setTotalPrice(basePrice + additionalPrice);
    },
    [packageData]
  );

  // Update available equipment
  const updateAvailableEquipment = useCallback(
    (selected: Equipment[], allEquipment: Equipment[]) => {
      const selectedIds = new Set(selected.map((eq) => eq._id));
      const available = allEquipment.filter((eq) => !selectedIds.has(eq._id));
      setAvailableEquipment(available);
    },
    []
  );

  // Fetch data and initialize state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const packageResponse = await axios.get<Package>(
          `http://localhost:5000/api/packages/${packageId}`
        );
        setPackageData(packageResponse.data);

        const equipmentResponse = await axios.get<Equipment[]>(
          "http://localhost:5000/api/equipment/all"
        );

        // Initialize selected equipment only if it's empty
        if (selectedEquipment.length === 0) {
          setSelectedEquipment(packageResponse.data.equipment);
        } else {
          // Update available equipment and total price
          updateAvailableEquipment(selectedEquipment, equipmentResponse.data);
          calculateTotalPrice(selectedEquipment, packageResponse.data.price);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (packageId) {
      fetchData();
    }
  }, [
    packageId,
    selectedEquipment,
    setSelectedEquipment,
    setPackageData,
    updateAvailableEquipment,
    calculateTotalPrice,
  ]);

  // Handle changes to selected equipment or packageData
  useEffect(() => {
    if (packageData) {
      calculateTotalPrice(selectedEquipment, packageData.price);
      updateAvailableEquipment(selectedEquipment, packageData.equipment);
    }
  }, [
    selectedEquipment,
    packageData,
    calculateTotalPrice,
    updateAvailableEquipment,
  ]);

  const handleNextStep = () => {
    if (selectedEquipment.length > 0 && packageData) {
      navigate(`/booking/step-two/${packageId}`);
    } else {
      alert("Please select at least one piece of equipment.");
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>
        Package: {packageData?.name || "Loading..."}
      </h1>
      {packageData ? (
        <>
          <EquipmentList
            selectedEquipment={selectedEquipment}
            availableEquipment={availableEquipment}
            isEditing={isEditing}
            setSelectedEquipment={setSelectedEquipment}
            packageData={packageData}
            updateAvailableEquipment={updateAvailableEquipment}
            calculateTotalPrice={(equipmentList) =>
              calculateTotalPrice(equipmentList, packageData?.price || 0)
            }
          />
          <TotalPrice
            totalPrice={isCustomized ? totalPrice : packageData?.price || 0}
          />
          <ActionButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            selectedEquipment={selectedEquipment}
            packageId={packageId}
          />
          <button
            onClick={handleNextStep}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
          >
            Proceed
          </button>
        </>
      ) : (
        <p>Loading package data...</p>
      )}
    </div>
  );
};

export default BookingStepOne;
