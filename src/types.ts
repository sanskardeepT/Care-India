export interface User {
  id?: number | null;
  name: string;
  email?: string;
  phone?: string;
  isGuest?: boolean;
  avatar?: string;
  token?: string;
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

// Backend types
export interface Appointment {
  id: number;
  user_id: number | null;
  user_name: string;
  user_email: string;
  user_phone: string;
  hospital_name: string;
  hospital_address: string;
  department: string;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  created_at: string;
}

export interface HealthRecord {
  id: number;
  user_id: number | null;
  record_type: 'symptom_check' | 'medicine_lookup' | 'specialist_recommendation' | 'health_profile';
  input_data: string;
  ai_response: string;
  symptoms?: string;
  possible_causes?: string;
  recommended_steps?: string;
  specialist_suggested?: string;
  created_at: string;
}

