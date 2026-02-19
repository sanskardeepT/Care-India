
import React from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface MyHealthProps {
  user: User;
  onLogout: () => void;
}

const MyHealth: React.FC<MyHealthProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const options = [
    { name: 'Personal Health Profile', icon: 'person', color: 'text-gray-700' },
    { name: 'Insurance Policy', icon: 'shield', color: 'text-gray-700', onClick: () => navigate('/insurance') },
    { name: 'Account Settings', icon: 'settings', color: 'text-gray-700' },
    { name: 'Logout', icon: 'logout', color: 'text-red-500', onClick: onLogout },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col items-center mb-12">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-white shadow-xl flex items-center justify-center text-[#0066FF]">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <button className="absolute bottom-1 right-1 bg-[#0066FF] text-white p-2 rounded-full border-2 border-white shadow-lg active:scale-90 transition-transform">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-6">{user.name}</h2>
        <p className="text-gray-400 font-semibold text-[11px] uppercase tracking-wider mt-1">{user.phone}</p>
      </div>

      <div className="max-w-xl mx-auto space-y-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={opt.onClick}
            className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 transition-all shadow-sm group active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-[#0066FF] transition-colors">
                  <Icon name={opt.icon} />
               </div>
               <span className={`font-bold text-sm ${opt.color}`}>{opt.name}</span>
            </div>
            <svg className="w-5 h-5 text-gray-200 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
};

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case 'person': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
    case 'shield': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    case 'settings': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    case 'logout': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
    default: return null;
  }
}

export default MyHealth;
