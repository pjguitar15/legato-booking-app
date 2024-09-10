import React from "react";
import { Navigate } from "react-router-dom";
import UserDetailsAndPayment from "./UserDetailsAndPayment";
import { useBookingContext } from "../../context/BookingContext";

const ProtectedUserDetailsAndPayment: React.FC = () => {
  const {
    eventDate,
    startTime,
    endTime,
    setupTime,
    venueAddress,
    eventType,
    eventSize,
  } = useBookingContext();

  // Check if packageData, selectedEquipment, and contactPerson are set
  const isBookingDetailsComplete =
    eventDate &&
    startTime &&
    endTime &&
    setupTime &&
    venueAddress &&
    eventType &&
    eventSize;

  return isBookingDetailsComplete ? (
    <UserDetailsAndPayment />
  ) : (
    <Navigate to='/packages' />
  );
};

export default ProtectedUserDetailsAndPayment;
