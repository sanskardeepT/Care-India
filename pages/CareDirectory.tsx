import React, { useState } from 'react';
import { Hospital } from '../types';
import { appointmentsAPI } from '../src/services/apiService';
import { useAuth } from '../src/context/AuthContext';

const CareDirectory: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'Hospitals' | 'Doctors'>('Hospitals');
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingForm, setBookingForm] = useState({
    user_name: user?.name || '',
    user_email: user?.email || '',
    user_phone: user?.phone || '',
    department: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
  });

  const hospitals: Hospital[] = [
    { id: '1', name: 'Lilavati Hospital', location: 'Bandra, Mumbai', imageUrl: 'https://picsum.photos/id/1031/400/250', type: 'Hospital' },
    { id: '2', name: 'Manipal Hospital', location: 'HAL, Bangalore', imageUrl: 'https://picsum.photos/id/1018/400/250', type: 'Hospital' },
    { id: '3', name: 'Medanta Medicity', location: 'Gurugram, Delhi', imageUrl: 'https://picsum.photos/id/1040/400/250', type: 'Hospital' },
    { id: '4', name: 'Dr. Ananya Mehta', location: 'Andheri, Mumbai', imageUrl: 'https://picsum.photos/id/1005/400/250', type: 'Doctor' },
    { id: '5', name: 'Dr. Karan Singh', location: 'Koramangala, Bangalore', imageUrl: 'https://picsum.photos/id/1001/400/250', type: 'Doctor' },
  ];

  const visibleItems = hospitals.filter((item) => item.type === (activeTab === 'Hospitals' ? 'Hospital' : 'Doctor'));

  const handleOpenBooking = (item: Hospital) => {
    setBookingId(item.id);
    setBookingError('');
    setBookingSuccess('');
    setBookingForm({
      user_name: user?.name || '',
      user_email: user?.email || '',
      user_phone: user?.phone || '',
      department: item.type === 'Doctor' ? 'Consultation' : 'General Medicine',
      appointment_date: '',
      appointment_time: '',
      reason: '',
    });
  };

  const handleBookVisit = async (item: Hospital) => {
    if (!bookingForm.user_name.trim() || !bookingForm.user_email.trim() || !bookingForm.department.trim() || !bookingForm.appointment_date || !bookingForm.appointment_time) {
      setBookingError('Please fill name, email, department, date, and time.');
      return;
    }

    try {
      setBookingLoading(true);
      setBookingError('');
      await appointmentsAPI.book({
        hospital_name: item.name,
        hospital_address: item.location,
        department: bookingForm.department,
        doctor_name: item.type === 'Doctor' ? item.name : '',
        appointment_date: bookingForm.appointment_date,
        appointment_time: bookingForm.appointment_time,
        reason: bookingForm.reason,
        user_name: bookingForm.user_name,
        user_email: bookingForm.user_email,
        user_phone: bookingForm.user_phone,
      });
      setBookingSuccess('Appointment booked successfully.');
      setBookingId(null);
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Failed to book appointment');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-2 rounded-2xl border border-gray-100 inline-flex w-full md:w-auto shadow-sm">
        <button
          onClick={() => setActiveTab('Hospitals')}
          className={`flex-1 md:w-48 py-2.5 px-6 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'Hospitals' ? 'bg-[#0066FF] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Hospitals
        </button>
        <button
          onClick={() => setActiveTab('Doctors')}
          className={`flex-1 md:w-48 py-2.5 px-6 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'Doctors' ? 'bg-[#0066FF] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Doctors
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {visibleItems.map((h) => (
          <div key={h.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-md transition-all">
            <div className="h-48 overflow-hidden relative">
              <img src={h.imageUrl} alt={h.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-gray-800 uppercase tracking-wider">
                {h.type}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{h.name}</h3>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 {h.location}
              </div>
              <button
                type="button"
                onClick={() => handleOpenBooking(h)}
                className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors active:scale-95"
              >
                BOOK VISIT
              </button>

              {bookingId === h.id ? (
                <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none"
                    value={bookingForm.user_name}
                    onChange={(e) => setBookingForm((current) => ({ ...current, user_name: e.target.value }))}
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none"
                    value={bookingForm.user_email}
                    onChange={(e) => setBookingForm((current) => ({ ...current, user_email: e.target.value }))}
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none"
                    value={bookingForm.user_phone}
                    onChange={(e) => setBookingForm((current) => ({ ...current, user_phone: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="Department"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none"
                    value={bookingForm.department}
                    onChange={(e) => setBookingForm((current) => ({ ...current, department: e.target.value }))}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none"
                      value={bookingForm.appointment_date}
                      onChange={(e) => setBookingForm((current) => ({ ...current, appointment_date: e.target.value }))}
                    />
                    <input
                      type="time"
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none"
                      value={bookingForm.appointment_time}
                      onChange={(e) => setBookingForm((current) => ({ ...current, appointment_time: e.target.value }))}
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Reason for visit"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none resize-none"
                    value={bookingForm.reason}
                    onChange={(e) => setBookingForm((current) => ({ ...current, reason: e.target.value }))}
                  />
                  {bookingError ? <p className="text-sm text-red-500">{bookingError}</p> : null}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      disabled={bookingLoading}
                      onClick={() => void handleBookVisit(h)}
                      className="flex-1 bg-[#0066FF] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
                    >
                      {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingId(null);
                        setBookingError('');
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {bookingSuccess ? (
        <div className="bg-white rounded-2xl border border-emerald-100 px-4 py-3 text-sm text-emerald-600 shadow-sm">
          {bookingSuccess}
        </div>
      ) : null}
    </div>
  );
};

export default CareDirectory;
