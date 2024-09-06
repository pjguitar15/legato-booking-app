export interface Equipment {
  _id: string;
  brand: string;
  model: string;
  imageUrl: string;
  description?: string; // Add more fields as needed
  type?: string;
  price?: number;
}

export interface Package {
  _id: string;
  name: string;
  price: number;
  equipment: Equipment[];
}
