import React from "react";
import { Navigate } from "react-router-dom";
import BookingStepTwo from "./BookingStepTwo";
import { useBookingContext } from "../../context/BookingContext";

const ProtectedBookingStepTwo: React.FC = () => {
  const { packageData, selectedEquipment } = useBookingContext();

  // Check if packageData and selectedEquipment are set
  const isStepOneCompleted = packageData && selectedEquipment.length > 0;

  return isStepOneCompleted ? <BookingStepTwo /> : <Navigate to='/packages' />;
};

export default ProtectedBookingStepTwo;
