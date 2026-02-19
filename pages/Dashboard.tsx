
import React, { useState } from 'react';
import { User } from '../types';
import { drAI } from '../services/geminiService';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAiResponse(null);
    try {
      const res = await drAI(query);
      setAiResponse(res || "No response received.");
    } catch (err) {
      setAiResponse("Sorry, I encountered an error. Please check your symptoms later.");
    } finally {
      setLoading(false);
    }
  };

  const formatMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('###')) {
          return <h4 key={i} className="text-xs font-bold text-gray-800 mt-4 mb-2 uppercase tracking-wide">{trimmed.replace('###', '').trim()}</h4>;
        }
        if (trimmed.startsWith('**')) {
          return <p key={i} className="text-sm font-semibold text-gray-700 mt-2">{trimmed.replace(/\*\*/g, '')}</p>;
        }
        if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
          return <li key={i} className="ml-4 text-sm text-gray-600 list-disc list-outside mb-1">{trimmed.replace(/^[-*]\s*/, '')}</li>;
        }
        if (trimmed === '') return <div key={i} className="h-1" />;
        return <p key={i} className="text-sm text-gray-600 leading-relaxed mb-1">{trimmed}</p>;
      });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Greeting */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight capitalize">hlo, {user.name}</h2>
        <p className="text-gray-400 text-sm mt-1 font-medium">Welcome back to your health desk.</p>
      </div>

      {/* Dr.AI Section */}
      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-6 text-[#0066FF]">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-bold uppercase tracking-[0.2em] text-[10px]">Dr.AI Symptom Checker</h3>
        </div>
        
        <form onSubmit={handleAISubmit} className="relative">
          <input
            type="text"
            placeholder="How are you feeling today?"
            className="w-full bg-gray-50 px-8 py-5 pr-24 rounded-2xl border-2 border-transparent focus:border-blue-100 focus:ring-0 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400 font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3 top-2.5 bottom-2.5 bg-[#0066FF] text-white px-8 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-600 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span className="font-bold text-xs tracking-wide">ASK</span>
            )}
          </button>
        </form>

        {aiResponse && (
          <div className="mt-8 animate-slideUp">
            <div className="p-8 bg-gray-50/50 border border-gray-100 rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 bg-[#0066FF] h-full opacity-30"></div>
               <div className="max-w-none">
                  {formatMarkdown(aiResponse)}
               </div>
               <p className="mt-6 pt-6 border-t border-gray-100 text-[10px] text-gray-400 font-medium leading-relaxed uppercase tracking-wider">
                 Disclaimer: AI guidance only. Seek professional medical advice.
               </p>
            </div>
          </div>
        )}
      </div>

      {/* Emergency Alerts */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
           <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
           Emergency Alerts
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FFF5F5] p-6 rounded-3xl border border-red-50 flex items-start gap-4">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-red-900">Heatwave Alert</h4>
              <p className="text-red-700/70 text-sm mt-1">Avoid outdoor activity from 12 PM - 4 PM today.</p>
            </div>
          </div>
          <div className="bg-[#FFFBF0] p-6 rounded-3xl border border-yellow-50 flex items-start gap-4">
             <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-yellow-600 shadow-sm">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-yellow-900">Flu Advisory</h4>
              <p className="text-yellow-700/70 text-sm mt-1">High viral cases reported. Wear a mask in crowds.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <ActionCard title="Doctors" icon="stethoscope" color="blue" />
         <ActionCard title="Pharmacy" icon="pill" color="emerald" />
         <ActionCard title="Reports" icon="file" color="amber" />
         <ActionCard title="SOS Help" icon="sos" color="red" />
      </div>
    </div>
  );
};

const ActionCard = ({ title, icon, color }: { title: string; icon: string; color: string }) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    red: 'bg-red-50 text-red-600 border-red-100'
  };

  const getIcon = () => {
    switch (icon) {
      case 'stethoscope': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'pill': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
      case 'file': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1.01.293.707V19a2 2 0 01-2 2z" /></svg>;
      case 'sos': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
      default: return null;
    }
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all cursor-pointer group active:scale-95">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${colorMap[color]}`}>
        {getIcon()}
      </div>
      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">{title}</span>
    </div>
  )
}

export default Dashboard;
