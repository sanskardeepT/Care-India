
import React from 'react';
import { User } from '../types';

interface HealthVaultProps {
  user: User;
}

const HealthVault: React.FC<HealthVaultProps> = ({ user }) => {
  const records = [
    { id: '1', title: 'Annual Health Check', provider: 'Dr. Lal PathLabs', date: '12 Dec 2024', status: 'Verified' },
    { id: '2', title: 'CBC & Vitamin D', provider: 'Thyrocare', date: '05 Nov 2024', status: 'Verified' },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Digital ID Card */}
      <div className="bg-[#0066FF] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
         <div className="relative z-10 flex flex-col h-full justify-between gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">Digital Health Account</p>
              <h2 className="text-4xl font-bold tracking-tight">91-2342-9901</h2>
              <p className="text-[10px] font-bold mt-1 text-white/50 tracking-widest uppercase">ABHA ID</p>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold uppercase">{user.name}</h3>
                <p className="text-xs text-white/70">Mumbai, Maharashtra</p>
              </div>
              <div className="bg-white p-2 rounded-xl">
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ABHA-9123429901" alt="QR" className="w-16 h-16" />
              </div>
            </div>
         </div>
         {/* Decorative backgrounds */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
         <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full blur-2xl -ml-16 -mb-16 opacity-50"></div>
      </div>

      {/* Records List */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-4">Medical Records</h3>
        <div className="space-y-4">
          {records.map((r) => (
            <div key={r.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-blue-100 transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0066FF]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{r.title}</h4>
                  <p className="text-xs text-gray-400 font-medium">{r.provider} • {r.date}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthVault;
