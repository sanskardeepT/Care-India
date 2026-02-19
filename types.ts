
export interface User {
  name: string;
  phone: string;
  isGuest: boolean;
  avatar: string;
}

export interface MedicalRecord {
  id: string;
  title: string;
  provider: string;
  date: string;
  status: 'Verified' | 'Pending';
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  type: 'Hospital' | 'Doctor';
}

export interface Subscription {
  id: string;
  name: string;
  frequency: string;
  price: number;
}
