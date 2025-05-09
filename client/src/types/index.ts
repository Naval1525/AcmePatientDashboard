// src/types/index.ts

export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  }

  export interface WeightEntry {
    id: string;
    userId: string;
    weight: number;
    date: string;
    notes?: string;
  }

  export interface Shipment {
    id: string;
    userId: string;
    status: 'pending' | 'shipped' | 'delivered';
    trackingNumber?: string;
    estimatedDeliveryDate: string;
    actualDeliveryDate?: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface Medication {
    id: string;
    name: string;
    dosage: string;
    instructions: string;
  }

  export interface DashboardOverview {
    currentWeight: number;
    weightGoal?: number;
    weightChange: number; // Negative indicates weight loss
    nextShipmentDate?: string;
    nextShipmentStatus?: string;
    bmi: number;
    currentMedication: Medication;
  }

  export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
  }