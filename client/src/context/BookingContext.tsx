// src/context/BookingContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Equipment } from "../types/PackageTypes";

interface BookingContextType {
  selectedEquipment: Equipment[];
  setSelectedEquipment: Dispatch<SetStateAction<Equipment[]>>; // Correct type
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);

  return (
    <BookingContext.Provider
      value={{ selectedEquipment, setSelectedEquipment }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
