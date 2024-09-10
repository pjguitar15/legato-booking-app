// src/pages/Public/BookingStepOne.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Package, Equipment } from "../../types/PackageTypes";
import EquipmentList from "../../components/EquipmentList";
import TotalPrice from "../../components/TotalPrice";
import ActionButtons from "../../components/ActionButtons";
import { useBookingContext } from "../../context/BookingContext";

const BookingStepOne: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [availableEquipment, setAvailableEquipment] = useState<Equipment[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isCustomized, setIsCustomized] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { selectedEquipment, setSelectedEquipment } = useBookingContext();
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const packageResponse = await axios.get<Package>(
          `http://localhost:5000/api/packages/${packageId}`
        );
        const equipmentResponse = await axios.get<Equipment[]>(
          "http://localhost:5000/api/equipment/all"
        );

        setPackageData(packageResponse.data);

        const initialEquipment = packageResponse.data.equipment;
        setSelectedEquipment(initialEquipment);

        updateAvailableEquipment(initialEquipment, equipmentResponse.data);
        calculateTotalPrice(initialEquipment, packageResponse.data.price);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [packageId]);

  useEffect(() => {
    if (packageData) {
      calculateTotalPrice(selectedEquipment, packageData.price);
    }
  }, [selectedEquipment, packageData]);

  const calculateTotalPrice = (
    equipmentList: Equipment[],
    basePrice: number
  ) => {
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
  };

  const updateAvailableEquipment = (
    selected: Equipment[],
    allEquipment: Equipment[]
  ) => {
    const selectedIds = new Set(selected.map((eq) => eq._id));
    const available = allEquipment.filter((eq) => !selectedIds.has(eq._id));
    setAvailableEquipment(available);
  };

  if (loading) {
    return <div className='p-6 text-center'>Loading...</div>; // Show loading state
  }

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>Package: {packageData?.name}</h1>
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
    </div>
  );
};

export default BookingStepOne;
