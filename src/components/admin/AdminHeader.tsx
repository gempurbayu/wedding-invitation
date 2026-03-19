import React from "react";

export default function AdminHeader({ onRefresh, onLogout }: { onRefresh: () => void; onLogout: () => void }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold italic tracking-tighter text-white">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <p className="text-zinc-500 uppercase text-[10px] font-black tracking-[0.3em]">Wedding Management System v1.0</p>
          <span className="text-zinc-700">•</span>
          <a href="/" className="text-white/50 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">open_in_new</span>
            Lihat Undangan
          </a>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={onRefresh} 
          className="size-10 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 flex items-center justify-center transition-all text-white group"
          title="Refresh Data"
        >
          <span className="material-symbols-outlined text-xl group-hover:rotate-180 transition-transform duration-500">refresh</span>
        </button>
        <button 
          onClick={onLogout} 
          className="px-4 h-10 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full border border-red-500/20 flex items-center gap-2 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          Logout
        </button>
      </div>
    </div>
  );
}
