
import React, { useState } from 'react';
import { findGenericMedicine } from '../services/geminiService';

const AIPharmacy: React.FC = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    try {
      const res = await findGenericMedicine(search);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const subscriptions = [
    { name: 'Metformin 500mg', freq: 'Twice daily', price: 185 },
    { name: 'Telmisartan 40mg', freq: 'Once daily', price: 340 },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Search Section */}
      <div className="bg-[#1a1c22] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-blue-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-[10px] font-bold tracking-widest uppercase">AI Pharmacist</h3>
          </div>
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Generic Medicine Finder</h2>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Brand Name (e.g. Lipitor)"
              className="flex-1 bg-white/5 border-white/10 text-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-gray-600 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button 
              disabled={loading}
              className="bg-[#0066FF] text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm animate-slideUp">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Alternatives for {result.brand}</h3>
          <div className="grid gap-4">
            {result.generics.map((g: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-800">{g.name}</h4>
                  <p className="text-sm text-gray-500">{g.usage}</p>
                </div>
                {g.approxPriceINR && <span className="font-bold text-[#0066FF]">₹{g.approxPriceINR}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subscriptions */}
      <div>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">MY SUBSCRIPTIONS</h3>
        <div className="space-y-3">
          {subscriptions.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-100 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0066FF]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{s.name}</h4>
                  <p className="text-sm text-gray-500">{s.freq}</p>
                </div>
              </div>
              <span className="font-bold text-gray-900">₹{s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPharmacy;
