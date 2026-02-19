
import React, { useState } from 'react';
import { Hospital } from '../types';

const CareDirectory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Hospitals' | 'Doctors'>('Hospitals');

  const hospitals: Hospital[] = [
    { id: '1', name: 'Lilavati Hospital', location: 'Bandra, Mumbai', imageUrl: 'https://picsum.photos/id/1031/400/250', type: 'Hospital' },
    { id: '2', name: 'Manipal Hospital', location: 'HAL, Bangalore', imageUrl: 'https://picsum.photos/id/1018/400/250', type: 'Hospital' },
    { id: '3', name: 'Medanta Medicity', location: 'Gurugram, Delhi', imageUrl: 'https://picsum.photos/id/1040/400/250', type: 'Hospital' },
  ];

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
        {hospitals.map((h) => (
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
              <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors active:scale-95">
                BOOK VISIT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareDirectory;
