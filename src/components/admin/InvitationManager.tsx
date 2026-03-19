"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Invitation, PaginatedResponse } from "./types";

interface Props {
  invitations: PaginatedResponse<Invitation>;
  onAdd: (name: string, whatsapp: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  baseUrl: string;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
  searchQuery: string;
}

export default function InvitationManager({ 
  invitations, onAdd, onDelete, baseUrl, onPageChange, onSearchChange, searchQuery 
}: Props) {
  const [newName, setNewName] = useState("");
  const [newWA, setNewWA] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Server-side values
  const { data: currentItems, totalPages, currentPage, count: totalItems } = invitations;
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    setIsSubmitting(true);
    await onAdd(newName, newWA);
    setNewName("");
    setNewWA("");
    setIsSubmitting(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link berhasil disalin!");
  };

  const getWALink = (invite: Invitation) => {
    const text = `Halo ${invite.name},\n\nTanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.\n\nDetail undangan dapat dilihat pada tautan berikut:\n${baseUrl}/?to=${invite.slug}\n\nTerima kasih.`;
    const phone = invite.whatsapp.startsWith('0') ? '62' + invite.whatsapp.slice(1) : invite.whatsapp;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-zinc-400">send</span>
          <h2 className="text-2xl font-bold italic text-white">Invitation Manager</h2>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">search</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name..."
            className="w-full bg-zinc-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-white/20 transition-all outline-none text-white selection:bg-white/10"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">Nama Tamu</label>
          <input 
            type="text" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Ex: Andi & Partner"
            className="w-full bg-zinc-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-white/20 transition-all outline-none text-white"
            required
          />
        </div>
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">No. WhatsApp (Optional)</label>
          <input 
            type="text" 
            value={newWA} 
            onChange={(e) => setNewWA(e.target.value)}
            placeholder="Ex: 08123456789"
            className="w-full bg-zinc-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-white/20 transition-all outline-none text-white"
          />
        </div>
        <button 
          disabled={isSubmitting}
          type="submit"
          className="bg-white text-black px-8 py-3 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all disabled:opacity-50 h-[44px]"
        >
          {isSubmitting ? 'Processing...' : 'Add Guest'}
        </button>
      </form>

      <div className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400 w-16">No</th>
                <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400">Nama</th>
                <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400">No. WA</th>
                <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400">Link</th>
                <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {currentItems.map((invite, idx) => (
                  <motion.tr 
                    key={invite.id} 
                    className="hover:bg-white/5 transition-colors group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <td className="px-6 py-4 text-zinc-500 font-mono">{startIndex + idx + 1}</td>
                    <td className="px-6 py-4 font-bold text-white">{invite.name}</td>
                    <td className="px-6 py-4 text-zinc-400 font-mono">{invite.whatsapp || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="bg-black/50 px-2 py-1 rounded text-[10px] text-zinc-400">?to={invite.slug}</code>
                        <button 
                          onClick={() => copyToClipboard(`${baseUrl}/?to=${invite.slug}`)}
                          className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-zinc-500 hover:text-white"
                        >
                          <span className="material-symbols-outlined text-sm">content_copy</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 text-white">
                        {invite.whatsapp && (
                          <a 
                            href={getWALink(invite)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="size-8 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center transition-all"
                          >
                            <span className="material-symbols-outlined text-sm">share</span>
                          </a>
                        )}
                        <button 
                          onClick={() => onDelete(invite.id)}
                          className="size-8 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500 italic">No guests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-white/5">
            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest leading-none">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
            </p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="size-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 transition-all text-white"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`size-8 rounded-lg text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-white text-black' : 'hover:bg-white/5 text-zinc-500 hover:text-white'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="size-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 transition-all text-white"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
