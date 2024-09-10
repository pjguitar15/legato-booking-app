export interface Equipment {
  _id: string;
  brand: string;
  model: string;
  imageUrl: string;
  description?: string; // Add more fields as needed
  type?: string;
  pricePerDay?: number;
  quantityAvailable: number;
}

export interface Package {
  _id: string;
  name: string;
  price: number;
  equipment: Equipment[];
}

export interface BookingContextType {
  packageData: Package | null;
  setPackageData: React.Dispatch<React.SetStateAction<Package | null>>;
  selectedEquipment: Equipment[];
  setSelectedEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>;
}
