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

  // New form state variables for user details
  contactPerson: string;
  setContactPerson: React.Dispatch<React.SetStateAction<string>>;
  contactNumber: string;
  setContactNumber: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  specialRequests: string;
  setSpecialRequests: React.Dispatch<React.SetStateAction<string>>;

  // Existing form state variables
  eventDate: string;
  setEventDate: React.Dispatch<React.SetStateAction<string>>;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  setupTime: string;
  setSetupTime: React.Dispatch<React.SetStateAction<string>>;
  venueAddress: string;
  setVenueAddress: React.Dispatch<React.SetStateAction<string>>;
  eventType: string;
  setEventType: React.Dispatch<React.SetStateAction<string>>;
  eventSize: string;
  setEventSize: React.Dispatch<React.SetStateAction<string>>;
}
