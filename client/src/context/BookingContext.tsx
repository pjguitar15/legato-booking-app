import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Equipment, Package } from "../types/PackageTypes";

interface BookingContextType {
  selectedEquipment: Equipment[];
  setSelectedEquipment: Dispatch<SetStateAction<Equipment[]>>;
  packageData: Package | null;
  setPackageData: Dispatch<SetStateAction<Package | null>>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [packageData, setPackageData] = useState<Package | null>(null);

  useEffect(() => {
    console.log("CONTEXT DATA", { selectedEquipment, packageData });
  }, [selectedEquipment, packageData]);

  return (
    <BookingContext.Provider
      value={{
        selectedEquipment,
        setSelectedEquipment,
        packageData,
        setPackageData,
      }}
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
