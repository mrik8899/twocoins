// src/types/vehicle.ts
export interface Vehicle {
  id: string;
  imageUrl: string;
  name: string;
  category: string;
  price: string;
  status: string;
  description?: string; // Optional property
  // Add any other properties your vehicle objects might have
  year?: number;
  mileage?: string;
  fuel?: string;
  transmission?: string;
  color?: string;
}