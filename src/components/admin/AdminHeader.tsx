import React from "react";

export default function AdminHeader({ onRefresh }: { onRefresh: () => void }) {
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
      <button 
        onClick={onRefresh} 
        className="size-10 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 flex items-center justify-center transition-all text-white"
      >
        <span className="material-symbols-outlined text-xl">refresh</span>
      </button>
    </div>
  );
}
