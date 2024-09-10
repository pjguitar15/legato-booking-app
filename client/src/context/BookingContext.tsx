import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BookingContextType, Equipment, Package } from "../types/PackageTypes";

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [packageData, setPackageData] = useState<Package | null>(() => {
    const savedData = localStorage.getItem("packageData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>(
    () => {
      const savedData = localStorage.getItem("selectedEquipment");
      return savedData ? JSON.parse(savedData) : [];
    }
  );

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("packageData", JSON.stringify(packageData));
  }, [packageData]);

  useEffect(() => {
    localStorage.setItem(
      "selectedEquipment",
      JSON.stringify(selectedEquipment)
    );
  }, [selectedEquipment]);

  // Clear selectedEquipment from localStorage when navigating away from /booking
  useEffect(() => {
    if (!location.pathname.startsWith("/booking")) {
      localStorage.removeItem("selectedEquipment");
    }
  }, [location.pathname]);

  return (
    <BookingContext.Provider
      value={{
        packageData,
        setPackageData,
        selectedEquipment,
        setSelectedEquipment,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
