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

  // New form state variables
  const [contactPerson, setContactPerson] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");

  const [eventDate, setEventDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [setupTime, setSetupTime] = useState<string>("");
  const [venueAddress, setVenueAddress] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [eventSize, setEventSize] = useState<string>("");

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

  useEffect(() => {
    if (!location.pathname.startsWith("/booking")) {
      localStorage.removeItem("selectedEquipment");
    }
  }, [location.pathname]);

  return (
    <BookingContext.Provider
      value={{
        contactPerson,
        setContactPerson,
        contactNumber,
        setContactNumber,
        email,
        setEmail,
        specialRequests,
        setSpecialRequests,
        packageData,
        setPackageData,
        selectedEquipment,
        setSelectedEquipment,
        eventDate,
        setEventDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        setupTime,
        setSetupTime,
        venueAddress,
        setVenueAddress,
        eventType,
        setEventType,
        eventSize,
        setEventSize,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
