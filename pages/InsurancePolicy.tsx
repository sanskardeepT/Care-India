
import React from 'react';

const InsurancePolicy: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Insurance Policy</h2>
        <p className="text-gray-400 text-sm mt-1 font-medium">Manage your health coverages and claims.</p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3 aspect-video bg-[#0066FF] rounded-3xl p-6 text-white flex flex-col justify-between shadow-xl shadow-blue-200">
             <div className="flex justify-between items-start">
               <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" /></svg>
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded">Active</span>
             </div>
             <div>
               <p className="text-[10px] opacity-60 uppercase tracking-widest mb-1">Star Health Coverage</p>
               <h3 className="text-xl font-bold tracking-tight">₹ 15,00,000</h3>
             </div>
          </div>
          
          <div className="flex-1 space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Policy No.</p>
                   <p className="text-sm font-bold text-gray-800">SHA/2024/9912</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Expiry Date</p>
                   <p className="text-sm font-bold text-gray-800">14 Dec 2025</p>
                </div>
             </div>
             <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm tracking-wide shadow-lg hover:bg-gray-800 transition-all active:scale-[0.98]">
               DOWNLOAD E-CARD
             </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Recent Claims</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-xs font-bold text-gray-800 tracking-tight">Lilavati Hospital</p>
                <p className="text-[10px] text-gray-400">12 Nov 2024</p>
              </div>
              <span className="text-xs font-bold text-emerald-500">Settled</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-blue-50 text-[#0066FF] rounded-xl text-[10px] font-bold uppercase tracking-wider">Raise Claim</button>
            <button className="p-3 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-bold uppercase tracking-wider">TPA List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePolicy;
